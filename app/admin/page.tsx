'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days'>('7days');

  // Mock data
  const stats = {
    revenue: {
      today: '25,430,000₫',
      '7days': '178,500,000₫',
      '30days': '756,200,000₫',
    },
    orders: {
      today: 12,
      '7days': 89,
      '30days': 342,
    },
    newUsers: {
      today: 5,
      '7days': 34,
      '30days': 128,
    },
    products: 156,
  };

  const recentOrders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', total: '1,250,000₫', status: 'Chờ xác nhận' },
    { id: 'DH002', customer: 'Trần Thị B', total: '850,000₫', status: 'Đang giao' },
    { id: 'DH003', customer: 'Lê Văn C', total: '2,150,000₫', status: 'Hoàn thành' },
    { id: 'DH004', customer: 'Phạm Thị D', total: '650,000₫', status: 'Chờ xác nhận' },
    { id: 'DH005', customer: 'Hoàng Văn E', total: '1,800,000₫', status: 'Đang giao' },
  ];

  const topProducts = [
    { name: 'Áo thun basic', sold: 245, revenue: '24,500,000₫' },
    { name: 'Quần jean slim fit', sold: 189, revenue: '37,800,000₫' },
    { name: 'Giày sneaker', sold: 156, revenue: '46,800,000₫' },
    { name: 'Túi xách nữ', sold: 134, revenue: '26,800,000₫' },
    { name: 'Mũ lưỡi trai', sold: 98, revenue: '9,800,000₫' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chờ xác nhận':
        return 'bg-yellow-100 text-yellow-800';
      case 'Đang giao':
        return 'bg-blue-100 text-blue-800';
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with filters */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={timeFilter === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFilter('today')}
            >
              Hôm nay
            </Button>
            <Button
              variant={timeFilter === '7days' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFilter('7days')}
            >
              7 ngày
            </Button>
            <Button
              variant={timeFilter === '30days' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFilter('30days')}
            >
              30 ngày
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Doanh thu</CardDescription>
              <CardTitle className="text-3xl">{stats.revenue[timeFilter]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">↑ 12.5% so với kỳ trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Đơn hàng</CardDescription>
              <CardTitle className="text-3xl">{stats.orders[timeFilter]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">↑ 8.2% so với kỳ trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Người dùng mới</CardDescription>
              <CardTitle className="text-3xl">{stats.newUsers[timeFilter]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">↑ 15.3% so với kỳ trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tổng sản phẩm</CardDescription>
              <CardTitle className="text-3xl">{stats.products}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Đang hoạt động</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>5 đơn hàng mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.total}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Xem tất cả đơn hàng
              </Button>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm trong {timeFilter === 'today' ? 'hôm nay' : timeFilter === '7days' ? '7 ngày' : '30 ngày'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Đã bán: {product.sold}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
