package com.classquiz.studentRole.answer.service;

import com.classquiz.domain.answer.dto.req.BulkAnswerReqDto;
import com.classquiz.domain.answer.service.AnswersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentAnswerServiceImpl implements  StudentAnswerService{

    private final AnswersService answersService;

    @Override
    public void submitAnswer(BulkAnswerReqDto dto, Long studentId) {
        answersService.submitAnswer(dto, studentId);
    }
}
