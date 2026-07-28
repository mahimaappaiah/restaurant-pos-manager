import React from "react";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Utensils } from "lucide-react";

export const CartDrawer = ({ cartItems, onClose, onUpdateQty, onPlaceOrder }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} color="#FF6B35" />
            <h3>Your Order Cart ({cartItems.length})</h3>
          </div>
          <button className="icon-btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <Utensils size={40} color="#666680" />
              <h3>Your basket is empty</h3>
              <p className="caption-text">Tap on menu dishes to add them to your order.</p>
              <button className="btn-secondary" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="cart-item-card">
                  <div className="cart-item-header-row">
                    <span className="cart-item-title">{item.name}</span>
                    <span className="price-mono">₹{item.price * item.qty}</span>
                  </div>

                  {item.customizations && item.customizations.length > 0 && (
                    <div className="cart-item-cust-pills">
                      {item.customizations.map((c, i) => (
                        <span key={i} className="badge-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="cart-item-controls-row">
                    <span className="caption-text">₹{item.price} each</span>
                    <div className="qty-picker">
                      <button onClick={() => onUpdateQty(idx, -1)}>
                        <Minus size={12} />
                      </button>
                      <span className="price-mono" style={{ fontSize: "13px" }}>
                        {item.qty}
                      </span>
                      <button onClick={() => onUpdateQty(idx, 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="body-text">Running Subtotal</span>
              <span className="timer-stats-mono" style={{ fontSize: "20px" }}>
                ₹{subtotal}
              </span>
            </div>
            <button className="btn-primary" style={{ width: "100%" }} onClick={onPlaceOrder}>
              <span>Confirm & Send Order to Kitchen</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
