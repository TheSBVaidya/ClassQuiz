package com.classquiz.studentRole.quiz.controller;

import com.classquiz.domain.quiz.dto.res.ExamDetailsDto;
import com.classquiz.studentRole.quiz.service.StudentQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/quizzes")
public class StudentQuizController {

    private final StudentQuizService studentQuizService;

    @GetMapping("/{examId}")
    public ResponseEntity<ExamDetailsDto> getExamQuiz(@PathVariable Long examId,
                                                      @RequestHeader(value = "X-STUDENT-ID", required = false) Long studentId) {

        if (studentId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ExamDetailsDto examDetailsDto = studentQuizService.getExamQuiz(examId, studentId);
        return ResponseEntity.ok(examDetailsDto);
    }
}
