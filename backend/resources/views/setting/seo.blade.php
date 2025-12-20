<div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            CÀI ĐẶT SEO
        </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
        data-bs-parent="#accordionExample">
        <form id="formSeo">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Tiêu Đề SEO:</label>
                            <input type="text" class="form-control" id="title_seo" placeholder="Nhập Tiêu Đề SEO"
                                value="{{ $seo['title_seo'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label pt-0">Canonical:</label>
                            <input type="text" class="form-control" id="canonical_seo" placeholder="Nhập Canonical"
                                value="{{ $seo['canonical_seo'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Tác Giả:</label>
                            <input type="text" class="form-control" id="author_seo" placeholder="Nhập Tác Giả"
                                value="{{ $seo['author_seo'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Nhà Phát Triển:</label>
                            <input type="text" class="form-control" id="generator" placeholder="Nhập Nhà Phát Triển"
                                value="{{ $seo['generator'] ?? '' }}">
                        </div>
                        <div class="col-md-12">
                            <label class="col-form-label">Mô Tả SEO:</label>
                            <textarea id="description_seo" rows="3" class="form-control"
                                placeholder="Nhập Mô Tả SEO">{{ $seo['description_seo'] ?? '' }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Google Analytics:</label>
                            <textarea id="google_analytics" rows="5" class="form-control"
                                placeholder="Nhập Google Analytics">{{ $seo['google_analytics'] ?? '' }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">Google Ads:</label>
                            <textarea id="google_ads" rows="5" class="form-control"
                                placeholder="Nhập Google Ads">{{ $seo['google_ads'] ?? '' }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">fb:app_id:</label>
                            <input type="text" class="form-control" id="fb_app_id" placeholder="Nhập fb:app_id"
                                value="{{ $seo['fb_app_id'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">fb:admins:</label>
                            <input type="text" class="form-control" id="fb_admins" placeholder="Nhập fb:admins"
                                value="{{ $seo['fb_admins'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:locale:</label>
                            <input type="text" class="form-control" id="og_locale" placeholder="Nhập og:locale"
                                value="{{ $seo['og_locale'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:title:</label>
                            <input type="text" class="form-control" id="og_title" placeholder="Nhập og:title"
                                value="{{ $seo['og_title'] ?? '' }}">
                        </div>
                        <div class="col-md-12">
                            <label class="col-form-label">og:description</label>
                            <textarea id="og_description" rows="3" class="form-control"
                                placeholder="Nhập og:description">{{ $seo['og_description'] ?? '' }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:url:</label>
                            <input type="text" class="form-control" id="og_url" placeholder="Nhập og:url"
                                value="{{ $seo['og_url'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:image:</label>
                            <input type="text" class="form-control" id="og_image" placeholder="Nhập og:image"
                                value="{{ $seo['og_image'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:image:alt:</label>
                            <input type="text" class="form-control" id="og_image_alt" placeholder="Nhập og:image:alt"
                                value="{{ $seo['og_image_alt'] ?? '' }}">
                        </div>
                        <div class="col-md-6">
                            <label class="col-form-label">og:site_name:</label>
                            <input type="text" class="form-control" id="og_site_name" placeholder="Nhập og:site_name"
                                value="{{ $seo['og_site_name'] ?? '' }}">
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


        $('#formSeo').on('submit', function (e) {
            e.preventDefault();

            const title_seo = $('#title_seo').val();
            const description_seo = $('#description_seo').val();
            const canonical_seo = $('#canonical_seo').val();

            const author_seo = $('#author_seo').val();
            const generator = $('#generator').val();

            const google_analytics = $('#google_analytics').val();
            const google_ads = $('#google_ads').val();

            const fb_app_id = $('#fb_app_id').val();
            const fb_admins = $('#fb_admins').val();

            const og_locale = $('#og_locale').val();
            const og_title = $('#og_title').val();
            const og_description = $('#og_description').val();
            const og_url = $('#og_url').val();
            const og_image = $('#og_image').val();
            const og_image_alt = $('#og_image_alt').val();
            const og_site_name = $('#og_site_name').val();

            let formData = {
                title_seo,
                description_seo,
                canonical_seo,
                author_seo,
                generator,
                google_analytics,
                google_ads,
                fb_app_id,
                fb_admins,
                og_locale,
                og_title,
                og_description,
                og_url,
                og_image,
                og_image_alt,
                og_site_name
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
                            url: "{{ route($module . '.ajax.seo') }}",
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