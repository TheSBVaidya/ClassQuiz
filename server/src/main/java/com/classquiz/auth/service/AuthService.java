package com.classquiz.auth.service;

import com.classquiz.auth.dto.req.LoginReqDto;
import com.classquiz.auth.dto.res.AdminLoginResDto;
import com.classquiz.auth.dto.res.StudentLoginResDto;

public interface AuthService {
    AdminLoginResDto AdminLogin(LoginReqDto loginReqDto);

    StudentLoginResDto StudentLogin(LoginReqDto loginReqDto);
}
