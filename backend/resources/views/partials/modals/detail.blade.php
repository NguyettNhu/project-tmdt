<p><strong>Người đặt:</strong> {{ $order->customer_name }}</p>
<p><strong>Ngày tạo:</strong> {{ $order->created_at }}</p>

<table class="table table-bordered text-center">
    <thead>
        <tr>
            <th>#</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($order->orderDetails as $k => $item)
            <tr>
                <td>{{ $k + 1 }}</td>
                <td>{{ $item->product->name }}</td>
                <td>{{ $item->quantity }}</td>
                <td>{{ number_format($item->price, 0, ',', '.') }} đ</td>
                <td>{{ number_format($item->price * $item->quantity, 0, ',', '.') }} đ</td>
            </tr>
        @endforeach
    </tbody>
</table>
