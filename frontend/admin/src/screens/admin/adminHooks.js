import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTES,
  ADMIN_STATUS,
  ADMIN_STORAGE_KEYS,
} from "./admin.constant";
import { toast } from "sonner";
import {
  addQuizApi,
  addStudentApi,
  createExamApi,
  deleteExamApi,
  examEndApi,
  examStartApi,
  examStatusApi,
  examTitlesApi,
  fetchQuizApi,
  getAllAnsweredQuizApi,
  getAllStudentResultApi,
  getAllStudentsApi,
  getCurrentBatchApi,
  getGivingExamApi,
  getSchoolNameApi,
  getTotalStudentApi,
  loginApi,
  publishedResultApi,
  searchStudentsApi,
  toggleActiveByDateApi,
  toggleStudentApi,
  updateQuizApi,
  updateStudentApi,
} from "../../services/adminService";
import { systemIP } from "../../services/systemIP";

const useAdmin = () => {
  const [authStatus, setAuthStatus] = useState(ADMIN_STATUS.UNAUTHENTICATED);
  const [quetionTitles, setQuestionTitles] = useState([]);
  const [examData, setExamData] = useState();
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    isFirst: true,
    isLast: true,
  });
  const [students, setStudents] = useState([]);
  const [schoolNames, setSchoolName] = useState([]);
  const [givingExamStudents, setGivingExamStudents] = useState();
  const [currentBatchStudents, setCurrentBatchStudents] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [studentResultData, setStudentResultdata] = useState(null);
  const [answersData, setAnswersData] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const navigation = useNavigate();

  const persistAuth = (admin) => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN, JSON.stringify(admin));
  };

  const login = async (username, password) => {
    setAuthStatus(ADMIN_STATUS.LOADING);

    try {
      const res = await loginApi({ username, password });
      console.log(res.data);
      persistAuth(res.data);
      await systemIP();
      navigation(ADMIN_ROUTES.DASHBOARD);
    } catch (error) {
      toast.error("Unable to Login...");
      console.log(error);
    }
  };

  const logout = () => {
    console.log("Log Out Clicked..");
    localStorage.removeItem(ADMIN_STORAGE_KEYS.ADMIN);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.IPV4);
    localStorage.removeItem("selectedExamId");
    localStorage.removeItem("admin_results_examTitle");
    localStorage.removeItem("admin_results_data");
    setAuthStatus(ADMIN_STATUS.UNAUTHENTICATED);
    navigation(ADMIN_ROUTES.LOGIN);
  };

  const createExam = async (payload) => {
    try {
      await createExamApi(payload);
      toast.success("Exam is Created successfully...");
      // navigation(ADMIN_ROUTES.ADD_QUESTIONS);
    } catch (error) {
      console.log("Unable to Create Exam: ", error);
    }
  };

  const examEnd = async (examId) => {
    console.log("end: ", examId);
    await toast.promise(examEndApi(examId), {
      success: "Exam Ended",
      error: "Unable to end exam",
    });
  };
  const examStart = async (examId) => {
    if (examId === undefined || examId === null) {
      console.warn("startExam blocked: examId is missing");
      return;
    }

    await toast.promise(examStartApi(examId), {
      success: "Exam Started",
      error: "Unable to start exam",
    });
  };

  const examTitles = async () => {
    try {
      const res = await examTitlesApi();

      // FIX 2: Safety Check - Ensure data is an array before setting
      if (Array.isArray(res.data)) {
        setQuestionTitles(res.data);
      } else {
        setQuestionTitles([]); // Fallback to empty if server sends null
      }
    } catch (error) {
      console.log("examTitles Error: ", error);
      toast.error("Not able to load questions");
      setQuestionTitles([]); // Prevent crash on error
    }
  };

  const examStatus = async (examId) => {
    try {
      const res = await examStatusApi(examId);
      console.log("Status Res:", res.data);
      setExamData(res.data);
    } catch (error) {
      console.log("ExamStatus: ", error);
    }
  };

  const addStudent = async (payload) => {
    try {
      const res = await addStudentApi(payload);
      console.log(res.data);
      toast.success("Student Added...!");
    } catch (error) {
      console.log("Add Student: ", error);
      toast.error("Unable to add student");
    }
  };

  const getAllStudents = async (
    currentPage,
    pageSize,
    sortConfig,
    schoolParam,
    activeParam
  ) => {
    try {
      // NOTE: We do NOT pass statusFilter here anymore
      const res = await getAllStudentsApi(
        currentPage,
        pageSize,
        sortConfig,
        schoolParam,
        activeParam
      );

      const data = res.data;
      setStudents(data.content);
      setPagination({
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        isFirst: data.first,
        isLast: data.last,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    }
  };

  const getSchoolNames = async () => {
    try {
      const res = await getSchoolNameApi();
      setSchoolName(res.data);
    } catch (err) {
      console.log("getSchoolNames: ", err);
    }
  };

  const searchStudents = async (name, page, size, sort) => {
    try {
      const res = await searchStudentsApi(name, page, size, sort);
      const data = res.data;
      setStudents(data.content);
      setPagination({
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        isFirst: data.first,
        isLast: data.last,
      });
    } catch (error) {
      console.error("Search failed", error);
      toast.error("Search failed");
    }
  };

  const getGivingExam = async () => {
    try {
      const res = await getGivingExamApi();
      setGivingExamStudents(res.data);
    } catch (error) {
      console.error("getGivingExam", error);
      // toast.error("Unable to get active student");
    }
  };

  const getCurrentBatch = async () => {
    try {
      const res = await getCurrentBatchApi();
      setCurrentBatchStudents(res.data);
    } catch (error) {
      console.error("getCurrentBatch", error);
      // toast.error("Unable to get active student");
    }
  };

  const getTotalStudent = async () => {
    try {
      const res = await getTotalStudentApi();
      setTotalStudents(res.data);
    } catch (error) {
      console.error("getTotalStudent", error);
      // toast.error("Unable to get active student");
    }
  };

  const addQuiz = async (payload) => {
    try {
      const res = await addQuizApi(payload);
      toast.success(res.data);
    } catch (error) {
      console.log("Unable to add Quiz: ", error);
    }
  };

  const getAllStudentResult = async (examTitle) => {
    try {
      const res = await getAllStudentResultApi(examTitle);
      setStudentResultdata(res.data);
    } catch (error) {
      console.log("Unable to add Quiz: ", error);
    }
  };

  const getAllAnsweredQuiz = async (examId, studentId) => {
    try {
      const res = await getAllAnsweredQuizApi(examId, studentId);
      setAnswersData(res.data);
    } catch (error) {
      console.log("Unable to fetch Quiz: ", error);
    }
  };

  const publishedResult = async (ids, examTitle) => {
    try {
      await publishedResultApi(ids, examTitle);
      toast.success("Result are now showing to students...");
    } catch (error) {
      console.log("Unable to Published Result: ", error);
    }
  };

  const fetchQuiz = async (examId) => {
    try {
      const res = await fetchQuizApi(examId);
      console.log("Exam Data: ", res.data);
      setQuiz(res.data);
    } catch (error) {
      console.log("fetchQuiz: ", error);
      toast.error("Unable to fetch Quiz...");
    }
  };

  const updateQuiz = async (payload) => {
    try {
      await updateQuizApi(payload);
      toast.success("Quiz is Updated successfully.!");
    } catch (error) {
      console.error("unable to update Quiz: ", error);
      toast.error("unable to update Quiz.");
    }
  };

  const deleteExam = async (examId) => {
    try {
      await deleteExamApi(examId);
      toast.success("exam is deleted..!");
    } catch (error) {
      console.error("unable to delete exam: ", error);
      toast.error("unable to delete exam.");
    }
  };

  const updateStudent = async (payload, studentId) => {
    try {
      await updateStudentApi(payload, studentId);
      toast.success("Student is updated..");
    } catch (error) {
      console.error("unable to update student: ", error);
      toast.error("unable to update student.");
    }
  };

  const toggleStudent = async (studentId) => {
    try {
      const res = await toggleStudentApi(studentId);
      toast.success(res.data);
    } catch (error) {
      console.error("Unable to toggle student..");
      toast.error("Unable to procced..");
    }
  };

  const toggleActiveByDate = async (payload) => {
    try {
      const res = await toggleActiveByDateApi(payload);
      toast.success(res.data);
    } catch (error) {
      console.error("Unable to toggle student..");
      toast.error("Unable to procced..");
    }
  };

  return {
    quetionTitles,
    examData,
    students,
    pagination,
    schoolNames,
    givingExamStudents,
    totalStudents,
    currentBatchStudents,
    studentResultData,
    answersData,
    quiz,
    login,
    logout,
    createExam,
    examEnd,
    examStart,
    examStatus,
    examTitles,
    addStudent,
    getAllStudents,
    getSchoolNames,
    searchStudents,
    getGivingExam,
    getCurrentBatch,
    getTotalStudent,
    addQuiz,
    getAllStudentResult,
    getAllAnsweredQuiz,
    publishedResult,
    fetchQuiz,
    updateQuiz,
    deleteExam,
    updateStudent,
    toggleStudent,
    toggleActiveByDate,
  };
};

export default useAdmin;
