var register_cheap_hotel_post_data = {
    approved: false,
    subscribed: false,
    subscription_id: "",
    name: "",
    location: "",
    url: "",
    price: "",
    currency: "USD",
    photos: [],
    cities_operating: [],
    email: "",
    mobile: "",
    description: "",
    rating: 5,
    password: "",
    reviews: [
        {
            person: "Anidaso Team",
            image: "./images/management_team_icon.png",
            rated: 5,
            message: "We have conducted checks on this hotel brand and we are satisfied by our findings."
        }
    ],
    fax: "",
    number_of_ratings: 1,
    number_of_reviews: 1,
    amenities: [],
    sentiments: [],
    policies_and_restrictions: [ //An array of objects, each object representing some type of policy and its information
        {  
            title: "Child Policies",
            values: []
        },
        {  
            title: "Cancellation Policies",
            values: []
        },
        {  
            title: "Age Restrictions",
            values: []
        },
        {  
            title: "Group Policies",
            values: []
        },
    ]

}

var book_cheap_hotel_register_new_hotel_button = document.getElementById("book_cheap_hotel_register_new_hotel_button");
var book_cheap_book_direct_register_hotel_name_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_name_input_fld");
var book_cheap_book_direct_register_hotel_avg_price_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_avg_price_input_fld");
var book_cheap_book_direct_register_hotel_url_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_url_input_fld");
var book_cheap_book_direct_register_main_location_input_fld = document.getElementById("book_cheap_book_direct_register_main_location_input_fld");
var book_cheap_book_direct_register_hotel_email_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_email_input_fld");
var book_cheap_book_direct_register_hotel_phone_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_phone_input_fld");
var book_cheap_book_direct_register_hotel_description_input = document.getElementById("book_cheap_book_direct_register_hotel_description_input");
var register_cheap_hotels_location_text_field = document.getElementById("register_cheap_hotels_location_text_field");
var book_cheap_book_direct_add_hotel_add_pic_input_1 = document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_1");
var book_cheap_book_direct_add_hotel_add_pic_input_2 = document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_2");
var book_cheap_book_direct_add_hotel_add_pic_input_3 = document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_3");
var book_cheap_book_direct_add_hotel_add_pic_input_4 = document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_4");
var book_cheap_book_direct_register_hotel_password_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_password_input_fld");
var book_cheap_book_direct_register_hotel_confirm_password_input_fld = document.getElementById("book_cheap_book_direct_register_hotel_confirm_password_input_fld");


async function collect_register_cheap_hotel_data(){
    register_cheap_hotel_post_data.name = book_cheap_book_direct_register_hotel_name_input_fld.value;
    register_cheap_hotel_post_data.price = book_cheap_book_direct_register_hotel_avg_price_input_fld.value;
    register_cheap_hotel_post_data.url = book_cheap_book_direct_register_hotel_url_input_fld.value;
    register_cheap_hotel_post_data.location = book_cheap_book_direct_register_main_location_input_fld.value;
    register_cheap_hotel_post_data.email = book_cheap_book_direct_register_hotel_email_input_fld.value;
    register_cheap_hotel_post_data.mobile = book_cheap_book_direct_register_hotel_phone_input_fld.value;
    register_cheap_hotel_post_data.description = book_cheap_book_direct_register_hotel_description_input.value;

    /*/adding user's selected photos
    register_cheap_hotel_post_data.photos.push(book_cheap_book_direct_add_hotel_add_pic_input_1.value);
    register_cheap_hotel_post_data.photos.push(book_cheap_book_direct_add_hotel_add_pic_input_2.value);
    register_cheap_hotel_post_data.photos.push(book_cheap_book_direct_add_hotel_add_pic_input_3.value);
    register_cheap_hotel_post_data.photos.push(book_cheap_book_direct_add_hotel_add_pic_input_4.value);*/

}

async function check_if_cheap_hotel_is_already_registered(){

    return $.ajax({
        type: "POST",
        url: "/check_if_cheap_hotel_is_already_registered",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(register_cheap_hotel_post_data),
        success: res =>{
            return res
        },
        error: err =>{
            return res
        }
    });

}

book_cheap_hotel_register_new_hotel_button.addEventListener("click", evnt => {
    
    if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "hotel name is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_avg_price_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "average price is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_url_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "web url is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_main_location_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "main location is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_email_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "email is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_phone_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "phone is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_description_input.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "description is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_add_hotel_add_pic_input_1.value === "" || 
             book_cheap_book_direct_add_hotel_add_pic_input_2.value === "" ||
             book_cheap_book_direct_add_hotel_add_pic_input_3.value === "" ||
             book_cheap_book_direct_add_hotel_add_pic_input_4.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "add all four(4) photos"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(register_cheap_hotel_post_data.cities_operating.length < 1){
        book_cheap_hotel_register_new_hotel_button.innerText = "add atleast one city"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_password_input_fld.value === ""){
        book_cheap_hotel_register_new_hotel_button.innerText = "password is required"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else if(book_cheap_book_direct_register_hotel_confirm_password_input_fld.value !== book_cheap_book_direct_register_hotel_password_input_fld.value){
        book_cheap_hotel_register_new_hotel_button.innerText = "passwords don't match"
        book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
        book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
    }else{

        //collecting value from input into post data object
        collect_register_cheap_hotel_data().then(() => {

            document.getElementById("book_cheap_hotel_register_new_hotel_loader_animation").style.display = "block";
            book_cheap_hotel_register_new_hotel_button.style.display = "none";

            check_if_cheap_hotel_is_already_registered().then(data =>{

                if(data.success){
                    toggle_hide_show_cheap_hotel_payments_prompt();
                }else{
                    document.getElementById("book_cheap_hotel_register_new_hotel_loader_animation").style.display = "none";
                    book_cheap_hotel_register_new_hotel_button.style.display = "block";
                    book_cheap_hotel_register_new_hotel_button.innerText = data.msg;
                    book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "orangered";
                    book_cheap_hotel_register_new_hotel_button.style.borderColor = "orange";
                }
                
            }).catch(err=>{
                console.log(err);
            });
            
        }).catch(err => {
            console.log(err);
        });

        //1. Do validation on server first to make sure data can be saved - /validate_cheap_hotel_data/
        
        //2. Start subscription and payment process - /series of subscription and payments endpoints required by stripes payment gateway
        //3. If payment is successul, save user's information to DB - /register_cheap_hotel/
        
    }
    
});

function on_input_reset_func(){
    book_cheap_hotel_register_new_hotel_button.style.backgroundColor = "rgb(5, 146, 116)";
    book_cheap_hotel_register_new_hotel_button.style.borderColor = "rgb(48, 199, 166)";
    book_cheap_hotel_register_new_hotel_button.innerText = "Register";
}

function cheap_hotel_preview_image(event, elem, index) {

    if(event.target.value !== ""){
        //file url looks like "https://anidaso-img.s3.amazonaws.com/HotelEfyaSplending_hotel_one_seed2.jpg_0"
                            //"protocol://bucket_name.s3.amazonaws.com/file_name"
        try{
            let s3_photo_url = register_cheap_hotel_post_data.photos[index].split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            delete_s3_file(s3_photot_file_name);
        }catch(e){
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }
    }

    var reader = new FileReader();
    reader.onload = function()
    {

        if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
            alert("you must enter hotel name first in order to upload photos");
            return null;
        }

        var output = document.getElementById(elem);
        output.style.backgroundImage = `url('${reader.result}')`;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function register_cheap_hotel_add_city_to_operating_cities(){
    if(register_cheap_hotels_location_text_field.value === ""){
        register_cheap_hotels_location_text_field.focus()
        register_cheap_hotels_location_text_field.placeholder = "please enter city/country";
    }else{
        if(register_cheap_hotel_current_input_location.city === "" || register_cheap_hotel_current_input_location.country === ""){

            let city_arr = all_world_cities_auto_complete(register_cheap_hotels_location_text_field.value);
            if(city_arr.length > 0){
                register_cheap_hotel_add_city(`${city_arr[0].name},${city_arr[0].country}`);
            }else{
                register_cheap_hotels_location_text_field.value = "";
                register_cheap_hotels_location_text_field.focus()
                register_cheap_hotels_location_text_field.placeholder = "please enter valid city";
            }
        }else{
            register_cheap_hotel_add_city(register_cheap_hotels_location_text_field.value);
        }
    }

    on_input_reset_func();
}

function register_cheap_hotel_add_city(city_country){

    let item_index = (register_cheap_hotel_post_data.cities_operating.length); //length is going to be one more than last index
    
    let city_value = city_country.split(",")[0].trim();
    let country_value = city_country.split(",")[1].trim();

    let contains_array = register_cheap_hotel_post_data.cities_operating.filter(
        each => ((each.city + each.country) === (city_value + country_value))
    );

    if(contains_array.length > 0){
        register_cheap_hotels_location_text_field.focus();
        register_cheap_hotels_location_text_field.value = "";
        register_cheap_hotels_location_text_field.placeholder = "city already added";
    }else{
        register_cheap_hotel_post_data.cities_operating.push({city: city_value, country: country_value});

        //Create Dom here
        document.getElementById("register_cheap_hotels_cities_in_operation_list")
        .innerHTML += `
            <p id="register_cheap_hotels_city_in_operation_${item_index}" style="margin-right: 5px; background-color:rgb(74, 101, 112); color: white; border-radius: 4px; padding: 10px; font-size: 11px;"
            >${city_value}
                <span onclick="register_cheap_hotel_remove_city_from_operating_cities(${item_index}, '${city_value}', '${country_value}');" style="padding: 5px; padding-left: 15px;">
                    <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
                </span>
            </p>
        `;
        
        register_cheap_hotels_location_text_field.value = "";
        register_cheap_hotels_location_text_field.placeholder = "";
        console.log(register_cheap_hotel_post_data.cities_operating);
    }

}

function register_cheap_hotel_remove_city_from_operating_cities(index, city, country){
    
    register_cheap_hotel_post_data.cities_operating = register_cheap_hotel_post_data.cities_operating.filter(
        each => ((each.city + each.country) !== (city + country))
    );
    document.getElementById("register_cheap_hotels_city_in_operation_"+index).style.display = "none";
    document.getElementById("register_cheap_hotels_city_in_operation_"+index).remove();
    console.log(register_cheap_hotel_post_data.cities_operating);
}

document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_1").addEventListener("change", ()=>{

    if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
        return null;
    }

    set_current_selected_file_input(1);
    upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_1", 0).then(()=>{
        
    });

});

document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_2").addEventListener("change", ()=>{

    if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
        return null;
    }

    set_current_selected_file_input(2);
    upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_2", 1).then(()=>{
        
    });

});

document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_3").addEventListener("change", ()=>{

    if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
        return null;
    }

    set_current_selected_file_input(3);
    upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_3", 2).then(()=>{
        
    });

});

document.getElementById("book_cheap_book_direct_add_hotel_add_pic_input_4").addEventListener("change", ()=>{

    if(book_cheap_book_direct_register_hotel_name_input_fld.value === ""){
        return null;
    }

    set_current_selected_file_input(4);
    upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_4", 3).then(()=>{
        
    });

});

function set_current_selected_file_input(number){
    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_btn")).forEach(each => {
        each.style.opacity = 0.4;
    });

    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_input_label")).forEach(each => {
        each.style.display = "none";
    });
    document.getElementById("book_cheap_book_direct_add_hotel_add_pic_upload_loader_"+number).style.display = "block";
    document.getElementById("book_cheap_book_direct_add_hotel_add_pic_btn_"+number).style.opacity = 1;
}

function reset_all_cheap_hotels_file_input(){
    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_btn")).forEach(each => {
        each.style.opacity = 1;
    });
    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_input_label")).forEach(each => {
        each.style.display = "flex";
    });
    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_upload_loader")).forEach(each => {
        each.style.display = "none";
    })
}

async function upload_photos_to_cloud_bucket(){

    /*/first photo
    return upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_1", 0).then(res =>{

        //second photo
        return upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_2", 1).then( res1 => {

            //third photo
            return upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_3", 2).then( res2 => {
                //fourth photo
                return upload_photo_to_s3("book_cheap_book_direct_add_hotel_add_pic_input_4", 3).then( res3 => {
                    return {
                        success: true
                    }

                }).catch(err1 => {
                    console.log(err1);
                    return err1
                });
            }).catch(err2 => {
                console.log(err2);
                return err2
            });
        }).catch(err3 => {
            console.log(err3);
            return err3
        });
    }).catch(err4 => {
        console.log(err4);
        return err4
    });*/
    
}

async function upload_photo_to_s3(file_input_Id, file_index){
    //call this function 4 times in main function for uploads

    const files = document.getElementById(file_input_Id).files;
    const file = files[0];

    if(file == null){

        try{
            let s3_photo_url = register_cheap_hotel_post_data.photos[file_index].split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            delete_s3_file(s3_photot_file_name);
        }catch(e){
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }

        reset_all_cheap_hotels_file_input();
        console.log('no file selected.');
        document.getElementById("book_cheap_book_direct_add_hotel_add_pic_btn_"+(file_index+1)).style.backgroundImage = "none";
        return {
            success: false,
            msg: "no file selected."
        }
        
    }
    //getSignedRequest(file);

    return $.ajax({
        type: "GET",
        url: `/upload_picture_sign_s3?file-name=${book_cheap_book_direct_register_hotel_name_input_fld.value.replaceAll(" ", "").trim()}_${file_index}_${file.name}&file-type=${file.type}`,
        success: res_data => {

            //const response = JSON.parse(xhr.responseText);
            const response = res_data;
            console.log(res_data);

            register_cheap_hotel_post_data.photos[file_index] = response.url;
            console.log(register_cheap_hotel_post_data);

            uploadFile(file, response.signedRequest, file_index).then(res_data2 => {
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

//this function uploads image file to AWS s3
async function uploadFile(file, signedRequest, file_index){
    return $.ajax({
        type: "PUT",
        url: signedRequest,
        contentType: file.type,
        processData: false,
        data: file,
        success: res => {

            //console.log(res);
            console.log("file upload completed")
            reset_all_cheap_hotels_file_input();

            return {
                success: true
            }
        },
        error: err => {
            console.log('could not upload file.');

            document.getElementById("book_cheap_hotel_register_new_hotel_loader_animation").style.display = "none";
            book_cheap_hotel_register_new_hotel_button.style.display = "block";

            document.getElementById("book_cheap_book_direct_add_hotel_add_pic_btn_"+(file_index+1)).style.backgroundImage = "none";
            reset_all_cheap_hotels_file_input();

            return {
                success: false,
                error: err
            }
        }

    });
    /*const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){

            //document.getElementById('preview').src = url;
            //document.getElementById('avatar-url').value = url;
            register_cheap_hotel_post_data.photos[array_index] = url;

        }else{

            console.log('could not upload file.');
            register_cheap_hotel_post_data.photos[array_index] = url;
          
        }
      }
    };
    xhr.send(file);*/
}

function save_cheap_hotel_information_to_db(){
    $.ajax({
        type: "POST",
        url: "./register_cheap_hotel",
        data: JSON.stringify(register_cheap_hotel_post_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: res =>{

            console.log(res);

            if(res.success){

                reset_register_hotel_form();
                toggle_show_hide_book_cheap_book_direct_register_hotel_div();
                show_prompt_to_user("Hotel Registration", "Your property has been registered successfully!");
            
            }

        },
        error: err =>{
            console.log(err);
        }
    });
}

function reset_register_hotel_form(){

    document.getElementById("book_cheap_hotel_register_new_hotel_loader_animation").style.display = "none";
    book_cheap_hotel_register_new_hotel_button.style.display = "block";

    //clearing all inputs
    book_cheap_book_direct_register_hotel_name_input_fld.value = "";
    book_cheap_book_direct_register_hotel_avg_price_input_fld.value = "";
    book_cheap_book_direct_register_hotel_url_input_fld.value = "";
    book_cheap_book_direct_register_main_location_input_fld.value = "";
    book_cheap_book_direct_register_hotel_email_input_fld.value = "";
    book_cheap_book_direct_register_hotel_phone_input_fld.value = "";
    book_cheap_book_direct_register_hotel_description_input.value = "";
    register_cheap_hotels_location_text_field.value = "";
    book_cheap_book_direct_add_hotel_add_pic_input_1.value = "";
    book_cheap_book_direct_add_hotel_add_pic_input_2.value = "";
    book_cheap_book_direct_add_hotel_add_pic_input_3.value = "";
    book_cheap_book_direct_add_hotel_add_pic_input_4.value = "";

    //resetting photo backgrounds
    reset_all_cheap_hotel_upload_photo_btn_bgs();

}

function reset_all_cheap_hotel_upload_photo_btn_bgs(){
    Array.from(document.getElementsByClassName("book_cheap_book_direct_add_hotel_add_pic_btn")).forEach(each =>{
        each.style.backgroundImage = "none";
    });
}

function delete_s3_file(s3_file_name){
    $.ajax({
        type: "DELETE",
        url: `./delete_file_from_s3?file_name=${s3_file_name}`,
        success: res =>{
            console.log(res)
        },
        error: err =>{
            console.log(err);
        }
    });
}
//toggle_hide_show_cheap_hotel_payments_prompt();