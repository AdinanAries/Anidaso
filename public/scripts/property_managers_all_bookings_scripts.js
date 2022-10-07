
let get_all_bookings_config = {
    first_date: "",
    last_date: "",
    property: "all",
    room: "all",
    room_number: "all",
    dates: []
}

get_all_bookings_config.first_date = convert_date_object_to_db_string_format(todays_date2);
get_all_bookings_config.last_date = convert_date_object_to_db_string_format(new Date(todays_date2.setDate(todays_date2.getDate() + 7)));

async function get_and_render_all_bookings(){

    let bookings = await get_all_bookings_based_date_range_and_rooms_filter(window.localStorage.getItem("ANDSBZID"), 
        get_all_bookings_config.first_date, get_all_bookings_config.last_date, get_all_bookings_config.room, 
        get_all_bookings_config.room_number, get_all_bookings_config.property, get_all_bookings_config.dates);
    
    render_all_bookings_markup(bookings)
}

async function toggle_show_booked_rooms(){

    $("#booked_rooms_container").toggle("up");

    let rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    get_all_bookings_config.property = "all";
    get_all_bookings_config.room = "all";
    get_all_bookings_config.room_number = "all";

    document.getElementById("booked_rooms_filter_by_properties_input").innerHTML = `
        <option value="all">
            All Properties
        </option>
    `;

    for(let i=0; i < properties.length; i++){
        document.getElementById("booked_rooms_filter_by_properties_input").innerHTML += `
        <option value="${properties[i]._id}">
            ${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}
        </option>`;
    }

    document.getElementById("booked_rooms_filter_by_room_input").innerHTML = `
        <option value="all%r%s%p%all">
            All Rooms
        </option>
    `;

    //let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("booked_rooms_filter_by_properties_input").value);
    for(let i=0; i < rooms.length; i++){
        document.getElementById("booked_rooms_filter_by_room_input").innerHTML += `
            <option value='${rooms[i]._id}%r%s%p%${rooms[i].room_number}'>${rooms[i].room_number}</option>
        `; 
    }

    document.getElementById("booked_rooms_list").innerHTML = `
        <div style="width: 100%; text-align: center; margin-top: 50px" class="loader loader--style2" title="1">
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

    let dates_list = general_build_dates_list_from_range(get_all_bookings_config.first_date, get_all_bookings_config.last_date);

    get_all_bookings_config.dates = dates_list.map(date => {
        return convert_date_object_to_db_string_format(date.obj);
    });

    get_and_render_all_bookings();

    /*let bookings = await get_all_bookings_based_date_range_and_rooms_filter(window.localStorage.getItem("ANDSBZID"), 
        get_all_bookings_config.first_date, get_all_bookings_config.last_date, get_all_bookings_config.room, 
        get_all_bookings_config.property, get_all_bookings_config.dates);
    
    render_all_bookings_markup(bookings)*/
    
}

async function view_a_room_bookings(room_id, room_number){

    $("#booked_rooms_container").toggle("up");

    let rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    get_all_bookings_config.property = "all";
    get_all_bookings_config.room = room_id;
    get_all_bookings_config.room_number = room_number;

    document.getElementById("booked_rooms_filter_by_properties_input").innerHTML = `
        <option value="all">
            All Properties
        </option>
    `;

    for(let i=0; i < properties.length; i++){
        document.getElementById("booked_rooms_filter_by_properties_input").innerHTML += `
        <option value="${properties[i]._id}">
            ${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}
        </option>`;
    }

    document.getElementById("booked_rooms_filter_by_room_input").innerHTML = `
        <option value="all%r%s%p%all">
            All Rooms
        </option>
    `;

    //let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("booked_rooms_filter_by_properties_input").value);
    for(let i=0; i < rooms.length; i++){
        document.getElementById("booked_rooms_filter_by_room_input").innerHTML += `
            <option value='${rooms[i]._id}%r%s%p%${rooms[i].room_number}'>${rooms[i].room_number}</option>
        `; 
    }

    document.getElementById("booked_rooms_filter_by_room_input").value = `${room_id}%r%s%p%${room_number}`;

    document.getElementById("booked_rooms_list").innerHTML = `
        <div style="width: 100%; text-align: center; margin-top: 50px" class="loader loader--style2" title="1">
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

    let dates_list = general_build_dates_list_from_range(get_all_bookings_config.first_date, get_all_bookings_config.last_date);

    get_all_bookings_config.dates = dates_list.map(date => {
        return convert_date_object_to_db_string_format(date.obj);
    });

    get_and_render_all_bookings();

    /*let bookings = await get_all_bookings_based_date_range_and_rooms_filter(window.localStorage.getItem("ANDSBZID"), 
        get_all_bookings_config.first_date, get_all_bookings_config.last_date, get_all_bookings_config.room, 
        get_all_bookings_config.property, get_all_bookings_config.dates);
    
    render_all_bookings_markup(bookings)*/
    
}

async function render_all_bookings_markup(bookings){

    document.getElementById("total_bookings_counter").innerHTML = `
        ${bookings.length}
    `;

    if(bookings.length === 0){
        document.getElementById("booked_rooms_list").innerHTML = `
            <p style="color: white; font-size: 14px; font-weight: bolder; text-align: center; margin-top: 50px; letter-spacing: 1px;">
                <i style="margin-right: 5px; color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                No booking found!
            </p>
        `;
    }else{
        document.getElementById("booked_rooms_list").innerHTML = '';
    }

    let bookings_total_made = 0;

    for(let i=0; i<bookings.length; i++){

        let property = await get_and_return_hotel_property_by_id(bookings[i].property_id);
        let property_city = property.city;
        let property_country = property.country;
        let property_street = property.street_address;

        let rooms = bookings[i].rooms;
        let booking_checkin_date = bookings[i].checkin_date;
        let booking_checkout_date = bookings[i].checkout_date;
        let price_paid = bookings[i].price_paid;
        bookings_total_made+=price_paid;
        let room_guests = bookings[i].guests;

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
            room_guests_markup += `
                <div style="padding-bottom: 15px;">
                    <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; margin-bottom: 5px;">
                        <i class="fa fa-check" aria-hidden="true"></i>
                        <span style="letter-spacing: 1px; margin-left: 5px; font-size: 15px; color:rgb(245, 196, 151);">
                            ${room_guests[g].first_name} ${room_guests[g].last_name}</span>
                    </p>
                    <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);">
                        <span style="font-size: 12px; color: rgba(255,255,255,0.5);">DOB:</span> ${change_date_from_iso_to_long_date(room_guests[g].DOB)}, 
                    </p>
                    <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgba(245, 196, 151);"> 
                        <span style="font-size: 12px; color: rgba(255,255,255,0.5);">Gender:</span> ${room_guests[g].gender}
                    </p>
                </div>
            `
            break; //will change if needed so that all guests will be displayed
        }

        document.getElementById("booked_rooms_list").innerHTML += `
            <div class="each_booked_room" style="background-color:rgba(0, 0, 0, 0.8); padding-top: 10px; border-bottom: 1px solid rgba(255,255,255,0.2);">
                <div style="padding: 10px;" class="flex_row_default_flex_column_mobile">
                    <div class="flex_child_of_two">
                        <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center; font-weight: bolder;">
                            Room ${room_number}:
                            <span style="letter-spacing: 1px; margin-left: 10px; font-size: 14px; color:rgb(168, 195, 218);">
                                Booked
                                <i style="color:rgb(137, 235, 174); margin-left: 5px;" aria-hidden="true" class="fa fa-check"></i>
                            </span>
                        </p>
                        ${other_rooms_included}
                        <p style="margin-top: 5px; margin-bottom: 20px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px;">
                            ${property_city} 
                            <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                                - ${property_street} (${property_country})
                            </span>
                        </p>
                        <p style="letter-spacing: 1px; color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 5px;">
                            Checkin:
                            <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                            ${change_date_from_iso_to_long_date(booking_checkin_date)}</span>
                        </p>
                        <p style="letter-spacing: 1px; color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 5px;">
                            Checkout:
                            <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                            ${change_date_from_iso_to_long_date(booking_checkout_date)}</span>
                        </p>
                        <p style="letter-spacing: 1px; color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 5px;">
                            Guest Cost:
                            <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                            $${parseFloat(price_paid).toFixed(2)} </span>
                            <span style="color: rgba(255,255,255,0.5); font-size: 13px;">(
                                <i class="fa fa-info-circle" style="color: lightgreen;"></i>
                                + services
                            )</span>
                        </p>
                    </div>
                    <div class="flex_child_of_two flex_non_first_child">
                        <p style="letter-spacing: 1px; margin-top: 15px; margin-bottom: 10px; font-size: 12px; color:rgba(255, 255, 255, 0.5);">
                            ROOM GUEST(S)</p>
                            ${room_guests_markup}
                    </div>
                </div>
                <div style="cursor: pointer; margin: 0 10px; margin-bottom: 10px; display: flex; flex-direction: row !important; justify-content: space-between; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2);">
                    <div onclick="show_view_booking_div('${bookings[i]._id}', 'all_bookings');" style="padding: 10px; width: calc(50% - 20px); color: white; background-color: rgba(41, 66, 88, 0.555); text-align: center; font-size: 13px;">
                        See Details
                    </div>
                    <div style="padding: 10px; width: calc(50% - 20px); color: white; background-color: brown; text-align: center; font-size: 13px;">
                        <i style="margin-right: 5px; color:rgba(244, 255, 203, 0.4); margin-right: 10px;" class="fa fa-trash" aria-hidden="true"></i>Cancel
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("total_earned_from_bookings_div_display").innerText=`$${parseFloat(bookings_total_made).toFixed(2)}`;
}

$(function() {
    $('#all_bookings_date_range_input').daterangepicker({
      opens: 'left',
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("all_bookings_date_range_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      get_all_bookings_config.first_date = start.format('YYYY-MM-DD');
      get_all_bookings_config.last_date = end.format('YYYY-MM-DD');

      let dates_list = general_build_dates_list_from_range(get_all_bookings_config.first_date, get_all_bookings_config.last_date);

        get_all_bookings_config.dates = dates_list.map(date => {
            return convert_date_object_to_db_string_format(date.obj);
        });

        document.getElementById("booked_rooms_list").innerHTML = `
            <div style="width: 100%; text-align: center; margin-top: 50px" class="loader loader--style2" title="1">
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
      get_and_render_all_bookings();

      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

document.getElementById("booked_rooms_filter_by_room_input").addEventListener("change", e => {

    get_all_bookings_config.room = document.getElementById("booked_rooms_filter_by_room_input").value;
    get_all_bookings_config.room = get_all_bookings_config.room.split("%r%s%p%")[0];

    get_all_bookings_config.room_number = document.getElementById("booked_rooms_filter_by_room_input").value
    get_all_bookings_config.room_number = get_all_bookings_config.room_number.split("%r%s%p%")[1];

    document.getElementById("booked_rooms_filter_by_properties_input").value = "all";
    get_all_bookings_config.property = "all";

    document.getElementById("booked_rooms_list").innerHTML = `
        <div style="width: 100%; text-align: center; margin-top: 50px" class="loader loader--style2" title="1">
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
    get_and_render_all_bookings();
});

document.getElementById("booked_rooms_filter_by_properties_input").addEventListener("change", e => {

    get_all_bookings_config.property = document.getElementById("booked_rooms_filter_by_properties_input").value;
    document.getElementById("booked_rooms_filter_by_room_input").value = "all%r%s%p%all";
    get_all_bookings_config.room = "all";
    get_all_bookings_config.room_number = "all";

    document.getElementById("booked_rooms_list").innerHTML = `
        <div style="width: 100%; text-align: center; margin-top: 50px" class="loader loader--style2" title="1">
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
    get_and_render_all_bookings();
})

function get_all_bookings_based_date_range_and_rooms_filter(hotel_id, first_date, last_date, room_id, room_number, property_id, booking_dates_list){
    
    return $.ajax({
        type: "POST",
        url: `/get_all_bookings_based_date_range_and_rooms_filter/${hotel_id}/${first_date}/${last_date}/${room_id}/${room_number}/${property_id}`,
        data: JSON.stringify({
            dates_list: booking_dates_list
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            return res;
        },
        error: err => {
            return err;
        }
    });

}
