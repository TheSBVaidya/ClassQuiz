package com.classquiz.student.service;

import com.classquiz.exam.model.Exams;
import com.classquiz.exam.repository.ExamsRepository;
import com.classquiz.quiz.model.Quiz;
import com.classquiz.quiz.repository.QuizRepository;
import com.classquiz.result.service.ResultOverviewService;
import com.classquiz.student.dto.request.AnswerReqDto;
import com.classquiz.student.dto.request.BulkAnswerReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.Result;
import com.classquiz.student.model.Student;
import com.classquiz.student.model.StudentAnswers;
import com.classquiz.student.repository.StudentAnswersRepository;
import com.classquiz.student.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.classquiz.student.mapper.StudentAnswersHelperMapper.mapToListResult;

@Service
@RequiredArgsConstructor
public class StudentAnswersServiceImpl implements StudentAnswersService{

    private final StudentAnswersRepository studentAnswersRepository;
    private final StudentRepository studentRepository;
    private final ExamsRepository examsRepository;
    private final QuizRepository quizRepository;
    private final ResultOverviewService resultOverviewService;

    @Override
    @Transactional
    public void submitAnswer(BulkAnswerReqDto req, Long studentId) {

        // 1. Validate Request
        if (req.getAnswers() == null || req.getAnswers().isEmpty()) {
            throw new RuntimeException("No answers submitted");
        }

        // 2. Find Student
        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setIsGivingExam(false);

        if (!Boolean.TRUE.equals(student.getIsActive())) {
            throw new RuntimeException("Student is inactive");
        }

        // 3. find Exams
        Exams exam = examsRepository.findById(req.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (!Boolean.TRUE.equals(exam.getIsLive())) {
            throw new RuntimeException("Exam is not live");
        }

        // 4. get all quiz id's from req
        List<Long> quizIds = req.getAnswers()
                .stream()
                .map(AnswerReqDto::getQuizId)
                .toList();

        // 5. get all quizzes from db at once
        Map<Long, Quiz> quizMap = quizRepository.findAllById(quizIds)
                .stream()
                .collect(Collectors.toMap(Quiz::getId, q -> q));


        // 6. validate all quiz exists
        if (quizMap.size() != quizIds.size()) {
            throw new RuntimeException("One or more questions are invalid");
        }

        // 7. find already answered Questions
        List<Long> alreadyAnsweredQuizIds = studentAnswersRepository
                .findAnsweredQuizIds(student.getId(), exam.getId(), quizIds);

        if (!alreadyAnsweredQuizIds.isEmpty()) {
            throw new RuntimeException(
                    "Some questions already answered: " + alreadyAnsweredQuizIds
            );
        }

        // 8. Prepare answers for bulk save
        List<StudentAnswers> answersToSave = new ArrayList<>();

        for (AnswerReqDto dto : req.getAnswers()) {

            String selected = dto.getSelectedAnswer();

            if (selected == null ||
                    !List.of("a","b","c","d").contains(selected.toLowerCase())) {
                throw new RuntimeException("Invalid option for quizId " + dto.getQuizId());
            }

            Quiz quiz = quizMap.get(dto.getQuizId());

            boolean isCorrect =
                    quiz.getCorrectAnswer()
                            .equalsIgnoreCase(selected);

            StudentAnswers answer = new StudentAnswers();
            answer.setStudent(student);
            answer.setExam(exam);
            answer.setQuiz(quiz);
            answer.setSelectedAnswer(selected.toLowerCase());
            answer.setIsCorrect(isCorrect);

            answersToSave.add(answer);
        }

        // 9️⃣ Save ALL answers at once
        studentAnswersRepository.saveAll(answersToSave);
        studentRepository.save(student);

        //generate result
        resultOverviewService.generateResult(req.getStudentId(), req.getExamId());
    }

    @Override
    public List<Result> getAllAnsweredQuiz(Long examId, Long studentId) {

        List<StudentAnswers> studentAnswers = studentAnswersRepository.findByStudent_IdAndExam_Id(studentId, examId);

        List<Result> resultList = new ArrayList<>();
        for (StudentAnswers sa : studentAnswers) {
            Result result = mapToListResult(sa);
            resultList.add(result);
        }

        System.out.println(resultList);

        return resultList;
    }
}
