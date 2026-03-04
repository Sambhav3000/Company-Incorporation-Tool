import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MultiStepForm from "./pages/MultiStepForm";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import { getToken } from "./utils/auth";
import type { JSX } from "react";
import Signup from "./pages/Signup";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken();      
  if (!token) return <Navigate to="/" replace />; 
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/step1"
          element={
            <ProtectedRoute>
              <MultiStepForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/step2/:companyId"
          element={
            <ProtectedRoute>
              <MultiStepForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;