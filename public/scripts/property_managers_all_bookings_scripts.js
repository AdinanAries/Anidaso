
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

    document.getElementById("booked_rooms_list").innerHTML = '';

    let dates_list = general_build_dates_list_from_range(get_all_bookings_config.first_date, get_all_bookings_config.last_date);

    get_all_bookings_config.dates = dates_list.map(date => {
        return convert_date_object_to_db_string_format(date.obj);
    });

    get_and_render_all_bookings();

    /*let bookings = await get_all_bookings_based_date_range_and_rooms_filter(window.localStorage.getItem("ANDSBZID"), 
        get_all_bookings_config.first_date, get_all_bookings_config.last_date, get_all_bookings_config.room, 
        get_all_bookings_config.property, get_all_bookings_config.dates);
    
    render_all_bookings_markup(bookings)*/
    
    $("#booked_rooms_container").toggle("up");


}

async function render_all_bookings_markup(bookings){

    for(let i=0; i<bookings.length; i++){

        let property = await get_and_return_hotel_property_by_id(bookings[i].property_id);
        let property_city = property.city;
        let property_country = property.country;
        let property_street = property.street_address;

        let rooms = bookings[i].rooms;
        let booking_checkin_date = bookings[i].checkin_date;
        let booking_checkout_date = bookings[i].checkout_date;
        let price_paid = bookings[i].price_paid;
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
                    ${room_guests[g].age}yrs, ${room_guests[g].gender}</p>
                </div>
            `
        }

        document.getElementById("booked_rooms_list").innerHTML += `
            <div class="each_booked_room" style="background-color:rgba(0, 0, 0, 0.8); padding-top: 10px; border-radius: 4px; margin-bottom: 5px;">
                <div style="padding: 10px;">
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
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Checkin:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${change_date_from_iso_to_long_date(booking_checkin_date)}</span>
                    </p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Checkout:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${change_date_from_iso_to_long_date(booking_checkout_date)}</span>
                    </p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Price paid:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                        $${parseFloat(price_paid).toFixed(2)}</span>
                    </p>
                    <div style="cursor: pointer; margin-top: 10px; display: flex; flex-direction: row !important; justify-content: space-between; border-radius: 4px; overflow: hidden;">
                        <div style="padding: 10px; width: calc(50% - 20px); color: white; background-color: rgb(4, 120, 167); text-align: center; font-size: 13px;">
                            <i style="margin-right: 5px; color:rgb(244, 255, 203);" class="fa fa-pencil" aria-hidden="true"></i>Change
                        </div>
                        <div style="padding: 10px; width: calc(50% - 20px); color: white; background-color: crimson; text-align: center; font-size: 13px;">
                            <i style="margin-right: 5px; color:rgb(244, 255, 203);" class="fa fa-trash" aria-hidden="true"></i>Cancel
                        </div>
                    </div>
                    <p style="letter-spacing: 1px; margin-top: 15px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                        Room Guest(s)</p>
                        ${room_guests_markup}
                </div>
            </div>
        `;
    }
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

      document.getElementById("booked_rooms_list").innerHTML = '';
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

    document.getElementById("booked_rooms_list").innerHTML = '';
    get_and_render_all_bookings();
});

document.getElementById("booked_rooms_filter_by_properties_input").addEventListener("change", e => {

    get_all_bookings_config.property = document.getElementById("booked_rooms_filter_by_properties_input").value;
    document.getElementById("booked_rooms_filter_by_room_input").value = "all%r%s%p%all";
    get_all_bookings_config.room = "all";
    get_all_bookings_config.room_number = "all";

    document.getElementById("booked_rooms_list").innerHTML = '';
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
