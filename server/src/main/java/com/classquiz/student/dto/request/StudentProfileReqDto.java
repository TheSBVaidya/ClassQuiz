package com.classquiz.student.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentProfileReqDto {

    private String name;
    private String username;
    private String password;
    private Integer standard;
    private String school;
    private String phone;
}
