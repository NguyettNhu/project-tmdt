export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
  size?: string;
  color?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Mock reviews data
export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: "Nguyễn Văn A",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    title: "Chất lượng tuyệt vời!",
    comment: "Áo rất đẹp, chất liệu cotton mềm mại và thoáng mát. Form áo vừa vặn, không bị rộng hay chật. Màu trắng tinh tế, dễ phối đồ. Giá cả hợp lý so với chất lượng. Rất hài lòng với sản phẩm này!",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400"
    ],
    verifiedPurchase: true,
    helpful: 24,
    createdAt: "2025-11-10T10:30:00Z",
    size: "M",
    color: "Trắng"
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: "Trần Thị B",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    title: "Sản phẩm tốt, đáng mua",
    comment: "Áo đẹp, chất lượng tốt nhưng hơi mỏng một chút. Giao hàng nhanh, đóng gói cẩn thận. Mình cao 1m65, nặng 52kg mặc size M vừa vặn.",
    verifiedPurchase: true,
    helpful: 15,
    createdAt: "2025-11-08T14:20:00Z",
    size: "M"
  },
  {
    id: 3,
    productId: 1,
    userId: 3,
    userName: "Lê Minh C",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    title: "Rất hài lòng",
    comment: "Đã mua 3 cái để thay đổi. Áo cơ bản nhưng rất chất lượng, giặt nhiều lần vẫn giữ form tốt. Shop phục vụ nhiệt tình. Sẽ tiếp tục ủng hộ!",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400"
    ],
    verifiedPurchase: true,
    helpful: 31,
    createdAt: "2025-11-05T09:15:00Z",
    size: "L",
    color: "Trắng"
  },
  {
    id: 4,
    productId: 1,
    userId: 4,
    userName: "Phạm Thị D",
    userAvatar: "https://i.pravatar.cc/150?img=9",
    rating: 3,
    title: "Tạm ổn",
    comment: "Áo ok nhưng size hơi nhỏ so với mô tả. Mình thường mặc M nhưng chiếc này hơi chật nên phải đổi sang L. Chất vải thì tốt.",
    verifiedPurchase: true,
    helpful: 8,
    createdAt: "2025-11-03T16:45:00Z",
    size: "M"
  },
  {
    id: 5,
    productId: 1,
    userId: 5,
    userName: "Hoàng Văn E",
    userAvatar: "https://i.pravatar.cc/150?img=7",
    rating: 5,
    title: "Xuất sắc!",
    comment: "Mặc rất thoải mái, không bị bai nhão sau khi giặt. Form áo đẹp, ôm vừa phải. Màu trắng không bị xỉn sau nhiều lần giặt. Đây là lần thứ 2 mình mua. Highly recommended!",
    verifiedPurchase: true,
    helpful: 42,
    createdAt: "2025-10-28T11:00:00Z",
    size: "L",
    color: "Trắng"
  },
  {
    id: 6,
    productId: 1,
    userId: 6,
    userName: "Võ Thị F",
    userAvatar: "https://i.pravatar.cc/150?img=10",
    rating: 4,
    title: "Đẹp, giá tốt",
    comment: "Chất liệu tốt, mặc mát. Duy nhất là giao hơi lâu nhưng sản phẩm vẫn ok nên cho 4 sao.",
    verifiedPurchase: true,
    helpful: 6,
    createdAt: "2025-10-25T13:30:00Z",
    size: "S"
  },
  {
    id: 7,
    productId: 2,
    userId: 7,
    userName: "Đỗ Văn G",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    title: "Áo hoodie đẹp quá!",
    comment: "Chất nỉ dày dặn, ấm áp. Form áo unisex rất đẹp. Túi kangaroo rộng rãi tiện lợi. Màu đen không phai. Đáng giá từng đồng!",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
    ],
    verifiedPurchase: true,
    helpful: 19,
    createdAt: "2025-11-09T15:20:00Z",
    size: "L",
    color: "Đen"
  },
  {
    id: 8,
    productId: 3,
    userId: 8,
    userName: "Bùi Thị H",
    userAvatar: "https://i.pravatar.cc/150?img=16",
    rating: 5,
    title: "Váy xinh lắm!",
    comment: "Váy dáng suông rất dễ mặc, chất liệu mát mẻ. Họa tiết hoa nhẹ nhàng, nữ tính. Có túi hai bên rất tiện. Mình cao 1m60 mặc vừa đẹp.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400"
    ],
    verifiedPurchase: true,
    helpful: 27,
    createdAt: "2025-11-07T10:15:00Z",
    size: "M"
  }
];

// Calculate review statistics
export function getReviewStats(productId: number): ReviewStats {
  const productReviews = reviews.filter(r => r.productId === productId);
  
  if (productReviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / productReviews.length;

  const ratingBreakdown = {
    5: productReviews.filter(r => r.rating === 5).length,
    4: productReviews.filter(r => r.rating === 4).length,
    3: productReviews.filter(r => r.rating === 3).length,
    2: productReviews.filter(r => r.rating === 2).length,
    1: productReviews.filter(r => r.rating === 1).length,
  };

  return {
    averageRating,
    totalReviews: productReviews.length,
    ratingBreakdown
  };
}

// Get reviews for a product
export function getProductReviews(productId: number): Review[] {
  return reviews.filter(r => r.productId === productId);
}
