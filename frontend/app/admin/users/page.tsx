'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCustomers } from '@/hooks/useCustomers';
import { ApiCustomer, getImageUrl } from '@/lib/api';
import { Construction, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function UsersPage() {
  const { customers: apiCustomers, loading, error, refetch } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<ApiCustomer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleToggleCustomerStatus = (id: number) => {
    // TODO: Implement API call to toggle customer status
    console.log('Toggle customer status:', id);
  };

  const handleViewCustomerDetail = (customer: ApiCustomer) => {
    setSelectedUser(customer);
    setIsDetailDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredCustomers = apiCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p className="text-gray-500 mt-1">Quản lý khách hàng và nhân viên</p>
        </div>

        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customers">Khách hàng ({apiCustomers.length})</TabsTrigger>
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Danh sách khách hàng</CardTitle>
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          Không tìm thấy khách hàng nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                              {customer.image ? (
                                <img
                                  src={getImageUrl(customer.image, 'customer')}
                                  alt={customer.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-gray-500 text-lg">
                                  {customer.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{customer.phone || 'N/A'}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{customer.address || 'N/A'}</TableCell>
                          <TableCell>{formatDate(customer.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={customer.status === 1 ? 'success' : 'destructive'}>
                              {customer.status === 1 ? 'Hoạt động' : 'Đã khóa'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewCustomerDetail(customer)}
                              >
                                Chi tiết
                              </Button>
                              <Button
                                size="sm"
                                variant={customer.status === 1 ? 'destructive' : 'default'}
                                onClick={() => handleToggleCustomerStatus(customer.id)}
                              >
                                {customer.status === 1 ? 'Khóa' : 'Mở khóa'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Danh sách nhân viên</CardTitle>
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          Không tìm thấy nhân viên nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                              {customer.image ? (
                                <img
                                  src={getImageUrl(customer.image, 'customer')}
                                  alt={customer.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-gray-500 text-lg">
                                  {customer.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{customer.phone || 'N/A'}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{customer.address || 'N/A'}</TableCell>
                          <TableCell>{formatDate(customer.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={customer.status === 1 ? 'success' : 'destructive'}>
                              {customer.status === 1 ? 'Hoạt động' : 'Đã khóa'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewCustomerDetail(customer)}
                              >
                                Chi tiết
                              </Button>
                              <Button
                                size="sm"
                                variant={customer.status === 1 ? 'destructive' : 'default'}
                                onClick={() => handleToggleCustomerStatus(customer.id)}
                              >
                                {customer.status === 1 ? 'Khóa' : 'Mở khóa'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết 
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {selectedUser.image ? (
                    <img
                      src={getImageUrl(selectedUser.image, 'customer')}
                      alt={selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-2xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{selectedUser.phone || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày tham gia</p>
                  <p className="font-medium">{formatDate(selectedUser.created_at)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{selectedUser.address || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Trạng thái</p>
                  <Badge variant={selectedUser.status === 1 ? 'success' : 'destructive'}>
                    {selectedUser.status === 1 ? 'Hoạt động' : 'Đã khóa'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
