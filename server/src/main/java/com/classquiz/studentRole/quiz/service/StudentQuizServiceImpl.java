package com.classquiz.studentRole.quiz.service;

import com.classquiz.domain.quiz.dto.res.ExamDetailsDto;
import com.classquiz.domain.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentQuizServiceImpl implements StudentQuizService {

    private final QuizService quizService;

    @Override
    public ExamDetailsDto getExamQuiz(Long examId, Long studentId) {
        return quizService.getExamQuiz(examId, studentId);
    }
}
