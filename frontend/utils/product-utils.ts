import { ApiProduct } from '../types';

// Convert API product to frontend product format
export function mapApiProductToProduct(apiProduct: ApiProduct) {
    return {
        id: apiProduct.id,
        name: apiProduct.name,
        price: apiProduct.sale_price || apiProduct.price,
        originalPrice: apiProduct.sale_price ? apiProduct.price : undefined,
        image: apiProduct.avatar || '/images/placeholder.jpg',
        description: apiProduct.description || '',
        category: apiProduct.category?.name || 'Uncategorized',
        inStock: apiProduct.status === 1,
        featured: (apiProduct.sold || 0) > 10,
        slug: apiProduct.slug,
        rating: apiProduct.rating_avg || 0,
        reviewCount: apiProduct.rating_count || 0,
    };
}
