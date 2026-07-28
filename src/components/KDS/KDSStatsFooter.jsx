import React from "react";
import { useResto } from "../../context/RestoContext";

export const KDSStatsFooter = () => {
  const { activeOrders, paidTransactions } = useResto();

  const totalOrdersToday = activeOrders.length + paidTransactions.length;
  const currentQueueLength = activeOrders.filter(
    (o) => o.status === "Confirmed" || o.status === "Preparing"
  ).length;
  const avgPrepTimeMins = 14;
  const topItemSold = "Truffles Monster Burger";

  return (
    <footer className="kds-stats-footer">
      <div className="kds-stat-item">
        <span className="caption-text">TOTAL ORDERS TODAY</span>
        <span className="timer-stats-mono">{totalOrdersToday}</span>
      </div>

      <div className="kds-stat-item">
        <span className="caption-text">CURRENT QUEUE LENGTH</span>
        <span className="timer-stats-mono">{currentQueueLength} Orders</span>
      </div>

      <div className="kds-stat-item">
        <span className="caption-text">AVG PREP TIME</span>
        <span className="timer-stats-mono">{avgPrepTimeMins} mins</span>
      </div>

      <div className="kds-stat-item">
        <span className="caption-text">TOP ITEM SOLD</span>
        <span className="price-mono" style={{ color: "#FF6B35" }}>
          {topItemSold}
        </span>
      </div>
    </footer>
  );
};
