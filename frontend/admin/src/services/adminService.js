import apiClient from "./axiosInstance";

// const ipv4Api = () => {
//   const host = window.location.hostname;
//   console.log("HOST: ", host);
//   return apiClient.get(`http://${host}:8080/system/ipv4`);
// };

const loginApi = (payload) => {
  return apiClient.post(`admin/login`, payload);
};

const createExamApi = (payload) => {
  return apiClient.post("admin/exam/create", payload);
};

const examStartApi = (examId) => {
  return apiClient.patch(`admin/exam/start/${examId}`);
};

const examEndApi = (examId) => {
  return apiClient.patch(`admin/exam/end/${examId}`);
};

const examTitlesApi = () => {
  return apiClient.get("admin/exam/titles");
};

const examStatusApi = (examId) => {
  return apiClient.get(`admin/exam/status/${examId}`);
};

const addStudentApi = (payload) => {
  return apiClient.post("/admin/student/add", payload);
};

const getSchoolNameApi = () => {
  return apiClient.get("/admin/student/schools");
};

const getCurrentBatchApi = () => {
  return apiClient.get("/admin/student/currentBatch");
};

const getGivingExamApi = () => {
  return apiClient.get("/admin/student/givingExam");
};

const getTotalStudentApi = () => {
  return apiClient.get("/admin/student/totalCount");
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
  return apiClient.get(`/admin/student/all?${params.toString()}`);
};

const searchStudentsApi = (name, page = 0, size = 10, sort = "id,desc") => {
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("page", page);
  params.append("size", size);
  params.append("sort", sort);

  return apiClient.get(`/admin/student/search?${params.toString()}`);
};

const addQuizApi = (payload) => {
  return apiClient.post("/quiz/add", payload);
};

const getAllStudentResultApi = (examTitle) => {
  return apiClient.get(`/result/${examTitle}`);
};

const getAllAnsweredQuizApi = (examId, studentId) => {
  return apiClient.get(`/answer/givenQuiz/${examId}/${studentId}`);
};

const publishedResultApi = (ids, examTitle) => {
  return apiClient.patch(`/result/publish/${ids}/${examTitle}`);
};

const fetchQuizApi = (examId) => {
  return apiClient.get(`admin/quiz/${examId}`);
};

const updateQuizApi = (payload) => {
  return apiClient.put("admin/quiz/update", payload);
};

const deleteExamApi = (examId) => {
  return apiClient.delete(`/admin/exam/${examId}`);
};

const updateStudentApi = (payload, studentId) => {
  return apiClient.put(`/admin/student/update/${studentId}`, payload);
};

const toggleStudentApi = (studentId) => {
  return apiClient.patch(`/admin/student/toggle/${studentId}`);
};

const toggleActiveByDateApi = (payload) => {
  return apiClient.patch("/admin/student/toggle-active-by-date", payload);
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
