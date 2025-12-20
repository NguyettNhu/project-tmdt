@extends('index')
@section('title', 'Bảng Khách Hàng')
@section('breadcrumb-home', 'Bảng Điều Khiển')
@section('breadcrumb-current', 'Khách Hàng')
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
                                    <th>Avatar</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Ngày Tạo</th>
                                    <th>Trạng Thái</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($items as $item)
                                    <tr>
                                        <td>
                                            @if (!empty($item->image))
                                                <img src="{{ asset('storage/uploads/' . $module . '/' . $item->image) }}"
                                                    style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
                                            @else
                                                <img src="{{ asset('/assets/img/img-default.jpg') }}"
                                                    style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
                                            @endif
                                        </td>
                                        <td>{{ $item->name }}</td>
                                        <td>{{ $item->email }}</td>
                                        <td>
                                            {{ $item->created_at->format('d/m/Y') }} <br>
                                            {{ $item->created_at->format('H:i:s') }}
                                        </td>
                                        <td>
                                            @if ($item->status == 1)
                                                <span class="badge bg-success">Bật</span>
                                            @else
                                                <span class="badge bg-danger">Tắt</span>
                                            @endif
                                        </td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" onclick="openPasswordModal({{ $item->id }})">
                                                <i class="fa-solid fa-arrows-rotate"></i>
                                            </button>
                                            <button class="btn btn-info btn-sm" onclick="review({{ $item->id }})">
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
                            function openPasswordModal(id) {
                                $('.idHidden').val(id);  // Gán ID vào input hidden
                                $('#modalPassword').modal('show'); // Mở modal đổi mật khẩu
                            }
                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('partials.modals.password')
    {{--
    <script>
        $(document).ready(function () {
            const module = "{{ $module }}";

            $('#dom-jqry').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ route($module . '.ajax.data') }}",
                    type: 'GET',
                },
                columns: [
                    {
                        data: 'image',
                        render: function (data, type, row) {
                            const imageSrc = data ? `{{ asset('/storage/uploads/${module}/${data}') }}` : defaultImage;
                            return `<a href="${imageSrc}" data-lightbox="1" data-title="${data ?? 'img-default.jpg'}">
                                                                                                                                <img src="${imageSrc}" alt="${data ?? 'img-default.jpg'}" class="img-fluid img-thumbnail">
                                                                                                                            </a>`;
                        }
                    },
                    { data: 'name' },
                    { data: 'email' },
                    {
                        data: 'role_name',
                        render: function (data, type, row) {
                            return `<span class="badge bg-primary">${data}</span>`;
                        }
                    },
                    {
                        data: 'created_at',
                        render: function (data, type, row) {
                            const date = new Date(data);
                            const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
                            const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' };

                            const formattedDate = date.toLocaleDateString('vi-VN', optionsDate);
                            const formattedTime = date.toLocaleTimeString('vi-VN', optionsTime);

                            return `${formattedDate}<br>${formattedTime}`;
                        }
                    },
                    {
                        data: 'status',
                        render: function (data, type, row) {
                            return `<div class="form-group">
                                                                                                                            <div class="switch switch-success d-inline m-r-10">
                                                                                                                                <input type="checkbox" id="switch-p-${row.id}" data-id="${row.id}" onclick="toggleStatus(this)" ${data ? 'checked' : ''}>
                                                                                                                                <label for="switch-p-${row.id}" class="cr"></label>
                                                                                                                            </div>
                                                                                                                        </div>`;
                        }
                    },
                    {
                        data: 'id',
                        name: 'id',
                        render: function (data, type, row) {

                            let btn_fc = `<button type="button" class="btn btn-icon btn-outline-info" onclick="getId(${data})" data-bs-toggle="modal" data-bs-target="#modalPassword">
                                                                                                                                <i class="feather icon-refresh-ccw"></i>
                                                                                                                            </button>`;

                            btn_fc += btn_function(data);

                            return btn_fc;
                        }
                    }
                ],
                order: [[3, 'desc']],
                pageLength: 10
            });
        });
    </script> --}}
@endsection