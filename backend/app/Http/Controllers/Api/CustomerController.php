<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // GET /api/customers
    public function index()
    {
        $customers = Customer::orderBy('id', 'desc')->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách customer',
            'data' => $customers
        ]);
    }

    // GET /api/customers/{id}
    public function show($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Customer không tồn tại',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Chi tiết customer',
            'data' => $customer
        ]);
    }
}
