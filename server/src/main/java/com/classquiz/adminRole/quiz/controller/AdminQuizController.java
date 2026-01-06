package com.classquiz.adminRole.quiz.controller;

import com.classquiz.adminRole.quiz.service.AdminQuizService;
import com.classquiz.domain.quiz.dto.req.QuizBulkReqDto;
import com.classquiz.domain.quiz.dto.req.QuizBulkUpdateReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/quizzes")
public class AdminQuizController {

    private final AdminQuizService adminQuizService;

    @GetMapping("/{examId}")
    public ResponseEntity<List<AdminQuizResDto>> getQuiz(@PathVariable Long examId) {
        List<AdminQuizResDto> adminQuizResDto = adminQuizService.getQuiz(examId);
        return ResponseEntity.ok(adminQuizResDto);
    }

    @PostMapping
    public ResponseEntity<String> addQuiz(@RequestBody QuizBulkReqDto dto) {
        adminQuizService.addQuiz(dto);
        return ResponseEntity.ok("Quiz questions added successfully");
    }

    @PutMapping
    public ResponseEntity<String> updateQuiz(@RequestBody QuizBulkUpdateReqDto updateReqDto) {
        adminQuizService.updateQuiz(updateReqDto);
        return ResponseEntity.ok("Quiz updated");
    }
}
