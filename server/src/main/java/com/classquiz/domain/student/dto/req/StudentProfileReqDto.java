package com.classquiz.domain.student.dto.req;

import lombok.Data;

@Data
public class StudentProfileReqDto {

    private String name;
    private String username;
    private String password;
    private Integer standard;
    private String school;
    private String phone;
}
