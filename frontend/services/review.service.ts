import { ApiResponse, ApiReview } from '../types';
import { API_BASE_URL, fetchApi, getAdminToken } from './api-client';

export async function getReviews(productId: number): Promise<ApiReview[]> {
    const response = await fetchApi<ApiResponse<ApiReview[]>>(`/products/${productId}/reviews`);
    return response.data;
}

export async function createReview(data: {
    product_id: number;
    customer_id: number;
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
}): Promise<ApiReview> {
    const token = getAdminToken(); // Or customer token if you have one
    // Note: In a real app, you'd use the customer's token. 
    // For now, assuming the API might accept it or we need to implement customer auth token storage.

    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${token}`, // Add if auth required
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Không thể gửi đánh giá');
    }
    return result.data;
}
