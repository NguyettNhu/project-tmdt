export const API_BASE_URL = (typeof window === 'undefined' && process.env.API_URL_INTERNAL)
    ? process.env.API_URL_INTERNAL
    : (process.env.NEXT_PUBLIC_API_URL || '/api');

// Helper to get admin token from localStorage
export function getAdminToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('adminToken');
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(endpoint: string, options?: RequestInit & { requireAuth?: boolean }): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const { requireAuth, ...fetchOptions } = options || {};

    const headers: Record<string, string> = {
        'Accept': 'application/json',
    };

    // Only set Content-Type to application/json if body is not FormData
    if (!(fetchOptions?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Merge custom headers
    if (fetchOptions?.headers) {
        Object.assign(headers, fetchOptions.headers);
    }

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
            cache: 'no-store',
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
