'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = ['New Arrivals', 'Shop', 'About'];

  return (
    <header className="w-full bg-white border-b border-[#F0F0F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-2xl font-black tracking-tight text-[#1A1A1A]">
              STYLA
            </h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#1A1A1A] font-medium text-sm transition-colors duration-300 hover:text-[#D9006C]"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Icons - Auth, Cart & Search */}
          <div className="flex items-center gap-3">
            {/* Login & Register - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="/auth/login"
                className="text-[#1A1A1A] font-medium text-sm transition-colors duration-300 hover:text-[#D9006C]"
              >
                Đăng nhập
              </a>
              <a 
              href="/auth/register" 
              className=" text-white font-semibold text-sm transition-all duration-300 bg-[#D9006C] px-4 py-2 rounded-full hover:bg-[#b30056]">
                Đăng kí
              </a>

            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 ml-4 bg-[#FFF0F6] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    console.log('Search for:', searchQuery);
                  }
                }}
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
            <button
              className="p-2 hover:text-[#D9006C] transition-colors duration-300"
              aria-label="Shopping Cart"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    console.log('Search for:', searchQuery);
                  }
                }}
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
          <nav className="md:hidden pb-4 border-t border-[#F0F0F0]">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#1A1A1A] font-medium text-sm transition-colors duration-300 hover:text-[#D9006C]"
                >
                  {item}
                </a>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-[#F0F0F0] pt-4 mt-4">
                <a
                  href="/auth/login"
                  className="block text-[#1A1A1A] font-medium text-sm transition-colors duration-300 hover:text-[#D9006C] mb-3"
                >
                  Đăng nhập
                </a>
                <a href="/auth/register" className="w-full block text-center px-4 py-2 bg-[#D9006C] text-white font-semibold rounded-full text-sm transition-all duration-300 hover:bg-[#b30056]">
                  Đăng kí
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
