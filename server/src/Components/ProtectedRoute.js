import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in
  if (!token) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/" />;
  }

  // If admin-only page
  if (adminOnly && role !== "admin") {
    alert("Access denied. Admins only.");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
