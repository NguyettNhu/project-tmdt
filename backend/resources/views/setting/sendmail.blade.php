<div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
            aria-expanded="false" aria-controls="collapseTwo">
            CÀI ĐẶT GỬI MAIL
        </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample">
        <form id="formSendEmail">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Mailer:</label>
                            <input type="text" class="form-control" id="mailer" placeholder="Nhập Mailer"
                                value="{{ $sendmail['mailer'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Host:</label>
                            <input type="text" class="form-control" id="host" placeholder="Nhập Host"
                                value="{{ $sendmail['host'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Port:</label>
                            <input type="text" class="form-control" id="port" placeholder="Nhập Port"
                                value="{{ $sendmail['port'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Tài khoản SMTP:</label>
                            <input type="text" class="form-control" id="username" placeholder="Nhập tài khoản SMTP"
                                value="{{ $sendmail['username'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Mật khẩu SMTP:</label>
                            <input type="password" class="form-control" id="password" placeholder="Nhập mật khẩu SMTP"
                                value="{{ $sendmail['password'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Phương thức mã hóa:</label>
                            <input type="text" class="form-control" id="encryction"
                                placeholder="Nhập phương thức mã hóa" value="{{ $sendmail['encryction'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Địa chỉ email gửi đi:</label>
                            <input type="text" class="form-control" id="from_address"
                                placeholder="Nhập địa chỉ email gửi đi" value="{{ $sendmail['from_address'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Tên hiển thị khi gửi email:</label>
                            <input type="text" class="form-control" id="from_name"
                                placeholder="Nhập tên hiển thị khi gửi email"
                                value="{{ $sendmail['from_name'] ?? '' }}">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-outline-primary has-ripple">
                        <i class="feather icon-save"></i>
                        LƯU LẠI
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
<script>
    $(document).ready(function () {
        $('#formSendEmail').on('submit', function (e) {
            e.preventDefault();

            const mailer = $('#mailer').val();
            const host = $('#host').val();
            const port = $('#port').val();
            const username = $('#username').val();
            const password = $('#password').val();
            const encryction = $('#encryction').val();
            const from_address = $('#from_address').val();
            const from_name = $('#from_name').val();

            let formData = {
                mailer,
                host,
                port,
                username,
                password,
                encryction,
                from_address,
                from_name
            };

            swal({
                title: "Bạn có chắc chắn muốn tiếp tục không?",
                text: "Cập nhật dữ liệu. Hãy xác nhận trước khi thực hiện!",
                icon: "info",
                buttons: true,
            })
                .then((willUpdate) => {
                    if (willUpdate) {
                        $.ajax({
                            type: 'POST',
                            url: "{{ route($module . '.ajax.sendmail') }}",
                            data: formData,
                            beforeSend: function () {
                                const spinnerHtml = `
                            <div class="text-center">
                                <div class="spinner-border text-info" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        `;
                                swal({
                                    title: "Đang xử lý...",
                                    text: "Xin vui lòng chờ một chút.",
                                    content: {
                                        element: "div",
                                        attributes: {
                                            innerHTML: spinnerHtml,
                                        },
                                    },
                                    buttons: false,
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                });
                            },
                            success: function (response) {
                                setTimeout(() => {
                                    swal.stopLoading();
                                    swal.close();

                                    if (response.success) {
                                        swal(response.message, {
                                            icon: "success",
                                        });
                                    } else {
                                        toastr.error(response.message);
                                    }
                                }, 1000);
                            },
                            error: function (xhr) {
                                setTimeout(() => {
                                    swal.stopLoading();
                                    swal.close();

                                    let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                                    toastr.error(message);
                                }, 1000);
                            }
                        });
                    }
                })
        });
    });
</script>