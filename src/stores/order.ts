import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from './cart'
import { supabase } from '../lib/supabase'

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  paymentMethod: string
  createdAt: string
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const isLoaded = ref(false)

  // Computed
  const totalOrders = computed(() => orders.value.length)

  // Fetch orders (can be scoped by role later, but for now we fetch all relevant)
  async function fetchCustomerOrders(customerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })

    if (data && !error) {
      orders.value = data.map(mapDbOrderToState)
    }
    isLoaded.value = true
  }

  async function fetchFarmerOrders(farmerId: string) {
    // A bit more complex: find all order_items for this farmer, then fetch those orders
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('order_id')
      .eq('farmer_id', farmerId)

    if (itemsError || !itemsData || itemsData.length === 0) {
      orders.value = []
      isLoaded.value = true
      return
    }

    const orderIds = [...new Set(itemsData.map(i => i.order_id))]
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .in('id', orderIds)
      .order('created_at', { ascending: false })

    if (data && !error) {
      orders.value = data.map(mapDbOrderToState)
    }
    isLoaded.value = true
  }

  function mapDbOrderToState(dbOrder: any): Order {
    return {
      id: dbOrder.id,
      customerId: dbOrder.customer_id,
      customerName: dbOrder.customer_name,
      customerPhone: dbOrder.customer_phone,
      deliveryAddress: dbOrder.delivery_address,
      totalAmount: dbOrder.total_amount,
      status: dbOrder.status,
      paymentMethod: dbOrder.payment_method,
      createdAt: dbOrder.created_at,
      items: dbOrder.order_items.map((item: any) => ({
        quantity: item.quantity,
        product: {
          id: item.product_id,
          farmerId: item.farmer_id,
          name: item.product_name,
          pricePerKg: item.price_per_kg,
          // Missing full product details in this simplified schema, but enough for order history
          imageUrl: '', 
          unit: 'কেজি'
        }
      }))
    }
  }

  // Actions
  async function placeOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<Order | null> {
    const { data: orderResponse, error: orderError } = await supabase.from('orders').insert({
      customer_id: orderData.customerId,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      delivery_address: orderData.deliveryAddress,
      total_amount: orderData.totalAmount,
      payment_method: orderData.paymentMethod
    }).select().single()

    if (orderError || !orderResponse) {
      console.error(orderError)
      return null
    }

    const orderItemsToInsert = orderData.items.map(item => ({
      order_id: orderResponse.id,
      product_id: item.product.id,
      farmer_id: item.product.farmerId,
      product_name: item.product.name,
      price_per_kg: item.product.pricePerKg,
      quantity: item.quantity
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItemsToInsert)

    if (itemsError) {
      console.error(itemsError)
    }

    return mapDbOrderToState({
      ...orderResponse,
      order_items: orderItemsToInsert
    })
  }

  function getOrdersByCustomer(customerId: string) {
    return orders.value.filter(o => o.customerId === customerId)
  }

  function getOrdersByFarmer(farmerId: string) {
    return orders.value.filter(o =>
      o.items.some(item => item.product.farmerId === farmerId)
    )
  }

  function getOrderById(orderId: string) {
    return orders.value.find(o => o.id === orderId)
  }

  async function updateOrderStatus(orderId: string, status: Order['status']) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      
    if (!error) {
      const order = orders.value.find(o => o.id === orderId)
      if (order) order.status = status
    }
  }

  return {
    orders,
    isLoaded,
    totalOrders,
    fetchCustomerOrders,
    fetchFarmerOrders,
    placeOrder,
    getOrdersByCustomer,
    getOrdersByFarmer,
    getOrderById,
    updateOrderStatus
  }
})
