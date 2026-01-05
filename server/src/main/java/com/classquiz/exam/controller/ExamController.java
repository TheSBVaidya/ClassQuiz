package com.classquiz.exam.controller;

import com.classquiz.exam.dto.request.ExamReqDto;
import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.exam.dto.response.ExamTitleResDto;
import com.classquiz.exam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/exam")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ExamReqDto examReqDto) {
        examService.create(examReqDto);
        return ResponseEntity.ok("Exam Created");
    }

    @PatchMapping("/start/{examId}")
    public ResponseEntity<String> start(@PathVariable Long examId) {
        if (examId == null) {
            return ResponseEntity.badRequest().body("Exam ID is missing");
        }
        String s = examService.start(examId);
        System.out.println(s);
        return ResponseEntity.ok(s);
    }

    @PatchMapping("/end/{examId}")
    public ResponseEntity<String> end(@PathVariable Long examId) {
        if (examId == null) {
            return ResponseEntity.badRequest().body("Exam ID is missing");
        }
        String s = examService.end(examId);
        return ResponseEntity.ok(s);
    }

    @GetMapping("/status/{examId}")
    public ResponseEntity<ExamResDto> getStatus(@PathVariable Long examId) {
        ExamResDto examResDto = examService.getStatus(examId);
        return ResponseEntity.ok(examResDto);
    }

    @GetMapping("/titles")
    public ResponseEntity<List<ExamTitleResDto>> getTitles() {
        List<ExamTitleResDto> examTitleResDto = examService.getTitles();
        return ResponseEntity.ok(examTitleResDto);
    }

    @DeleteMapping("/{examId}")
    public ResponseEntity<String> deleteExam(@PathVariable Long examId) {
        examService.deleteExam(examId);
        return ResponseEntity.ok("Exam is deleted successfully.");
    }
}
