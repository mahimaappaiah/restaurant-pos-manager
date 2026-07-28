import React, { useState, useEffect } from "react";
import { useResto } from "../context/RestoContext";
import {
  Store,
  Clock,
  LayoutGrid,
  ListOrdered,
  CreditCard,
  UtensilsCrossed,
  BarChart3,
  Users
} from "lucide-react";

export const Navbar = () => {
  const {
    branches,
    currentBranch,
    setCurrentBranch,
    activeTab,
    setActiveTab,
    tables
  } = useResto();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const occupiedCount = tables.filter(
    (t) => t.status === "occupied" || t.status === "awaiting_payment"
  ).length;

  const totalTables = tables.length;

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <header className="app-header">
      <div className="header-left">
        {/* TRUFFLES Logo & Tagline Spec */}
        <div className="brand-logo">
          <div className="brand-text">
            <h1 className="brand-truffles-title">TRUFFLES</h1>
            <span className="brand-truffles-tagline">ORDER. EAT. REPEAT.</span>
          </div>
        </div>

        <div className="branch-selector-wrapper">
          <Store size={18} className="branch-icon" />
          <select
            className="branch-select"
            value={currentBranch}
            onChange={(e) => setCurrentBranch(e.target.value)}
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="header-nav">
        <button
          className={`nav-tab ${activeTab === "table_map" ? "active" : ""}`}
          onClick={() => setActiveTab("table_map")}
        >
          <LayoutGrid size={18} />
          <span>Table Map</span>
        </button>

        <button
          className={`nav-tab ${activeTab === "live_orders" ? "active" : ""}`}
          onClick={() => setActiveTab("live_orders")}
        >
          <ListOrdered size={18} />
          <span>Live Orders</span>
        </button>

        <button
          className={`nav-tab ${activeTab === "billing" ? "active" : ""}`}
          onClick={() => setActiveTab("billing")}
        >
          <CreditCard size={18} />
          <span>Billing Station</span>
        </button>

        <button
          className={`nav-tab ${activeTab === "menu_manager" ? "active" : ""}`}
          onClick={() => setActiveTab("menu_manager")}
        >
          <UtensilsCrossed size={18} />
          <span>Menu Manager</span>
        </button>

        <button
          className={`nav-tab ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 size={18} />
          <span>Revenue Analytics</span>
        </button>
      </nav>

      <div className="header-right">
        <div className="occupied-badge">
          <Users size={16} />
          <span>
            <strong className="occupied-num">{occupiedCount}</strong> / {totalTables} Occupied
          </span>
        </div>

        <div className="clock-widget">
          <Clock size={16} className="clock-icon" />
          <div className="clock-text">
            <span className="time timer-stats-mono" style={{ fontSize: "14px" }}>
              {formattedTime}
            </span>
            <span className="date caption-text">{formattedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
