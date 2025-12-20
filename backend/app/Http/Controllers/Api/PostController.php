<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // GET /api/posts
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        $parentId = $request->input('parent_id');

        $query = Post::orderBy('id', 'desc');

        // 🔍 Filter theo parent_id (nếu có)
        if (!is_null($parentId)) {
            $query->where('parent_id', $parentId);
        }

        $posts = $query->paginate($perPage);

        // Xử lý lại đường dẫn ảnh
        $data = collect($posts->items())->map(function ($post) {
            $post->image = $post->image
                ? asset('storage/uploads/post/' . $post->image)
                : null;
            return $post;
        });

        return response()->json([
            'status' => true,
            'message' => 'Danh sách post',
            'data' => $data,
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'from' => $posts->firstItem(),
                'to' => $posts->lastItem(),
            ]
        ]);
    }

    // GET /api/posts/{id}
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post không tồn tại',
                'data' => null
            ], 404);
        }

        // Xử lý image cho chi tiết
        $post->image = $post->image
            ? asset('storage/uploads/post/' . $post->image)
            : null;

        return response()->json([
            'status' => true,
            'message' => 'Chi tiết post',
            'data' => $post
        ]);
    }
}
