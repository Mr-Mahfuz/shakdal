import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  farmerId: string
  farmerName: string
  name: string
  nameEn: string
  description: string
  pricePerKg: number
  stockQty: number
  unit: string
  imageUrl: string
  category: string
  isOrganic: boolean
  rating: number
  soldCount: number
  createdAt: string
}

export const CATEGORIES = [
  { id: 'all', label: 'সব পণ্য', labelEn: 'All', icon: '🏪' },
  { id: 'vegetables', label: 'শাকসবজি', labelEn: 'Vegetables', icon: '🥬' },
  { id: 'fruits', label: 'ফলমূল', labelEn: 'Fruits', icon: '🥭' },
  { id: 'rice', label: 'চাল ও শস্য', labelEn: 'Rice & Grains', icon: '🌾' },
  { id: 'spices', label: 'মসলা', labelEn: 'Spices', icon: '🌶️' },
  { id: 'fish', label: 'মাছ', labelEn: 'Fish', icon: '🐟' },
]

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const isLoaded = ref(false)

  // Computed
  const totalProducts = computed(() => products.value.length)

  // Fetch all products from Supabase
  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && !error) {
      products.value = data.map(p => ({
        id: p.id,
        farmerId: p.farmer_id,
        farmerName: p.farmer_name,
        name: p.name,
        nameEn: p.name_en,
        description: p.description,
        pricePerKg: p.price_per_kg,
        stockQty: p.stock_qty,
        unit: p.unit,
        imageUrl: p.image_url,
        category: p.category,
        isOrganic: p.is_organic,
        rating: p.rating,
        soldCount: p.sold_count,
        createdAt: p.created_at
      }))
    }
    isLoaded.value = true
  }

  function getProductsByFarmer(farmerId: string) {
    return products.value.filter(p => p.farmerId === farmerId)
  }

  function getProductById(id: string) {
    return products.value.find(p => p.id === id)
  }

  function getProductsByCategory(category: string) {
    if (category === 'all') return products.value
    return products.value.filter(p => p.category === category)
  }

  function searchProducts(query: string) {
    const q = query.toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
      p.farmerName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'soldCount'>) {
    const { data, error } = await supabase.from('products').insert({
      farmer_id: product.farmerId,
      farmer_name: product.farmerName,
      name: product.name,
      name_en: product.nameEn,
      description: product.description,
      price_per_kg: product.pricePerKg,
      stock_qty: product.stockQty,
      unit: product.unit,
      image_url: product.imageUrl,
      category: product.category,
      is_organic: product.isOrganic
    }).select().single()

    if (data && !error) {
      await fetchProducts()
    }
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    const dbUpdates: any = {}
    if (updates.pricePerKg !== undefined) dbUpdates.price_per_kg = updates.pricePerKg
    if (updates.stockQty !== undefined) dbUpdates.stock_qty = updates.stockQty
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.unit !== undefined) dbUpdates.unit = updates.unit
    if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl
    if (updates.category !== undefined) dbUpdates.category = updates.category
    if (updates.isOrganic !== undefined) dbUpdates.is_organic = updates.isOrganic

    const { error } = await supabase
      .from('products')
      .update(dbUpdates)
      .eq('id', id)

    if (!error) {
      await fetchProducts()
    }
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      products.value = products.value.filter(p => p.id !== id)
    }
  }

  return {
    products,
    isLoaded,
    totalProducts,
    fetchProducts,
    getProductsByFarmer,
    getProductById,
    getProductsByCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  }
})
