import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing";
import FacultyRegister from "../pages/FacultyRegister";
import FacultyLogin from "../pages/FacultyLogin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student/register" element={<Register />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/faculty/register" element={<FacultyRegister />} />
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
