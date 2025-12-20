import { ApiCustomer, ApiResponse } from '../types';
import { fetchApi } from './api-client';

export async function getCustomers(): Promise<ApiCustomer[]> {
    const response = await fetchApi<ApiResponse<ApiCustomer[]>>('/admin/customers', { requireAuth: true });
    return response.data;
}

export async function getCustomerById(id: number): Promise<ApiCustomer | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiCustomer>>(`/admin/customers/${id}`, { requireAuth: true });
        return response.data;
    } catch {
        return null;
    }
}
