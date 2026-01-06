package com.classquiz.adminRole.student.service;

import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminStudentService {
//    LoginResDto login(LoginReqDto loginReqDto);

    void addStudent(StudentReqDto studentReqDto);

    void removeStudent(Long studentId);

    Page<StudentResDto> getAllStudent(String school,Boolean isActive,Pageable pageable);

    List<String> getSchoolName();

    Page<StudentResDto> searchStudentsByName(
            String name,
            Pageable pageable
    );

    Long getGivingExamStudent();

    Long getTotalStudentCount();

    Long getActiveStudent();
}
