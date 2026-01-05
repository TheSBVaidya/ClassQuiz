package com.classquiz.admin.dto.request;

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
