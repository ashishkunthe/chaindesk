import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import TranscriptDetail from "./pages/TranscriptDetails";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transcript/:id"
          element={
            <ProtectedRoute>
              <TranscriptDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
