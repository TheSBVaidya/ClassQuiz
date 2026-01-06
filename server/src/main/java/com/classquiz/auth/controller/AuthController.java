package com.classquiz.auth.controller;

import com.classquiz.auth.service.AuthService;
import com.classquiz.auth.dto.req.LoginReqDto;
import com.classquiz.auth.dto.res.AdminLoginResDto;
import com.classquiz.auth.dto.res.StudentLoginResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/admin/login")
    public ResponseEntity<AdminLoginResDto> adminLogin(@RequestBody LoginReqDto loginReqDto) {
        AdminLoginResDto adminLoginResDto = authService.AdminLogin(loginReqDto);
        return ResponseEntity.ok(adminLoginResDto);
    }

    @PostMapping("/student/login")
    public ResponseEntity<StudentLoginResDto> studentLogin(@RequestBody LoginReqDto loginReqDto) {
        StudentLoginResDto studentLoginResDto = authService.StudentLogin(loginReqDto);
        return ResponseEntity.ok(studentLoginResDto);
    }
}
