'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import { products } from '@/lib/products';
import { FaVenusMars, FaFilter, FaSortAmountDown, FaShoppingBag } from 'react-icons/fa';
import Image from 'next/image';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'newest';

export default function WomenCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'T-Shirts',
    'Hoodies',
    'Jackets',
    'Blazers',
    'Pants',
    'Shorts',
    'Accessories'
  ];

  const priceRanges = useMemo(() => [
    { id: 'all', label: 'Tất cả', min: 0, max: Infinity },
    { id: '0-50', label: 'Dưới $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { id: '200+', label: 'Trên $200', min: 200, max: Infinity }
  ], []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price < range.max);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, priceRange, searchQuery, sortBy, priceRanges]);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
   

      {/* Hero Banner */}
      <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <FaVenusMars className="text-5xl md:text-6xl mr-4" />
              <h1 className="text-5xl md:text-7xl font-black">THỜI TRANG NỮ</h1>
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-6">
              Khám Phá Phong Cách Thời Trang Hiện Đại & Thanh Lịch
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FaShoppingBag className="mr-2 text-2xl" />
                <span className="font-bold">{filteredAndSortedProducts.length} sản phẩm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Banner Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👗</div>
            <div className="text-sm font-semibold text-gray-700">Váy & Đầm</div>
            <div className="text-xs text-gray-500 mt-1">Thanh lịch</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👚</div>
            <div className="text-sm font-semibold text-gray-700">Áo & Tops</div>
            <div className="text-xs text-gray-500 mt-1">Trẻ trung</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👖</div>
            <div className="text-sm font-semibold text-gray-700">Quần & Jeans</div>
            <div className="text-xs text-gray-500 mt-1">Năng động</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👜</div>
            <div className="text-sm font-semibold text-gray-700">Phụ kiện</div>
            <div className="text-xs text-gray-500 mt-1">Hoàn thiện</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <FaFilter className="text-2xl text-[#D9006C] mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Bộ Lọc</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <input
                  type="text"
                  placeholder="Tên sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Danh mục
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium capitalize">
                        {category === 'all' ? 'Tất cả' : category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Khoảng giá
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        priceRange === range.id
                          ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <FaSortAmountDown className="inline mr-2" />
                  Sắp xếp theo
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-700 font-medium"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá thấp → cao</option>
                  <option value="price-high">Giá cao → thấp</option>
                  <option value="name">Tên A → Z</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'all' || priceRange !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setSearchQuery('');
                  }}
                  className="w-full mt-6 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
              <div className="text-gray-700 font-medium mb-2 sm:mb-0">
                Hiển thị <span className="font-bold text-[#D9006C]">{filteredAndSortedProducts.length}</span> sản phẩm
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-600">
                  Thời trang nữ cao cấp
                </span>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi bộ lọc hoặc tìm kiếm khác
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-yellow-400 text-gray-800 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                          HOT
                        </div>
                      </div>
                    )}

                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#D9006C] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
                      
                      {/* Price */}
                      <div className="text-2xl font-black text-[#D9006C] mb-4">
                        ${product.price.toLocaleString('en-US')}
                      </div>

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs text-gray-500">Màu:</span>
                          <div className="flex gap-1">
                            {product.colors.slice(0, 3).map((color, idx) => (
                              <div
                                key={idx}
                                className="w-5 h-5 rounded-full border-2 border-gray-200"
                                style={{
                                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                                 color.toLowerCase() === 'black' ? '#000000' :
                                                 color.toLowerCase() === 'gray' ? '#9CA3AF' :
                                                 color.toLowerCase() === 'navy' ? '#1E3A8A' :
                                                 color.toLowerCase() === 'red' ? '#DC2626' :
                                                 color.toLowerCase() === 'blue' ? '#3B82F6' : '#D1D5DB'
                                }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => window.location.href = `/product/${product.id}`}
                        className="w-full bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <div className="text-6xl mb-4">💎</div>
          <h2 className="text-4xl font-black mb-4">BỘ SƯU TẬP NỮ CAO CẤP</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto opacity-90">
            Khám phá những xu hướng thời trang mới nhất dành cho phái đẹp. Phong cách hiện đại, chất lượng cao cấp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-[#D9006C] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Khám phá ngay
            </button>
            <a
              href="/sale"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
            >
              Xem sản phẩm sale
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
