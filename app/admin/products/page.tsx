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
import { Edit, Trash2, Eye, Plus, Search, ToggleLeft, ToggleRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  sold: number;
  category: string;
  createdAt: string;
  isActive: boolean;
}

const mockProducts: Product[] = [
  { 
    id: 'SP001', 
    name: 'Áo thun basic trắng', 
    image: '/images/product1.jpg',
    originalPrice: 250000,
    salePrice: 200000,
    sold: 156,
    category: 'Áo',
    createdAt: '2025-01-15',
    isActive: true
  },
  { 
    id: 'SP002', 
    name: 'Quần jean slim fit xanh đậm', 
    image: '/images/product2.jpg',
    originalPrice: 550000,
    salePrice: 450000,
    sold: 89,
    category: 'Quần',
    createdAt: '2025-01-20',
    isActive: true
  },
  { 
    id: 'SP003', 
    name: 'Giày sneaker trắng classic', 
    image: '/images/product3.jpg',
    originalPrice: 800000,
    salePrice: 650000,
    sold: 234,
    category: 'Giày',
    createdAt: '2025-02-01',
    isActive: true
  },
  { 
    id: 'SP004', 
    name: 'Túi xách nữ da cao cấp', 
    image: '/images/product4.jpg',
    originalPrice: 450000,
    salePrice: 350000,
    sold: 67,
    category: 'Phụ kiện',
    createdAt: '2025-02-10',
    isActive: true
  },
  { 
    id: 'SP005', 
    name: 'Mũ lưỡi trai thể thao', 
    image: '/images/product5.jpg',
    originalPrice: 180000,
    salePrice: 150000,
    sold: 45,
    category: 'Phụ kiện',
    createdAt: '2025-02-15',
    isActive: false
  },
  { 
    id: 'SP006', 
    name: 'Áo sơ mi công sở nam', 
    image: '/images/product6.jpg',
    originalPrice: 380000,
    salePrice: 320000,
    sold: 112,
    category: 'Áo',
    createdAt: '2025-02-20',
    isActive: true
  },
  { 
    id: 'SP007', 
    name: 'Váy đầm nữ dự tiệc', 
    image: '/images/product7.jpg',
    originalPrice: 650000,
    salePrice: 520000,
    sold: 78,
    category: 'Váy',
    createdAt: '2025-03-01',
    isActive: true
  },
];

const categories = [
  { id: 'CAT001', name: 'Áo' },
  { id: 'CAT002', name: 'Quần' },
  { id: 'CAT003', name: 'Váy' },
  { id: 'CAT004', name: 'Giày' },
  { id: 'CAT005', name: 'Phụ kiện' },
  { id: 'CAT006', name: 'Nam' },
  { id: 'CAT007', name: 'Nữ' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleProductStatus = (id: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleOpenProductDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setIsProductDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý danh sách sản phẩm</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Danh sách sản phẩm ({filteredProducts.length})</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-9"
                  />
                </div>
                <Button onClick={() => handleOpenProductDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sản phẩm
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
                    <TableHead className="font-semibold">Tên</TableHead>
                    <TableHead className="font-semibold">Giá gốc</TableHead>
                    <TableHead className="font-semibold">Giá khuyến mãi</TableHead>
                    <TableHead className="font-semibold">Đã bán</TableHead>
                    <TableHead className="font-semibold">Danh Mục</TableHead>
                    <TableHead className="font-semibold">Ngày Tạo</TableHead>
                    <TableHead className="font-semibold text-center">Kích Hoạt</TableHead>
                    <TableHead className="font-semibold text-center">Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      {/* Avatar */}
                      <TableCell>
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden border">
                          <span className="text-2xl">👕</span>
                        </div>
                      </TableCell>

                      {/* Tên */}
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </TableCell>

                      {/* Giá gốc */}
                      <TableCell>
                        <span className="text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </TableCell>

                      {/* Giá khuyến mãi */}
                      <TableCell>
                        <span className="text-pink-600 font-semibold">
                          {formatPrice(product.salePrice)}
                        </span>
                      </TableCell>

                      {/* Đã bán */}
                      <TableCell>
                        <span className="font-medium">{product.sold}</span>
                      </TableCell>

                      {/* Danh mục */}
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                          {product.category}
                        </span>
                      </TableCell>

                      {/* Ngày tạo */}
                      <TableCell>
                        <span className="text-gray-600">{formatDate(product.createdAt)}</span>
                      </TableCell>

                      {/* Kích hoạt */}
                      <TableCell className="text-center">
                        <button
                          onClick={() => handleToggleProductStatus(product.id)}
                          className="inline-flex items-center justify-center"
                        >
                          {product.isActive ? (
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
                            onClick={() => handleOpenProductDialog(product)}
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id)}
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">📦</div>
                <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin sản phẩm
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên sản phẩm
              </Label>
              <Input
                id="name"
                defaultValue={editingProduct?.name}
                placeholder="Nhập tên sản phẩm"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Danh mục
              </Label>
              <select
                id="category"
                defaultValue={editingProduct?.category}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originalPrice" className="text-right">
                Giá gốc
              </Label>
              <Input
                id="originalPrice"
                type="number"
                defaultValue={editingProduct?.originalPrice}
                placeholder="VD: 250000"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salePrice" className="text-right">
                Giá khuyến mãi
              </Label>
              <Input
                id="salePrice"
                type="number"
                defaultValue={editingProduct?.salePrice}
                placeholder="VD: 200000"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Hình ảnh
              </Label>
              <div className="col-span-3">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Chấp nhận: JPG, PNG, GIF (tối đa 2MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              Hủy
            </Button>
            <Button 
              onClick={() => setIsProductDialogOpen(false)}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {editingProduct ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
