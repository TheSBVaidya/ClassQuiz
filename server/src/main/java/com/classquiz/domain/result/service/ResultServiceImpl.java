package com.classquiz.domain.result.service;

import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.exam.repository.ExamsRepository;
import com.classquiz.domain.result.dto.req.PublishResultDto;
import com.classquiz.domain.result.dto.req.ResultResDto;
import com.classquiz.domain.result.mapper.ResultHelperMapper;
import com.classquiz.domain.result.model.ResultOverview;
import com.classquiz.domain.result.repository.ResultOverviewRepository;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.answer.model.StudentAnswers;
import com.classquiz.domain.answer.repository.StudentAnswersRepository;
import com.classquiz.domain.student.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.classquiz.domain.result.mapper.ResultHelperMapper.mapToResultOverview;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {

    private final ResultOverviewRepository resultOverviewRepository;
    private final ExamsRepository examsRepository;
    private final StudentRepository studentRepository;
    private final StudentAnswersRepository studentAnswersRepository;

    @Override
    public List<ResultResDto> getAllStudentResult(String examTitle) {

        List<ResultOverview> resultOverview = resultOverviewRepository.findAllByExamTitle(examTitle);
        return resultOverview.stream()
                .map(ResultHelperMapper::mapToResultResDto)
                .toList();
    }

    @Override
    @Transactional
    public void publishResult(PublishResultDto publishResultDto) {
        int updatedCount = resultOverviewRepository.publishResultsByIdsAndExamTitle(publishResultDto.getIds(), publishResultDto.getExamTitle());
        System.out.println("Published results count: " + updatedCount);
    }

    @Override
    public List<ResultResDto> pastPerformance(Long studentId) {
        List<ResultOverview> list = resultOverviewRepository.findAllByStudent_IdAndIsPublishedTrue(studentId);
        return list.stream()
                .map(ResultHelperMapper::mapToResultResDto)
                .toList();
    }

    @Transactional
    public void generateResult(Long studentId, Long examId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Exams exams = examsRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (resultOverviewRepository.existsByStudent_IdAndExamTitle(studentId, exams.getTitle())) {
            return;
        }

        List<StudentAnswers> answers = studentAnswersRepository.findByStudent_IdAndExam_Id(studentId, examId);

        int totalQuestions = answers.size();
        int totalMarks = totalQuestions * exams.getPlusMarks();

        int obtainMarks = 0;

        for (StudentAnswers sa : answers) {
            if (sa.getSelectedAnswer().equalsIgnoreCase(sa.getQuiz().getCorrectAnswer())) {
                obtainMarks += exams.getPlusMarks();
            } else {
                obtainMarks -= exams.getNegativeMarks();
            }
        }

        ResultOverview resultOverview = mapToResultOverview(student, exams, obtainMarks);

        resultOverviewRepository.save(resultOverview);
    }


}
