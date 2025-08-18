// // src/components/utils/ProtectedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const isTokenValid = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return false;
//   try {
//     const { exp } = JSON.parse(atob(token.split(".")[1]));
//     return exp * 1000 > Date.now();
//   } catch {
//     alert("Invalid token format. Please log in again.");
//     localStorage.removeItem("token");
//     return false;
//   }
// };

// export default function ProtectedRoute({ children }) {
//   return isTokenValid() ? children : <Navigate to="/login" />;
// }
import React from "react";
import { Navigate } from "react-router-dom";

const getTokenPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isValid = payload.exp * 1000 > Date.now();
    return isValid ? payload : null;
  } catch {
    alert("Invalid token format. Please log in again.");
    localStorage.removeItem("token");
    return null;
  }
};

export default function ProtectedRoute({ children, adminOnly = false }) {
  const payload = getTokenPayload();

  if (!payload) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && payload.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}
