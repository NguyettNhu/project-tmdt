'use client';

import { useProducts } from '@/hooks/useProducts';
import { getImageUrl, mapApiProductToProduct } from '@/lib/api';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FaClock, FaFilter, FaFire, FaPercent, FaSortAmountDown, FaTag } from 'react-icons/fa';

type SortOption = 'discount' | 'price-low' | 'price-high' | 'name';

export default function SalePage() {
  const { products: apiProducts, loading, error } = useProducts();
  const [selectedDiscount, setSelectedDiscount] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('discount');
  const [searchQuery, setSearchQuery] = useState('');

  // Convert API products to frontend format
  const products = useMemo(() => {
    return apiProducts.map(p => ({
      ...mapApiProductToProduct(p),
      image: getImageUrl(p.avatar),
      apiSalePrice: p.sale_price,
      apiPrice: p.price,
    }));
  }, [apiProducts]);

  const discountRanges = useMemo(() => [
    { id: 'all', label: 'Tất cả', min: 0, max: 100 },
    { id: '30-40', label: '30-40%', min: 30, max: 40 },
    { id: '40-50', label: '40-50%', min: 40, max: 50 },
    { id: '50-60', label: '50-60%', min: 50, max: 60 },
    { id: '60+', label: '60% trở lên', min: 60, max: 100 }
  ], []);

  // Get products on sale - those with sale_price set
  const saleProducts = useMemo(() => {
    return products
      .filter(product => product.apiSalePrice && product.apiSalePrice < product.apiPrice)
      .map(product => {
        const originalPrice = product.apiPrice;
        const salePrice = product.apiSalePrice!;
        const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

        // Generate end date based on product id for consistency
        const daysUntilEnd = 1 + (product.id % 7);
        const saleEndDate = new Date();
        saleEndDate.setDate(saleEndDate.getDate() + daysUntilEnd);

        return {
          ...product,
          originalPrice,
          salePrice,
          discountPercent,
          saleEndDate
        };
      });
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = saleProducts;

    // Filter by discount range
    if (selectedDiscount !== 'all') {
      const range = discountRanges.find(r => r.id === selectedDiscount);
      if (range) {
        filtered = filtered.filter(
          p => p.discountPercent >= range.min && p.discountPercent <= range.max
        );
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
        case 'discount':
          return b.discountPercent - a.discountPercent;
        case 'price-low':
          return a.salePrice - b.salePrice;
        case 'price-high':
          return b.salePrice - a.salePrice;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [saleProducts, selectedDiscount, searchQuery, sortBy, discountRanges]);

  const countdownTimer = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return 'Đã kết thúc';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `Còn ${days} ngày`;
    return `Còn ${hours} giờ`;
  };

  const totalSavings = useMemo(() => {
    return filteredAndSortedProducts.reduce(
      (sum, p) => sum + (p.originalPrice - p.salePrice),
      0
    );
  }, [filteredAndSortedProducts]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9006C] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm sale...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <p className="text-gray-600">Vui lòng kiểm tra kết nối API</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaFire className="text-5xl md:text-6xl animate-pulse mr-4" />
              <h1 className="text-5xl md:text-7xl font-black">SALE KHỦNG</h1>
              <FaFire className="text-5xl md:text-6xl animate-pulse ml-4" />
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-6">
              GIẢM GIÁ ĐẾN 70% - SĂN NGAY KẺO LỠ!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FaClock className="mr-2 text-2xl" />
                <span className="font-bold">Thời gian có hạn!</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FaTag className="mr-2 text-2xl" />
                <span className="font-bold">{filteredAndSortedProducts.length} sản phẩm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaPercent className="text-5xl text-[#D9006C] mx-auto mb-3" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              {Math.max(...saleProducts.map(p => p.discountPercent))}%
            </div>
            <div className="text-gray-600 font-medium">Giảm giá tối đa</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaTag className="text-5xl text-[#D9006C] mx-auto mb-3" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              {saleProducts.length}
            </div>
            <div className="text-gray-600 font-medium">Sản phẩm giảm giá</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
            <FaFire className="text-5xl text-[#D9006C] mx-auto mb-3" />
            <div className="text-4xl font-black text-gray-800 mb-1">
              ${totalSavings.toLocaleString('en-US')}
            </div>
            <div className="text-gray-600 font-medium">Tổng tiết kiệm</div>
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

              {/* Discount Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mức giảm giá
                </label>
                <div className="space-y-2">
                  {discountRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedDiscount(range.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${selectedDiscount === range.id
                          ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{range.label}</span>
                        {selectedDiscount === range.id && (
                          <FaPercent className="text-sm" />
                        )}
                      </div>
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
                  <option value="discount">Giảm giá cao nhất</option>
                  <option value="price-low">Giá thấp → cao</option>
                  <option value="price-high">Giá cao → thấp</option>
                  <option value="name">Tên A → Z</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedDiscount !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDiscount('all');
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
                <FaFire className="text-[#D9006C] animate-pulse" />
                <span className="text-sm font-semibold text-gray-600">
                  Sale sốc - Số lượng có hạn!
                </span>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <FaTag className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi bộ lọc hoặc tìm kiếm khác
                </p>
                <button
                  onClick={() => {
                    setSelectedDiscount('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Xem tất cả sản phẩm sale
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-red-600 text-white font-black text-lg px-4 py-2 rounded-full shadow-lg transform -rotate-12 group-hover:scale-110 transition-transform">
                        -{product.discountPercent}%
                      </div>
                    </div>

                    {/* Hot Deal Badge */}
                    {product.discountPercent >= 60 && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-yellow-400 text-red-600 font-black text-sm px-3 py-1 rounded-full shadow-lg flex items-center animate-pulse">
                          <FaFire className="mr-1" />
                          HOT
                        </div>
                      </div>
                    )}

                    {/* Countdown Timer */}
                    <div className="absolute bottom-28 left-0 right-0 z-10 px-4">
                      <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-center">
                        <FaClock className="mr-2" />
                        {countdownTimer(product.saleEndDate)}
                      </div>
                    </div>

                    {/* Modified Product Card with Sale Price */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
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

                        <div className="space-y-2">
                          {/* Original Price */}
                          <div className="text-gray-400 line-through text-lg">
                            ${product.originalPrice.toLocaleString('en-US')}
                          </div>

                          {/* Sale Price */}
                          <div className="text-3xl font-black text-[#D9006C]">
                            ${product.salePrice.toLocaleString('en-US')}
                          </div>

                          {/* Savings */}
                          <div className="text-sm font-semibold text-green-600">
                            Tiết kiệm: ${(product.originalPrice - product.salePrice).toLocaleString('en-US')}
                          </div>
                        </div>

                        <button
                          onClick={() => window.location.href = `/product/${product.id}`}
                          className="w-full mt-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          Mua ngay
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
        <div className="mt-12 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <FaFire className="text-6xl mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-black mb-4">ĐỪNG BỎ LỠ!</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto opacity-90">
            Sale khủng - Giảm giá sốc lên đến 70%! Hàng ngàn sản phẩm đang chờ bạn với giá cực ưu đãi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-[#D9006C] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Xem sản phẩm sale
            </button>
            <a
              href="/shop"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
            >
              Khám phá cửa hàng
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
