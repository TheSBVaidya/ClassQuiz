package com.classquiz.adminRole.result.service;

import com.classquiz.domain.result.dto.req.PublishResultDto;
import com.classquiz.domain.result.dto.req.ResultResDto;
import com.classquiz.domain.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminResultServiceImpl implements AdminResultService{

    private final ResultService resultService;

    @Override
    public void publishResult(PublishResultDto publishResultDto) {
        resultService.publishResult(publishResultDto);
    }

    @Override
    public List<ResultResDto> getAllStudentResult(String examTitle) {
        return resultService.getAllStudentResult(examTitle);
    }
}
