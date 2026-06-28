# Shakdal.com — Project Structure & Technical Documentation

## 1. Project Overview

**শাকডাল.com** is a direct farmer-to-customer e-commerce platform built with Vue 3. It connects local farmers in Rajshahi (and beyond) directly with consumers, eliminating middlemen from the agricultural supply chain.

**Live Tech Stack:**
- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **State Management:** Pinia (with LocalStorage persistence)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Routing:** Vue Router 5 (with role-based guards)
- **Build Tool:** Vite 8
- **Language:** TypeScript

---

## 2. Directory Structure

```text
shakdal/
├── docs/                           # Project documentation
│   ├── project_proposal.md         # Full project proposal
│   └── project_structure_and_setup.md  # This file
├── public/                         # Static assets
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── AppNavbar.vue           # Top navigation bar (role-aware)
│   │   ├── AppFooter.vue           # Site-wide footer
│   │   ├── CartDrawer.vue          # Slide-in cart panel
│   │   └── ProductCard.vue         # Product listing card
│   ├── router/
│   │   └── index.ts                # All routes & navigation guards
│   ├── stores/                     # Pinia state management
│   │   ├── auth.ts                 # Authentication & user session
│   │   ├── product.ts              # Product catalog & inventory
│   │   ├── cart.ts                 # Shopping cart state
│   │   └── order.ts                # Order placement & history
│   ├── views/                      # Page-level components
│   │   ├── HomeView.vue            # Landing page
│   │   ├── auth/
│   │   │   ├── LoginView.vue       # Login screen
│   │   │   └── RegisterView.vue    # Registration screen (role selector)
│   │   ├── farmer/
│   │   │   ├── FarmerDashboardView.vue  # Farmer's product management
│   │   │   ├── AddProductView.vue       # Add/Edit product form
│   │   │   └── FarmerOrdersView.vue     # Received orders
│   │   └── customer/
│   │       ├── MarketplaceView.vue      # Product browsing & search
│   │       ├── ProductDetailView.vue    # Single product page
│   │       ├── CartView.vue             # Full cart page
│   │       ├── CheckoutView.vue         # Delivery & payment form
│   │       ├── OrderConfirmationView.vue  # Post-order success
│   │       └── OrderHistoryView.vue     # Past orders list
│   ├── App.vue                     # Root layout component
│   ├── main.ts                     # Application entry point
│   └── style.css                   # Global design system (Tailwind v4)
├── index.html                      # HTML entry point (with SEO & fonts)
├── vite.config.ts                  # Vite + Tailwind plugin configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## 3. Getting Started

### Prerequisites
- Node.js 18+ installed

### Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`.

---

## 4. Route Map

| Route | View | Access | Description |
|---|---|---|---|
| `/` | HomeView | Public | Landing page with hero, features, CTA |
| `/login` | LoginView | Guest only | Phone-based login |
| `/register` | RegisterView | Guest only | Role-based registration |
| `/marketplace` | MarketplaceView | Public | Product grid with search/filter |
| `/product/:id` | ProductDetailView | Public | Single product details |
| `/cart` | CartView | Customer | Full cart management |
| `/checkout` | CheckoutView | Customer | Delivery + payment form |
| `/order-confirmation/:id` | OrderConfirmationView | Customer | Post-checkout success |
| `/orders` | OrderHistoryView | Customer | Past orders list |
| `/farmer/dashboard` | FarmerDashboardView | Farmer | Inventory management |
| `/farmer/add-product` | AddProductView | Farmer | Add new product |
| `/farmer/edit-product/:id` | AddProductView | Farmer | Edit existing product |
| `/farmer/orders` | FarmerOrdersView | Farmer | Received orders |

---

## 5. State Management (Pinia Stores)

### `auth.ts`
- Manages user session (login, register, logout)
- Stores a mock user database in LocalStorage
- Pre-populated with 3 farmers and 2 customers
- Provides `isLoggedIn`, `isFarmer`, `isCustomer` computed properties

### `product.ts`
- Manages the product catalog (12 mock products)
- CRUD operations: `addProduct`, `updateProduct`, `deleteProduct`
- Query helpers: `getProductsByFarmer`, `getProductsByCategory`, `searchProducts`

### `cart.ts`
- Shopping cart with add/remove/update quantity
- Computed `totalItems` and `totalPrice`
- Slide-drawer open/close state

### `order.ts`
- Order placement and status tracking
- Queries by customer or farmer
- Status transitions: pending → confirmed → delivered

---

## 6. Design System

The design system is defined in `src/style.css` using Tailwind CSS v4's `@theme` directive:

- **Primary Colors:** Green palette (agricultural/fresh theme)
- **Accent Colors:** Warm orange (harvest tones)
- **Typography:** Inter (body) + Outfit (headings)
- **Component Classes:** `.btn-primary`, `.card`, `.input-field`, `.badge-green`, etc.
- **Animations:** `fadeInUp`, `slideInRight`, `pulse-soft`

---

## 7. Mock Data

The platform ships with pre-populated data to ensure a realistic experience:
- **3 Farmers** with Bengali names and Rajshahi locations
- **2 Customers** with realistic profiles
- **12 Products** across vegetables, fruits, rice, and spices
- All data persists in LocalStorage

### Quick Login Credentials
| Role | Phone | Name |
|---|---|---|
| Farmer | `01712345678` | রহিম উদ্দিন |
| Farmer | `01812345678` | করিম শেখ |
| Customer | `01912345678` | তানভীর হোসেন |

---

## 8. Future Enhancements (Supabase Migration Path)

The LocalStorage layer is abstracted into Pinia stores, making backend migration straightforward:

1. Replace `localStorage.getItem/setItem` calls with Supabase queries
2. Replace mock user creation with `supabase.auth.signUp()`
3. Replace product CRUD with `supabase.from('products')` queries
4. Add real-time subscriptions for order updates
5. Implement Supabase Storage for image uploads
