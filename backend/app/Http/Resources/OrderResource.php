<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_code' => 'ORD-' . str_pad($this->id, 6, '0', STR_PAD_LEFT),
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer->name ?? 'N/A',
            'customer_email' => $this->customer->email ?? null,
            'customer_phone' => $this->customer->phone ?? null,
            'customer_address' => $this->customer->address ?? null,
            'order_status' => $this->order_status === 'pending' ? 0 : ($this->order_status === 'confirmed' ? 1 : ($this->order_status === 'shipping' ? 2 : ($this->order_status === 'completed' ? 3 : 4))),
            'payment_status' => $this->payment_status,
            'payment_method' => 'cod',
            'subtotal' => (float) $this->total_price,
            'discount' => 0,
            'shipping_fee' => 0,
            'total_money' => (float) $this->total_price,
            'note' => $this->note,
            'cancel_note' => null,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'items' => OrderDetailResource::collection($this->whenLoaded('orderDetails')),
        ];
    }
}
