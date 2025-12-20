// API Response
export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

// Product types
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
    rating_avg?: number;
    rating_count?: number;
}

// Category types
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

// Post types
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

// Customer types
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

// Order types
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

// Review types
export interface ApiReview {
    id: number;
    productId: number;
    userId: number;
    userName: string;
    userAvatar: string | null;
    rating: number;
    title: string | null;
    comment: string;
    images: string[] | null;
    verifiedPurchase: boolean;
    helpful: number;
    createdAt: string;
}

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
