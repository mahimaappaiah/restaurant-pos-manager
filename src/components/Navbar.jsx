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
  Users,
  Smartphone,
  ChefHat,
  Shield,
  QrCode,
  Cpu
} from "lucide-react";

export const Navbar = () => {
  const {
    appMode,
    setAppMode,
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
        {/* TRUFFLES Logo & Tagline */}
        <div className="brand-logo">
          <div className="brand-text">
            <h1 className="brand-truffles-title">TRUFFLES</h1>
            <span className="brand-truffles-tagline">ORDER. EAT. REPEAT.</span>
          </div>
        </div>

        {/* Global App Mode Switcher */}
        <div className="mode-switcher-group">
          <button
            className={`mode-btn ${appMode === "customer" ? "active" : ""}`}
            onClick={() => setAppMode("customer")}
          >
            <Smartphone size={16} />
            <span>Customer App</span>
          </button>

          <button
            className={`mode-btn ${appMode === "kds" ? "active" : ""}`}
            onClick={() => setAppMode("kds")}
          >
            <ChefHat size={16} />
            <span>KDS Display</span>
          </button>

          <button
            className={`mode-btn ${appMode === "dashboard" ? "active" : ""}`}
            onClick={() => setAppMode("dashboard")}
          >
            <Shield size={16} />
            <span>Manager Suite</span>
          </button>

          <button
            className={`mode-btn ${appMode === "tools" ? "active" : ""}`}
            onClick={() => setAppMode("tools")}
          >
            <QrCode size={16} />
            <span>Tools & WiFi</span>
          </button>
        </div>
      </div>

      {/* Conditional Sub-tabs for Dashboard Mode */}
      {appMode === "dashboard" && (
        <nav className="header-nav">
          <button
            className={`nav-tab ${activeTab === "table_map" ? "active" : ""}`}
            onClick={() => setActiveTab("table_map")}
          >
            <LayoutGrid size={16} />
            <span>Table Map</span>
          </button>

          <button
            className={`nav-tab ${activeTab === "live_orders" ? "active" : ""}`}
            onClick={() => setActiveTab("live_orders")}
          >
            <ListOrdered size={16} />
            <span>Live Orders</span>
          </button>

          <button
            className={`nav-tab ${activeTab === "billing" ? "active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            <CreditCard size={16} />
            <span>Billing</span>
          </button>

          <button
            className={`nav-tab ${activeTab === "menu_manager" ? "active" : ""}`}
            onClick={() => setActiveTab("menu_manager")}
          >
            <UtensilsCrossed size={16} />
            <span>Menu Admin</span>
          </button>

          <button
            className={`nav-tab ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={16} />
            <span>Analytics</span>
          </button>

          <button
            className={`nav-tab ${activeTab === "staff_management" ? "active" : ""}`}
            onClick={() => setActiveTab("staff_management")}
          >
            <Users size={16} />
            <span>Staff</span>
          </button>
        </nav>
      )}

      <div className="header-right">
        <div className="branch-selector-wrapper">
          <Store size={14} className="branch-icon" />
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

        <div className="occupied-badge">
          <span>
            <strong className="occupied-num">{occupiedCount}</strong> / {totalTables} Occupied
          </span>
        </div>
      </div>
    </header>
  );
};
