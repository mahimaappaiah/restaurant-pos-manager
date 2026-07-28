import React from "react";
import { useResto } from "../../context/RestoContext";
import { Armchair, ArrowRight, AlertTriangle } from "lucide-react";

export const TableConfirm = ({ onNext }) => {
  const { selectedTableIdForCustomer, currentBranch, activeOrders } = useResto();

  const hasActiveOrder = activeOrders.some(
    (o) => o.tableId === selectedTableIdForCustomer && o.status !== "Cancelled"
  );

  return (
    <div className="table-confirm-screen fade-in">
      <div className="splash-card truffles-card">
        <div className="splash-brand">
          <h1 className="brand-truffles-title">TRUFFLES</h1>
          <span className="brand-truffles-tagline">ORDER. EAT. REPEAT.</span>
        </div>

        <div className="table-seated-badge">
          <Armchair size={40} color="#FF6B35" />
          <div className="table-title">You are at Table {selectedTableIdForCustomer}</div>
          <span className="caption-text">{currentBranch}</span>
        </div>

        {hasActiveOrder && (
          <div className="active-order-warning">
            <AlertTriangle size={18} color="#FACC15" />
            <span>This table has an active order in progress. You can add items to it!</span>
          </div>
        )}

        <button className="btn-primary" style={{ width: "100%" }} onClick={onNext}>
          <span>Explore Menu & Order</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
