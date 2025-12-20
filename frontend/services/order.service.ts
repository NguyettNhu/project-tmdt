import { ApiOrder, ApiResponse } from '../types';
import { fetchApi } from './api-client';

export async function getOrders(): Promise<ApiOrder[]> {
    const response = await fetchApi<ApiResponse<ApiOrder[]>>('/admin/orders', { requireAuth: true });
    return response.data;
}

export async function getOrderById(id: number): Promise<ApiOrder | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiOrder>>(`/admin/orders/${id}`, { requireAuth: true });
        return response.data;
    } catch {
        return null;
    }
}
