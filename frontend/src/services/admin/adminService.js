import { ADMIN_URL_API_CALL } from "../../features/admin/admin.constant";
import apiClient from "../axios/axiosInstance";

// const ipv4Api = () => {
//   const host = window.location.hostname;
//   console.log("HOST: ", host);
//   return apiClient.get(`http://${host}:8080/system/ipv4`);
// };

const loginApi = (payload) => {
  return apiClient.post(ADMIN_URL_API_CALL.LOGIN_URL, payload);
};

const createExamApi = (payload) => {
  return apiClient.post(ADMIN_URL_API_CALL.EXAMS_URL, payload);
};

const examStartApi = (examId) => {
  return apiClient.patch(`${ADMIN_URL_API_CALL.EXAMS_URL}/${examId}/start`);
};

const examEndApi = (examId) => {
  return apiClient.patch(`${ADMIN_URL_API_CALL.EXAMS_URL}/${examId}/end`);
};

const examTitlesApi = () => {
  return apiClient.get(`${ADMIN_URL_API_CALL.EXAMS_URL}/titles`);
};

const examStatusApi = (examId) => {
  return apiClient.get(`${ADMIN_URL_API_CALL.EXAMS_URL}/${examId}/status`);
};

const addStudentApi = (payload) => {
  return apiClient.post(`${ADMIN_URL_API_CALL.STUDENTS_URL}`, payload);
};

const getSchoolNameApi = () => {
  return apiClient.get(`${ADMIN_URL_API_CALL.STUDENTS_URL}/schools`);
};

const getCurrentBatchApi = () => {
  return apiClient.get(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}/count/current-batch`
  );
};

const getGivingExamApi = () => {
  return apiClient.get(`${ADMIN_URL_API_CALL.STUDENTS_URL}/count/giving-exam`);
};

const getTotalStudentApi = () => {
  return apiClient.get(`${ADMIN_URL_API_CALL.STUDENTS_URL}/count/total`);
};

const getAllStudentsApi = (
  page = 0,
  size = 10,
  sort = "id,desc",
  school = null,
  active = null
) => {
  // Build query params dynamically
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("size", size);
  params.append("sort", sort);

  // Only append if they are not null/undefined
  if (school && school !== "All Schools") {
    params.append("school", school);
  }

  if (active !== null && active !== "all") {
    params.append("active", active);
  }
  return apiClient.get(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}?${params.toString()}`
  );
};

const searchStudentsApi = (name, page = 0, size = 10, sort = "id,desc") => {
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("page", page);
  params.append("size", size);
  params.append("sort", sort);

  return apiClient.get(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}/search?${params.toString()}`
  );
};

const addQuizApi = (payload) => {
  return apiClient.post(`${ADMIN_URL_API_CALL.QUIZZES_URL}`, payload);
};

const getAllStudentResultApi = (examTitle) => {
  return apiClient.get(`${ADMIN_URL_API_CALL.RESULTS_URL}`, {
    params: {
      examTitle: examTitle,
    },
  });
};

const getAllAnsweredQuizApi = (examId, studentId) => {
  return apiClient.get(`${ADMIN_URL_API_CALL.ANSWERS_URL}`, {
    params: {
      examId,
      studentId,
    },
  });
};

const publishedResultApi = (ids, examTitle) => {
  return apiClient.patch(`${ADMIN_URL_API_CALL.RESULTS_URL}/publish`, {
    ids,
    examTitle,
  });
};

const fetchQuizApi = (examId) => {
  return apiClient.get(`${ADMIN_URL_API_CALL.QUIZZES_URL}/${examId}`);
};

const updateQuizApi = (payload) => {
  return apiClient.put(`${ADMIN_URL_API_CALL.QUIZZES_URL}`, payload);
};

const deleteExamApi = (examId) => {
  return apiClient.delete(`${ADMIN_URL_API_CALL.EXAMS_URL}/${examId}`);
};

const updateStudentApi = (payload, studentId) => {
  return apiClient.put(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}/${studentId}`,
    payload
  );
};

const toggleStudentApi = (studentId) => {
  return apiClient.patch(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}/${studentId}/toggle`
  );
};

const toggleActiveByDateApi = (payload) => {
  return apiClient.patch(
    `${ADMIN_URL_API_CALL.STUDENTS_URL}/toggle-by-date`,
    payload
  );
};

export {
  loginApi,
  createExamApi,
  examEndApi,
  examStartApi,
  examTitlesApi,
  examStatusApi,
  addStudentApi,
  getSchoolNameApi,
  getAllStudentsApi,
  searchStudentsApi,
  getCurrentBatchApi,
  getGivingExamApi,
  getTotalStudentApi,
  addQuizApi,
  getAllStudentResultApi,
  getAllAnsweredQuizApi,
  publishedResultApi,
  fetchQuizApi,
  updateQuizApi,
  deleteExamApi,
  updateStudentApi,
  toggleStudentApi,
  toggleActiveByDateApi,
};
