<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index(Request $request)
    {
        $data = Category::orderBy('id', 'desc')->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách category',
            'data' => $data
        ]);
    }

    // GET /api/categories/{id}
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category không tồn tại',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Chi tiết category',
            'data' => $category
        ]);
    }
}
