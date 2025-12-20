<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    // GET /api/products
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        $parentId = $request->input('parent_id');

        $query = Product::with(['category', 'reviews'])->orderBy('id', 'desc');

        // 🔍 Search theo parent_id
        if (!is_null($parentId)) {
            $query->where('parent_id', $parentId);
        }

        $products = $query->paginate($perPage);

        return $this->successResponseWithPagination($products, ProductResource::class, 'Danh sách product');
    }


    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::with(['category', 'reviews'])->find($id);

        if (!$product) {
            return $this->errorResponse('Product không tồn tại', 404);
        }

        return $this->successResponse(new ProductResource($product), 'Chi tiết product');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();
        $data['slug'] = \Illuminate\Support\Str::slug($request->name);
        $data['created_by'] = auth()->id();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('products', 'public');
            $data['avatar'] = 'storage/' . $path;
        }

        $product = Product::create($data);

        return $this->successResponse(new ProductResource($product), 'Tạo sản phẩm thành công', 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return $this->errorResponse('Product không tồn tại', 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();
        if ($request->has('name')) {
            $data['slug'] = \Illuminate\Support\Str::slug($request->name);
        }
        $data['updated_by'] = auth()->id();

        if ($request->hasFile('avatar')) {
            // Delete old image if exists
            if ($product->avatar) {
                $oldPath = str_replace('storage/', '', $product->avatar);
                if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('avatar')->store('products', 'public');
            $data['avatar'] = 'storage/' . $path;
        }

        $product->update($data);

        return $this->successResponse(new ProductResource($product), 'Cập nhật sản phẩm thành công');
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return $this->errorResponse('Product không tồn tại', 404);
        }

        if ($product->avatar) {
            $oldPath = str_replace('storage/', '', $product->avatar);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
        }

        $product->delete();

        return $this->successResponse(null, 'Xóa sản phẩm thành công');
    }
}
