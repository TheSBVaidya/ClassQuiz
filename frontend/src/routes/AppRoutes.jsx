import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/admin/pages/LoginPage";
import DashboardPage from "../features/admin/pages/DashboardPage";

import ProtectedRoute from "./ProtectedRoutes";

import StudentDashboard from "../features/student/pages/StudentDashboard";
import StudentLogin from "../features/student/pages/StudentLogin";
import QuizInterface from "../features/student/pages/QuizInterface";
import StudentProfile from "../features/student/pages/StudentProfile";

// ADMIN COMPONENTS
import QuizReview from "../features/admin/components/QuizReview";
import AddQuestions from "../features/admin/components/AddQuestions";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- ADMIN ZONE --- */}
      <Route path="admin/login" element={<LoginPage />} />

      <Route
        path="admin/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="admin/quiz-review" element={<QuizReview />} />
      <Route path="admin/add-questions" element={<AddQuestions />} />
      <Route path="*" element={<LoginPage />} />

      {/* --- STUDENT ZONE --- */}
      <Route path="student/login" element={<StudentLogin />} />
      <Route path="student/dashboard" element={<StudentDashboard />} />
      <Route path="student/quiz/:examId" element={<QuizInterface />} />
      <Route path="student/profile" element={<StudentProfile />} />
    </Routes>
  );
};

export default AppRoutes;
