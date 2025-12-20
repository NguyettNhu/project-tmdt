import { Review, ReviewStats } from '../types';

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
