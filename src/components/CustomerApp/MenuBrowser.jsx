import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { ItemCustomizationSheet } from "./ItemCustomizationSheet";
import { CartDrawer } from "./CartDrawer";
import {
  Search,
  ShoppingCart,
  Plus,
  Flame,
  Filter,
  ArrowUpDown,
  CreditCard
} from "lucide-react";

export const MenuBrowser = ({ onProceedTracker, onProceedBill }) => {
  const {
    categories,
    menuItems,
    selectedTableIdForCustomer,
    customerCart,
    setCustomerCart,
    createOrder,
    setCustomerActiveOrderId
  } = useResto();

  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular"); // popular | price_low | price_high

  // Item sheet state
  const [selectedItemForCustom, setSelectedItemForCustom] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const filteredItems = menuItems
    .filter((item) => {
      const matchesCat = selectedCat === "all" || item.categoryId === selectedCat;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = vegOnly ? item.isVeg : true;
      return matchesCat && matchesSearch && matchesVeg && item.isAvailable;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (newItem) => {
    setCustomerCart((prev) => [...prev, newItem]);
  };

  const handleUpdateCartQty = (index, delta) => {
    setCustomerCart((prev) =>
      prev
        .map((item, idx) => {
          if (idx === index) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handlePlaceOrderSubmit = () => {
    if (customerCart.length === 0) return;

    const orderId = createOrder({
      tableId: selectedTableIdForCustomer,
      items: customerCart,
      guests: 2,
      notes: "Placed via Customer Web App"
    });

    setCustomerActiveOrderId(orderId);
    setCustomerCart([]);
    setShowCartDrawer(false);
    onProceedTracker();
  };

  const cartItemsCount = customerCart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="menu-browser-screen fade-in">
      {/* Sticky Header */}
      <header className="customer-header">
        <div className="brand-text">
          <h1 className="brand-truffles-title" style={{ fontSize: "20px" }}>TRUFFLES</h1>
          <span className="brand-truffles-tagline">TABLE {selectedTableIdForCustomer}</span>
        </div>

        <div className="header-right-actions">
          <button className="btn-ghost" onClick={onProceedBill} style={{ padding: "8px 12px" }}>
            <CreditCard size={18} color="#FF6B35" />
            <span className="caption-text" style={{ color: "#FFFFFF" }}>Bill</span>
          </button>

          <button className="cart-trigger-btn" onClick={() => setShowCartDrawer(true)}>
            <ShoppingCart size={22} color="#FF6B35" />
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </button>
        </div>
      </header>

      {/* Filter Toolbar */}
      <div className="customer-toolbar">
        <div className="search-input-box">
          <Search size={16} color="#666680" />
          <input
            type="text"
            placeholder="Search burgers, pizzas, thickshakes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls-row">
          {/* Veg Only Toggle */}
          <div className="veg-toggle-chip" onClick={() => setVegOnly(!vegOnly)}>
            <span className={`veg-dot ${vegOnly ? "active" : ""}`}></span>
            <span className="caption-text">Veg Only</span>
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrap">
            <ArrowUpDown size={14} color="#666680" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Scrollable Categories Bar */}
        <div className="category-scroll-snap">
          <button
            className={`cat-snap-pill ${selectedCat === "all" ? "active" : ""}`}
            onClick={() => setSelectedCat("all")}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-snap-pill ${selectedCat === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="menu-items-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="customer-dish-card truffles-card"
            onClick={() => setSelectedItemForCustom(item)}
          >
            <div className="dish-img-container">
              <img src={item.image} alt={item.name} />
              <span className={`veg-indicator-dot ${item.isVeg ? "veg" : "nonveg"}`}>
                <span className="dot-inner"></span>
              </span>

              {item.isBestSeller && (
                <span className="bestseller-badge">
                  <Flame size={12} /> Best Seller
                </span>
              )}
            </div>

            <div className="dish-card-details">
              <h3 className="dish-title">{item.name}</h3>
              <p className="caption-text line-clamp">{item.description}</p>

              <div className="card-bottom-row">
                <span className="price-mono">₹{item.price}</span>
                <button
                  className="btn-primary"
                  style={{ padding: "6px 16px", fontSize: "12px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItemForCustom(item);
                  }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customization Sheet Modal */}
      {selectedItemForCustom && (
        <ItemCustomizationSheet
          item={selectedItemForCustom}
          onClose={() => setSelectedItemForCustom(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer Sheet */}
      {showCartDrawer && (
        <CartDrawer
          cartItems={customerCart}
          onClose={() => setShowCartDrawer(false)}
          onUpdateQty={handleUpdateCartQty}
          onPlaceOrder={handlePlaceOrderSubmit}
        />
      )}
    </div>
  );
};
