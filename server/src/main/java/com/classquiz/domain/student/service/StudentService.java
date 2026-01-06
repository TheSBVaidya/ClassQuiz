package com.classquiz.domain.student.service;

import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import com.classquiz.domain.student.dto.req.StudentActiveRangeReqDto;
import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentService {

    void UpdateHeartbeat(Long studentId);

    StudentProfileResDto fetchStudentDetail(Long studentId);

    void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId);

    String toggleActiveStudent(Long studentId);

    int toggleStudentActiveByDate(StudentActiveRangeReqDto dto);

    void addStudent(StudentReqDto studentReqDto);

    void removeStudent(Long studentId);

    Page<StudentResDto> getAllStudent(String school, Boolean isActive, Pageable pageable);

    List<String> getSchoolName();

    Page<StudentResDto> searchStudentsByName(
            String name,
            Pageable pageable
    );

    Long getGivingExamStudent();

    Long getTotalStudentCount();

    Long getActiveStudent();
}
