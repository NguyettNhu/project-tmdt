<!-- jQuery & jQuery UI -->
<script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('admin/plugins/jquery-ui/jquery-ui.min.js') }}"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>

<!-- Bootstrap 4 -->
<script src="{{ asset('admin/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

<!-- ChartJS -->
<script src="{{ asset('admin/plugins/chart.js/Chart.min.js') }}"></script>

<!-- Sparkline -->
<script src="{{ asset('admin/plugins/sparklines/sparkline.js') }}"></script>

<!-- JQVMap -->
<script src="{{ asset('admin/plugins/jqvmap/jquery.vmap.min.js') }}"></script>
<script src="{{ asset('admin/plugins/jqvmap/maps/jquery.vmap.usa.js') }}"></script>

<!-- jQuery Knob Chart -->
<script src="{{ asset('admin/plugins/jquery-knob/jquery.knob.min.js') }}"></script>

<!-- Moment & Daterangepicker -->
<script src="{{ asset('admin/plugins/moment/moment.min.js') }}"></script>
<script src="{{ asset('admin/plugins/daterangepicker/daterangepicker.js') }}"></script>

<!-- Tempusdominus Bootstrap 4 -->
<script src="{{ asset('admin/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>

<!-- Summernote -->
<script src="{{ asset('admin/plugins/summernote/summernote-bs4.min.js') }}"></script>

<!-- OverlayScrollbars -->
<script src="{{ asset('admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') }}"></script>

<!-- AdminLTE App -->
<script src="{{ asset('admin/dist/js/adminlte.js') }}"></script>
<script src="{{ asset('admin/dist/js/demo.js') }}"></script>
<script src="{{ asset('admin/dist/js/pages/dashboard.js') }}"></script>

<!-- DataTables & Plugins -->
<script src="{{ asset('assets/js/plugins/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('assets/js/plugins/dataTables.bootstrap4.min.js') }}"></script>
{{-- <script src="{{ asset('admin/plugins/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>
<script src="{{ asset('admin/plugins/jszip/jszip.min.js') }}"></script>
<script src="{{ asset('admin/plugins/pdfmake/pdfmake.min.js') }}"></script>
<script src="{{ asset('admin/plugins/pdfmake/vfs_fonts.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.html5.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.print.min.js') }}"></script>
<script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.colVis.min.js') }}"></script> --}}

<!-- Page specific script -->
{{-- <script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
</script> --}}

<!-- Select2 -->
<script src="{{ asset('admin/plugins/select2/js/select2.full.min.js') }}"></script>

<!-- Bootstrap4 Duallistbox -->
<script src="{{ asset('admin/plugins/bootstrap4-duallistbox/jquery.bootstrap-duallistbox.min.js') }}"></script>

<!-- InputMask -->
<script src="{{ asset('admin/plugins/inputmask/jquery.inputmask.min.js') }}"></script>

<!-- Bootstrap Colorpicker -->
<script src="{{ asset('admin/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js') }}"></script>

<!-- Bootstrap Switch -->
<script src="{{ asset('admin/plugins/bootstrap-switch/js/bootstrap-switch.min.js') }}"></script>

<!-- BS-Stepper -->
<script src="{{ asset('admin/plugins/bs-stepper/js/bs-stepper.min.js') }}"></script>

<!-- DropzoneJS -->
<script src="{{ asset('admin/plugins/dropzone/min/dropzone.min.js') }}"></script>
<script src="{{ asset('assets/js/plugins/sweetalert.min.js') }}"></script>
<script src="{{ asset('assets/js/pages/ac-alert.js') }}"></script>
<script>
$(document).ready(function () {
    $('#formInsert').on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        // Debug
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        ajax_insert_alert(formData);
    });
});


// function validateForm(name, email, password, re_password) {
//     const errors = [];
//     if (!name) {
//         errors.push(messages[currentLang].required_name);
//     }
//     if (!email) {
//         errors.push(messages[currentLang].required_email);
//     }
//     if (!password) {
//         errors.push(messages[currentLang].required_password);
//     }
//     if (!re_password) {
//         errors.push(messages[currentLang].required_re_password);
//     }
//     if (password != re_password) {
//         errors.push(messages[currentLang].required_no_same);
//     }
//     if (!role_id) {
//         errors.push(messages[currentLang].required_role_id);
//     }

//     return errors;
// }
</script>

<script>
$(document).ready(function () {
    $('#formUpdate').on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this);

        // Debug
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        ajax_update_alert(formData);
    });
});
</script>

<!-- Page specific script -->
<script>
  // $(function () {
    //Initialize Select2 Elements
    // $('.select2').select2()

    //Initialize Select2 Elements
    // $('.select2bs4').select2({
    //   theme: 'bootstrap4'
    // })

    //Datemask dd/mm/yyyy
    // $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    // $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro
    // $('[data-mask]').inputmask()

    //Date picker
    // $('#reservationdate').datetimepicker({
    //   format: 'L'
    // });

    //Date and time picker
    // $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

    //Date range picker
    // $('#reservation').daterangepicker()
    //Date range picker with time picker
    // $('#reservationtime').daterangepicker({
    //   timePicker: true,
    //   timePickerIncrement: 30,
    //   locale: {
    //     format: 'MM/DD/YYYY hh:mm A'
    //   }
    // })
    //Date range as a button
    // $('#daterange-btn').daterangepicker(
    //   {
    //     ranges: {
    //       'Today': [moment(), moment()],
    //       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    //       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //       'This Month': [moment().startOf('month'), moment().endOf('month')],
    //       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //     },
    //     startDate: moment().subtract(29, 'days'),
    //     endDate: moment()
    //   },
    //   function (start, end) {
    //     $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    //   }
    // )

    //Timepicker
    // $('#timepicker').datetimepicker({
    //   format: 'LT'
    // })

    //Bootstrap Duallistbox
    // $('.duallistbox').bootstrapDualListbox()

    //Colorpicker
    // $('.my-colorpicker1').colorpicker()
    //color picker with addon
    // $('.my-colorpicker2').colorpicker()

    // $('.my-colorpicker2').on('colorpickerChange', function (event) {
    //   $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    // })

    // $("input[data-bootstrap-switch]").each(function () {
    //   $(this).bootstrapSwitch('state', $(this).prop('checked'));
    // })

  // })
//   document.addEventListener('DOMContentLoaded', function () {
//     window.stepper = new Stepper(document.querySelector('.bs-stepper'))
//   })

//   Dropzone.autoDiscover = false

//   var previewNode = document.querySelector("#template")
//   previewNode.id = ""
//   var previewTemplate = previewNode.parentNode.innerHTML
//   previewNode.parentNode.removeChild(previewNode)

//   var myDropzone = new Dropzone(document.body, { 
//     url: "/target-url", 
//     thumbnailWidth: 80,
//     thumbnailHeight: 80,
//     parallelUploads: 20,
//     previewTemplate: previewTemplate,
//     autoQueue: false,
//     previewsContainer: "#previews", 
//     clickable: ".fileinput-button"
//   })

//   myDropzone.on("addedfile", function (file) {
//     file.previewElement.querySelector(".start").onclick = function () { myDropzone.enqueueFile(file) }
//   })

//   myDropzone.on("totaluploadprogress", function (progress) {
//     document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
//   })

//   myDropzone.on("sending", function (file) {
//     document.querySelector("#total-progress").style.opacity = "1"
//     file.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
//   })

//   myDropzone.on("queuecomplete", function (progress) {
//     document.querySelector("#total-progress").style.opacity = "0"
//   })

 
//   document.querySelector("#actions .start").onclick = function () {
//     myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
//   }
//   document.querySelector("#actions .cancel").onclick = function () {
//     myDropzone.removeAllFiles(true)
//   }
 </script>
<script>
  const defaultImage = "{{ asset('/assets/img/img-default.jpg') }}";

  $(document).ready(function () {
    checkCookie();
  });

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    var ticks = getCookie("modelopen");
    if (ticks != "") {
      ticks++;
      setCookie("modelopen", ticks, 1);
      if (ticks == "2" || ticks == "1" || ticks == "0") {
        $('#exampleModalCenter').modal();
      }
    } else {
      $('#exampleModalCenter').modal();
      ticks = 1;
      setCookie("modelopen", ticks, 1);
    }
  }
</script>
{{-- ckeditor --}}
<script src="{{ asset('assets/js/plugins/ckeditor.js') }}"></script>
<script src="{{ asset('ckfinder/ckfinder.js') }}"></script>

<script>
  let editorInstance;

  const contentElement = document.querySelector('#content');

  if (contentElement) {
    ClassicEditor
      .create(contentElement, {
        ckfinder: {
          uploadUrl: "{{ asset('ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files') }}"
        },
        toolbar: [
          'ckfinder',
          '|',
          'heading',
          'bold',
          'italic',
          'blockQuote',
          'link',
          'bulletedList',
          'numberedList',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ],
      })
      .then(editor => {
        editorInstance = editor;
      })
      .catch(error => {
        console.error('Lỗi khi khởi tạo CKEditor:', error);
      });
  }

  function setEditorData(content) {
    if (editorInstance) {
      editorInstance.setData(content);
    }
  }

  function getEditorData() {
    if (editorInstance) {
      return editorInstance.getData();
    }
    return '';
  }
</script>

@if (session('success'))
  <script>
    $(document).ready(function () {
      toastr.success("{{ session('success') }}");
    });
  </script>
@endif

@if (session('error'))
  <script>
    $(document).ready(function () {
      toastr.error("{{ session('error') }}");
    });
  </script>
@endif

@include('partials.modals.spin_info')
@include('partials.modals.spin_warning')
@include('partials.modals.spin_primary')

<script>
  toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "5000"
  };
</script>

<script src="{{ asset('assets/js/lang.js') }}"></script>

<script>
  let isSlugChanged = false;

  function convertToSlug(title) {
    const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ";
    const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydD";
    const titleWithoutDiacritics = title.split('').map((char, i) => {
      const index = from.indexOf(char);
      return index !== -1 ? to[index] : char;
    }).join('');

    return titleWithoutDiacritics
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  $('#name').on('input', function () {
    const title = $(this).val();
    if (!isSlugChanged) {
      const slug = convertToSlug(title);
      $('#slug').val(slug);
    }
  });

  $('#slug').on('input', function () {
    isSlugChanged = true;
  });

</script>

<script src="{{ asset('assets/js/plugins/lightbox.min.js') }}"></script>
<script>
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })
</script>
@if(Request::is('*index*') && Route::has($module . '.ajax.review'))
  @include('partials.modals.review')
@endif

@if(Route::has($module . '.ajax.status'))
    <script>
      function changeStatus(select) {
    const id = $(select).data('id');
    const status = $(select).val();

    $.ajax({
      type: 'POST',
      url: "{{ route($module . '.ajax.status') }}",
      data: {
        id: id,
        status: status
      },
      beforeSend: function () {
        $('.spin-loading-info').show();
      },
      success: function (response) {
        $('.spin-loading-info').hide();

        if (response.success) {
          toastr.success(response.message);
        } else {
          toastr.error(response.message);
        }
      },
      error: function () {
        $('.spin-loading-info').hide();
        toastr.error('Có lỗi xảy ra');
      }
    });
  }
    </script>
@endif
{{-- @if(Route::has($module . '.ajax.float'))
  <script>
    function toggleFloat(checkbox) {
      const id = $(checkbox).data('id');
      const float = $(checkbox).prop('checked');

      let formData = {
        id,
        float
      };

      $.ajax({
        type: 'POST',
        url: "{{ route($module . '.ajax.float') }}",
        data: formData,
        beforeSend: function () {
          $('.spin-loading-info').show();
        },
        success: function (response) {
          $('.spin-loading-info').hide();

          if (response.success) {
            toastr.success(response.message);
          } else {
            toastr.error(response.message);
          }
        },
        error: function (xhr) {
          $('.spin-loading-info').hide();

          let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
          toastr.error(message);
        }
      });
    }
  </script>
@endif --}}
@if(Route::has($module . '.ajax.delete'))
  @include('partials.modals.delete')
@endif

@if(Route::has($module . '.ajax.delete') || Route::has($module . '.ajax.password'))
  <script>
    function getId(id) {
      return $('.idHidden').val(id);
    }
  </script>
@endif

@if(Route::has($module . '.ajax.sort'))
  <script>
    function updateSort(input) {
      const id = $(input).data('id');
      const newSort = $(input).val();

      let formData = {
        id,
        sort: newSort
      };

      $.ajax({
        type: 'POST',
        url: "{{ route($module . '.ajax.sort') }}",
        data: formData,
        beforeSend: function () {
          $('.spin-loading-info').show();
        },
        success: function (response) {
          $('.spin-loading-info').hide();

          if (response.success) {
            toastr.success(response.message);
            $('#dom-jqry').DataTable().ajax.reload(null, false);
          } else {
            toastr.error(response.message);
          }
        },
        error: function (xhr) {
          $('.spin-loading-info').hide();

          let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
          toastr.error(message);
        }
      });
    }
  </script>
@endif

@if(Route::has($module . '.view.index'))
  <script>
    function btn_exit() {
      const link_exit = "{{route($module . '.view.index')}}";

      swal({
        title: "Bạn có chắc chắn muốn thoát?",
        text: "Bạn sẽ không lưu dữ liệu nếu thoát!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then((willExit) => {
          if (willExit) {
            $('.spin-loading-warning').show();
            setTimeout(() => {
              $('.spin-loading-warning').hide();

              window.location.href = link_exit;
            }, 100);
          }
        });
    }
  </script>
@endif

@if(Route::has($module . '.view.insert'))
  <script>
    function btn_insert() {
      const link_insert = "{{route($module . '.view.insert')}}";
      $('.spin-loading-primary').show();
      setTimeout(() => {
        $('.spin-loading-primary').hide();
        window.location.href = link_insert;
      }, 100);
    }
  </script>
@endif

@if(Route::has($module . '.view.update'))
  <script>
    function btn_edit(id) {
      const link_edit = "{{route($module . '.view.update', ['id' => '__id__'])}}".replace('__id__', id);
      $('.spin-loading-primary').show();
      setTimeout(() => {
        $('.spin-loading-primary').hide();
        window.location.href = link_edit;
      }, 100);
    }
  </script>
@endif

{{-- <script>
  function btn_gallery() {
    $('.spin-loading-info').show();
    setTimeout(() => {
      $('.spin-loading-info').hide();
      $('#modalLibrary').modal('show');
    }, 100);
  }
</script> --}}

@if(Route::has($module . '.view.insert'))
  <script>
    function ajax_insert_alert(formData) {
      $.ajax({
        type: 'POST',
        url: "{{ route($module . '.ajax.insert') }}",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
          $('.spin-loading-info').show();
        },
        success: function (response) {
          $('.spin-loading-info').hide();
          console.log(response);

          if (response.success) {
            toastr.success(response.message);
          } else {
            toastr.error(response.message);
          }
        },
        error: function (xhr) {
          $('.spin-loading-info').hide();

          let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
          toastr.error(message);
        }
      });
    }
  </script>
@endif

@if(Route::has($module . '.view.update'))
  <script>
    function ajax_update_alert(formData) {
      return swal({
        title: "Bạn có chắc chắn muốn tiếp tục không?",
        text: "Cập nhật dữ liệu. Hãy xác nhận trước khi thực hiện!",
        icon: "info",
        buttons: true,
      })
        .then((willUpdate) => {
          if (willUpdate) {
            $.ajax({
              type: 'POST',
              url: "{{ route($module . '.ajax.update') }}",
              data: formData,
              contentType: false,
              processData: false,
              beforeSend: function () {
                $('.spin-loading-info').show();
              },
              success: function (response) {
                $('.spin-loading-info').hide();

                swal.stopLoading();
                swal.close();

                if (response.success) {
                  swal(response.message, {
                    icon: "success",
                  });
                } else {
                  toastr.error(response.message);
                }
              },
              error: function (xhr) {
                $('.spin-loading-info').hide();

                swal.stopLoading();
                swal.close();

                let message = xhr.responseJSON?.message || messages[currentLang].unexpected_error;
                toastr.error(message);
              }
            });
          }
        });
    }
  </script>
@endif

<script>
  function btn_function(id) {
    return `
        <button type="button" class="btn btn-icon btn-outline-warning" onclick="review(${id})">
            <i class="feather icon-eye"></i>
        </button>
        <button type="button" class="btn btn-icon btn-outline-primary" onclick="btn_edit(${id})">
            <i class="feather icon-edit"></i>
        </button>
            <button type="button" class="btn btn-icon btn-outline-danger" onclick="hienpopup(${id})">
            <i class="feather icon-trash"></i>
        </button>
    `;
  }
</script>