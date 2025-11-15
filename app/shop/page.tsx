import { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#D9006C] via-[#FF1A7A] to-[#FFC0E0] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            Cửa hàng
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Khám phá bộ sưu tập thời trang đa dạng của chúng tôi
          </p>
        </div>
      </section>

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9006C]"></div>
          </div>
        </div>
      }>
        <ShopContent />
      </Suspense>
    </div>
  );
}
