@extends('index')
@section('title', 'Cập Nhật Dữ Liệu')
@section('breadcrumb-home', 'Danh Mục')
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
                            <input type="text" class="form-control" name="name" id="name" placeholder="Nhập Tên"
                                value="{{ $data['name'] }}">
                            <span class="error error_name"></span>
                        </div>
                        <div>
                            <label class="col-form-label">Slug <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="slug" id="slug" placeholder="Nhập Slug"
                                value="{{ $data['slug'] }}">
                            <span class="error error_slug"></span>
                        </div>
                        <div>
                            <label class="col-form-label">Nội Dung</label>
                            <textarea name="content" id="content"></textarea>
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
                {{-- <div class="card">
                    <div class="card-header">
                        <h5>THẺ SEO</h5>
                    </div>
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Tiêu Đề Seo:</label>
                            <input type="text" class="form-control" id="title_seo" placeholder="Nhập Tiêu Đề Seo"
                                value="{{ $data['title_seo'] ?? '' }}">
                        </div>
                        <div>
                            <label class="col-form-label">Mô Tả Seo:</label>
                            <textarea id="description_seo" class="form-control" rows="3"
                                placeholder="Nhập Mô Tả Seo">{{ $data['description_seo'] ?? '' }}</textarea>
                        </div>
                        <div>
                            <label class="col-form-label">Canonical:</label>
                            <input type="text" class="form-control" id="canonical_seo" placeholder="Nhập Canonical"
                                value="{{ $data['canonical_seo'] ?? '' }}">
                        </div>
                    </div>
                </div> --}}
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
                <div class="card mt-30">
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Loại</label>
                            <select class="form-control" name="type" id="type" onchange="getParent(this)">
                                <option value="">...</option>
                                @foreach ($typeCategory as $key => $value)
                                    <option value="{{$key}}" {{ $data['type'] == $key ? 'selected' : '' }}>{{$value}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="col-form-label">Cha</label>
                            <select class="form-control" name="parent_id" id="parent_id">
                                <option value="">...</option>
                                {!! $recursive !!}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    {{--
    <script>
        const currentLang = '{{ app()->getLocale() }}';
        $(document).ready(function () {
            const initialContent = {!! json_encode($data -> content ?? '')!!
        };
        setEditorData(initialContent);

        $('#formUpdate').on('submit', function (e) {
            e.preventDefault();

            const name = $('#name').val();
            const slug = $('#slug').val();
            const parent_id = $('#parent_id').val();
            const type = $('#type').val();
            const editorData = getEditorData();
            const idEdit = $('#idEdit').val();
            const file = $('#file')[0].files[0];

            // const title_seo = $('#title_seo').val();
            // const description_seo = $('#description_seo').val();
            // const canonical_seo = $('#canonical_seo').val();

            const errors = validateForm(name, slug);
            if (errors.length) {
                errors.forEach(error => toastr.error(error));
                return false;
            }

            let formData = new FormData();
            formData.append('id', idEdit);
            formData.append('name', name);
            formData.append('slug', slug);
            formData.append('parent_id', parent_id);
            formData.append('type', type);
            formData.append('content', editorData);
            if (file) formData.append('file', file);
            // formData.append('title_seo', title_seo);
            // formData.append('description_seo', description_seo);
            // formData.append('canonical_seo', canonical_seo);

            ajax_update_alert(formData);
        });
                    });
        function validateForm(name, slug) {
            const errors = [];
            if (!name) {
                errors.push(messages[currentLang].required_name);
            }
            if (!slug) {
                errors.push(messages[currentLang].required_slug);
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

@endsection