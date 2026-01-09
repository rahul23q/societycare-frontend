import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './services/api';
// Layouts and Main Sections
import Headers from './MyComponent/Headers';
import Footer from './MyComponent/Footer';
import DashboardLayout from './MyComponent/Dashboard/DashBoardLayout';
import ScrollToHash from "./routes/ScrollToHash";


// IMPORTANT: Add this line here
import ProtectedRoute from './MyComponent/ProtectedRoute'; 

// Public Pages
import HeroSection from './MyComponent/HeroSection';
import AboutUs from './MyComponent/AboutUs';



// Dashboard Pages
import LoginPage from './MyComponent/Dashboard/LoginPage';
import AdminDashboard from './MyComponent/Dashboard/AdminDashBoard';
import ResidentDashboard from './MyComponent/Dashboard/ResidentDashboard';
import RegisterPage from './MyComponent/Dashboard/RegisterPage';
import SuperAdminPanel from './MyComponent/SuperAdminPanel';
import ResidentList from './MyComponent/Dashboard/ResidentList'; // Import the new list page
import MyBills from './MyComponent/Dashboard/MyBills';
import BillGenerator from './MyComponent/Dashboard/BillGenerator';
import NoticeBoard from './MyComponent/NoticeBoard';



function App() {
  useEffect(() => {
    api.get("/health")
      .then(res => console.log("✅ Backend connected:", res.data))
      .catch(err => console.log("❌ Backend not connected:", err.response?.data || err.message));
  }, []);
  return (
    <Router>
      <ScrollToHash/>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<><Headers /><HeroSection /><Footer /></>} />
          <Route path="/about" element={<><Headers /><AboutUs /><Footer /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Super Admin Control */}
          <Route path="/super-admin-control-center" element={
            <ProtectedRoute allowedRole="SUPER_ADMIN">
              <SuperAdminPanel />
            </ProtectedRoute>
          } />

          {/* Society Admin Dashboard */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="SOCIETY_ADMIN">
              <DashboardLayout><AdminDashboard /></DashboardLayout>
            </ProtectedRoute>
            
          } />
          <Route path="/admin/billing" element={
            <ProtectedRoute allowedRole="SOCIETY_ADMIN">
              <DashboardLayout>
              <BillGenerator />
              </DashboardLayout>
              </ProtectedRoute>
          } />
          <Route path="/admin/notices" element={
            <ProtectedRoute allowedRole="SOCIETY_ADMIN">
              <DashboardLayout><NoticeBoard /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Society Residents List (The page we just built) */}
          <Route path="/admin/residents" element={
            <ProtectedRoute allowedRole="SOCIETY_ADMIN">
              <DashboardLayout><ResidentList /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Resident Dashboard */}
          <Route path="/resident" element={
            <ProtectedRoute allowedRole="RESIDENT">
              <DashboardLayout><ResidentDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/resident/bills" element={
            <ProtectedRoute allowedRole="RESIDENT">
            <DashboardLayout><MyBills /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/resident/notices" element={
            <ProtectedRoute allowedRole="RESIDENT">
              <DashboardLayout><NoticeBoard /></DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;