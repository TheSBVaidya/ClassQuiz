package com.classquiz.domain.exam.dto.res;

import lombok.Data;

@Data
public class ExamResDto {

    private Long id;
    private String title;
    private Integer durationMinutes;
    private Boolean isLive;
    private Integer totalMarks;
    private Integer plusMarks;
    private Integer negativeMarks;
    private Integer passingMarks;
}
