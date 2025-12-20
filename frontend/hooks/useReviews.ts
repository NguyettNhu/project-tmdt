'use client';

import { useCallback, useEffect, useState } from 'react';
import { createReview, getReviews } from '../services/review.service';
import { Review } from '../types';
import { getImageUrl } from '../utils/image-utils';

// Hook to fetch reviews
export function useReviews(productId: number) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiReviews = await getReviews(productId);

            // Map API reviews to frontend format
            const mappedReviews: Review[] = apiReviews.map(r => ({
                id: r.id,
                productId: r.productId,
                userId: r.userId,
                userName: r.userName,
                userAvatar: getImageUrl(r.userAvatar, 'user'),
                rating: r.rating,
                title: r.title || '',
                comment: r.comment,
                images: r.images?.map(img => getImageUrl(img, 'product')) || [],
                verifiedPurchase: r.verifiedPurchase,
                helpful: r.helpful,
                createdAt: r.createdAt,
            }));

            setReviews(mappedReviews);
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            setError('Không thể tải đánh giá');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId, fetchReviews]);

    return { reviews, loading, error, refetch: fetchReviews };
}

// Hook to submit review
export function useSubmitReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitReview = async (data: {
        product_id: number;
        customer_id: number;
        rating: number;
        title?: string;
        comment: string;
        images?: string[];
    }) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createReview(data);
            return { success: true, data: result };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Gửi đánh giá thất bại';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return { submitReview, loading, error };
}
