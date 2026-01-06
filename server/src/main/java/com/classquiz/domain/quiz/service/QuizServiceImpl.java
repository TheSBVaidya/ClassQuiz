package com.classquiz.domain.quiz.service;

import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.exam.repository.ExamsRepository;
import com.classquiz.domain.quiz.dto.req.QuizBulkReqDto;
import com.classquiz.domain.quiz.dto.req.QuizBulkUpdateReqDto;
import com.classquiz.domain.quiz.dto.req.QuizReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;
import com.classquiz.domain.quiz.dto.res.ExamDetailsDto;
import com.classquiz.domain.quiz.dto.res.QuizResDto;
import com.classquiz.domain.quiz.mapper.QuizHelperMapper;
import com.classquiz.domain.quiz.model.Quiz;
import com.classquiz.domain.quiz.repository.QuizRepository;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.classquiz.domain.exam.mapper.ExamHelperMapper.mapToExamResDto;
import static com.classquiz.domain.quiz.mapper.QuizHelperMapper.mapToQuiz;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService{

    private final QuizRepository quizRepository;
    private final ExamsRepository examsRepository;
    private final StudentRepository studentRepository;

    @Override
    public ExamDetailsDto getExamQuiz(Long examId, Long studentId) {

        if (studentId != null) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new EntityNotFoundException("Student Not Log in..."));

            student.setIsGivingExam(true);

            studentRepository.save(student);
        }

        Exams exams = examsRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam Not Found..."));

        List<Quiz> quiz = quizRepository.findRandomByExamId(examId);

        ExamResDto examResDto = mapToExamResDto(exams);
        List<QuizResDto> quizResDto = quiz.stream()
                .map(QuizHelperMapper::mapToQuizResDto)
                .toList();

        ExamDetailsDto dto = new ExamDetailsDto();
        dto.setExam(examResDto);
        dto.setQuestions(quizResDto);

        return dto;
    }

    @Override
    public void addQuiz(QuizBulkReqDto dto) {
        Exams exams = examsRepository.findByTitle(dto.getExamTitle())
                .orElseThrow(() -> new EntityNotFoundException("Exam not found"));

        if (dto.getQuestions() == null || dto.getQuestions().isEmpty()) {
            throw new IllegalArgumentException("Question list cannot be empty");
        }

        List<Quiz> quizzes = new ArrayList<>();

        for (QuizReqDto quizReqDto : dto.getQuestions()) {
            Quiz quiz = mapToQuiz(quizReqDto, exams);
            quizzes.add(quiz);
        }

        quizRepository.saveAll(quizzes);
    }

    @Override
    public void updateQuiz(QuizBulkUpdateReqDto dto) {
        Exams exam = examsRepository.findById(dto.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Long> updateIds = dto.getQuestions().stream()
                .map(QuizReqDto::getId)
                .filter(Objects::nonNull)
                .toList();

        Map<Long, Quiz> existingMap = quizRepository.findAllById(updateIds)
                .stream()
                .collect(Collectors.toMap(Quiz::getId, q -> q));

        List<Quiz> toSave = new ArrayList<>();

        for (QuizReqDto qDto : dto.getQuestions()) {

            Quiz quiz;

            // UPDATE
            if (qDto.getId() != null && existingMap.containsKey(qDto.getId())) {
                quiz = existingMap.get(qDto.getId());
            }
            // CREATE
            else {
                quiz = new Quiz();
                quiz.setExams(exam);
                quiz.setIsActive(true);
            }

            // COMMON FIELDS
            quiz.setQuestions(qDto.getQuestion());
            quiz.setOptionA(qDto.getA());
            quiz.setOptionB(qDto.getB());
            quiz.setOptionC(qDto.getC());
            quiz.setOptionD(qDto.getD());

            if (qDto.getCorrectOption() != null) {
                quiz.setCorrectAnswer(qDto.getCorrectOption().toLowerCase());
            }

            toSave.add(quiz);
        }

        quizRepository.saveAll(toSave);
    }

    @Override
    public List<AdminQuizResDto> getQuiz(Long examId) {

        List<Quiz> quiz = quizRepository.findAllByExams_Id(examId);
        return quiz.stream()
                .map(QuizHelperMapper::mapToAdminQuizResDto)
                .toList();
    }

}
