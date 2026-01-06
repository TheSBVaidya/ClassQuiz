package com.classquiz.studentRole.answer.controller;

import com.classquiz.domain.answer.dto.req.BulkAnswerReqDto;
import com.classquiz.studentRole.answer.service.StudentAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/answers")
public class StudentAnswerController {

    private final StudentAnswerService studentAnswerService;

    @PostMapping
    public ResponseEntity<String> submitAnswer(@RequestBody BulkAnswerReqDto dto,
                                               @RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {

        if (studentId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentAnswerService.submitAnswer(dto, studentId);
        return ResponseEntity.ok("Exam Submit...");
    }
}
