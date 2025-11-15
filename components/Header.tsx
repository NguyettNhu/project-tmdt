'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cửa hàng', href: '/shop' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Liên hệ', href: '/contact' }
  ];

  const { count } = useCart();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 group-hover:text-[#D9006C] transition-colors duration-200">
              STYLA
            </h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 font-medium text-sm hover:text-[#D9006C] transition-all duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D9006C] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
          
           
          </nav>

          {/* Icons - Auth, Cart & Search */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Login & Register - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/auth/login"
                className="text-gray-700 font-medium text-sm hover:text-[#D9006C] transition-colors duration-200"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/auth/register" 
                className="text-white font-semibold text-sm transition-all duration-200 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Đăng kí
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 ml-2 bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2.5 transition-colors duration-200 border border-gray-200">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-32 lg:w-40 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="p-1.5 hover:text-[#D9006C] transition-colors duration-200 text-gray-600"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:text-[#D9006C] transition-colors duration-300"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2.5 hover:bg-gray-50 rounded-full transition-all duration-200 text-gray-700 hover:text-[#D9006C] group"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">{count}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 hover:bg-gray-50 rounded-full transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 border-t border-[#F0F0F0]">
            <div className="flex items-center gap-2 bg-[#FFF0F6] rounded-full px-4 py-3 mt-4">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSearch}
                className="p-2 hover:text-[#D9006C] transition-colors duration-300"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 pt-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 font-medium text-base hover:bg-gray-50 hover:text-[#D9006C] rounded-lg transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-100 pt-4 mt-4 px-4 space-y-3">
                <Link
                  href="/auth/login"
                  className="block text-center py-3 text-gray-700 font-semibold border-2 border-gray-300 rounded-full hover:border-[#D9006C] hover:text-[#D9006C] transition-all duration-200"
                >
                  Đăng nhập
                </Link>
                <Link 
                  href="/auth/register" 
                  className="block text-center px-4 py-3 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  Đăng kí
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
