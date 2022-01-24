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