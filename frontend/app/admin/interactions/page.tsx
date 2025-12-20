'use client';

import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Construction, MessageSquare, BarChart3 } from 'lucide-react';

export default function InteractionsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-gray-500 mt-1">Quản lý đánh giá, phản hồi và thăm dò ý kiến</p>
        </div>

        <Tabs defaultValue="reviews" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reviews">Đánh giá &amp; Phản hồi</TabsTrigger>
            <TabsTrigger value="polls">Thăm dò ý kiến</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <Construction className="w-8 h-8 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Chức năng quản lý đánh giá và phản hồi đang được phát triển. 
                    API đánh giá sẽ sớm được tích hợp từ hệ thống backend.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Polls Tab */}
          <TabsContent value="polls" className="space-y-4">
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                  <Construction className="w-8 h-8 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Chức năng thăm dò ý kiến đang được phát triển và sẽ sớm được cập nhật.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
