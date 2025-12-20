'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getImageUrl } from '@/utils/image-utils';
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    FileText,
    FolderOpen,
    KeyRound,
    LayoutDashboard,
    Loader2,
    LogOut,
    MessageSquare,
    Package,
    Settings,
    ShoppingCart,
    User,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
        title: 'Quản lý Danh mục',
        href: '/admin/categories',
        icon: FolderOpen,
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
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string; image?: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = () => {
            const userStr = localStorage.getItem('adminUser');
            const token = localStorage.getItem('adminToken');

            if (!userStr || !token) {
                router.push('/admin/login');
                return;
            }

            try {
                const user = JSON.parse(userStr);
                setAdminUser(user);
            } catch {
                router.push('/admin/login');
                return;
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        // Xóa thông tin đăng nhập
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        // Chuyển hướng về trang login admin
        router.push('/admin/login');
    };

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-pink-500 mx-auto mb-4" />
                    <p className="text-gray-500">Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <LogOut className="w-5 h-5 text-red-500" />
                            Xác nhận đăng xuất
                        </DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Đăng xuất
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-20'
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
                                className={`flex items-center px-4 py-3 text-sm transition-colors ${isActive
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
                            <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none hover:bg-gray-50 rounded-lg p-2 transition-colors">
                                <Avatar className="border-2 border-pink-100">
                                    <AvatarImage src={getImageUrl(adminUser?.image, 'user')} />
                                    <AvatarFallback className="bg-linear-to-br from-pink-400 to-purple-500 text-white">
                                        {adminUser?.name?.charAt(0) || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-medium">{adminUser?.name || 'Admin'}</p>
                                    <p className="text-xs text-gray-500">
                                        {adminUser?.role === 'super_admin' ? 'Super Admin' : 'Manager'}
                                    </p>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-3 py-2">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={getImageUrl(adminUser?.image, 'user')} />
                                            <AvatarFallback className="bg-linear-to-br from-pink-400 to-purple-500 text-white">
                                                {adminUser?.name?.charAt(0) || 'A'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{adminUser?.name || 'Admin'}</p>
                                            <p className="text-xs text-gray-500 font-normal">{adminUser?.email || 'admin@styla.com'}</p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                                        <User className="w-4 h-4" />
                                        Hồ sơ cá nhân
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                                        <KeyRound className="w-4 h-4" />
                                        Đổi mật khẩu
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                                        <Settings className="w-4 h-4" />
                                        Cài đặt
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                                    onClick={() => setShowLogoutDialog(true)}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
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
