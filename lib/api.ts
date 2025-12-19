// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper to get admin token from localStorage
function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

// Types for API responses
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Product types matching Laravel backend
export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  avatar: string | null;
  description: string | null;
  content: string | null;
  price: number;
  sale_price: number | null;
  sold: number;
  status: number;
  parent_id: number | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  category?: ApiCategory;
}

// Category types matching Laravel backend
export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  status: number;
  content: string | null;
  image: string | null;
  type: string | null;
  parent_id: number | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  children?: ApiCategory[];
}

// Post types matching Laravel backend
export interface ApiPost {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  parent_id: number | null;
  status: number;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

// Customer types matching Laravel backend
export interface ApiCustomer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

// Order types matching Laravel backend
export interface ApiOrder {
  id: number;
  order_code: string;
  customer_id: number | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  order_status: number; // 0:Chờ xác nhận, 1:Đã xác nhận, 2:Đang giao, 3:Hoàn thành, 4:Hủy
  payment_status: number; // 0:Chưa thanh toán, 1:Đã thanh toán, 2:Hoàn tiền
  payment_method: string | null;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total_money: number;
  note: string | null;
  cancel_note: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  items?: ApiOrderItem[];
}

export interface ApiOrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit & { requireAuth?: boolean }): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { requireAuth, ...fetchOptions } = options || {};
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...fetchOptions?.headers,
  };

  // Add admin token if required
  if (requireAuth) {
    const token = getAdminToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// ============= PRODUCTS API =============

// Public: only active products (status = 1)
export async function getProducts(): Promise<ApiProduct[]> {
  const response = await fetchApi<ApiResponse<ApiProduct[]>>('/products');
  return response.data;
}

// Get products by category ID
export async function getProductsByCategoryId(categoryId: number): Promise<ApiProduct[]> {
  const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_id=${categoryId}`);
  return response.data;
}

// Get products by category type (men, women, bags, etc.)
export async function getProductsByCategoryType(categoryType: string): Promise<ApiProduct[]> {
  const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_type=${categoryType}`);
  return response.data;
}

// Get products by category slug
export async function getProductsByCategorySlug(categorySlug: string): Promise<ApiProduct[]> {
  const response = await fetchApi<ApiResponse<ApiProduct[]>>(`/products?category_slug=${categorySlug}`);
  return response.data;
}

// Admin: all products including inactive
export async function getAdminProducts(): Promise<ApiProduct[]> {
  const response = await fetchApi<ApiResponse<ApiProduct[]>>('/admin/products', { requireAuth: true });
  return response.data;
}

export async function getProductById(id: number): Promise<ApiProduct | null> {
  try {
    const response = await fetchApi<ApiResponse<ApiProduct>>(`/products/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<ApiProduct | null> {
  try {
    const products = await getProducts();
    return products.find(p => p.slug === slug) || null;
  } catch {
    return null;
  }
}

// Admin Product CRUD
export async function createProduct(data: FormData): Promise<ApiProduct> {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Không thể tạo sản phẩm');
  }
  return result.data;
}

export async function updateProduct(id: number, data: FormData): Promise<ApiProduct> {
  const token = getAdminToken();
  // Laravel needs _method field for PUT with FormData
  data.append('_method', 'PUT');
  
  const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'POST', // Use POST with _method for FormData
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Không thể cập nhật sản phẩm');
  }
  return result.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await fetchApi(`/admin/products/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}

export async function toggleProductStatus(id: number, status: number): Promise<ApiProduct> {
  const data = new FormData();
  data.append('status', status.toString());
  return updateProduct(id, data);
}

// ============= CATEGORIES API =============

export async function getCategories(): Promise<ApiCategory[]> {
  const response = await fetchApi<ApiResponse<ApiCategory[]>>('/categories');
  return response.data;
}

export async function getCategoryById(id: number): Promise<ApiCategory | null> {
  try {
    const response = await fetchApi<ApiResponse<ApiCategory>>(`/categories/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

// ============= POSTS API =============

export async function getPosts(): Promise<ApiPost[]> {
  const response = await fetchApi<ApiResponse<ApiPost[]>>('/posts');
  return response.data;
}

export async function getPostById(id: number): Promise<ApiPost | null> {
  try {
    const response = await fetchApi<ApiResponse<ApiPost>>(`/posts/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

// ============= CUSTOMERS API (Admin) =============

export async function getCustomers(): Promise<ApiCustomer[]> {
  const response = await fetchApi<ApiResponse<ApiCustomer[]>>('/admin/customers', { requireAuth: true });
  return response.data;
}

export async function getCustomerById(id: number): Promise<ApiCustomer | null> {
  try {
    const response = await fetchApi<ApiResponse<ApiCustomer>>(`/admin/customers/${id}`, { requireAuth: true });
    return response.data;
  } catch {
    return null;
  }
}

// ============= ORDERS API (Admin) =============

export async function getOrders(): Promise<ApiOrder[]> {
  const response = await fetchApi<ApiResponse<ApiOrder[]>>('/admin/orders', { requireAuth: true });
  return response.data;
}

export async function getOrderById(id: number): Promise<ApiOrder | null> {
  try {
    const response = await fetchApi<ApiResponse<ApiOrder>>(`/admin/orders/${id}`, { requireAuth: true });
    return response.data;
  } catch {
    return null;
  }
}

// ============= HELPER FUNCTIONS =============

// Convert API product to frontend product format
export function mapApiProductToProduct(apiProduct: ApiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.sale_price || apiProduct.price,
    originalPrice: apiProduct.sale_price ? apiProduct.price : undefined,
    image: apiProduct.avatar || '/images/placeholder.jpg',
    description: apiProduct.description || '',
    category: apiProduct.category?.name || 'Uncategorized',
    inStock: apiProduct.status === 1,
    featured: apiProduct.sold > 10,
    slug: apiProduct.slug,
  };
}

// Get image URL with base path - handles multiple formats
export function getImageUrl(path: string | null | undefined, type: 'product' | 'category' | 'post' | 'customer' | 'user' = 'product'): string {
  // Default fallback - use existing product image
  const fallback = '/images/product-01.jpg';
  
  // Handle null, undefined, empty string
  if (!path || path === '' || path === 'null' || path === 'undefined') {
    return fallback;
  }
  
  // Already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Data URL (base64)
  if (path.startsWith('data:')) {
    return path;
  }
  
  // Local public path
  if (path.startsWith('/')) {
    return path;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
  
  // If path already includes 'uploads/' or 'storage/', use it directly
  if (path.includes('uploads/') || path.includes('storage/')) {
    // Remove leading storage/ if present
    const cleanPath = path.replace(/^storage\//, '');
    return `${baseUrl}/storage/${cleanPath}`;
  }
  
  // Otherwise, add the uploads/{type}/ prefix
  return `${baseUrl}/storage/uploads/${type}/${path}`;
}
