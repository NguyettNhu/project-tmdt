export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Minimalist White T-Shirt',
    price: 89.99,
    image: '/images/product-1.svg',
    description: 'A clean, comfortable white tee made from premium cotton.'
  },
  {
    id: 2,
    name: 'Bold Black Oversized Hoodie',
    price: 129.99,
    image: '/images/product-2.svg',
    description: 'Warm oversized hoodie with minimalist branding.'
  },
  {
    id: 3,
    name: 'Classic Denim Jacket',
    price: 159.99,
    image: '/images/product-3.svg',
    description: 'Timeless denim jacket with durable stitching.'
  },
  {
    id: 4,
    name: 'Elegant Tailored Blazer',
    price: 199.99,
    image: '/images/product-4.svg',
    description: 'A tailored blazer for elevated everyday looks.'
  },
];

export function getProductById(id: number) {
  return products.find((p) => p.id === id) ?? null;
}

export function getAllProducts() {
  return products;
}
