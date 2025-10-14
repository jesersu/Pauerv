export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrl?: string
}

export interface DashboardStats {
  users: number
  revenue: string
  orders: number
}
