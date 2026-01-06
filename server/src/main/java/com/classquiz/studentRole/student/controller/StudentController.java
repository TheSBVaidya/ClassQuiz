package com.classquiz.studentRole.student.controller;

import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;
import com.classquiz.domain.student.service.StudentService;
import com.classquiz.studentRole.student.service.StudentStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/students")
public class StudentController {

    private final StudentStudentService studentStudentService;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResDto> fetchStudentDetail(@RequestHeader("X-STUDENT-ID") Long studentId) {
        StudentProfileResDto studentProfileResDto = studentStudentService.fetchStudentDetail(studentId);
        return ResponseEntity.ok(studentProfileResDto);
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateStudent(@RequestBody StudentProfileReqDto studentProfileReqDto, @RequestHeader("X-STUDENT-ID") Long studentId) {
        studentStudentService.updateStudent(studentProfileReqDto, studentId);
        return ResponseEntity.ok("Student Data is updated");
    }

    @PostMapping("/heartbeat")
    public ResponseEntity<Void> heartbeat(@RequestHeader("X-STUDENT-ID") Long studentId) {
        studentStudentService.UpdateHeartbeat(studentId);
        return ResponseEntity.ok().build();
    }


}
