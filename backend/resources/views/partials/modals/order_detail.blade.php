<div class="modal fade" id="modalOrderDetail" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Chi Tiết Đơn Hàng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="order_id">

                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Tổng Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orderDetails ?? [] as $detail)
                            <tr>
                                <td>{{ $detail->id }}</td>
                                <td>
                                    <img src="{{ asset('storage/uploads/products/' . $detail->product->image) }}"
                                        style="width:50px;height:50px;object-fit:cover">
                                </td>
                                <td>{{ $detail->product->name }}</td>
                                <td>{{ number_format($detail->price) }} VNĐ</td>
                                <td>{{ $detail->quantity }}</td>
                                <td>{{ number_format($detail->total) }} VNĐ</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Đóng
                </button>
            </div>
        </div>
    </div>
</div>