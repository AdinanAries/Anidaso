var include_services_in_booking_property_select = document.getElementById("include_services_in_booking_property_select");
var include_services_in_booking_service_type_select_input = document.getElementById("include_services_in_booking_service_type_select_input");
var include_services_in_booking_search_input_fld = document.getElementById("include_services_in_booking_search_input_fld");
var include_services_in_booking_search_btn = document.getElementById("include_services_in_booking_search_btn");
var include_services_in_booking_items_list = document.getElementById("include_services_in_booking_items_list");

function return_each_inventory_item_markup_on_include_item_to_invoice_page(inventory, index){

    return `<div style="display: flex; flex-direction: row !important; justify-content: space-between; background-color: rgb(0, 16, 27); border-radius: 4px; padding: 10px; margin-bottom: 5px;">
        <div style="margin-right: 5px; display: flex; flex-direction: row !important;">
            <div style="margin-right: 10px;">
                <input onclick="include_service_into_running_invoice('service_id', ${index}, true);" id="include_services_item_checkbox${index}" type="checkbox"/>
            </div>
            <div>
                <p style="color: rgb(255, 94, 0); font-size: 14px; margin-bottom: 5px;">
                    ${inventory.name}</p>
                <p style="color: rgb(255, 149, 87); font-size: 14px; margin-bottom: 5px;">
                    $${inventory.unit_price} <span style="color: rgba(255,255,255,0.6); font-size: 13px;">
                    (${inventory.stock_quantity} items)</span>
                </p>
                <div id="include_services_quantity_params${index}" style="margin-top: 10px; display: none; flex-direction: row !important; justify-content: space-between; border-top: rgba(255, 208, 187, 0.815) 1px solid; padding-top: 10px;">
                    <div style="margin-right: 20px;">
                        <p style="margin-bottom: 5px; color: white; font-size: 13px; font-weight: bolder;">
                            How many?</p>
                        <input id="include_services_quantity_input${index}" oninput="include_service_change_quantity('service_id', ${index})" style="border: none; padding: 10px; max-width: 100px;" type="number" value="1" />
                    </div>
                    <div>
                        <p style="margin-bottom: 5px; color: white; font-size: 13px; font-weight: bolder;">
                            Total:</p>
                        <p id="include_services_item_total${index}" style="color: rgb(255, 149, 87); font-size: 14px; margin-bottom: 5px;">
                            $${inventory.unit_price}</p>
                    </div>
                </div>
            </div>
            
        </div>
        <div>
            <div onclick="include_service_into_running_invoice('service_id',${index})" id="include_services_include_item_btn${index}" style="cursor: pointer; font-size: 14px; color: rgb(137, 235, 174); padding: 10px; border-radius: 4px;">
                <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                Include
            </div>
            <div onclick="remove_service_from_running_invoice('service_id', ${index})" id="include_services_remove_item_btn${index}" style="display: none; cursor: pointer; font-size: 14px; color: rgb(248, 16, 16); padding: 10px; border-radius: 4px;">
                <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-minus" aria-hidden="true"></i>
                Remove
            </div>
        </div>
    </div>`;
}

async function search_service_items_on_include_item_to_invoice(){
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

async function show_include_services_in_booking_div(){
    toggle_show_include_services_in_booking_div();
    
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

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

