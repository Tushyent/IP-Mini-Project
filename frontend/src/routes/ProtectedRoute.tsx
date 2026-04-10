import { Navigate } from "react-router-dom";
import { auth } from "../utils/auth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!auth.getToken()) {
    return <Navigate to="/student/login" replace />;
  }
  return <>{children}</>;
}
