<div id="modalPassword" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalPassword"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="formPassword">
                <input type="hidden" class="idHidden">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalPassword">
                        <i class="feather icon-refresh-ccw"></i> 
                        ĐỔI MẬT KHẨU
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label">Mật Khẩu Cũ <sup>(*)</sup></label>
                        <input type="password" class="form-control" id="password_old" placeholder="******">
                    </div>
                    <div class="form-group">
                        <label class="col-form-label">Mật Khẩu Mới <sup>(*)</sup></label>
                        <input type="password" class="form-control" id="password_new" placeholder="******">
                    </div>
                    <div class="form-group">
                        <label class="col-form-label">Nhập Lại Mật Khẩu Mới <sup>(*)</sup></label>
                        <input type="password" class="form-control" id="re_password_new" placeholder="******">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-info" data-bs-dismiss="modal">
                        <i class="fa-solid fa-arrows-rotate"></i> ĐỔI MẬT KHẨU
                    </button>
                    <button type="button" class="btn btn-outline-secondary has-ripple" data-bs-dismiss="modal">
                        <i class="fa-solid fa-rotate-left"></i> HỦY
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
const currentLang = '{{ app()->getLocale() }}';
$(document).ready(function () {
    $('#formPassword').on('submit', function (e) {
        e.preventDefault();

        const password_old = $('#password_old').val();
        const password_new = $('#password_new').val();
        const re_password_new = $('#re_password_new').val();
        const id = $('.idHidden').val();

        const errors = validateForm(password_old, password_new, re_password_new);
        if (errors.length) {
            errors.forEach(error => toastr.error(error));
            return false;
        }

        let formData = {
            id,
            password_old,
            password_new,
            _token: "{{ csrf_token() }}"
        };

        $.ajax({
            type: 'POST',
            url: "{{ route($module . '.ajax.password') }}",
            data: formData,
            beforeSend: function() {
                $('.spin-loading-info').show();
            },
            success: function (response) {
                $('.spin-loading-info').hide();

                if (response.success) {
                    toastr.success(response.message);
                }else{
                    toastr.error(response.message);
                }

                $('#password_old').val('');
                $('#password_new').val('');
                $('#re_password_new').val('');
            },
            error: function (xhr) {
                let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                toastr.error(message);
            }
        });
    })
    function validateForm(password_old, password_new, re_password_new) {
        const errors = [];
        if (!password_old) {
            errors.push(messages[currentLang].required_password_old);
        }
        if (!password_new) {
            errors.push(messages[currentLang].required_password_new);
        }
        if (!re_password_new) {
            errors.push(messages[currentLang].required_re_password_new);
        }
        if (password_new!=re_password_new) {
            errors.push(messages[currentLang].required_re_password_new_no_same);
        }
        return errors;
    }
})
</script>