export type UserRole = 'buyer' | 'seller';

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
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

// Mock users data - DEPRECATED: Use API instead (lib/AuthContext.tsx)
// Keeping empty array for backward compatibility
export const mockUsers: User[] = [];

// Login function - DEPRECATED: Use useAuth() hook from lib/AuthContext.tsx
export function loginUser(email: string, password: string): User | null {
  console.warn('loginUser is deprecated. Use useAuth() hook from lib/AuthContext.tsx');
  return null;
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
