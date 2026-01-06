package com.classquiz.auth.mapper;

import com.classquiz.auth.dto.res.AdminLoginResDto;
import com.classquiz.auth.dto.res.StudentLoginResDto;
import com.classquiz.domain.admin.model.Admin;
import com.classquiz.domain.student.model.Student;

public class AuthHelperMapper {

    public static AdminLoginResDto mapToAdminLoginResDto(Admin admin) {
        AdminLoginResDto adminLoginResDto = new AdminLoginResDto();
        adminLoginResDto.setId(admin.getId());
        adminLoginResDto.setCreatedAt(admin.getCreatedAt());
        adminLoginResDto.setUsername(admin.getUsername());

        return adminLoginResDto;
    }

    public static StudentLoginResDto mapToStudentLoginResDto (Student student) {
        StudentLoginResDto dto = new StudentLoginResDto();
        dto.setId(student.getId());
        dto.setUsername(student.getUsername());
        dto.setName(student.getFullName());
        dto.setStandard(student.getStandard());
        dto.setCreatedAt(student.getCreatedAt());

        return dto;
    }
}
