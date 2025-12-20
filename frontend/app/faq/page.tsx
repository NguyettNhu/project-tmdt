'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { FaChevronDown, FaChevronUp, FaShippingFast, FaBox, FaCreditCard, FaUndo, FaQuestionCircle, FaUserShield } from 'react-icons/fa';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: FaQuestionCircle },
    { id: 'shipping', name: 'Vận chuyển', icon: FaShippingFast },
    { id: 'order', name: 'Đơn hàng', icon: FaBox },
    { id: 'payment', name: 'Thanh toán', icon: FaCreditCard },
    { id: 'return', name: 'Đổi trả', icon: FaUndo },
    { id: 'account', name: 'Tài khoản', icon: FaUserShield }
  ];

  const faqData: FAQItem[] = [
    // Shipping Questions
    {
      id: 1,
      question: 'STYLA có giao hàng miễn phí không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ giao hàng miễn phí cho tất cả đơn hàng trong nội thành các thành phố lớn. Đối với các khu vực khác, phí vận chuyển sẽ được tính dựa trên địa chỉ giao hàng và sẽ được hiển thị rõ ràng trước khi bạn thanh toán.',
      category: 'shipping'
    },
    {
      id: 2,
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Thời gian giao hàng phụ thuộc vào địa chỉ của bạn:\n- Nội thành TP.HCM & Hà Nội: 1-2 ngày làm việc\n- Các tỉnh thành khác: 3-5 ngày làm việc\n- Vùng xa, hải đảo: 5-7 ngày làm việc\nBạn sẽ nhận được mã vận đơn qua email/SMS để theo dõi đơn hàng của mình.',
      category: 'shipping'
    },
    {
      id: 3,
      question: 'Tôi có thể theo dõi đơn hàng của mình như thế nào?',
      answer: 'Sau khi đơn hàng được xác nhận và giao cho đơn vị vận chuyển, bạn sẽ nhận được email/SMS chứa mã vận đơn. Bạn có thể sử dụng mã này để theo dõi tình trạng đơn hàng trên website của chúng tôi hoặc trực tiếp trên trang của đơn vị vận chuyển.',
      category: 'shipping'
    },
    {
      id: 4,
      question: 'Tôi có thể thay đổi địa chỉ giao hàng sau khi đặt không?',
      answer: 'Bạn có thể thay đổi địa chỉ giao hàng trong vòng 2 giờ sau khi đặt hàng bằng cách liên hệ với bộ phận chăm sóc khách hàng qua hotline hoặc email. Sau thời gian này, đơn hàng đã được chuyển đến kho xử lý và không thể thay đổi địa chỉ.',
      category: 'shipping'
    },

    // Order Questions
    {
      id: 5,
      question: 'Làm thế nào để đặt hàng tại STYLA?',
      answer: 'Để đặt hàng, bạn chỉ cần:\n1. Chọn sản phẩm yêu thích và thêm vào giỏ hàng\n2. Kiểm tra giỏ hàng và nhấn "Thanh toán"\n3. Điền thông tin giao hàng\n4. Chọn phương thức thanh toán\n5. Xác nhận đơn hàng\nBạn sẽ nhận được email xác nhận ngay sau khi đặt hàng thành công.',
      category: 'order'
    },
    {
      id: 6,
      question: 'Tôi có thể hủy đơn hàng sau khi đặt không?',
      answer: 'Có, bạn có thể hủy đơn hàng miễn phí trong vòng 2 giờ sau khi đặt hàng. Sau thời gian này, nếu đơn hàng đã được xử lý và đóng gói, bạn có thể từ chối nhận hàng khi shipper giao và sẽ được hoàn tiền đầy đủ (trừ phí vận chuyển nếu có).',
      category: 'order'
    },
    {
      id: 7,
      question: 'Tôi có thể đặt hàng mà không cần tạo tài khoản không?',
      answer: 'Hiện tại, để đảm bảo quản lý đơn hàng tốt nhất và bảo vệ quyền lợi khách hàng, bạn cần tạo tài khoản để đặt hàng. Quá trình đăng ký rất đơn giản và nhanh chóng, chỉ mất khoảng 1 phút.',
      category: 'order'
    },
    {
      id: 8,
      question: 'Làm sao để kiểm tra trạng thái đơn hàng của tôi?',
      answer: 'Bạn có thể kiểm tra trạng thái đơn hàng bằng cách:\n1. Đăng nhập vào tài khoản\n2. Vào mục "Đơn hàng của tôi"\n3. Xem chi tiết đơn hàng\nHoặc bạn có thể sử dụng mã đơn hàng được gửi qua email để tra cứu trực tiếp trên website.',
      category: 'order'
    },

    // Payment Questions
    {
      id: 9,
      question: 'STYLA chấp nhận những phương thức thanh toán nào?',
      answer: 'Chúng tôi chấp nhận nhiều phương thức thanh toán:\n- Thanh toán khi nhận hàng (COD)\n- Thẻ tín dụng/Thẻ ghi nợ (Visa, Mastercard, JCB)\n- Ví điện tử (MoMo, ZaloPay, VNPay)\n- Chuyển khoản ngân hàng\n- PayPal (cho khách hàng quốc tế)',
      category: 'payment'
    },
    {
      id: 10,
      question: 'Thông tin thẻ của tôi có được bảo mật không?',
      answer: 'Tuyệt đối! Chúng tôi sử dụng công nghệ mã hóa SSL 256-bit và tuân thủ tiêu chuẩn bảo mật PCI DSS. Thông tin thẻ của bạn được xử lý trực tiếp bởi cổng thanh toán và không được lưu trữ trên hệ thống của chúng tôi.',
      category: 'payment'
    },
    {
      id: 11,
      question: 'Khi nào tiền sẽ được trừ khỏi tài khoản của tôi?',
      answer: 'Đối với thanh toán online (thẻ, ví điện tử), tiền sẽ được trừ ngay khi bạn xác nhận đơn hàng. Đối với thanh toán COD, bạn sẽ thanh toán khi nhận hàng. Nếu có vấn đề với đơn hàng, chúng tôi sẽ hoàn tiền trong vòng 5-7 ngày làm việc.',
      category: 'payment'
    },
    {
      id: 12,
      question: 'Tôi có thể sử dụng mã giảm giá ở đâu?',
      answer: 'Bạn có thể nhập mã giảm giá ở trang thanh toán, ngay phần "Mã khuyến mãi". Mỗi đơn hàng chỉ được sử dụng một mã giảm giá. Lưu ý: một số mã có điều kiện áp dụng như giá trị đơn hàng tối thiểu hoặc áp dụng cho sản phẩm cụ thể.',
      category: 'payment'
    },

    // Return Questions
    {
      id: 13,
      question: 'Chính sách đổi trả của STYLA như thế nào?',
      answer: 'Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày nhận hàng với các điều kiện:\n- Sản phẩm còn nguyên tem mác, chưa qua sử dụng\n- Còn đầy đủ hóa đơn, bao bì\n- Không bị bẩn, hư hỏng do người dùng\n- Không thuộc danh mục sản phẩm không được đổi trả (đồ lót, phụ kiện cá nhân)',
      category: 'return'
    },
    {
      id: 14,
      question: 'Tôi muốn đổi size, phải làm sao?',
      answer: 'Nếu sản phẩm không vừa size, bạn có thể:\n1. Liên hệ bộ phận CSKH trong vòng 30 ngày\n2. Đóng gói sản phẩm cẩn thận (giữ nguyên tem mác)\n3. Gửi trả hàng theo địa chỉ hướng dẫn\n4. Chúng tôi sẽ gửi size mới cho bạn\nPhí vận chuyển đổi size lần đầu sẽ được STYLA hỗ trợ.',
      category: 'return'
    },
    {
      id: 15,
      question: 'Sản phẩm bị lỗi, tôi có được đổi trả miễn phí không?',
      answer: 'Tất nhiên! Nếu sản phẩm bị lỗi từ nhà sản xuất hoặc bị hư hỏng trong quá trình vận chuyển, chúng tôi sẽ:\n- Đổi sản phẩm mới hoàn toàn miễn phí\n- Hoặc hoàn tiền 100% nếu hết hàng\n- Hỗ trợ toàn bộ phí vận chuyển\nVui lòng chụp ảnh lỗi và liên hệ CSKH trong vòng 48 giờ sau khi nhận hàng.',
      category: 'return'
    },
    {
      id: 16,
      question: 'Tôi sẽ được hoàn tiền trong bao lâu?',
      answer: 'Thời gian hoàn tiền phụ thuộc vào phương thức thanh toán ban đầu:\n- COD: Hoàn trong 1-3 ngày làm việc qua chuyển khoản\n- Thẻ tín dụng/ghi nợ: 5-10 ngày làm việc\n- Ví điện tử: 3-5 ngày làm việc\n- Chuyển khoản: 1-3 ngày làm việc\nBạn sẽ nhận được thông báo qua email khi giao dịch hoàn tiền được thực hiện.',
      category: 'return'
    },

    // Account Questions
    {
      id: 17,
      question: 'Làm thế nào để tạo tài khoản?',
      answer: 'Tạo tài khoản rất đơn giản:\n1. Nhấn vào "Đăng ký" trên thanh menu\n2. Điền thông tin cá nhân (email, mật khẩu, họ tên, số điện thoại)\n3. Xác nhận email\n4. Hoàn tất!\nBạn có thể bắt đầu mua sắm ngay sau khi đăng ký thành công.',
      category: 'account'
    },
    {
      id: 18,
      question: 'Tôi quên mật khẩu, phải làm sao?',
      answer: 'Nếu quên mật khẩu, bạn có thể:\n1. Nhấn vào "Quên mật khẩu?" ở trang đăng nhập\n2. Nhập email đăng ký\n3. Kiểm tra email và nhấn vào link đặt lại mật khẩu\n4. Tạo mật khẩu mới\nLink đặt lại mật khẩu có hiệu lực trong 24 giờ.',
      category: 'account'
    },
    {
      id: 19,
      question: 'Làm thế nào để thay đổi thông tin tài khoản?',
      answer: 'Để thay đổi thông tin tài khoản:\n1. Đăng nhập vào tài khoản\n2. Vào mục "Thông tin cá nhân"\n3. Chỉnh sửa thông tin cần thiết\n4. Nhấn "Lưu thay đổi"\nĐối với thay đổi email hoặc số điện thoại, bạn cần xác nhận qua OTP để đảm bảo bảo mật.',
      category: 'account'
    },
    {
      id: 20,
      question: 'Tôi có thể xóa tài khoản của mình không?',
      answer: 'Có, bạn có quyền xóa tài khoản bất cứ lúc nào. Vui lòng liên hệ với bộ phận CSKH qua email hoặc hotline. Lưu ý rằng sau khi xóa, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và không thể khôi phục. Các đơn hàng đang xử lý cần được hoàn tất trước khi xóa tài khoản.',
      category: 'account'
    }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50"> 
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tìm câu trả lời cho những câu hỏi phổ biến về sản phẩm, dịch vụ và chính sách của STYLA
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chọn danh mục</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <Icon className="text-2xl mb-2" />
                    <span className="text-sm font-medium text-center">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {filteredFAQs.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FaQuestionCircle className="text-6xl mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Không tìm thấy câu hỏi nào trong danh mục này.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`transition-all duration-300 ${
                      openId === faq.id ? 'bg-pink-50' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 md:px-8 py-6 flex items-start justify-between text-left group"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          openId === faq.id 
                            ? 'bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white' 
                            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                        }`}>
                          {index + 1}
                        </span>
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          openId === faq.id ? 'text-[#D9006C]' : 'text-gray-800 group-hover:text-[#D9006C]'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`shrink-0 ml-4 transition-transform duration-300 ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}>
                        {openId === faq.id ? (
                          <FaChevronUp className="text-[#D9006C] text-xl" />
                        ) : (
                          <FaChevronDown className="text-gray-400 group-hover:text-[#D9006C] text-xl" />
                        )}
                      </div>
                    </button>
                    
                    {openId === faq.id && (
                      <div className="px-6 md:px-8 pb-6 animate-fadeIn">
                        <div className="ml-12 text-gray-600 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <FaQuestionCircle className="text-6xl mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Vẫn còn thắc mắc?</h2>
            <p className="text-lg mb-6 opacity-90">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-[#D9006C] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Liên hệ ngay
              </a>
              <a
                href="tel:+84123456789"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
              >
                Hotline: 0123 456 789
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
