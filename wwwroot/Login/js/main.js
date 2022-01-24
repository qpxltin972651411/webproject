
(function ($) {
    "use strict";
    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    function getrandomHexstring() {
        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6 - x.length);
        var z = "000000";
        var z1 = z.substring(0, y);
        var color = "#" + z1 + x;
        return color;
    }
    window.onload = function () {
        document.getElementById("animate1").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate2").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate3").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate4").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate5").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate6").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate7").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate8").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate9").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate10").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        document.getElementById("animate11").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
        // console.log("window loaded")
    };
    setInterval(function () {
        document.getElementById("animate1").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 25000);
    setInterval(function () {
        document.getElementById("animate2").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 19000);
    setInterval(function () {
        document.getElementById("animate3").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 29000);
    setInterval(function () {
        document.getElementById("animate4").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 22000);
    setInterval(function () {
        document.getElementById("animate5").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 25000);
    setInterval(function () {
        document.getElementById("animate6").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 28000);
    setInterval(function () {
        document.getElementById("animate7").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 32000);
    setInterval(function () {
        document.getElementById("animate8").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 45000);
    setInterval(function () {
        document.getElementById("animate9").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 42000);
    setInterval(function () {
        document.getElementById("animate10").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 36000);
    setInterval(function () {
        document.getElementById("animate11").style.background = `linear-gradient(${getrandomHexstring()},${getrandomHexstring()})`;
    }, 25000);
    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if (validate(input[i]) == false) {

                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }else {
            if($(input).val().trim() == '')
                return false;
            if ($(input).attr('id') == 'confirm_password' || $(input).attr('name') == 'confirmpass') {
                if ($(input).val() != $('#password').val()) 
                    return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
        
    });

})(jQuery);
$(document).ready(function () {
    $("#t2").prop("checked", true);
})
function toggle_template(event) {
    var type = event.id;
    console.log(type);
    if (type == "normal") {
        $("#t1").prop("checked", false);
        $("#t2").prop("checked", true);

        ele = document.getElementById("t2_template");
        if (ele.classList.contains("display_none")) {
            ele.classList.remove("display_none");
        }
        ele = document.getElementById("t1_template");
        if (!ele.classList.contains("display_none")) {
            ele.classList.add("display_none");
        }
    } else {
        $("#t2").prop("checked", false);
        $("#t1").prop("checked", true);

        ele = document.getElementById("t1_template");
        if (ele.classList.contains("display_none")) {
            ele.classList.remove("display_none");
        }
        ele = document.getElementById("t2_template");
        if (!ele.classList.contains("display_none")) {
            ele.classList.add("display_none");
        }
    }
};