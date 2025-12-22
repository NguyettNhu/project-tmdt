'use client';

import ReviewForm from '@/components/features/reviews/ReviewForm';
import { useReviews, useSubmitReview } from '@/hooks/useReviews';
import { calculateReviewStats } from '@/utils/review-utils';
import { ChevronDown, MessageSquare, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import ReviewCard from './ReviewCard';

interface ReviewSectionProps {
    productId: number;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
    const { reviews, loading, error, refetch } = useReviews(productId);
    const { submitReview } = useSubmitReview();

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent');
    const [visibleReviews, setVisibleReviews] = useState(5);

    const stats = useMemo(() => calculateReviewStats(reviews), [reviews]);

    // Filter and sort reviews
    const filteredAndSortedReviews = useMemo(() => {
        let filtered = [...reviews];

        // Filter by rating
        if (filterRating !== 'all') {
            filtered = filtered.filter(r => r.rating === filterRating);
        }

        // Sort reviews
        switch (sortBy) {
            case 'helpful':
                filtered.sort((a, b) => b.helpful - a.helpful);
                break;
            case 'highest':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                filtered.sort((a, b) => a.rating - b.rating);
                break;
            case 'recent':
            default:
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return filtered;
    }, [reviews, filterRating, sortBy]);

    const displayedReviews = filteredAndSortedReviews.slice(0, visibleReviews);
    const hasMoreReviews = filteredAndSortedReviews.length > visibleReviews;

    const handleSubmitReview = async (data: any) => {
        // Assuming data comes from ReviewForm matching API expectation
        // We need to add customer_id here or in the form
        // For now, let's assume we have a hardcoded customer_id for demo if not logged in
        // or useAuth context

        // Mock customer ID for now if not provided
        const reviewData = {
            rating: data.rating,
            title: data.title,
            comment: data.comment,
            imageFiles: data.imageFiles,  // Pass file objects for upload
            product_id: productId,
            customer_id: 1, // Replace with actual user ID from auth context
        };

        const result = await submitReview(reviewData);
        if (result.success) {
            setShowReviewForm(false);
            refetch();
        } else {
            alert(result.message);
        }
    };

    const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
        const sizeClasses = {
            sm: 'w-3 h-3',
            md: 'w-4 h-4',
            lg: 'w-5 h-5'
        };

        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${sizeClasses[size]} ${star <= Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : star <= rating
                                ? 'fill-yellow-200 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const renderRatingBar = (stars: number, count: number) => {
        const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
        const isActive = filterRating === stars;

        return (
            <button
                onClick={() => setFilterRating(isActive ? 'all' : stars)}
                className={`flex items-center gap-3 w-full py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-purple-50 border-2 border-purple-500' : 'hover:bg-gray-50'
                    }`}
            >
                <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-gray-900">{stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-yellow-400 h-full rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
                <span className="text-sm font-medium text-gray-600 w-12 text-right">{count}</span>
            </button>
        );
    };

    if (loading) return <div className="py-10 text-center">Đang tải đánh giá...</div>;
    if (error) return <div className="py-10 text-center text-red-500">{error}</div>;

    return (
        <div className="w-full">
            {/* Reviews Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá sản phẩm</h2>
                <p className="text-gray-600">Xem đánh giá từ khách hàng đã mua sản phẩm này</p>
            </div>

            {stats.totalReviews > 0 ? (
                <>
                    {/* Rating Overview */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Overall Rating */}
                        <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                            <div className="text-center">
                                <div className="text-6xl font-black text-gray-900 mb-2">
                                    {stats.averageRating.toFixed(1)}
                                </div>
                                <div className="flex justify-center mb-3">
                                    {renderStars(stats.averageRating, 'lg')}
                                </div>
                                <p className="text-gray-600 font-medium">
                                    Dựa trên <span className="font-bold text-gray-900">{stats.totalReviews}</span> đánh giá
                                </p>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Thống kê đánh giá</h3>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((stars) => (
                                    <div key={stars}>
                                        {renderRatingBar(stars, stats.ratingBreakdown[stars as keyof typeof stats.ratingBreakdown])}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Write Review Button */}
                    <div className="mb-8">
                        {!showReviewForm && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <MessageSquare className="w-5 h-5" />
                                Viết đánh giá của bạn
                            </button>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="mb-8">
                            <ReviewForm
                                productId={productId}
                                onSubmit={handleSubmitReview}
                            />
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="mt-4 text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Hủy
                            </button>
                        </div>
                    )}

                    {/* Filter & Sort */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                                {filteredAndSortedReviews.length} đánh giá
                            </span>
                            {filterRating !== 'all' && (
                                <button
                                    onClick={() => setFilterRating('all')}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    (Xóa bộ lọc)
                                </button>
                            )}
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful' | 'highest' | 'lowest')}
                            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors font-medium text-sm"
                        >
                            <option value="recent">Mới nhất</option>
                            <option value="helpful">Hữu ích nhất</option>
                            <option value="highest">Đánh giá cao nhất</option>
                            <option value="lowest">Đánh giá thấp nhất</option>
                        </select>
                    </div>

                    {/* Reviews List */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                        {displayedReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMoreReviews && (
                        <div className="text-center">
                            <button
                                onClick={() => setVisibleReviews(prev => prev + 5)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Xem thêm đánh giá
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* No Reviews Yet */}
                    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-12 text-center border border-purple-100 mb-8">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <MessageSquare className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Chưa có đánh giá nào
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Hãy là người đầu tiên đánh giá sản phẩm này!
                        </p>
                        {!showReviewForm && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Viết đánh giá đầu tiên
                            </button>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div>
                            <ReviewForm
                                productId={productId}
                                onSubmit={handleSubmitReview}
                            />
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="mt-4 text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
