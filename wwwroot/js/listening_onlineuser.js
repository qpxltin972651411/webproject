//always listening
$(document).ready(function () {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    function getonlinelist() {
        var currentdate = new Date();
        var datetime = (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        var dataJSON = {};
        //console.log("認證情況 : ", getCookie("certification"));
        dataJSON["name"] = decodeURIComponent(getCookie("name"));
        dataJSON["email"] = decodeURIComponent(getCookie("email"));
        dataJSON["imagePath"] = decodeURIComponent(getCookie("imagePath"));
        dataJSON["datetime"] = decodeURIComponent(datetime.toString());
        dataJSON["url"] = decodeURIComponent(window.location.pathname.toString());
        /*var currentLocation = window.location;
        console.log("search : ",currentLocation.search);
        console.log("hash : ",currentLocation.hash);
        console.log("href : ",currentLocation.href);
        console.log("ancestororigins : ",currentLocation.ancestorOrigins);
        console.log("hostname : ",currentLocation.hostname);
        console.log("pathname : ",currentLocation.pathname);
        console.log("protocol : ",currentLocation.protocol);
        console.log("origin : ",currentLocation.origin);
        console.log("host : ",currentLocation.host);
        console.log("port : ",currentLocation.port);*/
        $.ajax({
            //here
            url: "/Detecting",
            data: JSON.stringify(dataJSON),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //console.log(JSON.stringify(dataJSON));
                if (data != null) {
                    //console.log(window.location.pathname);
                    if (!(window.location.pathname.toLowerCase().includes('/denied') || window.location.pathname.toLowerCase().includes('/signup/successful') || window.location.pathname.toLowerCase().includes('/error'))) {
                        const myNode = document.getElementById("online-modal-body");
                        myNode.innerHTML = '';
                        var onlinecount = 0;
                        for (var i = 0; i < data.length; i++) {
                            //console.log(data[i]);
                            for (var key in data[i]) {
                                //key will be -> 'id'
                                //dictionary[key] -> 'value'
                                //console.log(key, data[i][key], typeof data[i][key]);
                                if (key == "status" && data[i][key]) {
                                    onlinecount += 1;
                                    var iDiv = document.createElement('div');
                                    iDiv.classList.add("onlinelist-flex-child");

                                    var iimg = document.createElement('img');
                                    iimg.classList.add("profile-pic");
                                    iimg.style.width = "70px";
                                    iimg.src = data[i]["imagePath"];
                                    iimg.title = data[i]["name"];
                                    iimg.alt = "找不到圖片";
                                    iDiv.appendChild(iimg);
                                    // Create the inner div before appending to the body
                                    var innerh5 = document.createElement('h5');
                                    innerh5.innerHTML = data[i]["name"];
                                    iDiv.appendChild(innerh5);
                                    myNode.appendChild(iDiv);
                                    var hor_line = document.createElement('hr');
                                    myNode.appendChild(hor_line);
                                }
                            }
                        }
                        var ele = document.getElementById("onlineusercount");
                        ele.innerHTML = onlinecount;
                    }
                }
            },
            error: function (passParams) {
                console.log("Error is " + passParams.status, passParams.statusText);
            }
        });
    }
    setInterval(() => {
        getonlinelist();
    }, 5000)
    getonlinelist();
})

