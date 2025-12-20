'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/badge';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePosts } from '@/hooks/usePosts';
import { ApiPost, getImageUrl } from '@/lib/api';
import { Construction, Loader2, Percent } from 'lucide-react';
import { useState } from 'react';

export default function ContentPage() {
  const { posts: apiPosts, loading, error, refetch } = usePosts();
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ApiPost | null>(null);

  const handleDeleteArticle = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      // TODO: Implement API call to delete article
      console.log('Delete article:', id);
    }
  };

  const handleToggleArticleStatus = (id: number, status: number) => {
    // TODO: Implement API call to toggle article status
    console.log('Toggle article status:', id, status);
  };

  const handleOpenArticleDialog = (article?: ApiPost) => {
    setEditingArticle(article || null);
    setIsArticleDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: number) => {
    if (status === 1) return { label: 'Đã đăng', variant: 'success' as const };
    return { label: 'Nháp', variant: 'secondary' as const };
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
          <p className="text-gray-500 mt-1">Quản lý tin tức và khuyến mãi</p>
        </div>

        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Tin tức ({apiPosts.length})</TabsTrigger>
            <TabsTrigger value="promotions">Khuyến mãi</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Danh sách bài viết</CardTitle>
                  <Button onClick={() => handleOpenArticleDialog()}>
                    + Viết bài mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hình ảnh</TableHead>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Ngày đăng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Không có bài viết nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      apiPosts.map((article) => {
                        const statusInfo = getStatusBadge(article.status);
                        return (
                          <TableRow key={article.id}>
                            <TableCell>
                              <div className="w-16 h-12 rounded overflow-hidden bg-gray-100">
                                {article.image ? (
                                  <img
                                    src={getImageUrl(article.image, 'post')}
                                    alt={article.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    📄
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium max-w-md">
                              <p className="truncate">{article.name}</p>
                              {article.description && (
                                <p className="text-sm text-gray-500 truncate">{article.description}</p>
                              )}
                            </TableCell>
                            <TableCell>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{article.slug}</code>
                            </TableCell>
                            <TableCell>{formatDate(article.created_at)}</TableCell>
                            <TableCell>
                              <Badge variant={statusInfo.variant}>
                                {statusInfo.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleOpenArticleDialog(article)}
                                >
                                  Sửa
                                </Button>
                                {article.status === 1 ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleToggleArticleStatus(article.id, 0)}
                                  >
                                    Ẩn
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleToggleArticleStatus(article.id, 1)}
                                  >
                                    Đăng
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteArticle(article.id)}
                                >
                                  Xóa
                                </Button>
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
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-4">
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <Percent className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <Construction className="w-8 h-8 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Chức năng quản lý khuyến mãi đang được phát triển.
                    API khuyến mãi sẽ sớm được tích hợp từ hệ thống backend.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Article Dialog */}
      <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập nội dung bài viết
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article-title" className="text-right">
                Tiêu đề
              </Label>
              <Input
                id="article-title"
                defaultValue={editingArticle?.name}
                placeholder="Nhập tiêu đề bài viết"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article-slug" className="text-right">
                Slug
              </Label>
              <Input
                id="article-slug"
                defaultValue={editingArticle?.slug}
                placeholder="tieu-de-bai-viet"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article-desc" className="text-right">
                Mô tả
              </Label>
              <Input
                id="article-desc"
                defaultValue={editingArticle?.description || ''}
                placeholder="Mô tả ngắn"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="article-content" className="text-right pt-2">
                Nội dung
              </Label>
              <textarea
                id="article-content"
                defaultValue={editingArticle?.content || ''}
                placeholder="Nội dung bài viết..."
                className="col-span-3 min-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article-image" className="text-right">
                Hình ảnh
              </Label>
              <div className="col-span-3">
                <Input
                  id="article-image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => setIsArticleDialogOpen(false)}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {editingArticle ? 'Cập nhật' : 'Đăng bài'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
