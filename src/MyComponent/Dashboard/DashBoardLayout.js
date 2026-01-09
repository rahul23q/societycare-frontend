import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  Receipt, 
  ShieldAlert,
  CreditCard,
  Megaphone,
  Bell 
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- States ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // --- 1. AUTH & ROLE LOGIC (MUST BE FIRST) ---
  const userRole = localStorage.getItem("userRole") || "admin";
  
  // These variables fix the 'isSuperAdmin is not defined' error
  const isSuperAdmin = userRole === "super-admin";
  const isAdmin = userRole === "admin";

  const profile = { 
    full_name: isSuperAdmin ? "Master Admin" : (isAdmin ? "Society Admin" : "") 
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- 2. DYNAMIC NAV ITEMS ---
  // Now that isSuperAdmin is defined above, this section will work perfectly
  const navItems = isSuperAdmin 
    ? [
        { icon: ShieldAlert, label: "Master Control", path: "/super-admin-control-center" },
        { icon: Building2, label: "Societies List", path: "/super-admin-societies" },
      ]
    : isAdmin 
    ? [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
      { icon: Users, label: "Residents", path: "/admin/residents" }, // Ensure this matches App.js
      { icon: CreditCard, label: "Billing", path: "/admin/billing" },
      { icon: Megaphone, label: "Notice Board", path: "/admin/notices" }
      
      ]
    : [
        { icon: LayoutDashboard, label: "Dashboard", path: "/resident" },
        { icon: Receipt, label: "My Bills", path: "/resident/bills" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: Users, label: "Residents", path: "/admin/residents" }, // Ensure this matches App.js
        { icon: CreditCard, label: "Billing", path: "/admin/billing" },
        { icon: Megaphone, label: "Notice Board", path: "/admin/notices" }
      ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      
      {/* --- Mobile Header --- */}
      <header className="d-lg-none fixed-top bg-white border-bottom px-3 d-flex align-items-center justify-content-between" style={{ height: '64px', zIndex: 1050 }}>
        <div className="d-flex align-items-center gap-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-link p-0 text-dark border-0 shadow-none">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="d-flex align-items-center gap-2 ms-2">
            <div className="p-1 rounded-2 text-white" style={{ backgroundColor: '#2a9d8f' }}>
              <Building2 size={18} />
            </div>
            <span className="fw-bold">SocietyCare</span>
          </div>
        </div>
        <button className="btn position-relative border-0 bg-transparent">
          <Bell size={20} className="text-secondary" />
          <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </button>
      </header>

      {/* --- Sidebar Navigation --- */}
      <aside 
        className="position-fixed top-0 start-0 h-100 bg-white border-end d-flex flex-column shadow-sm transition-all"
        style={{ 
          width: '260px', 
          zIndex: 1060, 
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <style>{`
          @media (min-width: 992px) {
            aside { transform: translateX(0) !important; }
          }
        `}</style>

        {/* Logo Section */}
        <div className="p-4 d-flex align-items-center gap-3 border-bottom">
          <div className="p-2 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#2a9d8f' }}>
            <Building2 size={24} />
          </div>
          <span className="fs-5 fw-bold text-dark">SocietyCare</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow-1 overflow-auto p-3 pt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`d-flex align-items-center gap-3 px-3 py-2.5 mb-1 rounded-3 text-decoration-none transition-all ${
                  isActive ? "text-white shadow-sm" : "text-secondary hover-bg-light"
                }`}
                style={{ 
                  backgroundColor: isActive ? '#2a9d8f' : 'transparent',
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Account Menu */}
        <div className="p-3 border-top position-relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="btn w-100 d-flex align-items-center gap-3 p-2 rounded-3 border-0 bg-light shadow-none"
          >
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-white shadow-sm fw-bold" style={{ width: '38px', height: '38px', color: '#2a9d8f' }}>
              {profile.full_name.charAt(0)}
            </div>
            <div className="flex-grow-1 text-start overflow-hidden">
              <p className="small fw-bold mb-0 text-truncate text-dark">{profile.full_name}</p>
              <p className="text-secondary mb-0 fw-bold" style={{ fontSize: '9px', textTransform: 'uppercase' }}>
                {userRole.replace('-', ' ')}
              </p>
            </div>
            <ChevronDown size={14} className={`text-secondary transition-all ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {userMenuOpen && (
            <div className="position-absolute bottom-100 start-0 w-100 p-2 mb-2 bg-white border rounded-3 shadow-lg" style={{ zIndex: 1100 }}>
              <button onClick={handleSignOut} className="btn btn-link text-danger text-decoration-none w-100 text-start d-flex align-items-center gap-2 p-2 small fw-bold border-0 shadow-none">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="transition-all" style={{ paddingLeft: '0' }}>
        <style>{`
          @media (min-width: 992px) {
            main { padding-left: 260px !important; }
          }
        `}</style>
        
        <div className="d-lg-none" style={{ height: '64px' }}></div>
        <div className="p-4 p-md-5">
          {children}
        </div>
      </main>
    </div>
  );
}