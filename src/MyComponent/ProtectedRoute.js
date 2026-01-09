import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  

  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    console.log("ACCESS BLOCKED:", role, "REQUIRED:", allowedRole);
    return <Navigate to="/login" />;
  }

  return children;
}
