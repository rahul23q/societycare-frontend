import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const themeTeal = "#2a9d8f";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", formData);

    console.log("LOGIN RESPONSE:", res.data);

    const { token, role } = res.data;

    // ✅ store exactly what backend sends
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);

    // ✅ redirect based on BACKEND role
    if (role === "SUPER_ADMIN") {
      navigate("/super-admin-control-center");
    } 
    else if (role === "SOCIETY_ADMIN") {
      navigate("/admin");
    } 
    else if (role === "RESIDENT") {
      navigate("/resident");
    } 
    else {
      alert("Unknown role from server: " + role);
    }

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("Login failed");
  }
};



  
  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden">
      <div className="row g-0 h-100">
        
        {/* --- Left Side: Login Form --- */}
        <div className="col-12 col-lg-6 d-flex flex-column p-4 p-md-5 bg-white justify-content-center align-items-center">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            
            {/* Back Link */}
            <Link to="/" className="text-decoration-none text-secondary small d-flex align-items-center gap-2 mb-5 hover-teal">
              <ArrowLeft size={16} /> Back to home
            </Link>

            {/* Logo and Welcome */}
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="p-2 rounded-3 text-white shadow-sm" style={{ backgroundColor: themeTeal }}>
                <Building2 size={24} />
              </div>
              <span className="fs-4 fw-bold text-dark">SocietyCare</span>
            </div>

            <h2 className="fw-bold text-dark mb-1">Welcome back</h2>
            <p className="text-secondary small mb-5">Sign in to access your dashboard</p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark opacity-75">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    className="form-control bg-white border-start-0 py-2" 
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="form-label small fw-bold text-dark opacity-75">Password</label>
                <div className="input-group shadow-sm border rounded-2 overflow-hidden" style={{ backgroundColor: '#fffbeb' }}>
                  <span className="input-group-text bg-transparent border-0 text-secondary">
                    <Lock size={18} />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control bg-transparent border-0 py-2" 
                    placeholder="••••••••••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    className="input-group-text bg-transparent border-0" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye size={18} className="text-secondary opacity-50" />
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button 
                type="submit" 
                className="btn w-100 py-3 fw-bold text-white shadow-sm mb-4"
                style={{ backgroundColor: themeTeal, borderRadius: '10px' }}
              >
                Sign In
              </button>

              {/* Create Account Link */}
              <div className="text-center">
                <p className="text-secondary small">
                  Don't have an account? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: themeTeal }}>Create one</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* --- Right Side: Branding Panel (Hidden on Mobile) --- */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-center p-5" 
             style={{ background: 'linear-gradient(135deg, #1f4d47 0%, #153a35 100%)' }}>
          
          <div className="mb-4 p-4 rounded-4 bg-white bg-opacity-10 d-inline-block">
            <Building2 size={64} className="text-white opacity-75" />
          </div>
          
          <h1 className="display-5 fw-bold text-white mb-3">Manage Your Society with Ease</h1>
          <p className="lead text-white opacity-50 mx-auto" style={{ maxWidth: '450px', fontSize: '1rem' }}>
            Join thousands of housing societies using SocietyCare to streamline maintenance collection and resident management.
          </p>
        </div>

      </div>
    </div>
  );
}