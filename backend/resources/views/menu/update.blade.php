@extends('index')
@section('title', 'Cập Nhật Dữ Liệu')
@section('breadcrumb-home', 'Menu')
@section('breadcrumb-current', 'Cập Nhật Dữ Liệu')
@section('content')
    <form id="formUpdate">
        @csrf
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN CƠ BẢN</h5>
                    </div>
                    <div class="card-body">
                        <input type="hidden" name="id" id="idEdit" value="{{ $data['id'] }}">
                        <div>
                            <label class="col-form-label pt-0">Tên <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="name" id="name" value="{{ $data['name'] }}"
                                placeholder="Nhập Tên">
                        </div>
                        <div>
                            <label class="col-form-label">Đường Dẫn <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="path" id="path" value="{{ $data['path'] }}"
                                placeholder="Nhập Đường Dẫn">
                        </div>
                        <div>
                            <label class="col-form-label">Loại <sup>(*)</sup></label>
                            <select class="form-control" name="type" id="type" onchange="getParent(this)">
                                @foreach ($typeMenu as $key => $value)
                                    <option value="{{$key}}" {{ $data['type'] == $key ? 'selected' : '' }}>{{$value}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="col-form-label">Menu Cha</label>
                            <select class="form-control" name="parent_id" id="parent_id">
                                <option value="">...</option>
                                {!! $recursive !!}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                {{-- <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN THÊM</h5>
                    </div>
                    <div class="card-body">
                        <div>
                            <label class="col-form-label">Icon</label>
                            <input type="text" class="form-control" name="icon" id="icon" value="{{ $data['icon'] }}"
                                placeholder="Nhập Icon">
                        </div>
                        <div>
                            <label class="col-form-label">Màu Sắc</label>
                            <input type="text" name="color" id="hue-demo" class="form-control demo" data-control="hue"
                                value="{{ $data['color'] }}">
                        </div>
                    </div>
                </div> --}}
                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.update')
                </div>
            </div>
            <div class="col-md-12">
                @include('partials.icon')
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
                const path = $('#path').val();
                const parent_id = $('#parent_id').val();
                const icon = $('#icon').val();
                const type = $('#type').val();
                const idEdit = $('#idEdit').val();
                const color = $('#hue-demo').val();

                const errors = validateForm(name, path, type);
                if (errors.length) {
                    errors.forEach(error => toastr.error(error));
                    return false;
                }

                let formData = new FormData();

                formData.append('name', name);
                formData.append('path', path);
                formData.append('parent_id', parent_id);
                formData.append('icon', icon);
                formData.append('type', type);
                formData.append('color', color);
                formData.append('id', idEdit);

                ajax_update_alert(formData);
            });
        });
        function validateForm(name, path, type) {
            const errors = [];
            if (!name) {
                errors.push(messages[currentLang].required_name);
            }
            if (!path) {
                errors.push(messages[currentLang].required_path);
            }
            if (!type) {
                errors.push(messages[currentLang].required_type);
            }
            return errors;
        }
        function getParent(element) {
            const type = $(element).val();
            const idEdit = $('#idEdit').val();

            let formData = {
                id: idEdit,
                type
            };

            $.ajax({
                type: 'POST',
                url: "{{ route($module . '.ajax.parents') }}",
                data: formData,
                success: function (response) {
                    if (response.success) {
                        let opt = '<option value="">...</option>';
                        opt += response.data;
                        $('#parent_id').html(opt);
                        if (type) {
                            $('#parent_id').removeAttr('disabled');
                        } else {
                            $('#parent_id').attr('disabled', true);
                        }
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (xhr) {
                    let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                    toastr.error(message);
                }
            });
        }
    </script> --}}
@endsection