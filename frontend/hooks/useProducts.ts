'use client';

import { useCallback, useEffect, useState } from 'react';
import {
    getAdminProducts,
    getProductById,
    getProducts,
    getProductsByCategoryId,
    getProductsByCategorySlug,
    getProductsByCategoryType,
} from '../services/product.service';
import { ApiProduct } from '../types';
import { mapApiProductToProduct } from '../utils/product-utils';

// Public hook - only active products
export function useProducts() {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

// Hook to get products by category ID
export function useProductsByCategoryId(categoryId: number | null) {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        if (categoryId === null) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getProductsByCategoryId(categoryId);
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

// Hook to get products by category type (men, women, bags, etc.)
export function useProductsByCategoryType(categoryType: string | null) {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        if (!categoryType) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getProductsByCategoryType(categoryType);
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [categoryType]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

// Hook to get products by category slug
export function useProductsByCategorySlug(categorySlug: string | null) {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        if (!categorySlug) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getProductsByCategorySlug(categorySlug);
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [categorySlug]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

// Admin hook - all products including inactive
export function useAdminProducts() {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAdminProducts();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(id: number) {
    const [product, setProduct] = useState<ApiProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return { product, loading, error };
}

// ============= MAPPED PRODUCTS HOOK =============

export function useMappedProducts() {
    const { products, loading, error, refetch } = useProducts();

    const mappedProducts = products.map(mapApiProductToProduct);

    return { products: mappedProducts, loading, error, refetch };
}
