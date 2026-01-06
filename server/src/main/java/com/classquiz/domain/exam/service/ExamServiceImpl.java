package com.classquiz.domain.exam.service;

import com.classquiz.domain.exam.dto.req.ExamReqDto;
import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.dto.res.ExamTitleResDto;
import com.classquiz.domain.exam.mapper.ExamHelperMapper;
import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.exam.repository.ExamsRepository;
import com.classquiz.domain.quiz.repository.QuizRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.classquiz.domain.exam.mapper.ExamHelperMapper.mapToExamResDto;
import static com.classquiz.domain.exam.mapper.ExamHelperMapper.mapToExams;

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
//        quizRepository.deleteAllByExams_Id(examId); //chiled delete
        examsRepository.deleteById(examId);
    }

    @Override
    public ExamResDto getActiveExam() {
        Exams exams = examsRepository.findByIsLiveTrue();
        return mapToExamResDto(exams);
    }

    private Exams findExamById(Long id) {
        return  examsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exam Not Found"));
    }
}
