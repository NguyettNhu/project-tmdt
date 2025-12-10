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
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1625910513413-5fc42ee2e69b?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544923246-77307dd628b5?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=500&fit=crop',
    description: 'Cozy beanie for cold weather.',
    category: 'Hats',
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    inStock: true
  },
  {
    id: 38,
    name: 'Bucket Hat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1572460351913-01e4ea5d9bbe?w=400&h=500&fit=crop',
    description: 'Trendy bucket hat for sun protection.',
    category: 'Hats',
    colors: ['Khaki', 'Black', 'White'],
    inStock: true
  },
  {
    id: 39,
    name: 'Snapback Cap',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=500&fit=crop',
    description: 'Urban style snapback with flat brim.',
    category: 'Hats',
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true
  },
  {
    id: 40,
    name: 'Fedora Hat',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=500&fit=crop',
    description: 'Classic fedora for sophisticated look.',
    category: 'Hats',
    colors: ['Black', 'Gray', 'Brown'],
    inStock: true
  },
  {
    id: 41,
    name: 'Trucker Cap',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1585155770913-47d0af25c23c?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1608487069096-c84af0f96c1a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    description: 'Elegant leather crossbody bag.',
    category: 'Bags',
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true
  },
  {
    id: 51,
    name: 'Backpack Urban',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    description: 'Modern backpack with laptop compartment.',
    category: 'Bags',
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true
  },
  {
    id: 52,
    name: 'Mini Shoulder Bag',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=500&fit=crop',
    description: 'Compact shoulder bag for essentials.',
    category: 'Bags',
    colors: ['Black', 'Pink', 'White'],
    inStock: true
  },
  {
    id: 53,
    name: 'Messenger Bag',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=500&fit=crop',
    description: 'Professional messenger bag with multiple pockets.',
    category: 'Bags',
    colors: ['Brown', 'Black'],
    inStock: true
  },
  {
    id: 54,
    name: 'Gym Duffle Bag',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    description: 'Spacious duffle bag for gym and travel.',
    category: 'Bags',
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true
  },
  {
    id: 55,
    name: 'Clutch Evening Bag',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
    description: 'Elegant clutch for evening events.',
    category: 'Bags',
    colors: ['Black', 'Gold', 'Silver'],
    inStock: true
  },
  {
    id: 56,
    name: 'Travel Backpack Large',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1622560480654-962d54d6a944?w=400&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=500&fit=crop',
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
