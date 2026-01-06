package com.classquiz.domain.result.model;

import com.classquiz.domain.student.model.Student;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"student_id", "exam_title"})
        }
)
public class ResultOverview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false, length = 100)
    private String examTitle;

    @Column(nullable = false)
    private Integer totalMarks;

    @Column(nullable = false)
    private Integer obtainMarks;

    @Column(nullable = false)
    private String resultStatus;

    private Boolean isPublished = false;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime examDate;
}
