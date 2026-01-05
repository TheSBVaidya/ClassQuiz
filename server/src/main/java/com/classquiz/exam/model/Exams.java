package com.classquiz.exam.model;

import com.classquiz.quiz.model.Quiz;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Exams {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false)
    private Integer totalMarks;

    private Boolean isLive = false;

    private Integer plusMarks = 1;

    private Integer negativeMarks = 0;

    private Integer passingMarks = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "exams",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Quiz> quizzes = new ArrayList<>();



}
