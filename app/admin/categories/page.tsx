'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { FolderOpen, Edit, Trash2, Plus, Search, ToggleLeft, ToggleRight, Eye } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  parent?: string;
  image?: string;
  icon: string;
}

const mockCategories: Category[] = [
  { id: 'CAT001', name: 'Áo', slug: 'ao', description: 'Các loại áo thời trang', productCount: 45, status: 'active', icon: '👕' },
  { id: 'CAT002', name: 'Quần', slug: 'quan', description: 'Các loại quần thời trang', productCount: 38, status: 'active', icon: '👖' },
  { id: 'CAT003', name: 'Giày', slug: 'giay', description: 'Giày dép các loại', productCount: 28, status: 'active', icon: '👟' },
  { id: 'CAT004', name: 'Phụ kiện', slug: 'phu-kien', description: 'Túi xách, mũ nón, thắt lưng...', productCount: 52, status: 'active', icon: '👜' },
  { id: 'CAT005', name: 'Nam', slug: 'nam', description: 'Thời trang nam', productCount: 78, status: 'active', icon: '👔' },
  { id: 'CAT006', name: 'Nữ', slug: 'nu', description: 'Thời trang nữ', productCount: 85, status: 'active', icon: '👗' },
  { id: 'CAT007', name: 'Trẻ em', slug: 'tre-em', description: 'Thời trang trẻ em', productCount: 32, status: 'active', icon: '🧒' },
  { id: 'CAT008', name: 'Sale', slug: 'sale', description: 'Sản phẩm giảm giá', productCount: 24, status: 'active', icon: '🏷️' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDeleteCategory = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này? Các sản phẩm trong danh mục sẽ được chuyển sang danh mục khác.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleToggleCategoryStatus = (id: string) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  const handleOpenCategoryDialog = (category?: Category) => {
    setEditingCategory(category || null);
    setIsCategoryDialogOpen(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý danh mục sản phẩm</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng danh mục</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-green-600">
                    {categories.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Đã ẩn</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {categories.filter(c => c.status === 'inactive').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-pink-600">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Danh sách danh mục</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm danh mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-9"
                  />
                </div>
                <Button onClick={() => handleOpenCategoryDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm danh mục
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Avatar</TableHead>
                    <TableHead className="font-semibold">Tên danh mục</TableHead>
                    <TableHead className="font-semibold">Slug</TableHead>
                    <TableHead className="font-semibold">Mô tả</TableHead>
                    <TableHead className="font-semibold">Số sản phẩm</TableHead>
                    <TableHead className="font-semibold text-center">Kích hoạt</TableHead>
                    <TableHead className="font-semibold text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover:bg-gray-50">
                      {/* Avatar */}
                      <TableCell>
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center border">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                      </TableCell>

                      {/* Tên danh mục */}
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.id}</p>
                        </div>
                      </TableCell>

                      {/* Slug */}
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {category.slug}
                        </code>
                      </TableCell>

                      {/* Mô tả */}
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-[200px] truncate">
                          {category.description}
                        </p>
                      </TableCell>

                      {/* Số sản phẩm */}
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          {category.productCount} sản phẩm
                        </span>
                      </TableCell>

                      {/* Kích hoạt */}
                      <TableCell className="text-center">
                        <button
                          onClick={() => handleToggleCategoryStatus(category.id)}
                          className="inline-flex items-center justify-center"
                        >
                          {category.status === 'active' ? (
                            <ToggleRight className="w-8 h-8 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </TableCell>

                      {/* Hành động */}
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            onClick={() => handleOpenCategoryDialog(category)}
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteCategory(category.id)}
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Không tìm thấy danh mục nào</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin danh mục sản phẩm
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cat-image" className="text-right">
                Avatar
              </Label>
              <div className="col-span-3">
                <Input
                  id="cat-image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Chấp nhận: JPG, PNG, GIF (tối đa 2MB)</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cat-name" className="text-right">
                Tên danh mục
              </Label>
              <Input
                id="cat-name"
                defaultValue={editingCategory?.name}
                placeholder="VD: Áo thun"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                defaultValue={editingCategory?.slug}
                placeholder="VD: ao-thun"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Input
                id="description"
                defaultValue={editingCategory?.description}
                placeholder="Mô tả ngắn về danh mục"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Danh mục cha
              </Label>
              <select
                id="parent"
                defaultValue={editingCategory?.parent || ''}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">-- Không có --</option>
                {categories.filter(c => c.id !== editingCategory?.id).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Hủy
            </Button>
            <Button 
              onClick={() => setIsCategoryDialogOpen(false)}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {editingCategory ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
