package com.classquiz.adminRole.answer.controller;

import com.classquiz.adminRole.answer.service.AdminAnswerService;
import com.classquiz.domain.answer.dto.req.AnsweredQuizDto;
import com.classquiz.domain.result.dto.res.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/answers")
public class AdminAnswerController {

    private final AdminAnswerService adminAnswerService;

    @GetMapping
    public ResponseEntity<List<Result>> getAllAnsweredQuiz(@RequestBody AnsweredQuizDto answeredQuizDto) {
        if (answeredQuizDto.getStudentId() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Result> results = adminAnswerService.getAllAnsweredQuiz(answeredQuizDto);
        return ResponseEntity.ok(results);
    }
}
