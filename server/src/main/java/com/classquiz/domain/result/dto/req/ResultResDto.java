package com.classquiz.domain.result.dto.req;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResultResDto {
    private Long id;
    private String name;
    private String title;
    private Integer score;
    private Integer total;
    private String status;
    private Long studentId;
    private LocalDateTime examDate;
}
