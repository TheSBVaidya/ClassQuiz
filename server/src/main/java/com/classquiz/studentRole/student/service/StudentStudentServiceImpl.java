package com.classquiz.studentRole.student.service;

import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;
import com.classquiz.domain.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentStudentServiceImpl implements StudentStudentService{

    private final StudentService studentService;

    @Override
    public StudentProfileResDto fetchStudentDetail(Long studentId) {
        return studentService.fetchStudentDetail(studentId);
    }

    @Override
    public void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId) {
        studentService.updateStudent(studentProfileReqDto, studentId);
    }

    @Override
    public void UpdateHeartbeat(Long studentId) {
        studentService.UpdateHeartbeat(studentId);
    }
}
