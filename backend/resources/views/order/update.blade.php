@extends('index')
@section('title', 'Cập Nhật Đơn Hàng')
@section('breadcrumb-home', 'Đơn Hàng')
@section('breadcrumb-current', 'Cập Nhật Đơn Hàng')

@section('content')
    <form id="formUpdate">
        @csrf
        <input type="hidden" name="id" value="{{ $data->id }}">

        <div class="row">
            {{-- CỘT TRÁI --}}
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN ĐƠN HÀNG</h5>
                    </div>
                    <div class="card-body">

                        <div>
                            <label class="col-form-label">Khách Hàng</label>
                            <input type="text" class="form-control" value="{{ $data->customer->name ?? 'Khách lẻ' }}"
                                disabled>
                        </div>

                        <div>
                            <label class="col-form-label">Tổng Tiền</label>
                            <input type="number" class="form-control" name="total_price" value="{{ $data->total_price }}">
                        </div>

                        <div>
                            <label class="col-form-label">Trạng Thái Đơn</label>
                            <select name="order_status" class="form-control">
                                <option value="pending" {{ $data->order_status == 'pending' ? 'selected' : '' }}>
                                    Chờ Xử Lý
                                </option>
                                <option value="completed" {{ $data->order_status == 'completed' ? 'selected' : '' }}>
                                    Hoàn Thành
                                </option>
                                <option value="cancelled" {{ $data->order_status == 'cancelled' ? 'selected' : '' }}>
                                    Hủy
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="col-form-label">Thanh Toán</label>
                            <select name="payment_status" class="form-control">
                                <option value="0" {{ $data->payment_status == 0 ? 'selected' : '' }}>
                                    Chưa Thanh Toán
                                </option>
                                <option value="1" {{ $data->payment_status == 1 ? 'selected' : '' }}>
                                    Đã Thanh Toán
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="col-form-label">Ghi Chú</label>
                            <textarea name="note" class="form-control" rows="3">{{ $data->note }}</textarea>
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
                        <p>✔ Cập nhật trạng thái đơn hàng</p>
                    </div>
                </div>

                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.update')
                </div>
            </div>
        </div>
    </form>
@endsection