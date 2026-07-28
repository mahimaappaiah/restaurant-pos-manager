// Initial sample data for Restaurant POS & Admin System

export const INITIAL_BRANCHES = [
  "Downtown Main",
  "Westside Hub",
  "Airport Plaza",
  "Tech Park Suite"
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Starters & Appetizers", icon: "Utensils", sortOrder: 1 },
  { id: "cat-2", name: "Main Course", icon: "Flame", sortOrder: 2 },
  { id: "cat-3", name: "Woodfired Pizzas", icon: "Pizza", sortOrder: 3 },
  { id: "cat-4", name: "Desserts & Sweets", icon: "Cake", sortOrder: 4 },
  { id: "cat-5", name: "Beverages & Mocktails", icon: "Coffee", sortOrder: 5 }
];

export const INITIAL_MENU_ITEMS = [
  {
    id: "item-1",
    categoryId: "cat-1",
    name: "Paneer Tikka Smokey Grill",
    description: "Cottage cheese marinated in aromatic Indian spices, charred in clay oven",
    price: 340,
    isVeg: true,
    isAvailable: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c1", name: "Extra Mint Chutney", price: 30 },
      { id: "c2", name: "Cheese Blast Topping", price: 60 }
    ]
  },
  {
    id: "item-2",
    categoryId: "cat-1",
    name: "Crispy Peri Peri Wings",
    description: "Succulent chicken wings tossed in house spicy African peri peri glaze",
    price: 390,
    isVeg: false,
    isAvailable: true,
    prepTime: 18,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c3", name: "Dip: Garlic Mayo", price: 40 },
      { id: "c4", name: "Extra Spicy Heat Level", price: 0 }
    ]
  },
  {
    id: "item-3",
    categoryId: "cat-1",
    name: "Truffle Mushroom Crostini",
    description: "Toasted artisan sourdough topped with wild mushroom ragu and truffle oil",
    price: 420,
    isVeg: true,
    isAvailable: true,
    prepTime: 12,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c5", name: "Gluten Free Bread Option", price: 50 }
    ]
  },
  {
    id: "item-4",
    categoryId: "cat-2",
    name: "Butter Chicken Supreme",
    description: "Tandoori chicken simmered in rich creamy tomato cashew gravy with fenugreek",
    price: 480,
    isVeg: false,
    isAvailable: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c6", name: "Add Extra Butter Naan (1 pc)", price: 60 },
      { id: "c7", name: "Boneless Meat Only", price: 50 }
    ]
  },
  {
    id: "item-5",
    categoryId: "cat-2",
    name: "Dal Makhani Grand Reserve",
    description: "Black lentils slow-cooked overnight with churned butter and Kashmiri chili",
    price: 360,
    isVeg: true,
    isAvailable: true,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c8", name: "Double Cream Swirl", price: 30 }
    ]
  },
  {
    id: "item-6",
    categoryId: "cat-3",
    name: "Quattro Formaggi Pizza",
    description: "Hand-tossed sourdough pizza with Mozzarella, Gorgonzola, Parmesan, Fontina",
    price: 590,
    isVeg: true,
    isAvailable: true,
    prepTime: 20,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c9", name: "Stuffed Crust", price: 90 },
      { id: "c10", name: "Fresh Truffle Drizzle", price: 120 }
    ]
  },
  {
    id: "item-7",
    categoryId: "cat-3",
    name: "Fiery Chicken Pepperoni Pizza",
    description: "Artisan crust topped with sliced spicy pepperoni, jalapenos, and mozzarella",
    price: 650,
    isVeg: false,
    isAvailable: true,
    prepTime: 22,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c11", name: "Extra Pepperoni Slices", price: 110 }
    ]
  },
  {
    id: "item-8",
    categoryId: "cat-4",
    name: "Belgian Chocolate Lava Cake",
    description: "Warm molten chocolate cake served with Madagascar vanilla gelato",
    price: 290,
    isVeg: true,
    isAvailable: true,
    prepTime: 10,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c12", name: "Extra Gelato Scoop", price: 80 }
    ]
  },
  {
    id: "item-9",
    categoryId: "cat-4",
    name: "Classic Italian Tiramisu",
    description: "Savoiardi ladyfingers soaked in espresso coffee layered with mascarpone cream",
    price: 320,
    isVeg: true,
    isAvailable: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    customizations: []
  },
  {
    id: "item-10",
    categoryId: "cat-5",
    name: "Passionfruit Mint Fizz",
    description: "Sparkling mocktail with fresh passionfruit puree, crushed mint, and lime juice",
    price: 220,
    isVeg: true,
    isAvailable: true,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    customizations: [
      { id: "c13", name: "Less Sugar", price: 0 }
    ]
  }
];

// Initial 20 physical tables
export const INITIAL_TABLES = [
  { id: "T1", number: 1, status: "occupied", guests: 4, seatedTime: "12:15 PM", orderId: "ORD-101", activeOrderTotal: 1450 },
  { id: "T2", number: 2, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T3", number: 3, status: "awaiting_payment", guests: 2, seatedTime: "12:00 PM", orderId: "ORD-102", activeOrderTotal: 980 },
  { id: "T4", number: 4, status: "needs_cleaning", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T5", number: 5, status: "reserved", guests: 6, seatedTime: "01:30 PM (Expected)", orderId: null, activeOrderTotal: 0 },
  { id: "T6", number: 6, status: "occupied", guests: 3, seatedTime: "12:28 PM", orderId: "ORD-103", activeOrderTotal: 1240 },
  { id: "T7", number: 7, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T8", number: 8, status: "occupied", guests: 5, seatedTime: "12:10 PM", orderId: "ORD-104", activeOrderTotal: 2190 },
  { id: "T9", number: 9, status: "awaiting_payment", guests: 4, seatedTime: "11:50 AM", orderId: "ORD-105", activeOrderTotal: 1820 },
  { id: "T10", number: 10, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T11", number: 11, status: "occupied", guests: 2, seatedTime: "12:35 PM", orderId: "ORD-106", activeOrderTotal: 640 },
  { id: "T12", number: 12, status: "reserved", guests: 4, seatedTime: "02:00 PM (Expected)", orderId: null, activeOrderTotal: 0 },
  { id: "T13", number: 13, status: "needs_cleaning", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T14", number: 14, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T15", number: 15, status: "occupied", guests: 8, seatedTime: "12:05 PM", orderId: "ORD-107", activeOrderTotal: 3420 },
  { id: "T16", number: 16, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T17", number: 17, status: "occupied", guests: 2, seatedTime: "12:40 PM", orderId: "ORD-108", activeOrderTotal: 860 },
  { id: "T18", number: 18, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 },
  { id: "T19", number: 19, status: "awaiting_payment", guests: 3, seatedTime: "12:02 PM", orderId: "ORD-109", activeOrderTotal: 1540 },
  { id: "T20", number: 20, status: "vacant", guests: 0, seatedTime: null, orderId: null, activeOrderTotal: 0 }
];

// Initial active orders corresponding to occupied / awaiting payment tables
export const INITIAL_ACTIVE_ORDERS = [
  {
    id: "ORD-101",
    tableId: "T1",
    status: "In Kitchen",
    createdAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(), // 27 mins ago
    priority: "normal",
    items: [
      { id: "oi-1", menuItemId: "item-1", name: "Paneer Tikka Smokey Grill", price: 340, qty: 2, customizations: ["Extra Mint Chutney"] },
      { id: "oi-2", menuItemId: "item-4", name: "Butter Chicken Supreme", price: 480, qty: 1, customizations: ["Add Extra Butter Naan (1 pc)"] },
      { id: "oi-3", menuItemId: "item-8", name: "Belgian Chocolate Lava Cake", price: 290, qty: 1, customizations: [] }
    ],
    notes: "Please make butter chicken medium spicy."
  },
  {
    id: "ORD-102",
    tableId: "T3",
    status: "Payment Pending",
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(), // 42 mins ago
    priority: "normal",
    items: [
      { id: "oi-4", menuItemId: "item-3", name: "Truffle Mushroom Crostini", price: 420, qty: 1, customizations: [] },
      { id: "oi-5", menuItemId: "item-6", name: "Quattro Formaggi Pizza", price: 560, qty: 1, customizations: [] }
    ],
    notes: "Bill requested by guest."
  },
  {
    id: "ORD-103",
    tableId: "T6",
    status: "New",
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(), // 14 mins ago
    priority: "normal",
    items: [
      { id: "oi-6", menuItemId: "item-2", name: "Crispy Peri Peri Wings", price: 390, qty: 2, customizations: ["Dip: Garlic Mayo"] },
      { id: "oi-7", menuItemId: "item-10", name: "Passionfruit Mint Fizz", price: 220, qty: 2, customizations: ["Less Sugar"] }
    ],
    notes: "Wings extra crispy please."
  },
  {
    id: "ORD-104",
    tableId: "T8",
    status: "Served",
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(), // 32 mins ago
    priority: "high",
    items: [
      { id: "oi-8", menuItemId: "item-4", name: "Butter Chicken Supreme", price: 480, qty: 2, customizations: ["Boneless Meat Only"] },
      { id: "oi-9", menuItemId: "item-5", name: "Dal Makhani Grand Reserve", price: 360, qty: 2, customizations: [] },
      { id: "oi-10", menuItemId: "item-9", name: "Classic Italian Tiramisu", price: 320, qty: 1, customizations: [] }
    ],
    notes: "VIP table guest."
  },
  {
    id: "ORD-105",
    tableId: "T9",
    status: "Payment Pending",
    createdAt: new Date(Date.now() - 52 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-11", menuItemId: "item-7", name: "Fiery Chicken Pepperoni Pizza", price: 650, qty: 2, customizations: ["Extra Pepperoni Slices"] },
      { id: "oi-12", menuItemId: "item-8", name: "Belgian Chocolate Lava Cake", price: 290, qty: 1, customizations: ["Extra Gelato Scoop"] }
    ],
    notes: ""
  },
  {
    id: "ORD-106",
    tableId: "T11",
    status: "In Kitchen",
    createdAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-13", menuItemId: "item-1", name: "Paneer Tikka Smokey Grill", price: 340, qty: 1, customizations: [] },
      { id: "oi-14", menuItemId: "item-10", name: "Passionfruit Mint Fizz", price: 300, qty: 1, customizations: [] }
    ],
    notes: "No cutlery needed."
  },
  {
    id: "ORD-107",
    tableId: "T15",
    status: "Ready",
    createdAt: new Date(Date.now() - 37 * 60 * 1000).toISOString(),
    priority: "high",
    items: [
      { id: "oi-15", menuItemId: "item-6", name: "Quattro Formaggi Pizza", price: 590, qty: 3, customizations: ["Fresh Truffle Drizzle"] },
      { id: "oi-16", menuItemId: "item-4", name: "Butter Chicken Supreme", price: 480, qty: 3, customizations: [] },
      { id: "oi-17", menuItemId: "item-10", name: "Passionfruit Mint Fizz", price: 220, qty: 1, customizations: [] }
    ],
    notes: "Birthday party table."
  },
  {
    id: "ORD-108",
    tableId: "T17",
    status: "New",
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-18", menuItemId: "item-3", name: "Truffle Mushroom Crostini", price: 420, qty: 1, customizations: [] },
      { id: "oi-19", menuItemId: "item-10", name: "Passionfruit Mint Fizz", price: 440, qty: 1, customizations: [] }
    ],
    notes: ""
  },
  {
    id: "ORD-109",
    tableId: "T19",
    status: "Payment Pending",
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    priority: "normal",
    items: [
      { id: "oi-20", menuItemId: "item-2", name: "Crispy Peri Peri Wings", price: 390, qty: 2, customizations: [] },
      { id: "oi-21", menuItemId: "item-7", name: "Fiery Chicken Pepperoni Pizza", price: 650, qty: 1, customizations: [] },
      { id: "oi-22", menuItemId: "item-10", name: "Passionfruit Mint Fizz", price: 500, qty: 1, customizations: [] }
    ],
    notes: ""
  }
];

// Historical Transactions for Analytics
export const INITIAL_PAID_TRANSACTIONS = [
  { id: "TX-901", orderId: "ORD-090", tableId: "T2", amount: 2400, paidAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), paymentMethod: "UPI", itemsCount: 4 },
  { id: "TX-902", orderId: "ORD-091", tableId: "T4", amount: 1850, paidAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), paymentMethod: "Card", itemsCount: 3 },
  { id: "TX-903", orderId: "ORD-092", tableId: "T7", amount: 3200, paidAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), paymentMethod: "Cash", itemsCount: 5 },
  { id: "TX-904", orderId: "ORD-093", tableId: "T10", amount: 1400, paidAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), paymentMethod: "UPI", itemsCount: 2 },
  { id: "TX-905", orderId: "ORD-094", tableId: "T14", amount: 4100, paidAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), paymentMethod: "Split", itemsCount: 7 },
  { id: "TX-906", orderId: "ORD-095", tableId: "T16", amount: 950, paidAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), paymentMethod: "Card", itemsCount: 2 }
];
