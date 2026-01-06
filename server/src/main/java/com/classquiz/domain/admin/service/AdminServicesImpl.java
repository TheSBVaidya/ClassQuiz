package com.classquiz.domain.admin.service;

import com.classquiz.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServicesImpl implements AdminService {

    private final AdminRepository adminRepository;

}
