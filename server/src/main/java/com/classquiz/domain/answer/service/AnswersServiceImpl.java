package com.classquiz.domain.answer.service;

import com.classquiz.domain.answer.dto.req.AnsweredQuizDto;
import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.exam.repository.ExamsRepository;
import com.classquiz.domain.quiz.model.Quiz;
import com.classquiz.domain.quiz.repository.QuizRepository;
import com.classquiz.domain.result.service.ResultService;
import com.classquiz.domain.answer.dto.req.AnswerReqDto;
import com.classquiz.domain.answer.dto.req.BulkAnswerReqDto;
import com.classquiz.domain.result.dto.res.Result;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.answer.model.StudentAnswers;
import com.classquiz.domain.answer.repository.StudentAnswersRepository;
import com.classquiz.domain.student.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.classquiz.domain.answer.mapper.AnswersHelperMapper.mapToListResult;

@Service
@RequiredArgsConstructor
public class AnswersServiceImpl implements AnswersService {

    private final StudentAnswersRepository studentAnswersRepository;
    private final StudentRepository studentRepository;
    private final ExamsRepository examsRepository;
    private final QuizRepository quizRepository;
    private final ResultService resultService;

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
        resultService.generateResult(req.getStudentId(), req.getExamId());
    }

    @Override
    public List<Result> getAllAnsweredQuiz(AnsweredQuizDto answeredQuizDto) {

        List<StudentAnswers> studentAnswers = studentAnswersRepository.findByStudent_IdAndExam_Id(answeredQuizDto.getStudentId(), answeredQuizDto.getExamId());

        List<Result> resultList = new ArrayList<>();
        for (StudentAnswers sa : studentAnswers) {
            Result result = mapToListResult(sa);
            resultList.add(result);
        }

        System.out.println(resultList);

        return resultList;
    }
}
