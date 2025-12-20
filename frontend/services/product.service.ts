import { ApiProduct, ApiResponse } from '../types';
import { API_BASE_URL, fetchApi, getAdminToken } from './api-client';

// Public: only active products (status = 1)
export async function getProducts(): Promise<ApiProduct[]> {
    const response = await fetchApi<ApiResponse<ApiProduct[]>>('/products');
    return response.data;
}

// Get products by category ID
export async function getProductsByCategoryId(categoryId: number): Promise<ApiProduct[]> {
    const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_id=${categoryId}`);
    return response.data;
}

// Get products by category type (men, women, bags, etc.)
export async function getProductsByCategoryType(categoryType: string): Promise<ApiProduct[]> {
    const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_type=${categoryType}`);
    return response.data;
}

// Get products by category slug
export async function getProductsByCategorySlug(categorySlug: string): Promise<ApiProduct[]> {
    const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_slug=${categorySlug}`);
    return response.data;
}

// Admin: all products including inactive
export async function getAdminProducts(): Promise<ApiProduct[]> {
    const response = await fetchApi<ApiResponse<ApiProduct[]>>('/admin/products', { requireAuth: true });
    return response.data;
}

export async function getProductById(id: number): Promise<ApiProduct | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiProduct>>(`/products/${id}`);
        return response.data;
    } catch {
        return null;
    }
}

export async function getProductBySlug(slug: string): Promise<ApiProduct | null> {
    try {
        const products = await getProducts();
        return products.find(p => p.slug === slug) || null;
    } catch {
        return null;
    }
}

// Admin Product CRUD
export async function createProduct(data: FormData): Promise<ApiProduct> {
    const token = getAdminToken();
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: data,
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Không thể tạo sản phẩm');
    }
    return result.data;
}

export async function updateProduct(id: number, data: FormData): Promise<ApiProduct> {
    const token = getAdminToken();
    // Laravel needs _method field for PUT with FormData
    data.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'POST', // Use POST with _method for FormData
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: data,
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Không thể cập nhật sản phẩm');
    }
    return result.data;
}

export async function deleteProduct(id: number): Promise<void> {
    const token = getAdminToken();
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Không thể xóa sản phẩm');
    }
}

export async function toggleProductStatus(id: number, status: number): Promise<ApiProduct> {
    const data = new FormData();
    data.append('status', status.toString());
    return updateProduct(id, data);
}
