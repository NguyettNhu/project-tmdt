import Header from '@/components/Header';
import Cart from '@/components/Cart';

export default function CartPage() {
  return (
    <div className="w-full bg-white">
      <Header />

      <main className="py-12">
        <Cart />
      </main>
    </div>
  );
}
