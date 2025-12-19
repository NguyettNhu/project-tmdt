'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Camera,
  Save,
  Key,
  Bell,
  Eye,
  EyeOff,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { getImageUrl } from '@/lib/api';

interface AdminProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  role: string;
  joinDate: string;
  lastLogin: string;
}

export default function AdminProfilePage() {
  const { admin, loading: authLoading } = useAdminAuth();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Chuyển đổi admin data thành profile format
  useEffect(() => {
    if (admin) {
      setProfile({
        id: admin.id,
        fullName: admin.name,
        email: admin.email,
        phone: '',  // API chưa có field này
        address: '', // API chưa có field này
        avatar: admin.image,
        role: admin.role || 'Admin',
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });
    }
  }, [admin]);

  const handleSaveProfile = () => {
    // TODO: Implement API call to update profile
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    // TODO: Implement API call to change password
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (authLoading || !profile) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <span className="ml-2">Đang tải thông tin...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Cập nhật thành công!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-pink-100">
                      <AvatarImage src={profile.avatar ? getImageUrl(profile.avatar, 'user') : undefined} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                        {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors shadow-lg">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mt-4">{profile.fullName}</h2>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mt-2">
                    {profile.role}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{profile.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Tham gia: {formatDate(profile.joinDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Xác thực 2 lớp</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Đã bật</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Đăng nhập gần nhất</span>
                  <span className="text-xs text-gray-500">{profile.lastLogin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mật khẩu</span>
                  <span className="text-xs text-gray-500">Cập nhật 30 ngày trước</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Forms */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Thông tin cá nhân
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'password'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Key className="w-4 h-4 inline mr-2" />
                Đổi mật khẩu
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bell className="w-4 h-4 inline mr-2" />
                Thông báo
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Thông tin cá nhân</CardTitle>
                      <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Vai trò</Label>
                      <Input
                        id="role"
                        value={profile.role}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:bg-gray-50"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSaveProfile} className="bg-pink-500 hover:bg-pink-600">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu thay đổi
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Hủy
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                  <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu mới"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu mới"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleChangePassword} className="bg-pink-500 hover:bg-pink-600">
                      <Key className="w-4 h-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt thông báo</CardTitle>
                  <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Đơn hàng mới</p>
                          <p className="text-xs text-gray-500">Nhận email khi có đơn hàng mới</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Đánh giá sản phẩm</p>
                          <p className="text-xs text-gray-500">Nhận email khi có đánh giá mới</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Sản phẩm hết hàng</p>
                          <p className="text-xs text-gray-500">Nhận email khi sản phẩm sắp hết</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Báo cáo hàng tuần</p>
                          <p className="text-xs text-gray-500">Nhận báo cáo tổng hợp mỗi tuần</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Push Notification</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Thông báo trên trình duyệt</p>
                          <p className="text-xs text-gray-500">Nhận thông báo realtime</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Âm thanh thông báo</p>
                          <p className="text-xs text-gray-500">Phát âm thanh khi có thông báo</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      <Save className="w-4 h-4 mr-2" />
                      Lưu cài đặt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
