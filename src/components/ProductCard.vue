<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const added = ref(false)

function addToCart() {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  cartStore.addToCart(props.product)
  added.value = true
  setTimeout(() => added.value = false, 1500)
}

function goToDetail() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div class="card-hover group cursor-pointer" @click="goToDetail">
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img :src="product.imageUrl" :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div v-if="product.isOrganic"
        class="absolute top-3 left-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-primary-400/30 flex items-center gap-1 backdrop-blur-sm">
        <span class="text-sm">🌱</span> জৈব
      </div>
      <div v-if="product.stockQty < 30"
        class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
        সীমিত!
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-gray-400 font-medium">{{ product.farmerName }}</span>
        <div class="flex items-center gap-1 text-xs">
          <span class="text-amber-400">★</span>
          <span class="text-gray-500">{{ product.rating }}</span>
        </div>
      </div>
      <h3 class="font-bold text-gray-800 text-lg mb-1 group-hover:text-primary-700 transition-colors">
        {{ product.name }}
      </h3>
      <p class="text-sm text-gray-400 mb-3">{{ product.nameEn }}</p>

      <div class="flex items-end justify-between">
        <div>
          <span class="text-2xl font-bold text-primary-600">৳{{ product.pricePerKg }}</span>
          <span class="text-sm text-gray-400 ml-1">/ {{ product.unit }}</span>
        </div>
        <button @click.stop="addToCart" :disabled="added"
          :class="[
            'cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
            added
              ? 'bg-primary-100 text-primary-700'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
          ]">
          {{ added ? '✓ যোগ হয়েছে' : '🛒 কার্টে রাখুন' }}
        </button>
      </div>
    </div>
  </div>
</template>
