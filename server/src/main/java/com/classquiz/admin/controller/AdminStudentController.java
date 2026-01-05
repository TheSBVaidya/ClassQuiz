package com.classquiz.admin.controller;

import com.classquiz.admin.dto.request.StudentReqDto;
import com.classquiz.admin.dto.response.StudentResDto;
import com.classquiz.admin.service.AdminService;
import com.classquiz.student.dto.request.StudentActiveRangeReqDto;
import com.classquiz.student.dto.request.StudentProfileReqDto;
import com.classquiz.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/student")
@RequiredArgsConstructor
public class AdminStudentController {

    private final AdminService adminService;
    private final StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody StudentReqDto studentReqDto) {
        adminService.addStudent(studentReqDto);
        return ResponseEntity.ok("Student added");
    }

    @PatchMapping("/remove/{studentId}")
    public ResponseEntity<String> removeStudent(@PathVariable Long studentId) {
        adminService.removeStudent(studentId);
        return ResponseEntity.ok("Student Removed...");
    }

    @GetMapping("/schools")
    public ResponseEntity<List<String>> getSchoolName() {
        List<String> list = adminService.getSchoolName();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<StudentResDto>> getAllStudent(
            @RequestParam(required = false) String school,
            @RequestParam(required = false) Boolean active,
            Pageable pageable
    ) {
        Page<StudentResDto> page =
                adminService.getAllStudent(school, active, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<StudentResDto>> searchStudents(
            @RequestParam String name,
            Pageable pageable
    ) {
        Page<StudentResDto> page =
                adminService.searchStudentsByName(name, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/givingExam")
    public ResponseEntity<Long> getGivingExamStudent() {
        Long i = adminService.getGivingExamStudent();
        return ResponseEntity.ok(i);
    }

    @GetMapping("/totalCount")
    public ResponseEntity<Long> getTotalStudentCount() {
        Long totalCount = adminService.getTotalStudentCount();
        return ResponseEntity.ok(totalCount);
    }

    @GetMapping("/currentBatch")
    public ResponseEntity<Long> getActiveStudent() {
        Long activeStudent = adminService.getActiveStudent();
        return ResponseEntity.ok(activeStudent);
    }

    @PutMapping("/update/{studentId}")
    public ResponseEntity<String> updateStudent(@RequestBody StudentProfileReqDto studentProfileReqDto, @PathVariable Long studentId) {
        studentService.updateStudent(studentProfileReqDto, studentId);
        return ResponseEntity.ok("Student is updated...");
    }

    @PatchMapping("/toggle/{studentId}")
    public ResponseEntity<String> toggleActiveStudent(@PathVariable Long studentId) {
        String s = studentService.toggleActiveStudent(studentId);
        return ResponseEntity.ok("Student is now " + s);
    }

    @PatchMapping("/toggle-active-by-date")
    public ResponseEntity<String> toggleActiveByDate(@RequestBody StudentActiveRangeReqDto dto) {
        int updatedCount = studentService.toggleStudentActiveByDate(dto);
        return ResponseEntity.ok(updatedCount + " students updated");
    }
}
