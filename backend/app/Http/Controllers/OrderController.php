<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private $table;
    private $module;
    private $model;

    public function __construct()
    {
        $this->module = request()->segment(2); // orders
        $this->model = new Order();
        $this->table = $this->model->getTable();
    }

    /* =======================
        VIEW
    ======================= */

    public function index()
    {
        $items = $this->model
            ->with('customer')
            ->orderBy('created_at', 'desc')
            ->get();

        return view("{$this->module}.main", compact('items'));
    }

    public function insert()
    {
        session()->forget('success');

        $customers = Customer::all();

        return view("{$this->module}.insert", compact('customers'));
    }

    public function update($id)
    {
        session()->forget('success');

        $data = $this->model
            ->with('customer')
            ->findOrFail($id);

        return view("{$this->module}.update", compact('data'));
    }

    /* =======================
        DATATABLE
    ======================= */

    public function ajax_data(Request $request)
    {
        $query = $this->model::select(
            "{$this->table}.id",
            "{$this->table}.customer_id",
            "{$this->table}.total_price",
            "{$this->table}.order_status",
            "{$this->table}.payment_status",
            "{$this->table}.created_at"
        )
            ->with('customer')
            ->orderBy("{$this->table}.created_at", 'desc');

        return datatables()->of($query)
            ->setRowId('id')
            ->make(true);
    }

    /* =======================
        REVIEW
    ======================= */

    public function ajax_review(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        try {
            $query = $this->model
                ->with(['customer', 'orderDetails.product'])
                ->findOrFail($validatedData['id']);

            return response()->json([
                'success' => true,
                'data' => $query
            ]);
        } catch (\Exception $e) {
            \Log::error("Error review {$this->module}: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi bất ngờ xảy ra.')
            ], 500);
        }
    }

    /* =======================
        INSERT
    ======================= */

    public function ajax_insert(Request $request)
    {
        $validatedData = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'total_price' => 'required|numeric|min:0',
            'order_status' => 'required|string|in:pending,completed,cancelled',
            'payment_status' => 'required|boolean',
            'note' => 'nullable|string'
        ]);

        try {
            $query = $this->model->create($validatedData);

            session()->flash('success', __('Lưu đơn hàng thành công.'));

            return response()->json([
                'success' => true,
                'message' => __('Lưu đơn hàng thành công.'),
                'redirect_url' => route("{$this->module}.view.index")
            ]);
        } catch (\Exception $e) {
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi xảy ra.')
            ], 500);
        }
    }

    /* =======================
        UPDATE
    ======================= */

    public function ajax_update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
            'total_price' => 'required|numeric|min:0',
            'order_status' => 'required|string|in:pending,completed,cancelled',
            'payment_status' => 'required|boolean',
            'note' => 'nullable|string'
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);

            $query->fill($validatedData);

            if ($query->isDirty()) {
                $query->save();

                session()->flash('success', __('Cập nhật đơn hàng thành công.'));

                return response()->json([
                    'success' => true,
                    'message' => __('Cập nhật đơn hàng thành công.')
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
                'message' => __('Có lỗi xảy ra.')
            ], 500);
        }
    }

    /* =======================
        DELETE
    ======================= */

    public function ajax_delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => "required|integer|exists:{$this->table},id",
        ]);

        try {
            $query = $this->model::findOrFail($validatedData['id']);
            $query->delete();

            return response()->json([
                'success' => true,
                'message' => __('Xóa đơn hàng thành công.')
            ]);
        } catch (\Exception $e) {
            \Log::error("Error deleting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('Có lỗi xảy ra.')
            ], 500);
        }
    }
}
