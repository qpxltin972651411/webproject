'use strict'
function Road(country, city, r) {
    this.country = country;
    this.city = city;
    this.r = r;
};
class TableMemory {
    constructor(){
        this.name = '';
        this.length = '';
        this.width = '';
        this.amount = '';
        this.ironmold = '';
        this.ironwidth = '';
        this.ironB = '';
        this.Lumu = '';
        this.total = '';
    }
    update() {
        this.name = document.getElementById(`inputName${row_count-1}`).value;
        this.length = document.getElementById(`inputLength${row_count - 1}`).value;
        this.width = document.getElementById(`inputWidth${row_count - 1}`).value;
        this.amount = document.getElementById(`inputAmount${row_count - 1}`).value;
        this.ironmold = document.getElementById(`inputIronMold${row_count - 1}`).value;
        this.ToothW = document.getElementById(`inputToothWhite${row_count - 1}`).value;
        this.ironB = document.getElementById(`inputIronBlock${row_count - 1}`).value;
        this.Lumu = document.getElementById(`inputLumu${row_count - 1}`).value;
        this.total = document.getElementById(`total${row_count - 1}`).innerHTML;
    }
    show() {
        console.log("name : " + this.name);
        console.log("length : " + this.length);
        console.log("width : " + this.width);
        console.log("amount : " + this.amount);
        console.log("ironmold : " + this.ironmold);
        console.log("ToothW : " + this.ToothW);
        console.log("ironB : " + this.ironB);
        console.log("Lumu : " + this.Lumu);
        console.log("total : " + this.total);
    }
    clear() {
        this.name = '';
        this.length = '';
        this.width = '';
        this.amount = '';
        this.ironmold = '';
        this.ironwidth = '';
        this.ironB = '';
        this.Lumu = '';
        this.total = '';
    }
}
var roadarray = [];
var select_unit_scope = '';
var collase = true;
var row_count = 1;
var tablememory = new TableMemory();

function update_table_id() {
    var parent = $('#main_table tbody tr').length;
    //console.log(parent);
    for (var i = 0; i < parent; i++) {
        $(`#main_table tbody tr:eq(${parseInt(i)}) td:eq(0)`).html((i + 1).toString());

        var htmlcontext = $('#main_table').find('tbody').find("tr").eq(parseInt(i)).find("td").eq(1);
        //console.log("before " + htmlcontext.find('a').eq(0).attr("data-target"));
        htmlcontext.find('a').eq(0).attr("data-target", `#form-modal${i + 1}`);
        htmlcontext.find('a').eq(1).attr("id", `form${i + 1}`);
        //console.log("after " + htmlcontext.find('a').eq(0).attr("data-target"));

        htmlcontext.find('div').eq(0).attr("id", `form-modal${i + 1}`);

        htmlcontext.find('div div div div').eq(0).find('h4').eq(0).html(`No. ${i + 1}`);

        var elems = $('#main_table').find(`tbody > tr:eq(${parseInt(i)}) > td:eq(1) > div > div > div > div:eq(1) > form > div`);
        for (var j = 0; j < elems.length; j++) {
            if (j == elems.length - 1) {
                $(elems[j]).find("div:eq(1) p").attr("id", `total${i + 1}`);
            } else {
                var for_value = $(elems[j]).find("label").attr("for");
                var letr = for_value.match(/[a-zA-Z]+/g).join();
                $(elems[j]).find("label").attr("for", `${letr}${i + 1}`);

                for_value = $(elems[j]).find("div input").attr("id");
                console.log("id " + for_value);
                letr = for_value.match(/[a-zA-Z]+/g).join();
                $(elems[j]).find("div input").attr("id", `${letr}${i + 1}`);
            }
        }
        
        //var tbodys = htmlcontext.find('div div div div:eq(1) form:eq(0)');

        /*tbodys.find('div:eq(0) label:eq(0)').attr("for", `inputName${i + 1}`);
        tbodys.find('div:eq(0) div:eq(0) input:eq(0)').attr("id", `inputName${i + 1}`);

        tbodys.find('div:eq(1) label:eq(0)').attr("for", `inputLength${i + 1}`);
        tbodys.find('div:eq(1) div:eq(0) input:eq(0)').attr("id", `inputLength${i + 1}`);

        tbodys.find('div:eq(2) label:eq(0)').attr("for", `inputWidth${i + 1}`);
        tbodys.find('div:eq(2) div:eq(0) input:eq(0)').attr("id", `inputWidth${i + 1}`);

        tbodys.find('div:eq(3) label:eq(0)').attr("for", `inputAmount${i + 1}`);
        tbodys.find('div:eq(3) div:eq(0) input:eq(0)').attr("id", `inputAmount${i + 1}`);

        tbodys.find('div:eq(4) label:eq(0)').attr("for", `inputIronMold${i + 1}`);
        tbodys.find('div:eq(4) div:eq(0) input:eq(0)').attr("id", `inputIronMold${i + 1}`);

        tbodys.find('div:eq(5) label:eq(0)').attr("for", `inputToothWhite${i + 1}`);
        tbodys.find('div:eq(5) div:eq(0) input:eq(0)').attr("id", `inputToothWhite${i + 1}`);

        tbodys.find('div:eq(6) label:eq(0)').attr("for", `inputIronBlock${i + 1}`);
        tbodys.find('div:eq(6) div:eq(0) input:eq(0)').attr("id", `inputIronBlock${i + 1}`);

        tbodys.find('div:eq(7) label:eq(0)').attr("for", `inputLumu${i + 1}`);
        tbodys.find('div:eq(7) div:eq(0) input:eq(0)').attr("id", `inputLumu${i + 1}`);

        tbodys.find('div:eq(8) div:eq(1) p:eq(0)').attr("id", `total${i + 1}`);*/


    }
}
function refresh_table(event) {
    $(event).closest('tr').remove();
    row_count = row_count - 1;
    update_table_id();
    document.getElementById("main_table").classList.remove("table-responsive");
    setTimeout(function () {
        console.log("table-responsive");
        document.getElementById("main_table").classList.add("table-responsive");
    }, 100);
}
function get_row_string(num) {
    if (row_count > 1) {
        tablememory.update();
        tablememory.show();
    } else {
        tablememory.clear();
    }
    return `<td style="width: 200px;display:flex;">
    <a data-toggle="modal" data-target="#form-modal${row_count}" href="#" onclick="return false;" class="btn btn-block btn-alt" style="border:1px solid rgba(127, 255, 127, 0.31) !important">編輯</a>
    <!-- Modal -->
    <div class="modal fade" id="form-modal${row_count}" tabindex="-1" role="dialog">
        <div class="modal-dialog" style="top:10%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-hidden="true" tabindex="-1">&times;</button>
                    <h4 class="modal-title" style="font-size:16px">No. ${row_count}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal form-validation-2" role="form">
                        <div class="form-group">
                            <label for="inputName${row_count}" class="col-md-3 control-label"><span style="color:red;font-weight:bold;">* </span>品名</label>
                            <div class="col-md-8">
                                <input type="text" value="${tablememory.name}" class="form-control input-sm validate[required]" id="inputName${row_count}" onchange="typing(this)" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputLength${row_count}" class="col-md-3 control-label"><span style="color:red;font-weight:bold;">* </span>長度(m)</label>
                            <div class="col-md-8">
                                <input id="inputLength${row_count}" value="${tablememory.length}" type="number" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[required,custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputWidth${row_count}" class="col-md-3 control-label"><span style="color:red;font-weight:bold;">* </span>寬度(m)</label>
                            <div class="col-md-8">
                                <input id="inputWidth${row_count}" value="${tablememory.width}" type="number" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[required,custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAmount${row_count}" class="col-md-3 control-label"><span style="color:red;font-weight:bold;">* </span>數量(m2)</label>
                            <div class="col-md-8">
                                <input id="inputAmount${row_count}" value="${tablememory.amount}" type="number" step="0.01" max="2147483647" min="-10" class="form-control input-sm validate[required,custom[number]]" placeholder="..." autocomplete="off" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputIronMold${row_count}" class="col-md-3 control-label"><span style="color:red;font-weight:bold;">* </span>鐵模單價</label>
                            <div class="col-md-8">
                                <input id="inputIronMold${row_count}" value="${tablememory.ironmold}" type="number" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[required,custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputToothWhite${row_count}" class="col-md-3 control-label">粉體塗裝(牙白)</label>
                            <div class="col-md-8">
                                <input id="inputToothWhite${row_count}" value="${tablememory.ToothW}" type="number" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputIronBlock${row_count}" class="col-md-3 control-label">鐵擋單價</label>
                            <div class="col-md-8">
                                <input id="inputIronBlock${row_count}" value="${tablememory.ironB}" type="number" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputLumu${row_count}" class="col-md-3 control-label">鏍母單價</label>
                            <div class="col-md-8">
                                <input id="inputLumu${row_count}" type="number" value="${tablememory.Lumu}" step="0.01" max="2147483647" min="-10" onchange="typing(this)" class="form-control input-sm validate[custom[number]]" placeholder="..." autocomplete="off">
                            </div>
                        </div>
                        <div class="form-group" style="margin-top:30px;">
                            <div class="col-md-3"></div>
                            <div class="col-md-8">
                                <p class="form-control input-focused" id="total${row_count}" style="text-align:right;border-top:1.5px solid white;color:chartreuse;" tabindex="-1">${tablememory.total}</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" style="text-align:right">
                    <!--<button type="button" class="btn btn-sm btn-alt" tabindex="-1">儲存</button>-->
                    <button type="button" class="btn btn-sm btn-alt" data-dismiss="modal" tabindex="-1">關閉</button>
                </div>
            </div>
        </div>
    </div>
    <!--data-toggle="modal" href="#form-modal${row_count}"-->
    <a id="form${row_count}" href="#" onclick="refresh_table(this); return false;" class="btn btn-block btn-alt" style="border:1px solid rgba(255, 127, 127, 0.31) !important">刪除</a>
</td>`;
}
function add_author(event) {
    row_count = row_count + 1;
    var newRow = jQuery(`<tr><td>${row_count}</td>` +
        get_row_string(row_count) +
        '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    $('#main_table').find('tbody').append(newRow);
    document.getElementById("main_table").classList.remove("table-responsive");
    setTimeout(function () {
        console.log("table-responsive");
        document.getElementById("main_table").classList.add("table-responsive");
    }, 100);
    //update_table_id();
    console.log("copy " + row_count + " success!");
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(2).html(document.getElementById("inputName" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(3).html(document.getElementById("inputLength" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(4).html(document.getElementById("inputWidth" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(5).html(document.getElementById("inputAmount" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(6).html(document.getElementById("inputIronMold" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(7).html(document.getElementById("inputToothWhite" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(8).html(document.getElementById("inputIronBlock" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(9).html(document.getElementById("inputLumu" + row_count).value);
    $('#main_table').find('tbody').find("tr").eq(row_count - 1).find("td").eq(10).html(document.getElementById("total" + row_count).innerHTML);
}
function MyFormNumber(element, data) {
    this.data = data;
    this.element = element;
    element.value = data;
    element.addEventListener("change", this, false);
}
MyFormNumber.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change": this.change(this.element.value);
    }
};
MyFormNumber.prototype.change = function (value) {
    this.data = value;
    this.element.value = value;
};
/*var obj = new MyFormNumber(document.getElementById("formnumber"), "20");
// simulate some JS based changes.
var i = 0;
setInterval(function () {
    obj.change(parseInt(obj.element.value) + 1);
}, 1000);*/

const delay = ms => new Promise(res => setTimeout(res, ms));
$(document).ready(function () {
    $.getJSON("opendata110road_normal.json", function (json) {
        //console.log(json); // this will show the info it in firebug console
        for (var i = 0; i < json.length; i++) {
           // console.log(i, json[i]["country"], json[i]["city"]);
            let _new = new Road(json[i]["country"], json[i]["city"], json[i]["areas"]);
            roadarray.push(_new);
        }
        //console.log(roadarray);
        __init__();
    });
    /* Input Masking - you can include your own way */
    (function () {
        $('.mask-date').mask('00/00/0000');
        $('.mask-time').mask('00:00:00');
        $('.mask-date_time').mask('00/00/0000 00:00:00');
        $('.mask-cep').mask('00000-000');
        $('.mask-phone').mask('0000-0000');
        $('.mask-phone_with_ddd').mask('(00) 0000-0000');
        $('.mask-phone_us').mask('(000) 000-0000');
        $('.mask-tel').mask('(00) 000-0000');
        $('.mask-mixed').mask('AAA 000-S0S');
        $('.mask-cpf').mask('000.000.000-00', { reverse: true });
        $('.mask-money').mask('000.000.000.000.000,00', { reverse: true });
        $('.mask-money2').mask("#.##0,00", { reverse: true, maxlength: false });
        $('.mask-ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
        $('.mask-ip_address').mask('099.099.099.099');
        $('.mask-percent').mask('##0,00%', { reverse: true });
        $('.mask-credit_card').mask('0000 0000 0000 0000');
    })();
    $("input[data-validatetax]").each(function () {
        $(this).on('focusout', function () {
            let inputtax = this.value;
            const cx = [1, 2, 1, 2, 1, 2, 4, 1];
            const cnum = inputtax.split('');
            let sum = 0;
            function cc(num) {
                let total = num;
                if (total > 9) {
                    let s = total.toString();
                    const n1 = s.substring(0, 1) * 1;
                    const n2 = s.substring(1, 2) * 1;
                    total = n1 + n2;
                }
                return total;
            }
            if (inputtax.length !== 8) {
                console.log('統編錯誤，要有 8 個數字');
                pop_news('統編錯誤，要有 8 個數字');
                this.style.color = "#f00";
                var attributes_bar = document.getElementById(this.id);
                if (attributes_bar) {
                    attributes_bar.classList.add("animate-bounce-up");
                    setTimeout(function () {
                        console.log("delete animate-bounce-up");
                        attributes_bar.classList.remove("animate-bounce-up");
                    }, 300);
                }
                $(this).focus();
                $(this).select();
                return;
            }
            cnum.forEach((item, index) => {
                if (inputtax.charCodeAt() < 48 || inputtax.charCodeAt() > 57) {
                    console.log('統編錯誤，要有 8 個 0-9 數字組合');
                    pop_news('統編錯誤，要有 8 個 0-9 數字組合');
                    this.style.color = "#f00";
                    var attributes_bar = document.getElementById(this.id);
                    if (attributes_bar) {
                        attributes_bar.classList.add("animate-bounce-up");
                        setTimeout(function () {
                            console.log("delete animate-bounce-up");
                            attributes_bar.classList.remove("animate-bounce-up");
                        }, 300);
                    }
                    $(this).focus();
                    $(this).select();
                    return;
                }
                sum += cc(item * cx[index]);
            });
            console.log(sum);
            if (sum % 10 === 0) {
                console.log('統編正確');
                this.style.color = "#0f0";
            } else if (cnum[6] === '7' && (sum + 1) % 10 === 0) {
                console.log('統編正確2');
                this.style.color = "#0f0";
            } else {
                console.log('統編錯誤');
                pop_news('統編錯誤');
                this.style.color = "#f00";
                var attributes_bar = document.getElementById(this.id);
                if (attributes_bar) {
                    attributes_bar.classList.add("animate-bounce-up");
                    setTimeout(function () {
                        console.log("delete animate-bounce-up");
                        attributes_bar.classList.remove("animate-bounce-up");
                    }, 300);
                }
                $(this).focus();
                $(this).select();
            }
            /*var validateFor = $(this).attr("validateFor");
            if ($.trim($(this).val()).length < parseInt(validateFor)) {
                $(this).focus();
                $(this).select();
            }*/
        });
    });
});
$(document).ready(function () {
    function functionToLoadFile() {
        //url change
        var virutal = window.location.pathname.replace("/Table", "");
        console.log(`${window.location.origin}${virutal}/message.txt`);
        jQuery.get(`${window.location.origin}${virutal}/message.txt`, function (data) {
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

    setTimeout(functionToLoadFile, 10);
});
function __init__() {
    let city = document.getElementById("city");
    city.disabled = true;
    let areas = document.getElementById("areas");
    areas.disabled = true;

    let pre_city = document.getElementById("private_city");
    pre_city.disabled = true;
    let private_areas = document.getElementById("private_areas");
    private_areas.disabled = true;

    let elems = document.getElementsByClassName("unit_area");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = "none";
    }
    let ins_elems = document.getElementsByClassName("iCheck-helper");
    for (var i = 0; i < ins_elems.length; i++) {
        ins_elems[i].addEventListener("click", area_toggled);
    }
}


function refresh_city(elename,country) {
    let city = document.getElementById(elename);
    if (city) {
        var i, L = city.options.length - 1;
        for (i = L; i >= 0; i--) {
            city.remove(i);
        }
        var opt = document.createElement('option');
        opt.value = "";
        opt.innerHTML = "選擇地區";
        city.appendChild(opt);

        for (var j = 0; j < roadarray.length; j++) {
            if (roadarray[j]["country"] === country) {
                var opt = document.createElement('option');
                opt.value = roadarray[j]["city"];
                opt.innerHTML = roadarray[j]["city"];
                city.appendChild(opt);
            }
        }
    }
}
function refresh_road(elename) {
    let areas = document.getElementById(elename);
    if (areas) {
        areas.value = "";
        /*var i, L = areas.options.length - 1;
        for (i = L; i >= 0; i--) {
            areas.remove(i);
        }
        var opt = document.createElement('option');
        opt.value = "";
        opt.innerHTML = "選擇路名";
        areas.appendChild(opt);
        if (city === "")
            return;
        for (var j = 0; j < roadarray.length; j++) {
            if (roadarray[j]["city"] === city) {
                for (var k = 0; k < roadarray[j]["r"].length; k++) {
                    var opt = document.createElement('option');
                    opt.value = roadarray[j]["r"][k];
                    opt.innerHTML = roadarray[j]["r"][k];
                    areas.appendChild(opt);
                }
                return;
            }
        }*/
    }
}
function country_pick(event) {
    if (event) {
        console.log("country input name : " + event.id);
        let input_city_ele = null, input_areas_ele = null;
        if (event.id === "country") {
            input_city_ele = "city";
            input_areas_ele = "areas";
        } else {
            input_city_ele = "private_city";
            input_areas_ele = "private_areas";
        }
        refresh_city(input_city_ele, event.value);
        refresh_road(input_areas_ele);
        if (event.value === "") {
            let city = document.getElementById(input_city_ele);
            city.value = "";
            city.disabled = true;
            let areas = document.getElementById(input_areas_ele);
            areas.value = "";
            areas.disabled = true;
        } else {
            let city = document.getElementById(input_city_ele);
            city.disabled = false;
        }
    }
};
function city_pick(event) {
    if (event) {
        console.log("city input name : " + event.id);
        let input_areas_ele = null;
        if (event.id === "city") 
            input_areas_ele = "areas";
        else 
            input_areas_ele = "private_areas";
        refresh_road(input_areas_ele);
        if (event.value === "") {
            let areas = document.getElementById(input_areas_ele);
            areas.value = "";
            areas.disabled = true;
        } else {
            let areas = document.getElementById(input_areas_ele);
            areas.disabled = false;
        }
    }
    
}
async function area_toggled() {
    await delay(200);
    let clr = document.getElementsByClassName("unit_area");
    for (var i = 0; i < clr.length; i++) {
        clr[i].style.display = "none";
    }
    let elems = document.getElementsByClassName("iradio_minimal");
    let index = -1;
    for (var i = 0; i < elems.length; i++) {
        let t = elems.item(i);
        if (t.classList.contains("checked")) {
            index = i;
        }
    }
    if (index === -1) {
        return;
    }
    if (select_unit_scope == '') {
        //first click
        if (index == 0) {
            select_unit_scope = 'company';
            let tooltip = document.getElementById("area_tooltips");
            tooltip.innerHTML = "已選擇公司";
        } else {
            select_unit_scope = 'private';
            let tooltip = document.getElementById("area_tooltips");
            tooltip.innerHTML = "已選擇私人";
        }
        let areaelems = document.getElementsByClassName("unit_area");
        //console.log(areaelems.length);
        areaelems.item(index).style.display = "block";
        
    } else {
        if (select_unit_scope == 'company' && index == 0) {
            //repeat click
            let areaelems = document.getElementsByClassName("unit_area");
            //console.log(areaelems.length);
            areaelems.item(index).style.display = "block";
            pop_news("重複點擊");
            return;
        }
        if (select_unit_scope == 'private' && index == 1) {
            //repeat click
            let areaelems = document.getElementsByClassName("unit_area");
            //console.log(areaelems.length);
            areaelems.item(index).style.display = "block";
            pop_news("重複點擊");
            return;
        }
        //else
        if (confirm('確定要切換欄位嗎? 切換將會清除先前已填資料。')) {
            // clear it
            console.log('已切換欄位!');
            pop_news("已切換欄位");
            if (collase) {
                let areaelems = document.getElementsByClassName("unit_area");
                //console.log(areaelems.length);
                areaelems.item(index).style.display = "block";
            }
            if (index == 0) {
                select_unit_scope = 'company';
                clear_private_scope();
                let tooltip = document.getElementById("area_tooltips");
                tooltip.innerHTML = "已選擇公司";
            } else {
                select_unit_scope = 'private';
                clear_scope();
                let tooltip = document.getElementById("area_tooltips");
                tooltip.innerHTML = "已選擇私人";
            }
            return;
        } else {
            // cancel
            console.log('取消切換欄位');
            let eleems = document.getElementsByClassName("radio-inline");
            if (select_unit_scope == 'company') {
                eleems[0].click();
            } else {
                eleems[1].click();
            }
            return;
        }
    }
}
function slide_slow() {
    if (collase == false && select_unit_scope!='')
        collase = true;
    else
        collase = false;
    if (collase) {
        document.getElementById("collase_icon").innerHTML = '&uarr;';
    } else {
        document.getElementById("collase_icon").innerHTML = '&darr;';
    }
    let areaelems = document.getElementsByClassName("unit_area");
    if (select_unit_scope == 'company') {
        $(areaelems[0]).slideToggle("slow");

    } else if (select_unit_scope == 'private') {
        $(areaelems[1]).slideToggle("slow");
    }
}
function clear_scope() {
    document.getElementById("country").value = '';
    document.getElementById("city").value = '';
    document.getElementById("city").disabled = true;
    document.getElementById("areas").value = '';
    document.getElementById("areas").disabled = true;

    document.getElementById("unit_name").value = '';
    document.getElementById("unit_fax").value = '';
    document.getElementById("unit_cel").value = '';
    document.getElementById("unit_tel").value = '';
    document.getElementById("unit_tax").value = '';
}
function clear_private_scope() {
    document.getElementById("private_country").value = '';
    document.getElementById("private_city").value = '';
    document.getElementById("private_city").disabled = true;
    document.getElementById("private_areas").value = '';
    document.getElementById("private_areas").disabled = true;

    document.getElementById("private_unit_name").value = '';
    document.getElementById("private_unit_fax").value = '';
    document.getElementById("private_unit_cel").value = '';
    document.getElementById("private_unit_tel").value = '';
}
function input_focus_event(event) {
    var inputs, index;

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        if (inputs[index].classList.contains("input-focused")) {
            inputs[index].classList.remove("input-focused");
        }
    }
    document.getElementById(event.id).classList.add("input-focused");
    console.log(event.id + " focused ");
}
function updateAmount(letter,number,v) {
    var complete_cal = null;
    if (letter == "inputLength") {
        complete_cal = document.getElementById("inputWidth" + number);
    } else if (letter == "inputWidth") {
        complete_cal = document.getElementById("inputLength" + number);
    }
    if (complete_cal) {
        if (complete_cal.value == "") {
            console.log("數量有一個為空 清空 離開");
            document.getElementById("inputAmount" + number).value = "";
            document.getElementById("total" + number).innerHTML = "總計 $ 0";
            var attributes_bar = document.getElementById("inputAmount" + number);
            var attributes_bar_2 = document.getElementById("total" + number);
            if (attributes_bar && attributes_bar_2) {
                attributes_bar.classList.add("animate-bounce-up");
                attributes_bar_2.classList.add("animate-bounce-up");
                setTimeout(function () {
                    console.log("delete animate-bounce-up");
                    attributes_bar.classList.remove("animate-bounce-up");
                    attributes_bar_2.classList.remove("animate-bounce-up");
                }, 300);
            }
            return;
        }
        var result = (parseFloat(v) * parseFloat(complete_cal.value)).toFixed(2);
        console.log(result);
        document.getElementById("inputAmount" + number).value = result;
    }
    return;
}
function typing(event) {
    
    var toucher = event.id;
    var num = toucher.match(/\d+/g).join();
    var letr = toucher.match(/[a-zA-Z]+/g).join();
    var required_index = ["inputWidth", "inputLength"];
    console.log(letr + "changing   " + "number : " + num);
    if (required_index.indexOf(letr) != -1) {
        if (event.value == "") {
            document.getElementById("inputAmount" + num).value = "";
            document.getElementById("total" + num).innerHTML = "總計 $ 0";
            console.log("數量有一個為空 清空 離開");
            var attributes_bar = document.getElementById("inputAmount" + num);
            var attributes_bar_2 = document.getElementById("total" + num);
            if (attributes_bar && attributes_bar_2) {
                attributes_bar.classList.add("animate-bounce-up");
                attributes_bar_2.classList.add("animate-bounce-up");
                setTimeout(function () {
                    console.log("delete animate-bounce-up");
                    attributes_bar.classList.remove("animate-bounce-up");
                    attributes_bar_2.classList.remove("animate-bounce-up");
                }, 300);
            }
            return;
        } else {
            updateAmount(letr, num, event.value);
        }
    }

    var required_index_2 = ["inputIronMold"];
    if (required_index_2.indexOf(letr) != -1) {
        if (event.value == "") {
            document.getElementById("total" + num).innerHTML = "總計 $ 0";
            console.log("鐵模為空 清空 離開");
            var attributes_bar = document.getElementById("total" + num);
            if (attributes_bar) {
                attributes_bar.classList.add("animate-bounce-up");
                setTimeout(function () {
                    console.log("delete animate-bounce-up");
                    attributes_bar.classList.remove("animate-bounce-up");
                }, 300);
            }
            return;
        }
    }
    /*var total_cal = true;
    for (var i = 0; i < required_index_2.length; i++) {
        console.log(required_index_2[i]);
        if (document.getElementById(required_index_2[i] + num).value == "") {
            total_cal = false;
            document.getElementById("total" + num).innerHTML = "總計 $ 0";
            return;
        }
    }*/
    console.log(document.getElementById("inputAmount" + num).value);
    console.log(document.getElementById("inputIronMold" + num).value);
    if (document.getElementById("inputAmount" + num).value != "" && document.getElementById("inputIronMold" + num).value != "") {
        var total_index = ["inputIronMold", "inputToothWhite", "inputIronBlock","inputLumu"];
        var cal = 0;
        for (var i = 0; i < total_index.length; i++) {
            console.log(total_index[i]);
            if (document.getElementById(total_index[i] + num).value != "") {
                cal = cal + parseFloat(document.getElementById(total_index[i] + num).value);
            }
        }
        console.log("totoal : " + cal);
        var res = parseFloat(document.getElementById("inputAmount" + num).value) * cal;
        console.log(res);
        document.getElementById("total" + num).innerHTML = "總計 $ " + res;
    }
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(2).html(document.getElementById("inputName" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(3).html(document.getElementById("inputLength" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(4).html(document.getElementById("inputWidth" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(5).html(document.getElementById("inputAmount" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(6).html(document.getElementById("inputIronMold" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(7).html(document.getElementById("inputToothWhite" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(8).html(document.getElementById("inputIronBlock" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(9).html(document.getElementById("inputLumu" + num).value);
    $('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(10).html(document.getElementById("total" + num).innerHTML);

    /*console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(0).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(2).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(3).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(4).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(5).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(6).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(7).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(8).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(9).text());
    console.log($('#main_table').find('tbody').find("tr").eq(parseInt(num) - 1).find("td").eq(10).text());*/
}