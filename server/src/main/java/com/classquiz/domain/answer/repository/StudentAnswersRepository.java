package com.classquiz.domain.answer.repository;

import com.classquiz.domain.answer.model.StudentAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentAnswersRepository extends JpaRepository<StudentAnswers, Long> {

    @Query( """ 
                SELECT sa.quiz.id FROM StudentAnswers sa 
                WHERE sa.student.id = :studentId 
                    AND sa.exam.id = :examId 
                    AND sa.quiz.id 
                        IN :quizIds 
                                        """)
    List<Long> findAnsweredQuizIds (
            @Param("studentId") Long studentId,
            @Param("examId") Long examId,
            @Param("quizIds") List<Long> quizIds
    );

    List<StudentAnswers> findByStudent_IdAndExam_Id(Long studentId, Long examId);
}
