import React from 'react';
import { Megaphone, IndianRupee, Clock, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResidentDashboard() {
  const theme = { teal: '#2a9d8f' };

  // Mock Notices - In a real app, these come from your database
  const activeNotices = [
    { id: 1, title: "Water Tank Cleaning", date: "Jan 07", category: "Urgent" },
    { id: 2, title: "Republic Day Event", date: "Jan 20", category: "Event" }
  ];

  return (
    <div className="container-fluid p-0">
      <div className="mb-5">
        <h1 className="fw-bold h3 mb-1">My Resident Dashboard</h1>
        <p className="text-secondary">Welcome to your society portal.</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Summary Cards */}
        <div className="col-lg-8">
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="p-3 rounded-3" style={{ backgroundColor: '#eff6f5' }}>
                    <IndianRupee size={24} style={{ color: theme.teal }} />
                  </div>
                  <span className="badge bg-warning bg-opacity-10 text-warning px-3">Due</span>
                </div>
                <h3 className="fw-bold mb-1">₹3,500</h3>
                <p className="text-secondary small mb-3">Current Maintenance Dues</p>
                <Link to="/resident/bills" className="btn w-100 text-white fw-bold" style={{ backgroundColor: theme.teal, borderRadius: '10px' }}>
                  Pay Now
                </Link>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="p-3 rounded-3 bg-light">
                    <Clock size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="fw-bold mb-1">2</h3>
                <p className="text-secondary small">Active Helpdesk Tickets</p>
                <Link to="/resident/complaints" className="text-decoration-none small fw-bold" style={{ color: theme.teal }}>
                  View status <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Notice Board Feed */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Megaphone size={20} style={{ color: theme.teal }} />
              <h5 className="fw-bold mb-0">Recent Notices</h5>
            </div>

            <div className="d-flex flex-column gap-3">
              {activeNotices.length > 0 ? (
                activeNotices.map((notice) => (
                  <div key={notice.id} className="p-3 rounded-3 border-start border-4" style={{ backgroundColor: '#fcfdfe', borderColor: notice.category === 'Urgent' ? '#e76f51' : theme.teal }}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold small">{notice.title}</span>
                      <span className="text-muted" style={{ fontSize: '10px' }}>{notice.date}</span>
                    </div>
                    <span className={`badge ${notice.category === 'Urgent' ? 'bg-danger' : 'bg-info'} bg-opacity-10 ${notice.category === 'Urgent' ? 'text-danger' : 'text-info'} p-1 px-2`} style={{ fontSize: '10px' }}>
                      {notice.category}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-secondary small py-4">No active notices.</p>
              )}
            </div>
            
            <Link to="/resident/notices" className="btn btn-light w-100 mt-4 small fw-bold text-secondary rounded-3">
              View All Notices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}