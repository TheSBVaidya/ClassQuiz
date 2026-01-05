package com.classquiz.quiz.dto.response;

import com.classquiz.exam.dto.response.ExamResDto;
import lombok.Data;

import java.util.List;

@Data
public class ExamDetailsDto {

    private ExamResDto exam;
    private List<QuizResDto> questions;
}
