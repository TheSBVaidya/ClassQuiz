package com.classquiz.domain.quiz.dto.res;

import com.classquiz.domain.exam.dto.res.ExamResDto;
import lombok.Data;

import java.util.List;

@Data
public class ExamDetailsDto {

    private ExamResDto exam;
    private List<QuizResDto> questions;
}
