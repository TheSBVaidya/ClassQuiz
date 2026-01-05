import axios from "axios";
import { ADMIN_STORAGE_KEYS } from "../screens/admin/admin.constant";
import { STUDENT_STORAGE_KEYS } from "../screens/student/student.constant";

// 🔥 get IP once, reuse everywhere
const getBaseURL = () => {
  const storedIP = localStorage.getItem(ADMIN_STORAGE_KEYS.IPV4);
  const host = storedIP || window.location.hostname;
  return `http://${host}:8080`;
};

const studentApiClient = axios.create({
  baseURL: getBaseURL(), // ✅ set ONCE
  headers: {
    "Content-Type": "application/json",
  },
});

studentApiClient.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem(STUDENT_STORAGE_KEYS.STUDENT);

    // 🛡️ Guard: student not logged in yet
    if (!raw) {
      return config;
    }

    const student = JSON.parse(raw);

    if (student?.id) {
      config.headers["X-STUDENT-ID"] = student.id;
      console.log("studentId attached:", student.id);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

console.log(
  `%c 👨‍🎓 Student API initialized → ${getBaseURL()}`,
  "background:#222; color:#60a5fa"
);

export default studentApiClient;
