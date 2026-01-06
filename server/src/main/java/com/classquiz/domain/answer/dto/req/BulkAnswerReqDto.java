package com.classquiz.domain.answer.dto.req;

import lombok.Data;
import java.util.List;

@Data
public class BulkAnswerReqDto {

    private Long studentId;
    private Long examId;
    private List<AnswerReqDto> answers;
}
