import { ApiCategory, ApiResponse } from '../types';
import { fetchApi } from './api-client';

export async function getCategories(): Promise<ApiCategory[]> {
    const response = await fetchApi<ApiResponse<ApiCategory[]>>('/categories');
    return response.data;
}

export async function getCategoryById(id: number): Promise<ApiCategory | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiCategory>>(`/categories/${id}`);
        return response.data;
    } catch {
        return null;
    }
}
