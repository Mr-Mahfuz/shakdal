<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import ProductCard from '../../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const quantity = ref(1)
const added = ref(false)

const product = computed(() => productStore.getProductById(route.params.id as string))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4)
})

function addToCart() {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    added.value = true
    setTimeout(() => added.value = false, 2000)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back -->
    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 font-medium cursor-pointer transition-colors">
      ← বাজারে ফিরুন
    </button>

    <div v-if="product" class="animate-fade-in-up">
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Image -->
        <div class="relative">
          <img :src="product.imageUrl" :alt="product.name"
            class="w-full aspect-square object-cover rounded-2xl shadow-lg" />
          <div v-if="product.isOrganic"
            class="absolute top-4 left-4 bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            🌱 জৈব পণ্য
          </div>
        </div>

        <!-- Details -->
        <div class="flex flex-col justify-center">
          <span class="badge-green mb-3 w-fit">{{ product.category === 'vegetables' ? '🥬 শাকসবজি' : product.category === 'fruits' ? '🥭 ফলমূল' : product.category === 'rice' ? '🌾 চাল ও শস্য' : product.category === 'spices' ? '🌶️ মসলা' : '🐟 মাছ' }}</span>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-1 font-[var(--font-display)]">{{ product.name }}</h1>
          <p class="text-gray-400 text-lg mb-4">{{ product.nameEn }}</p>

          <!-- Rating & Sold -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center gap-1">
              <span v-for="i in 5" :key="i" class="text-lg" :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'">★</span>
              <span class="text-sm text-gray-500 ml-1">({{ product.rating }})</span>
            </div>
            <span class="text-sm text-gray-400">{{ product.soldCount }}+ বিক্রি হয়েছে</span>
          </div>

          <!-- Price -->
          <div class="bg-primary-50 rounded-2xl p-6 mb-6 border border-primary-100">
            <span class="text-4xl font-bold text-primary-600">৳{{ product.pricePerKg }}</span>
            <span class="text-lg text-gray-500 ml-2">/ {{ product.unit }}</span>
            <p class="text-sm text-primary-600 mt-1">মজুদ আছে: {{ product.stockQty }} {{ product.unit }}</p>
          </div>

          <!-- Description -->
          <p class="text-gray-600 leading-relaxed mb-6 text-lg">{{ product.description }}</p>

          <!-- Farmer Info -->
          <div class="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3 border border-gray-100">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl">👨‍🌾</div>
            <div>
              <p class="font-semibold text-gray-800">{{ product.farmerName }}</p>
              <p class="text-sm text-gray-400">বিশ্বস্ত কৃষক</p>
            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button @click="quantity = Math.max(1, quantity - 1)"
                class="px-4 py-3 text-lg font-bold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">−</button>
              <span class="px-6 py-3 text-lg font-bold text-gray-800 bg-gray-50 min-w-[60px] text-center">{{ quantity }}</span>
              <button @click="quantity++"
                class="px-4 py-3 text-lg font-bold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">+</button>
            </div>
            <button @click="addToCart" :disabled="added"
              :class="[
                'flex-grow py-4 rounded-xl text-lg font-bold transition-all cursor-pointer',
                added
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                  : 'btn-primary'
              ]">
              {{ added ? '✓ কার্টে যোগ হয়েছে!' : '🛒 কার্টে যোগ করুন' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="mt-16">
        <h2 class="section-title">একই ধরনের পণ্য</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">😕</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">পণ্য পাওয়া যায়নি</h2>
      <router-link to="/marketplace" class="btn-primary mt-4 inline-block">বাজারে ফিরুন</router-link>
    </div>
  </div>
</template>
