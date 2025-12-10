'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

// Mock data cho tin tức
const newsArticles = [
  {
    id: 1,
    title: 'Xu hướng thời trang Xuân Hè 2025: Những gam màu pastel lên ngôi',
    excerpt: 'Khám phá những xu hướng thời trang hot nhất mùa Xuân Hè 2025 với sự trở lại mạnh mẽ của các gam màu pastel nhẹ nhàng, thanh lịch.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-1.jpg',
    category: 'Xu hướng',
    author: 'Nguyễn Thị Mai',
    date: '2025-03-15',
    readTime: '5 phút đọc',
    featured: true,
  },
  {
    id: 2,
    title: 'Cách phối đồ công sở thanh lịch cho phái đẹp',
    excerpt: 'Hướng dẫn chi tiết cách mix & match trang phục công sở vừa chuyên nghiệp vừa thời thượng cho các nàng công sở.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-2.jpg',
    category: 'Hướng dẫn',
    author: 'Trần Văn Hùng',
    date: '2025-03-12',
    readTime: '7 phút đọc',
    featured: true,
  },
  {
    id: 3,
    title: 'Top 10 phụ kiện không thể thiếu trong tủ đồ mùa hè',
    excerpt: 'Điểm danh những món phụ kiện must-have giúp bạn tỏa sáng trong mùa hè năm nay.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-3.jpg',
    category: 'Phụ kiện',
    author: 'Lê Thị Hương',
    date: '2025-03-10',
    readTime: '4 phút đọc',
    featured: false,
  },
  {
    id: 4,
    title: 'Bí quyết chọn size quần áo online không bao giờ sai',
    excerpt: 'Những mẹo hay giúp bạn chọn đúng size khi mua sắm online, tránh tình trạng đổi trả phiền phức.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-4.jpg',
    category: 'Mẹo hay',
    author: 'Phạm Minh Tuấn',
    date: '2025-03-08',
    readTime: '6 phút đọc',
    featured: false,
  },
  {
    id: 5,
    title: 'STYLA ra mắt BST mới: "Urban Chic" - Phong cách đô thị hiện đại',
    excerpt: 'Giới thiệu bộ sưu tập mới nhất của STYLA với những thiết kế mang đậm phong cách đô thị năng động.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-5.jpg',
    category: 'Bộ sưu tập',
    author: 'STYLA Team',
    date: '2025-03-05',
    readTime: '3 phút đọc',
    featured: true,
  },
  {
    id: 6,
    title: 'Chương trình khuyến mãi lớn nhất năm - Sale up to 50%',
    excerpt: 'Đừng bỏ lỡ cơ hội sở hữu những item thời trang yêu thích với mức giá siêu hấp dẫn.',
    content: 'Nội dung đầy đủ của bài viết...',
    image: '/images/news-6.jpg',
    category: 'Khuyến mãi',
    author: 'STYLA Team',
    date: '2025-03-01',
    readTime: '2 phút đọc',
    featured: false,
  },
];

const categories = ['Tất cả', 'Xu hướng', 'Hướng dẫn', 'Phụ kiện', 'Mẹo hay', 'Bộ sưu tập', 'Khuyến mãi'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = newsArticles.filter((article) => {
    const matchCategory = selectedCategory === 'Tất cả' || article.category === selectedCategory;
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin Tức & Blog</h1>
            <p className="text-lg md:text-xl text-pink-100 max-w-2xl mx-auto">
              Cập nhật những xu hướng thời trang mới nhất, mẹo phối đồ và tin tức từ STYLA
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'Tất cả' && searchQuery === '' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết nổi bật</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-6xl">📰</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full">
                        Nổi bật
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-pink-500" />
                      <span className="text-sm text-pink-500 font-medium">{article.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'Tất cả' ? 'Tất cả bài viết' : selectedCategory}
            </h2>
            <span className="text-gray-500">{filteredArticles.length} bài viết</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
              <p className="text-gray-500">Thử thay đổi từ khóa hoặc danh mục khác</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className="text-gray-400 text-5xl">📄</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-pink-500" />
                      <span className="text-sm text-pink-500 font-medium">{article.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <span className="text-pink-500 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                        Đọc thêm <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Đăng ký nhận tin mới nhất
            </h2>
            <p className="text-pink-100 mb-6">
              Nhận thông tin về xu hướng thời trang, khuyến mãi và bài viết mới nhất từ STYLA
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-pink-500 font-semibold rounded-full hover:bg-pink-50 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
