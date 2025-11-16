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
  DialogFooter,
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

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  status: OrderStatus;
  items: number;
}

const mockOrders: Order[] = [
  { id: 'DH001', customer: 'Nguyễn Văn A', email: 'nguyenvana@email.com', date: '2024-11-15', total: '1,250,000₫', status: 'pending', items: 3 },
  { id: 'DH002', customer: 'Trần Thị B', email: 'tranthib@email.com', date: '2024-11-15', total: '850,000₫', status: 'shipping', items: 2 },
  { id: 'DH003', customer: 'Lê Văn C', email: 'levanc@email.com', date: '2024-11-14', total: '2,150,000₫', status: 'completed', items: 5 },
  { id: 'DH004', customer: 'Phạm Thị D', email: 'phamthid@email.com', date: '2024-11-14', total: '650,000₫', status: 'pending', items: 1 },
  { id: 'DH005', customer: 'Hoàng Văn E', email: 'hoangvane@email.com', date: '2024-11-13', total: '1,800,000₫', status: 'confirmed', items: 4 },
  { id: 'DH006', customer: 'Vũ Thị F', email: 'vuthif@email.com', date: '2024-11-13', total: '950,000₫', status: 'shipping', items: 2 },
  { id: 'DH007', customer: 'Đỗ Văn G', email: 'dovang@email.com', date: '2024-11-12', total: '1,500,000₫', status: 'completed', items: 3 },
  { id: 'DH008', customer: 'Mai Thị H', email: 'maithih@email.com', date: '2024-11-12', total: '750,000₫', status: 'cancelled', items: 2 },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      pending: { label: 'Chờ xác nhận', variant: 'warning' as const },
      confirmed: { label: 'Đã xác nhận', variant: 'default' as const },
      shipping: { label: 'Đang giao', variant: 'default' as const },
      completed: { label: 'Hoàn thành', variant: 'success' as const },
      cancelled: { label: 'Đã hủy', variant: 'destructive' as const },
    };
    return statusConfig[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
        
          <p className="text-gray-500 mt-1">Quản lý và theo dõi tất cả đơn hàng</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Danh sách đơn hàng</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Tìm kiếm theo mã đơn hoặc tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
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
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
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
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items} sản phẩm</TableCell>
                        <TableCell className="font-medium">{order.total}</TableCell>
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
                                {order.status === 'pending' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'confirmed')}>
                                    Xác nhận đơn hàng
                                  </DropdownMenuItem>
                                )}
                                {(order.status === 'confirmed' || order.status === 'pending') && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'shipping')}>
                                    Chuyển sang Đang giao
                                  </DropdownMenuItem>
                                )}
                                {order.status === 'shipping' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'completed')}>
                                    Hoàn thành đơn hàng
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleStatusChange(order.id, 'cancelled')}
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
            <DialogTitle>Chi tiết đơn hàng {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn hàng
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày đặt</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <Badge variant={getStatusBadge(selectedOrder.status).variant}>
                    {getStatusBadge(selectedOrder.status).label}
                  </Badge>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Sản phẩm</p>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Áo thun basic (x2)</span>
                    <span>400,000₫</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Quần jean (x1)</span>
                    <span>850,000₫</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span>{selectedOrder.total}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
