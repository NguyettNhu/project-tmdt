'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { LogOut, User as UserIcon, Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { customer, isAuthenticated, logout } = useAuth();

    const navItems = [
        { label: 'Trang chủ', href: '/' },
        { label: 'Cửa hàng', href: '/shop' },
        { label: 'Tin tức', href: '/news' },
        { label: 'Về chúng tôi', href: '/about' },
        { label: 'Liên hệ', href: '/contact' }
    ];

    const { count } = useCart();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsUserMenuOpen(false);
        };
        if (isUserMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isUserMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
        router.push('/');
    };

    const handleSearch = useCallback(() => {
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    }, [searchQuery, router]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header 
            className={`w-full sticky top-0 z-50 transition-all duration-500 ease-out ${
                isScrolled 
                    ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/3 border-b border-gray-200/50' 
                    : 'bg-white border-b border-gray-100'
            }`}
        >
            {/* Top promotional bar */}
            <div className={`bg-linear-to-r from-[#D9006C] via-[#E91E8C] to-[#FF1A7A] text-white text-center py-2 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'opacity-100'}`}>
                <p>🎉 Miễn phí vận chuyển cho đơn hàng trên 500.000đ • Giảm 10% cho khách hàng mới</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="shrink-0 group relative">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 lg:w-11 lg:h-11 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/40 group-hover:scale-105 transition-all duration-300">
                                <span className="text-white font-black text-lg lg:text-xl">S</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl lg:text-2xl font-black tracking-tight bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-[#D9006C] group-hover:to-[#FF1A7A] transition-all duration-300">
                                    STYLA
                                </h1>
                            </div>
                        </div>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                                    isActiveLink(item.href)
                                        ? 'text-[#D9006C] bg-pink-50'
                                        : 'text-gray-600 hover:text-[#D9006C] hover:bg-pink-50/50'
                                }`}
                            >
                                {item.label}
                                {isActiveLink(item.href) && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D9006C] rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section - Search, Auth, Cart */}
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                        
                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex items-center">
                            <div className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                                isSearchOpen 
                                    ? 'w-64 bg-gray-100 px-4 py-2.5 ring-2 ring-[#D9006C]/20' 
                                    : 'w-10 h-10 bg-gray-100 hover:bg-gray-200 justify-center'
                            }`}>
                                {isSearchOpen && (
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                                        autoFocus
                                    />
                                )}
                                <button
                                    onClick={() => {
                                        if (isSearchOpen && searchQuery) {
                                            handleSearch();
                                        } else {
                                            setIsSearchOpen(!isSearchOpen);
                                        }
                                    }}
                                    className="p-1.5 text-gray-500 hover:text-[#D9006C] transition-colors duration-200"
                                    aria-label="Search"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Auth Section - Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                            {isAuthenticated && customer ? (
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsUserMenuOpen(!isUserMenuOpen);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border border-pink-100 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#D9006C] to-[#FF1A7A] flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">
                                                {customer.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                            {customer.name}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                                            </div>
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D9006C] transition-colors"
                                            >
                                                <UserIcon className="w-4 h-4" />
                                                Tài khoản của tôi
                                            </Link>
                                            <Link
                                                href="/profile?tab=orders"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D9006C] transition-colors"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                Đơn hàng
                                            </Link>
                                            <div className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#D9006C] transition-colors duration-200"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-2.5 text-gray-600 hover:text-[#D9006C] hover:bg-gray-100 rounded-full transition-all duration-200"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart Icon */}
                        <Link
                            href="/cart"
                            className="relative p-2.5 text-gray-600 hover:text-[#D9006C] hover:bg-pink-50 rounded-full transition-all duration-200 group"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-200" />
                            {mounted && count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg ring-2 ring-white">
                                    {count > 99 ? '99+' : count}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2.5 text-gray-600 hover:text-[#D9006C] hover:bg-gray-100 rounded-full transition-all duration-200"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
                    isSearchOpen ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0'
                }`}>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3 ring-2 ring-[#D9006C]/10">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                            autoFocus={isSearchOpen}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={!searchQuery.trim()}
                            className="px-4 py-1.5 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white text-sm font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                            Tìm
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
                    isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <nav className="pb-6 pt-2 border-t border-gray-100">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        isActiveLink(item.href)
                                            ? 'bg-pink-50 text-[#D9006C] font-semibold'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <span className={`w-2 h-2 rounded-full ${isActiveLink(item.href) ? 'bg-[#D9006C]' : 'bg-gray-300'}`}></span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Auth Section */}
                        <div className="border-t border-gray-100 pt-4 mt-4 px-4 space-y-3">
                            {isAuthenticated && customer ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-linear-to-r from-pink-50 to-purple-50 border border-pink-100"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#D9006C] to-[#FF1A7A] flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold">
                                                {customer.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-900 font-semibold text-sm truncate">{customer.name}</p>
                                            <p className="text-gray-500 text-xs truncate">{customer.email}</p>
                                        </div>
                                        <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 w-full py-3 text-red-600 font-semibold border-2 border-red-100 rounded-full hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="block text-center py-3 text-gray-700 font-semibold border-2 border-gray-200 rounded-full hover:border-[#D9006C] hover:text-[#D9006C] transition-all duration-200"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="block text-center px-4 py-3 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200"
                                    >
                                        Đăng ký miễn phí
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
