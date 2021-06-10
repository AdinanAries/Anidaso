
var guest_search_post_data = {
    hotel_brand_id: "",
    property_id: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    date: "",
}

async function hotel_guests_search_function(type){

    if(type === "inhouse"){
        
        document.getElementById("inhouse_guests_list").innerHTML = `
            <div style="width: 100%; text-align: center; padding: 20px 0;" class="loader loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"/>
                </path>
                </svg>
                <p style="text-align: center; font-size: 14px; color:white;">
                loading...
                </p>
            </div>
        `;

        await collect_inhouse_guests_search_post_data();
        let search_results = await search_and_return_cheap_hotel_guest(type);
        
        if(search_results.length === 0){
            document.getElementById("inhouse_guests_list").innerHTML =  `
                <div style="padding: 40px 10px; text-align: center; font-size: 14px; color: white;">
                    <i aria-hidden="true" class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;"></i>
                    guest not found
                </div>
            `;
            return null;
        }

        document.getElementById("inhouse_guests_list").innerHTML = "";
        for(let i=0; i<search_results.length; i++){
            let property = await get_and_return_hotel_property_by_id(search_results[i].booking.property_id);
            document.getElementById("inhouse_guests_list").innerHTML += return_inhouse_guest_markup(search_results[i].guest, search_results[i].booking, search_results[i].invoice, property);
        }

    }else if(type === "arrival"){
        
        document.getElementById("arrival_guests_list").innerHTML = `
            <div style="width: 100%; text-align: center; padding: 20px 0;" class="loader loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"/>
                </path>
                </svg>
                <p style="text-align: center; font-size: 14px; color:white;">
                loading...
                </p>
            </div>
        `;

        await collect_arrival_guests_search_post_data();
        let search_results = await search_and_return_cheap_hotel_guest(type);

        if(search_results.length === 0){
            document.getElementById("arrival_guests_list").innerHTML =  `
                <div style="padding: 40px 10px; text-align: center; font-size: 14px; color: white;">
                    <i aria-hidden="true" class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;"></i>
                    guest not found
                </div>
            `;
            return null;
        }

        document.getElementById("arrival_guests_list").innerHTML = "";
        for(let i=0; i<search_results.length; i++){
            let property = await get_and_return_hotel_property_by_id(search_results[i].booking.property_id);
            document.getElementById("arrival_guests_list").innerHTML += return_arrival_guests_markup(search_results[i].guest, search_results[i].booking, search_results[i].invoice, property);
        }

    }else if(type === "checkout"){

        document.getElementById("checkout_guests_list").innerHTML = `
            <div style="width: 100%; text-align: center; padding: 20px 0;" class="loader loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"/>
                </path>
                </svg>
                <p style="text-align: center; font-size: 14px; color:white;">
                loading...
                </p>
            </div>
        `;

        await collect_checkout_guests_search_post_data();
        let search_results = await search_and_return_cheap_hotel_guest(type);

        if(search_results.length === 0){
            document.getElementById("checkout_guests_list").innerHTML =  `
                <div style="padding: 40px 10px; text-align: center; font-size: 14px; color: white;">
                    <i aria-hidden="true" class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;"></i>
                    guest not found
                </div>
            `;
            return null;
        }

        document.getElementById("checkout_guests_list").innerHTML = "";
        for(let i=0; i<search_results.length; i++){
            let property = await get_and_return_hotel_property_by_id(search_results[i].booking.property_id);
            document.getElementById("checkout_guests_list").innerHTML += return_guest_checkout_markup(search_results[i].guest, search_results[i].booking, search_results[i].invoice, property);
        }

    }
}

function collect_inhouse_guests_search_post_data(){

    let first_name_input = document.getElementById("in_house_guests_search_first_name_input");
    let last_name_input = document.getElementById("in_house_guests_search_last_name_input");
    let mobile_input = document.getElementById("in_house_guests_search_mobile_input");
    let calling_code_input = document.getElementById("inhouse_guests_search_country_calling_code_select");
    let email_input = document.getElementById("in_house_guests_search_email_input");
    let building_input = document.getElementById("in_house_guests_search_property_select");

    guest_search_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
    guest_search_post_data.property_id = building_input.value;
    guest_search_post_data.first_name = first_name_input.value;
    guest_search_post_data.last_name = last_name_input.value;
    guest_search_post_data.email = email_input.value;
    guest_search_post_data.mobile = `${calling_code_input.value} ${mobile_input.value}`;

    return null;
}

function collect_arrival_guests_search_post_data(){

    let first_name_input = document.getElementById("arrival_guests_search_first_name_input");
    let last_name_input = document.getElementById("arrival_guests_search_last_name_input");
    let mobile_input = document.getElementById("arrival_guests_search_mobile_input");
    let calling_code_input = document.getElementById("arrival_guests_search_country_calling_code_select");
    let email_input = document.getElementById("arrival_guests_search_email_input");
    let building_input = document.getElementById("arrival_guests_search_property_select");

    guest_search_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
    guest_search_post_data.property_id = building_input.value;
    guest_search_post_data.first_name = first_name_input.value;
    guest_search_post_data.last_name = last_name_input.value;
    guest_search_post_data.email = email_input.value;
    guest_search_post_data.mobile = `${calling_code_input.value} ${mobile_input.value}`;

    return null
}

function collect_checkout_guests_search_post_data(){

    let first_name_input = document.getElementById("checkout_guests_search_first_name_input");
    let last_name_input = document.getElementById("checkout_guests_search_last_name_input");
    let mobile_input = document.getElementById("checkout_guests_search_mobile_input");
    let calling_code_input = document.getElementById("checkout_guests_search_country_calling_code_select");
    let email_input = document.getElementById("checkout_guests_search_email_input");
    let building_input = document.getElementById("checkout_guests_search_property_select");

    guest_search_post_data.hotel_brand_id = localStorage.getItem("ANDSBZID");
    guest_search_post_data.property_id = building_input.value;
    guest_search_post_data.first_name = first_name_input.value;
    guest_search_post_data.last_name = last_name_input.value;
    guest_search_post_data.email = email_input.value;
    guest_search_post_data.mobile = `${calling_code_input.value} ${mobile_input.value}`;

    return null;
}

function return_inhouse_guest_markup(guest, booking, invoice, property){
    running_invoice = invoice;
    return `
        <div style="margin-bottom: 25px;" class="flex_row_default_flex_column_mobile">
            <div class="flex_child_of_two">
                <p style="color:rgb(177, 208, 255); font-size: 14px; margin-bottom: 5px;">
                    <i aria-hidden="true" class="fa fa-dot-circle-o" style="color:rgb(255, 97, 6); margin-right: 5px;"></i>
                    ${guest.first_name} ${guest.last_name}</p>
                <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">DOB:</span> 
                    ${change_date_from_iso_to_long_date(guest.DOB)}</p>
                <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">Gender:</span> ${guest.gender}</p>
                <p style="margin-top: 5px; margin-left: 20px; color:rgb(65, 141, 255); font-size: 14px;">
                    Room ${guest.assigned_room.room_number}, <span style="font-size: 13px; color:rgba(255, 208, 187, 0.815);">
                    ${change_date_from_iso_to_long_date(booking.checkin_date)} - 
                    ${change_date_from_iso_to_long_date(booking.checkout_date)}</span></p>
                <P style="color:rgb(206, 255, 221); font-size: 13px; margin-top: 5px; margin-left: 20px;">
                    ${property.city} - ${property.street_address} (${property.country})</P>  
                <p style="cursor: pointer; font-size: 13px; margin: 10px; color:rgb(162, 187, 199);">
                    see full profile
                    <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
            </div>
            <div class="flex_child_of_two flex_non_first_child">
                <div style="display: flex; flex-direction: row !important;">
                    <div onclick="view_each_guest_running_bill();" style="border: 1px solid rgb(55, 107, 75); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        View Running Bill
                    </div>
                    <div onclick="show_include_services_in_booking_div();" style="border: 1px solid rgb(55, 97, 107); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-plus" aria-hidden="true"></i>
                        Include Service
                    </div>
                </div>
                <div style="display: flex; flex-direction: row !important;">
                    <div onclick="go_to_checkout_from_inhouse_guests('guest_id', 'booking_id');" style="font-size: 13px; color: rgb(255, 132, 132); margin-right: 10px; padding: 10px; padding-left: 0; cursor: pointer; margin-top: 10px;">
                        go to checkout
                        <i style="color:rgb(255, 46, 46); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </div>
                    <div onclick="show_view_booking_div('booking_id');" style="font-size: 13px; color: rgb(132, 216, 255); padding: 10px; padding-left: 0; cursor: pointer; margin-top: 10px;">
                        view booking
                        <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function return_guest_checkout_markup(guest, booking, invoice, property){
    return `
        <div style="margin-bottom: 25px;" class="flex_row_default_flex_column_mobile">
            <div class="flex_child_of_two">
                <p style="color:rgb(177, 208, 255); font-size: 14px; margin-bottom: 5px;">
                    <i aria-hidden="true" class="fa fa-dot-circle-o" style="color:rgb(255, 97, 6); margin-right: 5px;"></i>
                    ${guest.first_name} ${guest.last_name}</p>
                    <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">DOB:</span> 
                    ${change_date_from_iso_to_long_date(guest.DOB)}</p>
                <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">Gender:</span> ${guest.gender}</p>
                <p style="margin-top: 5px; margin-left: 20px; color:rgb(65, 141, 255); font-size: 14px;">
                    Room 5D, <span style="font-size: 13px; color:rgba(255, 208, 187, 0.815);">
                    ${change_date_from_iso_to_long_date(booking.checkin_date)} - 
                    ${change_date_from_iso_to_long_date(booking.checkout_date)}</span></p>
                <P style="color:rgb(206, 255, 221); font-size: 13px; margin-top: 5px; margin-left: 20px;">
                    ${property.city} - ${property.street_address} (${property.country})</P>  
                <p style="cursor: pointer; font-size: 13px; margin: 10px; color:rgb(162, 187, 199);">
                    see full profile
                    <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
            </div>
            <div class="flex_child_of_two flex_non_first_child">
                <div style="display: flex; flex-direction: row !important;">
                    <div style="background-color: crimson; color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        Checkout Guest
                    </div>
                    <div style="background-color: cornflowerblue; color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-plus" aria-hidden="true"></i>
                        Add to Running Invoice
                    </div>
                </div>
                <div style="display: flex; flex-direction: row !important;">
                    <div onclick="view_many_guests_running_invoice();" style="font-size: 13px; color: rgb(252, 255, 211); margin-right: 10px; padding: 10px; padding-left: 0; cursor: pointer; margin-top: 10px;">
                        view running invoice
                        <i style="color:rgb(144, 255, 227); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </div>
                    <div onclick="show_view_booking_div('booking_id');" style="font-size: 13px; color: rgb(132, 216, 255); padding: 10px; padding-left: 0; cursor: pointer; margin-top: 10px;">
                        view booking
                        <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function return_arrival_guests_markup(guest, booking, invoice, property){
    return `
        <div style="margin-bottom: 25px;" class="flex_row_default_flex_column_mobile">
            <div class="flex_child_of_two">
                <p style="color:rgb(177, 208, 255); font-size: 14px; margin-bottom: 5px;">
                    <i aria-hidden="true" class="fa fa-dot-circle-o" style="color:rgb(255, 97, 6); margin-right: 5px;"></i>
                    ${guest.first_name} ${guest.last_name}</p>
                <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">DOB:</span> 
                    ${change_date_from_iso_to_long_date(guest.DOB)}</p>
                <p style="margin-left: 20px; color:rgb(177, 208, 255); font-size: 14px;">
                    <span style="color: rgb(215,255,255); font-size: 12px;">Gender:</span> ${guest.gender}</p>
                <p style="margin-top: 5px; margin-left: 20px; color:rgb(65, 141, 255); font-size: 14px;">
                    Room ${guest.assigned_room.room_number}, <span style="font-size: 13px; color:rgba(255, 208, 187, 0.815);">
                        leaves on ${change_date_from_iso_to_long_date(booking.checkout_date)}</span></p>
                <P style="color:rgb(206, 255, 221); font-size: 13px; margin-top: 5px; margin-left: 20px;">
                    ${property.city} - ${property.street_address} (${property.country})</P>
                <p style="cursor: pointer; font-size: 13px; margin: 10px; color:rgb(162, 187, 199);">
                    see full profile
                    <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
            </div>
            <div class="flex_child_of_two flex_non_first_child">
                <div style="display: flex; flex-direction: row !important;">
                    <div style="background-color:rgb(55, 107, 75); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        Check Guest In
                    </div>
                    <div onclick="show_include_services_in_booking_div();" style="background-color:rgb(55, 97, 107); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                        <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-plus" aria-hidden="true"></i>
                        Include Service
                    </div>
                </div>
                <div onclick="show_view_booking_div('booking_id');" style="font-size: 13px; color: rgb(132, 216, 255); padding: 10px; padding-left: 0; cursor: pointer; margin-top: 10px;">
                    view booking
                    <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    `;
}

function search_and_return_cheap_hotel_guest(type){

    guest_search_post_data.hotel_brand_id = window.localStorage.getItem("ANDSBZID");
    guest_search_post_data.date = convert_date_object_to_db_string_format(new Date());

    let post_url = "";
    if(type === "inhouse"){
        post_url = "/search_cheap_hotel_inhouse_guests/";
    }else if(type === "arrival"){
        post_url = "/search_cheap_hotel_arrival_guests/";
    }else if(type === "checkout"){
        post_url = "/search_cheap_hotel_inhouse_guests/";
    }

    return $.ajax({
        type: "POST",
        url: post_url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(guest_search_post_data),
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

function return_dom_for_all_cities_add_city_input(cities_arr){

    let dom_arr = cities_arr.map(each =>{

        return `
        <li onclick="all_cities_pick_selected_city_from_all_world_cities_autocomplete('${each.name.replaceAll('\'', '#$#$%$#098')}','${each.country.replaceAll('\'', '#$#$%$#098')}');" style="cursor: pointer; padding: 5px 10px; overflow: initial !important;" >
            <p style="font-size: 14px; color: black; overflow: initial !important;">
            <i style="margin-right: 5px; color: rgb(5, 57, 99);" class="fa fa-map-marker" aria-hidden="true"></i>
            ${each.name}, ${each.country}</p>
        </li>
        `;

    });

    return dom_arr.join(' ');
}

document.getElementById("logged_in_hotel_all_cities_list_add_city_form_input").addEventListener("input", evnt =>{

    $("#all_cities_add_city_input_autocomplete_section").slideDown("fast");

    let cities_arr = all_world_cities_auto_complete(evnt.target.value);
    let elems = return_dom_for_all_cities_add_city_input(cities_arr);

    //console.log(elems);
    document.getElementById("all_cities_add_city_input_autocomplete_list").innerHTML = elems;

});

function all_cities_pick_selected_city_from_all_world_cities_autocomplete(city, country){

    let a_city = city.replaceAll('#$#$%$#098', "'");
    let a_country = country.replaceAll('#$#$%$#098', "'");

    document.getElementById("logged_in_hotel_all_cities_list_add_city_form_input").value = `${a_city}, ${a_country}`;

    $("#all_cities_add_city_input_autocomplete_section").slideUp("fast");

}

let last_added_photo_url = "";
let global_is_upload_completed = false;

async function general_upload_photo_to_s3(file_input_Id, hotel_id, unique_name, label_id, loader){

    const files = document.getElementById(file_input_Id).files;
    const file = files[0];

    if(file == null){

        try{
            /*let s3_photo_url = last_added_photo_url.split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            await delete_s3_file(s3_photot_file_name);*/

            document.getElementById(label_id).style.backgroundImage = 'none';
            document.getElementById(label_id).style.backgroundColor = 'rgba(0,0,0,0.4)';
        }catch(e){
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }

        console.log('no file selected.');

        return {
            success: false,
            msg: "no file selected."
        }
        
    }
    //getSignedRequest(file);

    return $.ajax({
        type: "GET",
        url: `/upload_picture_sign_s3?file-name=${hotel_id}_${unique_name}_${file.name}&file-type=${file.type}`,
        success: res_data => {

            //const response = JSON.parse(xhr.responseText);
            const response = res_data;
            console.log(res_data);

            last_added_photo_url = response.url;
            console.log(last_added_photo_url);

            general_upload_file(file, response.signedRequest, label_id, loader).then(res_data2 => {
                 console.log(res_data2);
                 return res_data2;

             }).catch(err => {
                 console.log(err);
                 return err
             });
        },
        error: err => {
            console.log('could not get signed URL.');
            return {
                success: false,
                error: err
            }
        }
    });
    
}

async function general_upload_file(file, signedRequest, label_id, loader_id){

    document.getElementById(label_id).style.display = "none";
    document.getElementById(loader_id).style.display = "block";

    return $.ajax({
        type: "PUT",
        url: signedRequest,
        contentType: file.type,
        processData: false,
        data: file,
        success: res => {

            //console.log(res);
            console.log("file upload completed");
            
            global_is_upload_completed = true;

            //document.getElementById(label_id).style.display = "flex";
            document.getElementById(loader_id).style.display = "none";

            return {
                success: true
            }
        },
        error: err => {

            console.log('could not upload file.');

            
            document.getElementById(label_id).style.display = "flex";
            document.getElementById(loader_id).style.display = "none";
            
            return {
                success: false,
                error: err
            }
        }

    });
}

async function general_cheap_hotel_preview_image(event, elem) {

    var output = document.getElementById(elem);

    //already has an upload made so delete it
    if(event.target.value !== ""){
        //file url looks like "https://anidaso-img.s3.amazonaws.com/HotelEfyaSplending_hotel_one_seed2.jpg_0"
                            //"protocol://bucket_name.s3.amazonaws.com/file_name"
        try{
            /*let s3_photo_url = last_added_photo_url.split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            await delete_s3_file(s3_photot_file_name);*/
            output.style.backgroundImage = 'none';
            output.style.backgroundColor = 'rgba(0,0,0,0.4)';
        }catch(e){
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }
    }

    var reader = new FileReader();
    reader.onload = function(){
        output.style.backgroundImage = `url('${reader.result}')`;
    }
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById("logged_in_hotel_add_new_photo_file_input").addEventListener("change", async e => {
    await general_cheap_hotel_preview_image(e, "logged_in_hotel_add_new_photo_file_input_btn");
    await general_upload_photo_to_s3("logged_in_hotel_add_new_photo_file_input", window.localStorage.getItem("ANDSBZID"), 
                                        "non_prop_non_room", 
                                        "logged_in_hotel_add_new_photo_file_input_label", 
                                        "logged_in_hotel_add_new_photo_upload_loader");
    
});


function save_newly_uploaded_photo_url(photo_url, hotel_id){
    return $.ajax({
        type: "POST",
        url: "/save_newly_uploaded_photo_url/"+hotel_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            new_url: photo_url
        }),
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    })
}

async function delete_uploaded_photo_using_photo_url(photo_url){
    try{
        let s3_photo_url = photo_url.split("/");
        let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
        console.log(s3_photot_file_name);
        return await delete_s3_file(s3_photot_file_name);
    }catch(e){
        console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
        console.log(e);
        return null;
    }
}

async function general_delete_photo(photo_url, hotel_id){

    let res = await general_main_delete_photo(photo_url, hotel_id);

    if(res !== "not deleted"){

        let photos_after_deletion = await get_logged_in_hotel_all_photos(window.localStorage.getItem("ANDSBZID"));

        let last_photo_url = photos_after_deletion.length > 4 ? photos_after_deletion[photos_after_deletion.length - 5] : photos_after_deletion[photos_after_deletion.length - 4];
        display_logged_in_hotel_photos(photos_after_deletion[photos_after_deletion.length - 1], photos_after_deletion[photos_after_deletion.length - 2], 
            photos_after_deletion[photos_after_deletion.length - 3], photos_after_deletion[photos_after_deletion.length - 4], last_photo_url);

    }
}

async function general_main_delete_photo(photo_url, hotel_id){

    let existing_photos = await get_logged_in_hotel_all_photos(window.localStorage.getItem("ANDSBZID"));

    if(existing_photos.length < 5){
        
        alert("You must have atleast 4 photos");
        return "not deleted";

    }else{

        await delete_uploaded_photo_using_photo_url(photo_url);
        return $.ajax({
            type: "POST",
            url: "/remove_photo_url_from_photos/"+hotel_id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                removed_photo: photo_url
            }),
            success: res => {
                console.log(res);
                return res;
            },
            error: err =>  {
                console.log(err);
                return err;
            }
        });
    }
}

document.getElementById("logged_in_hotel_add_new_photo_save_btn").addEventListener("click", async e => {
    if(document.getElementById("logged_in_hotel_add_new_photo_file_input").value === ""){
        alert("please select a photo first");
    }else{
        if(!global_is_upload_completed){
            alert("photo still processing");
            return null;
        }else{
            await save_newly_uploaded_photo_url(last_added_photo_url, window.localStorage.getItem("ANDSBZID"));
            alert("photo upload finished successfully!");
            last_added_photo_url = "";
            global_is_upload_completed = false;
            document.getElementById("logged_in_hotel_add_new_photo_file_input").value = "";
            toggle_show_add_new_photo_div();
            document.getElementById("logged_in_hotel_add_new_photo_file_input_label").style.display = "flex";
            document.getElementById("logged_in_hotel_add_new_photo_file_input_btn").style.backgroundImage = 'none';
            document.getElementById("logged_in_hotel_add_new_photo_file_input_btn").style.backgroundColor = 'rgba(0,0,0,0.4)';

            let photos_after_new_upload = await get_logged_in_hotel_all_photos(window.localStorage.getItem("ANDSBZID"));

            let last_photo_url = photos_after_new_upload.length > 4 ? photos_after_new_upload[photos_after_new_upload.length - 5] : photos_after_new_upload[photos_after_new_upload.length - 4];
            display_logged_in_hotel_photos(photos_after_new_upload[photos_after_new_upload.length - 1], photos_after_new_upload[photos_after_new_upload.length - 2], 
                photos_after_new_upload[photos_after_new_upload.length - 3], photos_after_new_upload[photos_after_new_upload.length - 4], last_photo_url);
        }
    }
});

document.getElementById("logged_in_hotel_add_new_photo_cancel_btn").addEventListener("click", async e => {
    if(last_added_photo_url !== ""){
        await delete_uploaded_photo_using_photo_url(last_added_photo_url);
        document.getElementById("logged_in_hotel_add_new_photo_file_input_btn").style.backgroundImage = 'none';
        document.getElementById("logged_in_hotel_add_new_photo_file_input_btn").style.backgroundColor = 'rgba(0,0,0,0.4)';
        last_added_photo_url = "";
    }
});

//guest manager
var add_or_edit_guest_current_age;
var add_or_edit_guest_DOB = "";
var add_or_edit_guest_photo_url = "";
var edit_guest_existing_guest;
$(function() {
    $('#guest_manager_new_or_existing_guest_DOB_input').daterangepicker({
      singleDatePicker: true,
      autoUpdateInput: false,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start, end, label) {
        setTimeout(()=>{

            let year = start.format('YYYY-MM-DD').split("-")[0];
            let month = start.format('YYYY-MM-DD').split("-")[1];
            let d_date = start.format('YYYY-MM-DD').split("-")[2];

            add_or_edit_guest_current_age = calculate_age(new Date(parseInt(year), parseInt(month), parseInt(d_date)));

            document.getElementById("guest_manager_new_or_existing_guest_DOB_input").value = start.format('YYYY-MM-DD');
            add_or_edit_guest_DOB = start.format('YYYY-MM-DD');
                
            
          }, 100);
    });
});
async function guest_manager_save_new_or_existing_guest_onsubmit(type){

    let first_name = document.getElementById("guest_manager_new_or_existing_guest_first_name_input").value;
    let last_name = document.getElementById("guest_manager_new_or_existing_guest_last_name_input").value;
    let property_id = document.getElementById("guest_manager_new_or_existing_guest_property_select").value;
    let email = document.getElementById("guest_manager_new_or_existing_guest_email_input").value;
    let gender = document.getElementById("guest_manager_new_or_existing_guest_gender_select").value;
    let mobile_last_nums = document.getElementById("guest_manager_new_or_existing_guest_mobile_input").value;
    let mobile_calling_code = document.getElementById("guest_manager_new_or_existing_guest_country_calling_code_input").value
    let mobile = `${mobile_calling_code} ${mobile_last_nums}`;
    //address
    let Street_address = document.getElementById("guest_manager_new_or_existing_guest_street_address_input").value;
    let town = document.getElementById("guest_manager_new_or_existing_guest_town_input").value;
    let city = document.getElementById("guest_manager_new_or_existing_guest_city_input").value;
    let country = document.getElementById("guest_manager_new_or_existing_guest_country_input").value;
    let zipcode = document.getElementById("guest_manager_new_or_existing_guest_zipcode_input").value;

    if(first_name === ""){

        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
            "please add guest first name");
        
        return null;
    }else if(last_name === ""){

        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
            "please add guest last name");
        
        return null;
    }else if( email === ""){

        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
            "please add guest email");
        
        return null;
    }else if(add_or_edit_guest_DOB === ""){

        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
            "please add guest date of birth");
        
        return null;
    }else if(mobile_last_nums === ""){

        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
            "please add guest mobile");
        
        return null;
    }

    let guest_type = "adult"; 
    if(add_or_edit_guest_current_age < 18){
        guest_type = "child"
    }

    let hotel_id = window.localStorage.getItem("ANDSBZID");

    the_full_screen_loader.style.display = "flex";

    if(type === "save"){

        let saved_guest = await create_guest_record(hotel_id, property_id, add_or_edit_guest_photo_url, first_name, last_name,
            guest_type, add_or_edit_guest_DOB, gender, email, mobile, 0, "unbooked", ""/*booking_id*/, 
            /*room_id_param*/"", /*room_number_param*/"", Street_address, city, town, country, zipcode);

            the_full_screen_loader.style.display = "none";

            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: rgb(0, 177, 139);" class="fa fa-check" aria-hidden="true"></i>
                    Guest Added`, 
                "New Guest Added Successfully!");

    }else{

        let saved_guest = await edit_existing_guest_record(edit_guest_existing_guest._id, hotel_id, property_id, add_or_edit_guest_photo_url, first_name, last_name,
            guest_type, add_or_edit_guest_DOB, gender, email, mobile, 0, ""/*status_param*/, ""/*booking_id_param*/, 
            ""/*room_id_param*/, ""/*room_number_param*/, Street_address, city, town, country, zipcode);

            the_full_screen_loader.style.display = "none";

            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: rgb(0, 177, 139);" class="fa fa-check" aria-hidden="true"></i>
                    Guest Updated`, 
                "Guest Record Updated Successfully!");

    }

    show_guest_manager_menu();
    
}

function edit_existing_guest_record(guest_id, hotel_brand_id_param, property_id_param, profile_pic_param, first_name_param, last_name_param,
    guest_type_param, DOB_param, gender_param, email_param, mobile_param, price_paid_param, status_param, booking_id_param, 
    room_id_param, room_number_param, street_address_param, city_param, town_param, country_param, zipcode_param){

    let the_guest = return_new_hotel_guest_obj(hotel_brand_id_param, property_id_param, profile_pic_param, first_name_param, last_name_param,
        guest_type_param, DOB_param, gender_param, email_param, mobile_param, price_paid_param, status_param, booking_id_param, 
        room_id_param, room_number_param, street_address_param, city_param, town_param, country_param, zipcode_param);

    return $.ajax({
        type: "POST",
        url: "/edit_existing_cheap_hotel_guest/"+guest_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(the_guest),
        success: data => {
            console.log(data);
            return data;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

function guest_manager_save_new_guest_onsubmit(type){
    //type === save
    guest_manager_save_new_or_existing_guest_onsubmit(type)
}

function guest_manager_edit_existing_guest_onsubmit(type){
    //type === edit
    guest_manager_save_new_or_existing_guest_onsubmit(type)
}

function clean_up_after_saving_new_guest(){
    document.getElementById("guest_manager_new_or_existing_guest_first_name_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_last_name_input").value = "";
    //document.getElementById("guest_manager_new_or_existing_guest_property_select").value;
    document.getElementById("guest_manager_new_or_existing_guest_email_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_gender_select").value = "Male";
    //document.getElementById("guest_manager_new_or_existing_guest_country_calling_code_input").value;
    document.getElementById("guest_manager_new_or_existing_guest_mobile_input").value = "";
    //address
    document.getElementById("guest_manager_new_or_existing_guest_street_address_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_town_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_city_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_country_input").value = "";
    document.getElementById("guest_manager_new_or_existing_guest_zipcode_input").value = "";
}