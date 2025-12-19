'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { ApiOrder, ApiOrderItem } from './api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface CreateOrderData {
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  customer_address: string;
  payment_method: 'cod' | 'bank_transfer' | 'credit_card';
  note?: string;
  items: {
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
  }[];
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export function useOrders() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      const data: ApiResponse<ApiOrder[]> = await response.json();

      if (response.ok && data.status) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}

export function useOrder(id: number) {
  const { token, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!isAuthenticated || !token || !id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        const data: ApiResponse<ApiOrder> = await response.json();

        if (response.ok && data.status) {
          setOrder(data.data);
        } else {
          setError(data.message || 'Failed to fetch order');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, token, isAuthenticated]);

  return { order, loading, error };
}

export function useCreateOrder() {
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: CreateOrderData) => {
    if (!isAuthenticated || !token) {
      return { success: false, message: 'Vui lòng đăng nhập để đặt hàng', order: null };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data: ApiResponse<ApiOrder> = await response.json();

      if (response.ok && data.status) {
        return { success: true, message: data.message, order: data.data };
      } else {
        setError(data.message);
        return { success: false, message: data.message || 'Đặt hàng thất bại', order: null };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đặt hàng thất bại';
      setError(message);
      return { success: false, message, order: null };
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}

export function useCancelOrder() {
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelOrder = async (orderId: number, cancelNote?: string) => {
    if (!isAuthenticated || !token) {
      return { success: false, message: 'Vui lòng đăng nhập' };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ cancel_note: cancelNote }),
      });

      const data: ApiResponse<ApiOrder> = await response.json();

      if (response.ok && data.status) {
        return { success: true, message: data.message };
      } else {
        setError(data.message);
        return { success: false, message: data.message || 'Hủy đơn hàng thất bại' };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Hủy đơn hàng thất bại';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { cancelOrder, loading, error };
}

// Helper function to get order status label
export function getOrderStatusLabel(status: number): string {
  const statusMap: Record<number, string> = {
    0: 'Chờ xác nhận',
    1: 'Đã xác nhận',
    2: 'Đang giao',
    3: 'Hoàn thành',
    4: 'Đã hủy',
  };
  return statusMap[status] || 'Không xác định';
}

// Helper function to get payment status label
export function getPaymentStatusLabel(status: number): string {
  const statusMap: Record<number, string> = {
    0: 'Chưa thanh toán',
    1: 'Đã thanh toán',
    2: 'Hoàn tiền',
  };
  return statusMap[status] || 'Không xác định';
}

// Helper function to get order status color
export function getOrderStatusColor(status: number): string {
  const colorMap: Record<number, string> = {
    0: 'bg-yellow-100 text-yellow-800',
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-purple-100 text-purple-800',
    3: 'bg-green-100 text-green-800',
    4: 'bg-red-100 text-red-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
}
