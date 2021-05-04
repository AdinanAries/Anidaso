/*var rooms_availability = [
    {
        room_id: "",
        room_number: "",
        days: [
            {
                date: 21,
                classes: [
                    "css class"
                ]
            }
        ]
    }
]*/

var make_reservation_guests_list = document.getElementById("make_reservation_guests_list");

var rooms_grid_view_config = {
    calendar: {
        first: "2021-03-03",
        last: "2021-04-02"
    },
    picked_dates: {
        checkin: "2021-03-03",
        checkout: "2021-03-10"
    },
    rooms_id: "607314d60fd9d9659846e1c6",
    property_id: "607304a562a84645bccdf40b"
}

var make_reservations_post_data = {
    hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
      property_id: "607304a562a84645bccdf40b",
      rooms: [
        {
            id: "6076abe0546a1e4b74be03fa",
            number: "3D"
        }
      ],
      //full_property_location: "New York, 1223 Mont Gomery, United States",
      all_dates_of_occupancy: [
        "2021-03-20", "2021-03-21", "2021-03-22", "2021-03-23"
      ],
      price_paid: 69.40,
      checkin_date: "2021-03-20",
      checkout_date: "2021-03-23",
      checkin_time: "12:00",
      checkout_time: "12:00",
      guests: [
            {
                first_name: "Penny",
                last_name: "Setzo",
                type: "adult",
                age: 25,
                gender: "Female",
                price_paid: 69.00,
            }
        ]
}

function add_a_guest_obj(type){
    return {
        first_name: "",
        last_name: "",
        type: type,
        age: 0,
        gender: "",
        price_paid: 0.00,
    }
}

function make_guests_list_from_number_input_values(){

    make_reservation_guests_list.innerHTML = "";

    let number_of_adults = document.getElementById("make_reservation_number_of_adults_input").value;
    let number_of_children = document.getElementById("make_reservation_number_of_children_input").value;

    document.getElementById("make_reservation_popup_number_Of_adults_input").value = number_of_adults;
    document.getElementById("make_reservation_popup_number_Of_children_input").value = number_of_children;

    document.getElementById("make_reservation_number_guests_display_p").innerHTML =
    `
        <span style="color:rgb(255, 97, 6); font-size: 13px; margin-right: 5px;">Guests(s)</span>
        ${number_of_adults} Adult, ${number_of_children} children
    `; 

    for(let i=0; i<number_of_adults; i++){
        make_reservations_post_data.guests.push(add_a_guest_obj("adult"));
        make_reservation_guests_list.innerHTML += make_reservation_return_each_adult_guest_markup(i);
    }

    for(let i=0; i<number_of_children; i++){
        make_reservations_post_data.guests.push(add_a_guest_obj("children"));
        make_reservation_guests_list.innerHTML += make_reservation_return_each_child_guest_markup(i);
    }
}

function make_reservation_return_each_adult_guest_markup(number){
    return `
        <div class="each_room_reservation_guest" style="background-color: #37a0f5; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
            <p style="font-size: 14px; font-weight: bolder; color:rgb(167, 2, 2); letter-spacing: 1px;">Adult ${number + 1}</p>
            <div class="flex_row_default_flex_column_mobile">
                <div class="flex_child_of_two">
                    <div style="margin-top: 10px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">First Name:</p>
                        <input id="mk_reservationS_adult_first_name_input_${number}" style="font-size: 14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="add first name here"/>
                    </div>
                    <div style="margin-top: 20px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">Last Name:</p>
                        <input id="mk_reservationS_adult_last_name_input_${number}" style="font-size: 14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="add last name here"/>
                    </div>
                </div>
                <div class="flex_child_of_two flex_non_first_child">
                    <div style="margin-top: 10px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">
                            Gender</p>
                        <select id="mk_reservationS_adult_gender_input_${number}" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: 100%;" type="text">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div style="margin-top: 20px;">
                            <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">
                                Age: <span style="color:rgba(0, 0, 0, 0.705); font-size: 13px;">(above 17)</span></p>
                            <input id="mk_reservationS_adult_age_input_${number}" onchange="room_booking_enforce_adult_age_input('mk_reservationS_adult_age_input_${number}');" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="number" placeholder="add guest age here"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function make_reservation_return_each_child_guest_markup(number){
    return `
        <div class="each_room_reservation_guest" style="background-color: #37a0f5; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
            <p style="font-size: 14px; font-weight: bolder; color:rgb(167, 2, 2); letter-spacing: 1px;">Child ${number + 1}</p>
            <div class="flex_row_default_flex_column_mobile">
                <div class="flex_child_of_two">
                    <div style="margin-top: 10px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">First Name:</p>
                        <input id="mk_reservationS_child_first_name_input_${number}" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="add first name here"/>
                    </div>
                    <div style="margin-top: 20px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">Last Name:</p>
                        <input id="mk_reservationS_child_last_name_input_${number}" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="add last name here"/>
                    </div>
                </div>
                <div class="flex_child_of_two flex_non_first_child">
                    <div style="margin-top: 10px;">
                        <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">
                            Gender</p>
                        <select id="mk_reservationS_child_gender_input_${number}" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: 100%;" type="text">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div style="margin-top: 20px;">
                            <p style="color: white; font-weight: bolder; font-size: 13px; margin-bottom: 10px;">
                                Age: <span style="color:rgba(0, 0, 0, 0.705); font-size: 13px;">(below 18)</span></p>
                            <input id="mk_reservationS_child_age_input_${number}" oninput="room_booking_enforce_child_age_input('mk_reservationS_child_age_input_${number}')" style="font-size:  14px; padding: 10px; border: none; border-radius: 4px; width: calc(100% - 20px);" type="number" placeholder="add guest age here"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

rooms_grid_view_config.calendar.first = convert_date_object_to_db_string_format(todays_date);
rooms_grid_view_config.calendar.last = convert_date_object_to_db_string_format(new Date(todays_date.setDate(todays_date.getDate() + 7)));

function add_trailing_to_date_num(number){

    let string_rep = number + "";

    if(string_rep.length > 1 && string_rep[string_rep.length - 2] === "1"){
        string_rep += "th";
    }else{

        if(string_rep[string_rep.length - 1] === "1"){
            string_rep += "st";
        }else if(string_rep[string_rep.length - 1] == "2"){
            string_rep += "nd";
        }else if(string_rep[string_rep.length - 1] == "3"){
            string_rep += "rd";
        }else {
            string_rep += "th";
        }
        
    }

    return string_rep;

}

function build_dates_list_from_range(first_date, last_date){

    let startDate = new Date(first_date);
    let endDate = new Date(last_date);

    endDate = new Date(endDate.setDate(endDate.getDate() + 1));

    let currentDate = startDate;
    let datesList = [];

    while(endDate > currentDate){
        
        let each_date = {
            full_date: currentDate,
            classes: []
        }
        datesList.push(each_date);

        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

    }

    return datesList;
}

function bind_dates_to_rooms(rooms_list, dates_list){

    let rooms_with_dates = rooms_list.map( each => {
        return {
            the_room: each,
            days: _.cloneDeep(dates_list)
        }
    });

    console.log(rooms_with_dates)
    return rooms_with_dates;
}

async function add_classes_to_rooms_with_dates(rooms_with_dates){

    for(let w=0; w<rooms_with_dates.length; w++){
        
        for(let y=0; y<rooms_with_dates[w].days.length; y++){
            await check_if_date_is_booked(rooms_with_dates[w].days[y].full_date, rooms_with_dates[w].the_room._id, rooms_with_dates[w].the_room.room_number, rooms_with_dates[w].days[y]);
        }
    }

}

async function add_classes_to_current_rooms_with_dates(current_room, checking_checkout_dates_list){
    for(let y=0; y<current_room.days.length; y++){
        await check_if_date_is_booked_for_current_room(current_room.days[y].full_date, current_room.the_room._id, current_room.the_room.room_number, current_room.days[y], checking_checkout_dates_list);
    }
}

function show_selected_dates_on_selected_room(dates_list, selected_room){
    
    for(let j=0; j<selected_room.days.length; j++){
        
        if((selected_room.days[j].full_date.getDate() + ", " + selected_room.days[j].full_date.getMonth()) === dates_list[0]){

            for(let i=0; i<dates_list.length; i++){
                
                if(i === 0){
                    selected_room.days[j].classes.push("first_available");
                }
                if(i === (dates_list.length-1)){
                    selected_room.days[j].classes.push("last_available");
                }
                selected_room.days[j].classes.push("selected_day");
                j++;
            }
            break;
        }
    }

    return selected_room;
}

function check_if_date_is_booked_for_current_room(date, room_id, room_number, day, checking_checkout_dates_list){

    let the_date = convert_date_object_to_db_string_format(date);
    console.log(date, ", ", the_date)

    return $.ajax({
        type: "GET",
        url: `/is_room_booked_on_a_certain_date/${the_date}/${room_id}/${room_number}`,
        success: res => {
            
            if(res.isBooked){
                day.classes.push("booked_date");
                for(let e=0; e<checking_checkout_dates_list.length; e++){
                    if((day.full_date.getDate() + ", " + day.full_date.getMonth()) === checking_checkout_dates_list[e]){
                        day.classes.push("overlap")
                    }
                }
            }
            if(res.isChekin){
                day.classes.push("booked_checkin");
                for(let e=0; e<checking_checkout_dates_list.length; e++){
                    if((day.full_date.getDate() + ", " + day.full_date.getMonth()) === checking_checkout_dates_list[e]){
                        day.classes.push("overlap")
                    }
                }
            }
            if(res.isCheckout){
                day.classes.push("booked_checkout");
                for(let e=0; e<checking_checkout_dates_list.length; e++){
                    if((day.full_date.getDate() + ", " + day.full_date.getMonth()) === checking_checkout_dates_list[e]){
                        day.classes.push("overlap")
                    }
                }
            }
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
    
}

function check_if_date_is_booked(date, room_id, room_number, day){

    let the_date = convert_date_object_to_db_string_format(date);

    return $.ajax({
        type: "GET",
        url: `/is_room_booked_on_a_certain_date/${the_date}/${room_id}/${room_number}`,
        success: res => {
            
            if(res.isBooked){
                day.classes.push("booked_date");
            }
            if(res.isChekin){
                day.classes.push("booked_checkin");
            }
            if(res.isCheckout){
                day.classes.push("booked_checkout");
            }
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
    
}

//check_if_date_is_booked("2021-03-21", "608e686c0f7f315e84e62c9c")

function return_bookings_grid_view_headers(grid_dates_list, checking_checkout_dates_list){
    
    let tr_tag = "<td></td>";

    for(let i=0; i<grid_dates_list.length; i++){
        if(checking_checkout_dates_list.includes(grid_dates_list[i].full_date.getDate() + ", " + grid_dates_list[i].full_date.getMonth())){
            tr_tag += `<td class="date_day_picked">${add_trailing_to_date_num(grid_dates_list[i].full_date.getDate())}</td>`;
        }else{
            tr_tag += `<td>${add_trailing_to_date_num(grid_dates_list[i].full_date.getDate())}</td>`;
        }
    }

    return tr_tag;

}

function return_bookings_grid_view_current_room_markup(current_room){

    let tr_tag = `<td style="color:rgb(95, 96, 225); font-weight: bolder;">${current_room.the_room.room_number}</td>`;

    for(let i=0; i<current_room.days.length; i++){
        
        if(current_room.days[i].classes.includes("booked_checkin") || current_room.days[i].classes.includes("first_available")
        || current_room.days[i].classes.includes("booked_checkout") || current_room.days[i].classes.includes("last_available")){
            tr_tag += `<td class="${current_room.days[i].classes.join(" ")}">
                            ${add_trailing_to_date_num(current_room.days[i].full_date.getDate())}
                        </td>`;
        }else{
            tr_tag += `<td class="${current_room.days[i].classes.join(" ")}"></td>`;
        }
        
    }

    return tr_tag;

}



function return_bookings_grid_view_other_rooms_markup(rooms_list, current_room){

    let all_room_trs = "";

    for(let k=0; k< rooms_list.length; k++){

        if(rooms_list[k].the_room._id === current_room.the_room._id){
            continue;
        }

        let tr_tag = `<tr><td>${rooms_list[k].the_room.room_number}</td>`;

        for(let i=0; i<rooms_list[k].days.length; i++){
            
            if(rooms_list[k].days[i].classes.includes("booked_checkin") || rooms_list[k].days[i].classes.includes("first_available")
            || rooms_list[k].days[i].classes.includes("booked_checkout") || rooms_list[k].days[i].classes.includes("last_available")){
                tr_tag += `<td class="${rooms_list[k].days[i].classes.join(" ")}">
                                ${add_trailing_to_date_num(rooms_list[k].days[i].full_date.getDate())}
                            </td>`;
            }else{
                tr_tag += `<td class="${rooms_list[k].days[i].classes.join(" ")}"></td>`;
            }
            
        }

        tr_tag += "</tr>";

        all_room_trs += tr_tag;

    }

    return all_room_trs;

}

async function generate_and_display_grid_view_bookings(){

    document.getElementById("room_availability_grid_view_tbody").innerHTML = `
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

    //YYYY-MM-DD -YYYY-MM-DDTHH:MM:SS
    let dates_list = build_dates_list_from_range(rooms_grid_view_config.calendar.first, rooms_grid_view_config.calendar.last);
    let checking_checkout_dates_list = build_dates_list_from_range(rooms_grid_view_config.picked_dates.checkin, rooms_grid_view_config.picked_dates.checkout);
    checking_checkout_dates_list = checking_checkout_dates_list.map(each => {
        return each.full_date.getDate() + ", " + each.full_date.getMonth();
    });
    
    let current_room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);
    let rooms_list = await get_and_return_cheap_hotel_rooms_by_property_id(rooms_grid_view_config.property_id);

    rooms_list = await bind_dates_to_rooms(rooms_list, dates_list)

    current_room = {
        the_room: current_room,
        days: _.cloneDeep(dates_list)
    }
    current_room = show_selected_dates_on_selected_room(checking_checkout_dates_list, current_room)

    await add_classes_to_current_rooms_with_dates(current_room, checking_checkout_dates_list);
    await add_classes_to_rooms_with_dates(rooms_list);

    document.getElementById("room_availability_grid_view_tbody").innerHTML = `
        <tr id="room_availability_grid_view_headers">                              
        </tr>
        <tr id="room_availability_grid_view_focused_on_room" class="focused_on_room">
        </tr>
    `;

    document.getElementById("room_availability_grid_view_headers").innerHTML = return_bookings_grid_view_headers(dates_list, checking_checkout_dates_list);
    document.getElementById("room_availability_grid_view_focused_on_room").innerHTML = return_bookings_grid_view_current_room_markup(current_room);
    document.getElementById("room_availability_grid_view_tbody").innerHTML += return_bookings_grid_view_other_rooms_markup(rooms_list, current_room);

    //console.log(rooms_list)
    //console.log(current_room)

    /*for(let i=0; i < dates_list.length; i++){
        console.log(dates_list[i].full_date.getDate());
    }*/
}

document.getElementById("make_reservation_room_select").addEventListener("change", e => {
    rooms_grid_view_config.rooms_id = document.getElementById("make_reservation_room_select").value;
    generate_and_display_grid_view_bookings();
});

document.getElementById("make_reservation_property_select").addEventListener("change", async e => {

    document.getElementById("make_reservation_room_select").innerHTML = '';

    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("make_reservation_property_select").value);
    for(let i=0; i < rooms.length; i++){
        document.getElementById("make_reservation_room_select").innerHTML += `
            <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
        `; 
    }
    
    rooms_grid_view_config.property_id = document.getElementById("make_reservation_property_select").value;
    rooms_grid_view_config.rooms_id = document.getElementById("make_reservation_room_select").value;

    generate_and_display_grid_view_bookings();
});

$(function() {
    $('#make_reservation_date_range_on_popup_input').daterangepicker({
      opens: 'left',
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("make_reservation_date_range_on_popup_input").value = start.toString().substring(0,11) +"  -  "+ end.toString().substring(0,11);
      }, 100);
  
      rooms_grid_view_config.calendar.first = start.format('YYYY-MM-DD');
      rooms_grid_view_config.calendar.last = end.format('YYYY-MM-DD');

      generate_and_display_grid_view_bookings();

      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

$(function() {
    $('#make_reservation_date_range_on_popup_chekin_checkout_input').daterangepicker({
      opens: 'left',
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("make_reservation_date_range_on_popup_input").value = start.toString().substring(0,11) +"  -  "+ end.toString().substring(0,11);
        document.getElementById("make_reservation_date_range_on_popup_chekin_checkout_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      rooms_grid_view_config.picked_dates.checkin = start.format('YYYY-MM-DD');
      rooms_grid_view_config.picked_dates.checkout = end.format('YYYY-MM-DD');

      rooms_grid_view_config.calendar.first = start.format('YYYY-MM-DD');
      rooms_grid_view_config.calendar.last = end.format('YYYY-MM-DD');

      generate_and_display_grid_view_bookings();

      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

$(function() {
    $('#make_reservation_date_range_input').daterangepicker({
      opens: 'left',
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("make_reservation_date_range_on_popup_chekin_checkout_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
        document.getElementById("make_reservation_date_range_on_popup_input").value = start.toString().substring(0,11) +"  -  "+ end.toString().substring(0,11);
        document.getElementById("make_reservation_date_range_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      rooms_grid_view_config.picked_dates.checkin = start.format('YYYY-MM-DD');
      rooms_grid_view_config.picked_dates.checkout = end.format('YYYY-MM-DD');

      rooms_grid_view_config.calendar.first = start.format('YYYY-MM-DD');
      rooms_grid_view_config.calendar.last = end.format('YYYY-MM-DD');

      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});