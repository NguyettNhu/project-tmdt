'use client';

import { ApiPost, getImageUrl } from '@/lib/api';
import { getPosts } from '@/services/post.service';
import { Calendar, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NewsPage() {
    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getPosts();
                // Filter only active posts
                setPosts(data.filter(post => post.status === 1));
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        Tin tức & Sự kiện
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Cập nhật những thông tin mới nhất về sản phẩm, khuyến mãi và xu hướng thời trang.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Chưa có bài viết nào.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/news/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    {post.image ? (
                                        <img
                                            src={getImageUrl(post.image, 'post')}
                                            alt={post.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <span className="text-4xl">📰</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                        {post.name}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center text-pink-600 font-medium mt-auto group-hover:translate-x-2 transition-transform duration-300">
                                        Xem chi tiết
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
