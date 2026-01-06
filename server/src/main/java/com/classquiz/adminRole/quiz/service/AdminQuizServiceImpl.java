package com.classquiz.adminRole.quiz.service;

import com.classquiz.domain.quiz.dto.req.QuizBulkReqDto;
import com.classquiz.domain.quiz.dto.req.QuizBulkUpdateReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;
import com.classquiz.domain.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminQuizServiceImpl implements AdminQuizService {

    private final QuizService quizService;


    @Override
    public List<AdminQuizResDto> getQuiz(Long examId) {
        return quizService.getQuiz(examId);
    }

    @Override
    public void addQuiz(QuizBulkReqDto dto) {
        quizService.addQuiz(dto);
    }

    @Override
    public void updateQuiz(QuizBulkUpdateReqDto updateReqDto) {
        quizService.updateQuiz(updateReqDto);
    }
}
