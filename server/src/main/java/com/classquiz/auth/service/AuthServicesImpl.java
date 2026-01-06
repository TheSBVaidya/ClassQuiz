package com.classquiz.auth.service;

import com.classquiz.auth.dto.req.LoginReqDto;
import com.classquiz.auth.dto.res.AdminLoginResDto;
import com.classquiz.auth.dto.res.StudentLoginResDto;
import com.classquiz.domain.admin.mapper.AdminHelperMapper;
import com.classquiz.domain.admin.model.Admin;
import com.classquiz.domain.admin.repository.AdminRepository;
import com.classquiz.domain.admin.service.AdminService;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.student.repository.StudentRepository;
import com.classquiz.domain.student.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.classquiz.auth.mapper.AuthHelperMapper.mapToAdminLoginResDto;
import static com.classquiz.auth.mapper.AuthHelperMapper.mapToStudentLoginResDto;

@Service
@RequiredArgsConstructor
public class AuthServicesImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;


    @Override
    public AdminLoginResDto AdminLogin(LoginReqDto loginReqDto) {
        Admin admin = adminRepository.findByUsernameAndPassword(loginReqDto.getUsername(), loginReqDto.getPassword());
        return mapToAdminLoginResDto(admin);
    }

    @Override
    public StudentLoginResDto StudentLogin(LoginReqDto loginReqDto) {
        Student student = studentRepository.findByUsernameAndPassword(loginReqDto.getUsername(), loginReqDto.getPassword())
                .orElseThrow(() -> new EntityNotFoundException("Username or password Wrong..."));
        return mapToStudentLoginResDto(student);
    }
}
