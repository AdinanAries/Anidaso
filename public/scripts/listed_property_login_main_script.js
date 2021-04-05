function go_to_home_page(){
    document.location.href = "/";
}


function login_func(email_param, password_param){
    $.ajax({
        type: "POST",
        url: "/listed_property_login",
        data: JSON.stringify({
            email: email_param,
            password: password_param
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: data =>{
            window.localStorage.setItem("ANDSBZID", data._id);
            login_success_function();
            //console.log(data);
        },
        error: err => {
            console.log(err);
        }
    });
}

document.getElementById("listed_property_login_btn").addEventListener("click", evnt => {
    let email = document.getElementById("listed_property_login_email_input").value;
    let password = document.getElementById("listed_property_login_password_input").value;
    if(email === ""){
        document.getElementById("listed_property_login_email_input").focus();
        document.getElementById("listed_property_login_email_input").placeholder = "please enter email";
    }else if(password === ""){
        document.getElementById("listed_property_login_password_input").focus();
        document.getElementById("listed_property_login_password_input").placeholder = "please enter password";
    }else{
        login_func(email, password);
    }
    
});

function login_success_function(){
    document.location.href = "/listed_property.html";
}