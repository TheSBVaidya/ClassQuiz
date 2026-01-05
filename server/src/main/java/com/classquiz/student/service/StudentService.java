package com.classquiz.student.service;

import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.result.dto.ResultResDto;
import com.classquiz.student.dto.request.LoginReqDto;
import com.classquiz.student.dto.request.StudentActiveRangeReqDto;
import com.classquiz.student.dto.request.StudentProfileReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.StudentProfileResDto;

import java.util.List;

public interface StudentService {
    LoginResDto login(LoginReqDto loginReqDto);

    ExamResDto getActiveExam();

    void UpdateHeartbeat(Long studentId);

    List<ResultResDto> pastPerformance(Long studentId);

    StudentProfileResDto fetchStudentDetail(Long studentId);

    void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId);

    String toggleActiveStudent(Long studentId);

    int toggleStudentActiveByDate(StudentActiveRangeReqDto dto);
}
