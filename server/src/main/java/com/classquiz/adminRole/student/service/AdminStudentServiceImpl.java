package com.classquiz.adminRole.student.service;
import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import com.classquiz.domain.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminStudentServiceImpl implements AdminStudentService {

    private final StudentService studentService;

    @Override
    public void addStudent(StudentReqDto studentReqDto) {
        studentService.addStudent(studentReqDto);
    }

    @Override
    public void removeStudent(Long studentId) {
        studentService.removeStudent(studentId);
    }

    @Override
    public Page<StudentResDto> getAllStudent(String school, Boolean isActive, Pageable pageable) {
        return studentService.getAllStudent(school, isActive, pageable);
    }

    @Override
    public List<String> getSchoolName() {
        return studentService.getSchoolName();
    }

    @Override
    public Page<StudentResDto> searchStudentsByName(String name, Pageable pageable) {
        return studentService.searchStudentsByName(name, pageable);
    }

    @Override
    public Long getGivingExamStudent() {
        return studentService.getGivingExamStudent();
    }

    @Override
    public Long getTotalStudentCount() {
        return studentService.getTotalStudentCount();
    }

    @Override
    public Long getActiveStudent() {
        return studentService.getActiveStudent();
    }
}
