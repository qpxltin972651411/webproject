'use strict'
function __refresh__sidebar_active(btnid) {
    var lis = document.getElementsByClassName('list-unstyled side-menu')[0];
    for (var i = 0, len = lis.length; i < len; i++) {
        if (lis[i].classList.contains("active")) {
            $(lis[i]).removeClass("active");
        }
    }
    document.getElementById(btnid).classList.add("active");
}
function __refresh__tour_text(text) {
    var lis = document.getElementsByClassName('breadcrumb hidden-xs')[0];
    lis.innerHTML = '';
    var tourtext = document.createElement("li");
    var atext = document.createElement("span");
    atext.innerHTML = text;
    tourtext.append(atext);
    lis.appendChild(tourtext);
}

function geturl() {
    return `${window.location.origin}`;
}
function functionToLoadFile() {
    //url change
    console.log(`${geturl()}/message.txt`);
    jQuery.get(`${geturl()}/message.txt`, function (data) {
        var myvar = data;
        if (myvar != '')
            pop_news(myvar);
        /*var parts = myvar.split(/\n/);
        var songtitle = parts[0];
        var songartist = parts[1];
        var songalbum = parts[2];
        var songtime = parts[3];
 
        $('#songtitleholder').html(songtitle);
        $('#songartistholder').html(songartist);
        $('#songalbumholder').html(songalbum);*/
        setTimeout(functionToLoadFile, 5000);
    });
}
function pop_news(mess) {
    if (mess == "")
        return;
    let containermessage = document.getElementById("inner-message");
    containermessage.innerHTML = mess;

    let a = document.getElementById("message");
    if (a.classList.contains("display_none")) {
        a.classList.remove("display_none");
        setTimeout(function () {
            a.classList.add("display_none");
        }, 1500);
    }
}
function pop_news_by_modal(mess) {
    if (mess == "")
        return;
    let containermessage = document.getElementById("modal_message");
    containermessage.innerHTML = mess;
    document.getElementById("toggle_modal_message").click();
}
function post_backgroundskin(skin) {
    var dataJSON = { "bodyskin": skin };
    $.ajax({
        //here
        url: "/Profile/changebackgroundskin",
        data: JSON.stringify(dataJSON),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            location.reload();
        },
        error: function (passParams) {
            console.log("Error is " + passParams.status, passParams.statusText);
        }
    });
}
function changebackgroundskin(event) {
    let v = event.getAttribute('data-skin');
    console.log(v);
    post_backgroundskin(v);
}
function changeicon(event) {
    if (event.files.length == 0) {
        Swal.fire({
            title: "訊息",
            text: "沒有選取照片，請再試一次 :<",
            icon: 'error',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok',
        });
        return;
    }
    const file = event.files;
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(file[0]['type'])) {
        document.getElementById("submitform").click();
        return;
    }

    Swal.fire({
        title: "訊息",
        text: "照片格式錯誤，請上傳圖片檔案 :<",
        icon: 'error',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Ok',
    });
    return;
}

