import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import UserCheckin from "../pages/UserCheckin";
import ProtectedRoute from "./protectedRoutes";

const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkin"
        element={
          <ProtectedRoute isPrivate>
            <UserCheckin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
