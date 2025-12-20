<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\SlugHelper;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    private $table;

    private $table_parents = 'categories';

    private $module;

    private $model;

    public function __construct()
    {
        $this->module = request()->segment(2);

        $this->model = new Post();

        $this->table = $this->model->table;
    }

    function recursive($id = null, $parentId = null, $level = 0)
    {
        $categories = DB::table('categories')
            ->select('id', 'name', 'parent_id')
            ->where('status', 1)
            ->where('parent_id', $parentId)
            ->get();

        $options = '';

        foreach ($categories as $category) {
            $indent = str_repeat('|-----', $level);

            $options .= '<option value="' . $category->id . '" ' . ($id == $category->id ? 'selected' : '') . '>' . $indent . ' ' . $category->name . '</option>';

            $options .= $this->recursive($id, $category->id, $level + 1);
        }

        return $options;
    }

    public function index()
    {
        $items = $this->model->get();
        return view("{$this->module}.main", compact('items'));
    }

    public function insert()
    {
        session()->forget('success');

        return view("{$this->module}.insert", [
            'recursive' => $this->recursive()
        ]);
    }

    public function update($id)
    {
        session()->forget('success');

        $findId = $this->model::find($id);

        $parents = $this->model::select('id', 'name')
            ->where('id', '!=', $id)
            ->get();

        if (!$findId) {
            return redirect()
                ->route("{$this->module}.index")
                ->with('error', __('messages.unexpected_error'));
        }

        // $media = \DB::table('post_media')
        //     ->where('post_id', $id)
        //     ->pluck('media_id');

        // $string = implode(',', collect($media)->toArray());

        $data = [
            'data' => $findId,
            'recursive' => $this->recursive($findId->parent_id),
            // 'media' => $media,
            // 'string' => $string
        ];

        return view("{$this->module}.update", $data);
    }

    public function ajax_data(Request $request)
    {
        $query = $this->model::select(
            "{$this->table}.id",
            "{$this->table}.name",
            "{$this->table}.slug",
            "{$this->table}.status",
            "{$this->table}.created_by",
            "{$this->table}.created_at",
            "{$this->table}.updated_at",
            "{$this->table}.image",
            "{$this->table}.parent_id"
        )
            ->with(['user:id,name', 'category:id,name'])
            ->orderBy("{$this->table}.created_at", 'desc');

        return datatables()->of($query)
            ->setRowId('id')
            ->editColumn('parent_id', function ($row) {
                return $row->category ? $row->category->name : '';
            })
            ->make(true);
    }

    public function ajax_review(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        try {
            $query = $this->model::with('category:id,name')
                ->select(
                    'id',
                    'image',
                    'name',
                    'slug',
                    'parent_id',
                    'description',
                    'status',
                    'created_by',
                    'updated_by',
                    'created_at',
                    'updated_at',
                )
                ->findOrFail($validatedData['id']);

            $createdByName = User::find($query->created_by)->name ?? 'N/A';
            $updatedByName = User::find($query->updated_by)->name ?? 'N/A';

            return response()->json([
                'success' => true,
                'data' => [
                    'module' => $query,
                    'created_by' => $createdByName,
                    'updated_by' => $updatedByName
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error("Error sorting {$this->module}: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
            ], 500);
        }
    }

    // public function ajax_uploads(Request $request)
    // {
    //     try {
    //         if ($request->hasFile('images')) {
    //             $uploadedFiles = [];

    //             foreach ($request->file('images') as $file) {
    //                 $filePath = $file->store('uploads/media', 'public');
    //                 $fileName = basename($filePath);

    //                 $id = DB::table('media')->insertGetId([
    //                     'image' => $fileName,
    //                     'name' => $file->getClientOriginalName(),
    //                     'type' => 'post',
    //                     'created_at' => now(),
    //                     'updated_at' => now(),
    //                     'created_by' => Auth::id(),
    //                     'updated_by' => Auth::id()
    //                 ]);

    //                 $uploadedFiles[] = [
    //                     'id' => $id,
    //                     'name' => $file->getClientOriginalName(),
    //                     'path' => asset('storage/' . $filePath),
    //                 ];
    //             }

    //             return response()->json([
    //                 'success' => true,
    //                 'files' => $uploadedFiles,
    //                 'message' => 'Upload thành công!'
    //             ]);
    //         }

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Không có file nào được upload!'
    //         ]);
    //     } catch (\Exception $e) {
    //         \Log::error('Upload error: ' . $e->getMessage());

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Lỗi không mong đợi!'
    //         ], 500);
    //     }
    // }

    // public function ajax_status(Request $request)
    // {
    //     $request->merge([
    //         'status' => filter_var($request->input('status'), FILTER_VALIDATE_BOOLEAN),
    //     ]);

    //     $validatedData = $request->validate([
    //         'id' => "required|integer|exists:{$this->table},id",
    //         'status' => 'required|boolean',
    //     ]);

    //     try {
    //         $query = $this->model::findOrFail($validatedData['id']);

    //         $query->status = $validatedData['status'] ? 1 : 0;

    //         $query->save();

    //         session()->flash('success', __('Cập nhật trạng thái thành công.'));

    //         return response()->json([
    //             'success' => true,
    //             'message' => __('Cập nhật trạng thái thành công.')
    //         ]);
    //     } catch (\Exception $e) {
    //         \Log::error("Error statusing {$this->module}: {$e->getMessage()}");

    //         return response()->json([
    //             'success' => false,
    //             'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
    //         ], 500);
    //     }
    // }

    public function ajax_delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        \DB::beginTransaction();

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $oldImage = $query->image;

            if ($oldImage) {
                $oldImagePath = public_path("storage/uploads/{$this->module}/{$oldImage}");
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // \DB::table('post_media')->where('post_id', $validatedData['id'])->delete();

            $query->delete();

            \DB::commit();

            return response()->json([
                'success' => true,
                'message' => __('Xóa dữ liệu thành công.')
            ]);
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error("Error deleting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
            ], 500);
        }
    }

    public function ajax_insert(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255|unique:{$this->table},name,{$request->input("id")},id",
            "slug" => "required|string|max:255|unique:{$this->table},slug,{$request->input("id")},id",
            "parent_id" => "nullable|integer|exists:{$this->table_parents},id",
            "content" => "nullable|string",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "description" => "nullable|string",
            "status" => "required|boolean",
        ]);

        \DB::beginTransaction();

        try {
            $query = $this->model->fill($validatedData);

            $query->slug = SlugHelper::convertToSlug($validatedData['slug']);

            if (auth()->check()) {
                $query->created_by = auth()->user()->id;
                $query->updated_by = auth()->user()->id;
            }

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filePath = $file->store("uploads/{$this->module}", 'public');
                $query->image = basename($filePath);
                ;
            }

            $query->save();

            $gallery = json_decode('[' . $request->input('gallery') . ']', true);

            if (!empty($gallery)) {
                $mediaData = [];

                foreach ($gallery as $media_id) {
                    $mediaData[] = [
                        'post_id' => $query->id,
                        'media_id' => $media_id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                \DB::table('post_media')->insert($mediaData);
            }

            \DB::commit();

            session()->flash('success', __('Lưu dữ liệu thành công.'));

            return response()->json([
                'success' => true,
                'message' => __('Lưu dữ liệu thành công.'),
                'redirect_url' => route("{$this->module}.view.index")
            ]);

        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
            ], 500);
        }
    }

    public function ajax_update(Request $request)
    {
        $validatedData = $request->validate([
            "id" => "required|integer|exists:{$this->table},id",
            "name" => "required|string|max:255|unique:{$this->table},name,{$request->input("id")},id",
            "slug" => "required|string|max:255|unique:{$this->table},slug,{$request->input("id")},id",
            "parent_id" => "nullable|integer|exists:{$this->table_parents},id",
            "content" => "nullable|string",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "description" => "nullable|string",
            "status" => "required|boolean",
        ]);

        \DB::beginTransaction();

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->fill($validatedData);

            $query->slug = SlugHelper::convertToSlug($validatedData['slug']);

            if (auth()->check()) {
                $query->updated_by = auth()->user()->id;
            }

            if ($request->hasFile('file')) {
                $oldImage = $query->image;

                if ($oldImage) {
                    $oldImagePath = public_path("storage/uploads/{$this->module}/{$oldImage}");
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $file = $request->file('file');
                $filePath = $file->store("uploads/{$this->module}", 'public');

                $query->image = basename($filePath);
            }

            $newGallery = json_decode('[' . $request->input('gallery') . ']', true);

            $galleryChanged = false;

            if (!empty($newGallery)) {
                $existingGallery = \DB::table('post_media')
                    ->where('post_id', $validatedData['id'])
                    ->pluck('media_id')
                    ->toArray();

                if ($existingGallery !== $newGallery) {
                    $galleryChanged = true;

                    \DB::table('post_media')->where('post_id', $validatedData['id'])->delete();

                    $mediaData = [];
                    foreach ($newGallery as $media_id) {
                        $mediaData[] = [
                            'post_id' => $validatedData['id'],
                            'media_id' => $media_id,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                    \DB::table('post_media')->insert($mediaData);
                }
            }

            $message = '';

            if ($query->isDirty() && !$galleryChanged) {
                $query->save();
                $message = __('Cập nhật dữ liệu thành công.');

            } elseif (!$query->isDirty() && $galleryChanged) {
                $message = __('Cập nhật thư viện ảnh thành công.');

            } elseif ($query->isDirty() && $galleryChanged) {
                $query->save();
                $message = __('Cập nhật dữ liệu thành công.') . ' ' . __('Cập nhật thư viện ảnh thành công.');
            }

            \DB::commit();

            if ($message) {
                session()->flash('success', $message);

                return response()->json([
                    'success' => true,
                    'message' => $message
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => __('Không có thay đổi nào được thực hiện.')
            ]);

        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error("Error updating {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
            ], 500);
        }
    }
}
