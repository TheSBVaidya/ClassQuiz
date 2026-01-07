import { Navigate } from "react-router-dom";
import {
  ADMIN_ROUTES,
  ADMIN_STORAGE_KEYS,
} from "../features/admin/admin.constant";

const ProtectedRoute = ({ children }) => {
  const isAvailable = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN);

  if (!isAvailable) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
