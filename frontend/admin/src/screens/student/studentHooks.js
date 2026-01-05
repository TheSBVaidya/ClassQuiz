import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTES, STUDENT_STORAGE_KEYS } from "./student.constant";
import {
  fetchStudentDetailsApi,
  getPastPerformanceApi,
  studentGetActiveExamApi,
  studentGetExamQuizApi,
  studentHeartbeatApi,
  studentLoginApi,
  submitAnswerApi,
  updateStudentDetailsApi,
} from "../../services/studentService";
import { toast } from "sonner";
import { systemIP } from "../../services/systemIP";
import { useState } from "react";

const useStudent = () => {
  const navigation = useNavigate();
  const [activeExam, setActiveExam] = useState();
  const [examData, setExamData] = useState();
  const [pastPerformanceData, setPastPerformanceData] = useState([]);
  const [studentProfile, setStudentProfile] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    standard: "",
    school: "",
    phone: "",
    joiningDate: "",
    isActive: false,
  });

  const persistAuth = (student) => {
    localStorage.setItem(STUDENT_STORAGE_KEYS.STUDENT, JSON.stringify(student));
  };

  const studentLogin = async (payload) => {
    try {
      await systemIP();
      const res = await studentLoginApi(payload);
      //   console.log(res.data);
      persistAuth(res.data);
      navigation(STUDENT_ROUTES.DASHBOARD);
    } catch (error) {
      toast.error("Unable to Login...", error);
      console.log(error);
    }
  };

  const studentGetActiveExam = async () => {
    try {
      const res = await studentGetActiveExamApi();
      //   console.log(res.data);
      setActiveExam(res.data);
    } catch (error) {
      toast.error("No exams running...");
      console.log(error);
    }
  };

  const studentGetExamQuiz = async (examId) => {
    try {
      const res = await studentGetExamQuizApi(examId);
      console.log("Exam Data: ", res.data);
      setExamData(res.data);
    } catch (error) {
      console.log("studentGetExamQuiz: ", error);
      toast.error("Unable to get the Exam...");
    }
  };

  const submitAnswer = async (payload) => {
    try {
      const res = await submitAnswerApi(payload);
      console.log(res.data);
      toast.success("All answers submitted successfully");
      navigation(STUDENT_ROUTES.DASHBOARD);
    } catch (error) {
      console.log("submitAnswer: ", error);
      toast.error("Unable to submit answers...");
    }
  };

  const studentHeartbeat = async () => {
    try {
      await studentHeartbeatApi();
      console.log("Student is Updated...");
    } catch (error) {
      console.log("student not updating: ", error);
    }
  };

  const getPastPerformance = async () => {
    try {
      const res = await getPastPerformanceApi();
      setPastPerformanceData(res.data);
    } catch (error) {
      console.log("unable to get Past data: ", error);
    }
  };

  const fetchStudentDetails = async () => {
    try {
      const res = await fetchStudentDetailsApi();
      setStudentProfile(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("unable to get student data: ", error);
    }
  };

  const updateStudentDetails = async (payload) => {
    try {
      updateStudentDetailsApi(payload);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Failed to update profile: ", error);
    }
  };

  return {
    activeExam,
    examData,
    pastPerformanceData,
    studentProfile,
    studentLogin,
    studentGetActiveExam,
    studentGetExamQuiz,
    submitAnswer,
    studentHeartbeat,
    getPastPerformance,
    fetchStudentDetails,
    updateStudentDetails,
  };
};

export default useStudent;
