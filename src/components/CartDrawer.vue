<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

function goToCheckout() {
  cartStore.closeDrawer()
  router.push('/checkout')
}
</script>

<template>
  <!-- Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isDrawerOpen" @click="cartStore.closeDrawer()"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div v-if="cartStore.isDrawerOpen"
        class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-800">🛒 আপনার কার্ট</h2>
          <button @click="cartStore.closeDrawer()"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-grow overflow-y-auto p-5 space-y-4">
          <div v-if="cartStore.isEmpty" class="text-center py-16">
            <span class="text-6xl block mb-4">🧺</span>
            <p class="text-gray-400 text-lg">আপনার কার্ট খালি</p>
            <p class="text-gray-300 text-sm mt-1">বাজার থেকে পছন্দের পণ্য যোগ করুন</p>
          </div>

          <div v-for="item in cartStore.items" :key="item.product.id"
            class="flex gap-3 bg-gray-50 rounded-xl p-3 animate-fade-in-up">
            <img :src="item.product.imageUrl" :alt="item.product.name"
              class="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            <div class="flex-grow min-w-0">
              <h4 class="font-semibold text-gray-800 text-sm truncate">{{ item.product.name }}</h4>
              <p class="text-xs text-gray-400">৳{{ item.product.pricePerKg }} / {{ item.product.unit }}</p>
              <div class="flex items-center gap-2 mt-2">
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-bold">
                  −
                </button>
                <span class="text-sm font-bold text-gray-800 w-6 text-center">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-bold">
                  +
                </button>
              </div>
            </div>
            <div class="flex flex-col items-end justify-between">
              <button @click="cartStore.removeFromCart(item.product.id)"
                class="text-red-400 hover:text-red-600 cursor-pointer p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <span class="font-bold text-primary-600 text-sm">
                ৳{{ item.product.pricePerKg * item.quantity }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!cartStore.isEmpty" class="border-t border-gray-100 p-5 space-y-4">
          <div class="flex justify-between text-lg font-bold">
            <span class="text-gray-600">মোট:</span>
            <span class="text-primary-600">৳{{ cartStore.totalPrice }}</span>
          </div>
          <button @click="goToCheckout" class="btn-primary w-full text-center">
            চেকআউট করুন →
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
