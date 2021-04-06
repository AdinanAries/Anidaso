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
}

//function to render each amenity
function render_each_hotel_amenity(amenity){
    return `
        <div id="logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px;">
                    <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${amenity}
                </span>
                <span class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i onclick="start_edit_amenity_info('logged_in_hotel_${amenity.replaceAll(" ","_")}_amenity', '${amenity}', 'Edit Amenity');" style="color: rgb(137, 204, 235); margin-right: 15px;" class="fa fa-pencil" aria-hidden="true"></i>
                    <i  onclick="toggle_hide_show_anything('delete_${amenity.replaceAll(" ","_")}_aminties_confirm_dialog')" style="color: rgb(235, 137, 137);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="delete_${amenity.replaceAll(" ","_")}_aminties_confirm_dialog" style="position: initial; margin: 10px 0;" class="confirm_delete_dialog">
                <p style="font-size: 12px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
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
        <div id="logged_in_hote_${city}_${country}_city_Op" class="logged_in_hotel_amenity">
            <p>
                <span style="font-size: 14px;">
                    <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${city}, ${country}
                </span>
                <span onclick="toggle_hide_show_anything('delete_${city}_${country}_city_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(235, 137, 137);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="delete_${city}_${country}_city_confirm_dialog" style="position: initial; margin: 10px 0;" class="confirm_delete_dialog">
                <p style="font-size: 12px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete_${city}_${country}_city_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
            render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", data.email, "start_edit_contact_info");
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
            <p style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                You have not added any amenity<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </p>
            `
            if(data.amenities.length > 0){

                document.getElementById("logged_in_hotel_amenities_see_all_amenities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_amenities_list").innerHTML = "";
                for(let i=0; i < data.amenities.length; i++){

                    let amenity = data.amenities[i];

                    document.getElementById("logged_in_hotel_amenities_list").innerHTML += render_each_hotel_amenity(amenity);
                }
            }

            //cities operating
            document.getElementById("logged_in_hotel_cities_op_list").innerHTML = `
            <p style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                You have not added any city<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </p>
            `
            if(data.cities_operating.length > 0){

                document.getElementById("logged_in_hotel_cities_op_see_all_cities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_cities_op_list").innerHTML = "";
                for(let i=0; i < data.cities_operating.length; i++){

                    let city = data.cities_operating[i].city;
                    let country = data.cities_operating[i].country;

                    document.getElementById("logged_in_hotel_cities_op_list").innerHTML += render_each_operation_city(city, country);
                }
            }
        },
        error: err => {
            console.log(err);
        }
    });

}



$(document).ready(()=>{
    get_logged_in_hotel_infor();
});
