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

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  status: 'published' | 'draft' | 'hidden';
  views: number;
}

interface Promotion {
  id: string;
  name: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  usageCount: number;
}

const mockArticles: Article[] = [
  { id: 'TT001', title: 'Xu hướng thời trang mùa đông 2024', author: 'Admin', date: '2024-11-15', status: 'published', views: 1250 },
  { id: 'TT002', title: 'Cách phối đồ công sở hiện đại', author: 'Nhân viên A', date: '2024-11-14', status: 'published', views: 890 },
  { id: 'TT003', title: '5 mẹo chọn giày phù hợp', author: 'Admin', date: '2024-11-13', status: 'draft', views: 0 },
  { id: 'TT004', title: 'Bí quyết bảo quản quần áo bền đẹp', author: 'Nhân viên B', date: '2024-11-12', status: 'hidden', views: 456 },
];

const mockPromotions: Promotion[] = [
  { id: 'KM001', name: 'Giảm giá Black Friday', code: 'BLACKFRIDAY2024', discount: '30%', startDate: '2024-11-20', endDate: '2024-11-30', status: 'active', usageCount: 245 },
  { id: 'KM002', name: 'Mừng khai trương', code: 'WELCOME50', discount: '50,000₫', startDate: '2024-11-01', endDate: '2024-11-15', status: 'expired', usageCount: 567 },
  { id: 'KM003', name: 'Giảm giá cuối năm', code: 'NEWYEAR2025', discount: '20%', startDate: '2024-12-20', endDate: '2025-01-05', status: 'inactive', usageCount: 0 },
];

export default function ContentPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const handleDeleteArticle = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleToggleArticleStatus = (id: string, status: Article['status']) => {
    setArticles(articles.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  const handleDeletePromotion = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter(p => p.id !== id));
    }
  };

  const handleTogglePromotionStatus = (id: string) => {
    setPromotions(promotions.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const handleOpenArticleDialog = (article?: Article) => {
    setEditingArticle(article || null);
    setIsArticleDialogOpen(true);
  };

  const handleOpenPromotionDialog = (promotion?: Promotion) => {
    setEditingPromotion(promotion || null);
    setIsPromotionDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý tin tức và khuyến mãi</p>
        </div>

        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Tin tức</TabsTrigger>
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
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Tác giả</TableHead>
                      <TableHead>Ngày đăng</TableHead>
                      <TableHead>Lượt xem</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-md">{article.title}</TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              article.status === 'published'
                                ? 'success'
                                : article.status === 'draft'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {article.status === 'published'
                              ? 'Đã đăng'
                              : article.status === 'draft'
                              ? 'Nháp'
                              : 'Đã ẩn'}
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
                            {article.status === 'published' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleArticleStatus(article.id, 'hidden')}
                              >
                                Ẩn
                              </Button>
                            )}
                            {(article.status === 'draft' || article.status === 'hidden') && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleToggleArticleStatus(article.id, 'published')}
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Danh sách khuyến mãi</CardTitle>
                  <Button onClick={() => handleOpenPromotionDialog()}>
                    + Tạo khuyến mãi
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên chương trình</TableHead>
                      <TableHead>Mã code</TableHead>
                      <TableHead>Mức giảm</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Lượt sử dụng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promotions.map((promotion) => (
                      <TableRow key={promotion.id}>
                        <TableCell className="font-medium">{promotion.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                            {promotion.code}
                          </code>
                        </TableCell>
                        <TableCell className="font-medium text-red-600">
                          {promotion.discount}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{promotion.startDate}</div>
                            <div className="text-gray-500">{promotion.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>{promotion.usageCount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              promotion.status === 'active'
                                ? 'success'
                                : promotion.status === 'expired'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {promotion.status === 'active'
                              ? 'Hoạt động'
                              : promotion.status === 'expired'
                              ? 'Hết hạn'
                              : 'Chưa kích hoạt'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenPromotionDialog(promotion)}
                            >
                              Sửa
                            </Button>
                            {promotion.status !== 'expired' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleTogglePromotionStatus(promotion.id)}
                              >
                                {promotion.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePromotion(promotion.id)}
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

      {/* Article Dialog */}
      <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
        <DialogContent className="max-w-4xl">
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
                defaultValue={editingArticle?.title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="article-content" className="text-right pt-2">
                Nội dung
              </Label>
              <div className="col-span-3">
                <textarea
                  id="article-content"
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Nhập nội dung bài viết..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hỗ trợ định dạng Markdown
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article-status" className="text-right">
                Trạng thái
              </Label>
              <select
                id="article-status"
                defaultValue={editingArticle?.status || 'draft'}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="draft">Nháp</option>
                <option value="published">Đăng ngay</option>
                <option value="hidden">Ẩn</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsArticleDialogOpen(false)}>
              {editingArticle ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promotion Dialog */}
      <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPromotion ? 'Chỉnh sửa khuyến mãi' : 'Tạo khuyến mãi mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin chương trình khuyến mãi
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-name" className="text-right">
                Tên chương trình
              </Label>
              <Input
                id="promo-name"
                defaultValue={editingPromotion?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-code" className="text-right">
                Mã code
              </Label>
              <Input
                id="promo-code"
                defaultValue={editingPromotion?.code}
                className="col-span-3"
                placeholder="VD: BLACKFRIDAY2024"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-discount" className="text-right">
                Mức giảm
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="promo-discount"
                  defaultValue={editingPromotion?.discount}
                  placeholder="VD: 30% hoặc 50,000₫"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option value="percent">%</option>
                  <option value="fixed">₫</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-start" className="text-right">
                Ngày bắt đầu
              </Label>
              <Input
                id="promo-start"
                type="date"
                defaultValue={editingPromotion?.startDate}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-end" className="text-right">
                Ngày kết thúc
              </Label>
              <Input
                id="promo-end"
                type="date"
                defaultValue={editingPromotion?.endDate}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-status" className="text-right">
                Trạng thái
              </Label>
              <select
                id="promo-status"
                defaultValue={editingPromotion?.status || 'inactive'}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="inactive">Chưa kích hoạt</option>
                <option value="active">Kích hoạt ngay</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromotionDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsPromotionDialogOpen(false)}>
              {editingPromotion ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
