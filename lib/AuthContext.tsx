'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  image: string | null;
  status: number;
}

interface AuthContextType {
  customer: Customer | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Customer>) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedCustomer = localStorage.getItem('customer');
    
    if (savedToken && savedCustomer) {
      setToken(savedToken);
      setCustomer(JSON.parse(savedCustomer));
    }
    setLoading(false);
  }, []);

  // Fetch current user on token change
  useEffect(() => {
    async function fetchMe() {
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomer(data.data);
          localStorage.setItem('customer', JSON.stringify(data.data));
        } else {
          // Token invalid, clear auth
          handleLogout();
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchMe();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setCustomer(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('customer');
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setToken(data.data.token);
        setCustomer(data.data.customer);
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('customer', JSON.stringify(data.data.customer));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setToken(data.data.token);
        setCustomer(data.data.customer);
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('customer', JSON.stringify(data.data.customer));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng ký thất bại' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    handleLogout();
  };

  const updateProfile = async (profileData: Partial<Customer>) => {
    if (!token) {
      return { success: false, message: 'Chưa đăng nhập' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setCustomer(data.data);
        localStorage.setItem('customer', JSON.stringify(data.data));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Cập nhật thất bại' };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  };

  const value: AuthContextType = {
    customer,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token && !!customer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
