package com.classquiz.student.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class LoginResDto {

    private Long id;
    private String name;
    private String username;
    private Integer standard;
    private LocalDateTime createdAt;

}
