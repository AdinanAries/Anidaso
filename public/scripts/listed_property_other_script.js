
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
})