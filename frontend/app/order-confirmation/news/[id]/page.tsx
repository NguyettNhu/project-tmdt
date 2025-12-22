'use client';

import { usePost, usePosts } from '@/hooks/usePosts';
import { getImageUrl } from '@/lib/api';
import { ArrowLeft, BookmarkPlus, Calendar, ChevronRight, Clock, Facebook, Share2, Tag, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const params = useParams();
  const articleId = parseInt(params.id as string);

  const { post, loading, error } = usePost(articleId);
  const { posts: allPosts } = usePosts();

  const relatedArticles = allPosts.filter(p => p.id !== articleId).slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return '2 phút đọc';
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return `${Math.ceil(wordCount / 200)} phút đọc`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h1>
          <p className="text-gray-500 mb-6">Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
          <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(post.image, 'post');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-500">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/news" className="text-gray-500 hover:text-pink-500">Tin tức</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{post.name}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-pink-500" />
            <span className="text-pink-500 font-medium">Tin tức</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">S</div>
              <span className="font-medium text-gray-900">STYLA Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{estimateReadTime(post.content)}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          {imageUrl && imageUrl !== '/images/placeholder.jpg' ? (
            <Image src={imageUrl} alt={post.name} fill className="object-cover" sizes="800px" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-8xl">📰</span>
            </div>
          )}
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          <span className="text-gray-500 font-medium">Chia sẻ:</span>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-sky-400 text-white hover:bg-sky-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors ml-auto">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        {post.description && <p className="text-lg text-gray-600 mb-8 italic">{post.description}</p>}

        {/* Content */}
        {post.content ? (
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-pink-500 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:marker:text-pink-500" dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div className="prose prose-lg max-w-none"><p className="text-gray-600">{post.description}</p></div>
        )}

        {/* Tags */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-500 font-medium mr-2">Tags:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">Thời trang</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">Tin tức</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">STYLA</span>
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-8 p-6 bg-white rounded-2xl border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">S</div>
            <div>
              <h3 className="font-bold text-gray-900">STYLA Team</h3>
              <p className="text-gray-500 text-sm">Fashion Editor tại STYLA</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300">
                  <div className="relative h-32 bg-gradient-to-br from-gray-200 to-gray-300">
                    {item.image ? (
                      <Image src={getImageUrl(item.image, 'post')} alt={item.name} fill className="object-cover" sizes="300px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center"><span className="text-4xl text-gray-400">📄</span></div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-pink-500 font-medium">Tin tức</span>
                    <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-pink-500 transition-colors line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(item.created_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Quay lại trang tin tức
          </Link>
        </div>
      </article>
    </div>
  );
}
