<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'avatar' => $this->avatar,
            'description' => $this->description,
            'content' => $this->content,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'sold' => $this->sold ?? 0,
            'status' => $this->status,
            'parent_id' => $this->parent_id,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'category' => $this->when($this->relationLoaded('category'), function () {
                return $this->category ? new CategoryResource($this->category) : null;
            }),
            'rating_avg' => $this->when($this->relationLoaded('reviews'), function () {
                return round($this->reviews->avg('rating'), 1) ?? 0;
            }),
            'rating_count' => $this->when($this->relationLoaded('reviews'), function () {
                return $this->reviews->count();
            }),
        ];
    }
}
