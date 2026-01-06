package com.classquiz.studentRole.exam.service;

import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentExamServiceImpl implements StudentExamService{

    private final ExamService examService;

    @Override
    public ExamResDto getActiveExam() {
        return examService.getActiveExam();
    }
}
