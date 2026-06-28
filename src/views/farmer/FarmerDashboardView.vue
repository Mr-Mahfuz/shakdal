<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import { useOrderStore } from '../../stores/order'

const authStore = useAuthStore()
const productStore = useProductStore()
const orderStore = useOrderStore()

onMounted(async () => {
  if (!productStore.isLoaded) await productStore.fetchProducts()
  if (!orderStore.isLoaded) await orderStore.fetchFarmerOrders(authStore.user!.id)
})

const myProducts = computed(() => productStore.getProductsByFarmer(authStore.user!.id))
const myOrders = computed(() => orderStore.getOrdersByFarmer(authStore.user!.id))

const stats = computed(() => ({
  totalProducts: myProducts.value.length,
  totalStock: myProducts.value.reduce((sum, p) => sum + p.stockQty, 0),
  totalSold: myProducts.value.reduce((sum, p) => sum + p.soldCount, 0),
  totalOrders: myOrders.value.length,
  revenue: myOrders.value.reduce((sum, o) => sum + o.totalAmount, 0)
}))

const editingId = ref<string | null>(null)
const editPrice = ref(0)
const editStock = ref(0)

function startEdit(productId: string) {
  const product = productStore.getProductById(productId)
  if (product) {
    editingId.value = productId
    editPrice.value = product.pricePerKg
    editStock.value = product.stockQty
  }
}

function saveEdit() {
  if (editingId.value) {
    productStore.updateProduct(editingId.value, {
      pricePerKg: editPrice.value,
      stockQty: editStock.value
    })
    editingId.value = null
  }
}

function cancelEdit() {
  editingId.value = null
}

function deleteProduct(id: string) {
  if (confirm('আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?')) {
    productStore.deleteProduct(id)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-[var(--font-display)]">
          👨‍🌾 স্বাগতম, {{ authStore.user?.name }}!
        </h1>
        <p class="text-gray-500 mt-1">📍 {{ authStore.user?.location }}</p>
      </div>
      <router-link to="/farmer/add-product" class="btn-primary">
        ➕ নতুন পণ্য যোগ করুন
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div class="card p-5 text-center">
        <p class="text-3xl font-bold text-primary-600">{{ stats.totalProducts }}</p>
        <p class="text-sm text-gray-400 mt-1">পণ্য তালিকায়</p>
      </div>
      <div class="card p-5 text-center">
        <p class="text-3xl font-bold text-blue-600">{{ stats.totalStock }}</p>
        <p class="text-sm text-gray-400 mt-1">মোট মজুদ</p>
      </div>
      <div class="card p-5 text-center">
        <p class="text-3xl font-bold text-accent-600">{{ stats.totalSold }}</p>
        <p class="text-sm text-gray-400 mt-1">মোট বিক্রি</p>
      </div>
      <div class="card p-5 text-center">
        <p class="text-3xl font-bold text-green-600">{{ stats.totalOrders }}</p>
        <p class="text-sm text-gray-400 mt-1">অর্ডার পেয়েছেন</p>
      </div>
    </div>

    <!-- Products Section -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">📦 আমার পণ্য সমূহ</h2>
      <router-link to="/farmer/orders" class="text-primary-600 font-medium hover:underline text-sm">
        অর্ডার দেখুন →
      </router-link>
    </div>

    <div v-if="myProducts.length > 0" class="space-y-4">
      <div v-for="product in myProducts" :key="product.id"
        class="card p-4 md:p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <img :src="product.imageUrl" :alt="product.name"
            class="w-full sm:w-28 h-28 object-cover rounded-xl" />
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-gray-800 text-lg">{{ product.name }}</h3>
                <p class="text-sm text-gray-400">{{ product.nameEn }} • {{ product.category }}</p>
              </div>
              <div class="flex gap-2">
                <span v-if="product.isOrganic" class="badge-green text-xs">🌱 জৈব</span>
                <span v-if="product.stockQty < 30" class="badge-red text-xs">কম মজুদ</span>
              </div>
            </div>

            <!-- View Mode -->
            <div v-if="editingId !== product.id" class="mt-4">
              <div class="flex flex-wrap gap-6 text-sm">
                <div>
                  <span class="text-gray-400">দাম:</span>
                  <span class="font-bold text-primary-600 ml-1">৳{{ product.pricePerKg }}/{{ product.unit }}</span>
                </div>
                <div>
                  <span class="text-gray-400">মজুদ:</span>
                  <span class="font-bold text-gray-700 ml-1">{{ product.stockQty }} {{ product.unit }}</span>
                </div>
                <div>
                  <span class="text-gray-400">বিক্রি:</span>
                  <span class="font-bold text-accent-600 ml-1">{{ product.soldCount }}</span>
                </div>
                <div>
                  <span class="text-gray-400">রেটিং:</span>
                  <span class="font-bold text-amber-500 ml-1">★ {{ product.rating }}</span>
                </div>
              </div>
              <div class="flex gap-2 mt-4">
                <button @click="startEdit(product.id)" class="btn-sm btn-secondary cursor-pointer">✏️ এডিট</button>
                <button @click="deleteProduct(product.id)" class="btn-sm btn-danger cursor-pointer">🗑️ মুছুন</button>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="mt-4 bg-primary-50 rounded-xl p-4 border border-primary-100 animate-fade-in-up">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="label">দাম (৳/{{ product.unit }})</label>
                  <input v-model.number="editPrice" type="number" class="input-field" />
                </div>
                <div>
                  <label class="label">মজুদ ({{ product.unit }})</label>
                  <input v-model.number="editStock" type="number" class="input-field" />
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="saveEdit" class="btn-sm btn-primary cursor-pointer">✓ সংরক্ষণ</button>
                <button @click="cancelEdit" class="btn-sm btn-ghost cursor-pointer">✕ বাতিল</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 card">
      <span class="text-7xl block mb-4">🌱</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">এখনো কোনো পণ্য যোগ হয়নি</h2>
      <p class="text-gray-400 mb-6">আপনার তাজা ফসল তালিকায় যোগ করুন</p>
      <router-link to="/farmer/add-product" class="btn-primary inline-block">➕ পণ্য যোগ করুন</router-link>
    </div>
  </div>
</template>
