// app/page.tsx
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import Link from 'next/link';

export default function HomePage() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full gap-8 ">
    
      
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-br from-[#FFF0F6] via-white to-[#FFE8F4] py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#D9006C] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FF1A7A] rounded-full blur-3xl opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-gray-900 tracking-tight">
              Modern Fashion
              <br />
              <span className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
                Essentials
              </span>
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8 w-full mx-auto">
              Khám phá bộ sưu tập thời trang hiện đại với thiết kế tối giản táo bạo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Khám phá ngay
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#D9006C] font-bold rounded-full border-2 border-[#D9006C] hover:bg-[#D9006C] hover:text-white transition-all duration-300"
              >
                Về chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
          
          </div>

          <div className='p-4'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chất lượng cao</h3>
              <p className="text-gray-600">Chất liệu được chọn lọc kỹ càng, bền đẹp theo thời gian</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-[#FF1A7A] to-[#FFC0E0] rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Vận chuyển toàn quốc, giao hàng trong 2-3 ngày</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-[#FFC0E0] to-[#FFE8F4] rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[#D9006C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Đổi trả dễ dàng</h3>
              <p className="text-gray-600">Chính sách đổi trả trong 30 ngày, miễn phí hoàn toàn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}