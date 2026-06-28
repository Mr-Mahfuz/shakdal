import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Views
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import MarketplaceView from '../views/customer/MarketplaceView.vue'
import ProductDetailView from '../views/customer/ProductDetailView.vue'
import CartView from '../views/customer/CartView.vue'
import CheckoutView from '../views/customer/CheckoutView.vue'
import OrderConfirmationView from '../views/customer/OrderConfirmationView.vue'
import OrderHistoryView from '../views/customer/OrderHistoryView.vue'
import FarmerDashboardView from '../views/farmer/FarmerDashboardView.vue'
import AddProductView from '../views/farmer/AddProductView.vue'
import FarmerOrdersView from '../views/farmer/FarmerOrdersView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { guestOnly: true }
  },
  // Customer routes
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: MarketplaceView
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
    meta: { requiresAuth: true, role: 'customer' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    meta: { requiresAuth: true, role: 'customer' }
  },
  {
    path: '/order-confirmation/:id',
    name: 'OrderConfirmation',
    component: OrderConfirmationView,
    meta: { requiresAuth: true, role: 'customer' }
  },
  {
    path: '/orders',
    name: 'OrderHistory',
    component: OrderHistoryView,
    meta: { requiresAuth: true, role: 'customer' }
  },
  // Farmer routes
  {
    path: '/farmer/dashboard',
    name: 'FarmerDashboard',
    component: FarmerDashboardView,
    meta: { requiresAuth: true, role: 'farmer' }
  },
  {
    path: '/farmer/add-product',
    name: 'AddProduct',
    component: AddProductView,
    meta: { requiresAuth: true, role: 'farmer' }
  },
  {
    path: '/farmer/edit-product/:id',
    name: 'EditProduct',
    component: AddProductView,
    meta: { requiresAuth: true, role: 'farmer' }
  },
  {
    path: '/farmer/orders',
    name: 'FarmerOrders',
    component: FarmerOrdersView,
    meta: { requiresAuth: true, role: 'farmer' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guards
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.init()
  }

  // Redirect logged-in users away from guest-only pages
  if (to.meta.guestOnly && authStore.isLoggedIn) {
    if (authStore.isFarmer) return next({ name: 'FarmerDashboard' })
    return next({ name: 'Marketplace' })
  }

  // Protect authenticated routes
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Role-based access control
  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    if (authStore.isFarmer) return next({ name: 'FarmerDashboard' })
    return next({ name: 'Marketplace' })
  }

  next()
})

export default router
