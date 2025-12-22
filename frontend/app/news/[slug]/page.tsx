'use client';

import { ApiPost, getImageUrl } from '@/lib/api';
import { getPostBySlug } from '@/services/post.service';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<ApiPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            if (!params.slug) return;

            try {
                const data = await getPostBySlug(params.slug as string);
                if (!data) {
                    router.push('/404');
                    return;
                }
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [params.slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="bg-white min-h-screen py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/news"
                    className="inline-flex items-center text-gray-500 hover:text-pink-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại tin tức
                </Link>

                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.name}
                    </h1>

                    <div className="flex items-center text-gray-500 text-sm border-b border-gray-100 pb-8">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.created_at).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </header>

                {post.image && (
                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={getImageUrl(post.image, 'post')}
                            alt={post.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-img:rounded-xl">
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                </div>
            </article>
        </div>
    );
}
