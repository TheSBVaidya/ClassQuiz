package com.classquiz.domain.exam.mapper;

import com.classquiz.domain.exam.dto.req.ExamReqDto;
import com.classquiz.domain.exam.dto.res.ExamResDto;
import com.classquiz.domain.exam.dto.res.ExamTitleResDto;
import com.classquiz.domain.exam.model.Exams;

import java.time.LocalDateTime;

public class ExamHelperMapper {

    public static Exams mapToExams(ExamReqDto dto) {
        Exams exams = new Exams();

        exams.setTitle(dto.getTitle());
        exams.setTotalMarks(dto.getTotalMarks());
        exams.setDurationMinutes(dto.getDurationMinutes());
        exams.setNegativeMarks(dto.getNegativeMarks());
        exams.setPlusMarks(dto.getPlusMarks());
        exams.setPassingMarks(dto.getPassingMarks());
        exams.setCreatedAt(LocalDateTime.now());

        return exams;
    }

    public static ExamResDto mapToExamResDto(Exams exams) {
        ExamResDto dto = new ExamResDto();
        dto.setId(exams.getId());
        dto.setIsLive(exams.getIsLive());
        dto.setTitle(exams.getTitle());
        dto.setTotalMarks(exams.getTotalMarks());
        dto.setDurationMinutes(exams.getDurationMinutes());
        dto.setPlusMarks(exams.getPlusMarks());
        dto.setNegativeMarks(exams.getNegativeMarks());
        dto.setPassingMarks(exams.getPassingMarks());

        return dto;
    }

    public static ExamTitleResDto mapToExamTitleResDto(Exams exams) {
        ExamTitleResDto dto = new ExamTitleResDto();
        dto.setId(exams.getId());
        dto.setTitle(exams.getTitle());

        return dto;
    }
}
