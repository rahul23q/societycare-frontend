import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  IndianRupee, Users, Home, FileText,
  Clock, Plus, CheckCircle
} from "lucide-react";

import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

export default function AdminDashboard() {
  const theme = {
    teal: "#2a9d8f",
    mintLight: "#eff6f5",
    danger: "#e76f51"
  };

  const [stats, setStats] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [pendingBills, setPendingBills] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/societyadmin/dashboard");
      setStats(res.data.stats);
      setRecentPayments(res.data.recentPayments || []);
      setPendingBills(res.data.pendingBills || []);
      setTrend(res.data.monthlyTrend || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };
  const loadResidents = async () => {
    try {
      const res = await api.get("/societyadmin/residents");
      setResidents(res.data);
    } catch (err) {
      console.error("Resident load error:", err);
    }
  };

  // Function to manually mark a bill as paid (Offline Payment)
  const handleMarkAsPaid = async (billId) => {
    if (window.confirm("Mark this bill as paid via Cash/Offline?")) {
      try {
        await api.post(`/societyadmin/mark-paid/${billId}`, { method: 'Offline' });
        loadDashboard(); // Refresh data
      } catch (err) {
        alert("Failed to update status");
      }
    }
  };

  if (loading || !stats) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-teal" role="status"></div>
        <span className="ms-3 fw-bold">Loading Society Data...</span>
      </div>
    );
  }

  const statCards = [
    { label: "Total Collection", value: `₹${stats.totalCollection}`, icon: IndianRupee, color: theme.teal },
    { label: "Pending Dues", value: `₹${stats.pendingDues}`, icon: Clock, color: theme.danger },
    { label: "Total Flats", value: stats.totalFlats, icon: Home, color: "#457b9d" },
    { label: "Active Residents", value: stats.activeResidents, icon: Users, color: "#1d3557" },
  ];

  const pieData = [
    { name: "Paid", value: Number(stats.totalCollection) || 0 },
    { name: "Pending", value: Number(stats.pendingDues) || 0 }
  ];

  return (
    <div className="container-fluid p-0">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h1 className="fw-bold h2 mb-1">Welcome back, Admin!</h1>
          <p className="text-secondary">Dashboard summary for your society management.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn bg-white shadow-sm px-4 py-2 border-0 rounded-3">
            <FileText size={18} className="me-2" /> Reports
          </button>
          <button className="btn text-white px-4 py-2 border-0 rounded-3" style={{ backgroundColor: theme.teal }}>
            <Plus size={18} className="me-2" /> Add Resident
          </button>
        </div>
      </div>

      {/* DYNAMIC STATS CARDS */}
      <div className="row g-4 mb-5">
        {statCards.map((stat, i) => (
          <div className="col-xl-3 col-md-6" key={i}>
            <div className="card shadow-sm border-0 p-4 rounded-4 h-100 position-relative overflow-hidden">
              <div className="position-relative" style={{ zIndex: 2 }}>
                <p className="text-secondary small fw-bold text-uppercase mb-1" style={{ letterSpacing: '0.5px' }}>{stat.label}</p>
                <h3 className="fw-bold mb-0">{stat.value}</h3>
              </div>
              <stat.icon 
                size={48} 
                className="position-absolute" 
                style={{ right: '-10px', bottom: '-10px', color: stat.color, opacity: 0.1 }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4 rounded-4 h-100">
            <h5 className="fw-bold mb-4">Collection Trend</h5>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="collection" fill={theme.teal} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 rounded-4 h-100 text-center">
            <h5 className="fw-bold mb-4">Payment Status</h5>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    <Cell fill={theme.teal} />
                    <Cell fill={theme.danger} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <div className="small fw-bold"><span style={{color: theme.teal}}>●</span> Paid</div>
              <div className="small fw-bold"><span style={{color: theme.danger}}>●</span> Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLES */}
      <div className="row g-4 mb-5">
        {/* RECENT PAYMENTS */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-header bg-transparent border-0 p-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Recent Payments</h5>
              <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold" style={{ color: theme.teal }}>View All</button>
            </div>
            <div className="card-body p-4 pt-0">
              {recentPayments.length === 0 ? (
                <div className="text-center py-4 text-secondary">No recent payments recorded.</div>
              ) : (
                recentPayments.map((p, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, color: theme.teal }}>
                        {p.flat_number?.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold small">{p.flat_number}</div>
                        <div className="small text-secondary">{p.name}</div>
                      </div>
                    </div>
                    <div className="text-end">
                       <div className="fw-bold text-success">₹{p.amount}</div>
                       <div className="extra-small text-muted">{p.date || 'Today'}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* PENDING DUES WITH MANUAL MARK ACTION */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-header bg-transparent border-0 p-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Pending Dues</h5>
              <span className="fw-bold text-danger small cursor-pointer">Send Reminders</span>
            </div>
            <div className="card-body p-4 pt-0">
              {pendingBills.length === 0 ? (
                <div className="text-center py-4 text-success fw-bold">All maintenance cleared! 🎉</div>
              ) : (
                pendingBills.map((b, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <div>
                      <div className="fw-bold small">{b.flat_number}</div>
                      <div className="small text-secondary">{b.name}</div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="fw-bold text-danger">₹{b.total_amount}</div>
                      <button 
                        onClick={() => handleMarkAsPaid(b.bill_id)}
                        className="btn btn-sm btn-outline-success rounded-pill p-1 px-2 border-0"
                        title="Mark as Paid"
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}