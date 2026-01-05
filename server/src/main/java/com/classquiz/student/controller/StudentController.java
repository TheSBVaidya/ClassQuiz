package com.classquiz.student.controller;

import com.classquiz.admin.dto.response.StudentResDto;
import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.result.dto.ResultResDto;
import com.classquiz.student.dto.request.LoginReqDto;
import com.classquiz.student.dto.request.StudentProfileReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.StudentProfileResDto;
import com.classquiz.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login(@RequestBody LoginReqDto loginReqDto) {
        LoginResDto loginResDto = studentService.login(loginReqDto);
        return ResponseEntity.ok(loginResDto);
    }

    @GetMapping("/studentDetails")
    public ResponseEntity<StudentProfileResDto> fetchStudentDetail(@RequestHeader("X-STUDENT-ID") Long studentId) {
        StudentProfileResDto studentProfileResDto = studentService.fetchStudentDetail(studentId);
        return ResponseEntity.ok(studentProfileResDto);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateStudent(@RequestBody StudentProfileReqDto studentProfileReqDto, @RequestHeader("X-STUDENT-ID") Long studentId) {
        studentService.updateStudent(studentProfileReqDto, studentId);
        return ResponseEntity.ok("Student Data is updated");
    }

    @GetMapping("/activeExam")
    public ResponseEntity<ExamResDto> getActiveExam() {
        ExamResDto examResDto = studentService.getActiveExam();
        return ResponseEntity.ok(examResDto);
    }

    @PostMapping("/heartbeat")
    public ResponseEntity<Void> heartbeat(@RequestHeader("X-STUDENT-ID") Long studentId) {
        studentService.UpdateHeartbeat(studentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/past-performance")
    public ResponseEntity<List<ResultResDto>> pastPerformance(@RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {
        List<ResultResDto> resultResDto = studentService.pastPerformance(studentId);
        return ResponseEntity.ok(resultResDto);
    }
}
