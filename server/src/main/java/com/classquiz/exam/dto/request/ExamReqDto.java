package com.classquiz.exam.dto.request;

import lombok.Data;

@Data
public class ExamReqDto {

    private String title;
    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer plusMarks;
    private Integer negativeMarks;
    private Integer passingMarks;
}
