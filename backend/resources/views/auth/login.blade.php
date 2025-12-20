<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng Nhập</title>

    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link rel="stylesheet" href="{{ asset('admin/plugins/fontawesome-free/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/dist/css/adminlte.min.css') }}">

    <script src="{{ asset('assets/js/plugins/sweetalert.min.js') }}"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    <style>
        .spin-loading-info {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: 999999;
            display: none;
        }

        .spin-loading-info .spinner-border {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4rem;
            height: 4rem;
            transform: translate(-50%, -50%);
        }

        .btn-primary {
            background-color: #007bff !important;
            border-color: #007bff !important;
            color: #fff !important;
            border-radius: 6px;
            padding: 10px 8px !important; 
            font-weight: 600;
            line-height: 1.2; 
            height: auto; 
        }

        .btn-primary:hover {
            background-color: #0056b3 !important;
        }
    </style>
</head>

<body class="hold-transition login-page">
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <h1><b>Đăng Nhập</b></h1>
            </div>
            <div class="card-body">
                <form id="formLogin">
                    <div class="input-group mb-3">
                        <input type="email" id="email" class="form-control" placeholder="Nhập Email"
                            value="{{ old('email', Cookie::get('email') ?? '') }}">
                        <div class="input-group-append">
                            <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input type="password" id="password" class="form-control" placeholder="Nhập Mật Khẩu">
                        <div class="input-group-append">
                            <div class="input-group-text"><span class="fas fa-lock"></span></div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" {{ Cookie::get('remember') ? 'checked' : '' }}>
                                <label for="remember">Ghi nhớ đăng nhập</label>
                            </div>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Đăng Nhập</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <!-- JS -->
    <script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('admin/dist/js/adminlte.min.js') }}"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    @include('partials.modals.spin_info')
    <script>
        $(document).ready(function () {
            $('#formLogin').on('submit', function (e) {
                e.preventDefault();

                const email = $('#email').val().trim();
                const password = $('#password').val().trim();
                const remember = $('#remember').is(':checked');
                // console.log([email,password,remember]);
                // return;

                const errors = validateForm(email, password);
                if (errors.length) {
                    displayErrors(errors);
                    return;
                }

                $.ajax({
                    url: "{{ route('auth.ajax.login') }}",
                    method: "POST",
                    data: {
                        email: email,
                        password: password,
                        remember: remember,
                        _token: "{{ csrf_token() }}"
                    },
                    beforeSend: function () {
                        $('.spin-loading-info').show();
                    },
                    success: function (response) {
                        $('.spin-loading-info').hide();
                        if (response.success) {
                            window.location.href = response.redirect;
                        } else {
                            displayError(response.message);
                        }
                    },
                    error: function (xhr) {
                        $('.spin-loading-info').hide();
                        const msg = xhr.responseJSON?.message || 'Đã xảy ra lỗi không mong đợi.';
                        displayError(msg);
                    }
                });
            });

            function validateForm(email, password) {
                const errors = [];
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!email) errors.push("Vui lòng nhập email.");
                else if (!emailRegex.test(email)) errors.push("Email không hợp lệ.");

                if (!password) errors.push("Vui lòng nhập mật khẩu.");

                return errors;
            }

            function displayErrors(errors) {
                errors.forEach(err => displayError(err));
            }

            function displayError(message) {
                swal({
                    title: "Lỗi!",
                    text: message,
                    icon: "error",
                    button: "Đóng"
                });
            }
        });
    </script>
</body>

</html>