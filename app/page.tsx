import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Minimalist White T-Shirt",
    price: 89.99,
    image: "https://via.placeholder.com/500x500/FFFFFF/D9006C?text=White+T-Shirt",
  },
  {
    id: 2,
    name: "Bold Black Oversized Hoodie",
    price: 129.99,
    image: "https://via.placeholder.com/500x500/1A1A1A/FFFFFF?text=Black+Hoodie",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 159.99,
    image: "https://via.placeholder.com/500x500/4A5568/FFFFFF?text=Denim+Jacket",
  },
  {
    id: 4,
    name: "Elegant Tailored Blazer",
    price: 199.99,
    image: "https://via.placeholder.com/500x500/2D3748/FFFFFF?text=Tailored+Blazer",
  },
];

export default function Home() {
  return (
        <div className="w-full bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-[#1A1A1A] tracking-tight">
                MODERN
                <br />
                ESSENTIALS
              </h1>

              <p className="text-lg sm:text-xl text-[#1A1A1A] mb-10 font-light leading-relaxed max-w-md">
                Discover our curated collection of timeless pieces designed for the modern minimalist. 
                Bold statement. Clean aesthetics.
              </p>

              <button className="inline-flex items-center justify-center px-8 py-4 bg-[#D9006C] text-white font-semibold rounded-full transition-all duration-300 hover:bg-[#b30056] active:scale-95 w-fit">
                Shop Now
              </button>
            </div>

            {/* Right Image */}
            <div className="relative h-96 sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg bg-linear-to-br from-[#D9006C] to-[#FFF0F6] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <p className="text-white font-bold text-lg">Modern Fashion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-28 lg:py-32 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-[#1A1A1A]/70 font-light">
              Hand-picked essentials for your wardrobe
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-16">
            <button className="px-10 py-4 bg-[#1A1A1A] text-white font-semibold rounded-full transition-all duration-300 hover:bg-[#D9006C]">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#FFF0F6] py-12 border-t border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">STYLA</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-light">
                Modern fashion for the minimalist soul.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wide">About</h4>
              <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#D9006C] transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#F0F0F0] pt-8 text-center text-sm text-[#1A1A1A]/60">
            <p>&copy; 2024 STYLA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
