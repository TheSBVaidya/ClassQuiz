package com.classquiz.studentRole.quiz.service;

import com.classquiz.domain.quiz.dto.res.ExamDetailsDto;

public interface StudentQuizService {
    ExamDetailsDto getExamQuiz(Long examId, Long studentId);
}
