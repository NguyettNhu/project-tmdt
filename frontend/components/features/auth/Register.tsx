'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    agreeToTerms: boolean;
}

const Register: React.FC = () => {
    const router = useRouter();
    const { register, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Clear error when user starts typing
        if (errors[name as keyof RegisterFormData]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        // Confirm password validation
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Mật khẩu không khớp';
        }

        // Terms validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Vui lòng đồng ý với điều khoản';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                phone: formData.phone || undefined,
            });

            if (result.success) {
                toast.success('Đăng ký thành công!', {
                    description: result.message,
                });
                router.push('/');
            } else {
                toast.error('Đăng ký thất bại', {
                    description: result.message,
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Có lỗi xảy ra', {
                description: 'Vui lòng thử lại sau',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg mx-auto">
                <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-2">
                            Đăng ký
                        </h1>
                        <p className="text-slate-400">
                            Tạo tài khoản để bắt đầu mua sắm
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Họ tên <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ tên của bạn"
                                className={`w-full px-4 py-4 bg-slate-800/60 border-2 ${errors.name ? 'border-red-500' : 'border-slate-700/40'} rounded-2xl text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-all duration-300`}
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className={`w-full px-4 py-4 bg-slate-800/60 border-2 ${errors.email ? 'border-red-500' : 'border-slate-700/40'} rounded-2xl text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-all duration-300`}
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0912345678"
                                className="w-full px-4 py-4 bg-slate-800/60 border-2 border-slate-700/40 rounded-2xl text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-all duration-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Mật khẩu <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Ít nhất 6 ký tự"
                                    className={`w-full px-4 py-4 pr-12 bg-slate-800/60 border-2 ${errors.password ? 'border-red-500' : 'border-slate-700/40'} rounded-2xl text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Xác nhận mật khẩu <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Nhập lại mật khẩu"
                                    className={`w-full px-4 py-4 pr-12 bg-slate-800/60 border-2 ${errors.password_confirmation ? 'border-red-500' : 'border-slate-700/40'} rounded-2xl text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && <p className="text-red-400 text-sm mt-1">{errors.password_confirmation}</p>}
                        </div>

                        {/* Terms Checkbox */}
                        <div>
                            <label className="flex items-start cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="w-5 h-5 mt-0.5 rounded border-2 border-slate-600 bg-slate-800 text-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                                />
                                <span className="ml-3 text-slate-400 text-sm">
                                    Tôi đồng ý với{' '}
                                    <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                                        Điều khoản dịch vụ
                                    </Link>{' '}
                                    và{' '}
                                    <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                                        Chính sách bảo mật
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-extrabold text-lg py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng ký...
                                </span>
                            ) : 'Đăng ký'}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-slate-400">
                            Đã có tài khoản?{' '}
                            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
