function clearSearch(el)
{
    el.value = "";
}

function Toggle(text) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-left",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "2000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp",
        "escapeHtml": true
    };
    toastr.warning(text.toString() + " doesn\'t work currently :(", "Warning!");
}