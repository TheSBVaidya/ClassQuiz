package com.classquiz.student.service;

import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.exam.model.Exams;
import com.classquiz.exam.repository.ExamsRepository;
import com.classquiz.result.dto.ResultResDto;
import com.classquiz.result.mapper.ResultOverviewHelperMapper;
import com.classquiz.result.model.ResultOverview;
import com.classquiz.result.repository.ResultOverviewRepository;
import com.classquiz.student.dto.request.LoginReqDto;
import com.classquiz.student.dto.request.StudentActiveRangeReqDto;
import com.classquiz.student.dto.request.StudentProfileReqDto;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.StudentProfileResDto;
import com.classquiz.student.model.Student;
import com.classquiz.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static com.classquiz.exam.mapper.ExamHelperMapper.mapToExamResDto;
import static com.classquiz.student.mapper.StudentHelperMapper.*;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ExamsRepository examsRepository;
    private final ResultOverviewRepository resultOverviewRepository;

    @Override
    public LoginResDto login(LoginReqDto loginReqDto) {
        Student student = studentRepository.findByUsernameAndPassword(loginReqDto.getUsername(), loginReqDto.getPassword())
                .orElseThrow(() -> new EntityNotFoundException("Username or password Wrong..."));
        return mapToLoginResDto(student);
    }

    @Override
    public ExamResDto getActiveExam() {
        Exams exams = examsRepository.findByIsLiveTrue();
        return mapToExamResDto(exams);
    }

    @Override
    public void UpdateHeartbeat(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        student.setLastActiveAt(LocalDateTime.now());
        student.setIsGivingExam(true);
        studentRepository.save(student);
    }

    @Override
    public List<ResultResDto> pastPerformance(Long studentId) {
        List<ResultOverview> list = resultOverviewRepository.findAllByStudent_IdAndIsPublishedTrue(studentId);
        return list.stream()
                .map(ResultOverviewHelperMapper::mapToResultResDto)
                .toList();
    }

    @Override
    public StudentProfileResDto fetchStudentDetail(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Not Found"));

        return mapToStudentProfileResDto(student);
    }

    @Override
    public void updateStudent(StudentProfileReqDto studentProfileReqDto, Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Not Found"));

        mapToUpdateStudent(studentProfileReqDto, student);

        studentRepository.save(student);
    }

    @Override
    public String toggleActiveStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found.."));

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
