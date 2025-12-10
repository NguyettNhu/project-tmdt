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

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 1001,
    userId: 1,
    orderDate: '2024-11-10T10:30:00',
    status: 'delivered',
    items: [
      {
        productId: 1,
        productName: 'Áo Thun Basic Trắng',
        productImage: '/images/product-01.jpg',
        quantity: 2,
        price: 29.99,
        size: 'M',
        color: 'Trắng'
      },
      {
        productId: 5,
        productName: 'Quần Jean Xanh',
        productImage: '/images/product-05.jpg',
        quantity: 1,
        price: 59.99,
        size: 'L'
      }
    ],
    totalAmount: 119.97,
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    },
    paymentMethod: 'cod',
    shippingFee: 30000,
    trackingNumber: 'VN123456789',
    estimatedDelivery: '2024-11-15'
  },
  {
    id: 1002,
    userId: 1,
    orderDate: '2024-11-14T15:20:00',
    status: 'shipping',
    items: [
      {
        productId: 3,
        productName: 'Áo Hoodie Đen',
        productImage: '/images/product-03.jpg',
        quantity: 1,
        price: 49.99,
        size: 'L',
        color: 'Đen'
      }
    ],
    totalAmount: 49.99,
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    },
    paymentMethod: 'bank_transfer',
    shippingFee: 30000,
    trackingNumber: 'VN987654321',
    estimatedDelivery: '2024-11-18',
    note: 'Giao hàng buổi sáng'
  },
  {
    id: 1003,
    userId: 1,
    orderDate: '2024-11-15T09:45:00',
    status: 'confirmed',
    items: [
      {
        productId: 8,
        productName: 'Giày Sneaker Trắng',
        productImage: '/images/product-08.jpg',
        quantity: 1,
        price: 89.99,
        size: '42'
      },
      {
        productId: 10,
        productName: 'Túi Xách Da',
        productImage: '/images/product-10.jpg',
        quantity: 1,
        price: 129.99,
        color: 'Nâu'
      }
    ],
    totalAmount: 219.98,
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    },
    paymentMethod: 'credit_card',
    shippingFee: 30000,
    estimatedDelivery: '2024-11-20'
  },
  {
    id: 1004,
    userId: 2,
    orderDate: '2024-11-12T14:00:00',
    status: 'delivered',
    items: [
      {
        productId: 2,
        productName: 'Áo Thun Đen Basic',
        productImage: '/images/product-02.jpg',
        quantity: 3,
        price: 29.99,
        size: 'S',
        color: 'Đen'
      }
    ],
    totalAmount: 89.97,
    shippingAddress: {
      fullName: 'Trần Thị B',
      phone: '0912345678',
      address: '456 Lê Lợi',
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    },
    paymentMethod: 'cod',
    shippingFee: 30000,
    trackingNumber: 'VN555666777',
    estimatedDelivery: '2024-11-16'
  },
  {
    id: 1005,
    userId: 1,
    orderDate: '2024-11-16T11:15:00',
    status: 'pending',
    items: [
      {
        productId: 11,
        productName: 'Gấu Bông Teddy',
        productImage: '/images/product-11.jpg',
        quantity: 2,
        price: 39.99
      }
    ],
    totalAmount: 79.98,
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    },
    paymentMethod: 'cod',
    shippingFee: 30000
  }
];

// Get orders by user ID
export function getOrdersByUserId(userId: number): Order[] {
  return mockOrders
    .filter(order => order.userId === userId)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
}

// Get order by ID
export function getOrderById(orderId: number): Order | undefined {
  return mockOrders.find(order => order.id === orderId);
}

// Get orders by status
export function getOrdersByStatus(userId: number, status: OrderStatus): Order[] {
  return mockOrders
    .filter(order => order.userId === userId && order.status === status)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
}

// Get order statistics
export function getOrderStats(userId: number) {
  const userOrders = getOrdersByUserId(userId);
  
  return {
    total: userOrders.length,
    pending: userOrders.filter(o => o.status === 'pending').length,
    confirmed: userOrders.filter(o => o.status === 'confirmed').length,
    shipping: userOrders.filter(o => o.status === 'shipping').length,
    delivered: userOrders.filter(o => o.status === 'delivered').length,
    cancelled: userOrders.filter(o => o.status === 'cancelled').length,
    totalSpent: userOrders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };
}

// Get status label in Vietnamese
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

// Get status color
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

// Format currency VND
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount * 23000); // Convert USD to VND (approximate rate)
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
