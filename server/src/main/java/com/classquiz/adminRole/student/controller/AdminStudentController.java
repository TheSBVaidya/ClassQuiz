package com.classquiz.adminRole.student.controller;

import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import com.classquiz.adminRole.student.service.AdminStudentService;
import com.classquiz.domain.student.dto.req.StudentActiveRangeReqDto;
import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/students")
@RequiredArgsConstructor
public class AdminStudentController {

    private final AdminStudentService adminStudentService;
    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<String> addStudent(@RequestBody StudentReqDto studentReqDto) {
        adminStudentService.addStudent(studentReqDto);
        return ResponseEntity.ok("Student added");
    }

    @PatchMapping("/{studentId}/deactivate")
    public ResponseEntity<String> removeStudent(@PathVariable Long studentId) {
        adminStudentService.removeStudent(studentId);
        return ResponseEntity.ok("Student Removed...");
    }

    @GetMapping("/schools")
    public ResponseEntity<List<String>> getSchoolName() {
        List<String> list = adminStudentService.getSchoolName();
        return ResponseEntity.ok(list);
    }

    @GetMapping
    public ResponseEntity<Page<StudentResDto>> getAllStudent(
            @RequestParam(required = false) String school,
            @RequestParam(required = false) Boolean active,
            Pageable pageable
    ) {
        Page<StudentResDto> page =
                adminStudentService.getAllStudent(school, active, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<StudentResDto>> searchStudents(
            @RequestParam String name,
            Pageable pageable
    ) {
        Page<StudentResDto> page =
                adminStudentService.searchStudentsByName(name, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/count/giving-exam")
    public ResponseEntity<Long> getGivingExamStudent() {
        Long i = adminStudentService.getGivingExamStudent();
        return ResponseEntity.ok(i);
    }

    @GetMapping("/count/total")
    public ResponseEntity<Long> getTotalStudentCount() {
        Long totalCount = adminStudentService.getTotalStudentCount();
        return ResponseEntity.ok(totalCount);
    }

    @GetMapping("/count/current-batch")
    public ResponseEntity<Long> getActiveStudent() {
        Long activeStudent = adminStudentService.getActiveStudent();
        return ResponseEntity.ok(activeStudent);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<String> updateStudent(@RequestBody StudentProfileReqDto studentProfileReqDto, @PathVariable Long studentId) {
        studentService.updateStudent(studentProfileReqDto, studentId);
        return ResponseEntity.ok("Student is updated...");
    }

    @PatchMapping("/{studentId}/toggle")
    public ResponseEntity<String> toggleActiveStudent(@PathVariable Long studentId) {
        String s = studentService.toggleActiveStudent(studentId);
        return ResponseEntity.ok("Student is now " + s);
    }

    @PatchMapping("/toggle-by-date")
    public ResponseEntity<String> toggleActiveByDate(@RequestBody StudentActiveRangeReqDto dto) {
        int updatedCount = studentService.toggleStudentActiveByDate(dto);
        return ResponseEntity.ok(updatedCount + " students updated");
    }
}
