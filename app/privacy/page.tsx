"use client";

import Link from "next/link";
import { Shield, Eye, Lock, UserCheck, Database, Bell, FileText, Mail } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "1. Thu Thập Thông Tin",
      content: [
        "Chúng tôi thu thập thông tin cá nhân khi bạn:",
        "• Đăng ký tài khoản trên website",
        "• Đặt hàng hoặc thực hiện giao dịch",
        "• Đăng ký nhận bản tin",
        "• Liên hệ với chúng tôi qua email hoặc form",
        "• Tham gia khảo sát hoặc chương trình khuyến mãi",
        "",
        "Thông tin có thể bao gồm: họ tên, email, số điện thoại, địa chỉ giao hàng, thông tin thanh toán."
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "2. Sử Dụng Thông Tin",
      content: [
        "Thông tin của bạn được sử dụng để:",
        "• Xử lý đơn hàng và giao hàng",
        "• Cải thiện dịch vụ khách hàng",
        "• Gửi thông tin về sản phẩm mới và khuyến mãi",
        "• Phân tích và cải thiện trải nghiệm người dùng",
        "• Ngăn chặn gian lận và bảo mật tài khoản",
        "• Tuân thủ các yêu cầu pháp lý"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "3. Bảo Mật Thông Tin",
      content: [
        "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn:",
        "• Mã hóa dữ liệu nhạy cảm (SSL/TLS)",
        "• Hệ thống tường lửa và giám sát bảo mật 24/7",
        "• Giới hạn quyền truy cập chỉ cho nhân viên được ủy quyền",
        "• Thường xuyên cập nhật và kiểm tra bảo mật",
        "• Không bán hoặc chia sẻ thông tin với bên thứ ba không liên quan",
        "",
        "Tuy nhiên, không có phương thức truyền qua Internet nào là 100% an toàn."
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "4. Quyền Của Bạn",
      content: [
        "Bạn có quyền:",
        "• Truy cập và xem thông tin cá nhân",
        "• Yêu cầu chỉnh sửa hoặc cập nhật thông tin",
        "• Xóa tài khoản và dữ liệu cá nhân",
        "• Từ chối nhận email marketing",
        "• Rút lại sự đồng ý xử lý dữ liệu",
        "• Khiếu nại về cách xử lý dữ liệu",
        "",
        "Để thực hiện các quyền này, vui lòng liên hệ: support@styla.com"
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "5. Cookies và Công Nghệ Theo Dõi",
      content: [
        "Chúng tôi sử dụng cookies để:",
        "• Ghi nhớ đăng nhập và giỏ hàng",
        "• Phân tích lưu lượng truy cập",
        "• Cá nhân hóa nội dung và quảng cáo",
        "• Cải thiện hiệu suất website",
        "",
        "Bạn có thể tắt cookies trong cài đặt trình duyệt, nhưng một số tính năng có thể bị ảnh hưởng."
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "6. Chia Sẻ Thông Tin",
      content: [
        "Chúng tôi chỉ chia sẻ thông tin với:",
        "• Đối tác vận chuyển (để giao hàng)",
        "• Cổng thanh toán (để xử lý giao dịch)",
        "• Dịch vụ phân tích (Google Analytics, v.v.)",
        "• Cơ quan pháp luật (khi có yêu cầu hợp pháp)",
        "",
        "Tất cả đối tác đều tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt."
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "7. Email Marketing",
      content: [
        "Khi đăng ký nhận tin, bạn sẽ nhận:",
        "• Thông báo về sản phẩm mới",
        "• Ưu đãi và khuyến mãi độc quyền",
        "• Tips thời trang và styling",
        "",
        "Bạn có thể hủy đăng ký bất cứ lúc nào bằng cách:",
        "• Click vào link 'Unsubscribe' trong email",
        "• Liên hệ với bộ phận hỗ trợ",
        "• Cập nhật trong cài đặt tài khoản"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "8. Cập Nhật Chính Sách",
      content: [
        "Chính sách bảo mật này có thể được cập nhật định kỳ.",
        "",
        "Thay đổi quan trọng sẽ được thông báo qua:",
        "• Email đến địa chỉ đã đăng ký",
        "• Thông báo trên website",
        "• Pop-up khi đăng nhập",
        "",
        "Ngày cập nhật cuối: 16/11/2025",
        "Bằng việc tiếp tục sử dụng dịch vụ, bạn đồng ý với các điều khoản mới."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Tại STYLA, chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. 
            Vui lòng đọc kỹ chính sách bảo mật để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Cập nhật lần cuối: 16 tháng 11, 2025</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Nội dung chính:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
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

        {/* Contact Section */}
        <div className="mt-12 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Còn Câu Hỏi?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nếu bạn có bất kỳ thắc mắc nào về chính sách bảo mật hoặc cách chúng tôi xử lý dữ liệu của bạn, 
            đừng ngần ngại liên hệ với chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:support@styla.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#D9006C] rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              support@styla.com
            </a>
            <a
              href="tel:0355329485"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0355 329 485
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex gap-6 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Trang chủ
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-[#D9006C] transition-colors">
              Điều khoản dịch vụ
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
