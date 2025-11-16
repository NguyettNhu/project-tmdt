export type UserRole = 'buyer' | 'seller';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  joinDate?: string;
}

// Mock users data
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'buyer1',
    email: 'buyer@example.com',
    password: '123456',
    role: 'buyer',
    fullName: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '0901234567',
    address: '123 Nguyễn Huệ',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    username: 'buyer2',
    email: 'khachhang@example.com',
    password: '123456',
    role: 'buyer',
    fullName: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '0912345678',
    address: '456 Lê Lợi',
    ward: 'Phường Bến Thành',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    joinDate: '2024-02-20'
  },
  {
    id: 3,
    username: 'seller1',
    email: 'seller@example.com',
    password: '123456',
    role: 'seller',
    fullName: 'Shop Thời Trang ABC',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '0923456789',
    address: '789 Trần Hưng Đạo',
    ward: 'Phường Cầu Kho',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    joinDate: '2023-12-01'
  },
  {
    id: 4,
    username: 'seller2',
    email: 'cuahang@example.com',
    password: '123456',
    role: 'seller',
    fullName: 'Cửa Hàng XYZ',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '0934567890',
    address: '321 Võ Văn Tần',
    ward: 'Phường 5',
    district: 'Quận 3',
    city: 'TP. Hồ Chí Minh',
    joinDate: '2023-11-10'
  }
];

// Login function
export function loginUser(email: string, password: string): User | null {
  const user = mockUsers.find(
    u => (u.email === email || u.username === email) && u.password === password
  );
  return user || null;
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

// Save user to localStorage
export function saveCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event('auth-change'));
}

// Logout
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event('auth-change'));
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

// Check if user has specific role
export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}
