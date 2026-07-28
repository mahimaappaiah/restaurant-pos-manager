import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { TableDetailModal } from "./TableDetailModal";
import { NewOrderModal } from "./NewOrderModal";
import { Users, Clock, Receipt, Filter } from "lucide-react";

export const TableMap = () => {
  const { tables } = useResto();
  const [selectedTable, setSelectedTable] = useState(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTables = tables.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  const getStatusBadgeLabel = (status) => {
    switch (status) {
      case "vacant":
        return "Vacant";
      case "occupied":
        return "Occupied";
      case "awaiting_payment":
        return "Awaiting Bill";
      case "needs_cleaning":
        return "Needs Cleaning";
      case "reserved":
        return "Reserved";
      default:
        return status;
    }
  };

  return (
    <div className="table-map-container">
      {/* Floor Control Header */}
      <div className="floor-control-bar">
        <div className="floor-info">
          <h2>Main Dining Floor</h2>
          <span className="subtitle">Visual Grid View • 20 Tables</span>
        </div>

        <div className="status-legend-bar">
          <div className="legend-item" onClick={() => setFilterStatus("all")}>
            <span className={`legend-chip ${filterStatus === "all" ? "active" : ""}`}>
              All ({tables.length})
            </span>
          </div>
          <div className="legend-item" onClick={() => setFilterStatus("vacant")}>
            <span className="dot dot-vacant"></span>
            <span className={`legend-chip ${filterStatus === "vacant" ? "active" : ""}`}>
              Vacant ({tables.filter((t) => t.status === "vacant").length})
            </span>
          </div>
          <div className="legend-item" onClick={() => setFilterStatus("occupied")}>
            <span className="dot dot-occupied"></span>
            <span className={`legend-chip ${filterStatus === "occupied" ? "active" : ""}`}>
              Occupied ({tables.filter((t) => t.status === "occupied").length})
            </span>
          </div>
          <div className="legend-item" onClick={() => setFilterStatus("awaiting_payment")}>
            <span className="dot dot-awaiting"></span>
            <span className={`legend-chip ${filterStatus === "awaiting_payment" ? "active" : ""}`}>
              Awaiting Bill ({tables.filter((t) => t.status === "awaiting_payment").length})
            </span>
          </div>
          <div className="legend-item" onClick={() => setFilterStatus("needs_cleaning")}>
            <span className="dot dot-cleaning"></span>
            <span className={`legend-chip ${filterStatus === "needs_cleaning" ? "active" : ""}`}>
              Needs Cleaning ({tables.filter((t) => t.status === "needs_cleaning").length})
            </span>
          </div>
          <div className="legend-item" onClick={() => setFilterStatus("reserved")}>
            <span className="dot dot-reserved"></span>
            <span className={`legend-chip ${filterStatus === "reserved" ? "active" : ""}`}>
              Reserved ({tables.filter((t) => t.status === "reserved").length})
            </span>
          </div>
        </div>
      </div>

      {/* Grid View T1 to T20 */}
      <div className="tables-grid">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className={`table-card status-border-${table.status}`}
            onClick={() => setSelectedTable(table)}
          >
            <div className="table-card-header">
              <span className="table-number">{table.id}</span>
              <span className={`table-status-tag tag-${table.status}`}>
                {getStatusBadgeLabel(table.status)}
              </span>
            </div>

            <div className="table-card-body">
              {table.status === "occupied" || table.status === "awaiting_payment" ? (
                <>
                  <div className="card-detail-row">
                    <Users size={15} />
                    <span>{table.guests} Guests</span>
                  </div>
                  <div className="card-detail-row">
                    <Clock size={15} />
                    <span>Seated {table.seatedTime}</span>
                  </div>
                  <div className="card-detail-row active-total">
                    <Receipt size={15} />
                    <span className="total-val">₹{table.activeOrderTotal}</span>
                  </div>
                </>
              ) : table.status === "reserved" ? (
                <div className="card-placeholder-text">
                  <Clock size={20} />
                  <span>Reserved</span>
                  <small>{table.seatedTime}</small>
                </div>
              ) : table.status === "needs_cleaning" ? (
                <div className="card-placeholder-text cleaning">
                  <span>Needs Sanitizing</span>
                </div>
              ) : (
                <div className="card-placeholder-text vacant">
                  <span>Ready to Seat</span>
                  <button className="quick-seat-btn">Tap to Order</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Table Detail Modal */}
      {selectedTable && !showNewOrderModal && (
        <TableDetailModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onOpenNewOrder={() => setShowNewOrderModal(true)}
        />
      )}

      {/* New Order Modal */}
      {selectedTable && showNewOrderModal && (
        <NewOrderModal
          table={selectedTable}
          onClose={() => {
            setShowNewOrderModal(false);
            setSelectedTable(null);
          }}
        />
      )}
    </div>
  );
};
