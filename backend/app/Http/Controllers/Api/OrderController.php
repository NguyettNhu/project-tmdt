<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\User;
use App\Models\Customer;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    // GET /api/orders (My Orders)
    public function index(Request $request)
    {
        $user = $request->user();

        // Admin: Show all orders
        if ($user && $user instanceof User) {
            $orders = Order::with('orderDetails.product')
                ->orderBy('created_at', 'desc')
                ->get();
            return $this->successResponse(OrderResource::collection($orders), 'Danh sách tất cả đơn hàng');
        }

        // Customer: Show own orders
        $customerId = $request->input('customer_id');
        
        if ($user && $user instanceof Customer) {
             $customerId = $user->id;
        }

        if (!$customerId) {
             return $this->errorResponse('Unauthorized or missing customer_id', 401);
        }

        $orders = Order::where('customer_id', $customerId)
            ->with('orderDetails.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->successResponse(OrderResource::collection($orders), 'Danh sách đơn hàng');
    }

    // GET /api/orders/{id}
    public function show($id)
    {
        $order = Order::with('orderDetails.product')->find($id);

        if (!$order) {
            return $this->errorResponse('Đơn hàng không tồn tại', 404);
        }

        return $this->successResponse(new OrderResource($order), 'Chi tiết đơn hàng');
    }

    // POST /api/orders (Checkout)
    public function store(StoreOrderRequest $request)
    {
        try {
            $order = $this->orderService->createOrder($request->validated());
            return $this->successResponse(new OrderResource($order), 'Đặt hàng thành công', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Lỗi khi tạo đơn hàng: ' . $e->getMessage(), 500);
        }
    }

    // PUT /api/admin/orders/{id}/status (Admin only)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'order_status' => 'required|integer|min:0|max:4',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return $this->errorResponse('Đơn hàng không tồn tại', 404);
        }

        // Map numeric status to string
        $statusMap = [
            0 => 'pending',
            1 => 'confirmed',
            2 => 'shipping',
            3 => 'completed',
            4 => 'cancelled',
        ];

        $order->order_status = $statusMap[$request->order_status];
        $order->updated_by = $request->user()->id ?? null;
        $order->save();

        return $this->successResponse(
            new OrderResource($order->load('customer', 'orderDetails.product')), 
            'Cập nhật trạng thái đơn hàng thành công'
        );
    }
}

