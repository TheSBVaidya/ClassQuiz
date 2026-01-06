package com.classquiz.domain.student.dto.req;

import lombok.Data;

@Data
public class StudentReqDto {

    private String fullName;
    private String username;
    private String password;
    private String phone;
    private String school;
    private Integer standard;
}
