function check_is_rooms_capacitance_violated(room_index){

    let room_guests = current_edit_booking_object.rooms_and_guests.room_guests[room_index];

    if(room_guests.room_total_adults + room_guests.room_total_children > room_guests.guests.length){
        return true;
    }else{
        return false;
    }

}

function get_remain_booking_guests(){
    
    let remaining = {
        adults: 0,
        children: 0
    }

    let adults = 0;
    let children = 0;
    current_edit_booking_object.rooms_and_guests.room_guests.forEach(room => {
        room.guests.forEach(guest => {
            if(guest === "adult"){
                adults++;
            }else{
                children++;
            }
        });
    });

    remaining.adults = current_edit_booking_object.rooms_and_guests.booking_total_adults - adults;
    remaining.children = current_edit_booking_object.rooms_and_guests.booking_total_children - children;

    return remaining;

}

function validate_allow_add_new_guest(type/*["adult", "child"]*/, room_index){

    let room_guests = current_edit_booking_object.rooms_and_guests.room_guests[room_index];

    let guest_type = room_guests.guests.filter(each => {
        return (each === type);
    });

    if(type === "adult"){
        if(guest_type.length > room_guests.total_adults){
            return {failed: true};
        }else{
            return {failed: false};
        }
    }else{
        if(guest_type.length > room_guests.total_children){
            return {failed: true};
        }else{
            return {failed: false};
        }
    }

}

console.log(get_remain_booking_guests());

//Edit booking functions
let rooms_for_test = [{},{},{}];
function add_new_room_to_edit_booking(){
    edit_booking_render_new_room_markup("rooms", "properties", 1);
}

async function edit_booking_render_new_room_markup(skip_rooms, skip_properties, new_index){

    document.getElementById("edit_booking_rooms_and_guestslist").innerHTML += `
        <div id="edit_booking_another_room_${new_index}" style="padding: 20px 0; margin-bottom: 5px;">
            <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                <p style="margin-left: 5px; font-size: 16px; color:rgb(168, 195, 218); font-weight: bolder;">
                    <i style="margin-right: 5px; color:rgb(255, 97, 6);" aria-hidden="true" class="fa fa-building"></i>
                    Room ${new_index + 1}</p>
                <p style="margin-left: 5px; font-size: 14px; color: white; cursor: pointer;">
                    <i style="margin-right: 5px; color:rgb(255, 61, 61);" aria-hidden="true" class="fa fa-trash"></i>
                    Remove</p>
            </div>
            <div>
                <div>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Building</p>
                            <select id="edit_booking_properties_select_${new_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                <opttion>All</opttion>
                                <option>Kumasi - 2122 Estate Junc (Ghana)</option>
                            </select>
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Room</p>
                            <select id="edit_booking_rooms_select_${new_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                <opttion>All</opttion>
                                <option>Kumasi - 2122 Estate Junc (Ghana)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <p id="edit_booking_rooms_capacitance_display_${new_index}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgb(255, 97, 6); font-weight: bolder;">
                    Up to 1 Adult, 4 Children
                </p>
                <div id="edit_booking_room_guests_forms_list_${new_index}">
                    <div style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                        <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                            Adult 1</p>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                                <input id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                                <input id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="" />
                            </div>
                        </div>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                                <input id="" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                                <select id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="color: white; cursor: pointer; margin-top: 10px; padding: 10px; border-radius: 4px; text-align: center; font-size: 14px; background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255, 0.3);">
                <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                Add Guest
            </div>
        </div>
    `;

    set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${new_index}`, `edit_booking_rooms_select_${new_index}`);
    //let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);

}

async function edit_booking_render_initial_rooms_markup(skip_rooms, skip_properties, rooms){

    document.getElementById("edit_booking_rooms_and_guestslist").innerHTML = "";
    for(let i=0; i<rooms.length; i++){
        document.getElementById("edit_booking_rooms_and_guestslist").innerHTML += `
            <div id="edit_booking_another_room_${i}" style="padding: 20px 0; margin-bottom: 5px;">
                <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                    <p style="margin-left: 5px; font-size: 16px; color:rgb(168, 195, 218); font-weight: bolder;">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" aria-hidden="true" class="fa fa-building"></i>
                        Room ${i + 1}</p>
                    <p style="margin-left: 5px; font-size: 14px; color: white; cursor: pointer;">
                        <i style="margin-right: 5px; color:rgb(255, 61, 61);" aria-hidden="true" class="fa fa-trash"></i>
                        Remove</p>
                </div>
                <div>
                    <div>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Building</p>
                                <select id="edit_booking_properties_select_${i}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                    <opttion>All</opttion>
                                    <option>Kumasi - 2122 Estate Junc (Ghana)</option>
                                </select>
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Room</p>
                                <select id="edit_booking_rooms_select_${i}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                    <opttion>All</opttion>
                                    <option>Kumasi - 2122 Estate Junc (Ghana)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p id="edit_booking_rooms_capacitance_display_${i}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgb(255, 97, 6); font-weight: bolder;">
                        Up to 1 Adult, 4 Children
                    </p>
                    <div id="edit_booking_room_guests_forms_list_${i}">
                        
                    </div>
                </div>
                <div style="color: white; cursor: pointer; margin-top: 10px; padding: 10px; border-radius: 4px; text-align: center; font-size: 14px; background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255, 0.3);">
                    <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                    Add Guest
                </div>
            </div>
        `;

        set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${i}`, `edit_booking_rooms_select_${i}`);

        let guests_of_room = [{},{}];
        for(let g=0; g<guests_of_room.length; g++){
            document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                    <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                        Adult 1</p>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                            <input id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                            <input id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="" />
                        </div>
                    </div>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                            <input id="" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                            <select id="" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    //let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);

}

edit_booking_render_initial_rooms_markup("rooms", "properties", rooms_for_test);