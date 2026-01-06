package com.classquiz.auth.dto.res;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentLoginResDto {

    private Long id;
    private String name;
    private String username;
    private Integer standard;
    private LocalDateTime createdAt;

}
