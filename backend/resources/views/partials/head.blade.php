<!-- Google Font: Source Sans Pro -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

<!-- Font Awesome -->
<link rel="stylesheet" href="{{ asset('admin/plugins/fontawesome-free/css/all.min.css') }}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

<!-- Tempusdominus Bootstrap 4 -->
<link rel="stylesheet"
    href="{{ asset('admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">

<!-- iCheck -->
<link rel="stylesheet" href="{{ asset('admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">

<!-- JQVMap -->
<link rel="stylesheet" href="{{ asset('admin/plugins/jqvmap/jqvmap.min.css') }}">

<!-- Select2 -->
<link rel="stylesheet" href="{{ asset('admin/plugins/select2/css/select2.min.css') }}">
<link rel="stylesheet" href="{{ asset('admin/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css') }}">

<!-- Bootstrap4 Duallistbox -->
<link rel="stylesheet" href="{{ asset('admin/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css') }}">

<!-- BS-Stepper -->
<link rel="stylesheet" href="{{ asset('admin/plugins/bs-stepper/css/bs-stepper.min.css') }}">

<!-- DropzoneJS -->
<link rel="stylesheet" href="{{ asset('admin/plugins/dropzone/min/dropzone.min.css') }}">

<!-- Theme style -->
<link rel="stylesheet" href="{{ asset('admin/dist/css/adminlte.min.css') }}">

<!-- OverlayScrollbars -->
<link rel="stylesheet" href="{{ asset('admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">

<!-- Daterange picker -->
<link rel="stylesheet" href="{{ asset('admin/plugins/daterangepicker/daterangepicker.css') }}">

<!-- Summernote -->
<link rel="stylesheet" href="{{ asset('admin/plugins/summernote/summernote-bs4.min.css') }}">

<!-- DataTables -->
<link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
<link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
<meta name="csrf-token" content="{{ csrf_token() }}">

<style>
    .error {
        color: red;
        font-size: 13px;
    }

    .file-input button.fileinput-upload,
    .kv-file-remove,
    .file-preview .close,
    .btn-kv-close,
    .kv-file-rotate {
        display: none !important;
    }

    #dom-jqry tbody tr {
        vertical-align: middle;
    }

    .ck-content {
        min-height: 200px;
        max-height: 500px;
    }

    #dom-jqry thead tr th:first-child {
        width: 50px !important;
    }

    .file-drop-zone {
        margin: 0;
    }

    .file-caption .file-caption-name,
    .file-caption .file-caption-icon {
        display: none !important;
    }

    .file-caption .input-group {
        justify-content: center;
    }

    .file-preview {
        padding: 0;
        border: none;
    }

    .file-drop-zone {
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
    }

    #dom-jqry tbody tr:hover {
        background-color: #f5f5f5;
    }

    .mt-30 {
        margin-top: 30px;
    }

    .img-thumbnail:hover {
        transform: scale(1.05);
        opacity: 0.8;
        border-color: #007bff;
    }

    .image-thumbnail {
        height: 150px;
        object-fit: cover;
        width: 100%;
        transition: transform 0.3s ease, opacity 0.3s ease;
        cursor: pointer;
        position: relative;
    }

    .image-thumbnail.selected {
        border: 3px solid red;
    }

    .spin-loading-info,
    .spin-loading-warning,
    .spin-loading-primary {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999999;
        display: none;
    }

    .spin-loading-info .spinner-border,
    .spin-loading-warning .spinner-border,
    .spin-loading-primary .spinner-border {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5rem;
        height: 5rem;
    }
</style>
<script src="{{ asset('assets/js/vendor-all.min.js') }}"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
{{--
<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script> --}}
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.min.css" rel="stylesheet"
    crossorigin="anonymous">
<link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
<script src="{{ asset('assets/js/fileinput.js') }}"></script>
<link rel="stylesheet" href="{{ asset('assets/css/plugins/jquery.minicolors.css') }}">