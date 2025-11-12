'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { FaUndo, FaCheckCircle, FaTimesCircle, FaShippingFast, FaMoneyBillWave, FaExchangeAlt, FaClipboardList, FaClock, FaBox } from 'react-icons/fa';

export default function ReturnsPage() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', name: 'Tổng quan', icon: FaClipboardList },
    { id: 'conditions', name: 'Điều kiện đổi trả', icon: FaCheckCircle },
    { id: 'process', name: 'Quy trình', icon: FaExchangeAlt },
    { id: 'refund', name: 'Hoàn tiền', icon: FaMoneyBillWave },
    { id: 'shipping', name: 'Vận chuyển', icon: FaShippingFast }
  ];

  const eligibleItems = [
    'Sản phẩm còn nguyên tem mác, nhãn hiệu',
    'Chưa qua sử dụng, giặt hoặc làm thay đổi',
    'Còn đầy đủ bao bì, hộp đựng ban đầu',
    'Có hóa đơn mua hàng hoặc đơn đặt hàng',
    'Trong thời gian 30 ngày kể từ ngày nhận hàng',
    'Không có dấu hiệu bẩn, rách, hư hỏng'
  ];

  const nonEligibleItems = [
    'Đồ lót, đồ bơi, tất/vớ đã mở bao bì',
    'Phụ kiện cá nhân (khuyên tai, vòng cổ đã đeo)',
    'Sản phẩm giảm giá trên 50% (chỉ đổi, không trả)',
    'Sản phẩm đã qua 30 ngày kể từ ngày nhận',
    'Sản phẩm đặc biệt theo yêu cầu (custom)',
    'Sản phẩm khuyến mãi, quà tặng kèm'
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Liên hệ CSKH',
      description: 'Liên hệ bộ phận chăm sóc khách hàng qua hotline, email hoặc chat trong vòng 30 ngày kể từ ngày nhận hàng.',
      icon: FaClipboardList,
      time: '5-10 phút'
    },
    {
      step: 2,
      title: 'Xác nhận đơn đổi trả',
      description: 'Cung cấp mã đơn hàng, lý do đổi trả và ảnh sản phẩm (nếu có lỗi). CSKH sẽ xác nhận và cấp mã đổi trả.',
      icon: FaCheckCircle,
      time: '1-2 giờ'
    },
    {
      step: 3,
      title: 'Đóng gói sản phẩm',
      description: 'Đóng gói sản phẩm cẩn thận, giữ nguyên tem mác, bao bì. Dán mã đổi trả lên bên ngoài kiện hàng.',
      icon: FaBox,
      time: '10-15 phút'
    },
    {
      step: 4,
      title: 'Gửi hàng hoàn trả',
      description: 'Gửi hàng theo địa chỉ được cung cấp. STYLA sẽ hỗ trợ phí ship đổi hàng lần đầu hoặc trường hợp lỗi từ nhà sản xuất.',
      icon: FaShippingFast,
      time: '3-5 ngày'
    },
    {
      step: 5,
      title: 'Kiểm tra & xử lý',
      description: 'Sau khi nhận hàng, chúng tôi sẽ kiểm tra sản phẩm và xử lý đổi hàng mới hoặc hoàn tiền trong 3-5 ngày làm việc.',
      icon: FaExchangeAlt,
      time: '3-5 ngày'
    }
  ];

  const refundMethods = [
    {
      method: 'Chuyển khoản ngân hàng',
      time: '1-3 ngày làm việc',
      description: 'Hoàn tiền trực tiếp vào tài khoản ngân hàng của bạn',
      icon: FaMoneyBillWave
    },
    {
      method: 'Thẻ tín dụng/Ghi nợ',
      time: '5-10 ngày làm việc',
      description: 'Hoàn tiền về thẻ thanh toán ban đầu (tùy thuộc ngân hàng)',
      icon: FaMoneyBillWave
    },
    {
      method: 'Ví điện tử',
      time: '3-5 ngày làm việc',
      description: 'Hoàn tiền vào ví MoMo, ZaloPay, VNPay đã sử dụng',
      icon: FaMoneyBillWave
    },
    {
      method: 'Store Credit',
      time: 'Ngay lập tức',
      description: 'Nhận mã giảm giá tương đương để mua hàng lần sau (bonus thêm 10%)',
      icon: FaMoneyBillWave
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
       <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaUndo className="text-5xl text-[#D9006C] mr-3" />
            <h1 className="text-5xl font-bold bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
              Chính Sách Đổi Trả & Hoàn Tiền
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            STYLA cam kết mang đến trải nghiệm mua sắm tốt nhất. Nếu bạn không hài lòng với sản phẩm, chúng tôi sẵn sàng hỗ trợ đổi trả trong vòng 30 ngày.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <Icon className="text-2xl mb-2" />
                    <span className="text-sm font-medium text-center">{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Key Points */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-2 h-10 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-4"></span>
                  Những Điểm Quan Trọng
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-100">
                    <FaClock className="text-5xl text-[#D9006C] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">30 Ngày</h3>
                    <p className="text-gray-600">Thời gian đổi trả sản phẩm</p>
                  </div>
                  <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-100">
                    <FaShippingFast className="text-5xl text-[#D9006C] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Miễn Phí</h3>
                    <p className="text-gray-600">Phí ship đổi hàng lần đầu</p>
                  </div>
                  <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-100">
                    <FaMoneyBillWave className="text-5xl text-[#D9006C] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">100%</h3>
                    <p className="text-gray-600">Hoàn tiền khi sản phẩm lỗi</p>
                  </div>
                </div>
              </div>

              {/* Quick Guide */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hướng Dẫn Nhanh</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <FaCheckCircle className="text-2xl text-green-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Sản phẩm bị lỗi từ nhà sản xuất</h3>
                      <p className="text-gray-600">→ Đổi mới hoàn toàn miễn phí hoặc hoàn tiền 100%, STYLA chịu phí vận chuyển</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <FaExchangeAlt className="text-2xl text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Đổi size hoặc màu sắc</h3>
                      <p className="text-gray-600">→ Miễn phí ship đổi lần đầu, sản phẩm phải còn nguyên tem mác</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <FaMoneyBillWave className="text-2xl text-purple-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Không vừa ý, muốn trả hàng</h3>
                      <p className="text-gray-600">→ Hoàn tiền trong vòng 30 ngày, khách hàng chịu phí ship hoàn trả</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conditions Section */}
          {activeSection === 'conditions' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <FaCheckCircle className="text-4xl text-green-600 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-800">Sản Phẩm Được Đổi Trả</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {eligibleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <FaCheckCircle className="text-green-600 shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <FaTimesCircle className="text-4xl text-red-600 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-800">Sản Phẩm Không Được Đổi Trả</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {nonEligibleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <FaTimesCircle className="text-red-600 shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Cases */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Trường Hợp Đặc Biệt</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Sản phẩm sale trên 50%
                    </h3>
                    <p className="text-gray-600 ml-4">Chỉ hỗ trợ đổi size/màu trong vòng 7 ngày, không hỗ trợ trả hàng hoàn tiền.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Sản phẩm đặt theo yêu cầu (custom)
                    </h3>
                    <p className="text-gray-600 ml-4">Không hỗ trợ đổi trả, trừ trường hợp lỗi từ nhà sản xuất.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Quà tặng kèm khuyến mãi
                    </h3>
                    <p className="text-gray-600 ml-4">Nếu trả hàng chính, quà tặng phải được trả lại cùng. Không nhận đổi trả riêng quà tặng.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Process Section */}
          {activeSection === 'process' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <span className="w-2 h-10 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-4"></span>
                  Quy Trình Đổi Trả (5 Bước)
                </h2>
                <div className="space-y-6">
                  {returnProcess.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="relative">
                        {index !== returnProcess.length - 1 && (
                          <div className="absolute left-8 top-20 w-0.5 h-full bg-linear-to-b from-[#D9006C] to-[#FF1A7A] opacity-30"></div>
                        )}
                        <div className="flex items-start space-x-6">
                          <div className="shrink-0">
                            <div className="w-16 h-16 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1 bg-pink-50 rounded-xl p-6 border border-pink-100">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                <Icon className="text-[#D9006C] mr-3" />
                                {step.title}
                              </h3>
                              <span className="text-sm font-semibold text-[#D9006C] bg-white px-3 py-1 rounded-full">
                                {step.time}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Lưu Ý Quan Trọng</h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <span className="text-[#D9006C] mr-3 mt-1 text-xl">•</span>
                    <span>Vui lòng chụp video quá trình mở hàng để làm bằng chứng trong trường hợp sản phẩm bị lỗi hoặc thiếu hàng.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#D9006C] mr-3 mt-1 text-xl">•</span>
                    <span>Sản phẩm đổi trả phải được đóng gói cẩn thận, tránh hư hỏng trong quá trình vận chuyển.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#D9006C] mr-3 mt-1 text-xl">•</span>
                    <span>Thời gian xử lý có thể kéo dài thêm trong các dịp lễ, Tết hoặc chương trình khuyến mãi lớn.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#D9006C] mr-3 mt-1 text-xl">•</span>
                    <span>STYLA có quyền từ chối đổi trả nếu sản phẩm không đáp ứng các điều kiện đã nêu.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Refund Section */}
          {activeSection === 'refund' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-2 h-10 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-4"></span>
                  Phương Thức Hoàn Tiền
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {refundMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index} className="p-6 bg-pink-50 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="text-4xl text-[#D9006C]" />
                          <span className="text-sm font-semibold text-white bg-linear-to-r from-[#D9006C] to-[#FF1A7A] px-3 py-1 rounded-full">
                            {method.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{method.method}</h3>
                        <p className="text-gray-600">{method.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Refund Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thời Gian Hoàn Tiền</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Sau khi STYLA nhận hàng</h3>
                      <p className="text-gray-600">Chúng tôi sẽ kiểm tra sản phẩm trong vòng 2-3 ngày làm việc</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Xác nhận hoàn tiền</h3>
                      <p className="text-gray-600">Bạn sẽ nhận email xác nhận về việc hoàn tiền đã được xử lý</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Nhận tiền</h3>
                      <p className="text-gray-600">Tiền sẽ được chuyển về tài khoản tùy theo phương thức thanh toán ban đầu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Amount */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Số Tiền Được Hoàn</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trường hợp</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số tiền hoàn</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phí vận chuyển</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-pink-50">
                        <td className="px-6 py-4 text-gray-700">Sản phẩm lỗi</td>
                        <td className="px-6 py-4 font-semibold text-green-600">100%</td>
                        <td className="px-6 py-4 text-gray-600">STYLA chịu phí</td>
                      </tr>
                      <tr className="hover:bg-pink-50">
                        <td className="px-6 py-4 text-gray-700">Giao sai hàng</td>
                        <td className="px-6 py-4 font-semibold text-green-600">100%</td>
                        <td className="px-6 py-4 text-gray-600">STYLA chịu phí</td>
                      </tr>
                      <tr className="hover:bg-pink-50">
                        <td className="px-6 py-4 text-gray-700">Không vừa ý (trong 30 ngày)</td>
                        <td className="px-6 py-4 font-semibold text-blue-600">100%</td>
                        <td className="px-6 py-4 text-gray-600">Khách hàng chịu phí</td>
                      </tr>
                      <tr className="hover:bg-pink-50">
                        <td className="px-6 py-4 text-gray-700">Đổi size/màu</td>
                        <td className="px-6 py-4 font-semibold text-blue-600">Đổi hàng mới</td>
                        <td className="px-6 py-4 text-gray-600">Miễn phí lần đầu</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Section */}
          {activeSection === 'shipping' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-2 h-10 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-4"></span>
                  Vận Chuyển Đổi Trả
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                        <FaCheckCircle className="text-white text-2xl" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Miễn Phí Ship</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Sản phẩm lỗi từ nhà sản xuất</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Giao sai sản phẩm</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Đổi size/màu lần đầu tiên</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Đơn hàng trên 2.000.000đ</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <FaShippingFast className="text-white text-2xl" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Khách Hàng Chịu Phí</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">→</span>
                        <span>Đổi trả do không vừa ý</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">→</span>
                        <span>Đổi size/màu từ lần thứ 2 trở đi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">→</span>
                        <span>Đơn hàng dưới 2.000.000đ</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">→</span>
                        <span>Sản phẩm sale/khuyến mãi</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Return Address */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Địa Chỉ Gửi Hàng Hoàn Trả</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Công ty:</strong> STYLA Fashion Vietnam</p>
                    <p><strong>Địa chỉ:</strong> 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                    <p><strong>Người nhận:</strong> Bộ phận Đổi Trả</p>
                    <p><strong>Số điện thoại:</strong> 0123 456 789</p>
                    <p className="text-red-600 font-semibold mt-4">
                      * Lưu ý: Vui lòng ghi rõ MÃ ĐƠN HÀNG và MÃ ĐỔI TRẢ lên bên ngoài kiện hàng
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Partners */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn Vị Vận Chuyển</h2>
                <p className="text-gray-600 mb-4">Bạn có thể sử dụng các đơn vị vận chuyển sau để gửi hàng hoàn trả:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Giao Hàng Nhanh', 'Giao Hàng Tiết Kiệm', 'VNPost', 'J&T Express'].map((partner, index) => (
                    <div key={index} className="p-4 bg-pink-50 rounded-xl border border-pink-100 text-center font-semibold text-gray-700">
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <FaUndo className="text-6xl mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Cần Hỗ Trợ Đổi Trả?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình đổi trả
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-[#D9006C] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Liên hệ CSKH
              </a>
              <a
                href="tel:+84123456789"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
              >
                Hotline: 0123 456 789
              </a>
              <a
                href="/faq"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/30 transition-all duration-300"
              >
                Xem FAQ
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
