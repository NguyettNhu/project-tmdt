'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Đăng nhập thành công!', {
          description: result.message,
        });
        router.push('/');
      } else {
        toast.error('Đăng nhập thất bại', {
          description: result.message,
        });
      }
    } catch {
      toast.error('Có lỗi xảy ra', {
        description: 'Vui lòng thử lại sau',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50">
          <div className="grid md:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-12 lg:p-20">
              {/* Header */}
              <div className="mb-10">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
                  Đăng nhập
                </h1>
                <p className="text-slate-400 text-xl max-w-lg">
                  Đăng nhập để tiếp tục mua sắm
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-6 h-6 text-slate-400 group-focus-within:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập email của bạn"
                      className="w-full pl-14 pr-4 py-5 bg-slate-800/60 border-2 border-slate-700/40 rounded-3xl text-white placeholder-slate-500 outline-none focus:border-purple-400 focus:bg-slate-800/80 transition-all duration-300 shadow-sm"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Mật khẩu
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-6 h-6 text-slate-400 group-focus-within:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      className="w-full pl-14 pr-16 py-5 bg-slate-800/60 border-2 border-slate-700/40 rounded-3xl text-white placeholder-slate-500 outline-none focus:border-purple-400 focus:bg-slate-800/80 transition-all duration-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
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
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded-sm border-2 border-slate-600 bg-slate-800 text-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="ml-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Quên mật khẩu?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-extrabold text-lg py-4 md:py-5 rounded-3xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang đăng nhập...
                    </span>
                  ) : 'Đăng nhập'}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-slate-400 mt-8">
                  Chưa có tài khoản?{' '}
                  <Link href="/auth/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Đăng ký ngay
                  </Link>
                </p>
              </form>
            </div>

            {/* Right side - Welcome Message */}
            <div className="hidden md:flex bg-linear-to-br from-purple-700 via-purple-600 to-pink-600 p-16 md:p-20 items-center justify-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 w-full">
                {/* Icon */}
                <div className="mb-10 text-center">
                  <div className="w-36 h-36 mx-auto bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                    Chào mừng trở lại!
                  </h2>
                  <p className="text-lg text-white/90 mb-8">
                    Đăng nhập để tiếp tục trải nghiệm mua sắm
                  </p>
                </div>
                
                {/* Info Box */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
                  <h3 className="text-white font-bold text-lg mb-4 text-center">🛍️ STYLA Fashion</h3>
                  
                  <div className="space-y-3 text-white/90 text-sm">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Hàng ngàn sản phẩm thời trang</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Giao hàng nhanh chóng</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Đổi trả dễ dàng trong 30 ngày</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {['Bảo mật an toàn', 'Thanh toán tiện lợi'].map((feature, index) => (
                    <div key={index} className="flex items-center justify-center gap-3 text-white/90">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
