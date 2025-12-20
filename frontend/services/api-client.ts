export const API_BASE_URL = (typeof window === 'undefined' && process.env.API_URL_INTERNAL)
    ? process.env.API_URL_INTERNAL
    : (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api');

// Helper to get admin token from localStorage
export function getAdminToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('adminToken');
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(endpoint: string, options?: RequestInit & { requireAuth?: boolean }): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const { requireAuth, ...fetchOptions } = options || {};

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...fetchOptions?.headers,
    };

    // Add admin token if required
    if (requireAuth) {
        const token = getAdminToken();
        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
        });

        if (!response.ok) {
            console.error(`API Error URL: ${url}`);
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        throw error;
    }
}
