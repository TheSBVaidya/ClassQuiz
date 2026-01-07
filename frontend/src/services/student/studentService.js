import { STUDENT_URL_API_CALL } from "../../features/student/student.constant";
import studentApiClient from "../axios/studentAxiosInstance";

const studentLoginApi = (payload) => {
  return studentApiClient.post(`${STUDENT_URL_API_CALL.LOGIN_URL}`, payload);
};

const studentGetActiveExamApi = () => {
  return studentApiClient.get(`${STUDENT_URL_API_CALL.EXAMS_URL}/active`);
};

const studentGetExamQuizApi = (examId) => {
  return studentApiClient.get(`${STUDENT_URL_API_CALL.QUIZZES_URL}/${examId}`);
};

const submitAnswerApi = (payload) => {
  return studentApiClient.post(`${STUDENT_URL_API_CALL.ANSWERS_URL}`, payload);
};

const studentHeartbeatApi = () => {
  return studentApiClient.post(
    `${STUDENT_URL_API_CALL.STUDENTS_URL}/heartbeat`
  );
};

const getPastPerformanceApi = () => {
  return studentApiClient.get(`${STUDENT_URL_API_CALL.RESULTS_URL}/history`);
};

const fetchStudentDetailsApi = () => {
  return studentApiClient.get(`${STUDENT_URL_API_CALL.STUDENTS_URL}/profile`);
};

const updateStudentDetailsApi = (payload) => {
  return studentApiClient.put(
    `${STUDENT_URL_API_CALL.STUDENTS_URL}/profile`,
    payload
  );
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
