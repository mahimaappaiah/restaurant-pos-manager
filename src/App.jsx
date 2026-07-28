import React from "react";
import { RestoProvider, useResto } from "./context/RestoContext";
import { Navbar } from "./components/Navbar";

// Customer App
import { CustomerAppContainer } from "./components/CustomerApp/CustomerAppContainer";

// KDS
import { KDSQueue } from "./components/KDS/KDSQueue";

// Dashboard
import { TableMap } from "./components/TableMap/TableMap";
import { LiveOrders } from "./components/LiveOrders/LiveOrders";
import { BillingStation } from "./components/Billing/BillingStation";
import { MenuManager } from "./components/MenuManager/MenuManager";
import { RevenueAnalytics } from "./components/Analytics/RevenueAnalytics";
import { StaffManagement } from "./components/Dashboard/StaffManagement";

// Tools
import { QRCodeGenerator } from "./components/Tools/QRCodeGenerator";
import { ESP32FirmwareView } from "./components/Tools/ESP32FirmwareView";

import "./App.css";

const MainContent = () => {
  const { appMode, activeTab } = useResto();

  if (appMode === "customer") {
    return <CustomerAppContainer />;
  }

  if (appMode === "kds") {
    return <KDSQueue />;
  }

  if (appMode === "tools") {
    return (
      <div className="tools-suite-wrapper" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <QRCodeGenerator />
        <ESP32FirmwareView />
      </div>
    );
  }

  return (
    <main className="main-viewport">
      {activeTab === "table_map" && <TableMap />}
      {activeTab === "live_orders" && <LiveOrders />}
      {activeTab === "billing" && <BillingStation />}
      {activeTab === "menu_manager" && <MenuManager />}
      {activeTab === "analytics" && <RevenueAnalytics />}
      {activeTab === "staff_management" && <StaffManagement />}
    </main>
  );
};

export default function App() {
  return (
    <RestoProvider>
      <div className="app-shell">
        <Navbar />
        <MainContent />
      </div>
    </RestoProvider>
  );
}
