'use strict'

var reload = true;
var taxmode;
class editlocalunit{
    constructor({unittype = '', name = '', tax = '', cel = '', telareacode = '', telcode = '', faxareacode = '', faxcode = '', country = '', city = '', address = '' } = {}) {
        this.unittype = unittype;
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
    reset(unittype ,name, tax, cel, telareacode, telcode, faxareacode, faxcode, country, city, address) {
        this.unittype = unittype;
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
    compare_value(unittype ,name, tax, cel, telareacode, telcode, faxareacode, faxcode, country, city, address) {
        if (this.unittype != unittype)
            return false;
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
var taxelement = null;
var tax_copy_div_list = [];

var roadarray = [];
var store_data = [];
var country_list = [];

var table = null;
var max_row_count = 20;
var column_count = 13;
var total_row = 0;
var cur_page = 1;
var total_page = 0;
var page_item_show_limit = 7;

var pagination_container = null;

function create_empty_row() {
    let tr = document.createElement("tr");
    for (let i = 0; i < column_count; i++) {
        let column = document.createElement("td");
        column.innerHTML = "空";
        tr.appendChild(column);
    }
    return tr;
}
function getCookie(name) {
    const value = `; ${decodeURIComponent(document.cookie)}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
    if (temp_editlocalunit.unittype == "tax") {
        let ele = document.getElementById(`choices_tax${index}`);
        ele.checked = true;
        if (document.getElementById(`tax${index}`) == null) {
            let insert_empty = false;
            for (let je = 0; je < tax_copy_div_list.length; je++) {
                if (tax_copy_div_list[je].id == index) {
                    console.log(tax_copy_div_list);
                    let copy_insert = tax_copy_div_list[je].cloneNode(true);
                    $(copy_insert).removeAttr("id");
                    document.getElementById(`edit_form${index}`).insertBefore(copy_insert, document.getElementById(`edit_form${index}`).children[4]);
                    insert_empty = true;
                    break;
                }
            }
            if (!insert_empty) {
                document.getElementById(`edit_form${index}`).insertBefore(create_tax_group(index, user_is_not_allow(store_data[index - 1])), document.getElementById(`edit_form${index}`).children[4]);
                document.getElementById(`tax${index}`).value = "";
            }
        }
    } else {
        let ele = document.getElementById(`choices_notax${index}`);
        ele.checked = true;
        if (document.getElementById(`tax${index}`) != null) {
            let rm_taxele = document.getElementById(`tax${index}`);
            $(rm_taxele).parent().parent().remove();
        }
    }
    document.getElementById(`name${index}`).value = temp_editlocalunit.name;
    if (document.getElementById(`tax${index}`) != null) {
        document.getElementById(`tax${index}`).value = temp_editlocalunit.tax;
    }
    document.getElementById(`cel${index}`).value = temp_editlocalunit.cel;
    document.getElementById(`telareacode${index}`).value = temp_editlocalunit.telareacode;
    document.getElementById(`telcode${index}`).value = temp_editlocalunit.telcode;
    document.getElementById(`faxareacode${index}`).value = temp_editlocalunit.faxareacode;
    document.getElementById(`faxcode${index}`).value = temp_editlocalunit.faxcode;
    document.getElementById(`country${index}`).value = temp_editlocalunit.country;
    __init__city(document.getElementById(`city${index}`), temp_editlocalunit.country);
    document.getElementById(`city${index}`).value = temp_editlocalunit.city;
    document.getElementById(`address${index}`).value = temp_editlocalunit.address;
}
function bindeditmodalvalue() {
    for (let i = ((cur_page - 1) * max_row_count); i < (max_row_count) * cur_page; i++) {
        if (i >= store_data.length || user_is_not_allow(store_data[i])==false)
            break;
        $(`#form-modal${i + 1}`).on('shown.bs.modal', function (e) {
            console.log(`form-modal${i + 1} is pop !`);
            if (reload) {
                var $boxes = $(`input[name=choices${i + 1}]:checked`);

                let cur_unittype = $boxes[0].value;
                let cur_name = document.getElementById(`name${i + 1}`).value;
                let cur_tax = null;
                if ($boxes[0].value == "tax")
                    cur_tax = document.getElementById(`tax${i + 1}`).value;
                let cur_cel = document.getElementById(`cel${i + 1}`).value;
                let cur_telareacode = document.getElementById(`telareacode${i + 1}`).value;
                let cur_telcode = document.getElementById(`telcode${i + 1}`).value;
                let cur_faxareacode = document.getElementById(`faxareacode${i + 1}`).value;
                let cur_faxcode = document.getElementById(`faxcode${i + 1}`).value;
                let cur_country = document.getElementById(`country${i + 1}`).value;
                let cur_city = document.getElementById(`city${i + 1}`).value;
                let cur_address = document.getElementById(`address${i + 1}`).value;
                temp_editlocalunit.reset(cur_unittype, cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address);
                console.log(temp_editlocalunit);
            } else {
                //dont reload;
            }
        });

        $(`#form-modal${i + 1}`).on('hidden.bs.modal', function (e) {
            console.log(`form-modal${i + 1} is already close !`);
            var $boxes = $(`input[name=choices${i + 1}]:checked`);

            let cur_unittype = $boxes[0].value;
            let cur_name = document.getElementById(`name${i + 1}`).value;
            let cur_tax = null;
            if ($boxes[0].value == "tax")
                cur_tax = document.getElementById(`tax${i + 1}`).value;
            let cur_cel = document.getElementById(`cel${i + 1}`).value;
            let cur_telareacode = document.getElementById(`telareacode${i + 1}`).value;
            let cur_telcode = document.getElementById(`telcode${i + 1}`).value;
            let cur_faxareacode = document.getElementById(`faxareacode${i + 1}`).value;
            let cur_faxcode = document.getElementById(`faxcode${i + 1}`).value;
            let cur_country = document.getElementById(`country${i + 1}`).value;
            let cur_city = document.getElementById(`city${i + 1}`).value;
            let cur_address = document.getElementById(`address${i + 1}`).value;

            if (temp_editlocalunit.compare_value(cur_unittype, cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address)) {
                //same value do nothing!
                console.log("same value. dont ask question");
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
                        resetmodalvalue(i + 1);
                        $(`#form-modal${i + 1}`).modal('hide');
                        reload = true;
                    } else {
                        //不要關閉，重載值
                        $(`#form-modal${i + 1}`).modal();
                        reload = false;
                    }
                })
                //temp_editlocalunit.reset(cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address);
            }
        });
    }
}
function __init__(engineer_unit_json, country_list_json) {
    store_data = engineer_unit_json;
    country_list = country_list_json;
    console.log(store_data);
}
function __init__prepagebtn(disabled) {
    if (disabled) {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");
        page_item.classList.add("disabled");

        let page_link = document.createElement("span");
        page_link.classList.add("page-link");
        page_link.innerHTML = "頁首";
        page_item.appendChild(page_link);
        return page_item;
    } else {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");

        let page_link = document.createElement("a");
        page_link.classList.add("page-link");
        page_link.href = "#";
        page_link.addEventListener('click', function (event) {
            cur_page = 1;
            document.getElementById("main_table").classList.remove("table-responsive");
            __init__table();
            bindeditmodalvalue();
            setTimeout(function () {
                console.log("table-responsive");
                document.getElementById("main_table").classList.add("table-responsive");
            }, 100);
            document.getElementById("jump_page").value = cur_page;
            document.getElementById("total_page").innerHTML = `總共 ${total_page} 頁`;
        });
        page_link.innerHTML = "頁首";
        page_item.appendChild(page_link);
        return page_item;
    }
    
}
function __init__nextpagebtn(disabled) {
    if (disabled) {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");
        page_item.classList.add("disabled");

        let page_link = document.createElement("span");
        page_link.classList.add("page-link");
        page_link.innerHTML = "頁尾";
        page_item.appendChild(page_link);
        return page_item;
    } else {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");

        let page_link = document.createElement("a");
        page_link.classList.add("page-link");
        page_link.href = "#";
        page_link.addEventListener('click', function (event) {
            cur_page = total_page;
            document.getElementById("main_table").classList.remove("table-responsive");
            __init__table();
            bindeditmodalvalue();
            setTimeout(function () {
                console.log("table-responsive");
                document.getElementById("main_table").classList.add("table-responsive");
            }, 100);
            document.getElementById("jump_page").value = cur_page;
            document.getElementById("total_page").innerHTML = `總共 ${total_page} 頁`;
        });
        page_link.innerHTML = "頁尾";
        page_item.appendChild(page_link);
        return page_item;
    }
}
function __init__page_item(active, num) {
    if (active) {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");
        page_item.classList.add("active");

        let page_link = document.createElement("span");
        page_link.classList.add("page-link");
        page_link.innerHTML = num;

        let sr_only = document.createElement("span");
        sr_only.classList.add("sr-only");
        sr_only.innerHTML = "(current)";

        page_link.appendChild(sr_only);

        page_item.appendChild(page_link);
        return page_item;
    } else {
        let page_item = document.createElement("li");
        page_item.classList.add("page_item");

        let page_link = document.createElement("a");
        page_link.addEventListener("click", function (event) {
            let ele = event.target;
            cur_page = parseInt(ele.innerHTML);
            document.getElementById("main_table").classList.remove("table-responsive");
            __init__table();
            bindeditmodalvalue();
            setTimeout(function () {
                console.log("table-responsive");
                document.getElementById("main_table").classList.add("table-responsive");
            }, 100);
            document.getElementById("jump_page").value = cur_page;
            document.getElementById("total_page").innerHTML = `總共 ${total_page} 頁`;
        });
        page_link.classList.add("page-link");
        page_link.href = "#";
        page_link.innerHTML = num;

        page_item.appendChild(page_link);
        return page_item;
    }
}
function __init__pagination() {
    let prebtn = __init__prepagebtn(cur_page == 1);
    if (cur_page == 1) 
        prebtn.classList.add("disabled");
    pagination_container.appendChild(prebtn);
    let count = 0;
    if (cur_page == 1) {
        //第1頁 layout
        for (let temp = cur_page; temp <= total_page; temp++) {
            if (count == page_item_show_limit)
                break;
            let page_item = __init__page_item(cur_page == temp, temp);
            pagination_container.appendChild(page_item);
            count += 1;
        }
    } else if (cur_page >= (total_page - (page_item_show_limit - 1))) {
        //最後(n - (limit - 1)) to n
        for (let temp = (total_page - (page_item_show_limit - 1)); temp <= total_page; temp++) {
            if (count == page_item_show_limit)
                break;
            if (temp <= 0)
                continue;
            let page_item = __init__page_item(cur_page == temp, temp);
            pagination_container.appendChild(page_item);
            count += 1;
        }
    } else {
        //其他
        for (let temp = (cur_page - 1); temp <= total_page; temp++) {
            if (count == page_item_show_limit)
                break;
            let page_item = __init__page_item(cur_page == temp, temp);
            pagination_container.appendChild(page_item);
            count += 1;
        }
    }

    let nextbtn = __init__nextpagebtn(cur_page == total_page);
    pagination_container.appendChild(nextbtn);
}
function edit_td_form(allow,index) {
    var edit_td = document.createElement("td");
    let form_name = `form-modal${index}`

    let toggle_form = document.createElement("a");
    toggle_form.classList.add("btn", "btn-block", "btn-alt");
    toggle_form.href = "#";
    toggle_form.style.border = "border:1px solid rgba(127, 255, 127, 0.31) !important";
    toggle_form.onclick = "return false;"
    $(toggle_form).attr("data-toggle", "modal");
    $(toggle_form).attr("data-target", `#${form_name}`);
    if (allow) 
        toggle_form.innerHTML = "編輯";
    else 
        toggle_form.innerHTML = "查看";
    edit_td.appendChild(toggle_form);

    let modal_div = document.createElement('div');
    modal_div.id = form_name;
    modal_div.classList.add("modal", "fade");
    $(modal_div).attr("tabindex", -1);
    $(modal_div).attr("role", "dialog");

    let modal_dialog = document.createElement('div');
    modal_dialog.classList.add("modal-dialog");
    modal_dialog.style.top = "10%";

    let modal_content = document.createElement('div');
    modal_content.classList.add("modal-content");

    let modal_header = document.createElement('div');
    modal_header.classList.add("modal-header");

    let close_btn = document.createElement('button');
    close_btn.classList.add("close");
    close_btn.type = "button";
    $(close_btn).attr("data-dismiss", "modal");
    $(close_btn).attr("aria-hidden", "true");
    $(close_btn).attr("tabindex", -1);
    close_btn.innerHTML = "&times;";
    modal_header.appendChild(close_btn);

    let title_h4 = document.createElement('h4');
    title_h4.classList.add("modal-title");
    title_h4.style.fontSize = "20px";
    if (allow) {
        title_h4.innerHTML = "編輯資料" + index;
        modal_header.appendChild(title_h4);
    } else {
        title_h4.innerHTML = "僅能查看 無法編輯";
        modal_header.appendChild(title_h4);

        let required_allow = document.createElement("form");
        $(required_allow).attr("asp-controller","Engineerunit");
        $(required_allow).attr("asp-action", "");

        let required_btn = document.createElement("button");
        required_btn.type = "submit";
        required_btn.innerHTML = "要求編輯權限";
        required_btn.classList.add("btn", "btn-sm","btn-alt");
        $(required_btn).attr("tabindex", -1);
        required_allow.appendChild(required_btn);
        modal_header.appendChild(required_allow);
    }
    let mes = document.createElement("div");
    mes.style.display = "flex";
    mes.style.flexDirection = "column";
    mes.appendChild(required_star("必填欄位"));
    if (allow)
        mes.appendChild(required_star("編輯完成時請按下方儲存按鈕"));
    modal_header.appendChild(mes);

    let modal_body = document.createElement("div");
    modal_body.classList.add("modal-body");
    if (allow) {
        let edit_form = document.createElement("form");
        edit_form.classList.add("form-horizontal", "form-validation-2");
        $(edit_form).attr("role", "form");
        $(edit_form).attr("id", `edit_form${index}`);
        $(edit_form).attr("method", `post`);
        $(edit_form).attr("action", `${geturl()}Engineerunit/editdata`);

        //group for check tax no tax block area
        let tax_notax_div = document.createElement("div");
        tax_notax_div.style.display = "flex";
        tax_notax_div.style.justifyContent = "space-evenly";

        let group1 = document.createElement("group");
        let taxinput = document.createElement("input");
        taxinput.type = "radio";
        taxinput.id = `choices_tax${index}`;
        taxinput.name = `choices${index}`;
        taxinput.value = "tax";
        if (store_data[index - 1]['unittype'] == "tax")
            taxinput.checked = true;
        let label1 = document.createElement("label");
        label1.innerHTML = "統編";
        $(label1).attr("for", `choices_tax${index}`);
        group1.appendChild(taxinput);
        group1.appendChild(label1);

        let group2 = document.createElement("group");
        let notaxinput = document.createElement("input");
        notaxinput.type = "radio";
        notaxinput.id = `choices_notax${index}`;
        notaxinput.name = `choices${index}`;
        notaxinput.value = "notax";
        if (store_data[index - 1]['unittype'] == "notax")
            notaxinput.checked = true;
        let label2 = document.createElement("label");
        label2.innerHTML = "無統編";
        $(label2).attr("for", `choices_notax${index}`);
        group2.appendChild(notaxinput);
        group2.appendChild(label2);

        tax_notax_div.appendChild(group1);
        tax_notax_div.appendChild(group2);

        edit_form.appendChild(tax_notax_div);
        //group for check tax no tax block area

        edit_form.appendChild(create_row_id(index));
        edit_form.appendChild(createhidden_folderId(index));
        edit_form.appendChild(create_name_group(index, allow));
        if (store_data[index - 1]['unittype'] == "tax") {
            let tax_area = create_tax_group(index, allow);
            tax_copy_div_list.push(tax_area.cloneNode(true));
            $(tax_copy_div_list[tax_copy_div_list.length - 1]).attr("id", index);
            edit_form.appendChild(tax_area);
            console.log(tax_copy_div_list);
        }
            
        edit_form.appendChild(create_cel_group(index, allow));
        edit_form.appendChild(create_tel_group(index, allow));
        edit_form.appendChild(create_fax_group(index, allow));
        edit_form.appendChild(create_country_group(index, allow));
        edit_form.appendChild(create_city_group(index, allow));
        edit_form.appendChild(create_address_group(index, allow));
        edit_form.appendChild(create_edittime_group(index));

        edit_form.appendChild(create_submit(index));

        modal_body.appendChild(edit_form);

        $(edit_form).validationEngine();
    } else {
        let edit_form = document.createElement("div");
        edit_form.classList.add("form-horizontal", "form-validation-2");

        let tax_notax_div = document.createElement("div");
        tax_notax_div.style.display = "flex";
        tax_notax_div.style.justifyContent = "center";

        let label1 = document.createElement("label");
        label1.style.color = "darkorange";
        if (store_data[index - 1]['unittype'] == "tax") 
            label1.innerHTML = "統編";
        else
            label1.innerHTML = "無統編";
        
        tax_notax_div.appendChild(label1);

        edit_form.appendChild(tax_notax_div);
        edit_form.appendChild(create_name_group(index, allow));
        if (store_data[index - 1]['unittype'] == "tax") 
            edit_form.appendChild(create_tax_group(index, allow));
        edit_form.appendChild(create_cel_group(index, allow));
        edit_form.appendChild(create_tel_group(index, allow));
        edit_form.appendChild(create_fax_group(index, allow));
        edit_form.appendChild(create_country_group(index, allow));
        edit_form.appendChild(create_city_group(index, allow));
        edit_form.appendChild(create_address_group(index, allow));
        edit_form.appendChild(create_edittime_group(index));

        edit_form.appendChild(create_close_modal());
        
        modal_body.appendChild(edit_form);
    }
    modal_body.appendChild(create_google_mapembed_toggle_btn(index));
    modal_body.appendChild(create_google_mapembed(index));
    
    modal_content.appendChild(modal_header);
    modal_content.appendChild(modal_body);
    
    modal_dialog.appendChild(modal_content);
    modal_div.appendChild(modal_dialog);
    edit_td.appendChild(modal_div);
    return edit_td;
}
function toggle_map(event) {
    toggledmap(event.target);
}
function __init__src(index) {
    let country = store_data[index - 1]["country"];
    let city = store_data[index - 1]["city"];
    let address = store_data[index - 1]["address"];
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${country+city+address}`;
}
function create_google_mapembed(index) {
    let iframe_div = document.createElement("div");
    iframe_div.classList.add("iframe-rwd");
    iframe_div.style.marginTop = "10px";

    let iframe = document.createElement("iframe");
    iframe.style.color = "#0000FF";
    iframe.style.textAlign = "left";
    $(iframe).attr("width", "fit-content");
    $(iframe).attr("id",`mapembed${index}`);
    $(iframe).attr("name",`mapembed${index}`);
    $(iframe).attr("height",`350`);
    $(iframe).attr("frameborder",`0`);
    $(iframe).attr("scrolling",`no`);
    $(iframe).attr("marginheight",`0`);
    $(iframe).attr("marginwidth",`0`);
    $(iframe).attr("src", `${__init__src(index)}`);
    iframe_div.appendChild(iframe);
    return iframe_div;
}
function create_google_mapembed_toggle_btn(index) {
    let map_text = document.createElement("p");
    map_text.style.display = "flex";
    map_text.style.justifyContent = "center";

    let map_toggle_btn = document.createElement("button");
    map_toggle_btn.classList.add("btn", "btn-sm", "btn-alt");
    map_toggle_btn.id = `togglemap${index}`;
    map_toggle_btn.type = "button";
    map_toggle_btn.name = `togglemap${index}`;
    map_toggle_btn.onclick = toggle_map;
    map_toggle_btn.innerHTML = "顯示 google map 地圖";
    map_text.appendChild(map_toggle_btn);
    return map_text;
}
function bind_country_pick(event) {
    var toucher = event.target.id;
    var num = toucher.match(/\d+/g).join();

    refresh_city(`city${num}`, event.target.value);
    refresh_road(`address${num}`);
    let address = document.getElementById(`address${num}`);
    address.disabled = true;
    if (event.target.value === "") {
        let city = document.getElementById(`city${num}`);
        city.disabled = true;
    } else {
        let city = document.getElementById(`city${num}`);
        city.disabled = false;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${event.target.value}`;
        document.getElementById(`mapembed${num}`).src = srcstring;
    }
}
function bind_city_pick(event) {
    var toucher = event.target.id;
    var num = toucher.match(/\d+/g).join();
    var letr = toucher.match(/[a-zA-Z]+/g).join();
    refresh_road(`address${num}`);
    if (event.target.value === "") {
        let address = document.getElementById(`address${num}`);
        address.disabled = true;
    } else {
        let address = document.getElementById(`address${num}`);
        address.disabled = false;
        var ct = document.getElementById(`country${num}`).value + event.target.value;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
        document.getElementById(`mapembed${num}`).src = srcstring;
    }
}
function bind_address_input(event) {
    editgooglemapembed(event.target);
}
function valid_tax(element) {
    let inputtax = element.value;
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
        element.style.color = "#f00";
        var attributes_bar = document.getElementById(element.id);
        if (attributes_bar) {
            attributes_bar.classList.add("animate-bounce-up");
            setTimeout(function () {
                console.log("delete animate-bounce-up");
                attributes_bar.classList.remove("animate-bounce-up");
            }, 300);
        }
        $(element).focus();
        $(element).select();
        return false;
    }
    cnum.forEach((item, index) => {
        if (inputtax.charCodeAt() < 48 || inputtax.charCodeAt() > 57) {
            console.log('統編錯誤，要有 8 個 0-9 數字組合');
            pop_news('統編錯誤，要有 8 個 0-9 數字組合');
            element.style.color = "#f00";
            var attributes_bar = document.getElementById(element.id);
            if (attributes_bar) {
                attributes_bar.classList.add("animate-bounce-up");
                setTimeout(function () {
                    console.log("delete animate-bounce-up");
                    attributes_bar.classList.remove("animate-bounce-up");
                }, 300);
            }
            $(element).focus();
            $(element).select();
            return false;
        }
        sum += cc(item * cx[index]);
    });
    console.log(sum);
    if (sum % 10 === 0) {
        console.log('統編正確');
        element.style.color = "#0f0";
    } else if (cnum[6] === '7' && (sum + 1) % 10 === 0) {
        console.log('統編正確2');
        element.style.color = "#0f0";
    } else {
        console.log('統編錯誤');
        pop_news('統編錯誤');
        element.style.color = "#f00";
        var attributes_bar = document.getElementById(element.id);
        if (attributes_bar) {
            attributes_bar.classList.add("animate-bounce-up");
            setTimeout(function () {
                console.log("delete animate-bounce-up");
                attributes_bar.classList.remove("animate-bounce-up");
            }, 300);
        }
        $(element).focus();
        $(element).select();
        return false;
    }
    return true;
}
function confirmsubmit(event) {
    //event.preventdefault();
    let ele = event.target;
    let toucher = ele.id;
    var num = toucher.match(/\d+/g).join();
    console.log(); // returns true|false
    let taxele = document.getElementById(`tax${num}`);
    if (taxele) {
        if (valid_tax(taxele) == false) {
            return;
        }
    }
    if ($(`#edit_form${num}`).validationEngine('validate')) {
        var $boxes = $(`input[name=choices${num}]:checked`);
        let cur_unittype = $boxes[0].value;
        let cur_name = document.getElementById(`name${num}`).value;
        let cur_tax = null;
        if ($boxes[0].value == "tax")
            cur_tax = document.getElementById(`tax${num}`).value;
        let cur_cel = document.getElementById(`cel${num}`).value;
        let cur_telareacode = document.getElementById(`telareacode${num}`).value;
        let cur_telcode = document.getElementById(`telcode${num}`).value;
        let cur_faxareacode = document.getElementById(`faxareacode${num}`).value;
        let cur_faxcode = document.getElementById(`faxcode${num}`).value;
        let cur_country = document.getElementById(`country${num}`).value;
        let cur_city = document.getElementById(`city${num}`).value;
        let cur_address = document.getElementById(`address${num}`).value;
        if (temp_editlocalunit.compare_value(cur_unittype, cur_name, cur_tax, cur_cel, cur_telareacode, cur_telcode, cur_faxareacode, cur_faxcode, cur_country, cur_city, cur_address)) {
            Swal.fire({
                title: "訊息",
                text: "無異動資料 :)",
                icon: 'success',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Ok',
            });
            return;
        }
        Swal.fire({
            title: '更改資料',
            text: "確定要更改資料嗎?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: '是',
            cancelButtonText: "否",
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(`folder${num}`).disabled = false;
                document.getElementById(`rowid${num}`).disabled = false;
                document.getElementById(`editsubmit${num}`).click();
            } else {
                Swal.fire({
                    title: "訊息",
                    text: "已取消更改 :)",
                    icon: 'success',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Ok',
                });
                return;
            }
        })
    } else {
        //do nothing
    }
}
function create_close_modal(index) {
    let modal_footer = document.createElement("div");
    modal_footer.classList.add("modal-footer");
    modal_footer.style.textAlign = "right";


    let cancel_btn = document.createElement("button");
    cancel_btn.type = "button";
    cancel_btn.classList.add("btn", "btn-sm", "btn-alt");
    $(cancel_btn).attr("data-dismiss", "modal");
    $(cancel_btn).attr("tabindex", -1);
    cancel_btn.innerHTML = "關閉";
    modal_footer.appendChild(cancel_btn);
    return modal_footer;
}
function create_submit(index) {
    let modal_footer = document.createElement("div");
    modal_footer.classList.add("modal-footer");
    modal_footer.style.textAlign = "right";

    let smt = document.createElement("button");
    smt.id = `editcheck${index}`;
    smt.type = "button";
    smt.onclick = confirmsubmit;
    smt.classList.add("btn", "btn-sm","btn-alt");
    $(smt).attr("tabindex", -1);
    smt.innerHTML = "儲存";

    let success = document.createElement("button");
    success.id = `editsubmit${index}`;
    success.type = "submit";
    success.classList.add("btn", "btn-sm", "btn-alt","display_none");
    $(success).attr("tabindex", -1);
    success.innerHTML = "送出";


    let cancel_btn = document.createElement("button");
    cancel_btn.type = "button";
    cancel_btn.classList.add("btn", "btn-sm", "btn-alt");
    $(cancel_btn).attr("data-dismiss", "modal");
    $(cancel_btn).attr("tabindex", -1);
    cancel_btn.innerHTML = "關閉";
    modal_footer.appendChild(smt);
    modal_footer.appendChild(success);
    modal_footer.appendChild(cancel_btn);
    return modal_footer;
}

function create_edittime_group(index) {
    let edit_time_div = document.createElement("div");
    edit_time_div.classList.add("form-group");

    let edit_time_label = document.createElement("label");
    edit_time_label.classList.add("col-md-3", "control-label");
    $(edit_time_label).attr("for", `lastedittime${index}`);
    edit_time_label.innerHTML = "最後編輯時間";

    let edit_time_text_div = document.createElement("div");
    edit_time_text_div.classList.add("col-md-8");

    let edit_time_text = document.createElement("label");
    edit_time_text.classList.add("form-control", "input-sm");
    edit_time_text.id = `lastedittime${index}`;
    edit_time_text.name = `lastedittime${index}`;
    edit_time_text.innerHTML = `${store_data[index - 1]['lastedittime']}`;
    edit_time_text_div.appendChild(edit_time_text);

    edit_time_div.appendChild(edit_time_label);
    edit_time_div.appendChild(edit_time_text_div);
    return edit_time_div;
}
function create_address_group(index, allow) {
    let address_div = document.createElement("div");
    address_div.classList.add("form-group");

    let address_label = document.createElement("label");
    address_label.classList.add("col-md-3", "control-label");
    $(address_label).attr("for", `address${index}`);
    address_label.innerHTML = "address";

    let address_label_span = document.createElement("span");
    address_label_span.style.color = "red";
    address_label_span.style.fontWeight = "bold";
    address_label_span.innerHTML = " *";
    address_label.appendChild(address_label_span);

    let address_input_div = document.createElement("div");
    address_input_div.classList.add("col-md-8");

    if (allow) {
        let address_input = document.createElement("input");
        address_input.classList.add("form-control", "input-sm","validate[required]");
        address_input.type = "text";
        address_input.id = `address${index}`;
        address_input.name = `address${index}`;
        address_input.placeholder = "詳細地址";
        address_input.autocomplete = "off";
        address_input.value = `${store_data[index - 1]['address']}`;
        address_input.onchange = bind_address_input;
        address_input_div.appendChild(address_input);
    } else {
        let address_text = document.createElement("label");
        address_text.classList.add("form-control", "input-sm");
        address_text.id = `address${index}`;
        address_text.name = `address${index}`;
        address_text.innerHTML = `${store_data[index - 1]['address']}`;
        address_input_div.appendChild(address_text);
    }

    address_div.appendChild(address_label);
    address_div.appendChild(address_input_div);
    return address_div;
}
function create_city_group(index, allow) {
    let city_div = document.createElement("div");
    city_div.classList.add("form-group");

    let city_label = document.createElement("label");
    city_label.classList.add("col-md-3", "control-label");
    $(city_label).attr("for", `city${index}`);
    city_label.innerHTML = "地區";

    let city_label_span = document.createElement("span");
    city_label_span.style.color = "red";
    city_label_span.style.fontWeight = "bold";
    city_label_span.innerHTML = " *";
    city_label.appendChild(city_label_span);


    let city_input_div = document.createElement("div");
    city_input_div.classList.add("col-md-8");

    if (allow) {
        let city_select = document.createElement("select");
        city_select.classList.add("form-control", "input-sm", "validate[required]");
        city_select.id = `city${index}`;
        city_select.name = `city${index}`;
        
        __init__city(city_select, `${store_data[index - 1]["country"]}`);

        city_select.value = `${store_data[index - 1]["city"]}`;
        city_select.onchange = bind_city_pick;
        city_input_div.appendChild(city_select);
    } else {
        let city_text = document.createElement("label");
        city_text.classList.add("form-control", "input-sm");
        city_text.id = `city${index}`;
        city_text.name = `city${index}`;
        city_text.innerHTML = `${store_data[index - 1]['city']}`;
        city_input_div.appendChild(city_text);
    }

    city_div.appendChild(city_label);
    city_div.appendChild(city_input_div);
    return city_div;
}
function create_country_group(index, allow) {
    let country_div = document.createElement("div");
    country_div.classList.add("form-group");

    let country_label = document.createElement("label");
    country_label.classList.add("col-md-3", "control-label");
    $(country_label).attr("for", `country${index}`);
    country_label.innerHTML = "縣市";

    let country_label_span = document.createElement("span");
    country_label_span.style.color = "red";
    country_label_span.style.fontWeight = "bold";
    country_label_span.innerHTML = " *";
    country_label.appendChild(country_label_span);


    let country_input_div = document.createElement("div");
    country_input_div.classList.add("col-md-8");

    if (allow) {
        let country_select = document.createElement("select");
        country_select.classList.add("form-control", "input-sm", "validate[required]");
        country_select.id = `country${index}`;
        country_select.name = `country${index}`;
        var option = document.createElement("option");
        option.value = "";
        option.text = "選擇縣市";
        country_select.value = "";
        
        country_select.appendChild(option);
        console.log(country_list);
        for (let c_index = 0; c_index < country_list.length; c_index++) {
            option = document.createElement("option");
            option.value = `${country_list[c_index]}`;
            option.text = `${country_list[c_index]}`;
            country_select.appendChild(option);
        }
        country_select.value = `${store_data[index - 1]["country"]}`;

        country_select.onchange = bind_country_pick;

        country_input_div.appendChild(country_select);
    } else {
        let country_text = document.createElement("label");
        country_text.classList.add("form-control", "input-sm");
        country_text.id = `country${index}`;
        country_text.name = `country${index}`;
        country_text.innerHTML = `${store_data[index - 1]['country']}`;
        country_input_div.appendChild(country_text);
    }

    country_div.appendChild(country_label);
    country_div.appendChild(country_input_div);
    return country_div;
}
function create_fax_group(index, allow) {
    let fax_div = document.createElement("div");
    fax_div.classList.add("form-group");

    let fax_label = document.createElement("label");
    fax_label.classList.add("col-md-3", "control-label");
    $(fax_label).attr("for", `faxareacode${index}`);
    fax_label.innerHTML = "FAX";
    fax_div.appendChild(fax_label);

    let fax_areacode_div = document.createElement("div");
    fax_areacode_div.classList.add("col-md-2");

    let dash_div = document.createElement("div");
    dash_div.classList.add("col-md-1");
    dash_div.innerHTML = "-";

    let faxcode_div = document.createElement("div");
    faxcode_div.classList.add("col-md-5");
    if (allow) {
        let faxareacode_input = document.createElement("input");
        faxareacode_input.id = `faxareacode${index}`;
        faxareacode_input.name = `faxareacode${index}`;
        faxareacode_input.type = "number";
        faxareacode_input.classList.add("form-control", "input-sm");
        faxareacode_input.placeholder = "FAX - 區碼";
        faxareacode_input.autocomplete = "off";
        faxareacode_input.value = `${store_data[index - 1]["fax"]["areacode"]}`;
        fax_areacode_div.appendChild(faxareacode_input);

        let faxcode_input = document.createElement("input");
        faxcode_input.id = `faxcode${index}`;
        faxcode_input.name = `faxcode${index}`;
        faxcode_input.type = "number";
        faxcode_input.classList.add("form-control", "input-sm");
        faxcode_input.placeholder = "FAX - 號碼";
        faxcode_input.autocomplete = "off";
        faxcode_input.value = `${store_data[index - 1]["fax"]["code"]}`;
        faxcode_div.appendChild(faxcode_input);
    } else {
        let faxareacode_input = document.createElement("label");
        faxareacode_input.id = `faxareacode${index}`;
        faxareacode_input.name = `faxareacode${index}`;
        faxareacode_input.classList.add("form-control", "input-sm");
        faxareacode_input.innerHTML = `${store_data[index - 1]["fax"]["areacode"]}`;
        fax_areacode_div.appendChild(faxareacode_input);

        let faxcode_input = document.createElement("label");
        faxcode_input.id = `faxcode${index}`;
        faxcode_input.name = `faxcode${index}`;
        faxcode_input.classList.add("form-control", "input-sm");
        faxcode_input.innerHTML = `${store_data[index - 1]["fax"]["code"]}`;
        faxcode_div.appendChild(faxcode_input);
    }
    fax_div.appendChild(fax_areacode_div);
    fax_div.appendChild(dash_div);
    fax_div.appendChild(faxcode_div);
    return fax_div;
}
function create_tel_group(index, allow) {
    let tel_div = document.createElement("div");
    tel_div.classList.add("form-group");

    let tel_label = document.createElement("label");
    tel_label.classList.add("col-md-3", "control-label");
    $(tel_label).attr("for", `telareacode${index}`);
    tel_label.innerHTML = "TEL";
    tel_div.appendChild(tel_label);

    let tel_areacode_div = document.createElement("div");
    tel_areacode_div.classList.add("col-md-2");

    let dash_div = document.createElement("div");
    dash_div.classList.add("col-md-1");
    dash_div.innerHTML = "-";

    let telcode_div = document.createElement("div");
    telcode_div.classList.add("col-md-5");
    if (allow) {
        let telareacode_input = document.createElement("input");
        telareacode_input.id = `telareacode${index}`;
        telareacode_input.name = `telareacode${index}`;
        telareacode_input.type = "number";
        telareacode_input.classList.add("form-control", "input-sm");
        telareacode_input.placeholder = "TEL - 區碼";
        telareacode_input.autocomplete = "off";
        telareacode_input.value = `${store_data[index - 1]["tel"]["areacode"]}`;
        tel_areacode_div.appendChild(telareacode_input);

        let telcode_input = document.createElement("input");
        telcode_input.id = `telcode${index}`;
        telcode_input.name = `telcode${index}`;
        telcode_input.type = "number";
        telcode_input.classList.add("form-control", "input-sm");
        telcode_input.placeholder = "TEL - 號碼";
        telcode_input.autocomplete = "off";
        telcode_input.value = `${store_data[index - 1]["tel"]["code"]}`;
        telcode_div.appendChild(telcode_input);
    } else {
        let telareacode_input = document.createElement("label");
        telareacode_input.id = `telareacode${index}`;
        telareacode_input.name = `telareacode${index}`;
        telareacode_input.classList.add("form-control", "input-sm");
        telareacode_input.innerHTML = `${store_data[index - 1]["tel"]["areacode"]}`;
        tel_areacode_div.appendChild(telareacode_input);

        let telcode_input = document.createElement("label");
        telcode_input.id = `telcode${index}`;
        telcode_input.name = `telcode${index}`;
        telcode_input.classList.add("form-control", "input-sm");
        telcode_input.innerHTML = `${store_data[index - 1]["tel"]["code"]}`;
        telcode_div.appendChild(telcode_input);
    }
    tel_div.appendChild(tel_areacode_div);
    tel_div.appendChild(dash_div);
    tel_div.appendChild(telcode_div);
    return tel_div;
}
function create_cel_group(index,allow) {
    let cel_div = document.createElement("div");
    cel_div.classList.add("form-group");

    let cel_label = document.createElement("label");
    cel_label.classList.add("col-md-3", "control-label");
    $(cel_label).attr("for", `cel${index}`);
    cel_label.innerHTML = "CEL";

    /*let cel_label_span = document.createElement("span");
    cel_label_span.style.color = "red";
    cel_label_span.style.fontWeight = "bold";
    cel_label_span.innerHTML = "* ";
    cel_label.appendChild(cel_label_span);*/

    let cel_input_div = document.createElement("div");
    cel_input_div.classList.add("col-md-8");

    if (allow) {
        let cel_input = document.createElement("input");
        cel_input.classList.add("form-control", "input-sm", "mask-phone_with_ddd");
        $(cel_input).mask('(00) 0000-0000');
        cel_input.type = "text";
        cel_input.id = `cel${index}`;
        cel_input.name = `cel${index}`;
        cel_input.placeholder = "CEL";
        cel_input.autocomplete = "off";
        cel_input.value = `${store_data[index - 1]['cel']}`;
        cel_input_div.appendChild(cel_input);
    } else {
        let cel_text = document.createElement("label");
        cel_text.classList.add("form-control", "input-sm");
        cel_text.id = `cel${index}`;
        cel_text.name = `cel${index}`;
        cel_text.innerHTML = `${store_data[index - 1]['cel']}`;
        cel_input_div.appendChild(cel_text);
    }

    cel_div.appendChild(cel_label);
    cel_div.appendChild(cel_input_div);
    return cel_div;
}
function create_tax_group(index,allow) {
    let tax_div = document.createElement("div");
    tax_div.classList.add("form-group");

    let tax_label = document.createElement("label");
    tax_label.classList.add("col-md-3", "control-label");
    $(tax_label).attr("for", `tax${index}`);
    tax_label.innerHTML = "統編";

    let tax_label_span = document.createElement("span");
    tax_label_span.style.color = "red";
    tax_label_span.style.fontWeight = "bold";
    tax_label_span.innerHTML = " *";
    tax_label.appendChild(tax_label_span);
    
    let tax_input_div = document.createElement("div");
    tax_input_div.classList.add("col-md-8");

    if (allow) {
        let tax_input = document.createElement("input");
        tax_input.classList.add("form-control", "input-sm", "validate[required,custom[number]]");
        tax_input.type = "text";
        $(tax_input).attr("maxlength", 8);
        tax_input.id = `tax${index}`;
        tax_input.name = `tax${index}`;
        tax_input.placeholder = "統編";
        //$(tax_input).attr("data-validatetax", "");
        taxvaild(tax_input);
        tax_input.autocomplete = "off";
        tax_input.value = `${store_data[index - 1]['tax']}`;
        tax_input_div.appendChild(tax_input);
    } else {
        let tax_text = document.createElement("label");
        tax_text.classList.add("form-control", "input-sm");
        tax_text.id = `tax${index}`;
        tax_text.name = `tax${index}`;
        tax_text.innerHTML = `${store_data[index - 1]['tax']}`;
        tax_input_div.appendChild(tax_text);
    }
    tax_div.appendChild(tax_label);
    tax_div.appendChild(tax_input_div);
    return tax_div;
}
function taxvaild(element) {
    $(element).on('focusout', function () {
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
}
function create_row_id(index) {
    let rowid_div = document.createElement("div");
    rowid_div.classList.add("form-group");

    let rowid_label = document.createElement("label");
    rowid_label.classList.add("col-md-3", "control-label");
    $(rowid_label).attr("for", `rowid${index}`);
    rowid_label.innerHTML = "編號";

    let rowid_input_div = document.createElement("div");
    rowid_input_div.classList.add("col-md-8");

    let rowid_input = document.createElement("input");
    rowid_input.classList.add("form-control", "input-sm");
    rowid_input.type = "text";

    rowid_input.id = `rowid${index}`;
    rowid_input.name = `rowid${index}`;
    rowid_input.placeholder = "編號";
    rowid_input.autocomplete = "off";
    rowid_input.value = `${store_data[index - 1]['id']}`;
    rowid_input_div.appendChild(rowid_input);

    rowid_div.appendChild(rowid_label);
    rowid_div.appendChild(rowid_input_div);

    rowid_div.classList.add("display_none");
    return rowid_div;
}
function createhidden_folderId(index) {
    let folder_div = document.createElement("div");
    folder_div.classList.add("form-group");

    let folder_label = document.createElement("label");
    folder_label.classList.add("col-md-3", "control-label");
    $(folder_label).attr("for", `folder${index}`);
    folder_label.innerHTML = "資料夾位置";

    let folder_input_div = document.createElement("div");
    folder_input_div.classList.add("col-md-8");

    let folder_input = document.createElement("input");
    folder_input.classList.add("form-control", "input-sm");
    folder_input.type = "text";
    
    folder_input.id = `folder${index}`;
    folder_input.name = `folder${index}`;
    folder_input.placeholder = "資料夾位址";
    folder_input.autocomplete = "off";
    folder_input.value = `${store_data[index - 1]['folderID']}`;
    folder_input_div.appendChild(folder_input);

    folder_div.appendChild(folder_label);
    folder_div.appendChild(folder_input_div);

    folder_div.classList.add("display_none");
    return folder_div;
}
function create_name_group(index,allow) {
    let name_div = document.createElement("div");
    name_div.classList.add("form-group");

    let name_label = document.createElement("label");
    name_label.classList.add("col-md-3", "control-label");
    $(name_label).attr("for", `name${index}`);
    name_label.innerHTML = "名稱";

    let name_label_span = document.createElement("span");
    name_label_span.style.color = "red";
    name_label_span.style.fontWeight = "bold";
    name_label_span.innerHTML = " *";
    name_label.append(name_label_span);
    
    let name_input_div = document.createElement("div");
    name_input_div.classList.add("col-md-8");

    if (allow) {
        let name_input = document.createElement("input");
        name_input.classList.add("form-control", "input-sm", 'validate[required]');
        name_input.type = "text";
        name_input.id = `name${index}`;
        name_input.name = `name${index}`;
        name_input.placeholder = "名稱";
        name_input.autocomplete = "off";
        name_input.value = `${store_data[index - 1]['name']}`;
        name_input_div.appendChild(name_input);
    } else {
        let name_text = document.createElement("label");
        name_text.classList.add("form-control", "input-sm");
        name_text.id = `name${index}`;
        name_text.name = `name${index}`;
        name_text.innerHTML = `${store_data[index - 1]['name']}`;
        name_input_div.appendChild(name_text);
    }
    name_div.appendChild(name_label);
    name_div.appendChild(name_input_div);
    return name_div;
}
function required_star(text) {
    let txt = document.createElement("h6");
    let spn = document.createElement("span");
    spn.style.color = "red";
    spn.style.fontWeight = "bold";
    spn.innerHTML = "* ";
    txt.appendChild(spn);
    txt.append(text);
    return txt;
}
function user_is_not_allow(data) {
    let cur_user = getCookie("email");
    //console.log("identity 長度 : " + data["identity"].length);
    for (let e_for_loop = 0; e_for_loop < data["identity"].length; e_for_loop++) {
        //console.log(index, cur_user, data["identity"][e_for_loop]["email"]);
        if (cur_user == data["identity"][e_for_loop]["email"])
            return true;
    }
    return false;
}
function create_row(data,index) {
    let new_row = document.createElement("tr");
  
    let allow = user_is_not_allow(data);

    new_row.appendChild(edit_td_form(allow, index));
    
    new_row.appendChild(document.createElement("td"));
    if (store_data[index - 1]['unittype'] == "notax") {
        new_row.appendChild(append_td_text("無", "red"));
    } else {
        new_row.appendChild(append_td_text("有","green"));
    }
    
    new_row.appendChild(append_td_text(store_data[index-1]['name']));
    new_row.appendChild(append_td_text(store_data[index - 1]['tax']));
    new_row.appendChild(append_td_text(store_data[index - 1]['country']));
    new_row.appendChild(append_td_text(store_data[index - 1]['city']));
    new_row.appendChild(append_td_text(store_data[index - 1]['address']));
    new_row.appendChild(append_td_text(store_data[index - 1]['cel']));
    new_row.appendChild(append_td_text(store_data[index - 1]['tel']['areacode'] + " " + store_data[index - 1]['tel']['code']));
    new_row.appendChild(append_td_text(store_data[index - 1]['fax']['areacode'] + " " + store_data[index - 1]['fax']['code']));
    new_row.appendChild(append_td_text(store_data[index - 1]['lastedittime']));
    new_row.appendChild(append_td_text(store_data[index - 1]['lastedituser']['name']));
    return new_row;
}
function append_td_text(text,color) {
    var parent_td = document.createElement("td");
    var text_span = document.createElement("span");
    if (color) {
        text_span.style.color = color;
        text_span.style.fontSize = "20px";
    }
        
    text_span.innerHTML = text;
    parent_td.appendChild(text_span);
    return parent_td;
}
function __init__table() {
    //0~19 20~39 40~59
    pagination_container.innerHTML = '';        //clear
    console.log(cur_page);
    $(table).empty();
    console.log("clear");
    //console.log(table.length);
    __init__pagination();
    //console.log(total_page);
    for (let i = ((cur_page - 1) * max_row_count); i < (max_row_count) * cur_page; i++) {
        if (i >= store_data.length)
            break;
        let values = store_data[i];
        console.log(values);
        //console.log(values);
        table.appendChild(create_row(store_data[i], i + 1));
    }
    $(`input:radio`).on("change", function (event) {
        console.log(event.target);
        let toucher = event.target.id;
        var num = toucher.match(/\d+/g).join();
        if ($(this).val() == 'tax') {
            console.log("You selected the tax");
            let insert_empty = false;
            for (let je = 0; je < tax_copy_div_list.length; je++) {
                if (tax_copy_div_list[je].id == num) {
                    console.log(tax_copy_div_list);
                    let copy_insert = tax_copy_div_list[je].cloneNode(true);
                    $(copy_insert).removeAttr("id");
                    document.getElementById(`edit_form${num}`).insertBefore(copy_insert, document.getElementById(`edit_form${num}`).children[4]);
                    insert_empty = true;
                    break;
                }
            }
            if (!insert_empty) {
                document.getElementById(`edit_form${num}`).insertBefore(create_tax_group(num, user_is_not_allow(store_data[num-1])), document.getElementById(`edit_form${num}`).children[4]);
                document.getElementById(`tax${num}`).value = "";
            }


        } else {
            console.log("You selected  no tax");
            let ele = document.getElementById(`tax${num}`);
            $(ele).parent().parent().remove();
        }
        console.log("OK");
    });
}
function jump_page_event(event) {
    if (event.value > total_page || event.value <= 0) {
        pop_news("頁碼錯誤");
        event.value = cur_page;
        return;
    }
        
    cur_page = event.value;

    document.getElementById("main_table").classList.remove("table-responsive");
    __init__table();
    bindeditmodalvalue();
    setTimeout(function () {
        console.log("table-responsive");
        document.getElementById("main_table").classList.add("table-responsive");
    }, 100);
    document.getElementById("total_page").innerHTML = `總共 ${total_page} 頁`;
}
function engineeraddform__init__() {
    $('#newChoices_tax').on('ifChanged', function (event) {
        console.log(event.type + ' callback');
        //console.log('checked = ' + event.target.checked, 'value = ' + event.target.value);
        if (event.target.checked == false) {
            taxmode = "notax";
            var ele = document.getElementById("newtax");
            //$(ele).toggleClass("validate[required,custom[number]]");
            $(ele).closest("div").parent().remove();
        } else {
            taxmode = "tax";
            //var ele = document.getElementById("newtax");
            document.getElementById("newform").insertBefore(taxelement, document.getElementById("newform").children[2]);
            //$(ele).closest("div").parent().show();
        }
    });
}
function addengineerform_tax__copy__() {
    var ele = document.getElementById("newtax");
    //$(ele).toggleClass("validate[required,custom[number]]");
    taxelement = $(ele).closest("div").parent().clone()[0];
}

$(document).ready(function () {
    __refresh__sidebar_active("engineerunitbtn");
    __refresh__tour_text("工程單位列表");
    function opendata110road_normal__init__() {
        var path = `${geturl()}opendata110road_normal.json`;
        $.getJSON(path, function (json) {
            //console.log(json); // this will show the info it in firebug console
            for (var i = 0; i < json.length; i++) {
                // console.log(i, json[i]["country"], json[i]["city"]);
                let _new = new Road(json[i]["country"], json[i]["city"], json[i]["areas"]);
                roadarray.push(_new);
            }

            table = document.getElementById('edit_table').getElementsByTagName('tbody')[0];
            pagination_container = document.getElementsByClassName('pagination')[0];

            if (store_data == null || store_data.length == 0) {
                table.appendChild(create_empty_row());
            } else {
                document.getElementById("jump_page").disabled = false;
                total_page = Math.floor(store_data.length / (max_row_count));
                if (store_data.length % max_row_count > 0)
                    total_page = total_page + 1;
                document.getElementById("main_table").classList.remove("table-responsive");
                __init__table();
                bindeditmodalvalue();
                setTimeout(function () {
                    console.log("table-responsive");
                    document.getElementById("main_table").classList.add("table-responsive");
                }, 100);
                document.getElementById("jump_page").value = cur_page;
                document.getElementById("total_page").innerHTML = `總共 ${total_page} 頁`;
                console.log(store_data);
            }
        });
    }
    opendata110road_normal__init__();
    //新增表單
    addengineerform_tax__copy__();
    engineeraddform__init__();
    //新增表單
    /* Input Masking - you can include your own way */
    (function () {
        $('.mask-date').mask('00/00/0000');
        $('.mask-page').mask('000');
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
        console.log(this);
        taxvaild(this);
    });
    
});

function __init__city(ele, countryName) {
    if (ele) {
        var opt = document.createElement('option');
        opt.value = "";
        opt.innerHTML = "選擇地區";
        ele.value = "";
        ele.appendChild(opt);
        for (var j = 0; j < roadarray.length; j++) {
            if (roadarray[j]["country"] === countryName) {
                var opt = document.createElement('option');
                opt.value = roadarray[j]["city"];
                opt.innerHTML = roadarray[j]["city"];
                ele.appendChild(opt);
            }
        }
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
        city.value ="";
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
    if (toucher == "togglemap") {togglemap
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
    if (event!= null) {
        var ct = document.getElementById("newcountry").value + document.getElementById("newcity").value + event.value;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
        document.getElementById("mapembed").src = srcstring;
    }
}
function editgooglemapembed(event) {
    if (event!=null) {
        var toucher = event.id;
        var num = toucher.match(/\d+/g).join();
        var ct = document.getElementById(`country${num}`).value + document.getElementById(`city${num}`).value + event.value;
        var srcstring = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_2epcPMRsd72k2z5PexCMxt4Vi2Fp_qM&q=${ct}`;
        document.getElementById(`mapembed${num}`).src = srcstring;
    }
}
/*function country_pick(event) {
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
}*/
/*function city_pick(event) {
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
}*/
function newcountry_pick(event) {
    if (event) {
        console.log("new country input name : " + event.id);
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
        console.log("new city input name : " + event.id);
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
        if (toucher == "search_unittype") {
            let cell = row.cells[2];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        }else if (toucher == "search_name") {
            let cell = row.cells[3];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_tax") {
            let cell = row.cells[4];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_country") {
            let cell = row.cells[5];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_city") {
            let cell = row.cells[6];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_address") {
            let cell = row.cells[7];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_cel") {
            let cell = row.cells[8];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_tel") {
            let cell = row.cells[9];
            if (cell.innerHTML.includes(event.value)) {
                $(cell).closest('tr').show();
            } else {
                $(cell).closest('tr').hide();
            }
        } else if (toucher == "search_fax") {
            let cell = row.cells[10];
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
