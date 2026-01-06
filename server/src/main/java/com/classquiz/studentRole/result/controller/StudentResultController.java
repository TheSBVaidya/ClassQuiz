package com.classquiz.studentRole.result.controller;

import com.classquiz.domain.result.dto.req.ResultResDto;
import com.classquiz.studentRole.result.service.StudentResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/results")
public class StudentResultController {

    private final StudentResultService studentResultService;

    @GetMapping("/history")
    public ResponseEntity<List<ResultResDto>> pastPerformance(@RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {
        List<ResultResDto> resultResDto = studentResultService.pastPerformance(studentId);
        return ResponseEntity.ok(resultResDto);
    }
}
