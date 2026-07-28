// Initial sample data for TRUFFLES Master Suite

export const INITIAL_BRANCHES = [
  "Koramangala Main",
  "Indiranagar Hub",
  "HSR Layout Suite",
  "MG Road Plaza"
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Burgers & Wraps", icon: "Utensils", sortOrder: 1 },
  { id: "cat-2", name: "Artisan Pastas", icon: "Flame", sortOrder: 2 },
  { id: "cat-3", name: "Woodfired Pizzas", icon: "Pizza", sortOrder: 3 },
  { id: "cat-4", name: "Desserts & Sweets", icon: "Cake", sortOrder: 4 },
  { id: "cat-5", name: "Drinks & Shakes", icon: "Coffee", sortOrder: 5 }
];

export const INITIAL_MENU_ITEMS = [
  {
    id: "item-1",
    categoryId: "cat-1",
    name: "Truffles Signature Monster Burger",
    description: "Double juicy patty with cheddar cheese, smoked bacon, caramelized onions, and house relish",
    price: 390,
    isVeg: false,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c1", name: "Extra Cheese Slice", price: 40 },
      { id: "c2", name: "Add Sauteed Mushrooms", price: 50 },
      { id: "c3", name: "Make it Extra Spicy", price: 0 }
    ]
  },
  {
    id: "item-2",
    categoryId: "cat-1",
    name: "Crispy Peri Peri Cottage Cheese Burger",
    description: "Crispy fried paneer patty tossed in peri peri spice, topped with spicy mayo slaw",
    price: 340,
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 12,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c4", name: "Extra Dip: Garlic Mayo", price: 30 },
      { id: "c5", name: "Gluten Free Bun", price: 40 }
    ]
  },
  {
    id: "item-3",
    categoryId: "cat-2",
    name: "Creamy Truffle Mushroom Alfredo",
    description: "Penne pasta in rich garlic parmesan cream sauce with wild button mushrooms and truffle oil",
    price: 420,
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 18,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c6", name: "Add Grilled Chicken Strips", price: 90 },
      { id: "c7", name: "Extra Garlic Bread (2 pcs)", price: 60 }
    ]
  },
  {
    id: "item-4",
    categoryId: "cat-2",
    name: "Fiery Chicken Arrabbiata",
    description: "Spaghetti tossed in spicy red chili tomato basil sauce with roasted garlic chicken",
    price: 450,
    isVeg: false,
    isAvailable: true,
    isBestSeller: false,
    prepTime: 16,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c8", name: "Extra Parmesan Cheese", price: 40 }
    ]
  },
  {
    id: "item-5",
    categoryId: "cat-3",
    name: "Quattro Formaggi Woodfired Pizza",
    description: "Fresh sourdough pizza topped with Mozzarella, Gorgonzola, Parmesan, and Fontina",
    price: 590,
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c9", name: "Stuffed Crust", price: 90 }
    ]
  },
  {
    id: "item-6",
    categoryId: "cat-4",
    name: "Belgian Chocolate Lava Cake",
    description: "Warm molten chocolate cake served with Madagascar vanilla gelato",
    price: 290,
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 10,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c10", name: "Extra Gelato Scoop", price: 70 }
    ]
  },
  {
    id: "item-7",
    categoryId: "cat-5",
    name: "Nutella Thickshake Supreme",
    description: "Rich blended hazelnut cocoa milk shake topped with whipped cream and crushed Ferrero",
    price: 260,
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c11", name: "Less Sugar", price: 0 }
    ]
  }
];

export const INITIAL_TABLES = [
  { id: "T1", number: 1, status: "occupied", guests: 4, seatedTime: "12:15 PM", orderId: "ORD-101", activeOrderTotal: 1450 },
  { id: "T2", number: 2, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T3", number: 3, status: "awaiting_payment", guests: 2, seatedTime: "12:00 PM", orderId: "ORD-102", activeOrderTotal: 980 },
  { id: "T4", number: 4, status: "needs_cleaning", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T5", number: 5, status: "occupied", guests: 3, seatedTime: "12:20 PM", orderId: "ORD-103", activeOrderTotal: 1120 },
  { id: "T6", number: 6, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T7", number: 7, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T8", number: 8, status: "occupied", guests: 5, seatedTime: "12:10 PM", orderId: "ORD-104", activeOrderTotal: 2190 },
  { id: "T9", number: 9, status: "awaiting_payment", guests: 4, seatedTime: "11:50 AM", orderId: "ORD-105", activeOrderTotal: 1820 },
  { id: "T10", number: 10, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T11", number: 11, status: "occupied", guests: 2, seatedTime: "12:35 PM", orderId: "ORD-106", activeOrderTotal: 640 },
  { id: "T12", number: 12, status: "reserved", guests: 4, seatedTime: "02:00 PM", orderId: null, activeOrderTotal: 0 },
  { id: "T13", number: 13, status: "needs_cleaning", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T14", number: 14, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T15", number: 15, status: "occupied", guests: 8, seatedTime: "12:05 PM", orderId: "ORD-107", activeOrderTotal: 3420 },
  { id: "T16", number: 16, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T17", number: 17, status: "occupied", guests: 2, seatedTime: "12:40 PM", orderId: "ORD-108", activeOrderTotal: 860 },
  { id: "T18", number: 18, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T19", number: 19, status: "awaiting_payment", guests: 3, seatedTime: "12:02 PM", orderId: "ORD-109", activeOrderTotal: 1540 },
  { id: "T20", number: 20, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 }
];

export const INITIAL_ACTIVE_ORDERS = [
  {
    id: "ORD-101",
    tableId: "T1",
    status: "Preparing",
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(), // 14 mins ago
    priority: "normal",
    items: [
      { id: "oi-1", menuItemId: "item-1", name: "Truffles Signature Monster Burger", price: 390, qty: 2, customizations: ["Extra Cheese Slice"] },
      { id: "oi-2", menuItemId: "item-3", name: "Creamy Truffle Mushroom Alfredo", price: 420, qty: 1, customizations: ["Extra Garlic Bread (2 pcs)"] },
      { id: "oi-3", menuItemId: "item-6", name: "Belgian Chocolate Lava Cake", price: 250, qty: 1, customizations: [] }
    ],
    notes: "Make Alfredo pasta medium spicy please."
  },
  {
    id: "ORD-102",
    tableId: "T3",
    status: "Payment Pending",
    createdAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-4", menuItemId: "item-5", name: "Quattro Formaggi Woodfired Pizza", price: 590, qty: 1, customizations: [] },
      { id: "oi-5", menuItemId: "item-7", name: "Nutella Thickshake Supreme", price: 390, qty: 1, customizations: [] }
    ],
    notes: "Bill requested."
  },
  {
    id: "ORD-103",
    tableId: "T5",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    priority: "high",
    items: [
      { id: "oi-6", menuItemId: "item-2", name: "Crispy Peri Peri Cottage Cheese Burger", price: 340, qty: 2, customizations: ["Extra Dip: Garlic Mayo"] },
      { id: "oi-7", menuItemId: "item-7", name: "Nutella Thickshake Supreme", price: 440, qty: 1, customizations: ["Less Sugar"] }
    ],
    notes: "VIP table guest. Serve drinks first."
  },
  {
    id: "ORD-104",
    tableId: "T8",
    status: "Served",
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-8", menuItemId: "item-1", name: "Truffles Signature Monster Burger", price: 390, qty: 3, customizations: [] },
      { id: "oi-9", menuItemId: "item-5", name: "Quattro Formaggi Woodfired Pizza", price: 590, qty: 1, customizations: [] }
    ],
    notes: ""
  },
  {
    id: "ORD-105",
    tableId: "T9",
    status: "Ready",
    createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-10", menuItemId: "item-3", name: "Creamy Truffle Mushroom Alfredo", price: 420, qty: 2, customizations: [] },
      { id: "oi-11", menuItemId: "item-6", name: "Belgian Chocolate Lava Cake", price: 290, qty: 2, customizations: ["Extra Gelato Scoop"] }
    ],
    notes: "Ready for pickup at pass."
  }
];

export const INITIAL_STAFF = [
  { id: "st-1", name: "Rohan Verma", phone: "+91 98765 43210", role: "Manager", isActive: true },
  { id: "st-2", name: "Priya Sharma", phone: "+91 98765 43211", role: "Cashier", isActive: true },
  { id: "st-3", name: "Chef Marcus", phone: "+91 98765 43212", role: "Kitchen", isActive: true },
  { id: "st-4", name: "Vikram Singh", phone: "+91 98765 43213", role: "Waiter", isActive: true }
];

export const INITIAL_FEEDBACK = [
  { id: "fb-1", orderId: "ORD-095", rating: 5, comment: "Amazing monster burger! Hot and super fresh.", createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
  { id: "fb-2", orderId: "ORD-094", rating: 4, comment: "Great pasta and fast table service via QR code.", createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString() }
];

export const INITIAL_PAID_TRANSACTIONS = [
  { id: "TX-901", orderId: "ORD-090", tableId: "T2", amount: 2400, paidAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), paymentMethod: "UPI", itemsCount: 4 },
  { id: "TX-902", orderId: "ORD-091", tableId: "T4", amount: 1850, paidAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), paymentMethod: "CARD", itemsCount: 3 }
];
