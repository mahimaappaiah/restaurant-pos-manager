import React from "react";
import { RestoProvider, useResto } from "./context/RestoContext";
import { Navbar } from "./components/Navbar";
import { TableMap } from "./components/TableMap/TableMap";
import { LiveOrders } from "./components/LiveOrders/LiveOrders";
import { KitchenDisplaySystem } from "./components/KDS/KitchenDisplaySystem";
import { CaptivePortalView } from "./components/CaptivePortal/CaptivePortalView";
import { BillingStation } from "./components/Billing/BillingStation";
import { MenuManager } from "./components/MenuManager/MenuManager";
import { RevenueAnalytics } from "./components/Analytics/RevenueAnalytics";
import "./App.css";

const MainContent = () => {
  const { activeTab } = useResto();

  return (
    <main className="main-viewport">
      {activeTab === "table_map" && <TableMap />}
      {activeTab === "live_orders" && <LiveOrders />}
      {activeTab === "kds" && <KitchenDisplaySystem />}
      {activeTab === "captive_portal" && <CaptivePortalView />}
      {activeTab === "billing" && <BillingStation />}
      {activeTab === "menu_manager" && <MenuManager />}
      {activeTab === "analytics" && <RevenueAnalytics />}
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
