package com.classquiz.studentRole.student.service;

import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;

public interface StudentStudentService {
    StudentProfileResDto fetchStudentDetail(Long studentId);

    void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId);

    void UpdateHeartbeat(Long studentId);
}
