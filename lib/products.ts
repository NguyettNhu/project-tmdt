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
};

export const products: Product[] = [
  // T-Shirts & Tops
  {
    id: 1,
    name: 'Minimalist White T-Shirt',
    price: 89.99,
    image: '/images/product-1.svg',
    description: 'A clean, comfortable white tee made from premium cotton.',
    category: 'T-Shirts',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Bold Black Oversized Hoodie',
    price: 129.99,
    image: '/images/product-2.svg',
    description: 'Warm oversized hoodie with minimalist branding.',
    category: 'Hoodies',
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Classic Denim Jacket',
    price: 159.99,
    image: '/images/product-3.svg',
    description: 'Timeless denim jacket with durable stitching.',
    category: 'Jackets',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'Elegant Tailored Blazer',
    price: 199.99,
    image: '/images/product-4.svg',
    description: 'A tailored blazer for elevated everyday looks.',
    category: 'Blazers',
    colors: ['Black', 'Navy', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Premium Cotton Polo',
    price: 95.99,
    image: '/images/product-1.svg',
    description: 'Classic polo shirt with modern fit.',
    category: 'T-Shirts',
    colors: ['White', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 6,
    name: 'Striped Long Sleeve Tee',
    price: 79.99,
    image: '/images/product-1.svg',
    description: 'Casual striped tee perfect for layering.',
    category: 'T-Shirts',
    colors: ['Navy/White', 'Black/Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 7,
    name: 'Graphic Print T-Shirt',
    price: 69.99,
    image: '/images/product-1.svg',
    description: 'Bold graphic tee with artistic design.',
    category: 'T-Shirts',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 8,
    name: 'V-Neck Basic Tee',
    price: 59.99,
    image: '/images/product-1.svg',
    description: 'Essential v-neck in premium cotton.',
    category: 'T-Shirts',
    colors: ['White', 'Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  
  // Hoodies & Sweatshirts
  {
    id: 9,
    name: 'Zip-Up Hoodie',
    price: 139.99,
    image: '/images/product-2.svg',
    description: 'Comfortable zip-up with kangaroo pockets.',
    category: 'Hoodies',
    colors: ['Gray', 'Black', 'Navy'],
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 10,
    name: 'Crewneck Sweatshirt',
    price: 99.99,
    image: '/images/product-2.svg',
    description: 'Classic crewneck in soft fleece.',
    category: 'Hoodies',
    colors: ['Burgundy', 'Forest', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 11,
    name: 'Pullover Hoodie Premium',
    price: 149.99,
    image: '/images/product-2.svg',
    description: 'Premium quality pullover with logo detail.',
    category: 'Hoodies',
    colors: ['Black', 'White', 'Gray'],
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 12,
    name: 'Tech Fleece Hoodie',
    price: 179.99,
    image: '/images/product-2.svg',
    description: 'Modern tech fleece with sleek design.',
    category: 'Hoodies',
    colors: ['Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false
  },
  
  // Jackets & Outerwear
  {
    id: 13,
    name: 'Bomber Jacket',
    price: 189.99,
    image: '/images/product-3.svg',
    description: 'Classic bomber with modern details.',
    category: 'Jackets',
    colors: ['Black', 'Olive', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 14,
    name: 'Leather Jacket',
    price: 299.99,
    image: '/images/product-3.svg',
    description: 'Genuine leather with premium finish.',
    category: 'Jackets',
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 15,
    name: 'Windbreaker',
    price: 119.99,
    image: '/images/product-3.svg',
    description: 'Lightweight windbreaker for active lifestyle.',
    category: 'Jackets',
    colors: ['Navy', 'Black', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 16,
    name: 'Puffer Jacket',
    price: 229.99,
    image: '/images/product-3.svg',
    description: 'Warm puffer with water-resistant coating.',
    category: 'Jackets',
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 17,
    name: 'Trench Coat',
    price: 249.99,
    image: '/images/product-3.svg',
    description: 'Elegant trench coat for sophisticated style.',
    category: 'Jackets',
    colors: ['Beige', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false
  },
  
  // Blazers & Formal
  {
    id: 18,
    name: 'Double-Breasted Blazer',
    price: 219.99,
    image: '/images/product-4.svg',
    description: 'Sharp double-breasted design.',
    category: 'Blazers',
    colors: ['Navy', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 19,
    name: 'Casual Sport Coat',
    price: 189.99,
    image: '/images/product-4.svg',
    description: 'Versatile sport coat for smart casual.',
    category: 'Blazers',
    colors: ['Gray', 'Navy', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 20,
    name: 'Linen Blazer',
    price: 179.99,
    image: '/images/product-4.svg',
    description: 'Breathable linen blazer for summer.',
    category: 'Blazers',
    colors: ['Beige', 'White', 'Light Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  
  // Pants & Bottoms
  {
    id: 21,
    name: 'Slim Fit Chinos',
    price: 89.99,
    image: '/images/product-1.svg',
    description: 'Classic chinos with modern slim fit.',
    category: 'Pants',
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true
  },
  {
    id: 22,
    name: 'Straight Leg Jeans',
    price: 119.99,
    image: '/images/product-1.svg',
    description: 'Comfortable straight leg denim.',
    category: 'Pants',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true
  },
  {
    id: 23,
    name: 'Cargo Pants',
    price: 99.99,
    image: '/images/product-1.svg',
    description: 'Utility-inspired cargo with multiple pockets.',
    category: 'Pants',
    colors: ['Olive', 'Black', 'Beige'],
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true
  },
  {
    id: 24,
    name: 'Jogger Pants',
    price: 79.99,
    image: '/images/product-1.svg',
    description: 'Comfortable joggers for casual wear.',
    category: 'Pants',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 25,
    name: 'Dress Trousers',
    price: 129.99,
    image: '/images/product-1.svg',
    description: 'Tailored dress pants for formal occasions.',
    category: 'Pants',
    colors: ['Black', 'Navy', 'Charcoal'],
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true
  },
  
  // Shorts
  {
    id: 26,
    name: 'Casual Shorts',
    price: 59.99,
    image: '/images/product-1.svg',
    description: 'Comfortable shorts for everyday wear.',
    category: 'Shorts',
    colors: ['Khaki', 'Navy', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 27,
    name: 'Athletic Shorts',
    price: 49.99,
    image: '/images/product-1.svg',
    description: 'Performance shorts with moisture-wicking.',
    category: 'Shorts',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 28,
    name: 'Denim Shorts',
    price: 69.99,
    image: '/images/product-1.svg',
    description: 'Classic denim shorts in relaxed fit.',
    category: 'Shorts',
    colors: ['Blue', 'Black'],
    sizes: ['28', '30', '32', '34'],
    inStock: true
  },
  
  // Accessories
  {
    id: 29,
    name: 'Leather Belt',
    price: 39.99,
    image: '/images/product-1.svg',
    description: 'Genuine leather belt with metal buckle.',
    category: 'Accessories',
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L'],
    inStock: true
  },
  {
    id: 30,
    name: 'Canvas Tote Bag',
    price: 29.99,
    image: '/images/product-1.svg',
    description: 'Durable canvas tote for daily use.',
    category: 'Accessories',
    colors: ['Natural', 'Black', 'Navy'],
    inStock: true
  },
  {
    id: 31,
    name: 'Baseball Cap',
    price: 24.99,
    image: '/images/product-1.svg',
    description: 'Classic baseball cap with adjustable strap.',
    category: 'Accessories',
    colors: ['Black', 'Navy', 'White'],
    inStock: true
  },
  {
    id: 32,
    name: 'Beanie Hat',
    price: 19.99,
    image: '/images/product-1.svg',
    description: 'Cozy beanie for cold weather.',
    category: 'Accessories',
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true
  },
];

export function getProductById(id: number) {
  return products.find((p) => p.id === id) ?? null;
}

export function getAllProducts() {
  return products;
}
