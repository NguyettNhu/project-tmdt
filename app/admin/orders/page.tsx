'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2 } from 'lucide-react';
import { useOrders } from '@/lib/hooks';
import { ApiOrder } from '@/lib/api';

export default function OrdersPage() {
  const { orders: apiOrders, loading, error, refetch } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: number) => {
    const statusConfig: Record<number, { label: string; variant: 'warning' | 'default' | 'success' | 'destructive' }> = {
      0: { label: 'Chờ xác nhận', variant: 'warning' },
      1: { label: 'Đã xác nhận', variant: 'default' },
      2: { label: 'Đang giao', variant: 'default' },
      3: { label: 'Hoàn thành', variant: 'success' },
      4: { label: 'Đã hủy', variant: 'destructive' },
    };
    return statusConfig[status] || { label: 'Không rõ', variant: 'default' as const };
  };

  const getPaymentStatusBadge = (status: number) => {
    const statusConfig: Record<number, { label: string; variant: 'warning' | 'success' | 'destructive' }> = {
      0: { label: 'Chưa thanh toán', variant: 'warning' },
      1: { label: 'Đã thanh toán', variant: 'success' },
      2: { label: 'Hoàn tiền', variant: 'destructive' },
    };
    return statusConfig[status] || { label: 'Không rõ', variant: 'warning' as const };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredOrders = apiOrders.filter((order) => {
    const matchesSearch =
      order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: number, newStatus: number) => {
    // TODO: Implement API call to update order status
    console.log('Update order status:', orderId, newStatus);
  };

  const handleViewDetails = (order: ApiOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
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

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <Button onClick={refetch}>Thử lại</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý và theo dõi tất cả đơn hàng</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Danh sách đơn hàng ({apiOrders.length})</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Tìm kiếm theo mã đơn hoặc tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="0">Chờ xác nhận</option>
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đang giao</option>
                  <option value="3">Hoàn thành</option>
                  <option value="4">Đã hủy</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Không tìm thấy đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.order_status);
                    const paymentInfo = getPaymentStatusBadge(order.payment_status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.order_code}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-sm text-gray-500">{order.customer_email || order.customer_phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell className="font-medium">{formatPrice(order.total_money)}</TableCell>
                        <TableCell>
                          <Badge variant={paymentInfo.variant}>{paymentInfo.label}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(order)}
                            >
                              Chi tiết
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                  Cập nhật ⌄
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Thay đổi trạng thái</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {order.order_status === 0 && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 1)}>
                                    Xác nhận đơn hàng
                                  </DropdownMenuItem>
                                )}
                                {(order.order_status === 1 || order.order_status === 0) && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 2)}>
                                    Chuyển sang Đang giao
                                  </DropdownMenuItem>
                                )}
                                {order.order_status === 2 && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 3)}>
                                    Hoàn thành đơn hàng
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                {order.order_status !== 3 && order.order_status !== 4 && (
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(order.id, 4)}
                                    className="text-red-600"
                                  >
                                    Hủy đơn hàng
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.order_code}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết đơn hàng
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Thông tin khách hàng</h4>
                  <p><strong>Tên:</strong> {selectedOrder.customer_name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer_email || 'N/A'}</p>
                  <p><strong>SĐT:</strong> {selectedOrder.customer_phone || 'N/A'}</p>
                  <p><strong>Địa chỉ:</strong> {selectedOrder.customer_address || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Thông tin đơn hàng</h4>
                  <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.created_at)}</p>
                  <p><strong>Phương thức:</strong> {selectedOrder.payment_method || 'COD'}</p>
                  <p><strong>Trạng thái:</strong> <Badge variant={getStatusBadge(selectedOrder.order_status).variant}>{getStatusBadge(selectedOrder.order_status).label}</Badge></p>
                  <p><strong>Thanh toán:</strong> <Badge variant={getPaymentStatusBadge(selectedOrder.payment_status).variant}>{getPaymentStatusBadge(selectedOrder.payment_status).label}</Badge></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Chi tiết thanh toán</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span className="text-red-500">-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatPrice(selectedOrder.shipping_fee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-pink-600">{formatPrice(selectedOrder.total_money)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.note && (
                <div>
                  <h4 className="font-semibold mb-2">Ghi chú</h4>
                  <p className="text-gray-600">{selectedOrder.note}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
