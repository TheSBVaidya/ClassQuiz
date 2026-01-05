package com.classquiz.admin.controller;

import com.classquiz.admin.dto.request.LoginReqDto;
import com.classquiz.admin.dto.response.LoginResDto;
import com.classquiz.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login(@RequestBody LoginReqDto loginReqDto) {
        LoginResDto loginResDto = adminService.login(loginReqDto);
        return ResponseEntity.ok(loginResDto);
    }
}
