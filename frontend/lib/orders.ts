export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: number;
  userId: number;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
  };
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card';
  shippingFee: number;
  note?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}


export function getOrdersByUserId(userId: number): Order[] {
  console.warn('getOrdersByUserId is deprecated. Use useOrders() hook from lib/useOrders.ts');
  return [];
}

export function getOrderById(orderId: number): Order | undefined {
  console.warn('getOrderById is deprecated. Use useOrder() hook from lib/useOrders.ts');
  return undefined;
}

export function getOrdersByStatus(userId: number, status: OrderStatus): Order[] {
  console.warn('getOrdersByStatus is deprecated. Use useOrders() with API filters');
  return [];
}

export function getOrderStats(userId: number) {
  console.warn('getOrderStats is deprecated. Calculate from useOrders() data');
  return {
    total: 0,
    pending: 0,
    confirmed: 0,
    shipping: 0,
    delivered: 0,
    cancelled: 0,
    totalSpent: 0
  };
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  };
  return labels[status];
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    shipping: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200'
  };
  return colors[status];
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}
// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
