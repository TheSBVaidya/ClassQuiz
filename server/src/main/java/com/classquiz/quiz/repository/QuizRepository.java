package com.classquiz.quiz.repository;

import com.classquiz.quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "SELECT * FROM quiz WHERE exams_id = :examId AND is_active = true ORDER BY RAND() ", nativeQuery = true)
    List<Quiz> findRandomByExamId(@Param("examId") Long examsId);

    List<Quiz> findAllByExams_Id(Long examsId);
}
