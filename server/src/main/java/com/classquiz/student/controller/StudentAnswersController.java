package com.classquiz.student.controller;

import com.classquiz.student.dto.request.BulkAnswerReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.Result;
import com.classquiz.student.service.StudentAnswersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/answer")
public class StudentAnswersController {

    private final StudentAnswersService studentAnswersService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitAnswer(@RequestBody BulkAnswerReqDto dto,
                                               @RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {

        if (studentId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentAnswersService.submitAnswer(dto, studentId);
        return ResponseEntity.ok("Exam Submit...");
    }

    @GetMapping("/givenQuiz/{examId}/{studentId}")
    public ResponseEntity<List<Result>> getAllAnsweredQuiz(@PathVariable Long examId, @PathVariable Long studentId) {
        if (studentId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("givenQuiz: "+studentId);
        List<Result> results = studentAnswersService.getAllAnsweredQuiz(examId, studentId);
        return ResponseEntity.ok(results);
    }
}
