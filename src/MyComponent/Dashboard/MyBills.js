import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { 
  Receipt, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function MyBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bills on mount
  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const res = await api.get("/billing/my");
      setBills(res.data);
    } catch (err) {
      console.error("Failed to load bills:", err);
      alert("Could not load bills");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pay Now function
  const payNow = async (bill_id) => {
    try {
      await api.post("/payments/pay", { bill_id });
      alert("Payment successful ✅");
      loadBills(); // refresh after payment
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed ❌");
    }
  };
  // ✅ Download Receipt function
  const downloadReceipt = async (bill_id) => {
    try {
      const res = await api.get(`/payments/receipt/${bill_id}`, {
        responseType: "blob",
      });
    
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
    
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt_${bill_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    
      window.URL.revokeObjectURL(url);
    
    } catch (err) {
      console.error("Receipt error:", err);
      alert("Failed to download receipt");
    }
  };

  if (loading) return <div className="p-4 fw-bold">Loading bills...</div>;

  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">My Maintenance Bills</h4>
        <p className="text-secondary small">View and pay your society dues</p>
      </div>

      <div className="row g-4">
        {bills.length === 0 ? (
          <p className="text-secondary p-4">No bills found</p>
        ) : (
          bills.map((bill) => (
            <div className="col-md-6 col-lg-4" key={bill.id}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  className={`p-1 ${
                    bill.status === "PAID" ? "bg-success" : "bg-warning"
                  }`}
                ></div>
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <p className="text-secondary small mb-0">Bill #{bill.id}</p>
                      <h5 className="fw-bold mb-0">{bill.month}</h5>
                    </div>
                    {bill.status === "PAID" ? (
                      <CheckCircle2 className="text-success" size={24} />
                    ) : (
                      <AlertCircle className="text-warning" size={24} />
                    )}
                  </div>

                  <div className="bg-light p-3 rounded-3 mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-secondary small">Amount Due</span>
                      <span className="fw-bold">₹{bill.total_amount}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary small">Status</span>
                      <span
                        className={`fw-bold ${
                          bill.status === "PAID"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    {bill.status === "PENDING" ? (
                      <button
                        onClick={() => payNow(bill.id)}
                        className="btn text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                        style={{
                          backgroundColor: "#2a9d8f",
                          borderRadius: "10px",
                        }}
                      >
                        <CreditCard size={18} /> Pay Now
                      </button>
                      
                      
                    ) : (
                      <button
                          onClick={() => downloadReceipt(bill.id)}
                          className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                          style={{ borderRadius: "10px" }}>
                          <Download size={18} /> Download Receipt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}