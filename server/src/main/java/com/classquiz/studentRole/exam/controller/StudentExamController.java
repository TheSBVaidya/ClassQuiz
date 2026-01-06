package com.classquiz.studentRole.exam.controller;

import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.studentRole.exam.service.StudentExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/exams")
public class StudentExamController {

    private final StudentExamService examService;

    @GetMapping("/active")
    public ResponseEntity<ExamResDto> getActiveExam() {
        ExamResDto examResDto = examService.getActiveExam();
        return ResponseEntity.ok(examResDto);
    }
}
