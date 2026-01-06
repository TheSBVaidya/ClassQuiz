package com.classquiz.auth.dto.req;

import lombok.Data;

@Data
public class LoginReqDto {

    private String username;
    private String password;
}
