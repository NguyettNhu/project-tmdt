@extends('index')
@section('title', 'Bảng Menu')
@section('breadcrumb-home', 'Bảng Điều Khiển')
@section('breadcrumb-current', 'Menu')
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
                                    <th>Thứ Tự</th>
                                    <th>Tên</th>
                                    {{-- <th>Icon</th> --}}
                                    <th>Loại</th>
                                    <th>Ngày Tạo</th>
                                    <th>Kích Hoạt</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tbody>
                                @foreach ($items as $key => $item)
                                    <tr>
                                        <td>{{ $key + 1 }}</td>

                                        <td>{{ $item->name }}</td>

                                        {{-- @if(!empty($item->icon))
                                        <img src="{{ asset('storage/uploads/' . $module . '/' . $item->icon) }}"
                                            style="width:35px;height:35px;object-fit:cover;">
                                        @endif --}}

                                        <td>{{ $item->type ?? 'Không có' }}</td>

                                        <td>
                                            {{ $item->created_at->format('d/m/Y') }} <br>
                                            {{ $item->created_at->format('H:i:s') }}
                                        </td>

                                        <td>
                                            @if($item->is_active == 1)
                                                <span class="badge bg-success">Bật</span>
                                            @else
                                                <span class="badge bg-danger">Tắt</span>
                                            @endif
                                        </td>

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
                                    </tr>
                                @endforeach
                            </tbody>
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
            var table = $('#dom-jqry').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ route($module . '.ajax.data') }}",
                    type: 'GET',
                },
                columns: [
                    {
                        data: 'sort',
                        render: function (data, type, row) {
                            let options = '';
                            for (let i = 1; i <= 20; i++) {
                                options += `<option value="${i}" ${data == i ? 'selected' : ''}>${i}</option>`;
                            }
                            return `<select class="form-control text-center" data-id="${row.id}" onchange="updateSort(this)">
                                                                ${options}
                                                            </select>`;
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
                        data: 'icon',
                        render: function (data, type, row) {
                            return `<i class="${data}"></i>`;
                        }
                    },
                    {
                        data: 'type',
                        render: function (data, type, row) {
                            return `<span class="badge bg-info">${data}</span>`;
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
                            return btn_function(data);
                        }
                    }
                ],
                order: [[3, 'asc'], [0, 'asc']],
                pageLength: 10
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
                                                                    <th>Thứ Tự</th>
                                                                    <th>Tên</th>
                                                                    <th>Icon</th>
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

                let options = '';
                for (let i = 1; i <= 20; i++) {
                    options += `<option value="${i}" ${row.sort == i ? 'selected' : ''}>${i}</option>`;
                }

                return `<tr id="${row.id}">
                                                    <td>
                                                        <select class="form-control text-center" data-id="${row.id}" onchange="updateSort(this)">
                                                            ${options}
                                                        </select>
                                                    </td>
                                                    <td class="text-start">|----- ${row.name}</td>
                                                    <td><i class="${row.icon}"></i></td>
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