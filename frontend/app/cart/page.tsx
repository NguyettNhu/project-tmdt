import Header from '@/components/layout/Header';
import Cart from '@/components/features/cart/Cart';

export default function CartPage() {
  return (
    <div className="w-full bg-white">

      <main className="py-12">
        <Cart />
      </main>
    </div>
  );
}
