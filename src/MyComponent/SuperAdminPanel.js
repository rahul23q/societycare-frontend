import React, { useState } from 'react';
import { ShieldAlert, Building2, Users, LogOut, Plus, Search, Trash2, IndianRupee } from 'lucide-react';

export default function SuperAdminPanel() {
  const [societies, setSocieties] = useState([
    { id: 'S101', name: 'Emerald Heights', admin: 'emerald_admin@admin.com', residents: 45 },
    { id: 'S102', name: 'Oceanic Towers', admin: 'oceanic_admin@admin.com', residents: 120 },
    { id: 'S103', name: 'Royal Residency', admin: 'royal@admin.com', residents: 88 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newSoc, setNewSoc] = useState({ name: '', adminEmail: '' });

  // Filter logic for Search
  const filteredSocieties = societies.filter(soc => 
    soc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    soc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this society? All data will be lost.")) {
      setSocieties(societies.filter(s => s.id !== id));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `S${Math.floor(Math.random() * 900) + 100}`,
      name: newSoc.name,
      admin: newSoc.adminEmail,
      residents: 0
    };
    setSocieties([...societies, newEntry]);
    setNewSoc({ name: '', adminEmail: '' });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-vh-100 bg-dark text-white p-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-3">
          <div className="d-flex align-items-center gap-2">
            <ShieldAlert size={32} className="text-warning" />
            <div>
              <h2 className="fw-bold mb-0">SOCIETYCARE MASTER</h2>
              <p className="text-secondary small mb-0">Super Admin Control Center</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            <LogOut size={18} className="me-2"/> Logout
          </button>
        </div>

        {/* Create New Society Section */}
        <div className="card bg-secondary bg-opacity-10 border-secondary p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Register New Society</h5>
          <form onSubmit={handleCreate} className="row g-3">
            <div className="col-md-5">
              <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="Society Name" 
                value={newSoc.name} onChange={(e) => setNewSoc({...newSoc, name: e.target.value})} required />
            </div>
            <div className="col-md-5">
              <input type="email" className="form-control bg-dark border-secondary text-white" placeholder="Assign Admin Email" 
                value={newSoc.adminEmail} onChange={(e) => setNewSoc({...newSoc, adminEmail: e.target.value})} required />
            </div>
            <div className="col-md-2">
              <button className="btn btn-warning w-100 fw-bold"><Plus size={18}/> Create</button>
            </div>
          </form>
        </div>

        {/* Management Area */}
        <div className="card bg-transparent border-secondary p-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h4 className="fw-bold mb-0">Active Societies</h4>
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-dark border-secondary text-secondary"><Search size={18}/></span>
              <input type="text" className="form-control bg-dark border-secondary text-white" 
                placeholder="Search by name or ID..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="text-secondary small">
                  <th>ID</th><th>SOCIETY NAME</th><th>ADMIN USER</th><th>RESIDENTS</th><th className="text-end">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredSocieties.map(s => (
                  <tr key={s.id}>
                    <td className="text-warning fw-bold">{s.id}</td>
                    <td className="fw-bold">{s.name}</td>
                    <td className="text-secondary">{s.admin}</td>
                    <td><Users size={14} className="me-2"/>{s.residents}</td>
                    <td className="text-end">
                      <button onClick={() => handleDelete(s.id)} className="btn btn-link text-danger p-0">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSocieties.length === 0 && <p className="text-center text-secondary py-4">No societies found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}