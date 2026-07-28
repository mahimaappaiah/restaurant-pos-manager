import React, { useState } from "react";
import { X, Plus, Minus, CheckCircle, ShoppingBag } from "lucide-react";

export const ItemCustomizationSheet = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [qty, setQty] = useState(1);
  const [selectedCustIds, setSelectedCustIds] = useState([]);
  const [instructions, setInstructions] = useState("");

  const toggleCust = (cust) => {
    if (selectedCustIds.includes(cust.id)) {
      setSelectedCustIds(selectedCustIds.filter((id) => id !== cust.id));
    } else {
      setSelectedCustIds([...selectedCustIds, cust.id]);
    }
  };

  const selectedCustObjs = (item.customizations || []).filter((c) =>
    selectedCustIds.includes(c.id)
  );

  const custPrice = selectedCustObjs.reduce((s, c) => s + c.price, 0);
  const unitPrice = item.price + custPrice;
  const totalPrice = unitPrice * qty;

  const handleAdd = () => {
    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      price: unitPrice,
      qty,
      customizations: selectedCustObjs.map((c) => c.name),
      instructions
    });
    onClose();
  };

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <div className="sheet-drag-handle"></div>
          <button className="icon-btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sheet-body">
          <div className="sheet-img-wrap">
            <img src={item.image} alt={item.name} />
            <span className={`veg-indicator-dot ${item.isVeg ? "veg" : "nonveg"}`}>
              <span className="dot-inner"></span>
            </span>
          </div>

          <div className="sheet-title-price">
            <h3>{item.name}</h3>
            <span className="price-mono">₹{unitPrice}</span>
          </div>
          <p className="body-text">{item.description}</p>

          {item.customizations && item.customizations.length > 0 && (
            <div className="customizations-section">
              <span className="caption-text">CUSTOMIZE YOUR ORDER:</span>
              <div className="cust-checkboxes-list">
                {item.customizations.map((c) => {
                  const isChecked = selectedCustIds.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      className={`cust-check-row ${isChecked ? "selected" : ""}`}
                      onClick={() => toggleCust(c)}
                    >
                      <div className="check-label">
                        <span className={`checkbox-box ${isChecked ? "checked" : ""}`}>
                          {isChecked && <CheckCircle size={14} color="#FF6B35" />}
                        </span>
                        <span>{c.name}</span>
                      </div>
                      <span className="price-mono" style={{ fontSize: "14px" }}>
                        {c.price > 0 ? `+₹${c.price}` : "Free"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="instructions-box">
            <label className="caption-text">SPECIAL INSTRUCTIONS:</label>
            <input
              type="text"
              placeholder="e.g. Less spicy, allergy warnings..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </div>

        <div className="sheet-footer">
          <div className="qty-picker-lg">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>
              <Minus size={16} />
            </button>
            <span className="price-mono">{qty}</span>
            <button onClick={() => setQty(qty + 1)}>
              <Plus size={16} />
            </button>
          </div>

          <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
            <ShoppingBag size={18} />
            <span>Add to Cart — ₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
