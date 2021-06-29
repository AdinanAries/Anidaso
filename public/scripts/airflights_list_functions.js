var show_fastest_travel_times_clicked = false;
var done_skipping = false;
var show_cheapest_travels_clicked = false;

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function convert_date_object_to_db_string_format(dateObj){
    
    let the_month = dateObj.toLocaleString().split(",")[0].split("/")[0];
    let the_day = dateObj.toLocaleString().split(",")[0].split("/")[1];
    let the_year = dateObj.toLocaleString().split(",")[0].split("/")[2];
    //console.log(`${the_year}/${the_month}/${the_day}`)

    let a_date = new Date(`${the_year}/${the_month}/${the_day}`);
    //a_date = new Date(a_date.setDate(a_date.getDate() - 1));

    let date_string = a_date.toISOString(); //eg. 2021-05-02T09:13:26.243Z*/
    return date_string.split("T")[0];

}

//this function show each flight ticket main details
function show_flight_ticket_item_main_details_set(number){

    document.getElementById("flight_ticket_item_details_each_top_option_details_btn"+number).classList.add("active");
    document.getElementById("flight_ticket_item_details_each_top_option_fairs_btn"+number).classList.remove("active");

    $("#flight_ticket_item_details_section_content_set"+number).slideDown("fast");
    $("#flight_ticket_item_fairs_details_section_content_set"+number).slideUp("fast");

}

function show_flight_ticket_item_fair_details_set(number){
    
    document.getElementById("flight_ticket_item_details_each_top_option_details_btn"+number).classList.remove("active");
    document.getElementById("flight_ticket_item_details_each_top_option_fairs_btn"+number).classList.add("active");

    $("#flight_ticket_item_details_section_content_set"+number).slideUp("fast");
    $("#flight_ticket_item_fairs_details_section_content_set"+number).slideDown("fast");

}

var site_lower_section_tabs_best_option = document.getElementById("site_lower_section_tabs_best_option");
var site_lower_section_tabs_best_option_content = document.getElementById("site_lower_section_tabs_best_option_content");
var site_lower_section_tabs_cheapest_option = document.getElementById("site_lower_section_tabs_cheapest_option");
var site_lower_section_tabs_cheapest_option_content = document.getElementById("site_lower_section_tabs_cheapest_option_content");
var site_lower_section_tabs_LeastC02_option = document.getElementById("site_lower_section_tabs_LeastC02_option");

function getBestFlights(){

    site_lower_section_tabs_cheapest_option.classList.remove("active");
    site_lower_section_tabs_LeastC02_option.classList.remove("active");
    site_lower_section_tabs_best_option.classList.add("active");

    site_lower_section_tabs_best_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";
    site_lower_section_tabs_cheapest_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";

    show_only_fastest_travel_times();

}

function getCheapFlights(){

    site_lower_section_tabs_cheapest_option.classList.add("active");
    site_lower_section_tabs_LeastC02_option.classList.remove("active");
    site_lower_section_tabs_best_option.classList.remove("active");

    site_lower_section_tabs_cheapest_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";
    site_lower_section_tabs_best_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";

    show_only_custom_travel_times();

}

function getLeastC02Flights(){

    show_fastest_travel_times_clicked = false;
    done_skipping = false;
    show_cheapest_travels_clicked = true;

    site_lower_section_tabs_cheapest_option.classList.remove("active");
    site_lower_section_tabs_LeastC02_option.classList.add("active");
    site_lower_section_tabs_best_option.classList.remove("active");

    site_lower_section_tabs_cheapest_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";
    site_lower_section_tabs_best_option_content.style.borderColor = "rgba(255, 255, 255, 0.2)";

    left_setting_no_stop_option.checked = true;
    left_setting_one_stop_option.checked = true;
    left_setting_twoplus_stop_option.checked = true;

    filter_flights_by_stop();

    /*document.getElementById("main_tickets_section_list_container").innerHTML =
                    `
                        <div style=" background-color: white; border-radius: 4px; margin: 15px 0;
                            padding: 50px 0; animation: display_anim 1000ms ease-out;">
                            <p style="text-align: center;">
                                <img src="/images/search_not_found.png" style="width: 60px; height: 60px;" alt=""/>
                            </p>
                            <p style="color: #00284e; font-weight: bolder; font-size: 13px; text-align: center;">
                                Oops! nothing found for this search.
                            </p>
                        </div>

                    `;*/

}

function show_flight_ticket_added_policies_content(number){
    let read_more_txt = document.getElementById("each_flight_ticket_added_policies_content_read_more_txt"+number);
    let chevron_icon = document.getElementById("each_flight_ticket_added_policies_content_chevron_icon"+number);
    let content_div = document.getElementById("each_flight_ticket_added_policies_content"+number);
    let title = document.getElementById("each_flight_ticket_added_policies_content_title"+number);
    let summary = document.getElementById("each_flight_ticket_added_policies_content_summary"+number);

    if(content_div.style.display === "none"){
        $("#each_flight_ticket_added_policies_content"+number).slideDown("fast");
        summary.style.display = "none";
        title.style.display = "block";
        chevron_icon.style.transform = "rotate(180deg)";
        read_more_txt.style.display = "none";
    }else{
        $("#each_flight_ticket_added_policies_content"+number).slideUp("fast");
        chevron_icon.style.transform = "rotate(0deg)";
        read_more_txt.style.display = "block";
        title.style.display = "none";
        summary.style.display = "block";
    }

}

function covert_time_to_12_hour(time_param){
    //console.log(time_param)
    let timeArr = time_param.split(":");
    let hours = timeArr[0];
    let minutes = timeArr[1];
    //var dt = new Date();
    //var hours = dt.getHours() ; // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';

    hours = (hours % 12) || 12;
    //var minutes = dt.getMinutes() ;

    var finalTime = hours + ":" + minutes + " " + AmOrPm; 
    //finalTime // final time Time - 22:10
    return finalTime;
}

function timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
}

function return_time_diff(firstTime, secondTime){
    let first_hours = firstTime.split(":")[0];
    //let first_minutes = firstTime.toLowerCase().split(":")[1].split(" ")[0].split("p")[0].split("a")[0];
    let first_minutes = firstTime.split(":")[1];

    first_hours = parseInt(first_hours);
    first_minutes = parseInt(first_minutes);

    let first_time_total_minutes = ((first_hours * 60) + first_minutes);

    console.log("first H: " + first_hours + ", first M: " + first_minutes );

    let second_hours = secondTime.split(":")[0];
    //let second_minutes = secondTime.toLowerCase().split(":")[1].split(" ")[0].split("p")[0].split("a")[0];
    let second_minutes = secondTime.split(":")[1];

    second_hours = parseInt(second_hours);
    second_minutes = parseInt(second_minutes);

    let second_time_total_minutes = ((second_hours * 60) + second_minutes);

    console.log("second H: " + second_hours + ", second M: " + second_minutes );

    let minute_diff =  second_time_total_minutes - first_time_total_minutes
    console.log(minute_diff);

    return timeConvert(minute_diff);

}

//return_time_diff("9:00", "22:40");

function get_transfer_duration(timeA, timeB){

    let timeADate = timeA.split("T")[0];
    let timeBDate = timeB.split("T")[0];
    //console.log(timeADate);
    //console.log(timeBDate);
    
    let timeATime = timeA.split("T")[1];
    let timeBTime = timeB.split("T")[1];
    //console.log(timeATime);
    //console.log(timeBTime);

    let firstDateObj = new Date(parseInt(timeADate.split("-")[0]), parseInt(timeADate.split("-")[1]) - 1,
                                    parseInt(timeADate.split("-")[2]), timeATime.split(":")[0], 
                                    timeATime.split(":")[1], 0, 0);

    let secondDAteObj = new Date(parseInt(timeBDate.split("-")[0]), parseInt(timeBDate.split("-")[1]) - 1,
                                    parseInt(timeBDate.split("-")[2]), timeBTime.split(":")[0], 
                                    timeBTime.split(":")[1], 0, 0);
    //console.log(firstDateObj);
    let dif = (secondDAteObj - firstDateObj); 
    dif = Math.round((dif/1000)/60);

    //console.log(dif);

    return timeConvert(dif);


}

//console.log(get_transfer_duration("2021-04-01T21:00:00", "2021-04-01T22:40:00"));
var submit_booking_travelers_info_status_containter = document.getElementById("submit_booking_travelers_info_status_containter");
var submit_flight_ticket_booking_loader = document.getElementById("submit_flight_ticket_booking_loader");

var booking_forms_current_travelers_index = 0;
var booking_travelers;
var amadues_create_flight_order_post_data = {
    data: {
        type: "flight-order",
        flightOffers: [],
        travelers: [],
        remarks: {
            general: [
                {
                    subType: "GENERAL_MISCELLANEOUS",
                    text: "ONLINE BOOKING FROM ANIDASO.COM"
                }
            ]
        },
        ticketingAgreement: {
            option: "DELAY_TO_CANCEL",
            delay: "6D"
        },
        contacts: [
            {
              addresseeName: {
                firstName: "Mohammed",
                lastName: "Adinan"
              },
              companyName: "Anidaso.com",
              purpose: "STANDARD",
              phones: [
                {
                  deviceType: "LANDLINE",
                  countryCallingCode: "34",
                  number: "480080071"
                },
                {
                  deviceType: "MOBILE",
                  countryCallingCode: "33",
                  number: "480080072"
                }
              ],
              emailAddress: "support@increibleviajes.es",
              address: {
                lines: [
                  "Calle Prado, 16"
                ],
                postalCode: "28014",
                cityName: "Madrid",
                countryCode: "ES"
              }
            }
        ]
    }
}

function view_flight_deal(isAnidasoBookable, data_or_link){

    document.getElementById("full_page_loader_container").style.display = "block";
    document.getElementById("full_page_loader_container").style.opacity = 1;

    //console.log(JSON.parse(data_or_link.replaceAll('*#*$#%','"')));
    let flightObj = JSON.parse(data_or_link.replaceAll('*#*$#%','"'));

    //creating user objects for form data collection and aggregation

    booking_travelers = [];
    reset_booking_forms_inputs();
    show_finish_booking_form_personal_info_fieldset();

    submit_booking_travelers_info_status_containter.style.display = "none";
    submit_booking_travelers_info_status_containter.style.opacity = 0;
    submit_booking_travelers_info_status_containter.innerHTML = '';

    submit_flight_ticket_booking_loader.style.display = "none";
    submit_flight_ticket_booking_loader.style.opacity = 0;

    for(let q = 0; q < flightObj.travelerPricings.length; q++ ){

        let eachTraveler = {
            "id": (q+1),
            "dateOfBirth": convert_date_object_to_db_string_format(new Date()),
            "name": {
              "firstName": "Traveler",
              "lastName": (q+1)
            },
            "gender": "MALE",
            "contact": {
              "emailAddress": "N/A",
              "phones": [
                {
                  "deviceType": "MOBILE",
                  "countryCallingCode": "N/A",
                  "number": "N/A"
                }
              ]
            },
            "documents": [
              {
                "documentType": "PASSPORT",
                "birthPlace": "N/A",
                "issuanceLocation": "N/A",
                "issuanceDate": convert_date_object_to_db_string_format(new Date()),
                "number": "N/A",
                "expiryDate": convert_date_object_to_db_string_format(new Date()),
                "issuanceCountry": "N/A",
                "validityCountry": "N/A",
                "nationality": "N/A",
                "holder": true
              }
            ]
          };

          booking_travelers.push(eachTraveler);

        //booking_forms_render_each__travelers(q, JSON.stringify(eachTraveler).replaceAll('"','#@$%@#'));
        
    }
    
    console.log(booking_travelers);

    if(isAnidasoBookable){

        $.ajax({
            type: "POST",
            url: "/getfinalflightprice",
            data: flightObj,
            success: (res)=>{
                document.getElementById("full_page_loader_container").style.display = "none";
                document.getElementById("full_page_loader_container").style.opacity = 0;
                console.log(res);
                amadues_create_flight_order_post_data.data.flightOffers = res.data.flightOffers;
                toggle_show_finish_booking_form();
            },
            error: (err)=>{
                document.getElementById("full_page_loader_container").style.display = "none";
                document.getElementById("full_page_loader_container").style.opacity = 0;
                console.log(err);
            }
        });

    }else{
        let link = data_or_link;
        //handle this later;
    }

}

function booking_forms_set_current_traveler(number){

    submit_booking_travelers_info_status_containter.style.display = "none";
    submit_booking_travelers_info_status_containter.style.opacity = 0;
    submit_booking_travelers_info_status_containter.innerHTML = '';

    submit_flight_ticket_booking_loader.style.display = "none";
    submit_flight_ticket_booking_loader.style.opacity = 0;

    show_finish_booking_form_personal_info_fieldset();
    booking_forms_current_travelers_index = number;
    
    if(booking_travelers[number].contact.emailAddress === "N/A" && booking_travelers[number].name.firstName === "Traveler" 
        && booking_travelers[number].contact.phones[0].number === "N/A" && booking_travelers[number].contact.phones[0].countryCallingCode === "N/A"
        && booking_travelers[number].documents[0].issuanceCountry === "N/A" && booking_travelers[number].documents[0].birthPlace === "N/A"
        && booking_travelers[number].documents[0].issuanceLocation === "N/A" && booking_travelers[number].documents[0].validityCountry === "N/A"
        && booking_travelers[number].documents[0].nationality === "N/A" && booking_travelers[number].documents[0].number === "N/A"){
            reset_booking_forms_inputs();
        }else{

            document.getElementById("login_fld_5").value = booking_travelers[number].name.firstName === "Traveler" ? "" : booking_travelers[number].name.firstName;
            document.getElementById("login_fld_8").value = booking_travelers[number].name.lastName;
            document.getElementById("login_fld_10").value = booking_travelers[number].gender === "N/A" ? "" : booking_travelers[number].gender;
            document.getElementById("login_fld_9").focus();
            document.getElementById("login_fld_13").focus();
            document.getElementById("login_fld_14").focus();
            document.getElementById("login_fld_6").value = booking_travelers[number].contact.emailAddress === "N/A" ? "" : booking_travelers[number].contact.emailAddress;
            document.getElementById("login_fld_11").value = booking_travelers[number].contact.phones[0].countryCallingCode === "N/A" ? "" : `+${booking_travelers[number].contact.phones[0].countryCallingCode}`;
            document.getElementById("login_fld_7").value = booking_travelers[number].contact.phones[0].number === "N/A" ? "" : booking_travelers[number].contact.phones[0].number;
            document.getElementById("login_fld_110").value = booking_travelers[number].documents[0].documentType === "N/A" ? "" : booking_travelers[number].documents[0].documentType;
            document.getElementById("login_fld_12").value = booking_travelers[number].documents[0].number === "N/A" ? "" : booking_travelers[number].documents[0].number;
            document.getElementById("login_fld_15").value = booking_travelers[number].documents[0].issuanceCountry === "N/A" ? "" : booking_travelers[number].documents[0].issuanceCountry;
            document.getElementById("login_fld_16").value = booking_travelers[number].documents[0].validityCountry === "N/A" ? "" : booking_travelers[number].documents[0].validityCountry;
            document.getElementById("login_fld_17").value = booking_travelers[number].documents[0].nationality === "N/A" ? "" : booking_travelers[number].documents[0].nationality;
            document.getElementById("login_fld_18").value = booking_travelers[number].documents[0].birthPlace === "N/A" ? "" : booking_travelers[number].documents[0].birthPlace;
            document.getElementById("login_fld_19").value = booking_travelers[number].documents[0].issuanceLocation === "N/A" ? "" : booking_travelers[number].documents[0].issuanceLocation;
            /*
            document.getElementById("login_fld_111").addEventListener('change', (evnt) => {
                if(evnt.target.value === 'true'){
                    booking_travelers[booking_forms_current_travelers_index].documents[0].holder = true;
                }else{
                    booking_travelers[booking_forms_current_travelers_index].documents[0].holder = false;
                }
            });*/
        }

    //console.log(number);
    
}

function booking_forms_render_each_traveler(index, traveler){

    let decoded_info = traveler.replaceAll('#@$%@#','"');
    let the_traveler = JSON.parse(decoded_info);
    //console.log(the_traveler);

    if(the_traveler.contact.emailAddress === "N/A" || the_traveler.name.firstName === "Traveler" 
        || the_traveler.contact.phones[0].number === "N/A" || the_traveler.contact.phones[0].countryCallingCode === "N/A"
        || the_traveler.documents[0].issuanceCountry === "N/A" || the_traveler.documents[0].birthPlace === "N/A"
        || the_traveler.documents[0].issuanceLocation === "N/A" || the_traveler.documents[0].validityCountry === "N/A"
        || the_traveler.documents[0].nationality === "N/A" || the_traveler.documents[0].number === "N/A"){

        document.getElementById("order_ticket_form_container_review_and_submit_travelers_list").innerHTML +=
        `
            <div data-completed="false" onclick="booking_forms_set_current_traveler(${index});" class="submit_each_traveler_review_info uncompleted_info">
                <p><i style="margin-right: 5px;" class="fa fa-user" aria-hidden="true"></i>${the_traveler.name.firstName} ${the_traveler.name.lastName}</p>
                <p><i style="margin-right: 5px;" class="fa fa-envelope" aria-hidden="true"></i>${the_traveler.contact.emailAddress}</p>
                <p><i style="margin-right: 5px;" class="fa fa-id-card" aria-hidden="true"></i>${the_traveler.documents[0].number}</p>
                
                <div style="font-size: 14px; padding: 20px; background-color: #0000001a; color: white; margin: 0; margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="background-color: #af2a12; border-radius: 100%; text-align: center; width: 30px; height: 30px; display: flex; flex-direction: column; justify-content: center; margin-right: 10px;">
                    <i style="color: white;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </div>
                <div style="display: flex; font-size: 14px; flex-direction: column; justify-content: center;">Uncompleted form. Click on this card...</div>
                </div>
            </div>
        `;
    }else{
        document.getElementById("order_ticket_form_container_review_and_submit_travelers_list").innerHTML +=
        `
            <div data-completed="true" onclick="booking_forms_set_current_traveler(${index});" class="submit_each_traveler_review_info">
                <p><i style="margin-right: 5px;" class="fa fa-user" aria-hidden="true"></i>${the_traveler.name.firstName} ${the_traveler.name.lastName}</p>
                <p><i style="margin-right: 5px;" class="fa fa-envelope" aria-hidden="true"></i>${the_traveler.contact.emailAddress}</p>
                <p><i style="margin-right: 5px;" class="fa fa-id-card" aria-hidden="true"></i>${the_traveler.documents[0].number}</p>
                
                <div style="font-size: 14px; padding: 20px; background-color: #0000001a; color: white; margin: 0; margin-top: 10px; display: flex; flex-direction: row !important;">
                <div style="background-color: #12af8d;; border-radius: 100%; text-align: center; width: 30px; height: 30px; display: flex; flex-direction: column; justify-content: center; margin-right: 10px;">
                    <i style="color: white;" class="fa fa-check" aria-hidden="true"></i>
                </div>
                <div style="display: flex; font-size: 14px; flex-direction: column; justify-content: center;">OK</div>
                </div>
            </div>
        `;
    }

}

function booking_forms_render_all_travelers(){

    console.log(booking_travelers);

    document.getElementById("order_ticket_form_container_review_and_submit_travelers_list").innerHTML = "";

    for(let qw = 0; qw < booking_travelers.length; qw++){
        booking_forms_render_each_traveler(qw, JSON.stringify(booking_travelers[qw]).replaceAll('"','#@$%@#'));
    }
}

$(function() {
    $("#login_fld_9").daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      //autoUpdateInput: false,
    }, function(start, end, label) {
        
        booking_travelers[booking_forms_current_travelers_index].dateOfBirth = start.format('YYYY-MM-DD');
        setTimeout(()=>{
            document.getElementById("login_fld_9").value = change_date_from_iso_to_long_date(start.format('YYYY-MM-DD'));
        }, 100);

        /*let DOB = start.format('YYYY-MM-DD');
        let YYYY = DOB.split("-")[0];
        let MM = DOB.split("-")[1];
        let DD = DOB.split("-")[2]
        let age = calculate_age(new Date(YYYY, MM, DD));

        if(age < 18){
            booking_travelers[booking_forms_current_travelers_index].documents[0] = {
                birthPlace: "Not Required",
                documentType: "PASSPORT",
                expiryDate: "Not Required",
                holder: true,
                issuanceCountry: "Not Required",
                issuanceDate: "Not Required",
                issuanceLocation: "Not Required",
                nationality: "Not Required",
                number: "Document Not Required",
                validityCountry: "Not Required",
            }
        }*/

        /*var years = moment().diff(start, 'years');
        alert("You are " + years + " years old!");*/
    });
  });

$('#login_fld_9').on('show.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    $('#login_fld_9').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].dateOfBirth)); 
    
});

$('#login_fld_9').on('cancel.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    setTimeout(()=>{
        $('#login_fld_9').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].dateOfBirth));
    }, 50);
    
});

  $(function() {
    $("#login_fld_13").daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      //autoUpdateInput: false,
    }, function(start, end, label) {
        
        booking_travelers[booking_forms_current_travelers_index].documents[0].issuanceDate = start.format('YYYY-MM-DD');
        setTimeout(()=> {
            document.getElementById("login_fld_13").value = change_date_from_iso_to_long_date(start.format('YYYY-MM-DD'));
        }, 100);

        //start.format('YYYY-MM-DD');

      /*var years = moment().diff(start, 'years');
      alert("You are " + years + " years old!");*/
    });
  });

$('#login_fld_13').on('show.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    $('#login_fld_13').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].documents[0].issuanceDate)); 
    
});

$('#login_fld_13').on('cancel.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    setTimeout(()=>{
        $('#login_fld_13').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].documents[0].issuanceDate));
    }, 50);
    
});

$(function() {
    $("#login_fld_14").daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      //autoUpdateInput: false,
    }, function(start, end, label) {
        
        booking_travelers[booking_forms_current_travelers_index].documents[0].expiryDate = start.format('YYYY-MM-DD');
        setTimeout(()=>{
            document.getElementById("login_fld_14").value = change_date_from_iso_to_long_date(start.format('YYYY-MM-DD'));
        }, 100);

        //start.format('YYYY-MM-DD');

      /*var years = moment().diff(start, 'years');
      alert("You are " + years + " years old!");*/
    });
  });

$('#login_fld_14').on('show.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    $('#login_fld_14').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].documents[0].expiryDate)); 
    
});

$('#login_fld_14').on('cancel.daterangepicker', function(ev, picker) {
    //do something, like clearing an input
    setTimeout(()=>{
        $('#login_fld_14').val(change_date_from_iso_to_long_date(booking_travelers[booking_forms_current_travelers_index].documents[0].expiryDate));
    }, 50);
    
});


//booking forms inputs onchange events
document.getElementById("login_fld_5").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].name.firstName = evnt.target.value;
});

document.getElementById("login_fld_8").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].name.lastName = evnt.target.value;
});

document.getElementById("login_fld_10").addEventListener('change', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].gender = evnt.target.value;
});

document.getElementById("login_fld_6").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].contact.emailAddress = evnt.target.value;
});

document.getElementById("login_fld_11").addEventListener('change', (evnt) => {
    let code = evnt.target.value;
    booking_travelers[booking_forms_current_travelers_index].contact.phones[0].countryCallingCode = code.substring(1,code.length);
});

document.getElementById("login_fld_7").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].contact.phones[0].number = evnt.target.value;
});

document.getElementById("login_fld_110").addEventListener('change', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].documentType = evnt.target.value;
});

document.getElementById("login_fld_12").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].number = evnt.target.value;
});

document.getElementById("login_fld_15").addEventListener('change', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].issuanceCountry = evnt.target.value;
});

document.getElementById("login_fld_16").addEventListener('change', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].validityCountry = evnt.target.value;
});

document.getElementById("login_fld_17").addEventListener('change', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].nationality = evnt.target.value;
});

document.getElementById("login_fld_18").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].birthPlace = evnt.target.value.toUpperCase();
});

document.getElementById("login_fld_19").addEventListener('input', (evnt) => {
    booking_travelers[booking_forms_current_travelers_index].documents[0].issuanceLocation = evnt.target.value.toUpperCase();
});

document.getElementById("login_fld_111").addEventListener('change', (evnt) => {
    if(evnt.target.value === 'true'){
        booking_travelers[booking_forms_current_travelers_index].documents[0].holder = true;
    }else{
        booking_travelers[booking_forms_current_travelers_index].documents[0].holder = false;
    }
});





function reset_booking_forms_inputs(){
    document.getElementById("login_fld_5").value = "";
    document.getElementById("login_fld_8").value = "";
    document.getElementById("login_fld_10").value = "";
    document.getElementById("login_fld_6").value = "";
    document.getElementById("login_fld_11").value = "";
    document.getElementById("login_fld_7").value = "";
    document.getElementById("login_fld_12").value = "";
    document.getElementById("login_fld_15").value = "";
    document.getElementById("login_fld_16").value = "";
    document.getElementById("login_fld_17").value = "";
    document.getElementById("login_fld_18").value = "";
    document.getElementById("login_fld_19").value = "";
}


//function to finish the booking process
function book_ticket(){
    
    let isClear = true;
    let foundACard = false;
    let user_cards = document.getElementById("order_ticket_form_container_review_and_submit_travelers_list").childNodes;
    

    for(let usc = 0; usc < user_cards.length; usc++){

        if(user_cards[usc].className){
            if(user_cards[usc].className.includes("uncompleted_info")){
                isClear = false;
            }
        }

        if(user_cards[usc].className){
            if(user_cards[usc].className.includes("submit_each_traveler_review_info")){
                foundACard = true;
            }
        }

    }

    if(!foundACard){

        submit_flight_ticket_booking_loader.style.display = "none";
        submit_flight_ticket_booking_loader.style.opacity = 0;

        submit_booking_travelers_info_status_containter.style.display = "block";
        submit_booking_travelers_info_status_containter.innerHTML = `
            <p style="text-align: center; font-size: 13px; color:rgb(6, 62, 83); font-weight: bolder; letter-spacing: 0.5px;">
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;"></i> You must have atleast one traveler to book a flight.
            </p>
        `;
        setTimeout(()=>{
            submit_booking_travelers_info_status_containter.style.opacity = 1;
        }, 100);

        return null;
    }

    if(isClear){

        amadues_create_flight_order_post_data.data.travelers = booking_travelers;

        document.getElementById("book_flight_final_submit_button").style.display = "none";
        submit_flight_ticket_booking_loader.style.display = "flex";

        setTimeout(()=>{
            submit_flight_ticket_booking_loader.style.opacity = 1;
        },100);

        submit_booking_travelers_info_status_containter.style.display = "none";
        submit_booking_travelers_info_status_containter.innerHTML = '';
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(amadues_create_flight_order_post_data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "/amadues_flight_create_order/",
            success: res => {
                
                if(res.data){
                    console.log(res);

                    submit_flight_ticket_booking_loader.style.opacity = 1;
                    setTimeout(()=>{
                        submit_flight_ticket_booking_loader.style.display = "none";
                        document.getElementById("book_flight_final_submit_button").style.display = "block";
                    },100);

                    toggle_show_finish_booking_form();
                    show_flight_booking_success_review_page(res);
                    save_flight_booking_to_anidaso_db(res);
                }else{
                    document.getElementById("book_flight_final_submit_button").style.display = "block";
                    submit_flight_ticket_booking_loader.style.display = "none";
                    console.log(res);
                    show_prompt_to_user(
                        `<i style="color: orangered; font-size: 22px; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        Order Could Not Be Placed`, 
                        `This flight may no longer be available. Also,
                        check traveler(s) information to make sure everything is ok and try again.`
                    );
                }

            },
            error: err => {
                console.log(err);
            }
        });

    }else{
        
        submit_booking_travelers_info_status_containter.style.display = "block";
        submit_booking_travelers_info_status_containter.innerHTML = `
            <p style="text-align: center; font-size: 13px; color:rgb(6, 62, 83); font-weight: bolder; letter-spacing: 0.5px;">
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;"></i> Uncompleted form(s) detected. Please check and fill out all forms.
            </p>
        `;
        setTimeout(()=>{
            submit_booking_travelers_info_status_containter.style.opacity = 1;
        }, 100);

        submit_flight_ticket_booking_loader.style.display = "none";
        submit_flight_ticket_booking_loader.style.opacity = 0;
        
    }
}

function save_flight_booking_to_anidaso_db(booking_data){
    $.ajax({
        type: "POST",
        url: "/save_booked_flight",
        data: JSON.stringify(booking_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: data => {
            console.log(data);
        },
        error: err => {
            console.log(err);
        }
    })
}

//this function helps calculate the height of flight historic prices insights chart bar
function find_percentage_against_max_value(max_value, first_value, middle_value, third_value, min_value, current_value){
    if(current_value >= min_value && current_value < first_value){
        return ((current_value * 25) / first_value);
    }
    if(current_value >= first_value && current_value < middle_value){
        return ((current_value * 50) / middle_value);
    }
    if(current_value >= middle_value && current_value < third_value){
        return ((current_value * 75) / third_value);
    }
    if(current_value >= third_value && current_value < max_value){
        if(((current_value * 100) / max_value) > 100){
            return 100;
        }
        return ((current_value * 100) / max_value)
    }else{
        return 0;
    }
}

var flight_stop = "default"; //one, zero, default, two_plus, one_plus, zero_and_two_plus

function filter_flights_by_stop(){

    fligh_search_data.number_of_adults = previous_search_adults;
    fligh_search_data.number_of_children = previous_search_chidren;
    fligh_search_data.number_of_infants = previous_search_infant;
    window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));

    //alert("run");
    show_loader_flight_cards();

    if(left_setting_one_stop_option.checked && left_setting_twoplus_stop_option.checked && left_setting_no_stop_option.checked){
        flight_stop = "default";
    }else
    if(left_setting_one_stop_option.checked && left_setting_twoplus_stop_option.checked){
        flight_stop = "one_plus";
    }else
    if(left_setting_no_stop_option.checked && left_setting_twoplus_stop_option.checked){
        flight_stop = "zero_and_two_plus";
    }else
    if(left_setting_no_stop_option.checked && left_setting_one_stop_option.checked){
        flight_stop = "zero_to_one";
    }else
    if(left_setting_no_stop_option.checked){
        flight_stop = "zero";
    }else
    if(left_setting_one_stop_option.checked){
        flight_stop = "one";
    }else
    if(left_setting_twoplus_stop_option.checked){
        flight_stop = "two_plus";
    }
    else{
        left_setting_no_stop_option.checked = true;
        flight_stop = "zero";
    }
    render_flights();
}

function flights_filter_func_with_cleanup(){

    done_skipping = false;
    show_fastest_travel_times_clicked = false;
    show_cheapest_travels_clicked = false;

    //localStorage.setItem("is_round_trip", "yes");

    filter_flights_by_stop()

}

function show_only_fastest_travel_times(){

    show_fastest_travel_times_clicked = true;

    /*left_setting_no_stop_option.checked = true;
    left_setting_one_stop_option.checked = false;
    left_setting_twoplus_stop_option.checked = false;*/

    filter_flights_by_stop();

}

function show_only_custom_travel_times(){

    left_setting_no_stop_option.checked = true;
    left_setting_one_stop_option.checked = true;
    left_setting_twoplus_stop_option.checked = true;

    flights_filter_func_with_cleanup();

}

function show_loader_flight_cards(){

    document.getElementById("main_tickets_section_list_container").innerHTML = "";

    for(let jww = 0; jww < 10; jww++){

        document.getElementById("main_tickets_section_list_container").innerHTML += `<div class="each_ticket_item ticket_item_loader_card">
            <div style="display: none !important;" class="each_ticket_item_top">
            <div style="display: flex; flex-direction: row !important;">
                <div style="margin-right: 15px;" class="loading_card_data_element">
                <i style="font-size: 19px;" class="fa fa-plane" aria-hidden="true"></i>
                <i style="margin-left: 20px;" class="fa fa-train" aria-hidden="true"></i>
                </div>
                <div>
                    <p style="margin-bottom: 2px; font-weight: bolder;"  class="loading_card_data_element">Interested in flight + train prices?</p>
                    <p  class="loading_card_data_element">Beat flight costs by including train connections.</p>
                </div>
            </div>
            <div>
                <div style="background-color: rgb(160, 160, 160); color: rgb(160, 160, 160); border: none;" class="each_ticket_item_top_show_more_btn loading_card_data_element">Show more</div>
            </div>
            </div>
            <div class="each_ticket_item_main_extra_container">
            <div class="each_ticket_item_main_extra">
                <div>
                <span style="color: rgb(160, 160, 160)"  class="loading_card_data_element">Cheapest</span>
                <span style="color: rgb(160, 160, 160)"  class="loading_card_data_element">Flight + train</span>
                <span class="COVID_policy_desktop loading_card_data_element" style="color: rgb(160, 160, 160)">
                    <i style="color: rgb(160, 160, 160)" class="fa fa-medkit" aria-hidden="true"></i>
                    COVID-19 policies
                </span>
                </div>
                <div class="each_ticket_item_emogi_and_rating">
                <span  class="loading_card_data_element" style="font-size: 14px; padding-right: 15px; border-radius: 50px; color: rgb(160, 160, 160); font-weight: bolder;">
                    <i style="color: rgb(160, 160, 160)" class="fa fa-smile-o" aria-hidden="true"></i> 5
                </span>
                <div class="bubble_popup arrow_on_right_side"></div>
                </div>
            </div>
        </div>
            <div class="each_ticket_item_main">
            <div class="each_ticket_item_main_left">
                <div class="main_ticket_info_area">
                <div class="main_ticket_info_area_top">
                    <div  class="loading_card_data_element" style="flex-direction: row !important;">
                    <div></div>
                    <div style="padding-left: 10px;"></div>
                    </div>
                    <div style="flex-direction: row !important; width: 100%; justify-content: space-between;">
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px; color: rgb(160, 160, 160)">
                        5:58 pm – 11:18 pm</p>
                        <p  class="loading_card_data_element" style="font-size: 13px; color: rgb(160, 160, 160)">
                        American Airlines</p>
                    </div>
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px; color: rgb(160, 160, 160)">1 stop</p>
                        <p  class="loading_card_data_element" style="font-size: 13px;color: rgb(160, 160, 160)">PHL</p>
                    </div>
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px; color: rgb(160, 160, 160)">5h 00m</p>
                        <p  class="loading_card_data_element" style="font-size: 13px;color: rgb(160, 160, 160)">
                        BDL ‐ JAX</p>
                    </div>
                    </div>
                </div>
                <div class="main_ticket_info_area_bottom">
                    <div  class="loading_card_data_element" style="flex-direction: row !important;">
                    <div></div>
                    <div style="padding-left: 10px;"></div>
                    </div>
                    <div style="flex-direction: row !important; width: 100%; justify-content: space-between;">
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px;color: rgb(160, 160, 160)">
                        5:58 pm – 11:18 pm</p>
                        <p  class="loading_card_data_element" style="font-size: 13px; color: rgb(160, 160, 160)">
                        American Airlines</p>
                    </div>
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px; color: rgb(160, 160, 160)">1 stop</p>
                        <p  class="loading_card_data_element" style="font-size: 13px; color: rgb(160, 160, 160)">CLT</p>
                    </div>
                    <div>
                        <p  class="loading_card_data_element" style="font-weight: bolder; font-size: 14px; margin-bottom: 5px;color: rgb(160, 160, 160)">5h 15m</p>
                        <p  class="loading_card_data_element" style="font-size: 13px;color: rgb(160, 160, 160)">
                        JAX ‐ BDL</p>
                    </div>
                    </div>
                </div>
                </div>
                <p class="tickets_main_additional_text loading_card_data_element" style="color: rgb(160, 160, 160)">Operated by Psa Airlines AS American Eagle, Republic Airways AS American Eagle</p>
            </div>
            <div class="each_ticket_item_main_right">
                <p class="ticket_item_price_display loading_card_data_element" style="color: rgb(160, 160, 160);">$125</p>
                <p  class="loading_card_data_element" style="font-size: 12px; margin-bottom: 5px; font-weight: bolder;color: rgb(160, 160, 160)">
                American Airlines</p>
                <div class="ticket_item_entitlements_display loading_card_data_element" style="color: rgb(160, 160, 160);">
                Main Cabin
                <div class="ticket_item_entitlements_content_display"></div>
                </div>
                <div style="font-size: 14px;" class="view_deal_button loading_card_data_element">Book Flight</div>
            </div>
            </div>
        </div>`;

    }
}

function toggle_hide_show_flight_booking_success_confirmation_pane(){
    $("#flight_booking_success_confirmation_pane").toggle("up");
}

function show_flight_booking_success_review_page(obj){
    toggle_hide_show_flight_booking_success_confirmation_pane();
    render_booking_confirmation_review_markup(obj)
}

function render_booking_confirmation_review_markup(obj){

    console.log("this thing", obj.data);

    //departure airports and segments
    let departure_take_off_airport_iata = obj.data.flightOffers[0].itineraries[0].segments[0].departure.iataCode;
    let departure_take_off_airport_info = AirportsData.filter(each => {
        return (each.IATA === departure_take_off_airport_iata);
    });
    let departure_take_off_airport = `${departure_take_off_airport_info[0].name} (${departure_take_off_airport_iata})`;

    let departure_arrival_airport_iata = obj.data.flightOffers[0].itineraries[0].segments[(obj.data.flightOffers[0].itineraries[0].segments.length - 1)].arrival.iataCode
    let departure_arrival_airport_info = AirportsData.filter(each => {
        return (each.IATA === departure_arrival_airport_iata);
    });
    let departure_arrival_airport = `${departure_arrival_airport_info[0].name} (${departure_arrival_airport_iata})`;

    //departure segments
    let departure_segments_markup = ``;
    for(let s=0; s<obj.data.flightOffers[0].itineraries[0].segments.length; s++){
        
        let segment_take_off_airport_iata = obj.data.flightOffers[0].itineraries[0].segments[s].departure.iataCode;
        let segment_take_off_airport_info = AirportsData.filter(each => {
            return (each.IATA === segment_take_off_airport_iata);
        });
        let segment_take_off_airport = `${segment_take_off_airport_info[0].name} (${segment_take_off_airport_iata})`;

        let segment_arrival_airport_iata = obj.data.flightOffers[0].itineraries[0].segments[s].arrival.iataCode
        let segment_arrival_airport_info = AirportsData.filter(each => {
            return (each.IATA === segment_arrival_airport_iata);
        });
        let segment_arrival_airport = `${segment_arrival_airport_info[0].name} (${segment_arrival_airport_iata})`;

        let take_off_date = obj.data.flightOffers[0].itineraries[0].segments[s].departure.at.split("T")[0];
        let take_off_date_to_display = change_date_from_iso_to_long_date(take_off_date);
        let take_off_time = obj.data.flightOffers[0].itineraries[0].segments[s].departure.at.split("T")[1];
        let take_off_time_to_display = covert_time_to_12_hour(take_off_time);

        let arrival_date = obj.data.flightOffers[0].itineraries[0].segments[s].arrival.at.split("T")[0];
        let arrival_date_to_display = change_date_from_iso_to_long_date(arrival_date);
        let arrival_time = obj.data.flightOffers[0].itineraries[0].segments[s].arrival.at.split("T")[1];
        let arrival_time_to_display = covert_time_to_12_hour(arrival_time);

        let airlines = airline_codes.filter(each => {
           return (each.code === obj.data.flightOffers[0].itineraries[0].segments[s].carrierCode);
        });
        let aircrafts = aircrats.filter(each => {
            return (each.IATA === obj.data.flightOffers[0].itineraries[0].segments[s].aircraft.code);
        });

        let airline_to_display = "Airline Code:"+obj.data.flightOffers[0].itineraries[0].segments[s].carrierCode;
        if(airlines.length > 0){
            airline_to_display = airlines[0].name;
        }
        let aircraft_to_display = "Aircraft Code:"+obj.data.flightOffers[0].itineraries[0].segments[s].aircraft.code;
        if(aircrafts.length > 0){
            aircraft_to_display = `${aircrafts[0].Manufacturer} ${aircrafts[0].Type_Model} ${aircrafts[0].Wake}`;
        }

        departure_segments_markup += `
            <div style="margin-top: 10px;">
                <p style="color:rgb(0, 204, 255); font-size: 13px; margin-bottom: 3px;">
                    ${segment_take_off_airport} - ${segment_arrival_airport}
                </p>
                <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                    <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Take-off:</span>
                    ${take_off_date_to_display} - ${take_off_time_to_display}
                </p>
                <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                    <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Arrival:</span>
                    ${arrival_date_to_display} - ${arrival_time_to_display}
                </p>
                <p style="color:rgb(0, 255, 200); font-size: 13px; margin-left: 10px;">
                    <i style="color:rgb(253, 158, 158); margin-right: 3px;" class="fa fa-plane" aria-hidden="true"></i>
                    ${airline_to_display} 
                    <span style="color: rgba(255, 255, 255,0.2);">|</span> 
                    ${aircraft_to_display}</p>
            </div>
        `;
    }

    let departure_segments_stops_status = ""
    if(obj.data.flightOffers[0].itineraries[0].segments.length > 1){
        departure_segments_stops_status = `<div style="display: flex; flex-direction: row !important; overflow: visible; margin-top: 20px;">
            <span style="font-size: 13px;"><i style="color: orangered; margin-right: 10px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
            <span style="color:rgb(190, 223, 233); font-size: 13px;">Your departure flight makes ${(obj.data.flightOffers[0].itineraries[0].segments.length-1)} Stop(s) before its destination</span>
        </div>`;
    }

    //return airports and segments
    let return_itinery_info = ""
    if(obj.data.flightOffers[0].itineraries.length > 1){

        //return airports and segments
        let return_take_off_airport_iata = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[0].departure.iataCode;
        let return_take_off_airport_info = AirportsData.filter(each => {
            return (each.IATA === return_take_off_airport_iata);
        });
        let return_take_off_airport = `${return_take_off_airport_info[0].name} (${departure_take_off_airport_iata})`;

        let return_arrival_airport_iata = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[(obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments.length - 1)].arrival.iataCode
        let return_arrival_airport_info = AirportsData.filter(each => {
            return (each.IATA === return_arrival_airport_iata);
        });
        let return_arrival_airport = `${return_arrival_airport_info[0].name} (${return_arrival_airport_iata})`;

        //return segments
        let return_segments_markup = ``;
        for(let s=0; s<obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments.length; s++){
            
            let segment_take_off_airport_iata = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].departure.iataCode;
            let segment_take_off_airport_info = AirportsData.filter(each => {
                return (each.IATA === segment_take_off_airport_iata);
            });
            let segment_take_off_airport = `${segment_take_off_airport_info[0].name} (${segment_take_off_airport_iata})`;

            let segment_arrival_airport_iata = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].arrival.iataCode
            let segment_arrival_airport_info = AirportsData.filter(each => {
                return (each.IATA === segment_arrival_airport_iata);
            });
            let segment_arrival_airport = `${segment_arrival_airport_info[0].name} (${segment_arrival_airport_iata})`;

            let take_off_date = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].departure.at.split("T")[0];
            let take_off_date_to_display = change_date_from_iso_to_long_date(take_off_date);
            let take_off_time = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].departure.at.split("T")[1];
            let take_off_time_to_display = covert_time_to_12_hour(take_off_time);

            let arrival_date = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].arrival.at.split("T")[0];
            let arrival_date_to_display = change_date_from_iso_to_long_date(arrival_date);
            let arrival_time = obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].arrival.at.split("T")[1];
            let arrival_time_to_display = covert_time_to_12_hour(arrival_time);

            let airlines = airline_codes.filter(each => {
            return (each.code === obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].carrierCode);
            });
            let aircrafts = aircrats.filter(each => {
                return (each.IATA === obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].aircraft.code);
            });

            let airline_to_display = "Airline Code:"+obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].carrierCode;
            if(airlines.length > 0){
                airline_to_display = airlines[0].name;
            }
            let aircraft_to_display = "Aircraft Code:"+obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments[s].aircraft.code;
            if(aircrafts.length > 0){
                aircraft_to_display = `${aircrafts[0].Manufacturer} ${aircrafts[0].Type_Model} ${aircrafts[0].Wake}`;
            }

            return_segments_markup += `
                <div style="margin-top: 10px;">
                    <p style="color:rgb(0, 204, 255); font-size: 13px; margin-bottom: 3px;">
                        ${segment_take_off_airport} - ${segment_arrival_airport}
                    </p>
                    <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                        <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Take-off:</span>
                        ${take_off_date_to_display} - ${take_off_time_to_display}
                    </p>
                    <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                        <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Arrival:</span>
                        ${arrival_date_to_display} - ${arrival_time_to_display}
                    </p>
                    <p style="color:rgb(0, 255, 200); font-size: 13px; margin-left: 10px;">
                        <i style="color:rgb(253, 158, 158); margin-right: 3px;" class="fa fa-plane" aria-hidden="true"></i>
                        ${airline_to_display} 
                        <span style="color: rgba(255, 255, 255,0.2);">|</span> 
                        ${aircraft_to_display}</p>
                </div>
            `;
        }

        let return_segments_stops_status = ""
        if(obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments.length > 1){
            return_segments_stops_status = `<div style="display: flex; flex-direction: row !important; overflow: visible; margin-top: 20px;">
                <span style="font-size: 13px;"><i style="color: orangered; margin-right: 10px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
                <span style="color:rgb(190, 223, 233); font-size: 13px;">Your return flight makes ${(obj.data.flightOffers[0].itineraries[(obj.data.flightOffers[0].itineraries.length - 1)].segments.length - 1)} Stop(s) before its destination</span>
            </div>`;
        }

        return_itinery_info = `
            <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Return:</span>
                    ${return_take_off_airport} - ${return_arrival_airport} 
                <span style="color:rgb(144, 255, 222); font-size: 13px;">(4h:20m)</span>
                </p>
                <p style="margin-left: 10px; color:rgb(255, 102, 0); font-size: 13px; margin-top: 20px;">
                Segments/Stops
                </p>
                ${return_segments_markup}
                ${return_segments_stops_status}
            </div>
        `;
    }

    //itenirery information
    document.getElementById("flight_booking_success_itenirery_review").innerHTML = `
        <div style="animation: mounting_ani 0.5s ease-out; animation-delay: 0.5s; width: calc(100% - 20px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 4px; background-color: rgba(0, 0, 0, 0.3);">
            <div>
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Departure:</span>
                ${departure_take_off_airport} - ${departure_arrival_airport} 
                <span style="color:rgb(144, 255, 222); font-size: 13px;">(4h:20m)</span>
                </p>
                <p style="margin-left: 10px; color:rgb(255, 102, 0); font-size: 13px; margin-top: 20px;">
                Segments/Stops
                </p>
                ${departure_segments_markup}
                <!--div style="margin-top: 10px;">
                    <p style="color:rgb(0, 204, 255); font-size: 13px; margin-bottom: 3px;">
                        Accra(ACC) - Paris(CDG)
                    </p>
                    <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                        <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Take-off:</span>
                        March 25, 2021 - 11:53:00
                    </p>
                    <p style="margin-left: 10px; color:rgb(233, 214, 190); font-size: 13px; margin-bottom: 3px;">
                        <span style="color:rgb(197, 234, 255); margin-right: 5px; font-size: 13px;">Arrival:</span>
                        March 24, 2021 - 04:24:00
                    </p>
                    <p style="color:rgb(0, 255, 200); font-size: 13px; margin-left: 10px;">
                        <i style="color:rgb(253, 158, 158); margin-right: 3px;" class="fa fa-plane" aria-hidden="true"></i>
                        American Airlines 
                        <span style="color: rgba(255, 255, 255,0.2);">|</span> 
                        Airbus 320H</p>
                </div-->
                ${departure_segments_stops_status}
            </div>
            ${return_itinery_info}
        </div>
    `;

    //travelers information

    let travelers_markup = "";
    for(let t=0; t<obj.data.travelers.length; t++){

        let marginTop = "margin-top: 15px;";
        if(t<1){
            marginTop = "margin-top: 0;";
        }

        let guest_passport_number = "Not Available";
        if(guest_passport_number = obj.data.travelers[t].documents.length > 0){
            guest_passport_number = obj.data.travelers[t].documents[0].number
        }

        travelers_markup += `
            <div style="display: flex; flex-direction: row !important; ${marginTop}">
                <div>
                    <i style="color:rgb(253, 158, 158); margin-right: 10px;" class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(0, 204, 255); margin-right: 5px;">
                            ${obj.data.travelers[t].name.firstName} ${obj.data.travelers[t].name.lastName}</span>
                        (DOB: ${change_date_from_iso_to_long_date(obj.data.travelers[t].dateOfBirth)})
                    </p>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(174, 255, 231); margin-right: 5px;">Passport:</span>${guest_passport_number}</p>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(174, 255, 231); margin-right: 5px;">Gender:</span>${obj.data.travelers[t].gender}</p>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(174, 255, 231); margin-right: 5px;">Phone:</span>+${obj.data.travelers[t].contact.phones[0].countryCallingCode} ${obj.data.travelers[t].contact.phones[0].number}</p>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(174, 255, 231); margin-right: 5px;">Email:</span>${obj.data.travelers[t].contact.emailAddress}</p>
                </div>
            </div>
        `;
    }

    document.getElementById("flight_booking_success_travelers_review").innerHTML = `
        <div style="animation: mounting_ani 0.5s ease-out; animation-delay: 0.5s; width: calc(100% - 20px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 4px; background-color: rgba(0, 0, 0, 0.3);">
            ${travelers_markup}
            <!--div style="display: flex; flex-direction: row !important; margin-top: 15px;">
                <div>
                    <i style="color:rgb(253, 158, 158); margin-right: 10px;" class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                    <span style="color:rgb(0, 204, 255); margin-right: 5px;">
                        Micheal Essien</span>
                    (DOB: April 12, 1892)</p>
                    <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                        <span style="color:rgb(174, 255, 231); margin-right: 5px;">Passport:</span>none</p>
                </div>
            </div-->
        </div>
    `;

    //Price Information

    let grand_total = obj.data.flightOffers[0].price.grandTotal;
    let total = obj.data.flightOffers[0].price.total;
    let base = obj.data.flightOffers[0].price.base;

    let cost_fees_markup = "";
    if(obj.data.flightOffers[0].price.fees){
        for(let f=0; f<obj.data.flightOffers[0].price.fees.length; f++){
            cost_fees_markup += `
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                    <span style="color:rgb(174, 255, 231); margin-right: 5px;">
                        ${obj.data.flightOffers[0].price.fees[f].type.replaceAll("_", " ").toLowerCase()} Fee:</span>
                    ${current_currency.sign} ${obj.data.flightOffers[0].price.fees[f].amount}
                </p>
            `;
        }
    }

    document.getElementById("flight_booking_success_price_review").innerHTML = `
        <div style="animation: mounting_ani 0.5s ease-out; animation-delay: 0.5s; width: calc(100% - 20px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 4px; background-color: rgba(0, 0, 0, 0.3);">
            <div style="display: flex; flex-direction: row !important;">
            <div>
                <i style="color:rgb(253, 158, 158); margin-right: 10px;" class="fa fa-credit-card" aria-hidden="true"></i>
            </div>
            <div>
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Base:</span>${current_currency.sign} ${base}</p>
                <div style="padding: 10px">
                    <p style="font-size: 13px; color: white; margin-bottom: 10px; font-weight: bolder;">
                        Additional Fees</p>
                    ${cost_fees_markup}
                </div>
                <!--p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Checked Bags:</span>$100.00</p>
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Seats:</span>$200.00</p-->
                <p style="color:rgb(233, 214, 190); font-size: 14px; margin-bottom: 3px;">
                <span style="color:rgb(174, 255, 231); margin-right: 5px;">Total:</span>${current_currency.sign} ${total}</p>
                <p style="font-weight: bolder; color:rgb(0, 195, 255); font-size: 14px; margin-bottom: 3px; margin-top: 10px;">
                <span style="color:rgb(174, 212, 255); margin-right: 5px;">Grand Total:</span>${current_currency.sign} ${grand_total}</p>
            </div>
            </div>
        </div>
    `;

    //travelers prices breakdown
    let travelers_pricing_markup = '';
    for(let p=0; p<obj.data.flightOffers[0].travelerPricings.length; p++){

        let the_traveler = obj.data.travelers.filter( each => {
            return (each.id === obj.data.flightOffers[0].travelerPricings[p].travelerId);
        });

        let travelers_first_name = "";
        let travelers_last_name = "";
        if(the_traveler.length > 0){
            travelers_first_name = the_traveler[0].name.firstName;
            travelers_last_name = the_traveler[0].name.lastName;
        }

        let base_price = obj.data.flightOffers[0].travelerPricings[p].price.base;
        let refundable_taxes = obj.data.flightOffers[0].travelerPricings[p].price.refundableTaxes;
        let total = obj.data.flightOffers[0].travelerPricings[p].price.total;
        let total_taxes = 0;
        obj.data.flightOffers[0].travelerPricings[p].price.taxes.forEach(each => {
            total_taxes += parseFloat(each.amount);
        });      

        //segment details
        let segment_fair_details_markup = "";
        for(let s=0; s<obj.data.flightOffers[0].travelerPricings[p].fareDetailsBySegment.length; s++){

            let segment_cabin = obj.data.flightOffers[0].travelerPricings[p].fareDetailsBySegment[s].cabin;
            let segment_class = airfare_codes.filter( each => {
                return (each.code === obj.data.flightOffers[0].travelerPricings[p].fareDetailsBySegment[s].class);
            });

            let segment_class_markup = segment_class[0].fare;

            let segment_take_off_airport_iata = "";
            let segment_arrival_airport_iata = "";
            for(let it=0; it<obj.data.flightOffers[0].itineraries.length; it++){
                for (is=0; is<obj.data.flightOffers[0].itineraries[it].segments.length; is++){
                    if(obj.data.flightOffers[0].itineraries[it].segments[is].id === obj.data.flightOffers[0].travelerPricings[p].fareDetailsBySegment[s].segmentId){
                        segment_take_off_airport_iata = obj.data.flightOffers[0].itineraries[it].segments[is].departure.iataCode;
                        segment_arrival_airport_iata = obj.data.flightOffers[0].itineraries[it].segments[is].arrival.iataCode;
                    }
                }
            }
            let segment_take_off_airport_info = AirportsData.filter(each => {
                return (each.IATA === segment_take_off_airport_iata);
            });
            let segment_take_off_airport = `${segment_take_off_airport_info[0].name} (${segment_take_off_airport_iata})`;

            let segment_arrival_airport_info = AirportsData.filter(each => {
                return (each.IATA === segment_arrival_airport_iata);
            });
            let segment_arrival_airport = `${segment_arrival_airport_info[0].name} (${segment_arrival_airport_iata})`;

            let segment_checked_bags_markup = "";
            if(obj.data.flightOffers[0].travelerPricings[p].fareDetailsBySegment[s].includedCheckedBags.quantity === 0){
                segment_checked_bags_markup = `
                <p style="color:rgb(222, 155, 216); font-size: 14px; margin-bottom: 5px; padding: 5px;">
                    <i style="margin-right: 5px; color: rgb(60, 250, 209);" class="fa fa-info-circle" aria-hidden="true"></i>
                    Checked Bags not included
                </p>
            `;
            }else{
                segment_checked_bags_markup = `
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                        <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                            Included Checked Bags:
                        </span>
                        1 bag(s), 
                        <span style="color:rgb(0, 204, 255); font-size: 14px;">(width: 25kg)</span> 
                    </p>
                `;
            }

            segment_fair_details_markup += `
                <div style="animation: mounting_ani 0.5s ease-out; animation-delay: 1.2s; background-color: rgba(204, 77, 77, 0.253); padding: 10px; margin-bottom: 2px;">
                    <p style="color: aqua; margin-bottom: 10px; font-weight: bolder; font-size: 14px;">
                    ${segment_take_off_airport} - ${segment_arrival_airport}
                    </p>
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                    <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                        Cabin:
                    </span>
                    ${segment_cabin}
                    </p>
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                    <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                        Class:
                    </span>
                    ${segment_class[0].code} - ${segment_class_markup}
                    </p>
                    ${segment_checked_bags_markup}
                </div>
            `;
        }

        travelers_pricing_markup += `
            <div style="padding: 10px 0; border-top:  1px solid rgba(255,255,255,0.3);">
                <p style="font-weight: bolder; color:rgb(0, 189, 196); font-size: 14px; margin-bottom: 5px;">
                <span style="font-size: 14px; margin-right: 10px; color:rgb(0, 241, 201);">
                    ${travelers_first_name} ${travelers_last_name}
                </span>
                (ADULT)
                </p>
                <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                    Base Price:
                </span>
                ${current_currency.sign} ${base_price}
                </p>
                <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                    Refundable Taxes:
                </span>
                ${current_currency.sign} ${refundable_taxes}
                </p>
                <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                    Taxes Total:
                </span>
                ${current_currency.sign} ${total_taxes}
                </p>
                <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                    Total:
                </span>
                ${current_currency.sign} ${total}
                </p>
                <p style="color: white; font-size: 14px; font-weight: bolder; margin-bottom: 10px; margin-top: 20px;">
                Fare Details Per Segment</p>
                ${segment_fair_details_markup}
                <!--div style="background-color: rgba(204, 77, 77, 0.253); padding: 10px; margin-bottom: 2px;">
                    <p style="color: aqua; margin-bottom: 10px; font-weight: bolder; font-size: 14px;">
                        MAD - CGG
                    </p>
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                    <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                        Cabin:
                    </span>
                    ECONOMY
                    </p>
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                    <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                        Class:
                    </span>
                    K
                    </p>
                    <p style="color:rgb(0, 155, 216); font-size: 14px; margin-bottom: 5px;">
                    <span style="font-size: 14px; margin-right: 10px; color:rgb(233, 128, 0);">
                        Included Checked Bags:
                    </span>
                    1 bag(s), 
                    <span style="color:rgb(0, 204, 255); font-size: 14px;">(width: 25kg)</span> 
                    </p>
                </div-->
            </div>
        `;
    }

    document.getElementById("price_per_traveler_breakdown_display").innerHTML = `
        <div style="animation: mounting_ani 0.5s ease-out; animation-delay: 0.5s; padding: 10px; border: 1px solid rgba(255,255,255,0.3); background-color: rgba(0, 0, 0, 0.4); border-radius: 4px;">
            <div>
                <p style="font-size: 14px; color: rgb(175, 219, 255); font-weight: bolder; margin-bottom: 10px;">
                    Price Per Traveler Breakdown</p>
                ${travelers_pricing_markup}
            </div>
        </div>
    `;
}

function hotel_search_filter_by_rating(){
    hotel_search_data.ratings = document.getElementById("book_hotels_filter_hotel_by_stars").value;
    window.localStorage.setItem("hotels_post_data", JSON.stringify(hotel_search_data));
}

document.getElementById("book_hotels_filter_hotel_by_stars").value = hotel_search_data.ratings;