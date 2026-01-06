package com.classquiz.adminRole.answer.service;

import com.classquiz.domain.result.dto.res.Result;

import java.util.List;

public interface AdminAnswerService {
    List<Result> getAllAnsweredQuiz(Long examId, Long studentId);
}
