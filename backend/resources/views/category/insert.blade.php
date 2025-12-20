@extends('index')
@section('title', 'Thêm Dữ Liệu')
@section('breadcrumb-home', 'Danh Mục')
@section('breadcrumb-current', 'Thêm Dữ Liệu')
@section('content')
    <form id="formInsert">
        @csrf
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>THÔNG TIN CƠ BẢN</h5>
                    </div>
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Tên: <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Nhập Tên">
                            <span class="error error_name"></span>
                        </div>
                        <div>
                            <label class="col-form-label">Slug: <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="slug" id="slug" placeholder="Nhập Slug">
                            <span class="error error_slug"></span>
                        </div>
                        <div>
                            <label class="col-form-label">Nội Dung:</label>
                            <textarea name="content" id="content"></textarea>
                        </div>
                        <div>
                            <label class="col-form-label">Trạng Thái</label>
                            <select name="status" class="form-control">
                                <option value="1" selected>Bật</option>
                                <option value="0">Tắt</option>
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
                            <label class="col-form-label">Tiêu Đề Seo:</label>
                            <input type="text" class="form-control" id="title_seo" placeholder="Nhập Tiêu Đề Seo">
                        </div>
                        <div>
                            <label class="col-form-label">Mô Tả Seo:</label>
                            <textarea id="description_seo" class="form-control" rows="3"
                                placeholder="Nhập Mô Tả Seo"></textarea>
                        </div>
                        <div>
                            <label class="col-form-label">Canonical:</label>
                            <input type="text" class="form-control" id="canonical_seo" placeholder="Nhập Canonical">
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
                        <input id="file" name="file" class="files" type="file">
                    </div>
                </div>
                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.insert')
                </div>
                <div class="card mt-30">
                    <div class="card-body">
                        <div>
                            <label class="col-form-label pt-0">Loại:</label>
                            <select class="form-control" name="type" id="type" onchange="getParent(this)">
                                <option value="">...</option>
                                @foreach ($typeCategory as $key => $value)
                                    <option value="{{$key}}">{{$value}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="col-form-label">Cha:</label>
                            <select class="form-control" name="parent_id" id="parent_id" disabled>
                                <option value="">...</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection