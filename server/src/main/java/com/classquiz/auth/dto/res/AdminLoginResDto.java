package com.classquiz.auth.dto.res;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminLoginResDto {

    private Long id;
    private String username;
    private LocalDateTime createdAt;
}
