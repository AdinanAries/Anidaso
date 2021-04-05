var first_name_input = document.getElementById("login_fld_20");
var last_name_input = document.getElementById("login_fld_2");
var email_input = document.getElementById("login_fld_3");
var password_input = document.getElementById("login_fld_4");
var confirm_password_input = document.getElementById("login_fld_199");

var page_url = new URL(document.URL);

//types of travels on Anidaso for content personalization
 var travel_types = [
     "Leisure",
     "Business",
     "Holidays",
     "family Visit"
 ];
 var login_user_data = {
    username: "",
    password: ""
};
//helps personalize user's experience
//collect this data through user's previous activities and surveys
var user_meta_data = {
    travel_type: travel_types[1],
    gender: "",
    age: "",
};
//for collecting and signing up new users
 var signup_user_data = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
 };
 

function login_function(){
    
    let email_elem = document.getElementById("login_fld_0");
    let password_elem = document.getElementById("login_fld_1");

    let email = email_elem.value;
    let password = password_elem.value;

    if(email === ""){
        email_elem.focus();
        activate_login_fld(0);
        email_elem.placeholder = "please enter your email";
    }else if(password === ""){
        password_elem.focus();
        activate_login_fld(1);
        password_elem.placeholder = "please enter your password";
    }else{

        document.getElementById("main_login_submit_loader").style.display = "block";
        document.getElementById("main_login_submit_btn").style.display = "none";

        login_user_data.username = email;
        login_user_data.password = password;
        //login user here 
        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(login_user_data),
            success: data =>{

                console.log(data);

                if(data.status){
                    if(data.status === "fail"){
                        document.getElementById("main_login_submit_loader").style.display = "none";
                        document.getElementById("main_login_submit_btn").style.display = "block";
                        document.getElementById("main_login_status_msg").innerText = `⚠️ ${data.desc.message}`;
                        document.getElementById("main_login_status_msg").style.display = 'block';
                        return null;
                    }
                }
                document.getElementById("main_login_status_msg").style.display = 'none';

                document.getElementById("main_login_submit_loader").style.display = "none";
                document.getElementById("main_login_submit_btn").style.display = "block";
                email_elem.value = "";
                password_elem.value = "";
                login_success_function();
                display_login_user_info(data.data)
            },
            error: err =>{
                document.getElementById("main_login_submit_loader").style.display = "none";
                document.getElementById("main_login_submit_btn").style.display = "block";
                document.getElementById("main_login_status_msg").innerText = `⚠️ An error occured. Please try again.`;
                document.getElementById("main_login_status_msg").style.display = 'block';
                console.log(err);
            }
        });
    }
}

document.getElementById("main_login_submit_btn").addEventListener("click", evnt =>{
    login_function();
});

function signup_function(){

    let password_complexity_result = password_complexity_checker(password_input.value);

    if(first_name_input.value === ""){
        first_name_input.focus();
        first_name_input.placeholder = "first name is required";
    }else if(last_name_input.value === ""){
        last_name_input.focus();
        last_name_input.placeholder = "last name is required";
    }else if(email_input.value === ""){
        email_input.focus();
        email_input.placeholder = "email is required";
    }else if(password_input.value === ""){
        password_input.focus();
        password_input.placeholder = "password is required";
    }else if(password_input.value !== confirm_password_input.value){
        confirm_password_input.value = "";
        confirm_password_input.placeholder = "passwords don't match";
        confirm_password_input.focus();
    }else if(!password_complexity_result.pass){
        password_input.placeholder = password_complexity_result.msg;
        confirm_password_input.value = "";
        password_input.value = "";
        password_input.focus();
    }else{

        collect_user_signup_data().then(()=>{
            //do ajax here after collecting post data into post object
            //console.log(signup_user_data)
            
            document.getElementById("main_signup_submit_loader").style.display = "block";
            document.getElementById("sign_up_anidaso_user_btn").style.display = "none";

            $.ajax({
                type: "POST",
                data: JSON.stringify(signup_user_data),
                url: "/signup",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: data =>{

                    console.log(data);

                    if(data.failed){
                        document.getElementById("main_signup_status_msg").innerText = `⚠️ ${data.msg}`;
                        document.getElementById("main_signup_status_msg").style.display = 'block';
                        document.getElementById("main_signup_submit_loader").style.display = "none";
                        document.getElementById("sign_up_anidaso_user_btn").style.display = "block";
                    }else{
                        //login user here 
                        login_with_params_function(data.email, password_input.value);
                        show_prompt_to_user("Signup", "You've signed up successfully!");
                        clear_user_data_from_signup_form();
                        document.getElementById("main_signup_submit_loader").style.display = "none";
                        document.getElementById("sign_up_anidaso_user_btn").style.display = "block";
                    }


                },
                error: err =>{
                    console.log(err)
                }
            });
        }).catch( err => {
            console.log(err)
        });
        
    }
}

function login_with_params_function(email, password){

    $.ajax({
        type: "POST",
        url: "/login",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            username: email,
            password: password
        }),
        success: result => {
            console.log(result);

            if(data.status){
                if(data.status === "fail"){
                    document.getElementById("main_login_status_msg").innerText = `⚠️ ${data.desc.message}`;
                    document.getElementById("main_login_status_msg").style.display = 'block';
                    return null;
                }
            }
            document.getElementById("main_login_status_msg").style.display = 'none';

            login_success_function();
            display_login_user_info(result.data)
        },
        error: er =>{
            console.log(er);
        }
    });

}

function display_login_user_info(user_obj){
    //console.log(user_obj);
    get_user_info_by_id(user_obj._id)
    window.localStorage.setItem("ANDSUSR", user_obj._id);
}

function get_user_info_by_id(id){
    $.ajax({
        type: "GET",
        url: `./get_login_user/${id}`,
        success: data => {
            console.log(data);

            change_page_url("");

            if(document.getElementById("mobile_menu_logged_in_user_info")){
                document.getElementById("mobile_menu_logged_in_user_info").innerHTML =
                `
                    <div style="display: flex; flex-direction: row !important; padding: 10px; padding-top: 0;">
                        <div class="logged_in_user_nav_profile_picture">
                        <div style="border:rgb(235, 86, 0) 2px solid" class="logged_in_user_nav_profile_picture_container">
                            <img src="images/Anonymous_person3.jpg" alt="logged in user avatar"/>
                        </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; margin-left: 5px;">
                            <p style="font-size: 13px; font-weight: bolder; color: rgb(235, 86, 0); letter-spacing: 1px;">${data.first_name} ${data.last_name}</p>
                            <p style="font-size: 12px; font-weight: bolder; color: rgb(235, 86, 0); letter-spacing: 1px; margin-top: 5px;">${data.email}</p>
                        </div>
                    </div>
                    <div onclick="logout_func();" style="border-radius: 4px; margin: 0 10px; cursor: pointer; padding: 10px; background-color: rgb(139, 18, 44); color: white; font-size: 14px; text-align: center;">
                        logout
                    </div>
                `;

            }

            if(document.getElementById("logged_in_user_main_top_nav_info")){
                document.getElementById("logged_in_user_main_top_nav_info").innerHTML =
                `
                    <div class="logged_in_user_nav_profile_picture">
                        <div class="logged_in_user_nav_profile_picture_container">
                        <img src="images/Anonymous_person3.jpg" alt="logged in user avatar"/>
                        </div>
                    </div>
                    <div class="logged_in_user_nav_profile_name">
                        <p>${data.first_name}</p>
                    </div>
                    <div class="logged_in_user_nav_info_drop_down">
                        <p style="margin-top: 10px; font-size: 14px; color: rgb(235, 86, 0); font-weight: bolder; text-align: center;">${data.first_name} ${data.last_name}</p>
                        <p style="font-size: 12px; color: rgb(0, 26, 43); text-align: center; margin-top: 5px;">${data.email}</p>
                        <div onclick="logout_func();" style="cursor: pointer; padding: 10px; background-color: rgb(139, 18, 44); color: white; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; font-size: 14px; text-align: center; margin: auto; margin-top: 10px;">
                            logout
                        </div>
                    </div>
                `;
            }
        },
        error: err =>{
            console.log(err);
        }

    });
}

async function collect_user_signup_data(){
    signup_user_data.firstname = first_name_input.value;
    signup_user_data.lastname = last_name_input.value;
    signup_user_data.email = email_input.value;
    signup_user_data.password = password_input.value;
}

function clear_user_data_from_signup_form(){
    first_name_input.value = "";
    last_name_input.value = "";
    email_input.value = "";
    password_input.value = "";
    confirm_password_input.value = "";
}


function password_complexity_checker(password){

    let contains_number = false;
    let contains_uppercase = false

    //checking password string
    for(let i = 0; i < password.length; i++){
        if(!isNaN(password.charAt(i))){
            contains_number = true;
        }
        if(password.charAt(i) === password.charAt(i).toUpperCase()
            && password.charAt(i) !== password.charAt(i).toLowerCase()){
            contains_uppercase = true
        }
    }

    //returning response object
    if(password.length < 8){
        return {
            pass: false,
            msg: "password too short"
        }
    }else if(!contains_number){
        return {
            pass: false,
            msg: "password must contain at least one number"
        }
    }else if(!contains_uppercase){
        return {
            pass: false,
            msg: "password must contain atleast one uppercase letter"
        }
    }else{
        return {
            pass: true,
            msg: "all password complexity requirements have been met"
        }
    }
}

document.getElementById("sign_up_anidaso_user_btn").addEventListener("click", evnt => {
    signup_function();
});

//this function runs when user successfully logs in and also with the login that happens after signup
function login_success_function(){

    toggle_show_login_div();

    if($(window).width() > 1025){
        if(document.getElementById("top_nav_signin_btn"))
            document.getElementById("top_nav_signin_btn").style.display = "none";

        if(document.getElementById("logged_in_user_main_top_nav_info"))
            document.getElementById("logged_in_user_main_top_nav_info").style.display = "flex";
    }else{
        if(document.getElementById("mobile_top_nav_signin_btn"))
            document.getElementById("mobile_top_nav_signin_btn").style.display = "none";

        if(document.getElementById("mobile_menu_logged_in_user_info"))
            document.getElementById("mobile_menu_logged_in_user_info").style.display = "block";

        if(document.getElementById("search_page_mobile_menu_logged_in_user_info"))
            document.getElementById("search_page_mobile_menu_logged_in_user_info").style.display = "block";
    }

    show_prompt_to_user("Login", "You've logged in successfully!");

}

function ensure_loggedIn_func(){
    if(window.localStorage.getItem("ANDSUSR")){

        get_user_info_by_id(window.localStorage.getItem("ANDSUSR"));

        if($(window).width() > 1025){
            if(document.getElementById("top_nav_signin_btn"))
                document.getElementById("top_nav_signin_btn").style.display = "none";

            if(document.getElementById("logged_in_user_main_top_nav_info"))
                document.getElementById("logged_in_user_main_top_nav_info").style.display = "flex";
        }else{
            if(document.getElementById("mobile_top_nav_signin_btn"))
                document.getElementById("mobile_top_nav_signin_btn").style.display = "none";
        
            if(document.getElementById("mobile_menu_logged_in_user_info"))
                document.getElementById("mobile_menu_logged_in_user_info").style.display = "block";

            if(document.getElementById("search_page_mobile_menu_logged_in_user_info"))
                document.getElementById("search_page_mobile_menu_logged_in_user_info").style.display = "block";
        }
    }
    /*$.ajax({
        type: "GET",
        url: "./ensureLoggedIn",
        sucess: data =>{
            console.log(data);
        },
        error: err =>{
            console.log(err)
        }
    });*/
}

function logout_func(){

    if(document.getElementById("logged_in_user_main_top_nav_info")){
        document.getElementById("logged_in_user_main_top_nav_info").innerHTML = `
            <div style="padding-top: 10px;">
                <div style="width: 100%; text-align: center;" class="loader2 loader--style2" title="1">
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                        <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                            <animateTransform attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.6s"
                            repeatCount="indefinite"/>
                        </path>
                    </svg>
                    <p style="text-align: center; font-size: 12px; color: white;">
                        logging off...
                    </p>
                </div>
            </div>
        `;
    }
    if(document.getElementById("mobile_menu_logged_in_user_info")){
        document.getElementById("mobile_menu_logged_in_user_info").innerHTML = `
        <div style="padding-top: 20px;">
            <div style="width: 100%; text-align: center;" class="loader2 loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"/>
                    </path>
                </svg>
                <p style="text-align: center; font-size: 12px; color: white;">
                    logging off...
                </p>
            </div>
        </div>
        `;
    }

    //destroy the session on the server here
    setTimeout(()=>{
        
        if(document.getElementById("mobile_top_nav_signin_btn")){
            document.getElementById("mobile_top_nav_signin_btn").style.display = "block";
        }
        if(document.getElementById("mobile_menu_logged_in_user_info")){
            document.getElementById("mobile_menu_logged_in_user_info").style.display = "none";
        }
        if(document.getElementById("logged_in_user_main_top_nav_info")){
            document.getElementById("logged_in_user_main_top_nav_info").style.display = "none";
        }

        if($(window).width() > 1025){
            if(document.getElementById("top_nav_signin_btn")){
                document.getElementById("top_nav_signin_btn").style.display = "inline"; 
            }
        }

        window.localStorage.removeItem("ANDSUSR");
    }, 5000);
}

$(document).ready(function(){
    if(page_url.pathname === "/register_hotel_brand"){
        toggle_show_hide_book_cheap_book_direct_register_hotel_div();
    }
    if(page_url.pathname === "/login"){

        if(window.localStorage.getItem("ANDSUSR")){
            ensure_loggedIn_func();
            return null
        }

        toggle_show_login_div();
    }
    if(page_url.pathname === "/signup"){

        if(window.localStorage.getItem("ANDSUSR")){
            ensure_loggedIn_func();
            return null
        }

        toggle_show_login_div();
        toggle_show_login_or_signup_forms();
    }
    ensure_loggedIn_func();
});


