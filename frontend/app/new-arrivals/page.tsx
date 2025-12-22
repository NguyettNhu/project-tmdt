'use client';

import { useProducts } from '@/hooks/useProducts';
import { getImageUrl, mapApiProductToProduct } from '@/lib/api';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FaBolt, FaClock, FaFilter, FaShoppingBag, FaSortAmountDown, FaStar } from 'react-icons/fa';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name' | 'popular';

export default function NewArrivalsPage() {
  const { products: apiProducts, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Convert API products to frontend format
  const products = useMemo(() => {
    return apiProducts.map(p => ({
      ...mapApiProductToProduct(p),
      image: getImageUrl(p.avatar),
      createdAt: p.created_at,
    }));
  }, [apiProducts]);

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
    { id: '0-1150000', label: 'Dưới 1,150,000đ', min: 0, max: 1150000 },
    { id: '1150000-2300000', label: '1,150,000đ - 2,300,000đ', min: 1150000, max: 2300000 },
    { id: '2300000-4600000', label: '2,300,000đ - 4,600,000đ', min: 2300000, max: 4600000 },
    { id: '4600000+', label: 'Trên 4,600,000đ', min: 4600000, max: Infinity }
  ], []);

  // Get new arrivals - products created in the last 30 days, sorted by newest
  const newArrivals = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products.map(product => {
      const createdDate = new Date(product.createdAt || Date.now());
      const isNew = createdDate >= thirtyDaysAgo;
      const timeDiff = Date.now() - createdDate.getTime();
      const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      return {
        ...product,
        isNew: isNew || product.id >= products.length - 12, // Fallback: last 12 products are "new"
        daysAgo: daysAgo < 30 ? daysAgo : null
      };
    }).filter(p => p.isNew).sort((a, b) => b.id - a.id);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...newArrivals];

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
        case 'newest':
          return b.id - a.id; // Higher ID = newer
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [newArrivals, selectedCategory, priceRange, searchQuery, sortBy, priceRanges]);

  const getTimeLabel = (daysAgo: number | null) => {
    if (!daysAgo) return 'MỚI';
    if (daysAgo === 0 || daysAgo === 1) return 'HÔM NAY';
    if (daysAgo === 2) return 'HÔM QUA';
    return `${daysAgo} NGÀY TRƯỚC`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366F1] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm mới...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <p className="text-gray-600">Vui lòng kiểm tra kết nối API</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50">

      {/* Hero Banner */}
      <div className="bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <FaBolt className="text-5xl md:text-6xl animate-pulse mr-4" />
              <h1 className="text-5xl md:text-7xl font-black">HÀNG MỚI VỀ</h1>
              <FaBolt className="text-5xl md:text-6xl animate-pulse ml-4" />
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-6">
              Khám Phá Những Sản Phẩm Mới Nhất - Xu Hướng 2025
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FaClock className="mr-2 text-2xl" />
                <span className="font-bold">Cập nhật hàng ngày!</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FaShoppingBag className="mr-2 text-2xl" />
                <span className="font-bold">{filteredAndSortedProducts.length} sản phẩm mới</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaBolt className="text-5xl text-indigo-600 mx-auto mb-3 animate-pulse" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              {newArrivals.length}
            </div>
            <div className="text-gray-600 font-medium">Sản phẩm mới</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaStar className="text-5xl text-yellow-500 mx-auto mb-3" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              100%
            </div>
            <div className="text-gray-600 font-medium">Chính hãng</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaClock className="text-5xl text-green-600 mx-auto mb-3" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              7 ngày
            </div>
            <div className="text-gray-600 font-medium">Cập nhật gần đây</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <FaFilter className="text-2xl text-indigo-600 mr-3" />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${selectedCategory === category
                        ? 'bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg'
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
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${priceRange === range.id
                        ? 'bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg'
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 font-medium"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
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
                Hiển thị <span className="font-bold text-indigo-600">{filteredAndSortedProducts.length}</span> sản phẩm mới
              </div>
              <div className="flex items-center space-x-2">
                <FaBolt className="text-yellow-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-600">
                  Cập nhật liên tục!
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
                  className="px-6 py-3 bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Xem tất cả hàng mới
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    {/* NEW Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-linear-to-r from-red-500 to-pink-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg animate-pulse">
                        {getTimeLabel(product.daysAgo)}
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-yellow-400 text-gray-800 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center">
                          <FaStar className="mr-1" />
                          HOT
                        </div>
                      </div>
                    )}

                    {/* Product Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            onClick={() => window.location.href = `/product/${product.id}`}
                            className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform"
                          >
                            Xem ngay
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>

                        {/* Price */}
                        <div className="text-2xl font-black text-indigo-600 mb-4">
                          ${product.price.toLocaleString('en-US')}
                        </div>

                        {/* Colors - Removed as API does not support colors yet */}

                        {/* Stock Status */}
                        {product.inStock !== undefined && (
                          <div className="mb-4">
                            {product.inStock ? (
                              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                <Check className="w-3 h-3" /> Còn hàng
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                <X className="w-3 h-3" /> Hết hàng
                              </span>
                            )}
                          </div>
                        )}

                        <button
                          onClick={() => window.location.href = `/product/${product.id}`}
                          className="w-full bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-linear-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <FaBolt className="text-6xl mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-black mb-4">LUÔN CẬP NHẬT XU HƯỚNG MỚI!</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto opacity-90">
            Đừng bỏ lỡ những sản phẩm thời trang mới nhất. Chúng tôi cập nhật liên tục để mang đến cho bạn những xu hướng hot nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Khám phá ngay
            </button>
            <a
              href="/shop"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
            >
              Xem tất cả sản phẩm
            </a>
            <a
              href="/sale"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
            >
              Xem sale
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
