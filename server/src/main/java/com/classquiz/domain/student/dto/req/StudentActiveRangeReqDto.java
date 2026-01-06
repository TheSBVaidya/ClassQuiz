package com.classquiz.domain.student.dto.req;

import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentActiveRangeReqDto {

    private LocalDate fromDate;
    private LocalDate toDate;
}
