package com.classquiz.quiz.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class QuizBulkUpdateReqDto {

    private Long examId;
    private List<QuizReqDto> questions;
}
