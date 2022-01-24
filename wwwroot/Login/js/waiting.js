'use strict'
function UserCookies(nickname, mail, identity){
    this.nickname = nickname;
    this.email = mail;
    this.identity = identity;
};
$(document).ready(function () {
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    var dts = new UserCookies();
    var virutal = window.location.pathname.replace("/Signup/Successful", "");
    console.log(`${window.location.origin}${virutal}/Data/admin/userdata/x5IKirk8tsqRxG6.json`);
    //usage:
    setInterval(() => { readTextFile(`${window.location.origin}${virutal}/Data/admin/userdata/x5IKirk8tsqRxG6.json`, function (text) {
        var data = JSON.parse(text);
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log("array index: " + i);
            var obj = data[i];
            console.log(obj["email"]);
            console.log(obj["Isauthentication"]);
        }
        /*function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }*/
        function listCookies() {
            var c = document.cookie;
            var theCookies = document.cookie.split('; ');
            for (var i = 0; i < theCookies.length; i++) {
                var split_s = theCookies[i].split("=");
                if (split_s[0] == "email") {
                    return split_s[1];
                }
            }
            return '';
        }
        console.log(listCookies());
    })}, 3000);
    /*setTimeout(() => { readTextFile(`${window.location.origin}${virutal}/Data/admin/userdata/x5IKirk8tsqRxG6.json`, function (text) {
        var data = JSON.parse(text);
        console.log(data);
    })},5000);*/
    /*function functionToLoadFile() {
        //url change
        var virutal = window.location.pathname.replace("/Table", "");
        console.log(`${window.location.origin}${virutal}/message.txt`);
        jQuery.get(`${window.location.origin}${virutal}/message.txt`, function (data) {
            var myvar = data;
            if (myvar != '')
                pop_news(myvar);
            setTimeout(functionToLoadFile, 5000);
        });
    }*/

    //setTimeout(functionToLoadFile, 10);
});