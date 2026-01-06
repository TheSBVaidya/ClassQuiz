package com.classquiz.domain.result.service;

import com.classquiz.domain.result.dto.req.PublishResultDto;
import com.classquiz.domain.result.dto.req.ResultResDto;

import java.util.List;

public interface ResultService {

    List<ResultResDto> getAllStudentResult(String examTitle);

    void publishResult(PublishResultDto publishResultDto);

    List<ResultResDto> pastPerformance(Long studentId);

    void generateResult(Long studentId, Long examId);
}
