package com.classquiz.student.service;

import com.classquiz.student.dto.request.BulkAnswerReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.Result;

import java.util.List;

public interface StudentAnswersService {
    void submitAnswer(BulkAnswerReqDto req, Long studentId);
    List<Result> getAllAnsweredQuiz(Long examId, Long studentId);

}
