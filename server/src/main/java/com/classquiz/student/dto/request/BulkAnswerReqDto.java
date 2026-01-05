package com.classquiz.student.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class BulkAnswerReqDto {

    private Long studentId;
    private Long examId;
    private List<AnswerReqDto> answers;
}
