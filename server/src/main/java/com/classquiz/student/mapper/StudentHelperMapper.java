package com.classquiz.student.mapper;

import com.classquiz.exam.model.Exams;
import com.classquiz.student.dto.request.StudentProfileReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.StudentProfileResDto;
import com.classquiz.student.model.Student;

import java.time.LocalDateTime;

public class StudentHelperMapper {

    public static LoginResDto mapToLoginResDto (Student student) {
        LoginResDto dto = new LoginResDto();
        dto.setId(student.getId());
        dto.setUsername(student.getUsername());
        dto.setName(student.getFullName());
        dto.setStandard(student.getStandard());
        dto.setCreatedAt(student.getCreatedAt());

        return dto;
    }

    public static StudentProfileResDto mapToStudentProfileResDto(Student student) {
        StudentProfileResDto dto = new StudentProfileResDto();
        dto.setId(student.getId());
        dto.setName(student.getFullName());
        dto.setUsername(student.getUsername());
        dto.setPassword(student.getPassword());
        dto.setStandard(student.getStandard());
        dto.setSchool(student.getSchool());
        dto.setPhone(student.getPhone());
        dto.setJoiningDate(student.getCreatedAt());
        dto.setIsActive(student.getIsActive());

        return dto;

    }

    public static void mapToUpdateStudent(StudentProfileReqDto dto, Student student) {

        if (dto.getName() != null) {
            student.setFullName(dto.getName());
        }

        if (dto.getUsername() != null) {
            student.setUsername(dto.getUsername());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            student.setPassword(dto.getPassword());
            // ⚠️ hash here if needed
        }

        if (dto.getStandard() != null) {
            student.setStandard(dto.getStandard());
        }

        if (dto.getSchool() != null) {
            student.setSchool(dto.getSchool());
        }

        if (dto.getPhone() != null) {
            student.setPhone(dto.getPhone());
        }
    }
}
