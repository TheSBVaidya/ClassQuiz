package com.classquiz.result.service;

import com.classquiz.result.dto.ResultResDto;
import com.classquiz.student.dto.response.LoginResDto;

import java.util.List;

public interface ResultOverviewService {

    void generateResult(Long studentId, Long examId);

    List<ResultResDto> getAllStudentResult(String examTitle);

    void publishResult(List<Long> ids, String examTitle);
}
