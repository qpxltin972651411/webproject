//監聽認證 signup/successful
$(document).ready(function () {
    function myrefresh() {
        window.location.reload();
    }
    setInterval(() => {
        $.ajax({
            //here
            url: "/Detecting/listeningcertification",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null){
                    myrefresh();
                }
                console.log("certification status : ",data);
            },
            error: function (passParams) {
                console.log("Error is " + passParams.status, passParams.statusText);
            }
        });
    },5000)
})

