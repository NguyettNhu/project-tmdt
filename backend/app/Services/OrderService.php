<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService
{
    public function createOrder(array $data)
    {
        try {
            DB::beginTransaction();

            // Calculate total
            $totalPrice = 0;
            foreach ($data['items'] as $item) {
                $totalPrice += $item['price'] * $item['quantity'];
            }

            // Create Order
            $order = Order::create([
                'customer_id' => $data['customer_id'],
                'total_price' => $totalPrice,
                'order_status' => 0, // Pending
                'payment_status' => 0, // Unpaid
                'note' => $data['note'] ?? null,
            ]);

            // Create Order Details
            foreach ($data['items'] as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'total' => $item['price'] * $item['quantity'],
                ]);
            }

            DB::commit();

            return $order->load('orderDetails');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating order: ' . $e->getMessage());
            throw $e;
        }
    }
}
