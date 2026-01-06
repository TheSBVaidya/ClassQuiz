package com.classquiz.domain.answer.dto.req;

import lombok.Data;

@Data
public class AnsweredQuizDto {

    private Long examId;
    private Long studentId;
}
