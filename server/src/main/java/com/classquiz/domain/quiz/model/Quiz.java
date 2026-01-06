package com.classquiz.domain.quiz.model;

import com.classquiz.domain.exam.model.Exams;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exams_id", nullable = false)
    private Exams exams;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String questions;

    @Column(name = "option_a", nullable = false, columnDefinition = "TEXT")
    private String optionA;

    @Column(name = "option_b",nullable = false, columnDefinition = "TEXT")
    private String optionB;

    @Column(name = "option_c",nullable = false, columnDefinition = "TEXT")
    private String optionC;

    @Column(name = "option_d",nullable = false, columnDefinition = "TEXT")
    private String optionD;

    @Column(nullable = false, length = 5)
    private String correctAnswer;

    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
