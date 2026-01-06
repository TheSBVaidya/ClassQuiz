package com.classquiz.domain.answer.dto.req;

import lombok.Data;

@Data
public class AnswerReqDto {

    private Long quizId;
    private String selectedAnswer;
}
