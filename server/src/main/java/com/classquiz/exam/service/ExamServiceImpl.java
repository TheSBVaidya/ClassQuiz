package com.classquiz.exam.service;

import com.classquiz.exam.dto.request.ExamReqDto;
import com.classquiz.exam.dto.response.ExamResDto;
import com.classquiz.exam.dto.response.ExamTitleResDto;
import com.classquiz.exam.mapper.ExamHelperMapper;
import com.classquiz.exam.model.Exams;
import com.classquiz.exam.repository.ExamsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.classquiz.exam.mapper.ExamHelperMapper.mapToExamResDto;
import static com.classquiz.exam.mapper.ExamHelperMapper.mapToExams;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService{

    private final ExamsRepository examsRepository;

    @Override
    public void create(ExamReqDto examReqDto) {
        examsRepository.save(mapToExams(examReqDto));
    }

    @Override
    public String start(Long examId) {
        Exams exams = findExamById(examId);

        if (exams.getIsLive()) {
            return "Exam is already live";
        } else {
            exams.setIsLive(true);
        }

        examsRepository.save(exams);

        return "Exam Started";
    }

    @Override
    public String end(Long examId) {
        Exams exams = findExamById(examId);

        if (!exams.getIsLive()) {
            return "Exam is ended already";
        } else {
            exams.setIsLive(false);
        }

        examsRepository.save(exams);

        return "Exam Ended";
    }

    @Override
    public ExamResDto getStatus(Long examId) {
       Exams exams = findExamById(examId);
       return mapToExamResDto(exams);
    }

    @Override
    public List<ExamTitleResDto> getTitles() {

        List<Exams> list = examsRepository.findAll();

        return list.stream()
                .map(ExamHelperMapper::mapToExamTitleResDto)
                .toList();
    }

    @Override
    public void deleteExam(Long examId) {
        examsRepository.deleteById(examId);
    }

    private Exams findExamById(Long id) {
        return  examsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exam Not Found"));
    }
}
