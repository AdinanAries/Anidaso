var logged_in_hotel_ratings_area = document.getElementById("logged_in_hotel_ratings_area");
var logged_in_hotel_description_input = document.getElementById("logged_in_hotel_description_input");

var current_info_update_type = "name"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
var current_misc_edit_elem_id;
var current_contact_edit_elem_id;
var current_amenity_edit_elem_id;
var current_edited_amenity_obj;
var current_op_cities_edit_elem_id;

var all_hotel_amenity_options = [
    "Business Center",
    "Coffee Shop",
    "Disabled Facilities",
    "Wheelchair Accessible Elevators",
    "Handrails Bathroom",
    "Adapt Room Doors",
    "Wheelchair Accessible Room",
    "Wheelchair Accessible Public Area",
    "Baby-Sitting",
    "Internet Hotspots",
    "Free Internet",
    "Laundry Service",
    "Air Conditioning",
    "Hair Dryer",
    "Non Smoking Rooms",
    "Direct Dial Phone",
    "Television",
    "Wi-fi in Room",
    "First Aid Staf",
    "Interior Room Entry",
    "Emergency Lighting",
    "Fire Detectors",
    "Extinguishers",
    "Fire Safety",
    "Restricted Public Access",
    "Safe Deposit Box",
    "Smoke Detector",
    "Sprinklers",
    "Video Surveilance",
    "Fitness Center",
]

function add_all_amenity_options_to_select_from_list(){
    for(let i=0; i < all_hotel_amenity_options.length; i++){
        if(i > (all_hotel_amenity_options.length/2)){
            document.getElementById("select_amenities_list2").innerHTML += 
            `
                <div style="padding: 5px;">
                    <input style="margin-right: 5px;" id="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list">${all_hotel_amenity_options[i]}</label>
                </div>
            `; 
        }else{
            document.getElementById("select_amenities_list1").innerHTML += 
            `
                <div style="padding: 5px;">
                    <input style="margin-right: 5px;" id="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list" type="checkbox" />
                    <label style="font-size: 14px; color: white; letter-spacing: 1px;" for="${all_hotel_amenity_options[i].replaceAll(" ", "_").trim()}_amenity_from_add_from_list">${all_hotel_amenity_options[i]}</label>
                </div>
            `; 
        }
    }
}

add_all_amenity_options_to_select_from_list();

var cheap_hotel_building = {
    hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
      full_location_address: "2122 Estate Junc, Sepe Tinpom, Kumasi, Ghana",
      city: "Kumasi",
      country: "Ghana",
      zipcode: "1121",
      street_address: "2122 Estate Junc",
      town: "Sepe Tinpom",
      description: "This branch is one of our main focul points when serving international clientell. It has all the needed services to ensure QOS for our clients.",
      amenities: [
          "Free Wifi", "Cable", "Other"
      ]
};

var cheap_hotel_room = {
    property_id: "607304a562a84645bccdf40b",
    hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
    room_number: "4D",
    closed: "false",
    booked: "false",
    room_type: "Delux",
    room_link: "https://anidaso.com/p=607304a562a84645bccdf40b&b=6063dd3fb6dfe50bc800dd5f&r=4D",
    guest_capacitance: {
    adults: 1,
    children: 4
    },
    price: 47.00,
    description: "This room is one of our main focul points when serving international clientell. It has all the needed services to ensure QOS for our clients.",
    amenities: [
        "Free Wifi", "Cable", "Other"
    ],
    next_available_date: "3-5-2020",
    next_available_time:  "10:15",
    cancellation_policy: {
    time_period: 14,
    percentage: 50,
    },
    photo_url: "./images/hotel_pic.png",
    cancellation_requests: []
};

function return_cheap_hotel_rating_markup(rating_number = 1){

    let rating_remark;

    if(rating_number === 1){
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Worst)
        `;
    }else if(rating_number === 2){
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Bad)
        `;
    }else if(rating_number === 3){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Average)
        `;
    }else if(rating_number === 4){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Good)
        `;
    }else if(rating_number === 5){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Excellent)
        `;
    }

    let rating_percentage = (rating_number * 20)

    return `
            <p style="margin-top: 10px; margin-bottom: 5px; color: aliceblue; font-weight: bolder; font-size: 13px; letter-spacing: 1px;">
                    Your Rating 
                    <span style="font-size: 12px; color: rgb(137, 204, 235); margin-left: 10px;">
                        ${rating_remark}
                    </span>
                </p>
            <div style="width: 250px; background: linear-gradient(to right, rgb(201, 43, 15), tomato, rgb(206, 255, 71),rgb(88, 236, 51),rgb(6, 175, 14));">
                <div style="padding: 3px; border-right: black 4px solid; width: calc(${rating_percentage}% - 12px);">
                    <p style="font-size: 12px; font-weight: bolder; text-align: right;">${rating_percentage}%</p>
                </div>
            </div>
            <div style="width: 250px; height: 40px; display: flex; flex-direction: row !important; margin: 10px 0;">
                <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <div style="background-color: rgb(201, 43, 15);  height: 20%;"></div>
                </div>
                <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <div style="background-color: tomato; height: 40%;"></div>
                </div>
                <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <div style="background-color: rgb(206, 255, 71); height: 60%;"></div>
                </div>
                <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <div style="background-color: rgb(88, 236, 51); height: 80%;"></div>
                </div>
                <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <div style="background-color: rgb(6, 175, 14); height: 100%;"></div>
                </div>
            </div>
    `;
}

async function update_description_info_onsubmit(){
    let elem = document.getElementById("logged_in_hotel_description_input");

    if(elem.value === ""){
        elem.focus();
        elem.placeholder = "please enter description";
    }else{
        document.getElementById("full_screen_loader").style.display = "flex";
        let returned_description = await update_info_item("description", elem.value, window.localStorage.getItem("ANDSBZID"));
        display_logged_in_hotel_description(returned_description);
        toggle_show_edit_desc_info_form();
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for misc info
function toggle_show_edit_mis_info_form(elem_id){
    $("#logged_in_hotel_edit_misc_info_form").toggle("up");
    $("#"+elem_id).toggle("up");
}

function toggle_hide_edit_mis_info_form(){
    toggle_show_edit_mis_info_form(current_misc_edit_elem_id)
}

function start_edit_misc_info(elem_id, info, title){
    if(document.getElementById("logged_in_hotel_edit_misc_info_form").style.display === "none"){
        toggle_show_edit_mis_info_form(elem_id);
    }else{
        $("#"+elem_id).toggle("up");
        if(current_misc_edit_elem_id){
            $("#"+current_misc_edit_elem_id).toggle("up");
        }
    }
    current_misc_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_misc_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_misc_form_input").value = info;
    
    if(title === "Edit URL"){
        current_info_update_type = "web_url"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
    }else if(title === "Edit Office"){
        current_info_update_type = "office_location";
    }else if(title === "Edit Avg. Room Price"){
        current_info_update_type = "avg_price";
    }
}

async function update_misc_info_onsubmit(){
    let elem = document.getElementById("logged_in_hotel_edit_misc_form_input");

    if(elem.value === ""){
        elem.focus();
        elem.placeholder = "please enter information";
    }else{

        document.getElementById("full_screen_loader").style.display = "flex";

        let returned_misc = await update_info_item(current_info_update_type, elem.value, window.localStorage.getItem("ANDSBZID"));

        if(current_info_update_type === "web_url"){
            render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", returned_misc, "start_edit_misc_info");
        }
        if(current_info_update_type === "office_location"){
            render_each_loggin_hotel_info_item("logged_in_hotel_office_location_infor_item", "Office", returned_misc, "start_edit_misc_info");
        }
        if(current_info_update_type === "avg_price"){
            let avg_room_price = `$${returned_misc}`;
            render_each_loggin_hotel_info_item("logged_in_hotel_avg_price_infor_item", "Avg. Room Price", avg_room_price, "start_edit_misc_info");
        }

        if(current_misc_edit_elem_id){
            $("#"+current_misc_edit_elem_id).toggle("up");
        }
        $("#logged_in_hotel_edit_misc_info_form").toggle("up");
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for contacts info
function toggle_show_edit_contact_info_form(elem_id){
    $("#logged_in_hotel_edit_contact_info_form").toggle("up");
    $("#"+elem_id).toggle("up")
}

function toggle_hide_edit_contact_info_form(){
    toggle_show_edit_contact_info_form(current_contact_edit_elem_id)
}

function start_edit_contact_info(elem_id, info, title){
    if(document.getElementById("logged_in_hotel_edit_contact_info_form").style.display === "none"){
        toggle_show_edit_contact_info_form(elem_id)
    }else{
        $("#"+elem_id).toggle("up");
        if(current_contact_edit_elem_id){
            $("#"+current_contact_edit_elem_id).toggle("up");
        }
    }
    current_contact_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_contact_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_contact_form_input").value = info;

    if(title === "Edit Email"){
        current_info_update_type = "email"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
    }else if(title === "Edit Mobile"){
        current_info_update_type = "mobile";
    }else if(title === "Edit Fax"){
        current_info_update_type = "fax";
    }

}

async function update_contact_info_onsubmit(){

    document.getElementById("full_screen_loader").style.display = "flex";

    let elem = document.getElementById("logged_in_hotel_edit_contact_form_input");

    if(elem.value === ""){
        elem.focus();
        elem.placeholder = "please enter contact information";
    }else{
        let returned_contact = await update_info_item(current_info_update_type, elem.value, window.localStorage.getItem("ANDSBZID"));

        if(current_info_update_type === "email"){
            render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", returned_contact, "start_edit_contact_info");
        }
        if(current_info_update_type === "mobile"){
            render_each_loggin_hotel_info_item("logged_in_hotel_mobile_infor_item", "Mobile", returned_contact, "start_edit_contact_info");
        }
        if(current_info_update_type === "fax"){
            render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", returned_contact, "start_edit_contact_info");
        }

        if(current_contact_edit_elem_id){
            $("#"+current_contact_edit_elem_id).toggle("up");
        }
        $("#logged_in_hotel_edit_contact_info_form").toggle("up");
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for amenities info
function toggle_show_edit_amenity_info_form(elem_id){
    $("#logged_in_hotel_edit_amenity_info_form").toggle("up");
    $("#"+elem_id).toggle("up")
}

function toggle_hide_edit_amenity_info_form(){
    toggle_show_edit_amenity_info_form(current_amenity_edit_elem_id)
}

function start_edit_amenity_info(elem_id, txt_span_elem_id, info, title){

    if(document.getElementById("logged_in_hotel_edit_amenity_info_form").style.display === "none"){
        toggle_show_edit_amenity_info_form(elem_id)
    }else{
        $("#"+elem_id).toggle("up");
        if(current_amenity_edit_elem_id){
            $("#"+current_amenity_edit_elem_id).toggle("up");
        }
    }
    current_amenity_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_amenity_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_amenity_form_input").value = info;

    if(info === ""){
        current_edited_amenity_obj = {
            edit_type: "add new",
            old_amenity: "",
            text_span_elem_id: ""
        }
    }else{
        current_edited_amenity_obj = {
            edit_type: "edit old",
            old_amenity: info,
            text_span_elem_id: txt_span_elem_id
        }
    }

}

function delete_amenity_submit(elem_id, amenity){
    remove_amenity(elem_id, amenity, window.localStorage.getItem("ANDSBZID"));
}

async function add_new_amenity_onclick(){

    if(document.getElementById("logged_in_hotel_edit_amenity_form_input").value === ""){
        document.getElementById("logged_in_hotel_edit_amenity_form_input").placeholder = "please enter new amenity";
        document.getElementById("logged_in_hotel_edit_amenity_form_input").focus();
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let new_amenity = document.getElementById("logged_in_hotel_edit_amenity_form_input").value;
    if(current_edited_amenity_obj.edit_type === "add new"){
        let returned_amenities = await add_new_amenity(new_amenity, window.localStorage.getItem("ANDSBZID"));

        if(document.getElementById("no_amenities_to_display_msg"))
            document.getElementById("no_amenities_to_display_msg").style.display = "none";
        document.getElementById("logged_in_hotel_amenities_list").innerHTML += render_each_hotel_amenity(returned_amenities[returned_amenities.length - 1]); 
        toggle_hide_show_anything("logged_in_hotel_edit_amenity_info_form"); 
        toggle_hide_show_anything("logged_in_hotel_add_amenity_btn");
        document.getElementById("full_screen_loader").style.display = "none";
        
    }else{
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

async function all_amenities_update_existing_amenity(all_amenities_each_amenity_elem_id, amenity_input_id, old_amenity){

    if(document.getElementById(amenity_input_id).value === ""){
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

function all_amenities_start_edit_amenity_info(elem_id, info, title){
    toggle_hide_show_anything("logged_in_hotel_all_amenities_edit_"+info.replaceAll(" ", "_")+"_amenity_info_form");
    document.getElementById("logged_in_hotel_all_amenities_edit_"+info.replaceAll(" ", "_")+"_amenity_form_title").innerText = title;
    document.getElementById("logged_in_hotel_all_amenities_edit_"+info.replaceAll(" ", "_")+"_amenity_form_input").value = info;
}

//for operating cities info
function toggle_show_edit_op_cities_info_form(elem_id){
    $("#logged_in_hotel_edit_op_cities_info_form").toggle("up");
    $("#"+elem_id).toggle("up")
}

function toggle_hide_edit_op_cities_info_form(){
    toggle_show_edit_op_cities_info_form(current_op_cities_edit_elem_id)
}

function start_edit_op_cities_info(elem_id, info, title){
    if(document.getElementById("logged_in_hotel_edit_op_cities_info_form").style.display === "none"){
        toggle_show_edit_op_cities_info_form(elem_id)
    }else{
        $("#"+elem_id).toggle("up");
        if(current_op_cities_edit_elem_id){
            $("#"+current_op_cities_edit_elem_id).toggle("up");
        }
    }
    current_op_cities_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_op_cities_form_title").innerText = title;
    document.getElementById("register_cheap_hotels_location_text_field").value = info;

}

async function add_new_cities_op_onclick(){

    if(document.getElementById("register_cheap_hotels_location_text_field").value === ""){
        document.getElementById("register_cheap_hotels_location_text_field").placeholder = "please enter new city";
        document.getElementById("register_cheap_hotels_location_text_field").focus();
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let city = document.getElementById("register_cheap_hotels_location_text_field").value;
    let returned_cities = await add_new_cities_op(city, window.localStorage.getItem("ANDSBZID"));
    if(document.getElementById("no_cities_to_display_msg"))
        document.getElementById("no_cities_to_display_msg").style.display = "none";
    document.getElementById("logged_in_hotel_cities_op_list").innerHTML += render_each_operation_city(returned_cities[returned_cities.length - 1].city, returned_cities[returned_cities.length - 1].country);
        
    toggle_hide_show_anything("logged_in_hotel_edit_op_cities_info_form");
    toggle_hide_show_anything("logged_in_hotel_add_op_city_btn");
    document.getElementById("full_screen_loader").style.display = "none";
}

function delete_city_op_submit(elem_id, city){
    remove_city_op(elem_id, city, window.localStorage.getItem("ANDSBZID"));
}

function render_each_loggin_hotel_info_item(info_elem_item_id, title, info, func_name){
    document.getElementById(info_elem_item_id).innerHTML = `
        <p style="color: white; font-size: 14px;">
            <span style="color:aqua; font-size: 14px;">${title}:</span>
            ${info}
            <i onclick="${func_name}('${info_elem_item_id}', '${info}', 'Edit ${title}');" class="fa fa-pencil" aria-hidden="true"></i>
        </p>
    `;
}

//description infor funcs
var heightLimit = 200;

logged_in_hotel_description_input.oninput = function() {
    logged_in_hotel_description_input.style.height = ""; /* Reset the height*/
    logged_in_hotel_description_input.style.height = Math.min(logged_in_hotel_description_input.scrollHeight, heightLimit) + "px";
};

function toggle_show_edit_desc_info_form(){
    $("#logged_in_hotel_edit_desc_info_form").toggle("up");
    $("#logged_in_hotel_desc_info_txt_and_btn").toggle("up")

    setTimeout(()=>{
        logged_in_hotel_description_input.style.height = ""; /* Reset the height*/
        logged_in_hotel_description_input.style.height = Math.min(logged_in_hotel_description_input.scrollHeight, heightLimit) + "px";
    }, 500);
}

async function toggle_show_search_room_pane(){
    
    let rooms = await get_hotel_rooms(window.localStorage.getItem("ANDSBZID"))

    if(rooms){
        if((rooms.length === 0)){
            alert("You don't have any rooms in your account. Please add rooms first");
            toggle_show_add_room_pane();
            return null;
        }
    }else{
        alert("You don't have any rooms in your account. Please add rooms first");
        toggle_show_add_room_pane();
        return null;
    }

    document.getElementById("add_room_form_panel").style.display = "none";
    $("#search_room_panel").toggle("up");

}

async function toggle_show_add_room_pane(){
    document.getElementById("search_room_panel").style.display = "none";
    $("#add_room_form_panel").toggle("up");
    let properties = await get_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    if(properties){
        if(properties.length === 0){
            document.getElementById("add_room_form_properties_select").style.backgroundColor = "red";
            //document.getElementById("add_room_form_properties_select").addEventListener('click', toggle_show_add_hotel_property_pane);
            document.getElementById("add_room_form_properties_select").disabled = true;
            document.getElementById("add_room_form_properties_select").innerHTML = `
            <option>
                add a new propterty first
            </option>
            `
        }else{
            for(let i=0; i < properties.length; i++){
                document.getElementById("add_room_form_properties_select").innerHTML = `
                <option value="${properties[i]}">
                    ${properties[i]};
                </option>`;
            }
        }
    }else{

        document.getElementById("add_room_form_properties_select").style.backgroundColor = "red";
        //document.getElementById("add_room_form_properties_select").addEventListener('click', toggle_show_add_hotel_property_pane);
        document.getElementById("add_room_form_properties_select").disabled = true;
        document.getElementById("add_room_form_properties_select").innerHTML = `
            <option>
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px;"></i>
                add a new propterty first
            </option>
            `
    }
}

function add_new_hotel_room_func(){
    toggle_show_add_room_pane();
}

function edit_hotel_room_func(){
    toggle_show_add_room_pane();
}

function toggle_show_add_hotel_property_pane(){
    $("#add_hotel_property_form_panel").toggle("up");
}

function toggle_show_make_room_reservation_div(){
    $("#make_reservation_pane").toggle("up");
}

async function continue_room_reservation(){
    
    let rooms = await get_hotel_rooms(window.localStorage.getItem("ANDSBZID"))

    if(rooms){
        if((rooms.length === 0)){
            alert("You don't have any rooms in your account. Please add rooms first");
            toggle_show_add_room_pane();
            return null;
        }
    }else{
        alert("You don't have any rooms in your account. Please add rooms first");
        toggle_show_add_room_pane();
        return null;
    }

    toggle_show_make_room_reservation_div();
}

function view_and_edit_room(){
    toggle_show_search_room_pane();
}

function toggle_show_booked_rooms(){
    $("#booked_rooms_container").toggle("up");
}

async function toggle_show_all_hotel_properties(){

    let properties = await get_hotel_buildings(window.localStorage.getItem("ANDSBZID"))

    if(properties){
        if((properties.length === 0)){
            alert("You don't have any property in your account. Please add property first");
            toggle_show_add_hotel_property_pane();
            return null;
        }
    }else{
        alert("You don't have any property in your account. Please add property first");
        toggle_show_add_hotel_property_pane();
        return null;
    }

    $("#all_hotel_properties_container").toggle("up");

}

function toggle_show_all_hotel_property_rooms(){
    $("#hotel_property_all_rooms_container").toggle("up");
}

function show_all_hotel_property_rooms(property_id){
    toggle_show_all_hotel_property_rooms();
}

function toggle_show_all_amenities(){
    $("#all_amenities_list_container").toggle("up");
}

function show_all_amenities(){
    toggle_show_all_amenities();
    render_all_logged_in_hotel_amenities();
}

function toggle_show_select_all_amenities_from_list_div(){
    $("#add_amenities_from_list_div").toggle("up");
}

function toggle_show_all_cities(){
    $("#all_cities_list_container").toggle("up");
}

async function toggle_show_all_policies(){

    $("#all_policies_list_container").toggle("up");

    document.getElementById("all_hotel_policies_list").innerHTML = ``;

    let policies = await get_all_policies(window.localStorage.getItem("ANDSBZID"));

    if(policies){
        if(policies.length > 0){
            for(let i=0; i < policies.length; i++){
                document.getElementById("all_hotel_policies_list").innerHTML = all_policies_return_each_policy_markup(i, policies[i]);
            }
        }else{
            document.getElementById("all_hotel_policies_list").innerHTML = `
                <p class="logged_in_payments_card_display" style="margin-top: 10px; color: rgba(0,0,0,0.9);">
                    <i style="color: crimson; margin-right: 5px;" aria-hidden="true" class="fa fa-exclamation-triangle"></i>
                    <span style="font-weight: bolder; color: orangered; font-size: 14px;">You have not added any policies:</span>
                    Your hotel policies help inform your guests about restrictions and rules. 
                </p>
            `;
        }
    }
}

function all_policies_return_each_policy_markup(number, policy){
    return `
        <div id="all_logged_in_hotel_policies_${number}_policy">
            <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                <p class="logged_in_payments_card_display" style="margin-top: 10px; color: rgba(0,0,0,0.9);">
                    <span style="color: orangered; font-size: 14px; font-weight: bolder;">${policy.type}:</span>
                    ${policy.description} 
                </p>
                <span onclick="toggle_hide_show_anything('all_policies_delete_${number}_policy_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(158, 12, 12);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </div>
            <div id="all_policies_delete_${number}_policy_confirm_dialog" style="position: initial; margin: 10px 0; padding: 0; background: none; width: 100%;" class="confirm_delete_dialog">
                <p style="color:rgb(5, 44, 59); font-weight: bolder; font-size: 13px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="all_cities_op_remove_each_city_op('all_logged_in_hotel_policies_${number}_policy', '${policy.type}, ${policy.description.replaceAll("'", "@apostrophe@")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('all_policies_delete_${number}_policy_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `
}

function show_all_cities(){
    toggle_show_all_cities();
    render_all_logged_in_hotel_cities();
}

function toggle_hide_show_anything(elem_id){
    $("#"+elem_id).toggle("up");
}

function hotel_manager_logout(){
    window.localStorage.removeItem("ANDSBZID");
    document.location.href = "/listed_property_login.html"
}

//function to render hotel pictures
function display_logged_in_hotel_photos(pic1, pic2, pic3, pic4){

    document.getElementById("logged_in_hotel_main_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i  onclick="toggle_hide_show_anything('delete_main_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: auto; min-height: 300px; width: 100%;" src="${pic4}" alt="" />
        <div id="delete_main_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_main_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_first_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_first_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic1}" alt="" />
        <div id="delete_first_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_first_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_second_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_second_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic2}" alt="" />
        <div id="delete_second_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_second_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_third_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_third_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic3}" alt="" />
        <div id="delete_third_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_third_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_fourth_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_fourth_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic4}" alt="" />
        <div id="delete_fourth_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_fourth_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    
}

//function to render logged_hotel name
function display_logged_in_hotel_name(name, subs_status, prof_status){

    let top_nav_disp_name = name;
    let desc_disp_name = name;
    
    if(name.length > 18){
        top_nav_disp_name = name.substring(0, 15) + "...";
    }

    if(name.length > 22){
        desc_disp_name = name.substring(0, 19) + "...";
    }

    let subscription_status = `
        <span style="color:aqua; font-size: 14px;">Status:</span>
            not subscribed <i style="color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    `;

    if(subs_status){
        subscription_status = `
            <span style="color:aqua; font-size: 14px;">Status:</span>
                subscribed <i style="color: rgb(137, 235, 174);" class="fa fa-check" aria-hidden="true"></i>
        `;
    }

    let profile_status = `
        <span style="color:aqua; font-size: 14px;">Profile:</span>
            not verified <i style="color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    `;

    if(prof_status){
        profile_status = `
            <span style="color:aqua; font-size: 14px;">Profile:</span>
                verified <i style="color: rgb(137, 235, 174);" class="fa fa-check" aria-hidden="true"></i>
        `;
    }

    document.getElementById("main_top_nav_hotel_name_display").innerHTML = `
        <p style="cursor: pointer;">
        <i class="fa fa-building" aria-hidden="true"></i>${top_nav_disp_name}
        </p>
        <div id="top_nav_hotel_name_display_drop_down">
            <p onclick="hotel_manager_logout()" style="cursor: pointer; font-weight: initial; padding: 10px 0; font-size: 13px !important; text-align: center; width: 100%; border-radius: 4px; color: white; background-color: rgb(128, 0, 0);">
                <i style="margin-right: 5px; color:rgb(252, 26, 26);" class="fa fa-sign-in" aria-hidden="true"></i>
                Logout</p>
        </div>
    `;

    document.getElementById("logged_in_hotel_details_section_name_disp").innerText = desc_disp_name;
    document.getElementById("logged_in_hotel_details_section_subscription_status_disp").innerHTML = subscription_status;
    document.getElementById("logged_in_hotel_details_section_profile_status_disp").innerHTML = profile_status;
}

//function to render contacts information
function display_logged_in_hotel_description(desc){
    document.getElementById("logged_in_hotel_desc_info_txt").innerText = desc;
    document.getElementById("logged_in_hotel_description_input").innerText = desc;
    document.getElementById("logged_in_hotel_desc_info_txt_loader").style.display = "none";
}

//function to render each amenity
function render_each_hotel_amenity(amenity){
    return `
        <div id="logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px;">
                    <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    <span id="logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity_txt_span_elem" style="font-size: 14px;">
                    ${amenity}</span>
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="start_edit_amenity_info('logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity', 'logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity_txt_span_elem','${amenity}', 'Edit Amenity');" style="color: rgb(137, 204, 235); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete_${amenity.replaceAll(" ","_")}_aminties_confirm_dialog')" style="color: rgb(235, 137, 137);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="delete_${amenity.replaceAll(" ","_")}_aminties_confirm_dialog" style="position: initial; margin: 10px 0;" class="confirm_delete_dialog">
                <p style="font-size: 12px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="delete_amenity_submit('logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity', '${amenity}')" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete_${amenity.replaceAll(" ","_")}_aminties_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

//function to render each city operating in
function render_each_operation_city(city, country){
    return `
        <div id="logged_in_hote_${city.replaceAll(" ","_")}_${country.replaceAll(" ","_")}_city_Op" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px;">
                    <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${city}, ${country}
                </span>
                <span onclick="toggle_hide_show_anything('delete_${city.replaceAll(" ","_")}_${country.replaceAll(" ","_")}_city_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(235, 137, 137);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="delete_${city.replaceAll(" ","_")}_${country.replaceAll(" ","_")}_city_confirm_dialog" style="position: initial; margin: 10px 0;" class="confirm_delete_dialog">
                <p style="font-size: 12px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="delete_city_op_submit('logged_in_hote_${city.replaceAll(" ","_")}_${country.replaceAll(" ","_")}_city_Op', '${city}, ${country}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete_${city.replaceAll(" ","_")}_${country.replaceAll(" ","_")}_city_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

//function to render last added hotel policy
function render_logged_in_hotel_last_added_policy(policy){
    document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
        <p class="logged_in_payments_card_display" style="margin-top: 10px; color: white;">
            <span style="color:aqua; font-size: 14px;">${policy.type}:</span>
            ${policy.description} 
        </p>
    `;
}

//function to render hotel last review
function display_logged_in_hotel_last_review_rating(rating_number = 1){

    let rating_remark;
    let bar_color;

    if(rating_number === 1){
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Worst)
        `;
        bar_color = "rgb(201, 43, 15)";
    }else if(rating_number === 2){
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Bad)
        `;
        bar_color = "tomato";
    }else if(rating_number === 3){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Average)
        `;
        rgb(206, 255, 71)
    }else if(rating_number === 4){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Good)
        `;
        bar_color = "rgb(88, 236, 51)";
    }else if(rating_number === 5){
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Excellent)
        `;
        bar_color = "rgb(6, 175, 14)";
    }

    let rating_percentage = (rating_number * 20)

    document.getElementById("logged_in_hotel_last_review_rating").innerHTML = `
        <p style="margin-top: 10px; margin-bottom: 5px; color: aliceblue; font-weight: bolder; font-size: 13px; letter-spacing: 1px;">
        Rated <span style="font-size: 12px; color: rgb(137, 204, 235); margin-left: 10px;">
            ${rating_remark}
        </p>
        <div style="width: 250px; background-color: aliceblue;">
            <div style="padding: 3px; background-color: ${bar_color}; width: ${rating_percentage}%; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">
                <p style="color: white; font-size: 12px; font-weight: bolder; text-align: right;">${rating_percentage}%</p>
            </div>
        </div>
        <div style="width: 250px; height: 40px; display: flex; flex-direction: row !important; margin: 10px 0;">
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(201, 43, 15);  height: 20%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: tomato; height: 40%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(206, 255, 71); height: 60%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(88, 236, 51); height: 80%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(6, 175, 14); height: 100%;"></div>
            </div>
        </div>
    `;
}

//function to render last review
function display_logged_in_hotel_description_last_review(name, msg, pic_url, rating){

    document.getElementById("logged_in_hotel_last_reviewer_img").src = pic_url;
    document.getElementById("logged_in_hotel_last_reviewer_name").innerText = name;
    document.getElementById("logged_in_hotel_last_reviewer_msg").innerText = msg;

    display_logged_in_hotel_last_review_rating(rating);
}

//function to get all hotel information
function get_logged_in_hotel_infor(){

    let ANDSBZID = window.localStorage.getItem("ANDSBZID");

    $.ajax({
        type: "GET",
        url: `/get_logged_in_hotel_info/${ANDSBZID}`,
        success: data => {
            
            console.log(data);
            let avg_room_price = `$${data.price}`;

            let reviewer_name = data.reviews[data.reviews.length - 1].person;
            let reviewer_img = data.reviews[data.reviews.length - 1].image;
            let reviewer_rated = data.reviews[data.reviews.length - 1].rated;
            let reviewer_msg = data.reviews[data.reviews.length - 1].message;

            //basic info
            display_logged_in_hotel_name(data.name, data.subscribed ,data.approved);
            logged_in_hotel_ratings_area.innerHTML = return_cheap_hotel_rating_markup(data.rating);
            //contact info
            render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", data.email, "start_edit_contact_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_mobile_infor_item", "Mobile", data.mobile, "start_edit_contact_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", data.fax, "start_edit_contact_info");
            //misc info
            render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", data.url, "start_edit_misc_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_office_location_infor_item", "Office", data.location, "start_edit_misc_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_avg_price_infor_item", "Avg. Room Price", avg_room_price, "start_edit_misc_info");
            //description info
            display_logged_in_hotel_description(data.description);
            //last review
            display_logged_in_hotel_description_last_review(reviewer_name, reviewer_msg, reviewer_img, reviewer_rated);
            //amenities
            document.getElementById("logged_in_hotel_amenities_list").innerHTML = `
            <p id="no_amenities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                You have not added any amenity<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </p>
            `
            if(data.amenities.length > 0){

                document.getElementById("logged_in_hotel_amenities_see_all_amenities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_amenities_list").innerHTML = "";
                for(let i=0; i < data.amenities.length; i++){

                    if(i > 2)
                        break;

                    let amenity = data.amenities[i];

                    document.getElementById("logged_in_hotel_amenities_list").innerHTML += render_each_hotel_amenity(amenity);
                }
            }

            //cities operating
            document.getElementById("logged_in_hotel_cities_op_list").innerHTML = `
            <p id="no_cities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                You have not added any city<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </p>
            `
            if(data.cities_operating.length > 0){

                document.getElementById("logged_in_hotel_cities_op_see_all_cities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_cities_op_list").innerHTML = "";
                for(let i=0; i < data.cities_operating.length; i++){

                    if(i > 2)
                        break;

                    let city = data.cities_operating[i].city;
                    let country = data.cities_operating[i].country;

                    document.getElementById("logged_in_hotel_cities_op_list").innerHTML += render_each_operation_city(city, country);
                }
            }

            //last policy
            if(data.policies_and_restrictions){
                if(data.policies_and_restrictions.length > 0){
                    render_logged_in_hotel_last_added_policy(data.policies_and_restrictions[data.policies_and_restrictions.length - 1]);
                }
                else{
                    document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
                        <p style="color: white; font-size: 13px; letter-spacing: 1px;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        <span style="color: skyblue; font-size: 13px; font-weight: bolder;">
                        You've not added any policies:</span>
                        <br/><br/>
                        Your business policies help inform guests about restrictions and rules.
                        <br/><br/>
                        <span style="color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: bolder;">
                        Click on the "click here to manage policies" link below to add new policies
                        </span>
                        </p>
                    `;
                }
            }else{
                document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
                    <p style="color: white; font-size: 13px; letter-spacing: 1px;">
                    <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    <span style="color: skyblue; font-size: 13px; font-weight: bolder;">
                    You've not added any policies:</span>
                    <br/><br/>
                    Your business policies help inform guests about restrictions and rules.
                    <br/><br/>
                    <span style="color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: bolder;">
                    Click on the "click here to manage policies" link below to add new policies
                    </span>
                    </p>
                `;
            }

            //photos 
            display_logged_in_hotel_photos(data.photos[0], data.photos[1], data.photos[2], data.photos[3]);

            //getting hotel rooms
            get_hotel_rooms(data._id);

            //getting hotel buildings
            get_hotel_buildings(data._id);

            //getting hotel bookings
            get_hotel_bookings(data._id)
        },
        error: err => {
            console.log(err);
        }
    });

}

function add_new_hotel_building(){
    $.ajax({
        type: "POST",
        url: "/create_new_hotel_property",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cheap_hotel_building),
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}
//add_new_hotel_building();

function add_new_cheap_room(){
    
    $.ajax({
        type: "POST",
        url: "/create_new_hotel_room",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cheap_hotel_room),
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}
//add_new_cheap_room();

async function render_hotel_rooms(rooms_list){

    if(rooms_list.length === 0){
        document.getElementById("dashboard_onload_displayed_rooms").innerHTML = `
            <p style="font-size: 13px; text-align: center; color: white; paddin: 20px;">
                <i style="color: orangered; margin-right: 5px; " class="fa fa-exclamation-triangle"></i>
                You don't have any room. <br/>
                Without any room added to your account, guests can't book
                your brand.
                <br/><br/> 
                <span style="color: rgba(255, 255, 255, 0.6); font-weight: bolder;">
                Click on add new room to add a room</span>
            </p>
        `;
        return null;
    }

    let property = await get_and_return_hotel_property_by_id(rooms_list[0].property_id);
    
    let property_city = "";
    let property_address_tail = "";

    if(property){
        property_city = property.city;
        property_address_tail = `${property.street_address}, ${property.country}`;
    }

    let rooms_sublist = rooms_list.filter( each => {
        return each.property_id === rooms_list[0].property_id
    });

    //console.log(rooms_sublist);

    document.getElementById("dashboard_onload_displayed_rooms").innerHTML = `
        <p style="margin-top: 15px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px; margin-bottom: 5px;">
            ${property_city},
            <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                ${property_address_tail}
            </span>
        </p>
        <table class="all_rooms_list_table">
            <tbody id="dashboard_onload_displayed_rooms_list">
                <tr>
                    <td>Room</td>
                    <td class="mobile_hidden_elem">Checkin</td>
                    <td class="mobile_hidden_elem">Checkout</td>
                    <td>Price</td>
                    <td>Status</td>
                </tr>
            </tbody>
        </table>
        <p onclick="show_all_hotel_property_rooms('property_id')" style="padding: 10px; width: 150px; margin: auto; cursor: pointer; font-size: 13px; text-align: center; letter-spacing: 1px; color: white; ;">
            view all rooms
            <i style="margin-left: 5px; color:rgb(235, 137, 137);" aria-hidden="true" class="fa fa-long-arrow-right"></i>
        </p>
    `;


    for(let r=0; r < rooms_sublist.length; r++){

        let checkin = "unbooked";
        let checkout = "unbooked";

        let room_price = parseFloat(rooms_sublist[r].price).toFixed(2);

        let room_number = rooms_sublist[r].room_number;

        let room_booked = `
            <i aria-hidden="true" class="fa fa-circle" style="color:rgb(88, 236, 51); margin-right: 5px;"></i> 
            Available
        `;

        if(rooms_sublist[r].booked){
            room_booked = `
                <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 5px;"></i> 
                Booked
            `;
            
            let booking = await get_and_return_current_booking_by_room_id(rooms_sublist[r]._id, rooms_sublist[r].room_number);
            if(booking[0]){
                checkin = booking[0].checkin_date;
                checkout = booking[0].checkout_date;
            }
        }

        document.getElementById("dashboard_onload_displayed_rooms_list").innerHTML += `
            <tr>
                <td>${room_number}</td>
                <td class="mobile_hidden_elem">${checkin}</td>
                <td class="mobile_hidden_elem">${checkout}</td>
                <td>$${room_price}</td>
                <td>
                    ${room_booked}
                </td>
                <td onclick="view_and_edit_room();" class="rooms_list_edit_room_icon">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </td>
            </tr>
        `;

        if(r > 2)
            break;

    }

}

//functions after loading hotel
function get_hotel_rooms(hotel_id){
    $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_rooms/"+hotel_id,
        success: res =>{
            console.log(res);
            render_hotel_rooms(res)
        },
        error: err => {
            console.log(err);
        }
    });
}

//getting cheap hotel properties
function get_hotel_buildings(hotel_id){
    $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_properties/"+hotel_id,
        success: res =>{
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

function render_recent_hotel_booking(rooms, property_location, booking_checkin_date, booking_checkout_date, price_paid, room_guests){

    let room_number = rooms[0].number;
    let room_guests_markup = "";

    let other_rooms_included = "";

    if(rooms.length > 1){
        other_rooms_included = "<p style='margin: 10px 0; font-size: 12px; text-align: center; color: white; letter-spacing: 1px;'> Rooms Included: ";
        
        for(let r=0; r < rooms.length; r++){
            other_rooms_included += "<span style='color: orangered; font-size: 12px;'>" + rooms[r].number + "</span>, ";
        }

        other_rooms_included = other_rooms_included.substring(0, other_rooms_included.length - 2);

        other_rooms_included += "</p>"
    }

    for(let g=0; g < room_guests.length; g++){
        room_guests_markup = `
            <div>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Name:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                        Adam Aldavis</span>
                </p>
                <p style="margin-left: 70px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);">25yrs, Male</p>
            </div>
        `
    }

    document.getElementById("logged_in_hotel_recently_booked_rooms_list").innerHTML = `
        <div style="padding: 10px; border-radius: 4px; background-color:rgba(41, 66, 88, 0.555); max-width: 500px; margin: auto;">
            <p style="margin: 15px; color:rgb(209, 84, 0); font-size: 14px; font-weight: bolder;">Booked recently</p>
            <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center; font-weight: bolder;">
                ${room_number}:
                <span style="letter-spacing: 1px; margin-left: 10px; font-size: 14px; color:rgb(168, 195, 218);">
                    Booked
                    <i style="color:rgb(137, 235, 174); margin-left: 5px;" aria-hidden="true" class="fa fa-check"></i>
                </span>
            </p>
            ${other_rooms_included}
            <p style="margin-top: 5px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px; margin-bottom: 5px;">
                ${property_location.split(",")[0]}
                <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                    - ${property_location.split(",")[1]}
                </span>
            </p>
            <div style="margin-top: 20px;">
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Checkin:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${booking_checkin_date}</span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Checkout:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${booking_checkout_date}</span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Price paid:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                        $${parseFloat(price_paid).toFixed(2)}</span>
                </p>
                <p style="letter-spacing: 1px; margin-top: 15px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                    Room Guest(s)</p>
                    ${room_guests_markup}
            </div>
            <p onclick="toggle_show_booked_rooms();" style="text-align: center; color: white; font-size: 13px; font-weight: bolder; padding: 10px; border-radius: 14px; background-color: cadetblue; cursor: pointer; margin: 10px 0;">
                See all bookings
            </p>
        </div>
    `;
}

function get_hotel_bookings(hotel_id){
    $.ajax({
        type: "GET",
        url: "/get_listed_property_room_bookings/"+hotel_id,
        success: res => {
            console.log(res);
            let recent_booking = res[res.length - 1];
            render_recent_hotel_booking(recent_booking.rooms, recent_booking.full_property_location, recent_booking.checkin_date, recent_booking.checkout_date, recent_booking.price_paid, recent_booking.guests)
        },
        error: err => {
            console.log(err);
        }
    });
}

function get_and_return_current_booking_by_room_id(room_id, room_number){

    return $.ajax({
        type: "GET",
        url: "/get_bookings_by_room_id/"+room_id+"/"+room_number,
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

function get_and_return_hotel_property_by_id(property_id){
    return $.ajax({
        type: "GET",
        url: "/get_property_by_id/"+property_id,
        success: res => {
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function add_new_amenity(amenity, hotel_id){
    return $.ajax({
        type: "POST",
        url: "/add_new_amenity/"+hotel_id+"?amenity="+amenity,
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

function update_existing_amenity(old_amenity, new_amenity, hotel_id){
    return $.ajax({
        type: "POST",
        url: "/update_amenity/"+hotel_id+"?new_amenity="+new_amenity+"&old_amenity="+old_amenity,
        success: res => {
            console.log(res);
            if(document.getElementById("no_amenities_to_display_msg"))
                document.getElementById("no_amenities_to_display_msg").style.display = "none";  
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}


function add_new_cities_op(city, hotel_id){
    return $.ajax({
        type: "POST",
        url: "/add_new_city/"+hotel_id+"?new_city="+city,
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

function remove_city_op(elem_id, city, hotel_id){
    $.ajax({
        type: "DELETE",
        url: "/remove_city_op/"+hotel_id+"?q_city="+city,
        success: res => {
            console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function all_cities_op_remove_each_city_op(elem_id_param, city_param){
    remove_city_op(elem_id_param, city_param, window.localStorage.getItem("ANDSBZID"));
}

function remove_amenity(elem_id, amenity, hotel_id){
    $.ajax({
        type: "DELETE",
        url: "/remove_amenity/"+hotel_id+"?q_amenity="+amenity,
        success: res => {
            console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function all_amenities_remove_each_amenity(elem_id_param, amenity_param){
    remove_amenity(elem_id_param, amenity_param, window.localStorage.getItem("ANDSBZID"));
}

function get_all_amenities(hotel_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_amenities/"+hotel_id,
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

async function render_all_logged_in_hotel_amenities(){

    document.getElementById("all_hotel_amenities_list").innerHTML = ``;
    let all_amenities = await get_all_amenities(window.localStorage.getItem("ANDSBZID"));

    for(let i=0; i < all_amenities.length; i++){
        document.getElementById("all_hotel_amenities_list").innerHTML += all_amenities_return_each_amenity_markup(all_amenities[i]);
    }
    
}

function all_amenities_return_each_amenity_markup(amenity){
    return `
        <div id="logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px; color: rgb(33, 80, 82); font-weight: bolder;">
                    <i style="color: rgb(7, 59, 61); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${amenity}
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="all_amenities_start_edit_amenity_info('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}', 'Edit Amenity');" style="color: rgb(5, 88, 126); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="color: rgb(150, 22, 22);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
                <p id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_title" style="color: rgb(5, 44, 59); display: block; text-align: center; margin-bottom: 10px; font-size: 14px; font-weight: bolder;">
                </p>
                <input id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input" style="background-color:rgb(30, 78, 117); color: white; padding: 10px; border-radius: 4px; width: calc(100% - 20px); border: none;" type="text" placeholder="type amenity here" value="" />
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="all_amenities_update_existing_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', 'logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: darkslateblue; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Save
                    </div>
                    <div onclick="toggle_hide_show_anything('logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: crimson; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
            <div id="delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
                <p style="font-weight: bolder; font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: rgb(5, 44, 59);">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="all_amenities_remove_each_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

function all_amenities_return_each_amenity_markup_after_update(amenity){
    return `
        <p>
            <span style="font-size: 14px; color: rgb(33, 80, 82); font-weight: bolder;">
                <i style="color: rgb(7, 59, 61); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                ${amenity}
            </span>
            <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                <i onclick="all_amenities_start_edit_amenity_info('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}', 'Edit Amenity');" style="color: rgb(5, 88, 126); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                <i  onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="color: rgb(150, 22, 22);" class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </p>
        <div id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form" style="margin-top: 10px; margin-bottom: 10px; display: none;">
            <p id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_title" style="color: rgb(5, 44, 59); display: block; text-align: center; margin-bottom: 10px; font-size: 14px; font-weight: bolder;">
            </p>
            <input id="logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input" style="background-color:rgb(30, 78, 117); color: white; padding: 10px; border-radius: 4px; width: calc(100% - 20px); border: none;" type="text" placeholder="type amenity here" value="" />
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="all_amenities_update_existing_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', 'logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_form_input', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: darkslateblue; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Save
                </div>
                <div onclick="toggle_hide_show_anything('logged_in_hotel_all_amenities_edit_${amenity.replaceAll(" ", "_").trim()}_amenity_info_form');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: crimson; color: white; font-size: 14px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
        <div id="delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog" style="position: initial; margin: 10px 0; width: 100%; padding: 0; background: none;" class="confirm_delete_dialog">
            <p style="font-weight: bolder; font-size: 14px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: rgb(5, 44, 59);">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="all_amenities_remove_each_amenity('logged_in_hotel_all_amenities_${amenity.replaceAll(" ", "_").trim()}_amenity', '${amenity}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete__all_amenities_${amenity.replaceAll(" ", "_").trim()}_aminties_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
}

function get_all_cities(hotel_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_cities/"+hotel_id,
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

function get_all_policies(hotel_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_policies/"+hotel_id,
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

async function render_all_logged_in_hotel_cities(){

    document.getElementById("all_cities_list").innerHTML = ``;
    let all_cities = await get_all_cities(window.localStorage.getItem("ANDSBZID"));

    for(let i=0; i < all_cities.length; i++){
        document.getElementById("all_cities_list").innerHTML += all_cities_return_each_city_markup(all_cities[i]);
    }
    
}

function all_cities_return_each_city_markup(city_param){

    let city_for_ids = city_param.city.replaceAll(" ", "_").trim();
    let country_for_ids = city_param.country.replaceAll(" ", "_").trim();

    return `
        <div id="all_cities_logged_in_hote_${city_for_ids}_${country_for_ids}_city_Op" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px; color:rgb(33, 80, 82); font-weight: bolder;">
                    <i style="color: rgb(9, 70, 67); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${city_param.city}, ${city_param.country}
                </span>
                <span onclick="toggle_hide_show_anything('all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(158, 12, 12);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog" style="position: initial; margin: 10px 0; padding: 0; background: none; width: 100%;" class="confirm_delete_dialog">
                <p style="color:rgb(5, 44, 59); font-weight: bolder; font-size: 13px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="all_cities_op_remove_each_city_op('all_cities_logged_in_hote_${city_for_ids}_${country_for_ids}_city_Op', '${city_param.city}, ${city_param.country}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>`;
}

function room_booking_enforce_child_age_input(input_id){
    if(document.getElementById(input_id).value > 17){
        document.getElementById(input_id).value = 17;
    }
}

function room_booking_enforce_adult_age_input(input_id){
    if(document.getElementById(input_id).value < 18){
        document.getElementById(input_id).value = 18;
    }
}

function update_info_item(update_type, new_info, hotel_brand_id){

    let endpoint_url = '';
    let q_param = '';

    switch(update_type){
        case "email":
            endpoint_url = "/update_cheap_hotel_email/";
            q_param = "new_email";
            break;
        case "mobile":
            endpoint_url = "/update_cheap_hotel_mobile/";
            q_param = "new_mobile";
            break;
        case "web_url":
            endpoint_url = "/update_cheap_hotel_web_url/";
            q_param = "new_url";
            break;
        case "fax":
            endpoint_url = "/update_cheap_hotel_fax/";
            q_param = "new_fax";
            break;
        case "avg_price":
            endpoint_url = "/update_cheap_hotel_avg_price/";
            q_param = "new_avg_price";
            break;
        case "description":
            endpoint_url = "/update_cheap_hotel_description/";
            q_param = "new_description";
            break;
        case "office_location":
            endpoint_url = "/update_cheap_hotel_main_office_location/";
            q_param = "new_office_location";
            break;
        case "name":
            endpoint_url = "/update_cheap_hotel_name/";
            q_param = "new_name";
            break;
        default:
            endpoint_url = "/update_cheap_hotel_name/";
            q_param = "new_name";
    }
    console.log(endpoint_url + hotel_brand_id + "?" + q_param + "=" + new_info)
    return $.ajax({
        type: "POST",
        url: (endpoint_url + hotel_brand_id + "?" + q_param + "=" + new_info),
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

$(document).ready(()=>{
    get_logged_in_hotel_infor();
});

$(function() {
    $('#all_bookings_date_range_input').daterangepicker({
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("all_bookings_date_range_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });

  $(function() {
    $('#make_reservation_date_range_input').daterangepicker({
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("make_reservation_date_range_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });
