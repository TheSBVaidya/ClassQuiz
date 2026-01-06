package com.classquiz.domain.student.repository;

import com.classquiz.domain.student.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {
    Optional<Student> findByUsernameAndPassword(String username, String password);

    @Query("SELECT DISTINCT s.school FROM Student s WHERE s.school IS NOT NULL ORDER BY s.school ASC")
    List<String> findDistinctSchools();

    Page<Student> findByFullNameContainingIgnoreCase(
            String fullName,
            Pageable pageable
    );

    Long countByIsGivingExamTrue();
    List<Student> findByIsGivingExamTrueAndLastActiveAtBefore(LocalDateTime time);
    Long countByIsActiveTrue();

    @Modifying
    @Query("""
    UPDATE Student s
    SET s.isActive =
        CASE
            WHEN s.isActive = true THEN false
            ELSE true
        END
    WHERE s.createdAt BETWEEN :fromDate AND :toDate
""")
    int toggleStudentActiveByDateRange(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate
    );

}
