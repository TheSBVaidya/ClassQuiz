import studentApiClient from "./studentAxiosInstance";

const studentLoginApi = (payload) => {
  return studentApiClient.post("/student/login", payload);
};

const studentGetActiveExamApi = () => {
  return studentApiClient.get("/student/activeExam");
};

const studentGetExamQuizApi = (examId) => {
  return studentApiClient.get(`/quiz/getExam/${examId}`);
};

const submitAnswerApi = (payload) => {
  return studentApiClient.post("/answer/submit", payload);
};

const studentHeartbeatApi = () => {
  return studentApiClient.post("/student/heartbeat");
};

const getPastPerformanceApi = () => {
  return studentApiClient.get("/student/past-performance");
};

const fetchStudentDetailsApi = () => {
  return studentApiClient.get("/student/studentDetails");
};

const updateStudentDetailsApi = (payload) => {
  return studentApiClient.put("/student/update", payload);
};

export {
  studentLoginApi,
  studentGetActiveExamApi,
  studentGetExamQuizApi,
  submitAnswerApi,
  studentHeartbeatApi,
  getPastPerformanceApi,
  fetchStudentDetailsApi,
  updateStudentDetailsApi,
};
