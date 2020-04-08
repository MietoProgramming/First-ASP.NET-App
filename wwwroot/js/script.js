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
//Video js

async function onClickUploadVideo() {
    var fileArr;
    await Swal.mixin({
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
    }).queue([
        {
            title: "Choose video",
            input: 'file',
            inputAttributes: {
                'accept': 'video/*',
                'aria-label': 'Upload your video'
            }
        },
        {
            title: "Video name",
            input: 'text',
        },
        {
            title: "Video description",
            input: 'text',
        },
    ]).then((result) => { fileArr = result.value });

    var n = fileArr[1];
    var d = fileArr[2];
    var formData = new FormData();
    formData.append("changedname", n );
    formData.append("description", d );
    formData.append("files", fileArr[0]);
    $.ajax(
        {
            url: "/videos/upload",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Video has been saved',
                    text: "Name: " +n+ " \n Description: " + d ,
                    showConfirmButton: true,
                    timer: 2500,
                    onClose: () => { location.reload(true); }
                })
            },
            error: function (errorThrown) {
               console.log(errorThrown) ;
            }
            
        }
    ); 
}

function openViewWindow(url,name,views,desc,id) {
    Swal.fire({
        title: '<strong>' + name + '</strong>',
        html:
            '<video id="videoWindowToast" src="' + url + '" controls></video> '+
            '<label id="viewsVideoWindowToast">Views: ' + views + '</label>'+
            '<label id="descriptionVideoWindowToast" >' + desc + '</label>',
        showCloseButton: true,
        customClass: {
            popup: 'videoWindowToastClass',
        }
    })

    setTimeout(function () {
        document.getElementById("videoWindowToast").play();
    }, 1500);

    $.ajax(
        {
            url: "/videos/viewcount",
            data: { 'idS' : id },
            type: "POST",
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        }
    ); 
}

function onClickDeleteVideo(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax(
                {
                    url: "/videos/deletevideo",
                    data: { 'idS': id },
                    type: "DELETE",
                    success: () => {
                        Swal.fire(
                            {
                                title: 'Deleted!',
                                text: 'Your video has been deleted.',
                                icon: 'success',
                                onClose: () => { location.reload(true); }
                            }
                        );
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        Swal.fire(
                            'Something went wrong!',
                            'Your video has not been deleted.',
                            'error'
                        );
                    }
                }
            );
        }
    })
}

function onClickEditVideo(name,desc,id) {
    Swal.fire({
        title: 'Edit title or description',
        html:
            '<label> Title </label><br/>' + 
            '<input id="nameEditWindow" class="swal2-input" value="' + name +'"/><br/>' +
            '<label> Description </label><br/>' +
            '<input id="descEditWindow" class="swal2-input" value="' + desc +'"/><br/>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText : 'Don\'t edit!',
        confirmButtonText: 'Edit!'
    }).then((result) => {
        if (result.value) {
                var newName = document.getElementById('nameEditWindow').value;
                var newDesc = document.getElementById('descEditWindow').value;
                if (newName != "" && newDesc != "") {
                    $.ajax(
                        {
                            url: "/videos/editvideo",
                            data: {
                                'idS': id,
                                'description': newDesc,
                                'name': newName
                            },
                            type: "DELETE",
                            success: () => {
                                Swal.fire(
                                    {
                                        title: 'Changed!',
                                        text: 'Your video has been changed.',
                                        icon: 'success',
                                        onClose: () => { location.reload(true); }
                                    }
                                );
                            },
                            error: function (errorThrown) {
                                console.log(errorThrown);
                                Swal.fire(
                                    'Something went wrong!',
                                    'Your video has not been changed.',
                                    'error'
                                );
                            }
                        }
                    );
                }
                else {
                    Swal.fire(
                        'Name and description can\'t be empty!',
                        'Every video wants to have name and description :)',
                        'error'
                    );
                }
            }
        })
        
}
//Image js

async function onClickUploadImage() {
    var fileArr;
    await Swal.mixin({
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
    }).queue([
        {
            title: "Choose image",
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your image'
            }
        },
        {
            title: "Image name",
            input: 'text',
        },
        {
            title: "Image description",
            input: 'text',
        },
    ]).then((result) => { fileArr = result.value });

    var n = fileArr[1];
    var d = fileArr[2];
    var formData = new FormData();
    formData.append("changedname", n);
    formData.append("description", d);
    formData.append("files", fileArr[0]);
    $.ajax(
        {
            url: "/images/upload",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Image has been saved',
                    text: "Name: " + n + " \n Description: " + d,
                    showConfirmButton: true,
                    timer: 1500
                }).then(() =>
                {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        Swal.fire({
                            title: 'Your uploaded picture',
                            imageUrl: e.target.result,
                            imageAlt: 'The uploaded picture',
                            onClose: () => { location.reload(true); }
                        })
                    }
                    reader.readAsDataURL(fileArr[0])
                })
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }

        }
    );
}

function openViewWindowImage(url, name, views, desc, id) {
    Swal.fire({
        title: '<strong>' + name + '</strong>',
        html:
            '<img id="imageWindowToast" src="' + url + '"></img> ' +
            '<label id="viewsImageWindowToast">Views: ' + views + '</label>' +
            '<label id="descriptionImageWindowToast" >' + desc + '</label>' +
            '<div id="cardLongButtonsImage">' +
            `<a onclick="onClickEditImage('` + name + `','` + desc + `','` + id + `')" type="button" class= "btn btn-primary text-white" id="buttonEditImage" > Edit</a>` +
            `<a onclick="onClickDeleteImage('` + id + `')" type="button" class="btn btn-danger text-white" id="buttonDeleteImage">Delete</a>` +
            '</div>',
        showCloseButton: true,
        customClass: {
            popup: 'imageWindowToastClass',
        }
    })

    $.ajax(
        {
            url: "/images/viewcount",
            data: { 'idS': id },
            type: "POST",
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        }
    );
}

function onClickDeleteImage(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax(
                {
                    url: "/images/deleteimage",
                    data: { 'idS': id },
                    type: "DELETE",
                    success: () => {
                        Swal.fire({
                            title:'Deleted!',
                            text:'Your image has been deleted.',
                            icon: 'success',
                            onClose: () => { location.reload(true); }
                        });
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        Swal.fire(
                            'Something went wrong!',
                            'Your image has not been deleted.',
                            'error'
                        );
                    }
                }
            );
        }
    })
}

function onClickEditImage(name, desc, id) {
    Swal.fire({
        title: 'Edit title or description',
        html:
            '<label> Title </label><br/>' +
            '<input id="nameEditWindow" class="swal2-input" value="' + name + '"/><br/>' +
            '<label> Description </label><br/>' +
            '<input id="descEditWindow" class="swal2-input" value="' + desc + '"/><br/>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Don\'t edit!',
        confirmButtonText: 'Edit!'
    }).then((result) => {
        if (result.value) {
            var newName = document.getElementById('nameEditWindow').value;
            var newDesc = document.getElementById('descEditWindow').value;
            if (newName != "" && newDesc != "") {
                $.ajax(
                    {
                        url: "/images/editimage",
                        data: {
                            'idS': id,
                            'description': newDesc,
                            'name': newName
                        },
                        type: "DELETE",
                        success: () => {
                            Swal.fire({
                                title:'Changed!',
                                text:'Your image has been changed.',
                                icon: 'success',
                                onClose: () => { location.reload(true); }
                            });
                        },
                        error: function (errorThrown) {
                            console.log(errorThrown);
                            Swal.fire(
                                'Something went wrong!',
                                'Your image has not been changed.',
                                'error'
                            );
                        }
                    }
                );
            }
            else {
                Swal.fire(
                    'Name and description can\'t be empty!',
                    'Every image wants to have name and description :)',
                    'error'
                );
            }
        }
    })

}

var swiperNewest = new Swiper('.swiper-container-newest', {
    effect: 'cube',
    grabCursor: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

var swiperBest = new Swiper('.swiper-container', {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
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
            slidesPerView: 3,
            spaceBetween: 50,
        },
    }
});

var swiperAll = new Swiper('.swiper-container-all', {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
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
            slidesPerView: 3,
            spaceBetween: 50,
        },
    }
});