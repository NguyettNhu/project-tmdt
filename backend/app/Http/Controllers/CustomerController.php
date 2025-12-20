<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    private $table;
    private $module;
    private $model;

    public function __construct()
    {
        $this->module = request()->segment(2);
        $this->model = new Customer();
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

        return view("{$this->module}.insert");
    }

    public function update($id)
    {
        session()->forget('success');

        $data = $this->model::find($id);
        return view('customer.update', [
            'data' => $data
        ]);
    }

    public function ajax_data(Request $request)
    {
        $query = $this->model::select(
            "{$this->table}.id",
            "{$this->table}.image",
            "{$this->table}.name",
            "{$this->table}.email",
            "{$this->table}.phone",
            "{$this->table}.address",
            "{$this->table}.status",
            "{$this->table}.created_at",
            "{$this->table}.updated_at"
        )
            ->orderBy("{$this->table}.created_at", 'desc');

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
            $query = $this->model::select(
                'id',
                'image',
                'name',
                'email',
                'phone',
                'address',
                'status',
                'created_at',
                'updated_at'
            )
                ->findOrFail($validatedData['id']);

            $createdByName = $this->model::find($query->created_by)->name ?? 'N/A';
            $updatedByName = $this->model::find($query->updated_by)->name ?? 'N/A';

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

    //         session()->flash('success', __('messages.data_status'));

    //         return response()->json([
    //             'success' => true,
    //             'message' => __('messages.data_status')
    //         ]);
    //     } catch (\Exception $e) {
    //         \Log::error("Error statusing {$this->module}: {$e->getMessage()}");

    //         return response()->json([
    //             'success' => false,
    //             'message' => __('messages.unexpected_error')
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
                'message' => __('messages.data_deleted')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error deleting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_insert(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|max:255|unique:{$this->table},email",
            "phone" => "required|string|max:20",
            "address" => "nullable|string|max:255",
            "password" => "required|string|max:255",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "status" => "required|boolean",
        ]);

        try {
            $query = $this->model->fill($validatedData);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filePath = $file->store("uploads/{$this->module}", 'public');
                $query->image = basename($filePath);
            }

            $query->save();

            session()->flash('success', __('Lưu dữ liệu thành công.'));

            return response()->json([
                'success' => true,
                'message' => __('Lưu dữ liệu thành công.'),
                'redirect_url' => route("{$this->module}.view.index")
            ]);
        } catch (\Exception $e) {
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
            "name" => "required|string|max:255",
            "phone" => "required|string|max:20",
            "address" => "nullable|string|max:255",
            "file" => "nullable|image|mimes:jpeg,png,jpg,webp|max:2048",
            "status" => "required|boolean",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->fill($validatedData);

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
                'message' => __('Không có thay đổi nào được thực hiện.')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error updating {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra. Vui lòng thử lại!')
            ], 500);
        }
    }

    public function ajax_password(Request $request)
    {
        $validatedData = $request->validate([
            "id" => "required|integer|exists:{$this->table},id",
            "password_old" => "required|string|max:255",
            "password_new" => "required|string|max:255",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            if (!Hash::check($validatedData['password_old'], $query->password)) {
                return response()->json([
                    'success' => false,
                    'message' => __('messages.passworded_error')
                ]);
            }

            $query->password = $validatedData['password_new'];

            $query->save();

            session()->flash('success', __('messages.data_passworded'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_passworded')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error updating {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }
}
