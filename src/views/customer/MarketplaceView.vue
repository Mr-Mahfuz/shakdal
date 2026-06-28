<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore, CATEGORIES } from '../../stores/product'
import ProductCard from '../../components/ProductCard.vue'

const productStore = useProductStore()

onMounted(async () => {
  if (!productStore.isLoaded) {
    await productStore.fetchProducts()
  }
})

const searchQuery = ref('')
const activeCategory = ref('all')
const sortBy = ref('popular')

const filteredProducts = computed(() => {
  let result = productStore.products

  // Category filter
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value)
  }

  // Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.farmerName.toLowerCase().includes(q)
    )
  }

  // Sort
  if (sortBy.value === 'popular') {
    result = [...result].sort((a, b) => b.soldCount - a.soldCount)
  } else if (sortBy.value === 'price-low') {
    result = [...result].sort((a, b) => a.pricePerKg - b.pricePerKg)
  } else if (sortBy.value === 'price-high') {
    result = [...result].sort((a, b) => b.pricePerKg - a.pricePerKg)
  } else if (sortBy.value === 'newest') {
    result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  return result
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="section-title">🏪 তাজা বাজার</h1>
      <p class="section-subtitle">রাজশাহীর কৃষকদের কাছ থেকে সরাসরি তাজা শাকসবজি ও ফলমূল</p>
    </div>

    <!-- Search & Sort -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative flex-grow">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="পণ্য খুঁজুন... (যেমন: আম, টমেটো, চাল)"
          class="input-field pl-12 text-lg" />
      </div>
      <select v-model="sortBy" class="input-field w-full sm:w-48">
        <option value="popular">জনপ্রিয়</option>
        <option value="newest">নতুন</option>
        <option value="price-low">দাম: কম → বেশি</option>
        <option value="price-high">দাম: বেশি → কম</option>
      </select>
    </div>

    <!-- Categories -->
    <div class="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
      <button v-for="cat in CATEGORIES" :key="cat.id"
        @click="activeCategory = cat.id"
        :class="[
          'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border-2',
          activeCategory === cat.id
            ? 'bg-primary-600 text-white border-primary-600 shadow-md'
            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-700'
        ]">
        <span>{{ cat.icon }}</span>
        {{ cat.label }}
      </button>
    </div>

    <!-- Results Count -->
    <div class="mb-6">
      <p class="text-sm text-gray-400">
        {{ filteredProducts.length }} টি পণ্য পাওয়া গেছে
        <span v-if="searchQuery"> — "{{ searchQuery }}" এর জন্য</span>
      </p>
    </div>

    <!-- Product Grid -->
    <div v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">🔍</span>
      <h3 class="text-xl font-bold text-gray-600 mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
      <p class="text-gray-400">অন্য কিছু খুঁজে দেখুন বা ফিল্টার পরিবর্তন করুন</p>
    </div>
  </div>
</template>
