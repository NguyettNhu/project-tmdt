'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { getOrdersByUserId, getOrderStats, getStatusLabel, getStatusColor, formatCurrency, formatDate, type Order } from '@/lib/orders';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { User as UserIcon, Mail, ShoppingBag, Store, LogOut, Edit, Package, Heart, Settings, Phone, MapPin, Calendar, TrendingUp, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

// Define the Customer type for editing
interface EditableCustomer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  image: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { customer, isAuthenticated, loading: authLoading, logout, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'wishlist' | 'settings'>('info');
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<EditableCustomer | null>(null);
  const [settingsView, setSettingsView] = useState<'main' | 'password' | 'notifications' | 'privacy' | 'delete'>('main');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailOrders: true,
    emailPromotions: true,
    emailNewsletter: false,
    pushOrders: true,
    pushPromotions: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showOrders: false
  });

  useEffect(() => {
    const loadUserData = () => {
      if (authLoading) return; // Wait for auth to load
      
      if (!isAuthenticated || !customer) {
        toast.error('Vui lòng đăng nhập để tiếp tục');
        router.push('/auth/login');
        return;
      }
      
      setEditedCustomer({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        image: customer.image,
      });
      
      // Load user orders (mock for now - can be connected to API later)
      const userOrders = getOrdersByUserId(customer.id.toString());
      setOrders(userOrders);
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, [router, customer, isAuthenticated, authLoading]);

  const handleLogout = async () => {
    await logout();
    toast.success('Đăng xuất thành công');
    router.push('/');
  };

  const handleSaveProfile = async () => {
    if (!editedCustomer) return;
    
    // Validate phone number
    if (editedCustomer.phone && !/^[0-9]{10}$/.test(editedCustomer.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }
    
    // Call API to update profile
    const result = await updateProfile({
      name: editedCustomer.name,
      phone: editedCustomer.phone,
      address: editedCustomer.address,
    });
    
    if (result.success) {
      setIsEditing(false);
      toast.success('Cập nhật thông tin thành công');
    } else {
      toast.error(result.message);
    }
  };

  const handleCancelEdit = () => {
    if (customer) {
      setEditedCustomer({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        image: customer.image,
      });
    }
    setIsEditing(false);
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === orderFilter);

  const stats = customer ? getOrderStats(customer.id.toString()) : null;

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {customer.image ? (
                <Image
                  src={getImageUrl(customer.image, 'customer')}
                  alt={customer.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-purple-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                  {customer.name.charAt(0)}
                </div>
              )}
              {/* Customer Badge */}
              <div className="absolute bottom-0 right-0 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg bg-green-500">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  Khách hàng
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{customer.name}</h1>
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                <Mail className="w-4 h-4" />
                {customer.email}
              </p>
              {customer.phone && (
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </p>
              )}
              {customer.address && (
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-4">
                  <MapPin className="w-4 h-4" />
                  {customer.address}
                </p>
              )}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
            {activeTab === 'info' && editedCustomer && (
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
                      value={editedCustomer.name}
                      onChange={(e) => setEditedCustomer({...editedCustomer, name: e.target.value})}
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
                      value={editedCustomer.email}
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
                      value={editedCustomer.phone || ''}
                      onChange={(e) => setEditedCustomer({...editedCustomer, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="0901234567"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={editedCustomer.address || ''}
                      onChange={(e) => setEditedCustomer({...editedCustomer, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 focus:border-purple-500 focus:outline-none`}
                    />
                  </div>
                </div>

                {/* Full Address Display */}
                {editedCustomer.address && (
                  <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Địa chỉ:</p>
                        <p className="text-gray-700">{editedCustomer.address}</p>
                      </div>
                    </div>
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
                {settingsView === 'main' ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h2>
                    
                    <div className="space-y-4">
                      <div 
                        onClick={() => setSettingsView('password')}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Đổi mật khẩu
                            </h3>
                            <p className="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                          </div>
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div 
                        onClick={() => setSettingsView('notifications')}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                              Thông báo
                            </h3>
                            <p className="text-sm text-gray-600">Quản lý cài đặt thông báo email và push</p>
                          </div>
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div 
                        onClick={() => setSettingsView('privacy')}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Quyền riêng tư
                            </h3>
                            <p className="text-sm text-gray-600">Kiểm soát ai có thể xem thông tin của bạn</p>
                          </div>
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div 
                        onClick={() => setSettingsView('delete')}
                        className="p-4 border-2 border-red-200 rounded-xl hover:border-red-300 transition-colors cursor-pointer bg-red-50 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-red-900 mb-1 flex items-center gap-2">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Xóa tài khoản
                            </h3>
                            <p className="text-sm text-red-600">Xóa vĩnh viễn tài khoản và dữ liệu của bạn</p>
                          </div>
                          <svg className="w-6 h-6 text-red-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                ) : settingsView === 'password' ? (
                  <div>
                    <button
                      onClick={() => setSettingsView('main')}
                      className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Quay lại
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Đổi mật khẩu</h2>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-blue-800 flex items-start gap-2">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mật khẩu hiện tại *
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mật khẩu mới *
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                          placeholder="Nhập mật khẩu mới"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Xác nhận mật khẩu mới *
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>

                      <button
                        onClick={() => {
                          toast.success('Đổi mật khẩu thành công');
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          setSettingsView('main');
                        }}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                      >
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </div>
                ) : settingsView === 'notifications' ? (
                  <div>
                    <button
                      onClick={() => setSettingsView('main')}
                      className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Quay lại
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt thông báo</h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Thông báo Email</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900">Đơn hàng</p>
                              <p className="text-sm text-gray-600">Nhận thông báo về trạng thái đơn hàng</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.emailOrders}
                                onChange={(e) => setNotificationSettings({...notificationSettings, emailOrders: e.target.checked})}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900">Khuyến mãi</p>
                              <p className="text-sm text-gray-600">Nhận thông báo về ưu đãi và giảm giá</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.emailPromotions}
                                onChange={(e) => setNotificationSettings({...notificationSettings, emailPromotions: e.target.checked})}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900">Bản tin</p>
                              <p className="text-sm text-gray-600">Nhận bản tin hàng tuần về sản phẩm mới</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.emailNewsletter}
                                onChange={(e) => setNotificationSettings({...notificationSettings, emailNewsletter: e.target.checked})}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Thông báo Push</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900">Đơn hàng</p>
                              <p className="text-sm text-gray-600">Thông báo realtime về đơn hàng</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.pushOrders}
                                onChange={(e) => setNotificationSettings({...notificationSettings, pushOrders: e.target.checked})}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900">Khuyến mãi</p>
                              <p className="text-sm text-gray-600">Thông báo về flash sale và ưu đãi</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.pushPromotions}
                                onChange={(e) => setNotificationSettings({...notificationSettings, pushPromotions: e.target.checked})}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          toast.success('Cài đặt thông báo đã được lưu');
                          setSettingsView('main');
                        }}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                      >
                        Lưu cài đặt
                      </button>
                    </div>
                  </div>
                ) : settingsView === 'privacy' ? (
                  <div>
                    <button
                      onClick={() => setSettingsView('main')}
                      className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Quay lại
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quyền riêng tư</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Hiển thị hồ sơ công khai</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.profileVisible}
                            onChange={(e) => setPrivacySettings({...privacySettings, profileVisible: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Hiển thị email</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem email của bạn</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.showEmail}
                            onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Hiển thị số điện thoại</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem số điện thoại</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.showPhone}
                            onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Hiển thị lịch sử mua hàng</p>
                          <p className="text-sm text-gray-600">Cho phép người khác xem đơn hàng của bạn</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.showOrders}
                            onChange={(e) => setPrivacySettings({...privacySettings, showOrders: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <button
                        onClick={() => {
                          toast.success('Cài đặt quyền riêng tư đã được lưu');
                          setSettingsView('main');
                        }}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                      >
                        Lưu cài đặt
                      </button>
                    </div>
                  </div>
                ) : settingsView === 'delete' ? (
                  <div>
                    <button
                      onClick={() => setSettingsView('main')}
                      className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Quay lại
                    </button>

                    <h2 className="text-2xl font-bold text-red-900 mb-6">Xóa tài khoản</h2>

                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h3 className="font-bold text-red-900 mb-2">Cảnh báo: Hành động này không thể hoàn tác!</h3>
                          <p className="text-sm text-red-800 leading-relaxed">
                            Khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn bao gồm:
                          </p>
                          <ul className="mt-3 space-y-1 text-sm text-red-800">
                            <li>• Thông tin cá nhân và địa chỉ</li>
                            <li>• Lịch sử đơn hàng</li>
                            <li>• Danh sách yêu thích</li>
                            <li>• Đánh giá và nhận xét</li>
                            <li>• Tất cả dữ liệu liên quan khác</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Để xác nhận, vui lòng nhập mật khẩu của bạn:
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                          placeholder="Nhập mật khẩu"
                        />
                      </div>

                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="confirmDelete"
                          className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="confirmDelete" className="text-sm text-gray-700">
                          Tôi hiểu rằng hành động này không thể hoàn tác và tất cả dữ liệu của tôi sẽ bị xóa vĩnh viễn.
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSettingsView('main')}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                      >
                        Hủy bỏ
                      </button>
                      <button
                        onClick={() => {
                          toast.error('Chức năng này đang được phát triển');
                        }}
                        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                      >
                        Xóa tài khoản
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
