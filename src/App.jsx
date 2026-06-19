import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/auth-context"

import Register from "./pages/Register"
import Login from "./pages/Login"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ApplyLoan from "./pages/ApplyLoan"
import ProtectedRoute from "./components/ProtectedRoute"
import LoanDetails from "./pages/LoanDetails"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import LoanHistory from "./pages/LoanHistory"

export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>

      {/* 🔥 SMART ROOT LOGIC */}
      <Route
        path="/"
        element={
          (() => {
            const users =
              JSON.parse(localStorage.getItem("users")) || []

            // 🟡 First time → No users exist
            if (users.length === 0) {
              return <Navigate to="/register" replace />
            }

            // 🟡 Users exist but not logged in
            if (!user) {
              return <Navigate to="/login" replace />
            }

            // 🟢 Logged in → redirect by role
            return user.role === "admin"
              ? <Navigate to="/admin/dashboard" replace />
              : <Navigate to="/dashboard" replace />
          })()
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/apply-loan" element={<ApplyLoan />} />
      <Route path="/loan/:id" element={<LoanDetails />} />

      <Route path="*" element={<NotFound />} />
      
      <Route path="/profile" element={<Profile />} />
      <Route path="/loan-history" element={<LoanHistory />} />
      
      

    </Routes>
  )
}