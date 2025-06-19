import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, role }) => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (!token || !userInfo) return <Navigate to="/login" replace />;

  // Cek jika role diset (array atau string)
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(userInfo.role)) {
      // Arahkan ke dashboard sesuai role yang login
      switch (userInfo.role) {
        case "admin":
          return <Navigate to="/dashboard/admin" replace />;
        case "satpam":
          return <Navigate to="/dashboardpam/satpam" replace />;
        case "user":
          return <Navigate to="/dashboarduser/item" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  return element;
};