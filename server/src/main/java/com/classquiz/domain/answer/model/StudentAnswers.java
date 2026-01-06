package com.classquiz.domain.answer.model;

import com.classquiz.domain.student.model.Student;
import com.classquiz.domain.exam.model.Exams;
import com.classquiz.domain.quiz.model.Quiz;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "student_answers" , uniqueConstraints = {
        @UniqueConstraint(columnNames = {"student_id", "exam_id", "quiz_id"})
})
public class StudentAnswers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exams exam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;


    @Column(name = "selected_answer", nullable = false, length = 1)
    private String selectedAnswer;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private String createdAt;
}
