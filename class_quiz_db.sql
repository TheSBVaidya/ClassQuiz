-- Create Database
CREATE DATABASE IF NOT EXISTS class_quiz_db;
USE class_quiz_db;

-- ================= ADMIN =================
CREATE TABLE admin (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME(6)
);

INSERT INTO admin (username, password, created_at)
VALUES ('admin', 'admin123', NOW());

-- ================= STUDENTS =================
CREATE TABLE students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  school VARCHAR(100),
  standard INT,
  is_active BIT(1) DEFAULT 1,
  is_giving_exam BIT(1) DEFAULT 0,
  last_active_at DATETIME(6),
  created_at DATETIME(6),
  updated_at DATETIME(6)
);

INSERT INTO students (full_name, username, password, school, standard, is_active)
VALUES
('Rahul Sharma','STU1001','pass123','Primary Public School',5,1),
('Anita Verma','STU1002','pass123','Delhi Public School',6,1);

-- ================= EXAMS =================
CREATE TABLE exams (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) UNIQUE NOT NULL,
  duration_minutes INT NOT NULL,
  total_marks INT NOT NULL,
  plus_marks INT DEFAULT 1,
  negative_marks INT DEFAULT 0,
  passing_marks INT DEFAULT 0,
  is_live BIT(1) DEFAULT 0,
  created_at DATETIME(6)
);

INSERT INTO exams (title, duration_minutes, total_marks, created_at)
VALUES ('Java Basics', 30, 20, NOW());

-- ================= QUIZ =================
CREATE TABLE quiz (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  exams_id BIGINT NOT NULL,
  questions TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer VARCHAR(5) NOT NULL,
  is_active BIT(1) DEFAULT 1,
  created_at DATETIME(6),
  updated_at DATETIME(6),
  FOREIGN KEY (exams_id) REFERENCES exams(id) ON DELETE CASCADE
);

INSERT INTO quiz (exams_id, questions, option_a, option_b, option_c, option_d, correct_answer, created_at)
VALUES
(1,'Java is a ___ language','Compiled','Interpreted','Both','None','c',NOW()),
(1,'JVM stands for','Java Virtual Machine','Java Variable Method','None','All','a',NOW());

-- ================= STUDENT ANSWERS =================
CREATE TABLE student_answers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT NOT NULL,
  exam_id BIGINT NOT NULL,
  quiz_id BIGINT NOT NULL,
  selected_answer VARCHAR(1) NOT NULL,
  is_correct BIT(1),
  created_at VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (exam_id) REFERENCES exams(id),
  FOREIGN KEY (quiz_id) REFERENCES quiz(id),
  UNIQUE KEY uq_answer (student_id, exam_id, quiz_id)
);

-- ================= RESULT OVERVIEW =================
CREATE TABLE result_overview (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT NOT NULL,
  exam_title VARCHAR(100) NOT NULL,
  total_marks INT NOT NULL,
  obtain_marks INT NOT NULL,
  result_status VARCHAR(255) NOT NULL,
  is_published BIT(1) DEFAULT 0,
  exam_date DATETIME(6),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
