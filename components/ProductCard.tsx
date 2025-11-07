'use client';

import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <div className="group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden rounded-lg mb-4 bg-[#FFF0F6]">
        <div className="aspect-square w-full relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={id <= 2}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-base font-semibold text-[#D9006C]">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
