package com.classquiz.quiz.controller;

import com.classquiz.quiz.dto.request.QuizBulkReqDto;
import com.classquiz.quiz.dto.request.QuizBulkUpdateReqDto;
import com.classquiz.quiz.dto.response.AdminQuizResDto;
import com.classquiz.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/quiz")
public class AdminQuizController {

    private final QuizService quizService;

    @GetMapping("/{examId}")
    public ResponseEntity<List<AdminQuizResDto>> getAdminQuiz(@PathVariable Long examId) {
        List<AdminQuizResDto> adminQuizResDto = quizService.getAdminQuiz(examId);
        return ResponseEntity.ok(adminQuizResDto);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addQuiz(@RequestBody QuizBulkReqDto dto) {
        quizService.addQuiz(dto);
        return ResponseEntity.ok("Quiz questions added successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateQuiz(@RequestBody QuizBulkUpdateReqDto updateReqDto) {
        quizService.updateQuiz(updateReqDto);
        return ResponseEntity.ok("Quiz updated");
    }
}
