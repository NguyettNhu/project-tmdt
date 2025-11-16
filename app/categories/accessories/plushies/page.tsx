'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';

export default function PlushiesPage() {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  // Filter plushies products
  const plushiesProducts = useMemo(() => {
    const filtered = products.filter(product => product.category === 'Plushies');

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [sortBy]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#EC4899] via-[#F472B6] to-[#FBCFE8] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại cửa hàng</span>
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              Gấu bông
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Bộ sưu tập gấu bông dễ thương đáng yêu
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{plushiesProducts.length}</span> sản phẩm
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'name')}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#EC4899] focus:outline-none transition-colors font-medium"
          >
            <option value="featured">Nổi bật</option>
            <option value="price-low">Giá: Thấp đến Cao</option>
            <option value="price-high">Giá: Cao đến Thấp</option>
            <option value="name">Tên: A-Z</option>
          </select>
        </div>

        {/* Products Grid */}
        {plushiesProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plushiesProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có sản phẩm</h3>
            <p className="text-gray-600 mb-6">Sản phẩm gấu bông sẽ sớm được cập nhật</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-[#EC4899] text-white font-semibold rounded-xl hover:bg-[#DB2777] transition-colors"
            >
              Về cửa hàng
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
