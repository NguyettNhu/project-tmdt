@extends('index')
@section('title', 'Thêm Dữ Liệu')
@section('breadcrumb-home', 'Tin Tức')
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
                        </div>
                        <div>
                            <label class="col-form-label">Slug: <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="slug" id="slug" placeholder="Nhập Slug">
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
                    @include('partials.button.insert')
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
                                placeholder="Nhập Mô Tả"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection