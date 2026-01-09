import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societyId: '',
    fullName: '',
    email: '',
    password: ''
  });

  const themeTeal = "#2a9d8f";

  // Mock list of societies created by Super Admin
  const activeSocieties = [
    { id: 'SOC_001', name: 'Green Valley Apartments' },
    { id: 'SOC_002', name: 'Skyline Residency' },
    { id: 'SOC_003', name: 'Royal Heritage Society' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.societyId) return alert("Please select your society!");
    
    // Simulate resident registration
    console.log("Resident Registered for:", formData.societyId);
    alert("Registration successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden bg-light">
      <div className="row g-0 h-100">
        {/* Form Side */}
        <div className="col-12 col-lg-6 d-flex flex-column p-5 bg-white justify-content-center align-items-center">
          <div style={{ maxWidth: '420px', width: '100%' }}>
            <Link to="/login" className="text-decoration-none text-secondary small d-flex align-items-center gap-2 mb-4">
              <ArrowLeft size={16} /> Back to login
            </Link>

            <h2 className="fw-bold mb-1">Resident Registration</h2>
            <p className="text-secondary small mb-4">Join your society's digital portal</p>

            <form onSubmit={handleSubmit}>
              {/* Society Selection Dropdown */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Select Your Society</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Building2 size={18} /></span>
                  <select 
                    className="form-select py-2"
                    required
                    onChange={(e) => setFormData({...formData, societyId: e.target.value})}
                  >
                    <option value="">-- Choose your building --</option>
                    {activeSocieties.map(soc => (
                      <option key={soc.id} value={soc.id}>{soc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Full Name</label>
                <input 
                  type="text" className="form-control py-2" placeholder="Name" required 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Email</label>
                <input 
                  type="email" className="form-control py-2" placeholder="email" required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Password</label>
                <input 
                  type="password" className="form-control py-2" placeholder="••••••••" required 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <button type="submit" className="btn w-100 py-3 text-white fw-bold" style={{ backgroundColor: themeTeal, borderRadius: '10px' }}>
                Join Society <ArrowRight size={18} className="ms-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Info Side */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-center p-5" 
             style={{ background: 'linear-gradient(135deg, #1f4d47 0%, #153a35 100%)' }}>
          <Building2 size={80} className="text-white opacity-25 mb-4" />
          <h2 className="text-white fw-bold">Welcome to SocietyCare</h2>
          <p className="text-white opacity-75">Select your society from the list to start managing your bills and communications.</p>
        </div>
      </div>
    </div>
  );
}