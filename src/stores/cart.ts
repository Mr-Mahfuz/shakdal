import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'shakdal_cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isDrawerOpen = ref(false)

  // Initialize
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try { items.value = JSON.parse(stored) } catch { /* ignore */ }
  }

  // Persist
  watch(items, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  // Computed
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantity), 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addToCart(product: Product, qty: number = 1) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += qty
    } else {
      items.value.push({ product, quantity: qty })
    }
  }

  function removeFromCart(productId: string) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  return {
    items,
    isDrawerOpen,
    totalItems,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleDrawer,
    openDrawer,
    closeDrawer
  }
})
