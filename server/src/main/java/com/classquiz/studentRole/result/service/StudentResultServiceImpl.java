package com.classquiz.studentRole.result.service;

import com.classquiz.domain.result.dto.req.ResultResDto;
import com.classquiz.domain.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentResultServiceImpl implements StudentResultService{

    private final ResultService resultService;


    @Override
    public List<ResultResDto> pastPerformance(Long studentId) {
        return resultService.pastPerformance(studentId);
    }
}
