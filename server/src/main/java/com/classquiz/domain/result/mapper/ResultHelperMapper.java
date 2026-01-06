package com.classquiz.domain.result.mapper;

import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.result.dto.req.ResultResDto;
import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.result.model.ResultOverview;

import java.time.LocalDateTime;

public class ResultHelperMapper {

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
