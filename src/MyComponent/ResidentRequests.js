import React, { useState } from 'react';
import { Check, X, UserCheck } from 'lucide-react';

export default function ResidentRequests() {
  const [requests, setRequests] = useState([
    { id: 1, name: "Rahul Sharma", flat: "A-402", email: "rahul@email.com" },
    { id: 2, name: "Sneha Patil", flat: "B-101", email: "sneha@email.com" }
  ]);

  const handleAction = (id, status) => {
    alert(`Resident ${status}`);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="card border-0 shadow-sm p-4 mt-4" style={{ borderRadius: '24px' }}>
      <div className="d-flex align-items-center gap-2 mb-4">
        <UserCheck className="text-teal" size={24} style={{ color: '#2a9d8f' }} />
        <h5 className="fw-bold mb-0">Pending Resident Approvals</h5>
      </div>

      {requests.length === 0 ? (
        <p className="text-muted small">No pending requests.</p>
      ) : (
        <div className="row g-3">
          {requests.map((req) => (
            <div key={req.id} className="col-12 p-3 border rounded-4 d-flex justify-content-between align-items-center bg-light">
              <div>
                <p className="fw-bold mb-0">{req.name} <span className="badge bg-secondary ms-2">{req.flat}</span></p>
                <p className="text-secondary small mb-0">{req.email}</p>
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => handleAction(req.id, 'Approved')} className="btn btn-success btn-sm rounded-3"><Check size={18}/></button>
                <button onClick={() => handleAction(req.id, 'Rejected')} className="btn btn-outline-danger btn-sm rounded-3"><X size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}