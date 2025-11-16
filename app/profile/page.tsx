'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, saveCurrentUser, type User } from '@/lib/auth';
import { getOrdersByUserId, getOrderStats, getStatusLabel, getStatusColor, formatCurrency, formatDate, type Order } from '@/lib/orders';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { User as UserIcon, Mail, ShoppingBag, Store, LogOut, Edit, Package, Heart, Settings, Phone, MapPin, Calendar, TrendingUp, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'wishlist' | 'settings'>('info');
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        toast.error('Vui lòng đăng nhập để tiếp tục');
        router.push('/auth/login');
        return;
      }
      setUser(currentUser);
      setEditedUser(currentUser);
      
      // Load user orders
      const userOrders = getOrdersByUserId(currentUser.id);
      setOrders(userOrders);
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    toast.success('Đăng xuất thành công');
    router.push('/');
  };

  const handleSaveProfile = () => {
    if (!editedUser) return;
    
    // Validate phone number
    if (editedUser.phone && !/^[0-9]{10}$/.test(editedUser.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }
    
    // Save to localStorage
    saveCurrentUser(editedUser);
    setUser(editedUser);
    setIsEditing(false);
    toast.success('Cập nhật thông tin thành công');
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === orderFilter);

  const stats = user ? getOrderStats(user.id) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-purple-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.fullName.charAt(0)}
                </div>
              )}
              {/* Role Badge */}
              <div className={`absolute bottom-0 right-0 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                user.role === 'seller' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {user.role === 'seller' ? (
                  <span className="flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    Người bán
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    Người mua
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.fullName}</h1>
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              {user.phone && (
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </p>
              )}
              {user.joinDate && (
                <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Calendar className="w-4 h-4" />
                  Tham gia từ {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                </p>
              )}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  @{user.username}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✓ Tài khoản đã xác thực
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-purple-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Tổng đơn hàng</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.pending + stats.confirmed}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Đang xử lý</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Truck className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.shipping}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Đang giao</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.delivered}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Hoàn thành</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'info'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              Thông tin
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              Đơn hàng
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'wishlist'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="w-5 h-5" />
              Yêu thích
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-5 h-5" />
              Cài đặt
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'info' && editedUser && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-medium"
                      >
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={editedUser.fullName}
                      onChange={(e) => setEditedUser({...editedUser, fullName: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={editedUser.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={editedUser.phone || ''}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="0901234567"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={editedUser.username}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={editedUser.address || ''}
                      onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="123 Nguyễn Huệ"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phường/Xã
                    </label>
                    <input
                      type="text"
                      value={editedUser.ward || ''}
                      onChange={(e) => setEditedUser({...editedUser, ward: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Phường Bến Nghé"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      value={editedUser.district || ''}
                      onChange={(e) => setEditedUser({...editedUser, district: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Quận 1"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      value={editedUser.city || ''}
                      onChange={(e) => setEditedUser({...editedUser, city: e.target.value})}
                      disabled={!isEditing}
                      placeholder="TP. Hồ Chí Minh"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vai trò
                    </label>
                    <input
                      type="text"
                      value={editedUser.role === 'seller' ? 'Người bán' : 'Người mua'}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900"
                    />
                  </div>
                </div>

                {/* Full Address Display */}
                {(editedUser.address || editedUser.ward || editedUser.district || editedUser.city) && (
                  <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Địa chỉ đầy đủ:</p>
                        <p className="text-gray-700">
                          {[editedUser.address, editedUser.ward, editedUser.district, editedUser.city]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {user.role === 'seller' && (
                  <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      Tài khoản người bán
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Bạn có thể quản lý sản phẩm, đơn hàng và cửa hàng của mình
                    </p>
                    <Link
                      href="/seller/dashboard"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Đi tới Dashboard
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
                  
                  {/* Order Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                      onClick={() => setOrderFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        orderFilter === 'all'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tất cả ({orders.length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('pending')}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        orderFilter === 'pending'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Chờ xác nhận ({orders.filter(o => o.status === 'pending').length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('shipping')}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        orderFilter === 'shipping'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Đang giao ({orders.filter(o => o.status === 'shipping').length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('delivered')}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        orderFilter === 'delivered'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Hoàn thành ({orders.filter(o => o.status === 'delivered').length})
                    </button>
                  </div>
                </div>

                {filteredOrders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors">
                        {/* Order Header */}
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <p className="text-sm text-gray-600">Mã đơn hàng: <span className="font-bold text-gray-900">#{order.id}</span></p>
                            <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold border-2 ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                          <div className="space-y-4 mb-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-4">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 mb-1">{item.productName}</h4>
                                  <div className="flex gap-2 text-sm text-gray-600 mb-2">
                                    {item.size && <span>Size: {item.size}</span>}
                                    {item.color && <span>• Màu: {item.color}</span>}
                                    <span>• SL: {item.quantity}</span>
                                  </div>
                                  <p className="font-bold text-purple-600">{formatCurrency(item.price)}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Footer */}
                          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                              {order.trackingNumber && (
                                <p className="mb-1">
                                  <span className="font-semibold">Mã vận đơn:</span> {order.trackingNumber}
                                </p>
                              )}
                              {order.estimatedDelivery && (
                                <p>
                                  <span className="font-semibold">Dự kiến giao:</span> {new Date(order.estimatedDelivery).toLocaleDateString('vi-VN')}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 mb-1">Tổng thanh toán:</p>
                              <p className="text-2xl font-bold text-purple-600">{formatCurrency(order.totalAmount)}</p>
                            </div>
                          </div>

                          {/* Order Actions */}
                          <div className="mt-4 flex gap-3">
                            {order.status === 'delivered' && (
                              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                                Đánh giá
                              </button>
                            )}
                            {order.status === 'pending' && (
                              <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                                Hủy đơn
                              </button>
                            )}
                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                              Xem chi tiết
                            </button>
                            {order.status === 'delivered' && (
                              <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium">
                                Mua lại
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có đơn hàng</h3>
                    <p className="text-gray-600 mb-6">
                      {orderFilter === 'all' 
                        ? 'Bạn chưa có đơn hàng nào' 
                        : `Không có đơn hàng nào ở trạng thái "${getStatusLabel(orderFilter as 'pending')}"`}
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                    >
                      Mua sắm ngay
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="text-center py-12">
                <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Danh sách yêu thích trống</h3>
                <p className="text-gray-600 mb-6">Thêm sản phẩm yêu thích để xem lại sau</p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                >
                  Khám phá sản phẩm
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-1">Đổi mật khẩu</h3>
                    <p className="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-1">Thông báo</h3>
                    <p className="text-sm text-gray-600">Quản lý cài đặt thông báo email và push</p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-1">Quyền riêng tư</h3>
                    <p className="text-sm text-gray-600">Kiểm soát ai có thể xem thông tin của bạn</p>
                  </div>

                  <div className="p-4 border-2 border-red-200 rounded-xl hover:border-red-300 transition-colors cursor-pointer bg-red-50">
                    <h3 className="font-bold text-red-900 mb-1">Xóa tài khoản</h3>
                    <p className="text-sm text-red-600">Xóa vĩnh viễn tài khoản và dữ liệu của bạn</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
