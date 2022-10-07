function toggle_show_add_services_from_list_div() {
    $("#add_services_from_list_div").toggle("up");
}

function show_add_services() {
    toggle_show_add_services_from_list_div();

    for (let i = 0; i < all_hotel_services.length; i++) {
        if (i > (all_hotel_services.length / 2)) {
            document.getElementById("select_services_list2").innerHTML +=
                `
                <div style="padding: 10px; margin: 5px 0; background-color: rgba(0, 0, 0, 0.5); border-radius: 4px;">
                    <input onclick="toggle_hide_show_anything('${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_unit_price_input')" style="margin-right: 5px;" id="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_from_add_from_list">${all_hotel_services[i]}</label>
                    <div id="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_unit_price_input" style="display: none; padding: 10px; margin-top: 10px; border-top: 1px solid rgb(92, 195, 255); background-color: rgba(255,255,255,0.3);">
                        <p style="font-size: 13px; font-weight: bolder; margin: 10px 0; color: rgb(92, 195, 255);">
                        Unit Price
                        <span style="font-size: 12px; color: orange;"> - in dollars ($)</span>
                        </p>
                        <input style="padding: 5px; font-size: 14px; border: none; width: calc(100% - 10px);" type="number" value="0" />
                        <p style="font-size: 11px; color: rgb(255, 199, 99); margin-top: 10px;">
                            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                            leave as 0 if price is not applicable
                        </p>
                    </div>
                </div>
            `;
        } else {
            document.getElementById("select_services_list1").innerHTML +=
                `
                <div style="padding: 10px; margin: 5px 0; background-color: rgba(0, 0, 0, 0.5); border-radius: 4px;">
                    <input onclick="toggle_hide_show_anything('${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_unit_price_input')" style="margin-right: 5px;" id="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_from_add_from_list">${all_hotel_services[i]}</label>
                    <div id="${all_hotel_services[i].replaceAll(" ", "_").trim()}_service_unit_price_input" style="display: none; padding: 10px; margin-top: 10px; border-top: 1px solid rgb(92, 195, 255); background-color: rgba(255,255,255,0.3);">
                        <p style="font-size: 13px; font-weight: bolder; margin: 10px 0; color: rgb(92, 195, 255);">
                        Unit Price
                        <span style="font-size: 12px; color: orange;"> - in dollars ($)</span>
                        </p>
                        <input style="padding: 5px; font-size: 14px; border: none; width: calc(100% - 10px);" type="number" value="0" />
                        <p style="font-size: 11px; color: rgb(255, 199, 99); margin-top: 10px;">
                            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                            leave as 0 if price is not applicable
                        </p>
                    </div>
                </div>
            `;
        }
    }
}

function toggle_show_add_facilities_from_list_div() {
    $("#add_facilities_from_list_div").toggle("up");
}

function show_add_facilities() {
    toggle_show_add_facilities_from_list_div();

    for (let i = 0; i < all_hotel_facilities.length; i++) {
        if (i > (all_hotel_facilities.length / 2)) {
            document.getElementById("select_facilities_list2").innerHTML +=
                `
                <div style="padding: 10px; margin: 5px 0; background-color: rgba(0, 0, 0, 0.5); border-radius: 4px;">
                    <input onclick="toggle_hide_show_anything('${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_unit_price_input')" style="margin-right: 5px;" id="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_from_add_from_list">${all_hotel_facilities[i]}</label>
                    <div id="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_unit_price_input" style="display: none; padding: 10px; margin-top: 10px; border-top: 1px solid rgb(92, 195, 255); background-color: rgba(255,255,255,0.3);">
                        <p style="font-size: 13px; font-weight: bolder; margin: 10px 0; color: rgb(92, 195, 255);">
                        Price
                        <span style="font-size: 12px; color: orange;"> - in dollars ($)</span>
                        </p>
                        <input style="padding: 5px; font-size: 14px; border: none; width: calc(100% - 10px);" type="number" value="0" />
                        <p style="font-size: 11px; color: rgb(255, 199, 99); margin-top: 10px;">
                            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                            leave as 0 if price is not applicable
                        </p>
                    </div>
                </div>
            `;
        } else {
            document.getElementById("select_facilities_list1").innerHTML +=
                `
                <div style="padding: 10px; margin: 5px 0; background-color: rgba(0, 0, 0, 0.5); border-radius: 4px;">
                    <input onclick="toggle_hide_show_anything('${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_unit_price_input')" style="margin-right: 5px;" id="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_from_add_from_list">${all_hotel_facilities[i]}</label>
                    <div id="${all_hotel_facilities[i].replaceAll(" ", "_").trim()}_facility_unit_price_input" style="display: none; padding: 10px; margin-top: 10px; border-top: 1px solid rgb(92, 195, 255); background-color: rgba(255,255,255,0.3);">
                        <p style="font-size: 13px; font-weight: bolder; margin: 10px 0; color: rgb(92, 195, 255);">
                        Unit Price
                        <span style="font-size: 12px; color: orange;"> - in dollars ($)</span>
                        </p>
                        <input style="padding: 5px; font-size: 14px; border: none; width: calc(100% - 10px);" type="number" value="0" />
                        <p style="font-size: 11px; color: rgb(255, 199, 99); margin-top: 10px;">
                            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                            leave as 0 if price is not applicable
                        </p>
                    </div>
                </div>
            `;
        }
    }

}

function toggle_show_all_services() {
    $("#all_services_list_container").toggle("up");
}

async function show_all_services() {
    toggle_show_all_services();

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));
    document.getElementById("logged_in_hotel_all_services_add_new_service_property_input").innerHTML = `
        <option value="all">Select Property</option>
        <option value="all">All</option>
    `;

    for (let i = 0; i < properties.length; i++) {
        document.getElementById("logged_in_hotel_all_services_add_new_service_property_input").innerHTML += `
            <option value="${properties[i]._id}">${properties[i].city} - ${properties[i].street_address} (${properties[i].country})</option>
        `;
    }

    render_all_logged_in_hotel_services();
}

function toggle_show_all_facilites() {
    $("#all_facilities_list_container").toggle("up");
}

async function show_all_facilities() {
    toggle_show_all_facilites();

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));
    document.getElementById("logged_in_hotel_all_facilities_add_new_facility_property_input").innerHTML = `
        <option value="all">Select Property</option>
        <option value="all">All</option>
    `;

    for (let i = 0; i < properties.length; i++) {
        document.getElementById("logged_in_hotel_all_facilities_add_new_facility_property_input").innerHTML += `
            <option value="${properties[i]._id}">${properties[i].city} - ${properties[i].street_address} (${properties[i].country})</option>
        `;
    }

    render_all_logged_in_hotel_facilities();
}
//show_all_hotel_property_rooms(propety_id) use this function to show  rooms of each property;

async function add_all_amenity_options_to_select_from_list() {
    let hotel_amenities = await get_all_amenities(localStorage.getItem("ANDSBZID"));
    all_hotel_amenity_options = all_hotel_amenity_options.map(each => each.trim());
    //Removing duplicates
    hotel_amenities.forEach(emenity => {
        all_hotel_amenity_options.splice(all_hotel_amenity_options.indexOf(emenity.trim()), 1);
    });
    document.getElementById("select_amenities_list1").innerHTML = '';
    document.getElementById("select_amenities_list2").innerHTML = '';
    for (let i = 0; i < all_hotel_amenity_options.length; i++) {
        if (i >= (all_hotel_amenity_options.length / 2)) {
            document.getElementById("select_amenities_list2").innerHTML +=
                `
                <div style="padding: 5px;">
                    <input class="each_amenity_from_add_amenity_from_list" style="margin-right: 5px;" id="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list" type="checkbox" value="${all_hotel_amenity_options[i]}"/>
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list">${all_hotel_amenity_options[i]}</label>
                </div>
            `;
        } else {
            document.getElementById("select_amenities_list1").innerHTML +=
                `
                <div style="padding: 5px;">
                    <input class="each_amenity_from_add_amenity_from_list" style="margin-right: 5px;" id="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list" type="checkbox"  value="${all_hotel_amenity_options[i]}"/>
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list">${all_hotel_amenity_options[i]}</label>
                </div>
            `;
        }
    }
}

function get_all_select_amenities_values_from_add_from_list_options() {
    Array.from(document.querySelectorAll('.each_amenity_from_add_amenity_from_list')).forEach(each => {
        if (each.checked)
            new_hotel_amenities_list_to_save.items.push(each.value);
    });
}

async function save_all_amenities_selected_from_list() {
    get_all_select_amenities_values_from_add_from_list_options();
    //console.log(new_hotel_amenities_list_to_save);
    await update_amenities_selected_from_all_list();
    add_all_amenity_options_to_select_from_list()
}

function update_amenities_selected_from_all_list() {
    // 
    return $.ajax({
        type: "POST",
        url: `/add_new_amenities_as_list/${localStorage.getItem("ANDSBZID")}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(new_hotel_amenities_list_to_save),
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err;
        }
    });
}

add_all_amenity_options_to_select_from_list();

function toggle_show_edit_amenity_info_form(elem_id) {
    $("#logged_in_hotel_edit_amenity_info_form").toggle("up");
    $("#" + elem_id).toggle("up")
}

function toggle_hide_edit_amenity_info_form() {
    toggle_show_edit_amenity_info_form(current_amenity_edit_elem_id)
}

function start_edit_amenity_info(elem_id, txt_span_elem_id, info, title) {

    if (document.getElementById("logged_in_hotel_edit_amenity_info_form").style.display === "none") {
        toggle_show_edit_amenity_info_form(elem_id)
    } else {
        $("#" + elem_id).toggle("up");
        if (current_amenity_edit_elem_id) {
            $("#" + current_amenity_edit_elem_id).toggle("up");
        }
    }
    current_amenity_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_amenity_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_amenity_form_input").value = info;

    if (info === "") {
        current_edited_amenity_obj = {
            edit_type: "add new",
            old_amenity: "",
            text_span_elem_id: ""
        }
    } else {
        current_edited_amenity_obj = {
            edit_type: "edit old",
            old_amenity: info,
            text_span_elem_id: txt_span_elem_id
        }
    }

}

function start_edit_service_info(elem_id, txt_span_elem_id, info, title) {

    if (document.getElementById("logged_in_hotel_edit_service_info_form").style.display === "none") {
        toggle_show_edit_service_info_form(elem_id)
    } else {
        $("#" + elem_id).toggle("up");
        if (current_service_edit_elem_id) {
            $("#" + current_service_edit_elem_id).toggle("up");
        }
    }
    current_service_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_service_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_service_form_input").value = info;

    if (info === "") {
        current_edited_amenity_obj = {
            edit_type: "add new",
            old_amenity: "",
            text_span_elem_id: ""
        }
    } else {
        current_edited_amenity_obj = {
            edit_type: "edit old",
            old_amenity: info,
            text_span_elem_id: txt_span_elem_id
        }
    }

}

function delete_amenity_submit(elem_id, amenity) {
    remove_amenity(elem_id, amenity, window.localStorage.getItem("ANDSBZID"));
}

async function add_new_amenity_onclick() {

    if (document.getElementById("logged_in_hotel_edit_amenity_form_input").value === "") {
        document.getElementById("logged_in_hotel_edit_amenity_form_input").placeholder = "please enter new amenity";
        document.getElementById("logged_in_hotel_edit_amenity_form_input").focus();
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let new_amenity = document.getElementById("logged_in_hotel_edit_amenity_form_input").value;
    if (current_edited_amenity_obj.edit_type === "add new") {
        let returned_amenities = await add_new_amenity(new_amenity, window.localStorage.getItem("ANDSBZID"));

        if (document.getElementById("no_amenities_to_display_msg"))
            document.getElementById("no_amenities_to_display_msg").style.display = "none";
        document.getElementById("logged_in_hotel_amenities_list").innerHTML += render_each_hotel_amenity(returned_amenities[returned_amenities.length - 1]);
        toggle_hide_show_anything("logged_in_hotel_edit_amenity_info_form");
        toggle_hide_show_anything("logged_in_hotel_add_amenity_btn");
        document.getElementById("full_screen_loader").style.display = "none";

    } else {
        let returned_amenity = await update_existing_amenity(current_edited_amenity_obj.old_amenity, new_amenity, window.localStorage.getItem("ANDSBZID"));
        /*document.getElementById(current_edited_amenity_obj.text_span_elem_id).innerText = returned_amenity;
        if(current_amenity_edit_elem_id){
            $("#"+current_amenity_edit_elem_id).toggle("up");
            document.getElementById(current_amenity_edit_elem_id).id = `logged_in_hotel_${returned_amenity.replaceAll(" ","_")}_amenity`;
        }*/
        document.getElementById("logged_in_hotel_amenities_list").innerHTML += render_each_hotel_amenity(returned_amenity);
        toggle_hide_show_anything("logged_in_hotel_edit_amenity_info_form");
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

async function all_amenities_update_existing_amenity(all_amenities_each_amenity_elem_id, amenity_input_id, old_amenity) {

    if (document.getElementById(amenity_input_id).value === "") {
        document.getElementById(amenity_input_id).focus();
        document.getElementById(amenity_input_id).placeholder = "this input field cant be empty";
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let new_amenity = document.getElementById(amenity_input_id).value;
    let returned_amenity = await update_existing_amenity(old_amenity, new_amenity, window.localStorage.getItem("ANDSBZID"));
    document.getElementById(all_amenities_each_amenity_elem_id).innerHTML = all_amenities_return_each_amenity_markup_after_update(returned_amenity);
    document.getElementById(all_amenities_each_amenity_elem_id).id = `logged_in_hotel_all_amenities_${returned_amenity.replaceAll(" ", "_").trim()}_amenity`;
    document.getElementById("full_screen_loader").style.display = "none";
}

async function all_services_update_existing_service(all_services_each_service_elem_id, service_input_id, price_input_id, prop_input_id, old_service) {

    if (document.getElementById(service_input_id).value === "") {
        document.getElementById(service_input_id).focus();
        document.getElementById(service_input_id).placeholder = "this input field cant be empty";
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let new_service = document.getElementById(service_input_id).value;
    let new_price = document.getElementById(price_input_id).value;
    let new_prop = document.getElementById(prop_input_id).value;
    let returned_service = await update_existing_service(old_service, new_service, new_price, new_prop, window.localStorage.getItem("ANDSBZID"));
    document.getElementById(all_services_each_service_elem_id).innerHTML = await all_services_return_each_service_markup_after_update(returned_service);
    document.getElementById(all_services_each_service_elem_id).id = `logged_in_hotel_all_services_${returned_service.name.replaceAll(" ", "_").trim()}_service`;
    document.getElementById("full_screen_loader").style.display = "none";
}

async function all_facilities_update_existing_facility(all_facilities_each_facility_elem_id, facility_input_id, price_input_id, prop_input_id, old_facility) {

    if (document.getElementById(facility_input_id).value === "") {
        document.getElementById(facility_input_id).focus();
        document.getElementById(facility_input_id).placeholder = "this input field cant be empty";
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let new_facility = document.getElementById(facility_input_id).value;
    let new_price = document.getElementById(price_input_id).value;
    let new_prop = document.getElementById(prop_input_id).value;
    let returned_facility = await update_existing_facility(old_facility, new_facility, new_price, new_prop, window.localStorage.getItem("ANDSBZID"));
    document.getElementById(all_facilities_each_facility_elem_id).innerHTML = await all_facilities_return_each_facility_markup_after_update(returned_facility);
    document.getElementById(all_facilities_each_facility_elem_id).id = `logged_in_hotel_all_facilities_${returned_facility.name.replaceAll(" ", "_").trim()}_facility`;
    document.getElementById("full_screen_loader").style.display = "none";
}

function all_amenities_start_edit_amenity_info(elem_id, info, title) {
    toggle_hide_show_anything("logged_in_hotel_all_amenities_edit_" + info.replaceAll(" ", "_") + "_amenity_info_form");
    document.getElementById("logged_in_hotel_all_amenities_edit_" + info.replaceAll(" ", "_") + "_amenity_form_title").innerText = title;
    document.getElementById("logged_in_hotel_all_amenities_edit_" + info.replaceAll(" ", "_") + "_amenity_form_input").value = info;
}

function all_services_start_edit_service_info(elem_id, info, title) {
    toggle_hide_show_anything("logged_in_hotel_all_services_edit_" + info.replaceAll(" ", "_") + "_service_info_form");
    document.getElementById("logged_in_hotel_all_services_edit_" + info.replaceAll(" ", "_") + "_service_form_title").innerText = title;
    document.getElementById("logged_in_hotel_all_services_edit_" + info.replaceAll(" ", "_") + "_service_form_input").value = info;
}

function all_facilities_start_edit_facility_info(elem_id, info, title) {
    toggle_hide_show_anything("logged_in_hotel_all_facilities_edit_" + info.replaceAll(" ", "_") + "_facility_info_form");
    document.getElementById("logged_in_hotel_all_facilities_edit_" + info.replaceAll(" ", "_") + "_facility_form_title").innerText = title;
    document.getElementById("logged_in_hotel_all_facilities_edit_" + info.replaceAll(" ", "_") + "_facility_form_input").value = info;
}

function toggle_show_all_amenities() {
    $("#all_amenities_list_container").toggle("up");
}

function show_all_amenities() {
    toggle_show_all_amenities();
    render_all_logged_in_hotel_amenities();
}

async function all_amenities_add_new_amenity() {

    document.getElementById("full_screen_loader").style.display = "flex";
    let input_elem = document.getElementById("logged_in_hotel_all_amenities_add_new_amenity_form_input");
    let new_amenity = input_elem.value

    if (new_amenity === "") {
        input_elem.focus();
        input_elem.placeholder = "please enter new amenity";
        document.getElementById("full_screen_loader").style.display = "none";
    } else {
        let return_res = await add_new_amenity(new_amenity, window.localStorage.getItem("ANDSBZID"));
        document.getElementById("full_screen_loader").style.display = "none";
        input_elem.value = "";
        //alert("new amenity added!");
        render_all_logged_in_hotel_amenities();
    }
}

async function all_services_add_new_service() {

    document.getElementById("full_screen_loader").style.display = "flex";
    let input_elem = document.getElementById("logged_in_hotel_all_services_add_new_service_form_input");
    let prop_input_elem = document.getElementById("logged_in_hotel_all_services_add_new_service_property_input");
    let price_input_elem = document.getElementById("logged_in_hotel_all_services_add_new_service_price_form_input");
    let new_service = input_elem.value
    let price = price_input_elem.value;
    let property = prop_input_elem.value;

    price = price ? parseFloat(price) : 0;

    if (new_service === "") {
        input_elem.focus();
        input_elem.placeholder = "please enter new service";
        document.getElementById("full_screen_loader").style.display = "none";
    } else {
        let return_res = await add_new_service(new_service, price, property, window.localStorage.getItem("ANDSBZID"));
        document.getElementById("full_screen_loader").style.display = "none";
        input_elem.value = "";
        //alert("new amenity added!");
        render_all_logged_in_hotel_services();
    }
}

async function all_facilities_add_new_facility() {

    document.getElementById("full_screen_loader").style.display = "flex";
    let input_elem = document.getElementById("logged_in_hotel_all_facilities_add_new_facility_form_input");
    let prop_input_elem = document.getElementById("logged_in_hotel_all_facilities_add_new_facility_property_input");
    let price_input_elem = document.getElementById("logged_in_hotel_all_facilities_add_new_facility_price_form_input");
    let new_facility = input_elem.value
    let price = price_input_elem.value;
    let property = prop_input_elem.value;

    price = price ? parseFloat(price) : 0;

    if (new_facility === "") {
        input_elem.focus();
        input_elem.placeholder = "please enter new facility";
        document.getElementById("full_screen_loader").style.display = "none";
    } else {
        let return_res = await add_new_facility(new_facility, price, property, window.localStorage.getItem("ANDSBZID"));
        document.getElementById("full_screen_loader").style.display = "none";
        input_elem.value = "";
        //alert("new amenity added!");
        render_all_logged_in_hotel_facilities();
    }
}

function toggle_show_select_all_amenities_from_list_div() {
    $("#add_amenities_from_list_div").toggle("up");
}

function add_new_amenity(amenity, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/add_new_amenity/" + hotel_id + "?amenity=" + amenity,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err
        }
    });
}

function add_new_service(service, price, property, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/add_new_service/" + hotel_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            price,
            property,
            service
        }),
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err
        }
    });
}

function add_new_facility(facility, price, property, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/add_new_facility/" + hotel_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            price,
            property,
            facility
        }),
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err
        }
    });
}

function update_existing_amenity(old_amenity, new_amenity, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/update_amenity/" + hotel_id + "?new_amenity=" + new_amenity + "&old_amenity=" + old_amenity,
        success: res => {
            //console.log(res);
            if (document.getElementById("no_amenities_to_display_msg"))
                document.getElementById("no_amenities_to_display_msg").style.display = "none";
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function update_existing_service(old_service, new_service, new_price, new_property, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/update_service/" + hotel_id,
        dataType: 'json',
        contentType: 'application/json; charset=uft-8',
        data: JSON.stringify({
            new_service,
            old_service,
            new_price,
            new_property
        }),
        success: res => {
            /*/console.log(res);
            if (document.getElementById("no_amenities_to_display_msg"))
                document.getElementById("no_amenities_to_display_msg").style.display = "none";*/
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function update_existing_facility(old_facility, new_facility, new_price, new_property, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/update_facility/" + hotel_id,
        dataType: 'json',
        contentType: 'application/json; charset=uft-8',
        data: JSON.stringify({
            new_facility,
            old_facility,
            new_price,
            new_property
        }),
        success: res => {
            /*/console.log(res);
            if (document.getElementById("no_amenities_to_display_msg"))
                document.getElementById("no_amenities_to_display_msg").style.display = "none";*/
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function remove_amenity(elem_id, amenity, hotel_id) {
    $.ajax({
        type: "DELETE",
        url: "/remove_amenity/" + hotel_id + "?q_amenity=" + amenity,
        success: res => {
            //console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function remove_service(elem_id, service, hotel_id) {
    $.ajax({
        type: "DELETE",
        url: "/remove_service/" + hotel_id + "?q_service=" + service,
        success: res => {
            //console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function remove_facility(elem_id, facility, hotel_id) {
    $.ajax({
        type: "DELETE",
        url: "/remove_facility/" + hotel_id + "?q_facility=" + facility,
        success: res => {
            //console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function all_amenities_remove_each_amenity(elem_id_param, amenity_param) {
    remove_amenity(elem_id_param, amenity_param, window.localStorage.getItem("ANDSBZID"));
}

function all_services_remove_each_service(elem_id_param, service_param) {
    remove_service(elem_id_param, service_param, window.localStorage.getItem("ANDSBZID"));
}

function all_facilities_remove_each_facility(elem_id_param, facility_param) {
    remove_facility(elem_id_param, facility_param, window.localStorage.getItem("ANDSBZID"));
}

function get_all_amenities(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_amenities/" + hotel_id,
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

function get_all_services(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_services/" + hotel_id,
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

function get_all_facilities(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_facilities/" + hotel_id,
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

async function render_all_logged_in_hotel_amenities() {

    document.getElementById("all_hotel_amenities_list").innerHTML = ``;
    let all_amenities = await get_all_amenities(window.localStorage.getItem("ANDSBZID"));

    if (all_amenities.length > 0) {
        for (let i = 0; i < all_amenities.length; i++) {
            document.getElementById("all_hotel_amenities_list").innerHTML += all_amenities_return_each_amenity_markup(all_amenities[i]);
        }
    } else {
        document.getElementById("all_hotel_amenities_list").innerHTML = `
            <div style="border: 1px solid red; background-color: rgba(0,0,0,0.5); padding: 20px; text-align: center; font-size: 14px; color: white;">
                <i style="color: red; margin-right: 10px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                You don't have any amenities
            </div>`;
    }

}

async function render_all_logged_in_hotel_services() {

    document.getElementById("all_hotel_services_list").innerHTML = ``;
    let all_services = await get_all_services(window.localStorage.getItem("ANDSBZID"));

    if (all_services.length > 0) {
        for (let i = 0; i < all_services.length; i++) {
            document.getElementById("all_hotel_services_list").innerHTML += await all_services_return_each_service_markup(all_services[i]);
        }
    } else {
        document.getElementById("all_hotel_services_list").innerHTML = `
            <div style="border: 1px solid red; background-color: rgba(0,0,0,0.5); padding: 20px; text-align: center; font-size: 14px; color: white;">
                <i style="color: red; margin-right: 10px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                You don't have any services
            </div>`;
    }

}

async function render_all_logged_in_hotel_facilities() {

    document.getElementById("all_hotel_facilities_list").innerHTML = ``;
    let all_facilities = await get_all_facilities(window.localStorage.getItem("ANDSBZID"));

    if (all_facilities.length > 0) {
        for (let i = 0; i < all_facilities.length; i++) {
            document.getElementById("all_hotel_facilities_list").innerHTML += await all_facilities_return_each_facility_markup(all_facilities[i]);
        }
    } else {
        document.getElementById("all_hotel_facilities_list").innerHTML = `
            <div style="border: 1px solid red; background-color: rgba(0,0,0,0.5); padding: 20px; text-align: center; font-size: 14px; color: white;">
                <i style="color: red; margin-right: 10px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                You don't have any services
            </div>`;
    }

}

function all_amenities_return_each_amenity_markup(amenity) {
    return `
        <div id="logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity" class="logged_in_hotel_amenity" style="background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 5px;">
            <p>
                <span style="font-size: 14px; color: white;">
                    <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${amenity} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                    - all properies</span>
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="all_amenities_start_edit_amenity_info('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}', 'Edit Amenity');" style="color: rgb(85, 188, 226); margin-right: 20px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
                <p id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
                </p>
                <div style="display: flex;">
                    <input id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input" style="padding: 10px; width: 50%; border: none;" type="text" placeholder="type amenity here" value="" />
                    <select style="padding: 10px; width: calc(50% - 24px); border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                        <option>all properties</option>
                    </select>
                </div>
                
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_amenities_update_existing_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', 'logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Save
                    </div>
                    <div onclick="toggle_hide_show_anything('logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
            <div id="delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
                <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_amenities_remove_each_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

function all_amenities_return_each_amenity_markup_after_update(amenity) {
    return `
        <p>
            <span style="font-size: 14px; color: white;">
                <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                ${amenity} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                - all properies</span>
            </span>
            <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                <i onclick="all_amenities_start_edit_amenity_info('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}', 'Edit Amenity');" style="color: rgb(85, 188, 226); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                <i  onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </p>
        <div id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
            <p id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
            </p>
            <div style="display: flex;">
                <input id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input" style="padding: 10px; width: 50%; border: none;" type="text" placeholder="type amenity here" value="" />
                <select style="padding: 10px; width: calc(50% - 24px); border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                    <option>all properties</option>
                </select>
            </div>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                <div onclick="all_amenities_update_existing_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', 'logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Save
                </div>
                <div onclick="toggle_hide_show_anything('logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
        <div id="delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
            <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                <div onclick="all_amenities_remove_each_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
}

async function all_services_return_each_service_markup_after_update(service_p) {
    let service = service_p.name;
    let property = service_p.property;
    let prop_obj;
    if(property !== "all"){
        prop_obj = await get_and_return_hotel_property_by_id(property);
        property = `${prop_obj.city} - ${prop_obj.street_address} (${prop_obj.country})`;
    }
    property = (property==="all") ? `all properties` : property;
    let price = service_p.price;
    return `
        <p>
            <span style="font-size: 14px; color: white;">
                <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                ${service} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                - ${property} - $${price}</span>
            </span>
            <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                <i onclick="all_services_start_edit_service_info('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', '${service}', 'Edit Service');" style="color: rgb(85, 188, 226); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                <i  onclick="toggle_hide_show_anything('delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </p>
        <div id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
            <p id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
            </p>
            <div style="display: flex;">
                <input id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_input" style="padding: 10px; width: 40%; border: none;" type="text" placeholder="type service name here" value="" />
                <input id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_price_form_input" style="padding: 10px; width: calc(25% - 24px); border: none;border-left: 1px solid rgba(0,0,0,0.4);" type="number" placeholder="price in USD" value="${price}" />
                <select id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_property_form_input" style="padding: 10px; width: 35%; border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                    <option value="all">all properties</option>
                </select>
            </div>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                <div onclick="all_services_update_existing_service('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_input', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_price_form_input', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_property_form_input', '${service}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Save
                </div>
                <div onclick="toggle_hide_show_anything('logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
        <div id="delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
            <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                <div onclick="all_services_remove_each_service('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', '${service}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
}

async function all_facilities_return_each_facility_markup_after_update(facility_p) {
    let facility = facility_p.name;
    let property = facility_p.property;
    let prop_obj;
    if(property !== "all"){
        prop_obj = await get_and_return_hotel_property_by_id(property);
        property = `${prop_obj.city} - ${prop_obj.street_address} (${prop_obj.country})`;
    }
    property = (property==="all") ? `all properties` : property;
    let price = facility_p.price;
    return `
        <p>
            <span style="font-size: 14px; color: white;">
                <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                ${facility} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                - ${property} - $${price}</span>
            </span>
            <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                <i onclick="all_facilities_start_edit_facility_info('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', '${facility}', 'Edit Facility');" style="color: rgb(85, 188, 226); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                <i  onclick="toggle_hide_show_anything('delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </p>
        <div id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
            <p id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
            </p>
            <div style="display: flex;">
                <input id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_input" style="padding: 10px; width: 40%; border: none;" type="text" placeholder="type facility name here" value="" />
                <input id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_price_form_input" style="padding: 10px; width: calc(25% - 24px); border: none;border-left: 1px solid rgba(0,0,0,0.4);" type="number" placeholder="price in USD" value="${price}" />
                <select id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_property_form_input" style="padding: 10px; width: 35%; border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                    <option value="all">all properties</option>
                </select>
            </div>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                <div onclick="all_facilities_update_existing_facility('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_input', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_price_form_input', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_property_form_input', '${facility}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Save
                </div>
                <div onclick="toggle_hide_show_anything('logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
        <div id="delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
            <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                <div onclick="all_facilities_remove_each_facility('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', '${facility}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
}

async function all_services_return_each_service_markup(service_p) {
    let service = service_p.name;
    let property = service_p.property;
    let prop_obj;
    if(property !== "all"){
        prop_obj = await get_and_return_hotel_property_by_id(property);
        property = `${prop_obj.city} - ${prop_obj.street_address} (${prop_obj.country})`;
    }
    property = (property==="all") ? `all properties` : property;
    let price = service_p.price;
    return `
        <div id="logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service" class="logged_in_hotel_amenity" style="background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 5px;">
            <p>
                <span style="font-size: 14px; color: white;">
                    <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${service} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                    - ${property} - $${price}</span>
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="all_services_start_edit_service_info('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', '${service}', 'Edit Service');" style="color: rgb(85, 188, 226); margin-right: 20px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
                <p id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
                </p>
                <div style="display: flex;">
                    <input id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_input" style="padding: 10px; width: 40%; border: none;" type="text" placeholder="type service name here" value="" />
                    <input id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_price_form_input" style="padding: 10px; width: calc(25% - 24px); border: none;border-left: 1px solid rgba(0,0,0,0.4);" type="number" placeholder="price in USD" value="${price}" />
                    <select id="logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_property_form_input" style="padding: 10px; width: 35%; border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                        <option value="all">all properties</option>
                    </select>
                </div>
                
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_services_update_existing_service('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_form_input', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_price_form_input', 'logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_property_form_input','${service}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Save
                    </div>
                    <div onclick="toggle_hide_show_anything('logged_in_hotel_all_services_edit_${service.replaceAll(" ", "_").trim()}_service_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
            <div id="delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
                <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_services_remove_each_service('logged_in_hotel_all_services_${service.replaceAll(" ", "_").trim()}_service', '${service}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete__all_services_${service.replaceAll(" ", "_").trim()}_services_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}
//let some_services = ['Car Rental Services', 'Mail Services', 'Massages', 'Room Service', 'Dry Cleaning'];
/*document.getElementById("all_hotel_services_list").innerHTML='';
some_services.forEach(each=>{
    document.getElementById("all_hotel_services_list").innerHTML+=all_services_return_each_service_markup(each);
});*/

async function all_facilities_return_each_facility_markup(facility_p) {
    let facility = facility_p.name;
    let property = facility_p.property;
    let prop_obj;
    if(property !== "all"){
        prop_obj = await get_and_return_hotel_property_by_id(property);
        property = `${prop_obj.city} - ${prop_obj.street_address} (${prop_obj.country})`;
    }
    property = (property==="all") ? `all properties` : property;
    let price = facility_p.price;
    return `
        <div id="logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility" class="logged_in_hotel_amenity" style="background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 5px;">
            <p>
                <span style="font-size: 14px; color: white;">
                    <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${facility} <span style="color: rgba(255,255,255,0.5);font-size: 13px;">
                    - ${property} - $${price}</span>
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="all_facilities_start_edit_facility_info('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', '${facility}', 'Edit Facility');" style="color: rgb(85, 188, 226); margin-right: 20px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog')" style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
                <p id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_title" style="display: block; text-align: center; margin-bottom: 10px; font-size: 14px;">
                </p>
                <div style="display: flex;">
                    <input id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_input" style="padding: 10px; width: 40%; border: none;" type="text" placeholder="type facility name here" value="" />
                    <input id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_price_form_input" style="padding: 10px; width: calc(25% - 24px); border: none;border-left: 1px solid rgba(0,0,0,0.4);" type="number" placeholder="price in USD" value="${price}" />
                    <select id="logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_property_form_input" style="padding: 10px; width: 35%; border: none; border-left: 1px solid rgba(0,0,0,0.4);">
                        <option value="all">all properties</option>
                    </select>
                </div>
                
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_facilities_update_existing_facility('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_form_input', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_price_form_input', 'logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_property_form_input', '${facility}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Save
                    </div>
                    <div onclick="toggle_hide_show_anything('logged_in_hotel_all_facilities_edit_${facility.replaceAll(" ", "_").trim()}_facility_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: brown; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
            <div id="delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
                <p style="font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                    <div onclick="all_facilities_remove_each_facility('logged_in_hotel_all_facilities_${facility.replaceAll(" ", "_").trim()}_facility', '${facility}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete__all_facilities_${facility.replaceAll(" ", "_").trim()}_facilities_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}
/*let some_facilites = ['Bar', 'Computer Facility', 'Pet Friendly', 'Smoking Rooms', 'Lounge'];
document.getElementById("all_hotel_facilities_list").innerHTML='';
some_facilites.forEach(each=>{
    document.getElementById("all_hotel_facilities_list").innerHTML+=all_facilities_return_each_facility_markup(each);
});*/
