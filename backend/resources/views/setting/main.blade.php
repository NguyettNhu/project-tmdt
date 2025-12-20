@extends('index')
@section('title', 'Bảng Cấu Hình Website')
@section('breadcrumb-home', 'Bảng Điều Khiển')
@section('breadcrumb-current', 'Cấu Hình Website')
@section('content')
<style>
.swal-title {
    font-size: 20px;
}
</style>
<div class="accordion card" id="accordionExample">
    @include('setting/info')
    @include('setting/sendmail')
    @include('setting/seo')
</div>
@endsection