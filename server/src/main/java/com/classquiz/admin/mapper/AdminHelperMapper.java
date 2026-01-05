package com.classquiz.admin.mapper;

import com.classquiz.admin.dto.request.StudentReqDto;
import com.classquiz.admin.dto.response.LoginResDto;
import com.classquiz.admin.dto.response.StudentResDto;
import com.classquiz.admin.model.Admin;
import com.classquiz.student.model.Student;

import java.time.LocalDateTime;

public class AdminHelperMapper {

    public static LoginResDto mapToLoginResDto(Admin admin) {
        LoginResDto loginResDto = new LoginResDto();
        loginResDto.setId(admin.getId());
        loginResDto.setCreatedAt(admin.getCreatedAt());
        loginResDto.setUsername(admin.getUsername());

        return loginResDto;
    }

    public static Student mapToStudent(StudentReqDto dto) {
        Student student = new Student();
        student.setFullName(dto.getFullName());
        student.setUsername(dto.getUsername());
        student.setPassword(dto.getPassword());
        student.setPhone(dto.getPhone());
        student.setSchool(dto.getSchool());
        student.setStandard(dto.getStandard());
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());

        return student;
    }

    public static StudentResDto mapToStudentResDto(Student student) {
        StudentResDto dto = new StudentResDto();
        dto.setName(student.getFullName());
        dto.setId(student.getId());
        dto.setIsActive(student.getIsActive());
        dto.setSchool(student.getSchool());
        dto.setPhone(student.getPhone());
        dto.setStandard(student.getStandard());
        dto.setUsername(student.getUsername());
        dto.setJoiningDate(student.getCreatedAt());
        return dto;
    }
}
