<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\SlugHelper;

class CategoryController extends Controller
{
    private $table;

    private $module;

    private $model;

    private $typeCategory = [
        'product' => 'Product',
        'post' => 'Post'
    ];

    public function __construct()
    {
        $this->module = request()->segment(2);

        $this->model = new Category();

        $this->table = $this->model->table;
    }

    public function index()
    {
        $items = $this->model->get();

        return view("{$this->module}.main", compact('items'));
    }

    public function insert()
    {
        session()->forget('success');

        // $typeCategory = [
        //     'product' => 'Product',
        //     'post' => 'Post'
        // ];

        return view("{$this->module}.insert", [
            'typeCategory' => $this->typeCategory
        ]);
    }

    public function update($id)
    {
        session()->forget('success');

        $findId = $this->model::find($id);

        if (!$findId) {
            return redirect()
                ->route("{$this->module}.index")
                ->with('error', __('messages.unexpected_error'));
        }

        $data = [
            'data' => $findId,
            'recursive' => $this->recursive($findId->type, $findId->id, $findId->parent_id),
            'typeCategory' => $this->typeCategory
        ];

        return view("{$this->module}.update", $data);
    }

    function recursive($type = '', $id = null, $parentId = null, $recurId = null, $level = 0)
    {
        $categories = $this->model::where([
            'type' => $type,
            'parent_id' => $recurId,
            'status' => 1
        ])
            ->where('id', '!=', $id)
            ->select('id', 'name', 'parent_id')
            ->get();

        $options = '';

        foreach ($categories as $category) {
            $indent = str_repeat('|-----', $level);

            $options .= '<option value="' . $category->id . '" ' . ($parentId == $category->id ? 'selected' : '') . '>' . $indent . ' ' . $category->name . '</option>';

            $options .= $this->recursive($type, $id, $parentId, $category->id, $level + 1);
        }

        return $options;
    }

    public function ajax_parents(Request $request)
    {
        $validatedData = $request->validate([
            "id" => [
                'nullable',
                'integer',
                function ($attribute, $value, $fail) {
                    if (!is_null($value)) {
                        if (!\DB::table($this->table)->where('id', $value)->exists()) {
                            $fail(__('validation.required', ['attribute' => $attribute]));
                        }
                    }
                },
            ],
            'type' => "nullable|string|in:post,product",
        ]);

        try {
            $data = $this->recursive($request->input('type'), $request->input('id'));

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error("Error deleting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi xảy ra, vui lòng thử lại sau!')
            ], 500);
        }
    }

    public function ajax_data(Request $request)
    {
        $query = $this->model::where('parent_id', null)
            ->select(
                "{$this->table}.id",
                "{$this->table}.name",
                "{$this->table}.slug",
                "{$this->table}.status",
                "{$this->table}.type",
                "{$this->table}.created_by",
                "{$this->table}.created_at",
                "{$this->table}.updated_at",
                "{$this->table}.image",
                "{$this->table}.parent_id",
            )
            ->with([
                'children' => function ($query) {
                    $query->select(
                        'id',
                        'name',
                        'type',
                        'parent_id',
                        'image',
                        'created_at',
                        'status'
                    );
                },
                'user:id,name'
            ])
            ->orderBy("{$this->table}.updated_at", 'desc');

        return datatables()->of($query)
            ->setRowId('id')
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
                    'type',
                    'status',
                    'created_by',
                    'updated_by',
                    'created_at',
                    'updated_at'
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
                'message' => __('Có lỗi xảy ra, vui lòng thử lại!')
            ], 500);
        }
    }

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
    //             'message' => __('Có lỗi xảy ra, vui lòng thử lại!')
    //         ], 500);
    //     }
    // }

    public function ajax_delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->children()->update(['parent_id' => null]);

            $oldImage = $query->image;

            if ($oldImage) {
                $oldImagePath = public_path("storage/uploads/{$this->module}/{$oldImage}");
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $query->delete();

            return response()->json([
                'success' => true,
                'message' => __('Xóa dữ liệu thành công.')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error deleting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi xảy ra, vui lòng thử lại!')
            ], 500);
        }
    }

    public function ajax_insert(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255|unique:{$this->table},name,{$request->input("id")},id",
            "slug" => "required|string|max:255|unique:{$this->table},slug,{$request->input("id")},id",
            "parent_id" => "nullable|integer|exists:{$this->table},id",
            "type" => "nullable|string|max:255",
            "content" => "nullable|string",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "status" => "required|boolean",
        ]);

        try {
            $query = $this->model->fill($validatedData);

            $query->slug = SlugHelper::convertToSlug($validatedData['slug']);

            // LẤY parent_id AN TOÀN
            $parentId = $request->input('parent_id');

            if (!is_null($parentId)) {
                $parent = $this->model::find($parentId);

                if ($parent && !is_null($parent->parent_id)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Parent phải là danh mục cấp 1.'
                    ], 400);
                }
            }

            if (auth()->check()) {
                $query->created_by = auth()->id();
                $query->updated_by = auth()->id();
            }

            if ($request->hasFile('file')) {
                $filePath = $request->file('file')->store("uploads/{$this->module}", 'public');
                $query->image = basename($filePath);
            }

            $query->save();

            session()->flash('success', 'Lưu dữ liệu thành công.');

            return response()->json([
                'success' => true,
                'message' => 'Lưu dữ liệu thành công.',
                'redirect_url' => route("{$this->module}.view.index")
            ]);

        } catch (\Exception $e) {
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function ajax_update(Request $request)
    {
        $validatedData = $request->validate([
            "id" => "required|integer|exists:{$this->table},id",
            "name" => "required|string|max:255|unique:{$this->table},name,{$request->input("id")},id",
            "slug" => "required|string|max:255|unique:{$this->table},slug,{$request->input("id")},id",
            "parent_id" => "nullable|integer|exists:{$this->table},id",
            "type" => "nullable|string|max:255",
            "content" => "nullable|string",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "status" => "required|boolean",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            if (!is_null($validatedData['parent_id'])) {
                $parent = $this->model::find($validatedData['parent_id']);
                if ($parent && !is_null($parent->parent_id)) {
                    return response()->json([
                        'success' => false,
                        'message' => __('Parent phải là danh mục cấp 1.')
                    ], 400);
                }
            }

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

            if ($query->isDirty()) {
                $query->save();

                session()->flash('success', __('Cập nhật dữ liệu thành công.'));

                return response()->json([
                    'success' => true,
                    'message' => __('Cập nhật dữ liệu thành công.')
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => __('Không có thay đổi nào.')
            ]);

        } catch (\Exception $e) {
            \Log::error("Error updating {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi xảy ra, vui lòng thử lại!')
            ], 500);
        }
    }
}

