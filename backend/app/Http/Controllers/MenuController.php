<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\User;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    private $table;

    private $module;

    private $model;

    public function __construct()
    {
        $this->module = request()->segment(2);

        $this->model = new Menu();

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

        // $menu = $this->model::select('id', 'name')->get();

        // $data = [
        //     'menu' => $menu
        // ];

        $typeMenu =[
            'layout' => 'Layout',
            'admin' => 'Admin'
        ];

        return view("{$this->module}.insert", compact('typeMenu'));
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
            'recursive' => $this->recursive($findId->type, $findId->id, $findId->parent_id)
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
            'type' => "nullable|string|in:layout,admin",
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
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_data(Request $request)
    {
        $query = $this->model::where('parent_id', null)
            ->select(
                "{$this->table}.id",
                "{$this->table}.name",
                "{$this->table}.path",
                "{$this->table}.icon",
                "{$this->table}.type",
                "{$this->table}.status",
                "{$this->table}.sort",
                "{$this->table}.created_by",
                "{$this->table}.created_at",
                "{$this->table}.updated_at",
                "{$this->table}.parent_id"
            )
            ->with([
                'children' => function ($query) {
                    $query->select(
                        'id',
                        'name',
                        'path',
                        'type',
                        'sort',
                        'created_at',
                        'status',
                        'parent_id'
                    )
                        ->orderBy("{$this->table}.type", 'asc')
                        ->orderBy("{$this->table}.sort", 'asc');
                },
                'user:id,name'
            ])
            ->orderBy("{$this->table}.type", 'asc')
            ->orderBy("{$this->table}.sort", 'asc');

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
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_sort(Request $request)
    {
        $request->merge([
            'sort' => filter_var($request->input('sort'), \FILTER_VALIDATE_INT)
        ]);

        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
            'sort' => 'required|integer',
        ]);

        try {
            $menu = $this->model::findOrFail($validatedData['id']);

            $menu->sort = $validatedData['sort'];
            $menu->save();

            session()->flash('success', __('messages.data_sort'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_sort')
            ]);
        } catch (\Exception $e) {
            \Log::error('Error sorting menu: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_status(Request $request)
    {
        $request->merge([
            'status' => filter_var($request->input('status'), FILTER_VALIDATE_BOOLEAN),
        ]);

        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
            'status' => 'required|boolean',
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->status = $validatedData['status'] ? 1 : 0;

            $query->save();

            session()->flash('success', __('messages.data_status'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_status')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error statusing {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->children()->update(['parent_id' => null]);

            $query->delete();

            return response()->json([
                'success' => true,
                'message' => __('messages.data_deleted')
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting menu: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_insert(Request $request)
    {
        $validatedData = $request->validate([
            'name' => "required|string|max:255|unique:{$this->table},name,NULL,id,type," . $request->input('type'),
            'path' => 'required|string|max:255',
            'parent_id' => "nullable|integer|exists:{$this->table},id",
            'icon' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'color' => 'nullable|string|max:255',
        ]);

        try {
            $maxSort = $this->model::where('type', $request->input('type'))
                ->when($request->input('parent_id'), function ($query) use ($request) {
                    return $query->where('parent_id', $request->input('parent_id'));
                })
                ->max('sort');
            $newSort = $maxSort ? $maxSort + 1 : 1;

            $menu = $this->model->fill($validatedData);
            $menu->sort = $newSort;

            if (!is_null($validatedData['parent_id'])) {
                $parent = $this->model::find($validatedData['parent_id']);
                if ($parent && !is_null($parent->parent_id)) {
                    return response()->json([
                        'success' => false,
                        'message' => __('messages.parent_must_be_top_level')
                    ], 400);
                }
            }

            if (auth()->check()) {
                $menu->created_by = auth()->user()->id;
                $menu->updated_by = auth()->user()->id;
            }

            $menu->save();

            session()->flash('success', __('messages.data_saved'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_saved'),
                'redirect_url' => route("{$this->module}.view.index")
            ]);

        } catch (\Exception $e) {
            \Log::error('Error inserting menu: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
            'name' => "required|string|max:255|unique:{$this->table},name," . $request->input('id') . ',id,type,' . $request->input('type'),
            'path' => 'required|string|max:255',
            'parent_id' => "nullable|integer|exists:{$this->table},id",
            'icon' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'color' => 'nullable|string|max:255',
        ]);

        try {
            $menu = $this->model::findOrFail($validatedData['id']);

            if (!is_null($validatedData['parent_id'])) {
                $parent = $this->model::find($validatedData['parent_id']);
                if ($parent && !is_null($parent->parent_id)) {
                    return response()->json([
                        'success' => false,
                        'message' => __('messages.parent_must_be_top_level')
                    ], 400);
                }
            }

            $originalValues = $menu->getAttributes();

            $menu->fill($validatedData);

            if (auth()->check()) {
                $menu->updated_by = auth()->user()->id;
            }

            $isUpdated = false;
            foreach ($validatedData as $key => $value) {
                if ($originalValues[$key] !== $menu->$key) {
                    $isUpdated = true;
                    break;
                }
            }

            if ($isUpdated) {
                $menu->save();

                session()->flash('success', __('messages.data_updated'));

                return response()->json([
                    'success' => true,
                    'message' => __('messages.data_updated')
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => __('messages.no_changes_made')
            ]);

        } catch (\Exception $e) {
            \Log::error('Error updating menu: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }
}
