package com.classquiz.domain.quiz.mapper;

import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.quiz.dto.req.QuizReqDto;
import com.classquiz.domain.quiz.dto.res.AdminQuizResDto;
import com.classquiz.domain.quiz.dto.res.QuizResDto;
import com.classquiz.domain.quiz.model.Quiz;

public class QuizHelperMapper {

    public static QuizResDto mapToQuizResDto(Quiz quiz) {
        QuizResDto dto = new QuizResDto();
        dto.setId(quiz.getId());
        dto.setQuestion(quiz.getQuestions());
        dto.setA(quiz.getOptionA());
        dto.setB(quiz.getOptionB());
        dto.setC(quiz.getOptionC());
        dto.setD(quiz.getOptionD());

        return dto;
    }

    public static Quiz mapToQuiz(QuizReqDto dto, Exams exams) {
        Quiz quiz = new Quiz();
        quiz.setExams(exams);
        quiz.setQuestions(dto.getQuestion());
        quiz.setOptionA(dto.getA());
        quiz.setOptionB(dto.getB());
        quiz.setOptionC(dto.getC());
        quiz.setOptionD(dto.getD());
        quiz.setCorrectAnswer(dto.getCorrectOption().toLowerCase());

        return quiz;
    }

    public static AdminQuizResDto mapToAdminQuizResDto(Quiz quiz) {
        AdminQuizResDto dto = new AdminQuizResDto();
        dto.setId(quiz.getId());
        dto.setQuestion(quiz.getQuestions());
        dto.setA(quiz.getOptionA());
        dto.setB(quiz.getOptionB());
        dto.setC(quiz.getOptionC());
        dto.setD(quiz.getOptionD());
        dto.setCorrect(quiz.getCorrectAnswer());

        return dto;
    }
}
