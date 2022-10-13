var add_new_inventory_name_input = document.getElementById("add_new_inventory_name_input");
var add_new_inventory_unit_price_input = document.getElementById("add_new_inventory_unit_price_input");
var add_new_inventory_quantity_input = document.getElementById("add_new_inventory_quantity_input");
var add_new_inventory_service_department_input = document.getElementById("add_new_inventory_service_department_input");
var add_new_inventory_property_input = document.getElementById("add_new_inventory_property_input");
var add_new_inventory_description_input = document.getElementById("add_new_inventory_description_input");

var edit_inventory_name_input = document.getElementById("edit_inventory_name_input");
var edit_inventory_unit_price_input = document.getElementById("edit_inventory_unit_price_input");
var edit_inventory_quantity_input = document.getElementById("edit_inventory_quantity_input");
var edit_inventory_service_department_input = document.getElementById("edit_inventory_service_department_input");
var edit_inventory_property_input = document.getElementById("edit_inventory_property_input");
var edit_inventory_description_input = document.getElementById("edit_inventory_description_input");

var cheap_hotel_inventory_list_table_body = document.getElementById("cheap_hotel_inventory_list_table_body");
var cheap_hotel_inventory_list_select_property_display = document.getElementById("cheap_hotel_inventory_list_select_property");


function toggle_show_add_inventory_form_div() {
    $("#add_inventory_form_div").toggle("up");
}

function toggle_show_edit_inventory_form_div() {
    $("#edit_inventory_form_div").toggle("up");
}

function get_and_return_iventory_item(code, name, property_id) {
    return $.ajax({
        type: "GET",
        url: `/get_inventory_item_by_name_and_code/${code}/${name}/${property_id}/${localStorage.getItem("ANDSBZID")}`,
        success: res => {
            update_inventory_old_obj.code = res.code;
            new_inventory_item_post_data.item.code = res.code;
            update_inventory_old_obj.name = res.name;
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}
async function start_edit_inventory_item(code, name, property_id) {
    toggle_show_edit_inventory_form_div();
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("edit_inventory_property_input").innerHTML = `
    <option value="all">All</option>
    `;

    for (let i = 0; i < properties.length; i++) {
        document.getElementById("edit_inventory_property_input").innerHTML += `
        <option value="${properties[i]._id}">${properties[i].city} - ${properties[i].street_address} (${properties[i].country})</option>
        `;
    }

    let item = await get_and_return_iventory_item(code, name, property_id);
    console.log(item);
    if (item) {
        document.getElementById("edit_inventory_name_input").value = item.name;
        document.getElementById("edit_inventory_quantity_input").value = item.stock_quantity;
        document.getElementById("edit_inventory_unit_price_input").value = item.unit_price;
        document.getElementById("edit_inventory_service_department_input").value = item.service_department;
        document.getElementById("edit_inventory_description_input").value = item.description.trim();
        document.getElementById("edit_inventory_property_input").value = item.property_id;
    }
}

async function show_add_inventory_item_form() {

    toggle_show_add_inventory_form_div();
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("add_new_inventory_property_input").innerHTML = `
    <option value="all">All</option>
    `;

    for (let i = 0; i < properties.length; i++) {
        document.getElementById("add_new_inventory_property_input").innerHTML += `
        <option value="${properties[i]._id}">${properties[i].city} - ${properties[i].street_address} (${properties[i].country})</option>
        `;
    }
    document.getElementById("add_new_inventory_property_input").value = search_inventory_item_post_data.property_id;
}

async function start_delete_inventory_item(code, name, property_id) {
    show_confirmation_dialog_to_confirm_user_action(
        "Confirm Delete",
        `Are you sure you want to delete ${name} from inventory?`,
        () => delete_one_inventory_item_and_return_all_other_iventory_items(code, name, property_id)
    );
}

function delete_one_inventory_item_and_return_all_other_iventory_items(code, name, property_id) {
    return $.ajax({
        type: "GET",
        url: `/delete_inventory_item/${code}/${name}/${property_id}/${localStorage.getItem("ANDSBZID")}`,
        success: res => {
            //console.log(res);
            if (res.items.length > 0) {
                cheap_hotel_inventory_list_table_body.innerHTML = `
                <tr>
                    <td class="its_inventory_header">Item</td>
                    <td class="its_inventory_header">Code</td>
                    <td class="its_inventory_header">Quantity</td>
                    <td class="its_inventory_header">Price</td>
                </tr>`;
                for (let i = 0; i < res.items.length; i++) {
                    cheap_hotel_inventory_list_table_body.innerHTML += return_each_inventory_markup(res.items[i]);
                }

            } else {
                cheap_hotel_inventory_list_table_body.innerHTML = `<div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                    <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                        <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        Nothing was found!
                    </p>
                </div>`;
            }
            confirmation_required_action_finished_call_back();
            /*if(cheap_hotel_inventory_list_table_body.innerHTML.includes( `
            <div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>`)){
                cheap_hotel_inventory_list_table_body.innerHTML = `
                    <tr>
                        <td class="its_inventory_header">Item</td>
                        <td class="its_inventory_header">Code</td>
                        <td class="its_inventory_header">Quantity</td>
                        <td class="its_inventory_header">Price</td>
                    </tr>`;
            }*/

        },
        error: err => {
            confirmation_required_action_finished_call_back();
            console.log(err);
        }
    });
}

function toggle_show_inventory_sales() {
    $("#front_inventory_sales_container").toggle("up");
}

function show_inventory_sales() {
    toggle_show_inventory_sales();
}

function toggle_show_inventory_div() {
    $("#inventory_manager_div").toggle("up");
}

async function show_inventory_select_property() {

    $("#inventory_manager_select_property_div").toggle("up");

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("inventory_manager_select_property").innerHTML = `
        <div style="padding: 10px; background-color: white; border-radius: 4px; margin-bottom: 5px;">
            <p style="color: rgb(0, 82, 121); font-weight: bolder; font-size: 14px;">
                <i style="margin-right: 5px; color:rgb(235, 86, 0);" class="fa fa-building" aria-hidden="true"></i>
                All Properties</p>
            <div onclick="get_and_show_all_inventory('all');" style="cursor: pointer; font-size: 14px; color: white; margin-top: 10px; width: fit-content; background-color:rgb(0, 28, 54); border-radius: 4px; padding: 10px;">
                manage inventory
            </div>
        </div>
    `;
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("inventory_manager_select_property").innerHTML += `
            <div style="padding: 10px; background-color: white; border-radius: 4px; margin-bottom: 5px;">
                <p style="color: rgb(0, 82, 121); font-weight: bolder; font-size: 14px;">
                    <i style="margin-right: 5px; color:rgb(235, 86, 0);" class="fa fa-building" aria-hidden="true"></i>
                    ${properties[i].city}</p>
                <p style="margin-top: 5px; font-size: 13px; color:rgb(25, 90, 90);">
                    ${properties[i].street_address}, ${properties[i].country}
                </p>
                <div onclick="get_and_show_all_inventory('${properties[i]._id}');" style="cursor: pointer; font-size: 14px; color: white; margin-top: 10px; width: fit-content; background-color:rgb(0, 28, 54); border-radius: 4px; padding: 10px;">
                    manage inventory
                </div>
            </div>
        `;
    }
}

function show_inventory_div() {
    toggle_show_inventory_div();
    show_inventory_select_property();
}

function get_and_return_all_inventory(hotel_id, property_id){   
    return $.ajax({
        type: "GET",
        url: "/get_all_hotel_inventory/"+hotel_id+"/"+property_id,
        success: data => {
            console.log(data);
            return data
        },
        error: err => {
            console.log(err);
            return err
        }
    });

}

async function get_and_show_all_inventory(property_id){

    document.getElementById("property_not_selected_status").style.display = "none";
    $("#inventory_manager_select_property_div").toggle("up");
    search_inventory_item_post_data.property_id = property_id;

    let hotel_inventory = await get_and_return_all_inventory(localStorage.getItem("ANDSBZID"), property_id);

    if(hotel_inventory.nonAdded || hotel_inventory.items.length === 0){
        cheap_hotel_inventory_list_table_body.innerHTML = `
            <div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>
        `
        return null;
    }

    if(property_id !== "all"){
        let property = await get_and_return_hotel_property_by_id(property_id);
        cheap_hotel_inventory_list_select_property_display.innerHTML = `
            <p style="margin-bottom: 10px; font-size: 13px; color: rgba(255,255,255,0.6);">
                <i class="fa fa-building" style="margin-right: 5px;" aria-hidden="true"></i>
                <span>${property.city}</span> - ${property.street_address}, ${property.country}
                <i onclick="show_inventory_select_property();" class="fa fa-refresh" style="margin-left: 10px; font-size: 15px; cursor: pointer;" aria-hidden="true"></i>
            </p>
        `; 
    }else {
        cheap_hotel_inventory_list_select_property_display.innerHTML = `
            <p style="margin-bottom: 10px; font-size: 13px; color: rgba(255,255,255,0.6);">
                <i class="fa fa-building" style="margin-right: 5px;" aria-hidden="true"></i>
                all properties
                <i onclick="show_inventory_select_property();" class="fa fa-refresh" style="margin-left: 10px; font-size: 15px; cursor: pointer;" aria-hidden="true"></i>
            </p>
        `; 
    }
    

    cheap_hotel_inventory_list_table_body.innerHTML = `
        <tr>
            <td class="its_inventory_header">Item</td>
            <td class="its_inventory_header hide_for_smaller_screens">Code</td>
            <td class="its_inventory_header">Quantity</td>
            <td class="its_inventory_header">Price</td>
        </tr>`;

    //initial load
    if(hotel_inventory.items.length < 20){
        cheap_hotel_inventory_list_table_body.innerHTML += show_information_inventory(0, hotel_inventory.items.length, hotel_inventory.items);
        document.getElementById("load_more_inventory_items_btn").style.display = "none";
    }else{
        cheap_hotel_inventory_list_table_body.innerHTML += show_information_inventory(0, 20, hotel_inventory.items);
        document.getElementById("load_more_inventory_items_btn").style.display = "block";
    }
}

function show_information_inventory(first_index, last_index, inventory_array){

    let lower_bound_index = first_index;
    if (lower_bound_index > inventory_array.length)
        lower_bound_index = inventory_array.length;

    let upper_bound_index = last_index;
    if (upper_bound_index > inventory_array.length)
        upper_bound_index = inventory_array.length;

    let markup = "";

    for(let i = lower_bound_index; i < upper_bound_index; i++){
        markup += return_each_inventory_markup(inventory_array[i]);
    }

    return markup;
}

function return_each_inventory_markup(inventory){
    return `
        <tr>
            <td class="its_inventory_item_name">${inventory.name}</td>
            <td class="hide_for_smaller_screens">${inventory.code}</td>
            <td>${inventory.stock_quantity}</td>
            <td>$${inventory.unit_price}</td>
            <td onclick="start_edit_inventory_item('${inventory.code}', '${inventory.name}', '${inventory.property_id}');" style="text-align: center; cursor: pointer; background: none; min-width: 16px;">
                <i aria-hidden="true" style="color:rgb(6, 205, 255);" class="fa fa-pencil"></i></td>
            <td onclick="start_delete_inventory_item('${inventory.code}', '${inventory.name}', '${inventory.property_id}');" style="text-align: center; cursor: pointer; background: none; min-width: 16px;">
                <i aria-hidden="true" style="color:red;" class="fa fa-trash"></i></td>
        </tr>
    `;
}

function generate_item_code(len, arr) {

    var ans = "";//localStorage.getItem("ANDSBZID").substring(localStorage.getItem("ANDSBZID").length - 4, localStorage.getItem("ANDSBZID").length -1)
     
    for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
        ans += Math.floor(Math.random() * 9);
    }
    return ans.toUpperCase();
}

function collect_new_inventory_item_info_from_inputs(){

    let item_name = add_new_inventory_name_input.value;

    new_inventory_item_post_data.item.code = generate_item_code(4, item_name.split(" ")[0]);
    new_inventory_item_post_data.item.name = item_name.trim();
    new_inventory_item_post_data.item.unit_price = add_new_inventory_unit_price_input.value;
    new_inventory_item_post_data.item.stock_quantity = add_new_inventory_quantity_input.value;
    new_inventory_item_post_data.item.service_department = add_new_inventory_service_department_input.value;
    new_inventory_item_post_data.item.property_id = add_new_inventory_property_input.value;
    new_inventory_item_post_data.item.description = add_new_inventory_description_input.value;

    return null;
}

document.getElementById("add_new_inventory_save_btn").addEventListener("click", async e => {
    if(add_new_inventory_name_input.value === ""){
        add_new_inventory_name_input.placeholder = "please enter item name";
        add_new_inventory_name_input.focus();
    }else if(add_new_inventory_quantity_input.value === ""){
        add_new_inventory_quantity_input.placeholder = "please enter item quantity";
        add_new_inventory_quantity_input.focus();
    }else if(add_new_inventory_unit_price_input.value === ""){
        add_new_inventory_unit_price_input.placeholder = "please enter unit price";
        add_new_inventory_unit_price_input.focus();
    }else{
        await collect_new_inventory_item_info_from_inputs();
        new_inventory_item_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
        let res = await add_and_return_new_inventory_item();

        $("#add_inventory_form_div").toggle("up");

        /*if(cheap_hotel_inventory_list_table_body.innerHTML.trim().includes(`
            <div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>`))*/
            if(cheap_hotel_inventory_list_table_body.innerHTML.includes('Nothing was found!')){
                cheap_hotel_inventory_list_table_body.innerHTML = `
                    <tr>
                        <td class="its_inventory_header">Item</td>
                        <td class="its_inventory_header hide_for_smaller_screens">Code</td>
                        <td class="its_inventory_header">Quantity</td>
                        <td class="its_inventory_header">Price</td>
                    </tr>`;
            }
            
        cheap_hotel_inventory_list_table_body.innerHTML += return_each_inventory_markup(res.items[res.items.length - 1]);

    }
});

function add_and_return_new_inventory_item(){
    return $.ajax({
        type: "POST",
        url: "/add_new_inventory_item/",
        data: JSON.stringify(new_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: data => {
            //console.log(data);
            return data
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function collect_edit_inventory_item_info_from_inputs(){

    let item_name = edit_inventory_name_input.value;

    //new_inventory_item_post_data.item.code = generate_item_code(4, item_name.split(" ")[0]);
    new_inventory_item_post_data.item.name = item_name.trim();
    new_inventory_item_post_data.item.unit_price = edit_inventory_unit_price_input.value;
    new_inventory_item_post_data.item.stock_quantity = edit_inventory_quantity_input.value;
    new_inventory_item_post_data.item.service_department = edit_inventory_service_department_input.value;
    new_inventory_item_post_data.item.property_id = edit_inventory_property_input.value;
    new_inventory_item_post_data.item.description = edit_inventory_description_input.value;

    return null;
}

document.getElementById("edit_inventory_save_btn").addEventListener("click", async e => {
    if(edit_inventory_name_input.value === ""){
        edit_inventory_name_input.placeholder = "please enter item name";
        edit_inventory_name_input.focus();
    }else if(edit_inventory_quantity_input.value === ""){
        edit_inventory_quantity_input.placeholder = "please enter item quantity";
        edit_inventory_quantity_input.focus();
    }else if(edit_inventory_unit_price_input.value === ""){
        edit_inventory_unit_price_input.placeholder = "please enter unit price";
        edit_inventory_unit_price_input.focus();
    }else{
        await collect_edit_inventory_item_info_from_inputs();
        new_inventory_item_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
        let res = await update_and_return_inventory_item();

        $("#edit_inventory_form_div").toggle("up");

        /*if(cheap_hotel_inventory_list_table_body.innerHTML.includes( `
            <div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>`)){
                cheap_hotel_inventory_list_table_body.innerHTML = `
                    <tr>
                        <td class="its_inventory_header">Item</td>
                        <td class="its_inventory_header">Code</td>
                        <td class="its_inventory_header">Quantity</td>
                        <td class="its_inventory_header">Price</td>
                    </tr>`;
            }*/
    
            cheap_hotel_inventory_list_table_body.innerHTML = `
                <tr>
                    <td class="its_inventory_header">Item</td>
                    <td class="its_inventory_header">Code</td>
                    <td class="its_inventory_header">Quantity</td>
                    <td class="its_inventory_header">Price</td>
                </tr>`;

        cheap_hotel_inventory_list_table_body.innerHTML += return_each_inventory_markup(res.items[res.items.length - 1]);

    }
});

function update_and_return_inventory_item(){
    return $.ajax({
        type: "POST",
        url: `/edit_inventory_item_by_name_and_code/${update_inventory_old_obj.code}/${update_inventory_old_obj.name}/`,
        data: JSON.stringify(new_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

function search_inventory_post(){
    return $.ajax({
        type: "POST",
        url: "/search_inventory_item/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function search_service_post(){
    return $.ajax({
        type: "POST",
        url: "/search_service_item/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function search_facility_post(){
    return $.ajax({
        type: "POST",
        url: "/search_facility_item/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function default_search_inventory_post(){
    return $.ajax({
        type: "POST",
        url: "/search_inventory_item_default/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function default_search_services_post(){
    return $.ajax({
        type: "POST",
        url: "/search_service_item_default/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function default_search_facilities_post(){
    return $.ajax({
        type: "POST",
        url: "/search_facility_item_default/",
        data: JSON.stringify(search_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

document.getElementById("search_inventory_item_search_btn").addEventListener("click", async e => {
    search_inventory_item_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
    if(document.getElementById("search_inventory_item_input_fld").value === ""){
        document.getElementById("search_inventory_item_input_fld").focus();
        document.getElementById("search_inventory_item_input_fld").placeholder = "please enter name/code";
    }else{
        search_inventory_item_post_data.search_param = document.getElementById("search_inventory_item_input_fld").value;
        let items = await search_inventory_post();
        console.log(items);

        if(items.length === 0){
            cheap_hotel_inventory_list_table_body.innerHTML = `
                <div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                    <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                        <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        Nothing was found!
                    </p>
                </div>`;
            return null;
        }

        cheap_hotel_inventory_list_table_body.innerHTML = `
            <tr>
                <td class="its_inventory_header">Item</td>
                <td class="its_inventory_header">Code</td>
                <td class="its_inventory_header">Quantity</td>
                <td class="its_inventory_header">Price</td>
            </tr>`;
            
        for(let i = 0; i < items.length; i++){
            cheap_hotel_inventory_list_table_body.innerHTML += return_each_inventory_markup(items[i]);
        }
    }
});