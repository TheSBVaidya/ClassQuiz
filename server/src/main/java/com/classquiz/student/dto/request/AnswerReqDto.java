package com.classquiz.student.dto.request;

import lombok.Data;

@Data
public class AnswerReqDto {

    private Long quizId;
    private String selectedAnswer;
}
