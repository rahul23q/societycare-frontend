import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Users, Mail, Home } from "lucide-react";

export default function ResidentList() {

  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {
    try {
      const res = await api.get("/societyadmin/residents");
      console.log("RESIDENTS:", res.data);
      setResidents(res.data || []);
    } catch (err) {
      console.error("Resident load error:", err);
      alert("Failed to load residents");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 fw-bold">Loading residents...</div>;
  }

  return (
    <div className="p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Residents</h4>
          <p className="text-secondary small mb-0">
            All flat owners & tenants in your society
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Flat</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>

              {residents.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-secondary">
                    No residents found
                  </td>
                </tr>
              )}

              {residents.map((r) => (
                <tr key={r.id}>
                  <td className="fw-semibold d-flex align-items-center gap-2">
                    <Users size={16} className="text-secondary" />
                    {r.name}
                  </td>
                  <td className="text-secondary">
                    <Mail size={14} className="me-1" /> {r.email}
                  </td>
                  <td className="fw-bold">
                    <Home size={14} className="me-1" /> {r.flat_number}
                  </td>
                  <td>{r.block || "-"}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}