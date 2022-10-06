var include_services_in_booking_property_select = document.getElementById("include_services_in_booking_property_select");
var include_services_in_booking_service_type_select_input = document.getElementById("include_services_in_booking_service_type_select_input");
var include_services_in_booking_search_input_fld = document.getElementById("include_services_in_booking_search_input_fld");
var include_services_in_booking_search_btn = document.getElementById("include_services_in_booking_search_btn");
var include_services_in_booking_items_list = document.getElementById("include_services_in_booking_items_list");

let initial_total = 0;
let current_invoice_total = 0;
let is_remove_from_checkbox = [];
async function include_inventory_item_into_booking(name, unit_price, index, event_from_check_box=false){
    
    if(!event_from_check_box) {
        document.getElementById("include_services_item_checkbox"+index).checked = true;
    }else if(event_from_check_box){
        if(is_remove_from_checkbox[index]){
            is_remove_from_checkbox[index] = !is_remove_from_checkbox[index];
            remove_inventory_item_from_booking(name, unit_price, index);
            return;
        }

    }
    is_remove_from_checkbox[index] = !is_remove_from_checkbox[index];

    document.getElementById("include_services_include_item_btn"+index).style.display="none";
    document.getElementById("include_services_remove_item_btn"+index).style.display="block";
    $("#include_services_quantity_params"+index).toggle("up");
    setTimeout(()=>document.getElementById("include_services_quantity_params"+index).style.display="flex",300);

    let quantity = document.getElementById("include_services_quantity_input"+index).value;
    
    document.getElementById("include_services_item_total"+index).innerText = `$${parseFloat(unit_price).toFixed(2)}`;

    //remove current item from list first
    add_invoice_item_post_obj.invoice_items.guest_items = add_invoice_item_post_obj.invoice_items.guest_items.filter(each=>{
        return (each.name === name/* && each.price === unit_price*/) ? false : true;
    });

    add_invoice_item_post_obj.invoice_items.guest_items.push({
        name,
        price: Math.round(parseFloat(unit_price)),//unit_price,
        quantity: parseInt(quantity),
        total: parseFloat(unit_price),
    });

    let current_total = 0;//parseFloat(unit_price) * parseInt(quantity);
    add_invoice_item_post_obj.invoice_items.guest_items.forEach(each=>{
        current_total += each.total;
    });
    current_invoice_total = initial_total + current_total;
    document.getElementById("current_running_invoice_total_amount_span").innerText = `$${parseFloat(current_invoice_total).toFixed(2)}`;
    console.log(add_invoice_item_post_obj);
    console.log(running_invoice);
    //await update_and_return_cheap_hotel_guest_invoice();
}

async function remove_inventory_item_from_booking(name, unit_price, index){

    document.getElementById("include_services_item_checkbox"+index).checked = false;

    document.getElementById("include_services_include_item_btn"+index).style.display="block";
    document.getElementById("include_services_remove_item_btn"+index).style.display="none";
    $("#include_services_quantity_params"+index).toggle("up");

    document.getElementById("include_services_item_total"+index).innerText = `$${parseFloat(unit_price).toFixed(2)}`;
    document.getElementById("include_services_quantity_input"+index).value = 1;
    current_invoice_total = 0;

    //remove current item from list first
    add_invoice_item_post_obj.invoice_items.guest_items = add_invoice_item_post_obj.invoice_items.guest_items.filter(each=>{
        return (each.name === name/* && each.price === unit_price*/) ? false : true;
    });

    let current_total = 0;//parseFloat(unit_price) * parseInt(quantity);
    add_invoice_item_post_obj.invoice_items.guest_items.forEach(each=>{
        current_total += each.total;
    });
    current_invoice_total = initial_total + current_total;
    document.getElementById("current_running_invoice_total_amount_span").innerText = `$${parseFloat(current_invoice_total).toFixed(2)}`;
    console.log(add_invoice_item_post_obj);
    console.log(running_invoice);
    //await update_and_return_cheap_hotel_guest_invoice();
}

async function include_inventory_in_booking_change_quantity(name, unit_price, index){
    if(document.getElementById("include_services_quantity_input"+index).value==="0"){
        remove_inventory_item_from_booking(name, unit_price, index);
        return;
    }
    if(document.getElementById("include_services_quantity_input"+index).value===""){
        //document.getElementById("include_services_quantity_input"+index).value = 1;
        document.getElementById("include_services_quantity_input"+index).style.border='1px solid red';
        document.getElementById("include_services_quantity_input"+index).style.backgroundColor='rgba(255,55,55,0.5)';
        return;
    }else{
        document.getElementById("include_services_quantity_input"+index).style.border='none';
        document.getElementById("include_services_quantity_input"+index).style.backgroundColor='white';
    }
    let quantity = document.getElementById("include_services_quantity_input"+index).value;
    let item_total = parseFloat(unit_price) * parseInt(quantity);
    document.getElementById("include_services_item_total"+index).innerText = `$${parseFloat(item_total).toFixed(2)}`;

    //remove current item from list first
    add_invoice_item_post_obj.invoice_items.guest_items = add_invoice_item_post_obj.invoice_items.guest_items.filter(each=>{
        return (each.name === name/* && each.price === unit_price/*/) ? false : true;
    });

    add_invoice_item_post_obj.invoice_items.guest_items.push({
        name,
        price: Math.round(parseFloat(unit_price)),
        quantity: parseInt(quantity),
        total: item_total,
    });

    let current_total = 0;//parseFloat(unit_price) * parseInt(quantity);
    add_invoice_item_post_obj.invoice_items.guest_items.forEach(each=>{
        current_total += each.total;
    });
    current_invoice_total = initial_total + current_total;
    document.getElementById("current_running_invoice_total_amount_span").innerText = `$${parseFloat(current_invoice_total).toFixed(2)}`;
    console.log(add_invoice_item_post_obj);
    console.log(running_invoice);
    //await update_and_return_cheap_hotel_guest_invoice();
}

function return_each_inventory_item_markup_on_include_item_to_invoice_page(inventory, index){
    is_remove_from_checkbox.push(false);
    included_item = add_invoice_item_post_obj.invoice_items.guest_items.filter(each=>{
        return (each.name === inventory.name/* && each.price === inventory.unit_price*/);
    });
    let current_total = 0;//parseFloat(unit_price) * parseInt(quantity);
    add_invoice_item_post_obj.invoice_items.guest_items.forEach(each=>{
        current_total += each.total;
    });
    current_invoice_total = initial_total + current_total;
    document.getElementById("current_running_invoice_total_amount_span").innerText = `$${parseFloat(current_invoice_total).toFixed(2)}`;

    let styles = {
        quantity_params: 'display: none;',
        remove_item_btn: 'display: none;',
        include_item_btn: '',
        included_check_box: "",
    }
    let temp = {
        total: inventory.unit_price,
        quantity: 1
    }
    if(included_item.length>0){
        styles.quantity_params='display: flex;';
        styles.remove_item_btn='display: block;';
        styles.include_item_btn='display: none;';
        styles.included_check_box="checked";
        temp.total = included_item[0].total;
        temp.quantity = included_item[0].quantity
        //is_remove_from_checkbox[index]=true;
    }

    return `<div style="display: flex; flex-direction: row !important; justify-content: space-between; background-color: rgb(0, 16, 27); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 10px;">
        <div style="margin-right: 5px; display: flex; flex-direction: row !important;">
            <div style="margin-right: 10px;">
                <input onclick="include_inventory_item_into_booking('${inventory.name}','${inventory.unit_price}', ${index}, true);" id="include_services_item_checkbox${index}" type="checkbox" ${styles.included_check_box}/>
            </div>
            <div>
                <p style="color: rgb(255, 94, 0); font-size: 14px; margin-bottom: 5px;">
                    ${inventory.name}</p>
                <p style="color: rgb(255, 149, 87); font-size: 14px; margin-bottom: 5px;">
                    $${inventory.unit_price} <span style="color: rgba(255,255,255,0.6); font-size: 13px;">
                    (${inventory.stock_quantity} items)</span>
                </p>
                <div id="include_services_quantity_params${index}" style="margin-top: 10px; ${styles.quantity_params} flex-direction: row !important; justify-content: space-between; border-top: rgba(255, 208, 187, 0.815) 1px solid; padding-top: 10px;">
                    <div style="margin-right: 20px;">
                        <p style="margin-bottom: 5px; color: white; font-size: 13px; font-weight: bolder;">
                            How many?</p>
                        <input id="include_services_quantity_input${index}" oninput="include_inventory_in_booking_change_quantity('${inventory.name}','${inventory.unit_price}',${index})" style="border: none; padding: 10px; max-width: 100px;" type="number" value="${temp.quantity}" />
                    </div>
                    <div>
                        <p style="margin-bottom: 5px; color: white; font-size: 13px; font-weight: bolder;">
                            Total:</p>
                        <p id="include_services_item_total${index}" style="color: rgb(255, 149, 87); font-size: 14px; margin-bottom: 5px;">
                            $${temp.total}</p>
                    </div>
                </div>
            </div>
            
        </div>
        <div>
            <div onclick="include_inventory_item_into_booking('${inventory.name}','${inventory.unit_price}',${index})" id="include_services_include_item_btn${index}" style="${styles.include_item_btn} cursor: pointer; font-size: 14px; color: rgb(137, 235, 174); padding: 10px; border-radius: 4px;">
                <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                Include
            </div>
            <div onclick="remove_inventory_item_from_booking('${inventory.name}','${inventory.unit_price}',${index})" id="include_services_remove_item_btn${index}" style="${styles.remove_item_btn} cursor: pointer; font-size: 14px; color: rgb(248, 16, 16); padding: 10px; border-radius: 4px;">
                <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-minus" aria-hidden="true"></i>
                Remove
            </div>
        </div>
    </div>`;
}

async function search_service_items_on_include_item_to_invoice(){
    is_remove_from_checkbox=[];
    if(include_services_in_booking_search_input_fld.value===""){
        include_services_in_booking_search_input_fld.style.border="1.5px solid red";
        include_services_in_booking_search_input_fld.style.background="rgb(255,160,160)";
        return
    }else{
        include_services_in_booking_search_input_fld.style.border="none";
        include_services_in_booking_search_input_fld.style.background="white";
    }

    if(include_services_in_booking_service_type_select_input.value==="inventory"){
        search_inventory_item_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
        search_inventory_item_post_data.property_id = include_services_in_booking_property_select.value;
        search_inventory_item_post_data.search_param = include_services_in_booking_search_input_fld.value;
        let inventories = await search_inventory_post();
        if(inventories.length>0){
            include_services_in_booking_items_list.innerHTML='';
            for(let i=0; i<inventories.length; i++){
                include_services_in_booking_items_list.innerHTML += return_each_inventory_item_markup_on_include_item_to_invoice_page(inventories[i], i);
            }
        }else{
            include_services_in_booking_items_list.innerHTML= `<div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>`;
        }
        
        console.log(inventory);
    }
}
include_services_in_booking_search_btn.addEventListener('click', search_service_items_on_include_item_to_invoice);

async function default_search_service_items_on_include_item_to_invoice(){
    is_remove_from_checkbox=[];
    if(include_services_in_booking_service_type_select_input.value==="inventory"){
        search_inventory_item_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
        search_inventory_item_post_data.property_id = include_services_in_booking_property_select.value;
        search_inventory_item_post_data.search_param = include_services_in_booking_search_input_fld.value;
        let inventories = await default_search_inventory_post();
        if(inventories.length>0){
            include_services_in_booking_items_list.innerHTML='';
            for(let i=0; i<inventories.length; i++){
                include_services_in_booking_items_list.innerHTML += return_each_inventory_item_markup_on_include_item_to_invoice_page(inventories[i], i);
            }
        }else{
            include_services_in_booking_items_list.innerHTML= `<div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
                <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                    <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Nothing was found!
                </p>
            </div>`;
        }
        console.log(inventories);
    }else{
        include_services_in_booking_items_list.innerHTML= `<div style="padding: 40px 10px; border-radius: 4px; background-color: rgba(0,0,0,0.4);">
            <p style="padding: 10px; color: white; text-align: center; font-size: 14px;">
                <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Nothing was found!
            </p>
        </div>`;
    }
}

include_services_in_booking_service_type_select_input.addEventListener('change', default_search_service_items_on_include_item_to_invoice);
include_services_in_booking_property_select.addEventListener('change', default_search_service_items_on_include_item_to_invoice);

function toggle_show_include_services_in_booking_div(){
    $("#include_services_in_booking_div").toggle("up");
}

async function show_include_services_in_booking_div(guest_id_p='', property_id='', index){
    toggle_show_include_services_in_booking_div();
    running_invoice = all_running_invoices[index];
    add_invoice_item_post_obj.invoice_items = running_invoice.invoice_items.filter(each=>each.guest_id===guest_id_p)[0];
    console.log(add_invoice_item_post_obj.invoice_items);
    console.log(running_invoice.invoice_items);

    // INCLUDE All OTHER GUESTS INVOICES THAT AREN'T ASSOCIATED WITH THE CURRENT GUEST TO INITIAL TOTAL
    initial_total = 0;
    running_invoice.invoice_items.forEach(each=>{
        if(each.guest_id!==guest_id_p){
            each.guest_items.forEach(item=>{
                initial_total += parseFloat(item.total);
                console.log('guest total:',item.total)
                console.log('initial total', initial_total);
            })
        }
    });

    document.getElementById("current_running_invoice_total_amount_span").innerText = `$${parseFloat(initial_total).toFixed(2)}`;
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));
    let guest = await get_and_return_hotel_guest_by_id(localStorage.getItem("ANDSBZID"), property_id, guest_id_p);
    document.getElementById("include_services_in_booking_guest_fullname").innerText = `${guest.first_name} ${guest.last_name}`;

    include_services_in_booking_property_select.innerHTML = `
        <option value="all">All</option>
    `;

    for(let i = 0; i < properties.length; i++){
        include_services_in_booking_property_select.innerHTML += `
            <option value="${properties[i]._id}">${properties[i].city} - ${properties[i].street_address} (${properties[i].country})</option>
        `;
    }

    default_search_service_items_on_include_item_to_invoice();
}

function update_and_return_cheap_hotel_guest_invoice(){
    return $.ajax({
        type: "POST",
        url: "/update_cheap_hotel_guest_invoice/",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(running_invoice),
        success: data => {
            //console.log('invoice after backend:',data);
            return data
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}