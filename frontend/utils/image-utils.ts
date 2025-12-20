// Get image URL with base path - handles multiple formats
export function getImageUrl(path: string | null | undefined, type: 'product' | 'category' | 'post' | 'customer' | 'user' = 'product'): string {
    // Default fallback - use existing product image
    const fallback = '/images/product-01.jpg';

    // Handle null, undefined, empty string
    if (!path || path === '' || path === 'null' || path === 'undefined') {
        return fallback;
    }

    // Already a full URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Data URL (base64)
    if (path.startsWith('data:')) {
        return path;
    }

    // Local public path
    if (path.startsWith('/')) {
        return path;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

    // If path already includes 'uploads/' or 'storage/', use it directly
    if (path.includes('uploads/') || path.includes('storage/')) {
        // Remove leading storage/ if present
        const cleanPath = path.replace(/^storage\//, '');
        return `${baseUrl}/storage/${cleanPath}`;
    }

    // Otherwise, add the uploads/{type}/ prefix
    return `${baseUrl}/storage/uploads/${type}/${path}`;
}
