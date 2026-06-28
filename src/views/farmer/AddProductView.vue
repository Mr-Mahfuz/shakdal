<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useProductStore, CATEGORIES } from '../../stores/product'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const successMsg = ref('')

const form = reactive({
  name: '',
  nameEn: '',
  description: '',
  pricePerKg: 0,
  stockQty: 0,
  unit: 'কেজি',
  imageUrl: '',
  category: 'vegetables',
  isOrganic: false
})

// Populate form if editing
onMounted(() => {
  if (isEdit.value) {
    const product = productStore.getProductById(route.params.id as string)
    if (product) {
      Object.assign(form, {
        name: product.name,
        nameEn: product.nameEn,
        description: product.description,
        pricePerKg: product.pricePerKg,
        stockQty: product.stockQty,
        unit: product.unit,
        imageUrl: product.imageUrl,
        category: product.category,
        isOrganic: product.isOrganic
      })
    }
  }
})

const categoryOptions = CATEGORIES.filter(c => c.id !== 'all')

const sampleImages = [
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
  'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80',
  'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80',
  'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80',
  'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=500&q=80',
]

async function handleSubmit() {
  if (!form.name.trim() || !form.pricePerKg || !form.stockQty) return

  loading.value = true
  await new Promise(r => setTimeout(r, 800))

  if (isEdit.value) {
    productStore.updateProduct(route.params.id as string, { ...form })
    successMsg.value = 'পণ্য সফলভাবে আপডেট হয়েছে!'
  } else {
    productStore.addProduct({
      ...form,
      farmerId: authStore.user!.id,
      farmerName: authStore.user!.name
    })
    successMsg.value = 'পণ্য সফলভাবে যোগ হয়েছে!'
  }

  loading.value = false
  setTimeout(() => {
    router.push('/farmer/dashboard')
  }, 1500)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 font-medium cursor-pointer transition-colors">
      ← ড্যাশবোর্ডে ফিরুন
    </button>

    <h1 class="section-title mb-8">
      {{ isEdit ? '✏️ পণ্য সম্পাদনা করুন' : '➕ নতুন পণ্য যোগ করুন' }}
    </h1>

    <!-- Success Message -->
    <div v-if="successMsg" class="bg-primary-50 text-primary-700 font-semibold p-4 rounded-xl mb-6 text-center border border-primary-200 animate-fade-in-up">
      ✅ {{ successMsg }}
    </div>

    <div class="card p-6 md:p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="label">📦 পণ্যের নাম (বাংলায়)</label>
            <input v-model="form.name" type="text" placeholder="যেমন: দেশী টমেটো" class="input-field" required />
          </div>
          <div>
            <label class="label">📦 পণ্যের নাম (ইংরেজিতে)</label>
            <input v-model="form.nameEn" type="text" placeholder="e.g. Fresh Tomatoes" class="input-field" />
          </div>
        </div>

        <div>
          <label class="label">📝 বিবরণ</label>
          <textarea v-model="form.description" rows="3" placeholder="পণ্যের বিস্তারিত বর্ণনা লিখুন..." class="input-field resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label class="label">💰 দাম (৳)</label>
            <input v-model.number="form.pricePerKg" type="number" min="1" placeholder="40" class="input-field" required />
          </div>
          <div>
            <label class="label">📊 মজুদ</label>
            <input v-model.number="form.stockQty" type="number" min="1" placeholder="100" class="input-field" required />
          </div>
          <div>
            <label class="label">⚖️ একক</label>
            <select v-model="form.unit" class="input-field">
              <option value="কেজি">কেজি</option>
              <option value="আঁটি">আঁটি</option>
              <option value="পিস">পিস</option>
              <option value="হালি">হালি</option>
            </select>
          </div>
          <div>
            <label class="label">📂 ক্যাটেগরি</label>
            <select v-model="form.category" class="input-field">
              <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image URL -->
        <div>
          <label class="label">🖼️ পণ্যের ছবি URL</label>
          <input v-model="form.imageUrl" type="url" placeholder="https://example.com/image.jpg" class="input-field" />
          <p class="text-xs text-gray-400 mt-2">ছবি URL না থাকলে নিচের থেকে একটি বেছে নিন:</p>
          <div class="flex gap-2 mt-2 overflow-x-auto pb-2">
            <button v-for="(img, i) in sampleImages" :key="i" type="button"
              @click="form.imageUrl = img"
              :class="[
                'w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 cursor-pointer transition-all',
                form.imageUrl === img ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-300'
              ]">
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Image Preview -->
        <div v-if="form.imageUrl" class="mt-4">
          <label class="label">প্রিভিউ</label>
          <img :src="form.imageUrl" alt="Preview" class="w-full max-w-xs aspect-video object-cover rounded-xl border-2 border-gray-200" />
        </div>

        <!-- Organic Toggle -->
        <label class="flex items-center gap-3 cursor-pointer">
          <div class="relative">
            <input v-model="form.isOrganic" type="checkbox" class="sr-only peer" />
            <div class="w-12 h-7 bg-gray-200 rounded-full peer-checked:bg-primary-500 transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></div>
          </div>
          <span class="font-medium text-gray-700">🌱 জৈব পণ্য (কোনো রাসায়নিক সার ব্যবহার হয়নি)</span>
        </label>

        <button type="submit" :disabled="loading" class="btn-primary w-full text-lg py-4 disabled:opacity-60">
          <span v-if="loading" class="animate-spin mr-2">⏳</span>
          {{ loading ? 'সংরক্ষণ হচ্ছে...' : isEdit ? '✓ আপডেট করুন' : '✓ পণ্য যোগ করুন' }}
        </button>
      </form>
    </div>
  </div>
</template>
