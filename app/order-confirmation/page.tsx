'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

type OrderData = {
  orderId: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    qty: number;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  paymentMethod: string;
  orderDate: string;
  status: string;
};

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderData] = useState<OrderData | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastOrder');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    // Redirect if no order found
    if (!orderData) {
      router.push('/');
    }
  }, [orderData, router]);

  if (!orderData) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
       
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9006C] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const orderDate = new Date(orderData.orderDate);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'credit-card':
        return 'Thẻ tín dụng/Ghi nợ';
      case 'paypal':
        return 'PayPal';
      case 'cod':
        return 'Thanh toán khi nhận hàng (COD)';
      default:
        return method;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Success Message */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Đặt hàng thành công!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Cảm ơn bạn đã mua sắm tại STYLA. Đơn hàng của bạn đã được xác nhận.
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF0F6] rounded-full">
            <span className="text-sm font-semibold text-gray-700">Mã đơn hàng:</span>
            <span className="text-lg font-black text-[#D9006C]">{orderData.orderId}</span>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Email xác nhận đã được gửi đến <span className="font-semibold text-gray-900">{orderData.shippingInfo.email}</span>
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Shipping Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#D9006C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Thông tin giao hàng
            </h2>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-gray-900">{orderData.shippingInfo.fullName}</p>
              <p className="text-gray-600">{orderData.shippingInfo.phone}</p>
              <p className="text-gray-600">{orderData.shippingInfo.email}</p>
              <p className="text-gray-600">
                {orderData.shippingInfo.address}, {orderData.shippingInfo.ward}, <br />
                {orderData.shippingInfo.district}, {orderData.shippingInfo.city}
              </p>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#D9006C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Thông tin đơn hàng
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày đặt hàng:</span>
                <span className="font-medium text-gray-900">{orderDate.toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dự kiến giao hàng:</span>
                <span className="font-medium text-gray-900">{estimatedDelivery.toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-medium text-gray-900">{getPaymentMethodName(orderData.paymentMethod)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Đã xác nhận
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Chi tiết sản phẩm</h2>
          
          <div className="space-y-4">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-3xl">👕</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">Số lượng: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#D9006C]">${(item.price * item.qty).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-semibold text-gray-900">${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-semibold text-gray-900">
                {orderData.shippingCost === 0 ? 'Miễn phí' : `$${orderData.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
              <span className="text-gray-900">Tổng cộng</span>
              <span className="text-[#D9006C]">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Order Tracking Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Theo dõi đơn hàng</h2>
          
          <div className="relative">
            {/* Timeline */}
            <div className="flex items-start justify-between">
              {[
                { label: 'Đã đặt hàng', icon: '✓', status: 'completed', date: orderDate.toLocaleDateString('vi-VN') },
                { label: 'Đang xử lý', icon: '⏳', status: 'current' },
                { label: 'Đang giao', icon: '🚚', status: 'pending' },
                { label: 'Hoàn thành', icon: '🎉', status: 'pending' }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center relative flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                    step.status === 'completed' ? 'bg-green-100' :
                    step.status === 'current' ? 'bg-[#FFF0F6] border-2 border-[#D9006C]' :
                    'bg-gray-100'
                  }`}>
                    {step.icon}
                  </div>
                  <p className={`text-sm font-semibold text-center ${
                    step.status === 'completed' || step.status === 'current' ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                  )}
                  {index < 3 && (
                    <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                    }`} style={{ transform: 'translateY(-50%)' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Tiếp tục mua sắm
          </Link>
          
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#D9006C] hover:bg-[#FFF0F6] transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            In đơn hàng
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-[#FFF0F6] rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Cần hỗ trợ?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ với chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:hello@styla.example" className="inline-flex items-center gap-2 text-[#D9006C] font-semibold hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@styla.example
            </a>
            <span className="text-gray-400">|</span>
            <a href="tel:+84000000000" className="inline-flex items-center gap-2 text-[#D9006C] font-semibold hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +84 000 000 000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
