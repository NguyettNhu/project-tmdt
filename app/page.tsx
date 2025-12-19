// app/page.tsx
import ProductCard from '@/components/ProductCard';
import { getProducts, mapApiProductToProduct, getImageUrl } from '@/lib/api';
import Link from 'next/link';

export default async function HomePage() {
  let featuredProducts: Array<{id: number; name: string; price: number; originalPrice?: number; image: string; featured?: boolean}> = [];
  
  try {
    const apiProducts = await getProducts();
    featuredProducts = apiProducts.slice(0, 8).map(p => ({
      ...mapApiProductToProduct(p),
      image: getImageUrl(p.avatar),
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Show empty state if API fails
  }

  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-br from-[#FFFBFD] via-white to-[#FFF5F9] py-24 lg:py-36 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-[#D9006C]/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-[#FF1A7A]/6 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-pink-100/30 to-transparent rounded-full"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-pink-50 to-rose-50 text-[#D9006C] text-sm font-semibold rounded-full mb-6 border border-pink-100">
              ✨ Bộ sưu tập mới 2025
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 tracking-tight leading-[1.1]">
              Modern Fashion
              <br />
              <span className="bg-linear-to-r from-[#D9006C] via-[#FF1A7A] to-[#FF6B9D] bg-clip-text text-transparent">
                Essentials
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Khám phá bộ sưu tập thời trang hiện đại với thiết kế tối giản, 
              chất liệu cao cấp và phong cách táo bạo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Khám phá ngay
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-[#D9006C] hover:text-[#D9006C] hover:shadow-lg transition-all duration-300"
              >
                Về chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#D9006C] text-sm font-semibold tracking-wider uppercase mb-3">
              Sản phẩm
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
              Nổi bật tuần này
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Những sản phẩm được yêu thích nhất, được chọn lọc kỹ càng cho phong cách của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-[#D9006C] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Xem tất cả sản phẩm
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(217,0,108,0.1)] hover:border-pink-100 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chất lượng cao</h3>
              <p className="text-gray-500 leading-relaxed">Chất liệu được chọn lọc kỹ càng, bền đẹp theo thời gian</p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(217,0,108,0.1)] hover:border-pink-100 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-[#FF1A7A] to-[#FF6B9D] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-400/20 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Giao hàng nhanh</h3>
              <p className="text-gray-500 leading-relaxed">Vận chuyển toàn quốc, giao hàng trong 2-3 ngày</p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(217,0,108,0.1)] hover:border-pink-100 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-[#FF6B9D] to-[#FFB3CC] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-300/20 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đổi trả dễ dàng</h3>
              <p className="text-gray-500 leading-relaxed">Chính sách đổi trả trong 30 ngày, miễn phí hoàn toàn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
