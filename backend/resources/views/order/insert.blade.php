@extends('index')
@section('title', 'Thêm Đơn Hàng')
@section('breadcrumb-home', 'Đơn Hàng')
@section('breadcrumb-current', 'Thêm Đơn Hàng')

@section('content')
    <form id="formInsert">
        @csrf
        <div class="row">
            {{-- CỘT TRÁI --}}
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN ĐƠN HÀNG</h5>
                    </div>
                    <div class="card-body">

                        <div>
                            <label class="col-form-label">Khách Hàng <sup>(*)</sup></label>
                            <select name="customer_id" class="form-control">
                                <option value="">-- Chọn Khách Hàng --</option>
                                @foreach ($customers as $customer)
                                    <option value="{{ $customer->id }}">
                                        {{ $customer->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label class="col-form-label">Tổng Tiền</label>
                            <input type="number" class="form-control" name="total_price"
                                placeholder="Tự động tính hoặc nhập">
                        </div>

                        <div>
                            <label class="col-form-label">Trạng Thái Đơn Hàng</label>
                            <select name="order_status" class="form-control">
                                <option value="pending">Chờ Xử Lý</option>
                                <option value="completed">Hoàn Thành</option>
                                <option value="cancelled">Hủy</option>
                            </select>
                        </div>

                        <div>
                            <label class="col-form-label">Trạng Thái Thanh Toán</label>
                            <select name="payment_status" class="form-control">
                                <option value="0">Chưa Thanh Toán</option>
                                <option value="1">Đã Thanh Toán</option>
                            </select>
                        </div>

                        <div>
                            <label class="col-form-label">Ghi Chú</label>
                            <textarea name="note" class="form-control" rows="3" placeholder="Ghi chú đơn hàng"></textarea>
                        </div>

                    </div>
                </div>
            </div>

            {{-- CỘT PHẢI --}}
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5>HÀNH ĐỘNG</h5>
                    </div>
                    <div class="card-body">
                        <p>✔ Kiểm tra thông tin trước khi lưu</p>
                    </div>
                </div>

                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.insert')
                </div>
            </div>
        </div>
    </form>
@endsection