"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const formatPrice = (value: number, currency: "USD" | "VND" = "USD") =>
  new Intl.NumberFormat(currency === "USD" ? "en-US" : "vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(value);

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const compareAt = price * 1.2;
  const discount = Math.round(((compareAt - price) / compareAt) * 100);

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100/50">
      {/* Badge giảm giá */}
      {discount > 0 && (
        <div className="absolute top-2.5 left-2.5 z-10 bg-[#D9006C] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
          -{discount}%
        </div>
      )}

      {/* Container ảnh */}
      <Link
        href={`/product/${id}`}
        className="relative w-full bg-gray-50 overflow-hidden block"
        aria-label={`Xem chi tiết ${name}`}
      >
        <div className="relative w-full aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={id <= 4}
          />
          
          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col flex-1 p-4">
        {/* Tên sản phẩm */}
        <Link 
          href={`/product/${id}`} 
          className="mb-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9006C]/30 rounded"
        >
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-[#D9006C] transition-colors duration-200 min-h-[2.6rem]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">(128)</span>
        </div>

        {/* Giá */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-[#D9006C]">
            {formatPrice(price, "USD")}
          </span>
          <span className="text-sm text-gray-400 line-through font-medium">
            {formatPrice(compareAt, "USD")}
          </span>
        </div>

        {/* Nút thêm vào giỏ - luôn ở cuối card */}
        <div className="mt-auto pt-2">
          <AddToCartButton id={id} name={name} price={price} image={image} />
        </div>
      </div>
    </article>
  );
}