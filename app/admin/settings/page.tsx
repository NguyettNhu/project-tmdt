'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WebsiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  paymentMethods: {
    cod: boolean;
    banking: boolean;
    momo: boolean;
    vnpay: boolean;
  };
  shippingFee: string;
  freeShippingThreshold: string;
  taxRate: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    siteName: 'Fashion Store',
    siteDescription: 'Cửa hàng thời trang trực tuyến uy tín',
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico',
    contactEmail: 'contact@fashionstore.com',
    contactPhone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    facebook: 'https://facebook.com/fashionstore',
    instagram: 'https://instagram.com/fashionstore',
    twitter: 'https://twitter.com/fashionstore',
    paymentMethods: {
      cod: true,
      banking: true,
      momo: true,
      vnpay: false,
    },
    shippingFee: '30000',
    freeShippingThreshold: '500000',
    taxRate: '10',
    currency: 'VND',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof WebsiteSettings, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
    setHasChanges(true);
  };

  const handlePaymentMethodChange = (method: keyof WebsiteSettings['paymentMethods']) => {
    setSettings({
      ...settings,
      paymentMethods: {
        ...settings.paymentMethods,
        [method]: !settings.paymentMethods[method],
      },
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Đã lưu cài đặt thành công!');
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc muốn khôi phục cài đặt mặc định?')) {
      // Reset to default settings
      setHasChanges(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 mt-1">Quản lý các cài đặt hệ thống</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              Khôi phục mặc định
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              💾 Lưu thay đổi
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
                <CardDescription>Cài đặt thông tin cơ bản của website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Tên website</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Ngôn ngữ</Label>
                    <select
                      id="language"
                      value={settings.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Mô tả website</Label>
                  <textarea
                    id="siteDescription"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={settings.logo}
                      onChange={(e) => handleInputChange('logo', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      value={settings.favicon}
                      onChange={(e) => handleInputChange('favicon', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
                <CardDescription>Thông tin liên hệ hiển thị trên website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Số điện thoại</Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Mạng xã hội</CardTitle>
                <CardDescription>Liên kết đến các trang mạng xã hội</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={settings.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment & Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Thanh toán & Vận chuyển</CardTitle>
                <CardDescription>Cài đặt phương thức thanh toán và phí vận chuyển</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-3 block">Phương thức thanh toán</Label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.cod}
                        onChange={() => handlePaymentMethodChange('cod')}
                        className="mr-2"
                      />
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.banking}
                        onChange={() => handlePaymentMethodChange('banking')}
                        className="mr-2"
                      />
                      <span>Chuyển khoản ngân hàng</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.momo}
                        onChange={() => handlePaymentMethodChange('momo')}
                        className="mr-2"
                      />
                      <span>Ví MoMo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.vnpay}
                        onChange={() => handlePaymentMethodChange('vnpay')}
                        className="mr-2"
                      />
                      <span>VNPay</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingFee">Phí vận chuyển (₫)</Label>
                    <Input
                      id="shippingFee"
                      type="number"
                      value={settings.shippingFee}
                      onChange={(e) => handleInputChange('shippingFee', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Miễn phí ship từ (₫)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => handleInputChange('freeShippingThreshold', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Settings Column */}
          <div className="space-y-6">
            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                  <select
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="VND">₫ - VND</option>
                    <option value="USD">$ - USD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
                    <option value="Asia/Bangkok">GMT+7 (Bangkok)</option>
                    <option value="Asia/Singapore">GMT+8 (Singapore)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Thuế VAT (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security & Access */}
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật & Truy cập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chế độ bảo trì</p>
                    <p className="text-sm text-gray-500">Tạm khóa truy cập website</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cho phép đăng ký</p>
                    <p className="text-sm text-gray-500">Người dùng có thể tạo tài khoản</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                    className="w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Xác thực email</p>
                    <p className="text-sm text-gray-500">Yêu cầu xác thực email khi đăng ký</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                    className="w-4 h-4"
                  />
                </label>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  🔄 Xóa cache
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 Xuất dữ liệu
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📥 Nhập dữ liệu
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  🗑️ Xóa dữ liệu cũ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button (sticky bottom) */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
              <p className="text-sm text-gray-600">Bạn có thay đổi chưa được lưu</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setHasChanges(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSave}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
