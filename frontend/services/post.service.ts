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
