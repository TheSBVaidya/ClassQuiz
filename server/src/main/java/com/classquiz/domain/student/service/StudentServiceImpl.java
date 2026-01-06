package com.classquiz.domain.student.service;

import com.classquiz.domain.student.dto.req.StudentReqDto;
import com.classquiz.domain.student.dto.res.StudentResDto;
import com.classquiz.domain.student.mapper.StudentHelperMapper;
import com.classquiz.domain.exam.repository.ExamsRepository;
import com.classquiz.domain.result.repository.ResultOverviewRepository;
import com.classquiz.domain.student.dto.req.StudentActiveRangeReqDto;
import com.classquiz.domain.student.dto.req.StudentProfileReqDto;
import com.classquiz.domain.student.dto.res.StudentProfileResDto;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.classquiz.domain.student.mapper.StudentHelperMapper.*;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public void UpdateHeartbeat(Long studentId) {
        Student student = findStudentById(studentId);
        student.setLastActiveAt(LocalDateTime.now());
        student.setIsGivingExam(true);
        studentRepository.save(student);
    }

    @Override
    public StudentProfileResDto fetchStudentDetail(Long studentId) {

        Student student = findStudentById(studentId);

        return mapToStudentProfileResDto(student);
    }

    @Override
    public void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId) {
        Student student = findStudentById(studentId);

        mapToUpdateStudent(studentProfileReqDto, student);

        studentRepository.save(student);
    }

    @Override
    public String toggleActiveStudent(Long studentId) {

        Student student = findStudentById(studentId);

        String status;
        System.out.println("Activity: " + student.getIsActive());
        if (student.getIsActive()) {
            student.setIsActive(false);
            status = "Deactivate";
        } else {
            student.setIsActive(true);
            status = "Activate";
        }

        studentRepository.save(student);
        return status;
    }

    @Override
    @Transactional
    public int toggleStudentActiveByDate(StudentActiveRangeReqDto dto) {

        if (dto.getFromDate() == null || dto.getToDate() == null) {
            throw new IllegalArgumentException("Date range is required");
        }

        LocalDateTime startDateTime = dto.getFromDate().atStartOfDay();
        LocalDateTime endDateTime = dto.getToDate().atTime(LocalTime.MAX);

        return studentRepository.toggleStudentActiveByDateRange(
                startDateTime,
                endDateTime
        );
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
    public Page<StudentResDto> getAllStudent(String school, Boolean isActive,Pageable pageable) {
        Specification<Student> spec =
                Specification.where(StudentSpecification.hasSchool(school))
                        .and(StudentSpecification.hasActiveStatus(isActive));

        return studentRepository
                .findAll(spec, pageable)
                .map(StudentHelperMapper::mapToStudentResDto);
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
                .map(StudentHelperMapper::mapToStudentResDto);
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

    @Scheduled(fixedRate = 60000)
    public void cleanupInactiveStudents() {

        LocalDateTime cutoff = LocalDateTime.now().minusSeconds(90);

        List<Student> inactive = studentRepository
                .findByIsGivingExamTrueAndLastActiveAtBefore(cutoff);

        for (Student s : inactive) {
            s.setIsGivingExam(false);
        }

        studentRepository.saveAll(inactive);
    }

}
