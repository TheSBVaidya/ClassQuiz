package com.classquiz.student.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentActiveRangeReqDto {

    private LocalDate fromDate;
    private LocalDate toDate;
}
