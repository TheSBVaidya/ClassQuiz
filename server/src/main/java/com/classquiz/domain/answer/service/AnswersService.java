package com.classquiz.domain.answer.service;

import com.classquiz.domain.answer.dto.req.BulkAnswerReqDto;
import com.classquiz.domain.result.dto.res.Result;

import java.util.List;

public interface AnswersService {
    void submitAnswer(BulkAnswerReqDto req, Long studentId);
    List<Result> getAllAnsweredQuiz(Long examId, Long studentId);

}
