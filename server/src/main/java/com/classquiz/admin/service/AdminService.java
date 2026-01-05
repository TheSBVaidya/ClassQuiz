package com.classquiz.admin.service;

import com.classquiz.admin.dto.request.LoginReqDto;
import com.classquiz.admin.dto.request.StudentReqDto;
import com.classquiz.admin.dto.response.LoginResDto;
import com.classquiz.admin.dto.response.StudentResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    LoginResDto login(LoginReqDto loginReqDto);

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
