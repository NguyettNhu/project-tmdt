'use client';

import { Star, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReviewFormProps {
    productId: number;
    onSubmit?: (review: {
        rating: number;
        title: string;
        comment: string;
        images: string[];
        size?: string;
        color?: string;
    }) => void;
}

export default function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                await new Promise<void>((resolve) => {
                    reader.onload = (e) => {
                        if (e.target?.result) {
                            newImages.push(e.target.result as string);
                        }
                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            }
            setImages([...images, ...newImages].slice(0, 5)); // Max 5 images
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Vui lòng chọn số sao đánh giá');
            return;
        }

        if (comment.trim().length < 10) {
            toast.error('Vui lòng viết đánh giá ít nhất 10 ký tự');
            return;
        }

        setIsSubmitting(true);

        // Remove mock delay
        // await new Promise(resolve => setTimeout(resolve, 1000));

        const reviewData = {
            rating,
            title,
            comment,
            images,
            size: size || undefined,
            color: color || undefined,
        };

        if (onSubmit) {
            await onSubmit(reviewData);
        }

        // Show success message
        setShowSuccess(true);

        // Reset form
        setRating(0);
        setTitle('');
        setComment('');
        setSize('');
        setColor('');
        setImages([]);
        setIsSubmitting(false);

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const renderStars = () => {
        return (
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                    >
                        <Star
                            className={`w-8 h-8 ${star <= (hoverRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const getRatingText = (rating: number) => {
        switch (rating) {
            case 1: return 'Rất không hài lòng';
            case 2: return 'Không hài lòng';
            case 3: return 'Bình thường';
            case 4: return 'Hài lòng';
            case 5: return 'Rất hài lòng';
            default: return 'Chọn số sao';
        }
    };

    if (showSuccess) {
        return (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 fill-green-500 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cảm ơn bạn đã đánh giá!</h3>
                <p className="text-gray-600">Đánh giá của bạn đã được gửi thành công và sẽ được hiển thị sau khi được duyệt.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Viết đánh giá của bạn</h3>

            {/* Rating Selection */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Đánh giá của bạn <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                    {renderStars()}
                    <span className="text-sm font-medium text-gray-600">
                        {getRatingText(rating)}
                    </span>
                </div>
            </div>

            {/* Title */}
            <div className="mb-6">
                <label htmlFor="review-title" className="block text-sm font-semibold text-gray-900 mb-2">
                    Tiêu đề đánh giá
                </label>
                <input
                    id="review-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tóm tắt đánh giá của bạn..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    maxLength={100}
                />
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label htmlFor="review-comment" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nội dung đánh giá <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="review-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    maxLength={1000}
                    required
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                    {comment.length}/1000
                </div>
            </div>

            {/* Size & Color */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="review-size" className="block text-sm font-semibold text-gray-900 mb-2">
                        Size đã mua
                    </label>
                    <input
                        id="review-size"
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="VD: M, L, XL..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="review-color" className="block text-sm font-semibold text-gray-900 mb-2">
                        Màu sắc
                    </label>
                    <input
                        id="review-color"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="VD: Trắng, Đen..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Thêm hình ảnh (Tối đa 5 ảnh)
                </label>

                {images.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                                <Image
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {images.length < 5 && (
                    <label className="inline-flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Tải ảnh lên</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
                {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
                Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị công khai
            </p>
        </form>
    );
}
