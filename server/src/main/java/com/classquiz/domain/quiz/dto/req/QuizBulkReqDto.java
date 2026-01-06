package com.classquiz.domain.quiz.dto.req;

import lombok.Data;

import java.util.List;

@Data
public class QuizBulkReqDto {

    private String examTitle;
    List<QuizReqDto> questions;
}
