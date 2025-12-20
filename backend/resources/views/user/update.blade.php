@extends('index')
@section('title', 'Cập Nhật Dữ Liệu')
@section('breadcrumb-home', 'Thành Viên')
@section('breadcrumb-current', 'Cập Nhật Dữ Liệu')
@section('content')
    <form id="formUpdate">
        @csrf
        <input type="hidden" name="id" id="idEdit" value="{{ $data['id'] }}">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN CƠ BẢN</h5>
                    </div>
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Tên <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="name" id="name" value="{{ $data['name'] }}"
                                placeholder="Nhập Tên">
                        </div>
                        <div>
                            <label class="col-form-label">Email <sup>(*)</sup></label>
                            <input type="email" class="form-control" name="email" id="email" value="{{ $data['email'] }}"
                                disabled placeholder="Nhập Email">
                        </div>
                        <div>
                            <label class="col-form-label">Mật Khẩu <sup>(*)</sup></label>
                            <input type="password" class="form-control" name="password" id="password" value="******"
                                disabled placeholder="Nhập Mật Khẩu">
                        </div>
                        <div>
                            <label class="col-form-label">Nhập Lại Mật Khẩu <sup>(*)</sup></label>
                            <input type="password" class="form-control" name="re_password" id="re_password" value="******"
                                disabled placeholder="Nhập Lại Mật Khẩu">
                        </div>
                        <div>
                            <label class="col-form-label">Role <sup>(*)</sup></label>
                            <select name="role" id="role" class="form-control role-select">
                                <option name="Admin" value="Admin" {{ $data['role'] == 'Admin' ? 'selected' : '' }}>Admin
                                </option>
                                <option name="Staff" value="Staff" {{ $data['role'] == 'Staff' ? 'selected' : '' }}>Staff
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="col-form-label">Trạng Thái</label>
                            <select name="status" class="form-control">
                                <option value="1" {{ $data['status'] == 1 ? 'selected' : '' }}>Bật</option>
                                <option value="0" {{ $data['status'] == 0 ? 'selected' : '' }}>Tắt</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5>ẢNH ĐẠI DIỆN</h5>
                    </div>
                    <div class="card-body">
                        <div class="file-loading">
                            <input id="file" name="file" class="files" type="file">
                        </div>
                    </div>
                </div>
                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.update')
                </div>
            </div>
        </div>
    </form>
    {{--
    <script>
        const currentLang = '{{ app()->getLocale() }}';
        $(document).ready(function () {
            $('#formUpdate').on('submit', function (e) {
                e.preventDefault();

                const name = $('#name').val();
                const idEdit = $('#idEdit').val();
                const file = $('#file')[0].files[0];
                const role_id = $('#role_id').val();
                const errors = validateForm(name);
                if (errors.length) {
                    errors.forEach(error => toastr.error(error));
                    return false;
                }

                let formData = new FormData();

                formData.append('id', idEdit);
                formData.append('name', name);

                if (file) formData.append('file', file);

                ajax_update_alert(formData);
            });
        });
        function validateForm(name) {
            const errors = [];
            if (!name) {
                errors.push(messages[currentLang].required_name);
            }
            return errors;
        }
    </script> --}}
    @if(isset($data['image']) && !empty($data['image']))
        <script>
            const imageUrl = "{{ asset('storage/uploads/' . $module . '/' . $data['image']) }}";

            $('#file').fileinput({
                initialPreview: [imageUrl],
                initialPreviewAsData: true,
                initialPreviewConfig: [
                    {
                        caption: '{{ $data['image'] }}',
                        size: 1234,
                        width: '120px',
                        key: 1
                    }
                ],
                overwriteInitial: true,
                allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp'],
            });
        </script>
    @endif
    <style>
        .role-group label {
            font-weight: 600;
            margin-bottom: 6px;
            display: inline-block;
        }

        .role-select {
            height: 42px;
            padding: 8px 12px;
            border-radius: 6px;
            transition: 0.2s ease;
        }

        .role-select:hover {
            border-color: #4099ff;
        }

        .role-select:focus {
            border-color: #4099ff;
            box-shadow: 0 0 0 0.2rem rgba(64, 153, 255, 0.25);
        }
    </style>
@endsection