<style>
.swal-title {
    font-size: 20px;
}
</style>
<script>
function hienpopup(id) {
    swal({
        title: "Bạn có chắc chắn muốn tiếp tục không?",
        text: "Sau khi xóa, bạn sẽ không thể khôi phục tập tin này!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            let formData = {
                id,
                _token: "{{ csrf_token() }}"
            };
            $.ajax({
                type: 'POST',
                url: "{{ route($module . '.ajax.delete') }}",
                data: formData,
                beforeSend: function() {
                    $('.spin-loading-warning').show();
                },
                success: function (response) {
                    $('.spin-loading-warning').hide();

                    swal.stopLoading();
                    swal.close();

                    if (response.success) {
                        swal(response.message, {
                            icon: "success",
                        });
                        $('#' + id).remove();
                    } else {
                        swal("Có lỗi xảy ra!", response.message, "error");
                    }
                },
                error: function (xhr) {
                    $('.spin-loading-warning').hide();

                    swal.stopLoading();
                    swal.close();

                    let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                    swal("Có lỗi xảy ra!", message, "error");
                    swal.close();
                }
            });
        }
    });
}
</script>