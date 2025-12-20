<style>
    .table> :not(:first-child) {
        border-top: 0;
    }

    .table td {
        white-space: normal;
    }

    .modal-body {
        max-height: 500px;
        overflow: auto;
    }

    .table tr {
        vertical-align: middle;
    }

    .table tr td:first-child {
        background: #f4f4f4;
    }
</style>
<div id="modalReview" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalReview" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalReview">
                    <i class="feather icon-eye"></i> XEM CHI TIẾT
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th width="30%">Tên Trường</th>
                            <th>Giá Trị</th>
                        </tr>
                    </thead>
                    <tbody id="reviewFields"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary has-ripple" data-bs-dismiss="modal">
                    <i class="fa-solid fa-rotate-left"></i> THOÁT
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    const module = '{{ $module }}';
    function review(id) {
        let formData = {
            id,
            _token: "{{ csrf_token() }}"
        };
        $.ajax({
            type: 'POST',
            url: "{{ route($module . '.ajax.review') }}",
            data: formData,
            beforeSend: function () {
                $('.spin-loading-warning').show();
            },
            success: function (response) {
                $('.spin-loading-warning').hide();

                $('#modalReview').modal('show')

                if (response.success) {

                    delete response.data.module.created_by;
                    delete response.data.module.updated_by;

                    $('#reviewFields').empty();

                    const currentLang = '{{ app()->getLocale() }}';

                    $.each(response.data.module, function (key, value) {
                        const translatedKey = messages[currentLang][`${key}`] || key.charAt(0).toUpperCase() + key.slice(1);

                        if (key === 'status') {
                            const badgeClass = value === 1 ? 'bg-success' : 'bg-danger';
                            const badgeText = value === 1 ? 'Đã bật' : 'Tắt';
                            value = `<span class="badge ${badgeClass}">${badgeText}</span>`;
                        }

                        if (key === 'image') {
                            const imageSrc = value ? `{{ asset('/storage/uploads/${module}/${value}') }}` : defaultImage;
                            value = `<a href="${imageSrc}" data-lightbox="1" data-title="${value || 'Default Image'}">
                            <img src="${imageSrc}" alt="${value || 'Default Image'}" class="img-fluid img-thumbnail" style="max-width: 100px;">
                        </a>`;
                        }

                        if (key === 'type' && value) {
                            value = `<span class="badge bg-info">${value}</span>`;
                        }

                        if (key === 'parent_id') {
                            const categoryName = response.data.module.category ? response.data.module.category.name : '';
                            value = categoryName ? categoryName : '';

                            delete response.data.module.category;
                        }

                        if (value && typeof value === 'string') {
                            const isDateFormat = /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2}$/.test(value);
                            const isIsoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(value);

                            if (isDateFormat || isIsoDateFormat) {
                                const date = new Date(value);
                                const formattedDate = ("0" + date.getDate()).slice(-2) + "/" +
                                    ("0" + (date.getMonth() + 1)).slice(-2) + "/" +
                                    date.getFullYear();
                                const formattedTime = ("0" + date.getHours()).slice(-2) + ":" +
                                    ("0" + date.getMinutes()).slice(-2) + ":" +
                                    ("0" + date.getSeconds()).slice(-2);
                                value = `<span class="badge bg-secondary">${formattedDate + " " + formattedTime}</span>`;
                            }
                        }

                        const rowHtml = `
                        <tr>
                            <td><strong>${translatedKey}</strong></td>
                            <td>${value ?? ''}</td>
                        </tr>
                    `;
                        $('#reviewFields').append(rowHtml);
                    });

                    if (response.data.created_by && response.data.created_by != 'N/A' && response.data.updated_by != 'N/A') {
                        const createdByHtml = `
                        <tr>
                            <td><strong>Người tạo</strong></td>
                            <td style="background: #f4f4f4;">${response.data.created_by}</td>
                        </tr>
                    `;
                        const updatedByHtml = `
                        <tr>
                            <td><strong>Người cập nhật</strong></td>
                            <td style="background: #f4f4f4;">${response.data.updated_by}</td>
                        </tr>
                    `;
                        $('#reviewFields').append(createdByHtml);
                        $('#reviewFields').append(updatedByHtml);
                    }
                }
            },
            error: function (xhr) {
                $('.spin-loading-warning').hide();

                let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                toastr.error(message);
            }
        });
    }
</script>