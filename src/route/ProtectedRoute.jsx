import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore.jsx";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isLoggedIn, user } = useAuthStore((state) => state);

  if (!isLoggedIn) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    // Not an admin → redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
