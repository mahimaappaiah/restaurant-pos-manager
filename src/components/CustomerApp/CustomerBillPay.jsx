import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { QrCode, CreditCard, Banknote, Users, CheckCircle, ArrowRight } from "lucide-react";

export const CustomerBillPay = ({ onProceedFeedback }) => {
  const {
    selectedTableIdForCustomer,
    activeOrders,
    payOrder
  } = useResto();

  const currentOrder = activeOrders.find(
    (o) => o.tableId === selectedTableIdForCustomer && o.status !== "Cancelled"
  );

  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi | card | cash
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [splitPeople, setSplitPeople] = useState(2);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const subtotal = currentOrder
    ? currentOrder.items.reduce((s, i) => s + i.price * i.qty, 0)
    : 1120;

  const serviceCharge = subtotal * 0.05;
  const taxable = subtotal + serviceCharge;
  const cgst = taxable * 0.025;
  const sgst = taxable * 0.025;
  const grandTotal = Math.round(taxable + cgst + sgst);

  const perPersonShare = Math.ceil(grandTotal / Math.max(1, splitPeople));

  const handlePayNow = () => {
    if (currentOrder) {
      payOrder(currentOrder.id, {
        grandTotal,
        method: paymentMethod.toUpperCase(),
        discount: 0,
        tax: cgst + sgst,
        serviceCharge
      });
    }
    setIsPaidSuccess(true);
  };

  if (isPaidSuccess) {
    return (
      <div className="bill-pay-screen fade-in">
        <div className="payment-success-card truffles-card">
          <CheckCircle size={60} color="#7EE787" />
          <h1 className="h1" style={{ color: "#7EE787", textAlign: "center" }}>
            Payment Successful!
          </h1>
          <p className="body-text" style={{ textAlign: "center" }}>
            Thank you for dining with Truffles at Table {selectedTableIdForCustomer}!
          </p>

          <button
            className="btn-primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={onProceedFeedback}
          >
            <span>Rate Your Experience</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bill-pay-screen fade-in">
      <div className="bill-card truffles-card">
        <div className="bill-header">
          <h2>Your Digital Bill</h2>
          <span className="table-badge-mono">Table {selectedTableIdForCustomer}</span>
        </div>

        {/* Itemized Receipt Table */}
        <div className="itemized-receipt-box">
          {currentOrder ? (
            currentOrder.items.map((item, i) => (
              <div key={i} className="receipt-item-row">
                <span className="caption-text">{item.qty}x {item.name}</span>
                <span className="price-mono">₹{item.price * item.qty}</span>
              </div>
            ))
          ) : (
            <div className="receipt-item-row">
              <span className="caption-text">2x Truffles Cottage Cheese Burger</span>
              <span className="price-mono">₹680</span>
            </div>
          )}
        </div>

        {/* Tax Breakdown */}
        <div className="tax-breakdown-box">
          <div className="calc-row">
            <span className="caption-text">Item Subtotal</span>
            <span className="price-mono">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span className="caption-text">Service Charge (5%)</span>
            <span className="price-mono">+₹{serviceCharge.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span className="caption-text">CGST (2.5%)</span>
            <span className="price-mono">+₹{cgst.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span className="caption-text">SGST (2.5%)</span>
            <span className="price-mono">+₹{sgst.toFixed(2)}</span>
          </div>
          <div className="calc-row grand-total-row">
            <span className="h3">GRAND TOTAL</span>
            <span className="timer-stats-mono">₹{grandTotal}</span>
          </div>
        </div>

        {/* Split Bill Option */}
        <div className="split-bill-section">
          <div className="split-toggle-row" onClick={() => setSplitEnabled(!splitEnabled)}>
            <div className="split-label">
              <Users size={16} color="#FF6B35" />
              <span>Split Bill Among Friends</span>
            </div>
            <input type="checkbox" checked={splitEnabled} onChange={() => {}} />
          </div>

          {splitEnabled && (
            <div className="split-controls-box">
              <div className="split-counter">
                <span className="caption-text">Number of guests:</span>
                <div className="qty-picker">
                  <button onClick={() => setSplitPeople(Math.max(2, splitPeople - 1))}>-</button>
                  <span className="price-mono">{splitPeople}</span>
                  <button onClick={() => setSplitPeople(splitPeople + 1)}>+</button>
                </div>
              </div>

              <div className="per-person-share">
                <span className="caption-text">Your Per-Person Share:</span>
                <span className="price-mono" style={{ color: "#FF6B35", fontSize: "18px" }}>
                  ₹{perPersonShare}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods selector */}
        <div className="payment-options-grid">
          <button
            className={`pay-tab ${paymentMethod === "upi" ? "active" : ""}`}
            onClick={() => setPaymentMethod("upi")}
          >
            <QrCode size={20} />
            <span>UPI QR</span>
          </button>
          <button
            className={`pay-tab ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard size={20} />
            <span>Card</span>
          </button>
          <button
            className={`pay-tab ${paymentMethod === "cash" ? "active" : ""}`}
            onClick={() => setPaymentMethod("cash")}
          >
            <Banknote size={20} />
            <span>Cash</span>
          </button>
        </div>

        {paymentMethod === "upi" && (
          <div className="upi-qr-display">
            <svg viewBox="0 0 100 100" style={{ width: "120px", height: "120px", margin: "0 auto" }}>
              <rect width="100" height="100" fill="#FFFFFF" rx="6" />
              <rect x="10" y="10" width="24" height="24" fill="#0A0A12" />
              <rect x="14" y="14" width="16" height="16" fill="#FFFFFF" />
              <rect x="18" y="18" width="8" height="8" fill="#FF6B35" />
              <rect x="66" y="10" width="24" height="24" fill="#0A0A12" />
              <rect x="70" y="14" width="16" height="16" fill="#FFFFFF" />
              <rect x="74" y="18" width="8" height="8" fill="#FF6B35" />
              <rect x="10" y="66" width="24" height="24" fill="#0A0A12" />
              <rect x="14" y="70" width="16" height="16" fill="#FFFFFF" />
              <rect x="18" y="74" width="8" height="8" fill="#FF6B35" />
              <rect x="40" y="40" width="20" height="20" fill="#FF6B35" />
            </svg>
            <span className="caption-text">Scan & Pay ₹{splitEnabled ? perPersonShare : grandTotal}</span>
          </div>
        )}

        <button className="btn-primary" style={{ width: "100%" }} onClick={handlePayNow}>
          <span>Pay Now — ₹{splitEnabled ? perPersonShare : grandTotal}</span>
        </button>
      </div>
    </div>
  );
};
