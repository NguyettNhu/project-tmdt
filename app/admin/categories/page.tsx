'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { FolderOpen, Edit, Trash2, Plus, Search, ToggleLeft, ToggleRight, Eye, Loader2 } from 'lucide-react';
import { useCategories } from '@/lib/hooks';
import { ApiCategory, getImageUrl } from '@/lib/api';

export default function CategoriesPage() {
  const { categories: apiCategories, loading, error, refetch } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ApiCategory | null>(null);

  const handleDeleteCategory = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này? Các sản phẩm trong danh mục sẽ được chuyển sang danh mục khác.')) {
      // TODO: Implement delete API call
      console.log('Delete category:', id);
    }
  };

  const handleToggleCategoryStatus = (id: number) => {
    // TODO: Implement toggle status API call
    console.log('Toggle category status:', id);
  };

  const handleOpenCategoryDialog = (category?: ApiCategory) => {
    setEditingCategory(category || null);
    setIsCategoryDialogOpen(true);
  };

  const filteredCategories = apiCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = apiCategories.filter(c => c.status === 1).length;
  const inactiveCount = apiCategories.filter(c => c.status !== 1).length;

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
          <p className="text-gray-500 mt-1">Quản lý danh mục sản phẩm</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng danh mục</p>
                  <p className="text-2xl font-bold">{apiCategories.length}</p>
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
                  <p className="text-2xl font-bold text-green-600">{activeCount}</p>
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
                  <p className="text-2xl font-bold text-gray-600">{inactiveCount}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-gray-600" />
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
                    <TableHead className="font-semibold">Hình ảnh</TableHead>
                    <TableHead className="font-semibold">Tên danh mục</TableHead>
                    <TableHead className="font-semibold">Slug</TableHead>
                    <TableHead className="font-semibold">Loại</TableHead>
                    <TableHead className="font-semibold text-center">Kích hoạt</TableHead>
                    <TableHead className="font-semibold text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover:bg-gray-50">
                      {/* Hình ảnh */}
                      <TableCell>
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center border overflow-hidden">
                          {category.image ? (
                            <img 
                              src={getImageUrl(category.image, 'category')} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FolderOpen className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </TableCell>

                      {/* Tên danh mục */}
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">ID: {category.id}</p>
                        </div>
                      </TableCell>

                      {/* Slug */}
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {category.slug}
                        </code>
                      </TableCell>

                      {/* Loại */}
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          {category.type || 'Chung'}
                        </span>
                      </TableCell>

                      {/* Kích hoạt */}
                      <TableCell className="text-center">
                        <button
                          onClick={() => handleToggleCategoryStatus(category.id)}
                          className="inline-flex items-center justify-center"
                        >
                          {category.status === 1 ? (
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
                Hình ảnh
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
              <Label htmlFor="type" className="text-right">
                Loại
              </Label>
              <Input
                id="type"
                defaultValue={editingCategory?.type || ''}
                placeholder="VD: product, post"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Danh mục cha
              </Label>
              <select
                id="parent"
                defaultValue={editingCategory?.parent_id || ''}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">-- Không có --</option>
                {apiCategories.filter(c => c.id !== editingCategory?.id).map(cat => (
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
