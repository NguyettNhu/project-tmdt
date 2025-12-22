@extends('index')
@section('title', 'Bảng Đơn Hàng')
@section('breadcrumb-home', 'Bảng Điều Khiển')
@section('breadcrumb-current', 'Đơn Hàng')

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                @include('partials.card_header')
                <div class="card-body">
                    <div class="table-responsive dt-responsive">
                        <table id="dom-jqry" class="table table-striped table-bordered nowrap text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Tổng Tiền</th>
                                    <th>Trạng Thái Đơn Hàng</th>
                                    <th>Trạng Thái Thanh Toán</th>
                                    <th>Ngày Tạo</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($items as $item)
                                    <tr>
                                        <td>{{ $item->id }}</td>
                                        <td>{{ $item->customer->name ?? 'Khách lẻ' }}</td>
                                        <td>{{ number_format($item->total_price, 0, ',', '.') }} đ</td>

                                        <td>
                                            @if ($item->order_status == 'completed')
                                                <span class="badge bg-success">Hoàn Thành</span>
                                            @elseif($item->order_status == 'pending')
                                                <span class="badge bg-warning">Chờ Xử Lý</span>
                                            @else
                                                <span class="badge bg-danger">Hủy</span>
                                            @endif
                                        </td>

                                        <td>
                                            @if ($item->payment_status == 1)
                                                <span class="badge bg-success">Đã Thanh Toán</span>
                                            @else
                                                <span class="badge bg-danger">Chưa Thanh Toán</span>
                                            @endif
                                        </td>

                                        <td>
                                            {{ $item->created_at->format('d/m/Y') }} <br>
                                            {{ $item->created_at->format('H:i:s') }}
                                        </td>

                                        <td>
                                            <button class="btn btn-info btn-sm" onclick="viewOrderDetail({{ $item->id }})">
                                                <i class="fas fa-eye"></i>
                                            </button>

                                            <a href="{{ route($module . '.view.update', $item->id) }}"
                                                class="btn btn-warning btn-sm">
                                                <i class="fas fa-edit"></i>
                                            </a>

                                            <button class="btn btn-danger btn-sm" onclick="hienpopup({{ $item->id }})">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                        <script>
                            $(document).ready(function () {
                                $('#dom-jqry').DataTable({
                                    pageLength: 10,
                                    responsive: true,
                                    ordering: true,
                                    searching: true,
                                });
                            });
                        </script>

                        <script>
                            function viewOrderDetail(id) {
                                $('#order_id').val(id);
                                $('#modalOrderDetail').modal('show');
                            }
                        </script>

                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('partials.modals.order_detail')
@endsection