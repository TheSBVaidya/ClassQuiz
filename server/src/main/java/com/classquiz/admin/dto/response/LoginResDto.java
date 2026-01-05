package com.classquiz.admin.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginResDto {

    private Long id;
    private String username;
    private LocalDateTime createdAt;
}
