import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_BRANCHES,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ACTIVE_ORDERS,
  INITIAL_STAFF,
  INITIAL_FEEDBACK,
  INITIAL_PAID_TRANSACTIONS
} from "../data/initialData";

const RestoContext = createContext(null);

export const RestoProvider = ({ children }) => {
  // App Mode & Views
  const [appMode, setAppMode] = useState("dashboard"); // customer | kds | dashboard | tools
  const [currentBranch, setCurrentBranch] = useState(INITIAL_BRANCHES[0]);
  const [activeTab, setActiveTab] = useState("table_map"); // table_map | live_orders | billing | menu_manager | analytics | staff_management

  // Customer PWA States
  const [customerView, setCustomerView] = useState("portal"); // portal | splash | menu | tracker | bill | feedback
  const [selectedTableIdForCustomer, setSelectedTableIdForCustomer] = useState("T5");
  const [customerCart, setCustomerCart] = useState([]);
  const [customerActiveOrderId, setCustomerActiveOrderId] = useState("ORD-103");

  // KDS Filter & Audio Chime
  const [kdsFilter, setKdsFilter] = useState("All");

  // Core Data Stores
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [activeOrders, setActiveOrders] = useState(INITIAL_ACTIVE_ORDERS);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [feedbackList, setFeedbackList] = useState(INITIAL_FEEDBACK);
  const [paidTransactions, setPaidTransactions] = useState(INITIAL_PAID_TRANSACTIONS);
  const [selectedTableForBilling, setSelectedTableForBilling] = useState(null);

  // Synthesize Web Audio API audio chime beep for new KDS orders
  const playNewOrderChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); // A5 note
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (err) {
      console.log("Audio play chime ignored:", err);
    }
  };

  // Switch billing table
  const goToBillingForTable = (tableId) => {
    setSelectedTableForBilling(tableId);
    setActiveTab("billing");
    setAppMode("dashboard");
  };

  // Update physical table status
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

  // Create new Order (Customer App / Staff)
  const createOrder = ({ tableId, items, guests = 2, notes = "" }) => {
    const newOrderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: newOrderId,
      tableId,
      status: "Confirmed", // Confirmed -> Preparing -> Ready -> Served
      createdAt: new Date().toISOString(),
      priority: "normal",
      items,
      notes
    };

    setActiveOrders((prev) => [newOrder, ...prev]);

    // Update table status
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

    // Play KDS chime sound
    playNewOrderChime();

    return newOrderId;
  };

  // Update order status across KDS / Dashboard / Customer Tracker
  const updateOrderStatus = (orderId, newStatus) => {
    setActiveOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // Sync table status when order becomes Payment Pending
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

  // Bump KDS order priority
  const bumpOrderPriority = (orderId) => {
    setActiveOrders((prev) => {
      const index = prev.findIndex((o) => o.id === orderId);
      if (index === -1) return prev;

      const target = { ...prev[index], priority: "high" };
      const remaining = prev.filter((o) => o.id !== orderId);
      return [target, ...remaining];
    });
  };

  // Pay order settlement
  const payOrder = (orderId, paymentDetails) => {
    const targetOrder = activeOrders.find((o) => o.id === orderId);
    if (!targetOrder) return;

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

    if (selectedTableForBilling === targetOrder.tableId) {
      setSelectedTableForBilling(null);
    }
  };

  // Staff Management CRUD
  const addStaff = (staffData) => {
    const newStaff = {
      id: `st-${Date.now()}`,
      isActive: true,
      ...staffData
    };
    setStaffList((prev) => [newStaff, ...prev]);
  };

  const toggleStaffActive = (staffId) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const deleteStaff = (staffId) => {
    setStaffList((prev) => prev.filter((s) => s.id !== staffId));
  };

  // Feedback Submission
  const submitFeedback = (rating, comment) => {
    const newFb = {
      id: `fb-${Date.now()}`,
      orderId: customerActiveOrderId || "ORD-103",
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    setFeedbackList((prev) => [newFb, ...prev]);
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
        appMode,
        setAppMode,
        branches: INITIAL_BRANCHES,
        currentBranch,
        setCurrentBranch,
        activeTab,
        setActiveTab,
        customerView,
        setCustomerView,
        selectedTableIdForCustomer,
        setSelectedTableIdForCustomer,
        customerCart,
        setCustomerCart,
        customerActiveOrderId,
        setCustomerActiveOrderId,
        kdsFilter,
        setKdsFilter,
        tables,
        categories,
        menuItems,
        activeOrders,
        staffList,
        feedbackList,
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
        addStaff,
        toggleStaffActive,
        deleteStaff,
        submitFeedback,
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
