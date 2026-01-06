package com.classquiz.domain.student.service;

import com.classquiz.domain.student.model.Student;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecification {

    public static Specification<Student> hasSchool(String school) {
        return (root, query, cb) -> {
            if (school == null || school.equalsIgnoreCase("All Schools")) {
                return null;
            }
            return cb.equal(root.get("school"), school);
        };
    }

    public static Specification<Student> hasActiveStatus(Boolean isActive) {
        return (root, query, cb) -> {
            if (isActive == null) {
                return null;
            }
            return cb.equal(root.get("isActive"), isActive);
        };
    }
}

