package com.classquiz.quiz.dto.request;

import lombok.Data;

@Data
public class QuizReqDto {

    private Long id;
    private String question;
    private String a;
    private String b;
    private String c;
    private String d;
    private String correctOption;
}
