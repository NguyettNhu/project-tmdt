@extends('index')
@section('title', 'Thêm Dữ Liệu')
@section('breadcrumb-home', 'Menu')
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
                            <label class="col-form-label">Đường Dẫn <sup>(*)</sup></label>
                            <input type="text" class="form-control" name="path" id="path" placeholder="Nhập Đường Dẫn">
                        </div>
                        <div>
                            <label class="col-form-label">Loại <sup>(*)</sup></label>
                            <select class="form-control" name="type" id="type" onchange="getParent(this)">
                                <option value="">...</option>
                                @foreach ($typeMenu as $key => $value)
                                    <option value="{{$key}}">{{$value}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="col-form-label">Menu Cha</label>
                            <select class="form-control" name="parent_id" id="parent_id" disabled>
                                <option value="">...</option>
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
                            <input type="text" class="form-control" name="icon" id="icon" placeholder="Nhập Icon">
                        </div>
                        <div>
                            <label class="col-form-label">Màu Sắc</label>
                            <input type="text" name="color" id="hue-demo" class="form-control demo" data-control="hue"
                                value="#000000FF">
                        </div>
                    </div>
                </div> --}}
                <div class="row align-items-center">
                    @include('partials.button.exit')
                    @include('partials.button.insert')
                </div>
            </div>
            {{-- <div class="col-md-12">
                @include('partials.icon')
            </div> --}}
        </div>
    </form>
@endsection