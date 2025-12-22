
'use client';
// Định dạng ngày cho hiển thị đơn hàng gần đây
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomers } from '@/hooks/useCustomers';
import { useOrders } from '@/hooks/useOrders';
import { useAdminProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/orders';

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days'>('7days');

  const { products, loading: productsLoading } = useAdminProducts();
  const { orders, loading: ordersLoading } = useOrders();
  const { customers, loading: customersLoading } = useCustomers();

  const loading = productsLoading || ordersLoading || customersLoading;

  // Calculate real stats from API data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_money, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Filter orders by date
  const now = new Date();
  const filterOrdersByDate = (days: number) => {
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return orders.filter(order => new Date(order.created_at) >= cutoff);
  };

  const getFilteredStats = () => {
    let filteredOrders = orders;
    switch (timeFilter) {
      case 'today':
        filteredOrders = filterOrdersByDate(1);
        break;
      case '7days':
        filteredOrders = filterOrdersByDate(7);
        break;
      case '30days':
        filteredOrders = filterOrdersByDate(30);
        break;
    }
    return {
      revenue: filteredOrders.reduce((sum, o) => sum + o.total_money, 0),
      orderCount: filteredOrders.length,
    };
  };

  const filteredStats = getFilteredStats();

  // Get recent orders
  const recentOrders = orders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Get top products by sold count
  const topProducts = products
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const getStatusLabel = (status: number) => {
    const labels: Record<number, string> = {
      0: 'Chờ xác nhận',
      1: 'Đã xác nhận',
      2: 'Đang giao',
      3: 'Hoàn thành',
      4: 'Đã hủy',
    };
    return labels[status] || 'Không rõ';
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'bg-yellow-100 text-yellow-800';
      case 1:
        return 'bg-blue-100 text-blue-800';
      case 2:
        return 'bg-purple-100 text-purple-800';
      case 3:
        return 'bg-green-100 text-green-800';
      case 4:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <span className="ml-2">Đang tải dữ liệu...</span>
        </div>
      </AdminLayout>
    );
  }

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
              <CardTitle className="text-3xl">{formatCurrency(filteredStats.revenue)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Tổng: {formatCurrency(totalRevenue)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Đơn hàng</CardDescription>
              <CardTitle className="text-3xl">{filteredStats.orderCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Tổng: {totalOrders} đơn</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Khách hàng</CardDescription>
              <CardTitle className="text-3xl">{totalCustomers}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">Tổng số khách hàng đã đăng ký</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sản phẩm</CardDescription>
              <CardTitle className="text-3xl">{totalProducts}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Tổng số sản phẩm trong kho</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>Đơn hàng mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chưa có đơn hàng nào</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 last:border-0 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-semibold text-sm text-pink-600">{order.order_code}</span>
                          <span className="text-xs text-gray-400">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mt-1">
                          <span className="text-gray-900 text-sm font-medium truncate max-w-[120px]">{order.customer_name}</span>
                          <span className="text-xs text-gray-500">{order.customer_email || order.customer_phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-[120px]">
                        <span className="font-semibold text-pink-600">{formatCurrency(order.total_money)}</span>
                        <div className="flex gap-1 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.order_status)}`}>{getStatusLabel(order.order_status)}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${order.payment_status === 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.payment_status === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top sản phẩm theo số lượng bán</CardDescription>
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chưa có sản phẩm nào</p>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-gray-100 text-gray-700' :
                              index === 2 ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-50 text-gray-500'
                          }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">Đã bán: {product.sold}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-pink-600">{formatCurrency(product.sale_price || product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Tổng quan trạng thái đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((status) => {
                const count = orders.filter(o => o.order_status === status).length;
                return (
                  <div key={status} className={`p-4 rounded-lg ${getStatusColor(status)}`}>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm">{getStatusLabel(status)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
