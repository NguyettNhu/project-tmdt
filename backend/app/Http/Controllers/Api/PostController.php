<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        })->values();

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
        if (is_numeric($id)) {
            $post = Post::find($id);
        } else {
            $post = Post::where('slug', $id)->first();
        }

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

    // POST /api/posts
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'boolean',
        ]);

        $data = $request->all();
        $data['status'] = $request->input('status', 1);
        $data['created_by'] = $request->user() ? $request->user()->id : null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads/post', $filename, 'public');
            $data['image'] = $filename;
        }

        $post = Post::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Tạo bài viết thành công',
            'data' => $post
        ], 201);
    }

    // PUT /api/posts/{id}
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post không tồn tại',
                'data' => null
            ], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'slug' => 'string|max:255|unique:posts,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'boolean',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Delete old image
            if ($post->image && Storage::disk('public')->exists('uploads/post/' . $post->image)) {
                Storage::disk('public')->delete('uploads/post/' . $post->image);
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads/post', $filename, 'public');
            $data['image'] = $filename;
        }

        $post->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật bài viết thành công',
            'data' => $post
        ]);
    }

    // DELETE /api/posts/{id}
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post không tồn tại',
                'data' => null
            ], 404);
        }

        if ($post->image && Storage::disk('public')->exists('uploads/post/' . $post->image)) {
            Storage::disk('public')->delete('uploads/post/' . $post->image);
        }

        $post->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa bài viết thành công'
        ]);
    }
}
