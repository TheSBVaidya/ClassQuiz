const ADMIN_STORAGE_KEYS = {
  ADMIN: "admin",
  IPV4: "ipv4",
};

const ADMIN_ROUTES = {
  DASHBOARD: "/admin/dashboard",
  LOGIN: "/admin/login",
  ADD_QUESTIONS: "/admin/add-questions",
};

const ADMIN_STATUS = {
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  LOADING: "LOADING",
};

const ADMIN_URL_API_CALL = {
  LOGIN_URL: "/auth/admin/login",
  EXAMS_URL: "/admin/exams",
  ANSWERS_URL: "/admin/answers",
  QUIZZES_URL: "/admin/quizzes",
  RESULTS_URL: "/admin/results",
  STUDENTS_URL: "/admin/students",
};

export { ADMIN_STORAGE_KEYS, ADMIN_ROUTES, ADMIN_STATUS, ADMIN_URL_API_CALL };
