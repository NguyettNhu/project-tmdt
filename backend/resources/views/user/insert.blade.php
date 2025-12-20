@extends('index')
@section('title', 'Thêm Dữ Liệu')
@section('breadcrumb-home', 'Thành Viên')
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
                            <label class="col-form-label pt-0">Tên <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Nhập Tên">
                        </div>
                        <div>
                            <label class="col-form-label">Email <sup>(*)</sup></label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="Nhập Email">
                        </div>
                        <div>
                            <label class="col-form-label">Mật Khẩu <sup>(*)</sup></label>
                            <input type="password" class="form-control" name="password" id="password"
                                placeholder="Nhập Mật Khẩu">
                        </div>
                        <div>
                            <label class="col-form-label">Nhập Lại Mật Khẩu <sup>(*)</sup></label>
                            <input type="password" class="form-control" name="re_password" id="re_password"
                                placeholder="Nhập Lại Mật Khẩu">
                        </div>
                        <div>
                            <label class="col-form-label">Role <sup>(*)</sup></label>
                            <select name="role" class="form-control role-select">
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                            </select>
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
            </div>
        </div>
    </form>
    <style>
        .role-select {
            height: 42px;
            border-radius: 6px;
        }

        .form-group label {
            font-weight: 600;
            margin-bottom: 6px;
        }
    </style>
@endsection