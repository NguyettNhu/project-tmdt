'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

type PaymentMethod = 'credit-card' | 'paypal' | 'cod';

type ShippingInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  postalCode: string;
  notes: string;
  shippingMethod: string;
  shippingCost: number;
};

export default function PaymentPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  
  const [shippingInfo] = useState<ShippingInfo | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shippingInfo');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Credit Card Info
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Redirect back to shipping if no info found
    if (!shippingInfo) {
      router.push('/shipping');
    }
  }, [shippingInfo, router]);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      value = value.substring(0, 19); // Max 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      value = value.substring(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCardInfo = () => {
    if (selectedPayment !== 'credit-card') return true;

    const errors: Record<string, string> = {};

    const cardNumberClean = cardData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      errors.cardNumber = 'Vui lòng nhập số thẻ';
    } else if (cardNumberClean.length !== 16) {
      errors.cardNumber = 'Số thẻ phải có 16 chữ số';
    }

    if (!cardData.cardName.trim()) {
      errors.cardName = 'Vui lòng nhập tên trên thẻ';
    }

    if (!cardData.expiryDate) {
      errors.expiryDate = 'Vui lòng nhập ngày hết hạn';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      errors.expiryDate = 'Định dạng: MM/YY';
    }

    if (!cardData.cvv) {
      errors.cvv = 'Vui lòng nhập CVV';
    } else if (cardData.cvv.length < 3) {
      errors.cvv = 'CVV phải có 3-4 chữ số';
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitPayment = async () => {
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản dịch vụ');
      return;
    }

    if (items.length === 0) {
      alert('Giỏ hàng trống!');
      router.push('/cart');
      return;
    }

    if (!validateCardInfo()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order data
    const orderData = {
      orderId: 'ORD-' + Date.now(),
      items,
      subtotal,
      shippingCost: shippingInfo?.shippingCost || 0,
      total: subtotal + (shippingInfo?.shippingCost || 0),
      shippingInfo,
      paymentMethod: selectedPayment,
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save order to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Clear cart
    clearCart();
    
    // Clear shipping info
    localStorage.removeItem('shippingInfo');

    // Redirect to confirmation
    router.push('/order-confirmation');
  };

  if (!shippingInfo || items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9006C] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const total = subtotal + shippingInfo.shippingCost;

  return (
    <div className="w-full min-h-screen bg-gray-50">
    

      {/* Progress Bar */}
      <section className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/30 text-white flex items-center justify-center font-bold">✓</div>
              <span className="text-white/70 font-medium">Giỏ hàng</span>
            </div>
            <div className="w-12 h-0.5 bg-white/50"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/30 text-white flex items-center justify-center font-bold">✓</div>
              <span className="text-white/70 font-medium">Thông tin giao hàng</span>
            </div>
            <div className="w-12 h-0.5 bg-white"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-[#D9006C] flex items-center justify-center font-bold">3</div>
              <span className="text-white font-medium">Thanh toán</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white text-center">
            Thanh toán
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#D9006C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {/* Credit Card */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'credit-card'
                      ? 'border-[#D9006C] bg-[#FFF0F6]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={selectedPayment === 'credit-card'}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                    className="w-4 h-4 text-[#D9006C] focus:ring-[#D9006C]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                      </svg>
                      <span className="font-semibold text-gray-900">Thẻ tín dụng/Ghi nợ</span>
                    </div>
                    <p className="text-sm text-gray-600">Visa, Mastercard, JCB, American Express</p>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'paypal'
                      ? 'border-[#D9006C] bg-[#FFF0F6]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={selectedPayment === 'paypal'}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                    className="w-4 h-4 text-[#D9006C] focus:ring-[#D9006C]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-8 h-8 text-[#003087]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437l.141.32z"/>
                      </svg>
                      <span className="font-semibold text-gray-900">PayPal</span>
                    </div>
                    <p className="text-sm text-gray-600">Thanh toán an toàn qua PayPal</p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'cod'
                      ? 'border-[#D9006C] bg-[#FFF0F6]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                    className="w-4 h-4 text-[#D9006C] focus:ring-[#D9006C]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                    </div>
                    <p className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Credit Card Form */}
            {selectedPayment === 'credit-card' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Thông tin thẻ</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số thẻ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        cardErrors.cardNumber ? 'border-red-500' : 'border-gray-200 focus:border-[#D9006C]'
                      }`}
                    />
                    {cardErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{cardErrors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên trên thẻ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      placeholder="NGUYEN VAN A"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors uppercase ${
                        cardErrors.cardName ? 'border-red-500' : 'border-gray-200 focus:border-[#D9006C]'
                      }`}
                    />
                    {cardErrors.cardName && <p className="text-red-500 text-sm mt-1">{cardErrors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ngày hết hạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          cardErrors.expiryDate ? 'border-red-500' : 'border-gray-200 focus:border-[#D9006C]'
                        }`}
                      />
                      {cardErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{cardErrors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          cardErrors.cvv ? 'border-red-500' : 'border-gray-200 focus:border-[#D9006C]'
                        }`}
                      />
                      {cardErrors.cvv && <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-800">Thông tin thẻ được mã hóa và bảo mật</p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D9006C] focus:ring-[#D9006C]"
                />
                <span className="text-sm text-gray-700">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-[#D9006C] hover:underline font-semibold">
                    Điều khoản dịch vụ
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-[#D9006C] hover:underline font-semibold">
                    Chính sách bảo mật
                  </a>{' '}
                  của STYLA
                </span>
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Đơn hàng của bạn</h2>

                {/* Products */}
                <div className="space-y-4 mb-6 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-2xl">👕</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">x{item.qty}</p>
                        <p className="font-semibold text-[#D9006C]">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Thông tin giao hàng</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.city}</p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-semibold text-gray-900">
                      {shippingInfo.shippingCost === 0 ? 'Miễn phí' : `$${shippingInfo.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span className="text-gray-900">Tổng cộng</span>
                    <span className="text-[#D9006C]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmitPayment}
                  disabled={isProcessing || !agreeTerms}
                  className="w-full bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Hoàn tất đặt hàng</span>
                    </>
                  )}
                </button>
                
                <Link
                  href="/shipping"
                  className="block w-full text-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#D9006C] hover:bg-[#FFF0F6] transition-all"
                >
                  Quay lại
                </Link>
              </div>

              {/* Security Badge */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Giao dịch được bảo mật bởi SSL</span>
                </div>
                <p className="text-xs text-gray-500">Thông tin thanh toán của bạn được mã hóa và bảo vệ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
