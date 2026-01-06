package com.classquiz.domain.exam.repository;

import com.classquiz.domain.exam.model.Exams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ExamsRepository extends JpaRepository<Exams, Long> {
    Exams findByIsLiveTrue();

    Optional<Exams> findByTitle(String title);
}
