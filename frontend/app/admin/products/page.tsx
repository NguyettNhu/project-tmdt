'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SafeImage from '@/components/ui/SafeImage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategories } from '@/hooks/useCategories';
import { useAdminProducts } from '@/hooks/useProducts';
import { ApiProduct, createProduct, deleteProduct, getImageUrl, toggleProductStatus, updateProduct } from '@/lib/api';
import { Edit, Eye, ImageOff, Loader2, Plus, Search, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function ProductsPage() {
  const { products: apiProducts, loading, refetch } = useAdminProducts();
  const { categories: apiCategories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form refs
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const salePriceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      await deleteProduct(id);
      toast.success('Xóa sản phẩm thành công');
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa sản phẩm');
    }
  };

  const handleToggleProductStatus = async (product: ApiProduct) => {
    try {
      const newStatus = product.status === 1 ? 0 : 1;
      await toggleProductStatus(product.id, newStatus);
      toast.success(newStatus === 1 ? 'Đã kích hoạt sản phẩm' : 'Đã ẩn sản phẩm');
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật trạng thái');
    }
  };

  const handleOpenProductDialog = (product?: ApiProduct) => {
    setEditingProduct(product || null);
    setIsProductDialogOpen(true);
  };

  const handleSubmitProduct = async () => {
    const name = nameRef.current?.value?.trim();
    const price = priceRef.current?.value;

    if (!name) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error('Vui lòng nhập giá hợp lệ');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);

      if (salePriceRef.current?.value) {
        formData.append('sale_price', salePriceRef.current.value);
      }
      if (categoryRef.current?.value) {
        formData.append('parent_id', categoryRef.current.value);
      }
      if (descriptionRef.current?.value) {
        formData.append('description', descriptionRef.current.value);
      }

      const imageFile = imageRef.current?.files?.[0];
      if (imageFile) {
        formData.append('avatar', imageFile);
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(formData);
        toast.success('Thêm sản phẩm thành công');
      }

      setIsProductDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = apiProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productCategories = apiCategories.filter(c => c.type === 'product');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

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
                    <TableHead className="font-semibold">Ngày Tạo</TableHead>
                    <TableHead className="font-semibold text-center">Kích Hoạt</TableHead>
                    <TableHead className="font-semibold text-center">Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="w-14 h-14 relative rounded-lg overflow-hidden border">
                          <SafeImage
                            src={getImageUrl(product.avatar)}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                            fallbackElement={
                              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                <ImageOff className="w-6 h-6 text-gray-400" />
                              </div>
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">ID: {product.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-500 line-through">{formatPrice(product.price)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-pink-600 font-semibold">{formatPrice(product.sale_price || product.price)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{product.sold}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{formatDate(product.created_at)}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <button onClick={() => handleToggleProductStatus(product)} className="inline-flex items-center justify-center">
                          {product.status === 1 ? (
                            <ToggleRight className="w-8 h-8 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            className="p-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors" 
                            title="Xem chi tiết"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            className="p-2 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors" 
                            onClick={() => handleOpenProductDialog(product)} 
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            className="p-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors" 
                            onClick={() => handleDeleteProduct(product.id)} 
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
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

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
            <DialogDescription>Nhập thông tin sản phẩm</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Tên sản phẩm <span className="text-red-500">*</span></Label>
              <Input ref={nameRef} id="name" defaultValue={editingProduct?.name} placeholder="Nhập tên sản phẩm" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Danh mục</Label>
              <select ref={categoryRef} id="category" defaultValue={editingProduct?.parent_id || ''} className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option value="">-- Chọn danh mục --</option>
                {productCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originalPrice" className="text-right">Giá gốc <span className="text-red-500">*</span></Label>
              <Input ref={priceRef} id="originalPrice" type="number" defaultValue={editingProduct?.price} placeholder="VD: 250000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salePrice" className="text-right">Giá khuyến mãi</Label>
              <Input ref={salePriceRef} id="salePrice" type="number" defaultValue={editingProduct?.sale_price || ''} placeholder="VD: 200000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Hình ảnh</Label>
              <div className="col-span-3">
                <Input ref={imageRef} id="image" type="file" accept="image/*" className="cursor-pointer" />
                <p className="text-xs text-gray-500 mt-1">Chấp nhận: JPG, PNG, GIF (tối đa 2MB)</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Mô tả</Label>
              <textarea ref={descriptionRef} id="description" defaultValue={editingProduct?.description || ''} placeholder="Nhập mô tả sản phẩm" rows={3} className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)} disabled={isSubmitting}>Hủy</Button>
            <Button onClick={handleSubmitProduct} disabled={isSubmitting} className="bg-pink-500 hover:bg-pink-600">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                editingProduct ? 'Cập nhật' : 'Thêm mới'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
