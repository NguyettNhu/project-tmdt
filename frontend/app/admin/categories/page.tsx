'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategories } from '@/hooks/useCategories';
import { getImageUrl } from '@/lib/api';
import { Eye, FolderOpen, Loader2, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesPage() {
  const { categories: apiCategories, loading, error, refetch } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');


  const handleToggleCategoryStatus = (id: number) => {
    // TODO: Implement toggle status API call
    console.log('Toggle category status:', id);
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


    </AdminLayout>
  );
}
