//always listening

$(document).ready(function () {
    var timer = 0;
    function myrefresh() {
        window.location.reload();
    }
    setInterval(() => {
        $.ajax({
            //here
            url: "/Detecting/listeningblocking",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    myrefresh();
                }
                //console.log("blocked status : ", data,timer+=1);
            },
            error: function (passParams) {
                console.log("Error is " + passParams.status, passParams.statusText);
            }
        });
    }, 5000)
})

