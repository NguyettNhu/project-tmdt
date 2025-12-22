import { ApiPost, ApiResponse } from '../types';
import { fetchApi } from './api-client';

export async function getPosts(): Promise<ApiPost[]> {
    const response = await fetchApi<ApiResponse<ApiPost[]>>('/posts');
    return response.data;
}

export async function getPostById(id: number): Promise<ApiPost | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiPost>>(`/posts/${id}`);
        return response.data;
    } catch {
        return null;
    }
}

export async function getPostBySlug(slug: string): Promise<ApiPost | null> {
    try {
        const response = await fetchApi<ApiResponse<ApiPost>>(`/posts/${slug}`);
        return response.data;
    } catch {
        return null;
    }
}

export async function createPost(data: FormData): Promise<ApiPost> {
    const response = await fetchApi<ApiResponse<ApiPost>>('/admin/posts', {
        method: 'POST',
        body: data,
        requireAuth: true,
    });
    return response.data;
}

export async function updatePost(id: number, data: FormData): Promise<ApiPost> {
    // Laravel method spoofing for PUT with FormData
    data.append('_method', 'PUT');
    const response = await fetchApi<ApiResponse<ApiPost>>(`/admin/posts/${id}`, {
        method: 'POST',
        body: data,
        requireAuth: true,
    });
    return response.data;
}

export async function deletePost(id: number): Promise<void> {
    await fetchApi(`/admin/posts/${id}`, {
        method: 'DELETE',
        requireAuth: true,
    });
}
