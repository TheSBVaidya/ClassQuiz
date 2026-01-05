package com.classquiz.exam.service;

import com.classquiz.exam.dto.request.ExamReqDto;
import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.exam.dto.response.ExamTitleResDto;

import java.util.List;

public interface ExamService {
    void create(ExamReqDto examReqDto);

    String start(Long examId);

    String end(Long examId);

    ExamResDto getStatus(Long examId);

    List<ExamTitleResDto> getTitles();

    void deleteExam(Long examId);
}
