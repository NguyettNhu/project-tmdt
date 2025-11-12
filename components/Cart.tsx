"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function Cart() {
  const router = useRouter();
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Giỏ hàng đang trống.');
      return;
    }
    router.push('/shipping');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-black mb-6">Giỏ hàng</h2>

      {items.length === 0 ? (
        <div className="py-20 text-center bg-[#FFF0F6] rounded-lg">
          <p className="text-lg font-medium text-[#1A1A1A] mb-4">Giỏ hàng của bạn đang trống.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#D9006C] text-white rounded-full font-semibold">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-4 p-4 bg-white border border-[#F0F0F0] rounded-lg">
                  <div className="w-24 h-24 bg-[#FFF0F6] rounded-md overflow-hidden shrink-0">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{it.name}</h3>
                    <p className="text-sm text-[#1A1A1A]/70 mb-2">{formatCurrency(it.price)}</p>

                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-3 py-1 bg-[#F5F5F5] rounded text-sm" aria-label="Giảm">-</button>
                      <input
                        type="number"
                        value={it.qty}
                        onChange={(e) => updateQty(it.id, Number(e.target.value || 1))}
                        className="w-16 text-center border rounded px-2 py-1 text-sm"
                        min={1}
                      />
                      <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-3 py-1 bg-[#F5F5F5] rounded text-sm" aria-label="Tăng">+</button>

                      <button onClick={() => removeItem(it.id)} className="ml-4 text-sm text-[#D9006C] hover:underline">Xóa</button>
                    </div>
                  </div>

                  <div className="w-28 text-right font-semibold">{formatCurrency(it.price * it.qty)}</div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={clearCart} className="text-sm text-[#1A1A1A]/70 hover:underline">Xóa tất cả</button>
              <Link href="/" className="text-sm text-[#D9006C] hover:underline">Tiếp tục mua sắm</Link>
            </div>
          </div>

          <aside className="bg-white border border-[#F0F0F0] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#1A1A1A]/70">Tổng phụ</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>

            <div className="mb-4 text-sm text-[#1A1A1A]/70">Phí vận chuyển và thuế sẽ được tính khi thanh toán.</div>

            <button onClick={handleCheckout} className="w-full px-4 py-3 bg-[#D9006C] text-white font-semibold rounded-full hover:bg-[#b30056] transition-colors">
              Tiến hành thanh toán
            </button>
            <Link 
              href="/shop" 
              className="block w-full text-center px-4 py-3 mt-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#D9006C] hover:bg-[#FFF0F6] transition-all"
            >
              Tiếp tục mua sắm
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
