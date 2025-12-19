'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string | null;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Helper function to get saved data from localStorage
function getSavedAuth() {
  if (typeof window === 'undefined') return { token: null, admin: null };
  
  const savedToken = localStorage.getItem('adminToken');
  const savedAdmin = localStorage.getItem('adminUser');
  
  if (savedToken && savedAdmin) {
    try {
      return { token: savedToken, admin: JSON.parse(savedAdmin) };
    } catch {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  }
  return { token: null, admin: null };
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  // Initialize state with values from localStorage
  const [admin, setAdmin] = useState<AdminUser | null>(() => getSavedAuth().admin);
  const [token, setToken] = useState<string | null>(() => getSavedAuth().token);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }, []);

  // Verify token on mount
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/admin/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdmin(data.data);
          localStorage.setItem('adminUser', JSON.stringify(data.data));
        } else {
          // Token invalid, clear auth
          handleLogout();
        }
      } catch (error) {
        console.error('Failed to verify admin token:', error);
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token, handleLogout]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
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
        setAdmin(data.data.user);
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/admin/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error('Admin logout error:', error);
      }
    }
    handleLogout();
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!admin && !!token,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
