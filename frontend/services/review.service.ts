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
    imageFiles?: File[];
}): Promise<ApiReview> {
    const token = getAdminToken(); // Or customer token if you have one
    // Note: In a real app, you'd use the customer's token. 
    // For now, assuming the API might accept it or we need to implement customer auth token storage.

    // Use FormData to upload files
    const formData = new FormData();
    formData.append('product_id', data.product_id.toString());
    formData.append('customer_id', data.customer_id.toString());
    formData.append('rating', data.rating.toString());
    if (data.title) {
        formData.append('title', data.title);
    }
    formData.append('comment', data.comment);
    
    // Append image files
    if (data.imageFiles && data.imageFiles.length > 0) {
        data.imageFiles.forEach((file) => {
            formData.append('images[]', file);
        });
    }

    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // Don't set Content-Type for FormData - browser will set it automatically with boundary
            // 'Authorization': `Bearer ${token}`, // Add if auth required
        },
        body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Không thể gửi đánh giá');
    }
    return result.data;
}
