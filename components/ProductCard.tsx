"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Giá gốc trước khi giảm (từ API)
  image: string;
}

const formatPrice = (value: number, currency: "USD" | "VND" = "VND") =>
  new Intl.NumberFormat(currency === "USD" ? "en-US" : "vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(value);

export default function ProductCard({ id, name, price, originalPrice, image }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  
  // Chỉ tính giảm giá khi có originalPrice thực từ API và originalPrice > price
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(217,0,108,0.12)] hover:border-pink-100 transition-all duration-500 ease-out hover:-translate-y-1">
      {/* Badge giảm giá */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#D9006C] to-[#FF1A7A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-pink-500/25">
          -{discount}%
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#D9006C] hover:text-white text-gray-400"
        aria-label="Thêm vào yêu thích"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Container ảnh */}
      <Link
        href={`/product/${id}`}
        className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden block"
        aria-label={`Xem chi tiết ${name}`}
      >
        <div className="relative w-full aspect-[4/5]">
          {!imgError ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
              priority={id <= 4}
              unoptimized={image.startsWith('http://localhost') || image.startsWith('http://127.0.0.1')}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-4xl">👕</span>
            </div>
          )}
          
          {/* Overlay gradient khi hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tên sản phẩm */}
        <Link 
          href={`/product/${id}`} 
          className="mb-3 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9006C]/30 rounded"
        >
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-[#D9006C] transition-colors duration-300 min-h-[2.8rem]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-amber-400 drop-shadow-sm' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">(128)</span>
        </div>

        {/* Giá */}
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="text-xl font-bold bg-gradient-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
            {formatPrice(price, "VND")}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-300 line-through font-medium">
              {formatPrice(originalPrice, "VND")}
            </span>
          )}
        </div>

        {/* Nút thêm vào giỏ - luôn ở cuối card */}
        <div className="mt-auto">
          <AddToCartButton id={id} name={name} price={price} image={image} />
        </div>
      </div>
    </article>
  );
}