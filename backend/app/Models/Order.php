<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Customer;

class Order extends Model
{
    public $table = 'orders';
    public $timestamps = true;

    protected $fillable = [
        'customer_id',
        'total_price',
        'order_status',
        'payment_status',
        'note',
        'created_by',
        'updated_by',
    ];

    /* =======================
        RELATIONSHIPS
    ======================= */

    // Nhân viên tạo đơn
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Khách hàng
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    // Chi tiết đơn hàng
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}
