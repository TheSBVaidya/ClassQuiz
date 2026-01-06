package com.classquiz.adminRole.quiz.service;

import com.classquiz.domain.quiz.dto.req.QuizBulkReqDto;
import com.classquiz.domain.quiz.dto.req.QuizBulkUpdateReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;

import java.util.List;

public interface AdminQuizService {
    List<AdminQuizResDto> getQuiz(Long examId);

    void addQuiz(QuizBulkReqDto dto);

    void updateQuiz(QuizBulkUpdateReqDto updateReqDto);
}
