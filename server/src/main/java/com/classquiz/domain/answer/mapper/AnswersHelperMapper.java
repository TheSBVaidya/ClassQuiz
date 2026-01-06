package com.classquiz.domain.answer.mapper;

import com.classquiz.domain.result.dto.res.Result;
import com.classquiz.domain.answer.model.StudentAnswers;

import java.util.Arrays;
import java.util.List;

public class AnswersHelperMapper {

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
