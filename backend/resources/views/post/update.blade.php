@extends('index')
@section('title', 'Cập Nhật Dữ Liệu')
@section('breadcrumb-home', 'Tin Tức')
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
                                value="{{ $data['name'] ?? '' }}">
                            <span class="error error_name"></span>
                        </div>
                        <div>
                            <label class="col-form-label">Slug <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="slug" id="slug" placeholder="Nhập Slug"
                                value="{{ $data['slug'] ?? '' }}">
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
                            <label class="col-form-label pt-0">Danh Mục:</label>
                            <select class="form-control" name="parent_id" id="parent_id">
                                <option value="">...</option>
                                {!! $recursive !!}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Mô Tả:</label>
                            <textarea name="description" id="description" class="form-control" rows="5"
                                placeholder="Nhập Mô Tả">{{ $data['description'] ?? '' }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    {{-- @include('partials.modal.library') --}}
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
            const editorData = getEditorData();
            const idEdit = $('#idEdit').val();
            const file = $('#file')[0].files[0];
            const description = $('#description').val();

            // const gallery = $('#gallery').val();

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
            formData.append('content', editorData);
            if (file) formData.append('file', file);
            formData.append('description', description);

            // formData.append('gallery', gallery);

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