'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { FaRuler, FaTshirt, FaVest, FaShoePrints, FaInfoCircle } from 'react-icons/fa';

type ProductCategory = 'tops' | 'bottoms' | 'dresses' | 'shoes';

export default function SizeGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tops');
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  const categories = [
    { id: 'tops' as ProductCategory, name: 'Áo', icon: FaTshirt },
    { id: 'bottoms' as ProductCategory, name: 'Quần', icon: FaVest },
    { id: 'dresses' as ProductCategory, name: 'Váy & Đầm', icon: FaTshirt },
    { id: 'shoes' as ProductCategory, name: 'Giày dép', icon: FaShoePrints }
  ];

  // Size data in centimeters
  const sizeData = {
    tops: [
      { size: 'XS', chest: '80-84', waist: '62-66', shoulder: '38', sleeve: '58', length: '62' },
      { size: 'S', chest: '84-88', waist: '66-70', shoulder: '40', sleeve: '60', length: '64' },
      { size: 'M', chest: '88-92', waist: '70-74', shoulder: '42', sleeve: '62', length: '66' },
      { size: 'L', chest: '92-96', waist: '74-78', shoulder: '44', sleeve: '64', length: '68' },
      { size: 'XL', chest: '96-100', waist: '78-82', shoulder: '46', sleeve: '66', length: '70' },
      { size: 'XXL', chest: '100-106', waist: '82-88', shoulder: '48', sleeve: '68', length: '72' }
    ],
    bottoms: [
      { size: 'XS', waist: '62-66', hips: '84-88', inseam: '75', length: '98' },
      { size: 'S', waist: '66-70', hips: '88-92', inseam: '76', length: '100' },
      { size: 'M', waist: '70-74', hips: '92-96', inseam: '77', length: '102' },
      { size: 'L', waist: '74-78', hips: '96-100', inseam: '78', length: '104' },
      { size: 'XL', waist: '78-82', hips: '100-104', inseam: '79', length: '106' },
      { size: 'XXL', waist: '82-88', hips: '104-110', inseam: '80', length: '108' }
    ],
    dresses: [
      { size: 'XS', chest: '80-84', waist: '62-66', hips: '84-88', length: '90' },
      { size: 'S', chest: '84-88', waist: '66-70', hips: '88-92', length: '92' },
      { size: 'M', chest: '88-92', waist: '70-74', hips: '92-96', length: '94' },
      { size: 'L', chest: '92-96', waist: '74-78', hips: '96-100', length: '96' },
      { size: 'XL', chest: '96-100', waist: '78-82', hips: '100-104', length: '98' },
      { size: 'XXL', chest: '100-106', waist: '82-88', hips: '104-110', length: '100' }
    ],
    shoes: [
      { size: '35', shoeLength: '22.5' },
      { size: '36', shoeLength: '23.0' },
      { size: '37', shoeLength: '23.5' },
      { size: '38', shoeLength: '24.0' },
      { size: '39', shoeLength: '24.5' },
      { size: '40', shoeLength: '25.0' },
      { size: '41', shoeLength: '25.5' },
      { size: '42', shoeLength: '26.0' },
      { size: '43', shoeLength: '26.5' },
      { size: '44', shoeLength: '27.0' }
    ]
  };

  const convertToInch = (cm: string): string => {
    if (cm.includes('-')) {
      const [min, max] = cm.split('-');
      const minInch = (parseFloat(min) / 2.54).toFixed(1);
      const maxInch = (parseFloat(max) / 2.54).toFixed(1);
      return `${minInch}-${maxInch}`;
    }
    return (parseFloat(cm) / 2.54).toFixed(1);
  };

  const formatValue = (value: string | undefined): string => {
    if (!value) return '-';
    return unit === 'inch' ? convertToInch(value) : value;
  };

  const measurementInstructions = {
    tops: [
      { title: 'Vòng ngực', description: 'Đo vòng quanh phần rộng nhất của ngực, giữ thước ngang' },
      { title: 'Vòng eo', description: 'Đo vòng quanh phần hẹp nhất của eo' },
      { title: 'Vai', description: 'Đo từ điểm nối vai bên trái sang bên phải' },
      { title: 'Tay áo', description: 'Đo từ vai xuống cổ tay qua khuỷu tay' },
      { title: 'Dài áo', description: 'Đo từ điểm cao nhất của vai xuống gấu áo' }
    ],
    bottoms: [
      { title: 'Vòng eo', description: 'Đo vòng quanh phần hẹp nhất của eo' },
      { title: 'Vòng mông', description: 'Đo vòng quanh phần rộng nhất của mông' },
      { title: 'Độ dài trong', description: 'Đo từ háng xuống mắt cá chân' },
      { title: 'Dài quần', description: 'Đo từ eo xuống gấu quần' }
    ],
    dresses: [
      { title: 'Vòng ngực', description: 'Đo vòng quanh phần rộng nhất của ngực' },
      { title: 'Vòng eo', description: 'Đo vòng quanh phần hẹp nhất của eo' },
      { title: 'Vòng mông', description: 'Đo vòng quanh phần rộng nhất của mông' },
      { title: 'Dài váy', description: 'Đo từ vai xuống gấu váy' }
    ],
    shoes: [
      { title: 'Chiều dài bàn chân', description: 'Đo từ gót đến đầu ngón chân dài nhất' },
      { title: 'Lưu ý', description: 'Đo vào buổi chiều khi bàn chân hơi phồng lên' }
    ]
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
      
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaRuler className="text-5xl text-[#D9006C] mr-3" />
            <h1 className="text-5xl font-bold bg-linear-to-r from-[#D9006C] to-[#FF1A7A] bg-clip-text text-transparent">
              Hướng Dẫn Chọn Size
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tìm size hoàn hảo cho bạn với bảng size chi tiết và hướng dẫn đo cơ thể
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category & Unit Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Tabs */}
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Chọn danh mục
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                          selectedCategory === category.id
                            ? 'bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white shadow-lg scale-105'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md'
                        }`}
                      >
                        <Icon className="text-xl" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unit Toggle */}
              <div>
                <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Đơn vị đo
                </h2>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      unit === 'cm'
                        ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => setUnit('inch')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      unit === 'inch'
                        ? 'bg-linear-to-r from-[#D9006C] to-[#FF1A7A] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    INCH
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Size Chart */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Bảng Size {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Size
                    </th>
                    {selectedCategory === 'tops' && (
                      <>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng ngực ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng eo ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vai ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Tay áo ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Dài áo ({unit})
                        </th>
                      </>
                    )}
                    {selectedCategory === 'bottoms' && (
                      <>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng eo ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng mông ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Độ dài trong ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Dài quần ({unit})
                        </th>
                      </>
                    )}
                    {selectedCategory === 'dresses' && (
                      <>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng ngực ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng eo ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Vòng mông ({unit})
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Dài váy ({unit})
                        </th>
                      </>
                    )}
                    {selectedCategory === 'shoes' && (
                      <>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Chiều dài bàn chân ({unit})
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sizeData[selectedCategory].map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-pink-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white font-bold rounded-lg">
                          {item.size}
                        </span>
                      </td>
                      {selectedCategory === 'tops' && (
                        <>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('chest' in item ? item.chest : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('waist' in item ? item.waist : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('shoulder' in item ? item.shoulder : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('sleeve' in item ? item.sleeve : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('length' in item ? item.length : undefined)}
                          </td>
                        </>
                      )}
                      {selectedCategory === 'bottoms' && (
                        <>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('waist' in item ? item.waist : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('hips' in item ? item.hips : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('inseam' in item ? item.inseam : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('length' in item ? item.length : undefined)}
                          </td>
                        </>
                      )}
                      {selectedCategory === 'dresses' && (
                        <>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('chest' in item ? item.chest : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('waist' in item ? item.waist : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('hips' in item ? item.hips : undefined)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {formatValue('length' in item ? item.length : undefined)}
                          </td>
                        </>
                      )}
                      {selectedCategory === 'shoes' && (
                        <td className="px-6 py-4 text-center text-gray-700 font-medium">
                          {formatValue('shoeLength' in item ? item.shoeLength : undefined)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <FaInfoCircle className="text-3xl text-[#D9006C] mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Hướng Dẫn Đo Size
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {measurementInstructions[selectedCategory].map((instruction, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-pink-50 rounded-xl border border-pink-100"
                >
                  <div className="shrink-0 w-8 h-8 bg-linear-to-br from-[#D9006C] to-[#FF1A7A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {instruction.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {instruction.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-3"></span>
                Mẹo Chọn Size
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Nếu bạn ở giữa hai size, chọn size lớn hơn để thoải mái</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Đo cơ thể khi mặc áo lót thông thường để chính xác nhất</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Giữ thước dây ngang và vừa khít, không quá chật</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Nhờ người khác giúp đo để có kết quả chính xác hơn</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-linear-to-b from-[#D9006C] to-[#FF1A7A] rounded-full mr-3"></span>
                Lưu Ý Quan Trọng
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Size có thể khác nhau tùy theo kiểu dáng và chất liệu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Kiểm tra thông tin size cụ thể trên từng trang sản phẩm</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Chất liệu co giãn có thể vừa với nhiều size hơn</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D9006C] mr-2 mt-1">•</span>
                  <span>Liên hệ CSKH nếu cần tư vấn thêm về size</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-linear-to-r from-[#D9006C] to-[#FF1A7A] rounded-2xl shadow-xl p-8 text-center text-white">
            <FaRuler className="text-5xl mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Vẫn Chưa Chắc Chắn Về Size?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Đừng lo lắng! Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng tư vấn size phù hợp nhất cho bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-[#D9006C] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Liên hệ tư vấn
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
    </div>
  );
}
