'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: string;
  status: 'active' | 'blocked';
}

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  status: 'active' | 'blocked';
}

const mockCustomers: Customer[] = [
  { id: 'KH001', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', joinDate: '2024-01-15', totalOrders: 12, totalSpent: '15,500,000₫', status: 'active' },
  { id: 'KH002', name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0902345678', joinDate: '2024-02-20', totalOrders: 8, totalSpent: '8,200,000₫', status: 'active' },
  { id: 'KH003', name: 'Lê Văn C', email: 'levanc@email.com', phone: '0903456789', joinDate: '2024-03-10', totalOrders: 15, totalSpent: '22,800,000₫', status: 'active' },
  { id: 'KH004', name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0904567890', joinDate: '2024-04-05', totalOrders: 5, totalSpent: '4,500,000₫', status: 'blocked' },
];

const mockStaff: Staff[] = [
  { id: 'NV001', name: 'Admin User', email: 'admin@company.com', phone: '0911111111', role: 'Quản trị viên', joinDate: '2023-01-01', status: 'active' },
  { id: 'NV002', name: 'Nhân viên A', email: 'nhanviena@company.com', phone: '0922222222', role: 'Nhân viên', joinDate: '2023-06-15', status: 'active' },
  { id: 'NV003', name: 'Nhân viên B', email: 'nhanvienb@company.com', phone: '0933333333', role: 'Nhân viên', joinDate: '2024-01-10', status: 'active' },
];

export default function UsersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleToggleCustomerStatus = (id: string) => {
    setCustomers(customers.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c
    ));
  };

  const handleToggleStaffStatus = (id: string) => {
    setStaff(staff.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'blocked' : 'active' } : s
    ));
  };

  const handleOpenStaffDialog = (staffMember?: Staff) => {
    setEditingStaff(staffMember || null);
    setIsStaffDialogOpen(true);
  };

  const handleViewCustomerDetail = (customer: Customer) => {
    setSelectedUser(customer);
    setIsDetailDialogOpen(true);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý khách hàng và nhân viên</p>
        </div>

        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customers">Khách hàng</TabsTrigger>
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
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Đơn hàng</TableHead>
                      <TableHead>Tổng chi tiêu</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'active' ? 'success' : 'destructive'}>
                            {customer.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
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
                              variant={customer.status === 'active' ? 'destructive' : 'default'}
                              onClick={() => handleToggleCustomerStatus(customer.id)}
                            >
                              {customer.status === 'active' ? 'Khóa' : 'Mở khóa'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Danh sách nhân viên</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tìm kiếm nhân viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <Button onClick={() => handleOpenStaffDialog()}>
                      + Thêm nhân viên
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{staffMember.name}</p>
                            <p className="text-sm text-gray-500">{staffMember.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{staffMember.phone}</TableCell>
                        <TableCell>
                          <Badge variant={staffMember.role === 'Quản trị viên' ? 'default' : 'secondary'}>
                            {staffMember.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{staffMember.joinDate}</TableCell>
                        <TableCell>
                          <Badge variant={staffMember.status === 'active' ? 'success' : 'destructive'}>
                            {staffMember.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenStaffDialog(staffMember)}
                            >
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              variant={staffMember.status === 'active' ? 'destructive' : 'default'}
                              onClick={() => handleToggleStaffStatus(staffMember.id)}
                            >
                              {staffMember.status === 'active' ? 'Khóa' : 'Mở khóa'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Staff Dialog */}
      <Dialog open={isStaffDialogOpen} onOpenChange={setIsStaffDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin nhân viên
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ tên
              </Label>
              <Input
                id="name"
                defaultValue={editingStaff?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={editingStaff?.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                defaultValue={editingStaff?.phone}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <select
                id="role"
                defaultValue={editingStaff?.role}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Quản trị viên">Quản trị viên</option>
                <option value="Nhân viên">Nhân viên</option>
              </select>
            </div>
            {!editingStaff && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStaffDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsStaffDialogOpen(false)}>
              {editingStaff ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết khách hàng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về khách hàng
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ tên</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày tham gia</p>
                  <p className="font-medium">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                  <p className="font-medium">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng chi tiêu</p>
                  <p className="font-medium">{selectedUser.totalSpent}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Lịch sử đơn hàng gần đây</p>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>DH001 - 15/11/2024</span>
                    <span className="font-medium">1,250,000₫</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>DH005 - 10/11/2024</span>
                    <span className="font-medium">850,000₫</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
