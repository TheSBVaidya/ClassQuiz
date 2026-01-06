package com.classquiz.adminRole.exam.controller;

import com.classquiz.adminRole.exam.service.AdminExamService;
import com.classquiz.domain.exam.dto.req.ExamReqDto;
import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.dto.res.ExamTitleResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/exams")
public class AdminExamController {

    private final AdminExamService adminExamService;

    @PostMapping
    public ResponseEntity<String> create(@RequestBody ExamReqDto examReqDto) {
        adminExamService.create(examReqDto);
        return ResponseEntity.ok("Exam Created");
    }

    @PatchMapping("/{examId}/start")
    public ResponseEntity<String> start(@PathVariable Long examId) {
        if (examId == null) {
            return ResponseEntity.badRequest().body("Exam ID is missing");
        }
        String s = adminExamService.start(examId);
        System.out.println(s);
        return ResponseEntity.ok(s);
    }

    @PatchMapping("/{examId}/end")
    public ResponseEntity<String> end(@PathVariable Long examId) {
        if (examId == null) {
            return ResponseEntity.badRequest().body("Exam ID is missing");
        }
        String s = adminExamService.end(examId);
        return ResponseEntity.ok(s);
    }

    @GetMapping("/titles")
    public ResponseEntity<List<ExamTitleResDto>> getTitles() {
        List<ExamTitleResDto> examTitleResDto = adminExamService.getTitles();
        return ResponseEntity.ok(examTitleResDto);
    }

    @DeleteMapping("/{examId}")
    public ResponseEntity<String> deleteExam(@PathVariable Long examId) {
        adminExamService.deleteExam(examId);
        return ResponseEntity.ok("Exam is deleted successfully.");
    }

    @GetMapping("/{examId}/status")
    public ResponseEntity<ExamResDto> getStatus(@PathVariable Long examId) {
        ExamResDto examResDto = adminExamService.getStatus(examId);
        return ResponseEntity.ok(examResDto);
    }
}
