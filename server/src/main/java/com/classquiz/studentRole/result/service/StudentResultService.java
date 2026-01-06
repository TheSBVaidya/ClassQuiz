package com.classquiz.studentRole.result.service;

import com.classquiz.domain.result.dto.req.ResultResDto;

import java.util.List;

public interface StudentResultService {
    List<ResultResDto> pastPerformance(Long studentId);
}
