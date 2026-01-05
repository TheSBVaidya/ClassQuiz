import { Route, Routes } from "react-router-dom";
import LoginPage from "../screens/admin/pages/LoginPage";
import DashboardPage from "../screens/admin/pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import StudentDashboard from "../screens/student/pages/StudentDashboard";
import StudentLogin from "../screens/student/pages/StudentLogin";
import QuizInterface from "../screens/student/pages/QuizInterface";
import QuizReview from "../screens/admin/pages/DashboardComponents/QuizReview";
import StudentProfile from "../screens/student/pages/StudentProfile";
import AddQuestions from "../screens/admin/pages/DashboardComponents/AddQuestions";

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
