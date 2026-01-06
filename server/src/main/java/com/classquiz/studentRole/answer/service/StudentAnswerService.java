package com.classquiz.studentRole.answer.service;

import com.classquiz.domain.answer.dto.req.BulkAnswerReqDto;

public interface StudentAnswerService {
    void submitAnswer(BulkAnswerReqDto dto, Long studentId);
}
