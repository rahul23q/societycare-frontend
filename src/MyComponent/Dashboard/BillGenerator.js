import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function BillGenerator() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ SET MAINTENANCE
  const saveMaintenance = async () => {
    if (!amount) return alert("Enter maintenance amount");

    try {
      setLoading(true);
      await api.post("/billing/set-maintenance", { amount });
      alert("Maintenance amount saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save maintenance");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GENERATE BILLS
  const generateBills = async () => {
    if (!month) return alert("Select month");

    try {
      setLoading(true);
      const res = await api.post("/billing/generate", { month });
      alert(`Bills generated: ${res.data.bills_created}`);
      navigate("/admin"); // 🔥 auto return to dashboard
    } catch (err) {
      console.error(err);
      alert("Bill generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Bill Generator</h3>

        <button 
          onClick={() => navigate("/admin")}
          className="btn btn-outline-secondary fw-bold"
        >
          ← Return to Dashboard
        </button>
      </div>

      {/* SET MAINTENANCE */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="fw-bold mb-3">Set Monthly Maintenance</h5>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button 
          onClick={saveMaintenance} 
          disabled={loading}
          className="btn btn-success fw-bold"
        >
          Save Amount
        </button>
      </div>

      {/* GENERATE BILLS */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Generate Monthly Bills</h5>
        <input
          type="month"
          className="form-control mb-3"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button 
          onClick={generateBills} 
          disabled={loading}
          className="btn btn-primary fw-bold"
        >
          Generate Bills
        </button>
      </div>

    </div>
  );
}
