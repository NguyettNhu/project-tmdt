'use client';

import React from 'react';
import { useCart } from './CartContext';
import { toast } from 'sonner';

type Props = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export default function AddToCartButton({ id, name, price, image }: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id, name, price, image });
    toast.success('Đã thêm vào giỏ hàng', {
      description: name,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full px-6 py-3 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      Thêm vào giỏ
    </button>
  );
}
