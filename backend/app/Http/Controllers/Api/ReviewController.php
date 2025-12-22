<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    // GET /api/products/{id}/reviews
    public function index($productId)
    {
        $reviews = Review::where('product_id', $productId)
            ->with('customer:id,name,image')
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform data to match frontend expectation
        $data = $reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'productId' => $review->product_id,
                'userId' => $review->customer_id,
                'userName' => $review->customer ? $review->customer->name : 'Unknown',
                'userAvatar' => $review->customer ? $review->customer->image : null,
                'rating' => $review->rating,
                'title' => $review->title,
                'comment' => $review->comment,
                'images' => $review->images,
                'verifiedPurchase' => $review->verified_purchase,
                'helpful' => $review->helpful,
                'createdAt' => $review->created_at,
            ];
        });

        return response()->json([
            'status' => true,
            'message' => 'Danh sách đánh giá',
            'data' => $data
        ]);
    }

    // POST /api/reviews
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'customer_id' => 'required|exists:customers,id',
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'required|string',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validate as image files
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if customer purchased the product (simplified logic for now)
        // In a real app, check Order/OrderDetail
        $verifiedPurchase = true; 

        // Handle image uploads
        $uploadedImages = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filePath = $image->store('uploads/reviews', 'public');
                $uploadedImages[] = basename($filePath);
            }
        }

        $review = Review::create([
            'product_id' => $request->product_id,
            'customer_id' => $request->customer_id,
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'images' => !empty($uploadedImages) ? $uploadedImages : null,
            'verified_purchase' => $verifiedPurchase,
            'helpful' => 0,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Đánh giá thành công',
            'data' => $review
        ], 201);
    }
}
