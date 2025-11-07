'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', { email, username, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="relative bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border-2 border-[#D9006C] shadow-2xl"
             style={{
               boxShadow: '0 0 60px rgba(217, 0, 108, 0.5), inset 0 0 60px rgba(217, 0, 108, 0.1)'
             }}>
          
          {/* Diagonal Design Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#D9006C] to-transparent opacity-20 transform skew-x-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 relative z-10">
            {/* Left Side - Register Form */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-black text-white mb-8 text-center lg:text-left">
                Sign Up
              </h2>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="flex text-white font-medium mb-3 gap-2 items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:border-[#D9006C] focus:outline-none transition-colors pb-2"
                    placeholder=""
                  />
                </div>

                {/* Username Field */}
                <div>
                  <label className="flex text-white font-medium mb-3 gap-2 items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:border-[#D9006C] focus:outline-none transition-colors pb-2"
                    placeholder=""
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="flex text-white font-medium mb-3 gap-2 items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                    </svg>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:border-[#D9006C] focus:outline-none transition-colors pb-2"
                    placeholder=""
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="flex text-white font-medium mb-3 gap-2 items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                    </svg>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:border-[#D9006C] focus:outline-none transition-colors pb-2"
                    placeholder=""
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full mt-8 bg-linear-to-r from-[#D9006C] to-[#b30056] text-white font-bold py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#D9006C]/50 active:scale-95"
                >
                  Sign Up
                </button>
              </form>

              {/* Links */}
              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-[#D9006C] font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Side - Welcome Message */}
            <div className="hidden lg:flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl font-black text-white mb-4">
                JOIN US!
              </h1>
              <p className="text-xl text-gray-300 font-light">
                Start your fashion journey today.
              </p>
              
              {/* Decorative Element */}
              <div className="mt-12">
                <div className="w-32 h-32 bg-linear-to-br from-[#D9006C] to-[#9d004a] rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
