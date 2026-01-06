package com.classquiz.domain.quiz.service;

import com.classquiz.domain.quiz.dto.req.QuizBulkReqDto;
import com.classquiz.domain.quiz.dto.req.QuizBulkUpdateReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;
import com.classquiz.domain.quiz.dto.res.ExamDetailsDto;

import java.util.List;

public interface QuizService {

//    ---------- student -----------------
    ExamDetailsDto getExamQuiz(Long examId, Long studentId);


//    ----------------- admin -----------------
    void addQuiz(QuizBulkReqDto dto);

    void updateQuiz(QuizBulkUpdateReqDto updateReqDto);

    List<AdminQuizResDto> getQuiz(Long examId);
}
