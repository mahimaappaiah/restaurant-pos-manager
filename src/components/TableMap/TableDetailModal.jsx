import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import {
  X,
  Users,
  Clock,
  Receipt,
  Plus,
  RefreshCw,
  CheckCircle2,
  Trash2,
  CreditCard
} from "lucide-react";

export const TableDetailModal = ({ table, onClose, onOpenNewOrder }) => {
  const {
    activeOrders,
    updateTableStatus,
    updateOrderStatus,
    goToBillingForTable,
    cancelOrder
  } = useResto();

  const [selectedStatus, setSelectedStatus] = useState(table.status);

  // Find active order for this table
  const activeOrder = activeOrders.find(
    (o) => o.tableId === table.id && o.status !== "Cancelled"
  );

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    updateTableStatus(table.id, newStatus);
  };

  const handleGenerateBill = () => {
    onClose();
    goToBillingForTable(table.id);
  };

  const statusOptions = [
    { value: "vacant", label: "Vacant (Green)", color: "#10b981" },
    { value: "occupied", label: "Occupied (Red)", color: "#ef4444" },
    { value: "awaiting_payment", label: "Awaiting Payment (Yellow)", color: "#f59e0b" },
    { value: "needs_cleaning", label: "Needs Cleaning (Blue)", color: "#3b82f6" },
    { value: "reserved", label: "Reserved (Grey)", color: "#6b7280" }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content table-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>Table {table.number} ({table.id})</h2>
            <span className={`status-pill status-${table.status}`}>
              {table.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <button className="icon-btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Quick Info Grid */}
          <div className="table-quick-info">
            <div className="info-box">
              <Users size={18} className="info-icon" />
              <div>
                <span className="info-label">Seated Guests</span>
                <span className="info-value">{table.guests || 0} Guests</span>
              </div>
            </div>

            <div className="info-box">
              <Clock size={18} className="info-icon" />
              <div>
                <span className="info-label">Seated Time</span>
                <span className="info-value">{table.seatedTime || "Not Seated"}</span>
              </div>
            </div>

            <div className="info-box accent-box">
              <Receipt size={18} className="info-icon" />
              <div>
                <span className="info-label">Order Subtotal</span>
                <span className="info-value price">₹{table.activeOrderTotal || 0}</span>
              </div>
            </div>
          </div>

          {/* Status Quick Switcher */}
          <div className="status-switcher-section">
            <label className="section-label">
              <RefreshCw size={14} /> Update Table Status
            </label>
            <div className="status-grid">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`status-opt-btn ${table.status === opt.value ? "selected" : ""}`}
                  style={{ "--btn-color": opt.color }}
                  onClick={() => handleStatusChange(opt.value)}
                >
                  <span className="dot" style={{ backgroundColor: opt.color }}></span>
                  {opt.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Order Summary */}
          <div className="active-order-section">
            <div className="section-header-row">
              <h3>Active Order Details</h3>
              {activeOrder && (
                <span className="order-id-badge">{activeOrder.id} • {activeOrder.status}</span>
              )}
            </div>

            {activeOrder ? (
              <div className="order-items-list">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <div className="item-qty-badge">{item.qty}x</div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="item-cust">
                          {item.customizations.join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="item-price">₹{item.price * item.qty}</div>
                  </div>
                ))}

                {activeOrder.notes && (
                  <div className="order-notes-box">
                    <strong>Kitchen Notes:</strong> {activeOrder.notes}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-order-placeholder">
                <Receipt size={32} />
                <p>No active order recorded for Table {table.number}</p>
                <button className="btn-primary" onClick={onOpenNewOrder}>
                  <Plus size={16} /> Create New Order
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>

          {activeOrder ? (
            <div className="footer-actions">
              <button
                className="btn-outline-danger"
                onClick={() => {
                  if (window.confirm(`Cancel order ${activeOrder.id}?`)) {
                    cancelOrder(activeOrder.id);
                    onClose();
                  }
                }}
              >
                <Trash2 size={16} /> Cancel Order
              </button>
              <button className="btn-primary-action" onClick={handleGenerateBill}>
                <CreditCard size={16} /> Generate Bill & Pay
              </button>
            </div>
          ) : (
            <button className="btn-primary-action" onClick={onOpenNewOrder}>
              <Plus size={16} /> New Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
