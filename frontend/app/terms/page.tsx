"use client";

import Link from "next/link";
import { FileText, ShoppingCart, CreditCard, Package, RotateCcw, Ban, AlertCircle, Scale } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Chấp Nhận Điều Khoản",
      content: [
        "Khi truy cập và sử dụng website STYLA, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.",
        "",
        "Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.",
        "",
        "Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào mà không cần thông báo trước. Việc tiếp tục sử dụng website sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới."
      ]
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "2. Quy Trình Đặt Hàng",
      content: [
        "Khi đặt hàng trên STYLA, bạn cần:",
        "• Cung cấp thông tin chính xác và đầy đủ",
        "• Xác nhận đơn hàng qua email hoặc số điện thoại",
        "• Thanh toán theo phương thức đã chọn",
        "",
        "Đơn hàng được xem là xác nhận khi:",
        "• Bạn nhận được email xác nhận từ STYLA",
        "• Thanh toán được xử lý thành công",
        "• Sản phẩm còn hàng trong kho",
        "",
        "Chúng tôi có quyền từ chối hoặc hủy đơn hàng nếu phát hiện thông tin không chính xác hoặc gian lận."
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "3. Giá Cả và Thanh Toán",
      content: [
        "Giá sản phẩm:",
        "• Được hiển thị bằng VND (Việt Nam Đồng)",
        "• Có thể thay đổi mà không cần báo trước",
        "• Đã bao gồm thuế VAT (nếu có)",
        "• Chưa bao gồm phí vận chuyển",
        "",
        "Phương thức thanh toán:",
        "• COD (thanh toán khi nhận hàng)",
        "• Chuyển khoản ngân hàng",
        "• Thẻ tín dụng/ghi nợ (Visa, Mastercard)",
        "• Ví điện tử (Momo, ZaloPay, VNPay)",
        "",
        "Mọi giao dịch đều được mã hóa và bảo mật."
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "4. Vận Chuyển và Giao Hàng",
      content: [
        "Thời gian giao hàng:",
        "• Nội thành Hà Nội: 1-2 ngày làm việc",
        "• Các tỉnh thành khác: 3-5 ngày làm việc",
        "• Vùng sâu, vùng xa: 5-7 ngày làm việc",
        "",
        "Phí vận chuyển:",
        "• Miễn phí cho đơn hàng trên 500.000đ",
        "• 30.000đ cho đơn hàng dưới 500.000đ",
        "• Phí có thể thay đổi tùy khu vực",
        "",
        "Lưu ý:",
        "• Kiểm tra hàng trước khi thanh toán (với COD)",
        "• Liên hệ ngay nếu có sai sót",
        "• Giữ lại biên nhận giao hàng"
      ]
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "5. Chính Sách Đổi Trả",
      content: [
        "Điều kiện đổi/trả:",
        "• Trong vòng 7 ngày kể từ ngày nhận hàng",
        "• Sản phẩm chưa qua sử dụng, còn nguyên tem mác",
        "• Có hóa đơn hoặc biên nhận mua hàng",
        "• Sản phẩm không thuộc danh sách không đổi trả",
        "",
        "Không áp dụng đổi/trả với:",
        "• Đồ lót, tất, vớ",
        "• Sản phẩm khuyến mãi, giảm giá trên 50%",
        "• Sản phẩm đặt theo yêu cầu",
        "• Sản phẩm đã qua chỉnh sửa",
        "",
        "Quy trình:",
        "1. Liên hệ hotline: 0355 329 485",
        "2. Gửi sản phẩm về địa chỉ của STYLA",
        "3. Nhận xác nhận và hoàn tiền (5-7 ngày)"
      ]
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: "6. Hủy Đơn Hàng",
      content: [
        "Khách hàng có thể hủy đơn hàng khi:",
        "• Đơn hàng chưa được xác nhận",
        "• Đơn hàng chưa được giao cho đơn vị vận chuyển",
        "",
        "STYLA có quyền hủy đơn hàng khi:",
        "• Sản phẩm hết hàng hoặc ngừng kinh doanh",
        "• Không liên lạc được với khách hàng",
        "• Phát hiện thông tin gian lận",
        "• Lỗi kỹ thuật về giá cả",
        "",
        "Hoàn tiền:",
        "• 100% nếu đã thanh toán trước",
        "• Trong vòng 5-7 ngày làm việc",
        "• Qua cùng phương thức thanh toán ban đầu"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "7. Trách Nhiệm và Giới Hạn",
      content: [
        "STYLA không chịu trách nhiệm cho:",
        "• Sai sót do khách hàng cung cấp thông tin sai",
        "• Chậm trễ do bất khả kháng (thiên tai, dịch bệnh, v.v.)",
        "• Thiệt hại gián tiếp hoặc ngẫu nhiên",
        "• Sử dụng sai mục đích sản phẩm",
        "",
        "Khách hàng chịu trách nhiệm:",
        "• Bảo mật thông tin tài khoản",
        "• Kiểm tra hàng khi nhận",
        "• Sử dụng sản phẩm đúng cách",
        "• Tuân thủ pháp luật Việt Nam"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "8. Quyền Sở Hữu Trí Tuệ",
      content: [
        "Tất cả nội dung trên website bao gồm:",
        "• Logo, hình ảnh, thiết kế",
        "• Văn bản, video, âm thanh",
        "• Mã nguồn, cơ sở dữ liệu",
        "• Đều thuộc quyền sở hữu của STYLA",
        "",
        "Nghiêm cấm:",
        "• Sao chép, chỉnh sửa nội dung",
        "• Sử dụng cho mục đích thương mại",
        "• Phân phối lại mà không có sự cho phép",
        "",
        "Vi phạm sẽ bị xử lý theo pháp luật Việt Nam về quyền sở hữu trí tuệ."
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "9. Giải Quyết Tranh Chấp",
      content: [
        "Trong trường hợp có tranh chấp:",
        "• Ưu tiên giải quyết thông qua thương lượng",
        "• Liên hệ bộ phận chăm sóc khách hàng",
        "• Thời gian giải quyết: 7-15 ngày làm việc",
        "",
        "Nếu không đạt được thỏa thuận:",
        "• Tranh chấp sẽ được giải quyết tại Tòa án nhân dân",
        "• Theo pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        "• Tại địa điểm nơi STYLA đặt trụ sở chính"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "10. Điều Khoản Chung",
      content: [
        "Các điều khoản này có hiệu lực từ ngày 16/11/2025.",
        "",
        "Bằng việc sử dụng website và dịch vụ của STYLA, bạn xác nhận rằng:",
        "• Bạn đã đọc và hiểu toàn bộ điều khoản",
        "• Bạn đủ 18 tuổi hoặc có sự đồng ý của người giám hộ",
        "• Bạn đồng ý tuân thủ các quy định này",
        "",
        "Mọi thắc mắc xin liên hệ:",
        "• Email: support@styla.com",
        "• Hotline: 0355 329 485",
        "• Địa chỉ: Nam Từ Liêm, Hà Nội"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-full mb-6 shadow-lg">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
            Điều Khoản Dịch Vụ
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ của STYLA. 
            Việc sử dụng website đồng nghĩa với việc bạn chấp nhận các điều khoản này.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Có hiệu lực từ: 16 tháng 11, 2025</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Lưu ý quan trọng</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                Các điều khoản này tạo thành một thỏa thuận có ràng buộc pháp lý giữa bạn và STYLA. 
                Vui lòng đọc kỹ trước khi sử dụng dịch vụ. Nếu có thắc mắc, hãy liên hệ với chúng tôi 
                qua hotline <a href="tel:0355329485" className="font-semibold hover:underline">0355 329 485</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Mục lục:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="text-sm text-gray-600 hover:text-[#D9006C] transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-pink-50"
              >
                <span className="text-[#D9006C]">{section.icon}</span>
                <span>{section.title.replace(/^\d+\.\s/, '')}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              id={`section-${index}`}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow scroll-mt-4"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-xl flex items-center justify-center text-white shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                </div>
              </div>
              
              <div className="ml-16 space-y-2 text-gray-600 leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={paragraph === "" ? "h-2" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Agreement Box */}
        <div className="mt-12 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Xác Nhận Đồng Ý</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Bằng việc tiếp tục sử dụng website và dịch vụ của STYLA, bạn xác nhận rằng 
              bạn đã đọc, hiểu và đồng ý với tất cả các điều khoản và điều kiện được nêu trên.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#D9006C] rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Bắt đầu mua sắm
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                <AlertCircle className="w-5 h-5" />
                Có câu hỏi?
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex gap-6 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Trang chủ
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/shipping" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Vận chuyển
            </Link>
            <Link href="/returns" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Đổi trả
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
