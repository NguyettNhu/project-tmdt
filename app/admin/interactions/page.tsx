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

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Poll {
  id: string;
  title: string;
  question: string;
  options: string[];
  votes: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'ended';
}

const mockReviews: Review[] = [
  { id: 'RV001', customer: 'Nguyễn Văn A', product: 'Áo thun basic', rating: 5, content: 'Sản phẩm rất tốt, chất lượng vượt mong đợi!', date: '2024-11-15', status: 'pending' },
  { id: 'RV002', customer: 'Trần Thị B', product: 'Quần jean slim fit', rating: 4, content: 'Chất liệu tốt nhưng size hơi nhỏ', date: '2024-11-14', status: 'approved' },
  { id: 'RV003', customer: 'Lê Văn C', product: 'Giày sneaker', rating: 5, content: 'Đi rất êm, giá cả hợp lý', date: '2024-11-14', status: 'approved' },
  { id: 'RV004', customer: 'Phạm Thị D', product: 'Túi xách nữ', rating: 2, content: 'Sản phẩm không giống hình', date: '2024-11-13', status: 'rejected' },
  { id: 'RV005', customer: 'Hoàng Văn E', product: 'Mũ lưỡi trai', rating: 5, content: 'Đẹp và chất lượng', date: '2024-11-13', status: 'pending' },
];

const mockPolls: Poll[] = [
  { id: 'TĐ001', title: 'Khảo sát sản phẩm', question: 'Bạn muốn shop bổ sung sản phẩm nào?', options: ['Áo khoác', 'Váy', 'Đồ thể thao', 'Phụ kiện thời trang'], votes: 156, startDate: '2024-11-01', endDate: '2024-11-30', status: 'active' },
  { id: 'TĐ002', title: 'Chất lượng dịch vụ', question: 'Bạn đánh giá thế nào về dịch vụ giao hàng?', options: ['Rất tốt', 'Tốt', 'Bình thường', 'Cần cải thiện'], votes: 243, startDate: '2024-10-01', endDate: '2024-10-31', status: 'ended' },
];

export default function InteractionsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false);
  const [editingPoll, setEditingPoll] = useState<Poll | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyingToReview, setReplyingToReview] = useState<Review | null>(null);

  const handleReviewAction = (id: string, action: 'approved' | 'rejected') => {
    setReviews(reviews.map(r =>
      r.id === id ? { ...r, status: action } : r
    ));
  };

  const handleOpenReplyDialog = (review: Review) => {
    setReplyingToReview(review);
    setIsReplyDialogOpen(true);
  };

  const handleOpenPollDialog = (poll?: Poll) => {
    setEditingPoll(poll || null);
    setIsPollDialogOpen(true);
  };

  const handleDeletePoll = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa thăm dò ý kiến này?')) {
      setPolls(polls.filter(p => p.id !== id));
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý đánh giá, phản hồi và thăm dò ý kiến</p>
        </div>

        <Tabs defaultValue="reviews" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reviews">Đánh giá & Phản hồi</TabsTrigger>
            <TabsTrigger value="polls">Thăm dò ý kiến</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Đánh giá & Phản hồi</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Tất cả</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="rejected">Đã từ chối</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Nội dung</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.customer}</TableCell>
                        <TableCell>{review.product}</TableCell>
                        <TableCell>
                          <div className="text-yellow-500">
                            {renderStars(review.rating)}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.content}</TableCell>
                        <TableCell>{review.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              review.status === 'approved'
                                ? 'success'
                                : review.status === 'rejected'
                                ? 'destructive'
                                : 'warning'
                            }
                          >
                            {review.status === 'approved'
                              ? 'Đã duyệt'
                              : review.status === 'rejected'
                              ? 'Đã từ chối'
                              : 'Chờ duyệt'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {review.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleReviewAction(review.id, 'approved')}
                                >
                                  Duyệt
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReviewAction(review.id, 'rejected')}
                                >
                                  Từ chối
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenReplyDialog(review)}
                            >
                              Trả lời
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

          {/* Polls Tab */}
          <TabsContent value="polls" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Thăm dò ý kiến</CardTitle>
                  <Button onClick={() => handleOpenPollDialog()}>
                    + Tạo thăm dò mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {polls.map((poll) => (
                    <div key={poll.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{poll.title}</h3>
                            <Badge variant={poll.status === 'active' ? 'success' : 'secondary'}>
                              {poll.status === 'active' ? 'Đang diễn ra' : 'Đã kết thúc'}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-3">{poll.question}</p>
                          <div className="space-y-2 mb-3">
                            {poll.options.map((option, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-blue-600"></div>
                                <span className="text-sm">{option}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📊 {poll.votes} lượt bình chọn</span>
                            <span>📅 {poll.startDate} - {poll.endDate}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenPollDialog(poll)}
                          >
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            Xem kết quả
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePoll(poll.id)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trả lời đánh giá</DialogTitle>
            <DialogDescription>
              Gửi phản hồi cho khách hàng {replyingToReview?.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Đánh giá gốc:</p>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm">{replyingToReview?.content}</p>
              </div>
            </div>
            <div>
              <Label htmlFor="reply">Nội dung trả lời</Label>
              <textarea
                id="reply"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                placeholder="Nhập nội dung trả lời..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsReplyDialogOpen(false)}>
              Gửi trả lời
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Poll Dialog */}
      <Dialog open={isPollDialogOpen} onOpenChange={setIsPollDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPoll ? 'Chỉnh sửa thăm dò' : 'Tạo thăm dò mới'}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin thăm dò ý kiến
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="poll-title" className="text-right">
                Tiêu đề
              </Label>
              <Input
                id="poll-title"
                defaultValue={editingPoll?.title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="poll-question" className="text-right">
                Câu hỏi
              </Label>
              <Input
                id="poll-question"
                defaultValue={editingPoll?.question}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Các lựa chọn
              </Label>
              <div className="col-span-3 space-y-2">
                <Input placeholder="Lựa chọn 1" />
                <Input placeholder="Lựa chọn 2" />
                <Input placeholder="Lựa chọn 3" />
                <Input placeholder="Lựa chọn 4" />
                <Button variant="outline" size="sm">+ Thêm lựa chọn</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                Ngày bắt đầu
              </Label>
              <Input
                id="start-date"
                type="date"
                defaultValue={editingPoll?.startDate}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                Ngày kết thúc
              </Label>
              <Input
                id="end-date"
                type="date"
                defaultValue={editingPoll?.endDate}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPollDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsPollDialogOpen(false)}>
              {editingPoll ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
