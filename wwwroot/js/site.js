// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function pop_news(mess) {
    let containermessage = document.getElementById("inner-message");
    if (mess === "") {
        containermessage.innerHTML = "沒有訊息";
    } else {
        containermessage.innerHTML = mess;
    }
    let a = document.getElementById("message");
    if (a.classList.contains("display_none")) {
        a.classList.remove("display_none");
        setTimeout(function () {
            a.classList.add("display_none");
        }, 1500);
    }
}

