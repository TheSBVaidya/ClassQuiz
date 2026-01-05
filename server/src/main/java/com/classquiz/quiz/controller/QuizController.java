package com.classquiz.quiz.controller;

import com.classquiz.quiz.dto.request.QuizBulkReqDto;
import com.classquiz.quiz.dto.request.QuizBulkUpdateReqDto;
import com.classquiz.quiz.dto.response.ExamDetailsDto;
import com.classquiz.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/getExam/{examId}")
    public ResponseEntity<ExamDetailsDto> getExamQuiz(@PathVariable Long examId,
                                                      @RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {

        if (studentId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println(studentId);
        ExamDetailsDto examDetailsDto = quizService.getExamQuiz(examId, studentId);
        return ResponseEntity.ok(examDetailsDto);
    }


}
