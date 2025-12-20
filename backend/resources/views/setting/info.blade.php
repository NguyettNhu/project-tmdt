<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            THÔNG TIN CÔNG TY
        </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <form id="formInfo">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Tên Công Ty:</label>
                            <input type="text" class="form-control" id="name" placeholder="Nhập Tên"
                                value="{{ $info['name'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Email:</label>
                            <input type="text" class="form-control" id="email" placeholder="Nhập Email"
                                value="{{ $info['email'] ?? '' }}">
                        </div>
                        {{-- <div class="col-md-6">
                            <label class="col-form-label">Số Điện Thoại:</label>
                            <input type="tel" class="form-control" id="phone" placeholder="Nhập Số Điện Thoại"
                                value="{{ $info['phone'] ?? '' }}">
                        </div> --}}
                        <div class="col-md-6">
                            <label class="col-form-label">Hotline:</label>
                            <input type="tel" class="form-control" id="hotline" placeholder="Nhập Hotline"
                                value="{{ $info['hotline'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Địa Chỉ:</label>
                            <input type="text" class="form-control" id="address" placeholder="Nhập Địa Chỉ"
                                value="{{ $info['address'] ?? '' }}">
                        </div>
                        {{-- <div class="col-md-6">
                            <label class="col-form-label">Địa Chỉ Văn Phòng:</label>
                            <input type="text" class="form-control" id="office" placeholder="Nhập Địa Chỉ Văn Phòng"
                                value="{{ $company['office'] ?? '' }}">
                        </div> --}}
                        <div class="col-md-12">
                            <label class="col-form-label">Mô Tả:</label>
                            <textarea id="description" rows="3" class="form-control"
                                placeholder="Nhập Mô Tả">{{ $info['description'] ?? '' }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Website:</label>
                            <input type="text" class="form-control" id="website" placeholder="Nhập Website"
                                value="{{ $info['website'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Zalo:</label>
                            <input type="text" class="form-control" id="zalo" placeholder="Nhập Zalo"
                                value="{{ $info['zalo'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Facebook:</label>
                            <input type="text" class="form-control" id="facebook" placeholder="Nhập Facebook"
                                value="{{ $info['facebook'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Messenger:</label>
                            <input type="text" class="form-control" id="messenger" placeholder="Nhập Messenger"
                                value="{{ $info['messenger'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Instagram:</label>
                            <input type="text" class="form-control" id="instagram" placeholder="Nhập Instagram"
                                value="{{ $info['instagram'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Copy Right:</label>
                            <input type="text" class="form-control" id="copy_right" placeholder="Nhập Copy Right"
                                value="{{ $info['copy_right'] ?? '' }}">
                        </div>
                        <div class="col-md-12">
                            <label class="col-form-label">Slogan</label>
                            <input type="text" class="form-control" id="slogan" placeholder="Nhập Slogan"
                                value="{{ $info['slogan'] ?? '' }}">
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
        $('#formInfo').on('submit', function (e) {
            e.preventDefault();

            const name = $('#name').val();
            const email = $('#email').val();
            // const phone = $('#phone').val();
            const hotline = $('#hotline').val();
            const address = $('#address').val();
            // const office = $('#office').val();
            const description = $('#description').val();
            const website = $('#website').val();
            const zalo = $('#zalo').val();
            const facebook = $('#facebook').val();
            const messenger = $('#messenger').val();
            const instagram = $('#instagram').val();
            const copy_right = $('#copy_right').val();
            const slogan = $('#slogan').val();

            let formData = {
                name,
                email,
                // phone,
                hotline,
                address,
                // office,
                description,
                website,
                zalo,
                facebook,
                messenger,
                instagram,
                copy_right,
                slogan
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
                            url: "{{ route($module . '.ajax.info') }}",
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