package com.classquiz.domain.student.dto.res;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentResDto {

    private Long id;
    private String name;
    private String username;
    private Integer standard;
    private String school;
    private String phone;
    private LocalDateTime joiningDate;
    private Boolean isActive;

}
