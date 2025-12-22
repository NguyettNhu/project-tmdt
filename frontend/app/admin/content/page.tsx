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
import { createPost, deletePost, updatePost } from '@/services/post.service';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContentPage() {
  const { posts: apiPosts, loading, error, refetch } = usePosts();
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ApiPost | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    image: null as File | null,
  });

  const handleDeleteArticle = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      try {
        await deletePost(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('Có lỗi xảy ra khi xóa bài viết');
      }
    }
  };

  const handleToggleArticleStatus = async (id: number, status: number) => {
    try {
      const data = new FormData();
      data.append('status', status.toString());
      await updatePost(id, data);
      refetch();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const handleOpenArticleDialog = (article?: ApiPost) => {
    setEditingArticle(article || null);
    setFormData({
      name: article?.name || '',
      slug: article?.slug || '',
      description: article?.description || '',
      content: article?.content || '',
      image: null,
    });
    setIsArticleDialogOpen(true);
  };

  const handleSaveArticle = async () => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('slug', formData.slug);
      data.append('description', formData.description);
      data.append('content', formData.content);
      data.append('status', '1'); // Default to published status
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingArticle) {
        await updatePost(editingArticle.id, data);
      } else {
        await createPost(data);
      }

      setIsArticleDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Có lỗi xảy ra khi lưu bài viết');
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tức</h1>
          <p className="text-gray-500 mt-1">Tin tức nóng</p>
        </div>

        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Tin tức ({apiPosts.length})</TabsTrigger>
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
                                <img
                                  src={getImageUrl(article.image, 'post')}
                                  alt={article.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/product-01.jpg'; }}
                                />
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData({ ...formData, image: e.target.files[0] });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSaveArticle}
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
