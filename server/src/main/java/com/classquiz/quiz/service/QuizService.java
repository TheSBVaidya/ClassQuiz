package com.classquiz.quiz.service;

import com.classquiz.quiz.dto.request.QuizBulkReqDto;
import com.classquiz.quiz.dto.request.QuizBulkUpdateReqDto;
import com.classquiz.quiz.dto.response.AdminQuizResDto;
import com.classquiz.quiz.dto.response.ExamDetailsDto;

import java.util.List;

public interface QuizService {
    ExamDetailsDto getExamQuiz(Long examId, Long studentId);

    void addQuiz(QuizBulkReqDto dto);

    void updateQuiz(QuizBulkUpdateReqDto updateReqDto);

    List<AdminQuizResDto> getAdminQuiz(Long examId);
}
