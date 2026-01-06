package com.classquiz.domain.student.mapper;

import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.auth.dto.res.StudentLoginResDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import com.classquiz.domain.student.model.Student;

import java.time.LocalDateTime;

public class StudentHelperMapper {

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
