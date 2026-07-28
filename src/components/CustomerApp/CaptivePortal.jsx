import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { Wifi, ArrowRight, CheckSquare, Square } from "lucide-react";

export const CaptivePortal = ({ onNext }) => {
  const { tables, selectedTableIdForCustomer, setSelectedTableIdForCustomer } = useResto();
  const [agreed, setAgreed] = useState(true);

  const handleStart = () => {
    if (!agreed) {
      alert("Please agree to the WiFi terms of service to continue.");
      return;
    }
    sessionStorage.setItem("truffles_table", selectedTableIdForCustomer);
    onNext();
  };

  return (
    <div className="captive-portal-screen fade-in">
      <div className="portal-card truffles-card">
        <div className="wifi-badge">
          <Wifi size={24} color="#FF6B35" />
          <span>Connected to Truffles-Free-WiFi</span>
        </div>

        <div className="portal-brand">
          <h1 className="brand-truffles-title" style={{ fontSize: "32px" }}>TRUFFLES</h1>
          <span className="brand-truffles-tagline">ORDER. EAT. REPEAT.</span>
        </div>

        <div className="portal-welcome">
          <h2>Welcome to Truffles</h2>
          <p className="body-text" style={{ textAlign: "center" }}>
            Order directly from your table — no app installation required.
          </p>
        </div>

        <div className="portal-table-select">
          <label className="caption-text">SELECT YOUR TABLE NUMBER:</label>
          <select
            value={selectedTableIdForCustomer}
            onChange={(e) => setSelectedTableIdForCustomer(e.target.value)}
          >
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                Table {t.number} ({t.id}) — {t.status === "vacant" ? "Vacant" : "Occupied"}
              </option>
            ))}
          </select>
        </div>

        <div className="terms-checkbox" onClick={() => setAgreed(!agreed)}>
          {agreed ? (
            <CheckSquare size={18} color="#FF6B35" />
          ) : (
            <Square size={18} color="#666680" />
          )}
          <span className="caption-text">I agree to Truffles WiFi Terms of Service</span>
        </div>

        <button className="btn-primary" style={{ width: "100%", marginTop: "12px" }} onClick={handleStart}>
          <span>Start Ordering</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
