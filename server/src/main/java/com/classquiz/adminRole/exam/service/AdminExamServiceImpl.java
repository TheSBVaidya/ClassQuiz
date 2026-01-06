package com.classquiz.adminRole.exam.service;

import com.classquiz.domain.exam.dto.req.ExamReqDto;
import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.dto.res.ExamTitleResDto;
import com.classquiz.domain.exam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminExamServiceImpl implements AdminExamService {

    private final ExamService examService;

    @Override
    public void create(ExamReqDto examReqDto) {
        examService.create(examReqDto);
    }

    @Override
    public String start(Long examId) {
        return examService.start(examId);
    }

    @Override
    public String end(Long examId) {
        return examService.end(examId);
    }

    @Override
    public List<ExamTitleResDto> getTitles() {
        return examService.getTitles();
    }

    @Override
    public void deleteExam(Long examId) {
        examService.deleteExam(examId);
    }

    @Override
    public ExamResDto getStatus(Long examId) {
        return examService.getStatus(examId);
    }
}
