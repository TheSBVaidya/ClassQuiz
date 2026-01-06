package com.classquiz.adminRole.answer.service;

import com.classquiz.domain.answer.dto.req.AnsweredQuizDto;
import com.classquiz.domain.answer.service.AnswersService;
import com.classquiz.domain.result.dto.res.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAnswerServiceImpl implements AdminAnswerService {

    private final AnswersService answerService;

    @Override
    public List<Result> getAllAnsweredQuiz(AnsweredQuizDto answeredQuizDto) {
        return answerService.getAllAnsweredQuiz(answeredQuizDto);
    }
}
