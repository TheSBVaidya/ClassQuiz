package com.classquiz.quiz.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class QuizBulkReqDto {

    private String examTitle;
    List<QuizReqDto> questions;
}
