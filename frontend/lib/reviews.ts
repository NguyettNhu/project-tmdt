import { useCallback, useEffect, useState } from 'react';
import { createReview, getImageUrl, getReviews } from './api';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
  size?: string;
  color?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

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
      const mappedReviews = apiReviews.map(r => ({
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

// Calculate review statistics from review list
export function calculateReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingBreakdown = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return {
    averageRating,
    totalReviews: reviews.length,
    ratingBreakdown
  };
}

// Deprecated: Mock data
export const reviews: Review[] = [];
export function getReviewStats(productId: number): ReviewStats {
  return calculateReviewStats([]);
}
export function getProductReviews(productId: number): Review[] {
  return [];
}
