// Product Types - Use API instead of mock data
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  featured?: boolean;
  slug?: string;
  originalPrice?: number;
};

// Empty array - data will be fetched from API
export const products: Product[] = [];

// These functions now use API - import from lib/api.ts instead
export function getProductById(id: number): Product | null {
  console.warn('getProductById: Use API instead - import { getProductById } from "@/lib/api"');
  return null;
}

export function getAllProducts(): Product[] {
  console.warn('getAllProducts: Use API instead - import { getProducts } from "@/lib/api"');
  return [];
}

// Re-export API functions for convenience
export { 
  getProducts, 
  getProductById as getProductByIdFromApi,
  mapApiProductToProduct,
  getImageUrl 
} from './api';
