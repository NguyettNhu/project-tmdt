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
    image: '/images/product-01.jpg',
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
    image: '/images/product-02.jpg',
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
    image: '/images/product-03.jpg',
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
    image: '/images/product-04.jpg',
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
    image: '/images/product-05.jpg',
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
    image: '/images/product-06.jpg',
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
    image: '/images/product-07.jpg',
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
    image: '/images/product-01.jpg',
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
    image: '/images/product-08.jpg',
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
    image: '/images/product-09.jpg',
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
    image: '/images/product-10.jpg',
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
    image: '/images/product-11.jpg',
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
    image: '/images/product-12.jpg',
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
    image: '/images/product-12.jpg',
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
    image: '/images/product-13.jpg',
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
    image: '/images/product-14.jpg',
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
    image: '/images/product-15.jpg',
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
    image: '/images/product-16.jpg',
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
    image: '/images/product-16.jpg',
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
    image: '/images/product-17.jpg',
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
    image: '/images/product-18.jpg',
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
    image: '/images/product-19.jpg',
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
    image: '/images/product-18.jpg',
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
    image: '/images/product-20.jpg',
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
    image: '/images/product-18.jpg',
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
    image: '/images/product-21.jpg',
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
    image: '/images/product-21.jpg',
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
    image: '/images/product-22.jpg',
    description: 'Classic denim shorts in relaxed fit.',
    category: 'Shorts',
    colors: ['Blue', 'Black'],
    sizes: ['28', '30', '32', '34'],
    inStock: true
  },
  
  // Shoes - Giày dép
  {
    id: 29,
    name: 'Classic White Sneakers',
    price: 89.99,
    image: '/images/product-23.jpg',
    description: 'Versatile white sneakers perfect for everyday wear.',
    category: 'Shoes',
    colors: ['White', 'Off-White'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true,
    featured: true
  },
  {
    id: 30,
    name: 'Running Shoes Sport',
    price: 119.99,
    image: '/images/product-24.jpg',
    description: 'Lightweight running shoes with cushioned sole.',
    category: 'Shoes',
    colors: ['Black', 'Blue', 'Red'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: 31,
    name: 'Leather Loafers',
    price: 129.99,
    image: '/images/product-25.jpg',
    description: 'Elegant leather loafers for formal occasions.',
    category: 'Shoes',
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: 32,
    name: 'Canvas Slip-On',
    price: 59.99,
    image: '/images/product-25.jpg',
    description: 'Casual slip-on shoes for relaxed style.',
    category: 'Shoes',
    colors: ['Navy', 'Gray', 'Black'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true
  },
  {
    id: 33,
    name: 'High-Top Sneakers',
    price: 99.99,
    image: '/images/product-26.jpg',
    description: 'Trendy high-top sneakers with ankle support.',
    category: 'Shoes',
    colors: ['Black', 'White', 'Red'],
    sizes: ['38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: 34,
    name: 'Chelsea Boots',
    price: 159.99,
    image: '/images/product-23.jpg',
    description: 'Classic Chelsea boots in premium leather.',
    category: 'Shoes',
    colors: ['Black', 'Brown'],
    sizes: ['39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: 35,
    name: 'Sandals Summer',
    price: 49.99,
    image: '/images/product-24.jpg',
    description: 'Comfortable sandals for summer days.',
    category: 'Shoes',
    colors: ['Brown', 'Black', 'Tan'],
    sizes: ['38', '39', '40', '41', '42'],
    inStock: true
  },
  
  // Hats - Mũ
  {
    id: 36,
    name: 'Baseball Cap Classic',
    price: 24.99,
    image: '/images/product-27.jpg',
    description: 'Classic baseball cap with adjustable strap.',
    category: 'Hats',
    colors: ['Black', 'Navy', 'White', 'Red'],
    inStock: true,
    featured: true
  },
  {
    id: 37,
    name: 'Beanie Winter',
    price: 19.99,
    image: '/images/product-28.jpg',
    description: 'Cozy beanie for cold weather.',
    category: 'Hats',
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    inStock: true
  },
  {
    id: 38,
    name: 'Bucket Hat',
    price: 29.99,
    image: '/images/product-27.jpg',
    description: 'Trendy bucket hat for sun protection.',
    category: 'Hats',
    colors: ['Khaki', 'Black', 'White'],
    inStock: true
  },
  {
    id: 39,
    name: 'Snapback Cap',
    price: 27.99,
    image: '/images/product-27.jpg',
    description: 'Urban style snapback with flat brim.',
    category: 'Hats',
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true
  },
  {
    id: 40,
    name: 'Fedora Hat',
    price: 39.99,
    image: '/images/product-30.jpg',
    description: 'Classic fedora for sophisticated look.',
    category: 'Hats',
    colors: ['Black', 'Gray', 'Brown'],
    inStock: true
  },
  {
    id: 41,
    name: 'Trucker Cap',
    price: 22.99,
    image: '/images/product-30.jpg',
    description: 'Breathable trucker cap with mesh back.',
    category: 'Hats',
    colors: ['Black/White', 'Navy/White', 'Red/White'],
    inStock: true
  },
  
  // Plushies - Gấu bông
  {
    id: 42,
    name: 'Classic Teddy Bear',
    price: 34.99,
    image: '/images/product-31.jpg',
    description: 'Soft and cuddly classic teddy bear.',
    category: 'Plushies',
    colors: ['Brown', 'White', 'Pink'],
    sizes: ['Small', 'Medium', 'Large'],
    inStock: true,
    featured: true
  },
  {
    id: 43,
    name: 'Bunny Plush',
    price: 29.99,
    image: '/images/product-31.jpg',
    description: 'Adorable bunny plush with floppy ears.',
    category: 'Plushies',
    colors: ['White', 'Gray', 'Pink'],
    sizes: ['Small', 'Medium'],
    inStock: true
  },
  {
    id: 44,
    name: 'Panda Bear Plush',
    price: 39.99,
    image: '/images/product-31.jpg',
    description: 'Cute panda bear with black and white fur.',
    category: 'Plushies',
    colors: ['Black/White'],
    sizes: ['Medium', 'Large'],
    inStock: true
  },
  {
    id: 45,
    name: 'Unicorn Plush',
    price: 44.99,
    image: '/images/product-33.jpg',
    description: 'Magical unicorn plush with rainbow mane.',
    category: 'Plushies',
    colors: ['White', 'Pink', 'Purple'],
    sizes: ['Medium', 'Large'],
    inStock: true
  },
  {
    id: 46,
    name: 'Elephant Plush',
    price: 36.99,
    image: '/images/product-33.jpg',
    description: 'Gentle elephant plush with soft trunk.',
    category: 'Plushies',
    colors: ['Gray', 'Blue'],
    sizes: ['Small', 'Medium', 'Large'],
    inStock: true
  },
  {
    id: 47,
    name: 'Kitty Cat Plush',
    price: 32.99,
    image: '/images/product-31.jpg',
    description: 'Sweet kitty cat plush with fluffy tail.',
    category: 'Plushies',
    colors: ['Orange', 'Gray', 'White'],
    sizes: ['Small', 'Medium'],
    inStock: true
  },
  {
    id: 48,
    name: 'Dinosaur Plush',
    price: 38.99,
    image: '/images/product-33.jpg',
    description: 'Friendly dinosaur plush for kids.',
    category: 'Plushies',
    colors: ['Green', 'Blue', 'Purple'],
    sizes: ['Medium', 'Large'],
    inStock: true
  },
  
  // Bags - Túi sách
  {
    id: 49,
    name: 'Canvas Tote Bag',
    price: 29.99,
    image: '/images/product-34.jpg',
    description: 'Durable canvas tote for daily use.',
    category: 'Bags',
    colors: ['Natural', 'Black', 'Navy'],
    inStock: true,
    featured: true
  },
  {
    id: 50,
    name: 'Leather Crossbody',
    price: 79.99,
    image: '/images/product-35.jpg',
    description: 'Elegant leather crossbody bag.',
    category: 'Bags',
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true
  },
  {
    id: 51,
    name: 'Backpack Urban',
    price: 89.99,
    image: '/images/product-36.jpg',
    description: 'Modern backpack with laptop compartment.',
    category: 'Bags',
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true
  },
  {
    id: 52,
    name: 'Mini Shoulder Bag',
    price: 54.99,
    image: '/images/product-35.jpg',
    description: 'Compact shoulder bag for essentials.',
    category: 'Bags',
    colors: ['Black', 'Pink', 'White'],
    inStock: true
  },
  {
    id: 53,
    name: 'Messenger Bag',
    price: 69.99,
    image: '/images/product-37.jpg',
    description: 'Professional messenger bag with multiple pockets.',
    category: 'Bags',
    colors: ['Brown', 'Black'],
    inStock: true
  },
  {
    id: 54,
    name: 'Gym Duffle Bag',
    price: 59.99,
    image: '/images/product-36.jpg',
    description: 'Spacious duffle bag for gym and travel.',
    category: 'Bags',
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true
  },
  {
    id: 55,
    name: 'Clutch Evening Bag',
    price: 49.99,
    image: '/images/product-38.jpg',
    description: 'Elegant clutch for evening events.',
    category: 'Bags',
    colors: ['Black', 'Gold', 'Silver'],
    inStock: true
  },
  {
    id: 56,
    name: 'Travel Backpack Large',
    price: 119.99,
    image: '/images/product-36.jpg',
    description: 'Large travel backpack with wheels.',
    category: 'Bags',
    colors: ['Black', 'Gray'],
    inStock: true
  },
  
  // Keep old Accessories for backward compatibility
  {
    id: 57,
    name: 'Leather Belt',
    price: 39.99,
    image: '/images/product-39.jpg',
    description: 'Genuine leather belt with metal buckle.',
    category: 'Accessories',
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L'],
    inStock: true
  },
];

export function getProductById(id: number) {
  return products.find((p) => p.id === id) ?? null;
}

export function getAllProducts() {
  return products;
}
