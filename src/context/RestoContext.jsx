import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_BRANCHES,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ACTIVE_ORDERS,
  INITIAL_PAID_TRANSACTIONS
} from "../data/initialData";

const RestoContext = createContext(null);

export const RestoProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(INITIAL_BRANCHES[0]);
  const [activeTab, setActiveTab] = useState("table_map"); // table_map | live_orders | billing | menu_manager | analytics
  const [selectedTableForBilling, setSelectedTableForBilling] = useState(null);

  const [tables, setTables] = useState(INITIAL_TABLES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [activeOrders, setActiveOrders] = useState(INITIAL_ACTIVE_ORDERS);
  const [paidTransactions, setPaidTransactions] = useState(INITIAL_PAID_TRANSACTIONS);

  // Auto calculate active order totals on table state
  const syncTableTotals = (currentOrders, currentTables) => {
    return currentTables.map((table) => {
      const activeOrd = currentOrders.find(
        (o) => o.tableId === table.id && o.status !== "Cancelled" && o.status !== "Paid"
      );
      if (activeOrd) {
        const total = activeOrd.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );
        return {
          ...table,
          orderId: activeOrd.id,
          activeOrderTotal: total,
          // Sync status if table is vacant but has an order
          status: table.status === "vacant" ? "occupied" : table.status
        };
      } else {
        return table;
      }
    });
  };

  // Switch to billing for a specific table
  const goToBillingForTable = (tableId) => {
    setSelectedTableForBilling(tableId);
    setActiveTab("billing");
  };

  // Change Table Status
  const updateTableStatus = (tableId, newStatus) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          const updated = { ...t, status: newStatus };
          if (newStatus === "vacant" || newStatus === "needs_cleaning") {
            updated.guests = 0;
            updated.seatedTime = null;
            updated.orderId = null;
            updated.activeOrderTotal = 0;
          }
          return updated;
        }
        return t;
      })
    );
  };

  // Create new order
  const createOrder = ({ tableId, items, guests = 2, notes = "" }) => {
    const newOrderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: newOrderId,
      tableId,
      status: "New",
      createdAt: new Date().toISOString(),
      priority: "normal",
      items,
      notes
    };

    setActiveOrders((prev) => [newOrder, ...prev]);

    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          const orderTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
          return {
            ...t,
            status: "occupied",
            guests: guests || 2,
            seatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            orderId: newOrderId,
            activeOrderTotal: orderTotal
          };
        }
        return t;
      })
    );

    return newOrderId;
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setActiveOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // If order status is Payment Pending, set table status to awaiting_payment
    const targetOrder = activeOrders.find((o) => o.id === orderId);
    if (targetOrder && newStatus === "Payment Pending") {
      setTables((prev) =>
        prev.map((t) =>
          t.id === targetOrder.tableId ? { ...t, status: "awaiting_payment" } : t
        )
      );
    }
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    const targetOrder = activeOrders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));

    setTables((prev) =>
      prev.map((t) => {
        if (t.id === targetOrder.tableId) {
          return {
            ...t,
            status: "vacant",
            guests: 0,
            seatedTime: null,
            orderId: null,
            activeOrderTotal: 0
          };
        }
        return t;
      })
    );
  };

  // Bump priority
  const bumpOrderPriority = (orderId) => {
    setActiveOrders((prev) => {
      const index = prev.findIndex((o) => o.id === orderId);
      if (index === -1) return prev;

      const target = { ...prev[index], priority: "high" };
      const remaining = prev.filter((o) => o.id !== orderId);
      return [target, ...remaining];
    });
  };

  // Pay order
  const payOrder = (orderId, paymentDetails) => {
    const targetOrder = activeOrders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    // Record completed transaction
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: targetOrder.id,
      tableId: targetOrder.tableId,
      amount: paymentDetails.grandTotal,
      paidAt: new Date().toISOString(),
      paymentMethod: paymentDetails.method,
      itemsCount: targetOrder.items.length,
      discount: paymentDetails.discount,
      tax: paymentDetails.tax,
      serviceCharge: paymentDetails.serviceCharge
    };

    setPaidTransactions((prev) => [newTx, ...prev]);

    // Remove from active orders
    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));

    // Update table status to vacant (or needs_cleaning)
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === targetOrder.tableId) {
          return {
            ...t,
            status: "vacant",
            guests: 0,
            seatedTime: null,
            orderId: null,
            activeOrderTotal: 0
          };
        }
        return t;
      })
    );

    if (selectedTableForBilling === targetOrder.tableId) {
      setSelectedTableForBilling(null);
    }
  };

  // Category CRUD
  const addCategory = (categoryName) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: categoryName,
      icon: "Utensils",
      sortOrder: categories.length + 1
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const editCategory = (categoryId, newName) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, name: newName } : c))
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    setMenuItems((prev) => prev.filter((m) => m.categoryId !== categoryId));
  };

  const reorderCategory = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;
    setCategories(newCategories);
  };

  // Menu Item CRUD
  const addMenuItem = (itemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      ...itemData
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const editMenuItem = (itemId, itemData) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, ...itemData } : m))
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== itemId));
  };

  const toggleItemAvailability = (itemId) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  return (
    <RestoContext.Provider
      value={{
        branches: INITIAL_BRANCHES,
        currentBranch,
        setCurrentBranch,
        activeTab,
        setActiveTab,
        tables,
        categories,
        menuItems,
        activeOrders,
        paidTransactions,
        selectedTableForBilling,
        setSelectedTableForBilling,
        goToBillingForTable,
        updateTableStatus,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        bumpOrderPriority,
        payOrder,
        addCategory,
        editCategory,
        deleteCategory,
        reorderCategory,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        toggleItemAvailability
      }}
    >
      {children}
    </RestoContext.Provider>
  );
};

export const useResto = () => {
  const context = useContext(RestoContext);
  if (!context) {
    throw new Error("useResto must be used within a RestoProvider");
  }
  return context;
};
