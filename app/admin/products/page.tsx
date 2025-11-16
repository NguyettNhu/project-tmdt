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

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  parent?: string;
}

const mockProducts: Product[] = [
  { id: 'SP001', name: 'Áo thun basic', category: 'Áo', price: '200,000₫', stock: 150, status: 'active', image: '/images/product1.jpg' },
  { id: 'SP002', name: 'Quần jean slim fit', category: 'Quần', price: '450,000₫', stock: 80, status: 'active', image: '/images/product2.jpg' },
  { id: 'SP003', name: 'Giày sneaker', category: 'Giày', price: '650,000₫', stock: 45, status: 'active', image: '/images/product3.jpg' },
  { id: 'SP004', name: 'Túi xách nữ', category: 'Phụ kiện', price: '350,000₫', stock: 30, status: 'active', image: '/images/product4.jpg' },
  { id: 'SP005', name: 'Mũ lưỡi trai', category: 'Phụ kiện', price: '150,000₫', stock: 0, status: 'inactive', image: '/images/product5.jpg' },
];

const mockCategories: Category[] = [
  { id: 'CAT001', name: 'Áo', slug: 'ao', productCount: 45 },
  { id: 'CAT002', name: 'Quần', slug: 'quan', productCount: 38 },
  { id: 'CAT003', name: 'Giày', slug: 'giay', productCount: 28 },
  { id: 'CAT004', name: 'Phụ kiện', slug: 'phu-kien', productCount: 52 },
  { id: 'CAT005', name: 'Nam', slug: 'nam', productCount: 78 },
  { id: 'CAT006', name: 'Nữ', slug: 'nu', productCount: 85 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleProductStatus = (id: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleOpenProductDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setIsProductDialogOpen(true);
  };

  const handleOpenCategoryDialog = (category?: Category) => {
    setEditingCategory(category || null);
    setIsCategoryDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
       
          <p className="text-gray-500 mt-1">Quản lý sản phẩm và danh mục</p>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Danh sách sản phẩm</TabsTrigger>
            <TabsTrigger value="categories">Danh mục sản phẩm</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Danh sách sản phẩm</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <Button onClick={() => handleOpenProductDialog()}>
                      + Thêm sản phẩm
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Tồn kho</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              📦
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-medium">{product.price}</TableCell>
                        <TableCell>
                          <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'success' : 'secondary'}>
                            {product.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenProductDialog(product)}
                            >
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleProductStatus(product.id)}
                            >
                              {product.status === 'active' ? 'Ẩn' : 'Hiện'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Xóa
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

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Danh mục sản phẩm</CardTitle>
                  <Button onClick={() => handleOpenCategoryDialog()}>
                    + Thêm danh mục
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên danh mục</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Số sản phẩm</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {category.slug}
                          </code>
                        </TableCell>
                        <TableCell>{category.productCount} sản phẩm</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenCategoryDialog(category)}
                            >
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Xóa
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
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Giá
              </Label>
              <Input
                id="price"
                defaultValue={editingProduct?.price}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Tồn kho
              </Label>
              <Input
                id="stock"
                type="number"
                defaultValue={editingProduct?.stock}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsProductDialogOpen(false)}>
              {editingProduct ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin danh mục
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cat-name" className="text-right">
                Tên danh mục
              </Label>
              <Input
                id="cat-name"
                defaultValue={editingCategory?.name}
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
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsCategoryDialogOpen(false)}>
              {editingCategory ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
