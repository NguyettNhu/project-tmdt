'use client';

import { Review } from '@/types';
import { getImageUrl } from '@/utils/image-utils';
import { CheckCircle, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const [helpful, setHelpful] = useState(review.helpful);
    const [hasVoted, setHasVoted] = useState(false);
    const [showAllImages, setShowAllImages] = useState(false);

    const handleHelpful = () => {
        if (!hasVoted) {
            setHelpful(helpful + 1);
            setHasVoted(true);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
            {/* User Info & Rating */}
            <div className="flex items-start gap-4 mb-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {review.userAvatar ? (
                        <Image
                            src={getImageUrl(review.userAvatar, 'user')}
                            alt={review.userName}
                            width={48}
                            height={48}
                            className="rounded-full"
                            unoptimized
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                            {review.userName.charAt(0)}
                        </div>
                    )}
                </div>

                {/* User Details */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        {review.verifiedPurchase && (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3" />
                                Đã mua hàng
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                    </div>

                    {/* Size & Color Info */}
                    {(review.size || review.color) && (
                        <div className="flex gap-3 text-sm text-gray-600 mb-2">
                            {review.size && <span>Size: <span className="font-medium">{review.size}</span></span>}
                            {review.color && <span>Màu: <span className="font-medium">{review.color}</span></span>}
                        </div>
                    )}
                </div>
            </div>

            {/* Review Content */}
            <div className="ml-16">
                {/* Title */}
                {review.title && (
                    <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                )}

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                    <div className="mb-4">
                        <div className="flex gap-2 flex-wrap">
                            {(showAllImages ? review.images : review.images.slice(0, 3)).map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <Image
                                        src={getImageUrl(image?.replace('uploads/product/', 'uploads/reviews/'), 'review')}
                                        alt={`Review image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                            {!showAllImages && review.images.length > 3 && (
                                <button
                                    onClick={() => setShowAllImages(true)}
                                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
                                >
                                    +{review.images.length - 3}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Helpful Button */}
                <button
                    onClick={handleHelpful}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors ${hasVoted
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-gray-500' : ''}`} />
                    <span>Hữu ích ({helpful})</span>
                </button>
            </div>
        </div>
    );
}
