import React, { useState, useEffect } from "react";
import { useResto } from "../../context/RestoContext";
import { KDSStatsFooter } from "./KDSStatsFooter";
import { ChefHat, Check, Flame, Clock, Volume2, Filter } from "lucide-react";

export const KDSQueue = () => {
  const {
    activeOrders,
    updateOrderStatus,
    kdsFilter,
    setKdsFilter
  } = useResto();

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = activeOrders.filter((o) => {
    if (kdsFilter === "All") return true;
    return o.status === kdsFilter;
  });

  const getElapsedSeconds = (createdAt) => {
    const start = new Date(createdAt).getTime();
    return Math.max(0, Math.floor((currentTime - start) / 1000));
  };

  const formatTimerStr = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getNextStatus = (currStatus) => {
    if (currStatus === "Confirmed") return "Preparing";
    if (currStatus === "Preparing") return "Ready";
    if (currStatus === "Ready") return "Served";
    return "Served";
  };

  return (
    <div className="kds-viewport-container fade-in">
      <div className="kds-main-grid">
        {/* Left Sidebar Filter Bar */}
        <aside className="kds-sidebar">
          <div className="kds-sidebar-brand">
            <ChefHat size={28} color="#FF6B35" />
            <h2>KDS LIVE PASS</h2>
          </div>

          <nav className="kds-filter-nav">
            {["All", "Confirmed", "Preparing", "Ready", "Served"].map((st) => (
              <button
                key={st}
                className={`kds-nav-btn ${kdsFilter === st ? "active" : ""}`}
                onClick={() => setKdsFilter(st)}
              >
                <span>{st}</span>
                <span className="badge-tag">
                  {st === "All"
                    ? activeOrders.length
                    : activeOrders.filter((o) => o.status === st).length}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Orders Display Queue */}
        <main className="kds-queue-content">
          <div className="kds-orders-grid">
            {filteredOrders.length === 0 ? (
              <div className="empty-kds-text">
                <ChefHat size={48} color="#666680" />
                <h2>No active orders in this queue</h2>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const elapsedSec = getElapsedSeconds(order.createdAt);
                const isOverdue = elapsedSec > 15 * 60; // turns red after 15 mins
                const isVIP = order.priority === "high";

                return (
                  <div
                    key={order.id}
                    className={`kds-card truffles-card ${isOverdue ? "overdue-card" : ""}`}
                  >
                    {/* Card Header */}
                    <div className="kds-card-header">
                      <div className="kds-order-meta">
                        <span className="price-mono">{order.id}</span>
                        <div
                          className={`kds-timer-badge ${
                            isOverdue ? "timer-overdue" : ""
                          }`}
                        >
                          <Clock size={14} />
                          <span className="timer-stats-mono" style={{ fontSize: "16px" }}>
                            {formatTimerStr(elapsedSec)}
                          </span>
                        </div>
                      </div>

                      {/* Table Number Badge */}
                      <div
                        className={`kds-table-badge ${
                          isVIP ? "badge-vip" : isOverdue ? "badge-delayed" : "badge-normal"
                        }`}
                      >
                        {isVIP && <Flame size={14} />} Table {order.tableId}
                      </div>
                    </div>

                    {/* Item List with Customizations */}
                    <div className="kds-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="kds-item-row">
                          <span className="kds-item-qty">{item.qty}x</span>
                          <div className="kds-item-details">
                            <span className="kds-item-name">{item.name}</span>
                            {item.customizations && item.customizations.length > 0 && (
                              <div className="kds-cust-pills-row">
                                {item.customizations.map((c, i) => (
                                  <span key={i} className="badge-tag">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Special Instructions Callout */}
                    {order.notes && (
                      <div className="kds-instructions-callout">
                        <strong>NOTE:</strong> {order.notes}
                      </div>
                    )}

                    {/* Action Button (Min 56px touch target) */}
                    <button
                      className="kds-action-btn"
                      onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                    >
                      <Check size={24} />
                      <span>MARK {getNextStatus(order.status).toUpperCase()}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      <KDSStatsFooter />
    </div>
  );
};
