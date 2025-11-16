'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  Bell, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: 'Tổng quan',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Quản lý Đơn hàng',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Quản lý Sản phẩm',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Quản lý Người dùng',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Quản lý Tương tác',
    href: '/admin/interactions',
    icon: MessageSquare,
  },
  {
    title: 'Quản lý Nội dung',
    href: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Cấu hình Website',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white text-gray-900 transition-all duration-300 flex flex-col border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-pink-600"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-pink-100 text-pink-600 font-medium'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && (
                  <span className="ml-3">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex-1"></div>
          
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => {
                if (pathname === '/admin') return item.href === '/admin';
                return item.href !== '/admin' && pathname.startsWith(item.href);
              })?.title || 'Admin Dashboard'}
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                <Avatar>
                  <AvatarImage src="/images/admin-avatar.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/admin/profile">Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/admin/settings">Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
