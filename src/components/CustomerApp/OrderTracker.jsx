import React, { useEffect, useState } from "react";
import { useResto } from "../../context/RestoContext";
import {
  CheckCircle,
  ChefHat,
  Bell,
  CheckCircle2,
  Plus,
  Receipt,
  Clock
} from "lucide-react";

export const OrderTracker = ({ onOrderMore, onPayBill }) => {
  const { activeOrders, customerActiveOrderId, selectedTableIdForCustomer } = useResto();

  const [tick, setTick] = useState(0);

  // Poll state every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(timer);
  }, []);

  const currentOrder = activeOrders.find(
    (o) => o.id === customerActiveOrderId || o.tableId === selectedTableIdForCustomer
  );

  const currentStatus = currentOrder ? currentOrder.status : "Confirmed";

  const pipeline = [
    { key: "Confirmed", label: "Order Confirmed", icon: CheckCircle, time: "Just now" },
    { key: "Preparing", label: "Preparing in Kitchen", icon: ChefHat, time: "Estimated 12 mins" },
    { key: "Ready", label: "Ready at Pass", icon: Bell, time: "Hot & fresh" },
    { key: "Served", label: "Served at Table", icon: CheckCircle2, time: "Enjoy your meal" }
  ];

  const getStepState = (stepKey) => {
    const orderIndex = pipeline.findIndex((p) => p.key === currentStatus);
    const stepIndex = pipeline.findIndex((p) => p.key === stepKey);

    if (stepIndex < orderIndex) return "completed";
    if (stepIndex === orderIndex) return "active";
    return "pending";
  };

  return (
    <div className="order-tracker-screen fade-in">
      <div className="tracker-card truffles-card">
        <div className="tracker-header">
          <div className="brand-text">
            <h1 className="brand-truffles-title" style={{ fontSize: "20px" }}>TRUFFLES</h1>
            <span className="brand-truffles-tagline">LIVE ORDER TRACKER</span>
          </div>
          <div className="table-badge-mono">Table {selectedTableIdForCustomer}</div>
        </div>

        {currentOrder && (
          <div className="order-meta-banner">
            <span className="price-mono" style={{ color: "#FF6B35" }}>{currentOrder.id}</span>
            <span className="caption-text">
              <Clock size={12} inline /> Auto-syncing status
            </span>
          </div>
        )}

        {/* Vertical Pipeline Tracker */}
        <div className="vertical-pipeline">
          {pipeline.map((step, idx) => {
            const IconComp = step.icon;
            const state = getStepState(step.key);

            return (
              <div key={step.key} className={`pipeline-step ${state}`}>
                <div className="step-icon-wrap">
                  <IconComp size={20} />
                  {idx < pipeline.length - 1 && <div className="vertical-line"></div>}
                </div>
                <div className="step-info">
                  <h3 className="step-label">{step.label}</h3>
                  <span className="caption-text">{step.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Itemized Order Breakdown */}
        {currentOrder && (
          <div className="tracker-items-breakdown">
            <h3>Items in your order</h3>
            <div className="tracker-items-list">
              {currentOrder.items.map((item, i) => (
                <div key={i} className="tracker-item-row">
                  <span className="item-qty-badge">{item.qty}x</span>
                  <span className="item-name">{item.name}</span>
                  <span className="price-mono">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tracker-footer-actions">
          <button className="btn-secondary" style={{ flex: 1 }} onClick={onOrderMore}>
            <Plus size={16} /> Add More Items
          </button>
          <button className="btn-primary" style={{ flex: 1 }} onClick={onPayBill}>
            <Receipt size={16} /> Pay Bill
          </button>
        </div>
      </div>
    </div>
  );
};
