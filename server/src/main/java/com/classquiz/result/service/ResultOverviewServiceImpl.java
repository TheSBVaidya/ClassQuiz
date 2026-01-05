package com.classquiz.result.service;

import com.classquiz.exam.model.Exams;
import com.classquiz.exam.repository.ExamsRepository;
import com.classquiz.result.dto.ResultResDto;
import com.classquiz.result.mapper.ResultOverviewHelperMapper;
import com.classquiz.result.model.ResultOverview;
import com.classquiz.result.repository.ResultOverviewRepository;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.model.Student;
import com.classquiz.student.model.StudentAnswers;
import com.classquiz.student.repository.StudentAnswersRepository;
import com.classquiz.student.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.classquiz.result.mapper.ResultOverviewHelperMapper.*;

@Service
@RequiredArgsConstructor
public class ResultOverviewServiceImpl implements ResultOverviewService{

    private final ResultOverviewRepository resultOverviewRepository;
    private final ExamsRepository examsRepository;
    private final StudentRepository studentRepository;
    private final StudentAnswersRepository studentAnswersRepository;

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

    @Override
    public List<ResultResDto> getAllStudentResult(String examTitle) {

        List<ResultOverview> resultOverview = resultOverviewRepository.findAllByExamTitle(examTitle);
        return resultOverview.stream()
                .map(ResultOverviewHelperMapper::mapToResultResDto)
                .toList();
    }

    @Override
    @Transactional
    public void publishResult(List<Long> ids, String examTitle) {
        int updatedCount = resultOverviewRepository.publishResultsByIdsAndExamTitle(ids, examTitle);
        System.out.println("Published results count: " + updatedCount);
    }


}
