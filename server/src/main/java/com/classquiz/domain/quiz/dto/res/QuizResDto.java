package com.classquiz.domain.quiz.dto.res;

import lombok.Data;

@Data
public class QuizResDto {

    private Long id;
    private String question;
    private String a;
    private String b;
    private String c;
    private String d;

}
