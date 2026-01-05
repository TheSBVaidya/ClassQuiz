package com.classquiz.result.controller;

import com.classquiz.result.dto.ResultResDto;
import com.classquiz.result.service.ResultOverviewService;
import com.classquiz.student.dto.response.LoginResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/result")
public class ResultOverviewController {

    private final ResultOverviewService resultOverviewService;

    @GetMapping("/{examTitle}")
    public ResponseEntity<List<ResultResDto>> getAllStudentResult(@PathVariable String examTitle) {
        List<ResultResDto> resultResDto = resultOverviewService.getAllStudentResult(examTitle);
        return ResponseEntity.ok(resultResDto);
    }

    @PatchMapping("/publish/{ids}/{examTitle}")
    public ResponseEntity<String> publishResult(@PathVariable List<Long> ids, @PathVariable String examTitle) {
        resultOverviewService.publishResult(ids, examTitle);
        return ResponseEntity.ok("Result is Published to student...");
    }

}
