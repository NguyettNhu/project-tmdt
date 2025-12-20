@extends('index')
@section('title', 'Bảng Danh Mục')
@section('breadcrumb-home', 'Bảng điều khiển')
@section('breadcrumb-current', 'Danh Mục')
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
                                    <th>Loại</th>
                                    <th>Ngày Tạo</th>
                                    <th>Trạng Thái</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach($items as $item)
                                    <tr>
                                        <td>
                                            @if(!empty($item->image))
                                                <img src="{{ asset('storage/uploads/' . $module . '/' . $item->image) }}" alt=""
                                                    style="width:40px;height:40px;border-radius:50%;">
                                            @else
                                                <img src="{{ asset('/assets/img/img-default.jpg') }}"
                                                    style="width:40px;height:40px;border-radius:50%;">
                                            @endif
                                        </td>

                                        <td>{{ $item->name }}</td>

                                        <td>{{ $item->type ?? 'Không có' }}</td>

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
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{--
    <script>
        $(document).ready(function () {
            let table = $('#dom-jqry').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ route($module . '.ajax.data') }}",
                    type: 'GET',
                },
                columns: [
                    {
                        data: 'image', render: function (data, type, row) {
                            const imageSrc = data ? `{{ asset('/storage/uploads/${module}/${data}') }}` : defaultImage;
                            return `<a href="${imageSrc}" data-lightbox="1" data-title="${data ?? 'img-default.jpg'}">
                                                                        <img src="${imageSrc}" alt="${data ?? 'img-default.jpg'}" class="img-fluid img-thumbnail" width="70">
                                                                    </a>`;
                        }
                    },
                    {
                        data: 'name',
                        className: 'text-start',
                        render: function (data, type, row) {
                            const hasChildren = row.children && row.children.length > 0;
                            const iconHtml = hasChildren ? `<i class="feather icon-chevron-right toggle-icon" style="cursor:pointer;font-size:16px;" data-id="${row.id}"></i>` : '';

                            return `${iconHtml}<span class="ml-2">${data}</span>`;
                        }
                    },
                    {
                        data: 'type', render: function (data) {
                            return data ? `<span class="badge bg-info">${data}</span>` : '';
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
                        render: function (data) {
                            return btn_function(data);
                        }
                    }
                ],
                order: [[3, 'asc']],
                pageLength: 10,
            });

            $('#dom-jqry tbody').on('click', '.toggle-icon', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                    $(this).removeClass('icon-chevron-down').addClass('icon-chevron-right');
                } else {
                    var data = row.data();
                    var details = `
                                                                    <table class="table table-striped table-bordered nowrap text-center mb-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Avatar</th>
                                                                                <th>Tên</th>
                                                                                <th>Loại</th>
                                                                                <th>Ngày Tạo</th>
                                                                                <th>Kích Hoạt</th>
                                                                                <th>Hành Động</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                `;
                    if (data.children && data.children.length > 0) {
                        data.children.forEach(function (child) {
                            details += renderRow(child);
                        });
                    } else {
                        details += '<tr><td colspan="7">Không có dữ liệu con.</td></tr>';
                    }
                    details += '</table>';
                    row.child(details).show();
                    tr.addClass('shown');
                    $(this).removeClass('icon-chevron-right').addClass('icon-chevron-down');
                }
            });
            function renderRow(row) {
                const date = new Date(row.created_at);
                const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
                const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' };

                const formattedDate = date.toLocaleDateString('vi-VN', optionsDate);
                const formattedTime = date.toLocaleTimeString('vi-VN', optionsTime);
                return `<tr id="${row.id}">
                                                                <td>
                                                                    <a href="${row.image ? `{{ asset('/storage/uploads/${module}/${row.image}') }}` : defaultImage}" data-lightbox="1" data-title="${row.image ?? 'img-default.jpg'}">
                                                                        <img src="${row.image ? `{{ asset('/storage/uploads/${module}/${row.image}') }}` : defaultImage}" alt="${row.image ?? 'img-default.jpg'}" class="img-fluid img-thumbnail" width="70">
                                                                    </a>
                                                                </td>
                                                                <td class="text-start">|----- ${row.name}</td>
                                                                <td>${row.type ? `<span class="badge bg-info">${row.type}</span>` : ''}</td>
                                                                <td>${formattedDate}<br>${formattedTime}</td>
                                                                <td>
                                                                    <div class="form-group">
                                                                        <div class="switch switch-success d-inline m-r-10">
                                                                            <input type="checkbox" id="switch-p-${row.id}" data-id="${row.id}" onclick="toggleStatus(this)" ${row.status ? 'checked' : ''}>
                                                                            <label for="switch-p-${row.id}" class="cr"></label>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>`+ btn_function(row.id) + `</td>
                                                            </tr>`;
            }
        });
    </script> --}}
@endsection