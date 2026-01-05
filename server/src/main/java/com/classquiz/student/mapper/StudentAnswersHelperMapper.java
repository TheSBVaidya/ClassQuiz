package com.classquiz.student.mapper;

import com.classquiz.student.dto.response.LoginResDto;
import com.classquiz.student.dto.response.Result;
import com.classquiz.student.model.StudentAnswers;

import java.util.Arrays;
import java.util.List;

public class StudentAnswersHelperMapper {

    public static Result mapToListResult(StudentAnswers studentAnswers) {
        Result dto = new Result();
        dto.setQ(studentAnswers.getQuiz().getQuestions());
        dto.setCorrect(studentAnswers.getQuiz().getCorrectAnswer());
        dto.setStudentAns(studentAnswers.getSelectedAnswer());

        String a = studentAnswers.getQuiz().getOptionA();
        String b = studentAnswers.getQuiz().getOptionB();
        String c = studentAnswers.getQuiz().getOptionC();
        String d = studentAnswers.getQuiz().getOptionD();
        List<String> options = Arrays.asList(a, b, c, d);
        dto.setOptions(options);

        return dto;
    }
}
