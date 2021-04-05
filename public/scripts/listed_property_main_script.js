var logged_in_hotel_ratings_area = document.getElementById("logged_in_hotel_ratings_area");
var logged_in_hotel_description_input = document.getElementById("logged_in_hotel_description_input");

var current_misc_edit_elem_id;
var current_contact_edit_elem_id;
var current_amenity_edit_elem_id;
var current_op_cities_edit_elem_id;

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

}

//for amenities info
function toggle_show_edit_amenity_info_form(elem_id){
    $("#logged_in_hotel_edit_amenity_info_form").toggle("up");
    $("#"+elem_id).toggle("up")
}

function toggle_hide_edit_amenity_info_form(){
    toggle_show_edit_amenity_info_form(current_amenity_edit_elem_id)
}

function start_edit_amenity_info(elem_id, info, title){
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

function render_each_loggin_hotel_info_item(info_elem_item_id, title, info, func_name){
    document.getElementById(info_elem_item_id).innerHTML = `
        <p style="color: white; font-size: 14px;">
            <span style="color:aqua; font-size: 14px;">${title}:</span>
            ${info}
            <i onclick="${func_name}('${info_elem_item_id}', '${info}', 'Edit ${title}');" class="fa fa-pencil" aria-hidden="true"></i>
        </p>
    `;
}

render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", "hotelsplending@gmail.com", "start_edit_contact_info")
render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", "https://hotelefyasplending.com", "start_edit_misc_info")

logged_in_hotel_ratings_area.innerHTML = return_cheap_hotel_rating_markup(4);

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

function toggle_show_search_room_pane(){
    document.getElementById("add_room_form_panel").style.display = "none";
    $("#search_room_panel").toggle("up");
}

function toggle_show_add_room_pane(){
    document.getElementById("search_room_panel").style.display = "none";
    $("#add_room_form_panel").toggle("up");
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

function view_and_edit_room(){
    toggle_show_search_room_pane();
}

function toggle_show_booked_rooms(){
    $("#booked_rooms_container").toggle("up");
}

function toggle_show_all_hotel_properties(){
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
}

function toggle_show_all_cities(){
    $("#all_cities_list_container").toggle("up");
}

function show_all_cities(){
    toggle_show_all_cities();
}

function toggle_hide_show_anything(elem_id){
    $("#"+elem_id).toggle("up");
}

function hotel_manager_logout(){
    document.location.href = "/listed_property_login.html"
}


//function to get all hotel information
function get_logged_in_hotel_infor(){

    let ANDSBZID = window.localStorage.getItem("ANDSBZID");

    $.ajax({
        type: "GET",
        url: `/get_logged_in_hotel_info/${ANDSBZID}`,
        success: data => {
            console.log(data);
        },
        error: err => {
            console.log(err);
        }
    });

}

$(document).ready(()=>{
    get_logged_in_hotel_infor();
});
