package com.classquiz.adminRole.result.service;

import com.classquiz.domain.result.dto.req.PublishResultDto;
import com.classquiz.domain.result.dto.req.ResultResDto;

import java.util.List;

public interface AdminResultService {
    void publishResult(PublishResultDto publishResultDto);

    List<ResultResDto> getAllStudentResult(String examTitle);
}
