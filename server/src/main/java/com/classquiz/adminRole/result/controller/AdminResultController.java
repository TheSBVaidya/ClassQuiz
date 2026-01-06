package com.classquiz.adminRole.result.controller;

import com.classquiz.adminRole.result.service.AdminResultService;
import com.classquiz.domain.result.dto.req.PublishResultDto;
import com.classquiz.domain.result.dto.req.ResultResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/results")
public class AdminResultController {

    private final AdminResultService adminResultService;

    @GetMapping
    public ResponseEntity<List<ResultResDto>> getAllStudentResult(@RequestParam(name = "examTitle") String examTitle) {
        List<ResultResDto> resultResDto = adminResultService.getAllStudentResult(examTitle);
        return ResponseEntity.ok(resultResDto);
    }

    @PatchMapping("/publish")
    public ResponseEntity<String> publishResult(@RequestBody PublishResultDto publishResultDto) {
        adminResultService.publishResult(publishResultDto);
        return ResponseEntity.ok("Result is Published to student...");
    }
}
