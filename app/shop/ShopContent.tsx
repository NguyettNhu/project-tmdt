'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/lib/hooks';
import { mapApiProductToProduct, getImageUrl } from '@/lib/api';
import { Home, Shirt, Layers, Wind, User, Scan, Square, Footprints, CircleUser, ShoppingBag, Heart, Sparkles } from 'lucide-react';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const { products: apiProducts, loading, error } = useProducts();
  const { categories: apiCategories } = useCategories();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 12;

  // Convert API products to frontend format
  const products = useMemo(() => {
    return apiProducts.map(p => ({
      ...mapApiProductToProduct(p),
      image: getImageUrl(p.avatar),
    }));
  }, [apiProducts]);

  // Set search query from URL params
  useEffect(() => {
    const updateSearchFromUrl = () => {
      const searchFromUrl = searchParams.get('search');
      if (searchFromUrl) {
        setSearchQuery(searchFromUrl);
      }
    };
    updateSearchFromUrl();
  }, [searchParams]);

  // Define category structure with icons
  const categoryStructure = [
    { name: 'All', label: 'All', IconComponent: Home },
    { name: 'T-Shirts', label: 'T-Shirts', IconComponent: Shirt },
    { name: 'Hoodies', label: 'Hoodies', IconComponent: Layers },
    { name: 'Jackets', label: 'Jackets', IconComponent: Wind },
    { name: 'Blazers', label: 'Blazers', IconComponent: User },
    { name: 'Pants', label: 'Pants', IconComponent: Scan },
    { name: 'Shorts', label: 'Shorts', IconComponent: Square },
    { name: 'Shoes', label: 'Shoes', IconComponent: Footprints },
    { name: 'Hats', label: 'Hats', IconComponent: CircleUser },
    { name: 'Bags', label: 'Bags', IconComponent: ShoppingBag },
    { name: 'Plushies', label: 'Plushies', IconComponent: Heart },
    { name: 'Accessories', label: 'Accessories', IconComponent: Sparkles },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    return categoryStructure.map(cat => cat.name);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = [...products].filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9006C]"></div>
          <span className="ml-4 text-gray-600">Đang tải sản phẩm...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <p className="text-gray-600">Vui lòng kiểm tra kết nối API backend (http://localhost:8000)</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Categories Filter - New Design */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Danh mục</h3>
                <div className="space-y-1">
                  {categoryStructure.map((category) => {
                    const IconComponent = category.IconComponent;
                    return (
                      <button
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          handleFilterChange();
                        }}
                        className={`w-full text-left px-6 py-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3 font-medium ${
                          selectedCategory === category.name
                            ? 'bg-[#D9006C] text-white shadow-lg scale-[1.02]'
                            : 'bg-transparent text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-base">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Khoảng giá</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      handleFilterChange();
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D9006C]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setPriceRange([0, 100]);
                        handleFilterChange();
                      }}
                      className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      &lt; $100
                    </button>
                    <button
                      onClick={() => {
                        setPriceRange([100, 200]);
                        handleFilterChange();
                      }}
                      className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      $100 - $200
                    </button>
                    <button
                      onClick={() => {
                        setPriceRange([200, 300]);
                        handleFilterChange();
                      }}
                      className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      &gt; $200
                    </button>
                    <button
                      onClick={() => {
                        setPriceRange([0, 300]);
                        handleFilterChange();
                      }}
                      className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Tất cả
                    </button>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 300]);
                  setSortBy('featured');
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 bg-[#D9006C] text-white font-semibold rounded-xl hover:bg-[#B80059] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Bộ lọc
                </button>

                {/* Search */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#D9006C] focus:outline-none transition-colors"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#D9006C] focus:outline-none transition-colors font-medium"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                  <option value="name">Tên: A-Z</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Danh mục</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryStructure.map((category) => {
                      const IconComponent = category.IconComponent;
                      return (
                        <button
                          key={category.name}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            handleFilterChange();
                          }}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 justify-center ${
                            selectedCategory === category.name
                              ? 'bg-[#D9006C] text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{category.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Khoảng giá</h3>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      handleFilterChange();
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D9006C]"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Hiển thị <span className="font-semibold text-gray-900">{paginatedProducts.length}</span> trong tổng số{' '}
                <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> sản phẩm
              </p>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange([0, 300]);
                  }}
                  className="px-6 py-3 bg-[#D9006C] text-white font-semibold rounded-xl hover:bg-[#B80059] transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-[#D9006C] hover:bg-[#FFF0F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-lg'
                          : 'border-2 border-gray-200 hover:border-[#D9006C] hover:bg-[#FFF0F6]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-[#D9006C] hover:bg-[#FFF0F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
