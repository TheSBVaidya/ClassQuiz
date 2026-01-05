package com.classquiz.result.mapper;

import com.classquiz.exam.model.Exams;
import com.classquiz.result.dto.ResultResDto;
import com.classquiz.result.model.ResultOverview;
import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.model.Student;
import com.classquiz.student.model.StudentAnswers;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public class ResultOverviewHelperMapper {

    public static ResultOverview mapToResultOverview(Student student, Exams exams, Integer obtainMarks) {
        ResultOverview resultOverview = new ResultOverview();
        resultOverview.setStudent(student);
        resultOverview.setExamTitle(exams.getTitle());
        resultOverview.setTotalMarks(exams.getTotalMarks());
        resultOverview.setObtainMarks(obtainMarks);
        resultOverview.setResultStatus(
                obtainMarks >= exams.getPassingMarks() ? "PASS" : "FAIL"
        );
        resultOverview.setIsPublished(false);
        resultOverview.setExamDate(LocalDateTime.now());

        return resultOverview;
    }

    public static ResultResDto mapToResultResDto(ResultOverview resultOverview) {
        ResultResDto dto = new ResultResDto();

        dto.setId(resultOverview.getId());
        dto.setName(resultOverview.getStudent().getFullName());
        dto.setScore(resultOverview.getObtainMarks());
        dto.setTotal(resultOverview.getTotalMarks());
        dto.setStatus(resultOverview.getResultStatus());
        dto.setStudentId(resultOverview.getStudent().getId());
        dto.setExamDate(resultOverview.getExamDate());
        dto.setTitle(resultOverview.getExamTitle());

        return dto;
    }

}
