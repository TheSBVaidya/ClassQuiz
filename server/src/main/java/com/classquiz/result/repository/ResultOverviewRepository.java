package com.classquiz.result.repository;

import com.classquiz.result.model.ResultOverview;
import com.classquiz.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultOverviewRepository extends JpaRepository<ResultOverview, Long> {

    boolean existsByStudent_IdAndExamTitle(Long student, String examTitle);


    List<ResultOverview> findAllByExamTitle(String examTitle);

    @Modifying
    @Query("""
        UPDATE ResultOverview r
        SET r.isPublished = true
        WHERE r.id IN :ids
          AND r.examTitle = :examTitle
    """)
    int publishResultsByIdsAndExamTitle(
            @Param("ids") List<Long> ids,
            @Param("examTitle") String examTitle
    );

    List<ResultOverview> findAllByStudent_IdAndIsPublishedTrue(Long studentId);
}
