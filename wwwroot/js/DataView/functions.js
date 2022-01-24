'use strict'
var roadarray = [];
var row_count = 0;
var is_not_reload = true;
class editlocalunit{
    constructor({ name = '', tax = '', cel = '', telareacode = '', telcode = '', faxareacode = '', faxcode = '', country = '', city = '', address = '' } = {}) {

        this.name = name;
        this.tax = tax;
        this.cel = cel;
        this.telareacode = telareacode;
        this.telcode = telcode;
        this.faxareacode = faxareacode;
        this.faxcode = faxcode;
        this.country = country;
        this.city = city;
        this.address = address;
    }
    reset(name, tax, cel, telareacode, telcode, faxareacode, faxcode, country, city, address) {
        this.name = name;
        this.tax = tax;
        this.cel = cel;
        this.telareacode = telareacode;
        this.telcode = telcode;
        this.faxareacode = faxareacode;
        this.faxcode = faxcode;
        this.country = country;
        this.city = city;
        this.address = address;
    }
    compare_value(name, tax, cel, telareacode, telcode, faxareacode, faxcode, country, city, address) {
        if (this.name != name)
            return false;
        if (this.tax != tax)
            return false;
        if (this.cel != cel)
            return false;
        if (this.telareacode != telareacode)
            return false;
        if (this.telcode != telcode)
            return false;
        if (this.faxareacode != faxareacode)
            return false;
        if (this.faxcode != faxcode)
            return false;
        if (this.country != country)
            return false;
        if (this.city != city)
            return false;
        if (this.address != address)
            return false;
        return true;
    }
}

function Road(country, city, r) {
    this.country = country;
    this.city = city;
    this.r = r;
};
var temp_editlocalunit = new editlocalunit();
console.log(temp_editlocalunit);
function post_delete_unit_to_server(event) {
    var toucher = event.id;
    var num = toucher.match(/\d+/g).join();
    var tax = document.getElementById(`tax${num}`).value;
    var name = document.getElementById(`name${num}`).value;
    $(event).closest('tr').remove();
    var json_format = { "tax": tax, "name": name };
    $.ajax({
        //here
        url: "/Detecting/deleteLocaldata",
        data: JSON.stringify(json_format),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        error: function (passParams) {
            console.log("Error is " + passParams.status, passParams.statusText);
        }
    });
}

function refresh_table(event) {
    Swal.fire({
        title: '刪除資料',
        text: "確定要刪除資料嗎?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '是',
        cancelButtonText: "否",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '確定刪除資料嗎?',
                text: "相關的表單資料也會一併刪除!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是',
                cancelButtonText: "否",
            }).then((result) => {
                if (result.isConfirmed) {
                    post_delete_unit_to_server(event);
                } else {
                    Swal.fire({
                        title: "訊息",
                        text: "已取消刪除 :)",
                        icon: 'success',
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Ok',
                    });
                    return;
                }
            })
        } else {
            Swal.fire({
                title: "訊息",
                text: "已取消刪除 :)",
                icon: 'success',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok',
            });
            return;
        }
    })
    /*document.getElementById("main_table").classList.remove("table-responsive");
    setTimeout(function () {
        console.log("table-responsive");
        document.getElementById("main_table").classList.add("table-responsive");
    }, 100);*/
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

const delay = ms => new Promise(res => setTimeout(res, ms));
function geturl() {
    if (window.location.pathname.includes("factory")) {
        return `${window.location.origin}/factory/`;
    } else {
        return `${window.location.origin}/`;
    }
}
function resetmodalvalue(index) {
    document.getElementById(`name${index}`).value = temp_editlocalunit.name;
    document.getElementById(`tax${index}`).value = temp_editlocalunit.tax;
    document.getElementById(`cel${index}`).value = temp_editlocalunit.cel;
    document.getElementById(`telareacode${index}`).value = temp_editlocalunit.telareacode;
    document.getElementById(`telcode${index}`).value = temp_editlocalunit.telcode;
    document.getElementById(`faxareacode${index}`).value = temp_editlocalunit.faxareacode;
    document.getElementById(`faxcode${index}`).value = temp_editlocalunit.faxcode;
    document.getElementById(`country${index}`).value = temp_editlocalunit.country;
    document.getElementById(`city${index}`).value = temp_editlocalunit.city;
    document.getElementById(`address${index}`).value = temp_editlocalunit.address;
}
function bindeditmodalvalue() {
    for (let forloopbind = 1; forloopbind <= row_count; forloopbind++) {
        console.log(forloopbind);
        $(`#form-modal${forloopbind}`).on('shown.bs.modal', function (e) {
            console.log(`form-modal${forloopbind} is pop !`);
            if (is_not_reload) {
                let cur_name = document.getElementById(`name${forloopbind}`).value;
                let cur_tax = document.getElementById(`tax${forloopbind}`).value;
                let cur_cel = document.getElementById(`cel${forloopbind}`).value;
                let cur_telareacode = document.getElementById(`telareacode${forloopbind}`).value;
                let cur_telcode = document.getElementById(`telcode${forloopbind}`).value;
                let cur_faxareacode = document.getElementById(`faxareacode${forloopbind}`).value;
                let cur_faxcode = document.getElementById(`faxcode${forloopbind}`).value;
                let cur_country = document.getElementById(`country${forloopbind}`).value;
                let cur_city = document.getElementById(`city${forloopbind}`).value;
                let cur_address = document.getElementById(`address${forloopbind}`).value;
                temp_editlocalunit.reset(cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address);
                console.log(temp_editlocalunit);
            } else {
                //不要重載
            }
            
        });
        $(`#form-modal${forloopbind}`).on('hidden.bs.modal', function (e) {
            console.log(`form-modal${forloopbind} is already hide !`);
            let cur_name = document.getElementById(`name${forloopbind}`).value;
            let cur_tax = document.getElementById(`tax${forloopbind}`).value;
            let cur_cel = document.getElementById(`cel${forloopbind}`).value;
            let cur_telareacode = document.getElementById(`telareacode${forloopbind}`).value;
            let cur_telcode = document.getElementById(`telcode${forloopbind}`).value;
            let cur_faxareacode = document.getElementById(`faxareacode${forloopbind}`).value;
            let cur_faxcode = document.getElementById(`faxcode${forloopbind}`).value;
            let cur_country = document.getElementById(`country${forloopbind}`).value;
            let cur_city = document.getElementById(`city${forloopbind}`).value;
            let cur_address = document.getElementById(`address${forloopbind}`).value;
            if (temp_editlocalunit.compare_value(cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address)) {
                //same value do nothing!
                console.log("same value");
            } else {
                console.log("change value");
                Swal.fire({
                    title: '確定關閉嗎?',
                    text: "未點擊儲存按鈕，資料尚未更動，確定要關閉視窗嗎?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: '是',
                    cancelButtonText: "否",
                }).then((result) => {
                    if (result.isConfirmed) {
                        //我要關閉，值要回復
                        resetmodalvalue(forloopbind);
                        $(`#form-modal${forloopbind}`).modal('hide');
                        is_not_reload = true;
                    } else {
                        //不要關閉，重載值
                        is_not_reload = false;
                        $(`#form-modal${forloopbind}`).modal();
                    }
                })
                //temp_editlocalunit.reset(cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address);
            }
        });
    }
}
function row_count__init__() {
    while (true) {
        row_count = row_count + 1;
        var ct = document.getElementById(`form-modal${row_count}`);
        if (ct == null)
            break;
    }
    row_count -= 1;
}
$(document).ready(function () {
    __refresh__sidebar_active("dataviewbtn");
    function opendata110road_normal__init__() {
        var path = `${geturl()}opendata110road_normal.json`;
        $.getJSON(path, function (json) {
            //console.log(json); // this will show the info it in firebug console
            for (var i = 0; i < json.length; i++) {
                // console.log(i, json[i]["country"], json[i]["city"]);
                let _new = new Road(json[i]["country"], json[i]["city"], json[i]["areas"]);
                roadarray.push(_new);
            }
            row_count__init__();
            edit_city__init__();
            console.log(row_count);
            bindeditmodalvalue();
        });
    }
    opendata110road_normal__init__();

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

function edit_city__init__() {
    for (let taxbtn_index = 1; taxbtn_index <= row_count; taxbtn_index++) {
        $(`#editsubmit${taxbtn_index}`).click(function () {
            $(`#tax${taxbtn_index}`).prop("disabled", false);
        });
        var ct = document.getElementById(`city${taxbtn_index}`);
        refresh_city(`city${taxbtn_index}`, document.getElementById(`country${taxbtn_index}`).value);
        var v = ct.getAttribute('data-value');
        document.getElementById(`city${taxbtn_index}`).value = v;
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
function toggledmap(event) {
    var toucher = event.id;
    if (toucher == "togglemap") {
        document.getElementById(`mapembed`).classList.toggle("display_none");
        if (document.getElementById(`mapembed`).classList.contains("display_none")) {
            event.innerHTML = "顯示 google map 地圖";
        } else {
            event.innerHTML = "隱藏 google map 地圖";
        }
    } else {
        var num = toucher.match(/\d+/g).join();
        var letr = toucher.match(/[a-zA-Z]+/g).join();
        document.getElementById(`mapembed${num}`).classList.toggle("display_none");
        if (document.getElementById(`mapembed${num}`).classList.contains("display_none")) {
            event.innerHTML = "顯示 google map 地圖";
        } else {
            event.innerHTML = "隱藏 google map 地圖";
        }
    }
    
}
function refresh_road(elename) {
    let areas = document.getElementById(elename);
    if (areas) 
        areas.value = "";
    return;
}
function googlemapembed(event) {
    if (event!= null && event.value != "") {
        var ct = document.getElementById("newcountry").value + document.getElementById("newcity").value + event.value;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
        document.getElementById("mapembed").src = srcstring;
    }
}
function editgooglemapembed(event) {
    if (event!=null && event.value != "") {
        var toucher = event.id;
        var num = toucher.match(/\d+/g).join();
        var letr = toucher.match(/[a-zA-Z]+/g).join();
        var ct = document.getElementById(`country${num}`).value + document.getElementById(`city${num}`).value + event.value;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
        document.getElementById(`mapembed${num}`).src = srcstring;
    }
}
function country_pick(event) {
    if (event) {
        console.log("country input name : " + event.id);
        var toucher = event.id;
        var num = toucher.match(/\d+/g).join();
        var letr = toucher.match(/[a-zA-Z]+/g).join();
        var input_city_ele = `city${num}`, input_address_ele = `address${num}`;
        refresh_city(input_city_ele, event.value);
        refresh_road(input_address_ele);
        if (event.value === "") {
            let city = document.getElementById(input_city_ele);
            city.value = "";
            city.disabled = true;
            let address = document.getElementById(input_address_ele);
            address.value = "";
            address.disabled = true;
        } else {
            let city = document.getElementById(input_city_ele);
            city.disabled = false;
            var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${event.value}`;
            document.getElementById(`mapembed${num}`).src = srcstring;
        }
    }
}
function city_pick(event) {
    if (event) {
        console.log("city input name : " + event.id);
        var toucher = event.id;
        var num = toucher.match(/\d+/g).join();
        var letr = toucher.match(/[a-zA-Z]+/g).join();
        let input_address_ele = `address${num}`;
        refresh_road(input_address_ele);
        if (event.value === "") {
            let address = document.getElementById(input_address_ele);
            address.value = "";
            address.disabled = true;
        } else {
            let address = document.getElementById(input_address_ele);
            address.disabled = false;
            var ct = document.getElementById(`country${num}`).value + event.value;
            var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
            document.getElementById(`mapembed${num}`).src = srcstring;
        }
    }
}
function newcountry_pick(event) {
    if (event) {
        console.log("country input name : " + event.id);
        let input_city_ele = "newcity", input_areas_ele = "newaddress";
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
            var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${event.value}`;
            document.getElementById("mapembed").src = srcstring;
        }
    }
};
function newcity_pick(event) {
    if (event) {
        console.log("city input name : " + event.id);
        let input_areas_ele = "newaddress";
        refresh_road(input_areas_ele);
        if (event.value === "") {
            let areas = document.getElementById(input_areas_ele);
            areas.value = "";
            areas.disabled = true;
        } else {
            let areas = document.getElementById(input_areas_ele);
            areas.disabled = false;
            var ct = document.getElementById("newcountry").value + event.value;
            var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
            document.getElementById("mapembed").src = srcstring;
        }
    }
}

function searching(event) {
    var toucher = event.id;
    var table = document.getElementById("edit_table");
    var rowLength = table.rows.length;

    for (var i = 1; i < rowLength; i += 1) {
        var row = table.rows[i];

        //your code goes here, looping over every row.
        //cells are accessed as easy
        if (toucher == "search_name") {
            let cell = row.cells[2];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_tax") {
            let cell = row.cells[3];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_country") {
            let cell = row.cells[4];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_city") {
            let cell = row.cells[5];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_address") {
            let cell = row.cells[6];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_cel") {
            let cell = row.cells[7];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_tel") {
            let cell = row.cells[8];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_fax") {
            let cell = row.cells[9];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        }
        /*var cellLength = row.cells.length;
        for (var y = 0; y < cellLength; y += 1) {
            var cell = row.cells[y];

            //do something with every cell here
        }*/
    }
    
}
