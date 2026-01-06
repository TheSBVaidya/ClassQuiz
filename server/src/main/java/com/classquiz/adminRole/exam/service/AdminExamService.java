package com.classquiz.adminRole.exam.service;

import com.classquiz.domain.exam.dto.req.ExamReqDto;
import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.dto.res.ExamTitleResDto;

import java.util.List;

public interface AdminExamService {

    void create(ExamReqDto examReqDto);

    String start(Long examId);

    String end(Long examId);

    List<ExamTitleResDto> getTitles();

    void deleteExam(Long examId);

    ExamResDto getStatus(Long examId);
}
