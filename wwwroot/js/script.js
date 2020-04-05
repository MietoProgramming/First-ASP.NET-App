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

var swiperNewest = new Swiper('.swiper-container-newest', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    pagination: {
        el: '.swiper-pagination-newest',
    },
});

var swiperBest = new Swiper('.swiper-container-best', {
    slidesPerView: 1,
    spaceBetween: 10,
    // init: false,
    pagination: {
        el: '.swiper-pagination-best',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
    }
});