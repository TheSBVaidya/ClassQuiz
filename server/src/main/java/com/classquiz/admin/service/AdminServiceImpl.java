package com.classquiz.admin.service;

import com.classquiz.admin.dto.request.LoginReqDto;
import com.classquiz.admin.dto.request.StudentReqDto;
import com.classquiz.admin.dto.response.LoginResDto;
import com.classquiz.admin.dto.response.StudentResDto;
import com.classquiz.admin.mapper.AdminHelperMapper;
import com.classquiz.admin.model.Admin;
import com.classquiz.admin.repository.AdminRepository;
import com.classquiz.student.model.Student;
import com.classquiz.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.classquiz.admin.mapper.AdminHelperMapper.mapToLoginResDto;
import static com.classquiz.admin.mapper.AdminHelperMapper.mapToStudent;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;

    @Override
    public LoginResDto login(LoginReqDto loginReqDto) {
        Admin admin = adminRepository.findByUsernameAndPassword(loginReqDto.getUsername(), loginReqDto.getPassword());
        return mapToLoginResDto(admin);
    }

    @Override
    public void addStudent(StudentReqDto studentReqDto) {
        studentRepository.save(mapToStudent(studentReqDto));
    }

    @Override
    public void removeStudent(Long studentId) {
        Student student = findStudentById(studentId);
        student.setIsActive(false);
        studentRepository.save(student);
    }

    @Override
    public Page<StudentResDto> getAllStudent(
            String school,
            Boolean isActive,
            Pageable pageable
    ) {
        Specification<Student> spec =
                Specification.where(StudentSpecification.hasSchool(school))
                        .and(StudentSpecification.hasActiveStatus(isActive));

        return studentRepository
                .findAll(spec, pageable)
                .map(AdminHelperMapper::mapToStudentResDto);
    }

    @Override
    public List<String> getSchoolName() {
        List<String> finalSchoolList = new ArrayList<>();

        List<String> schools = studentRepository.findDistinctSchools();
        finalSchoolList.add("All Schools");
        finalSchoolList.addAll(schools);
        return finalSchoolList;
    }

    @Override
    public Page<StudentResDto> searchStudentsByName(String name, Pageable pageable) {
        return studentRepository
                .findByFullNameContainingIgnoreCase(name, pageable)
                .map(AdminHelperMapper::mapToStudentResDto);
    }

    @Override
    public Long getGivingExamStudent() {
        return studentRepository.countByIsGivingExamTrue();
    }

    @Override
    public Long getTotalStudentCount() {
        return studentRepository.count();
    }

    @Override
    public Long getActiveStudent() {
        return studentRepository.countByIsActiveTrue();
    }


    private Student findStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
    }
}
