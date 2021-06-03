async function preprocess_bookings_rooms_and_guests(){

    current_edit_booking_object.rooms_and_guests.booking_total_adults = 0;
    current_edit_booking_object.rooms_and_guests.booking_total_children = 0;
    current_edit_booking_object.rooms_and_guests.booking_id = current_edit_booking_object.booking._id;
    
    for(let i=0; i <current_edit_booking_object.booking.rooms.length; i++){

        let room = await get_and_return_hotel_room_by_id(current_edit_booking_object.booking.rooms[i].id);

        /*let this_room_guests = current_edit_booking_object.booking.guests.filter( guest => {
            return ()
        })*/

        current_edit_booking_object.rooms_and_guests.room_guests.push({
            id: current_edit_booking_object.booking.rooms[i].id,
            number: current_edit_booking_object.booking.rooms[i].number,
            total_adults: room.guest_capacitance.adults,
            total_children: room.guest_capacitance.children,
            guests: []
        });
    }

    for(let g=0; g<current_edit_booking_object.booking.guests.length; g++){

        let guest = await get_and_return_hotel_guest_by_id(window.localStorage.getItem("ANDSBZID"), current_edit_booking_object.booking.property_id, current_edit_booking_object.booking.guests[g].id);
        if(guest.assigned_room.room_id){
            for(let k=0; k<current_edit_booking_object.rooms_and_guests.room_guests.length; k++){
                if(current_edit_booking_object.rooms_and_guests.room_guests[g].id === guest.assigned_room.room_id){
                    current_edit_booking_object.rooms_and_guests.room_guests[g].guests.push(guest);
                }
            }
        }

        if(guest.guest_type === "adult"){
            current_edit_booking_object.rooms_and_guests.booking_total_adults += 1;
        }else{
            current_edit_booking_object.rooms_and_guests.booking_total_children += 1;
        }
    }

    console.log(current_edit_booking_object);
    edit_booking_render_initial_rooms_markup("rooms", "properties", current_edit_booking_object.rooms_and_guests.room_guests);
}

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
async function add_new_room_to_edit_booking(){

    let rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let room_id = rooms[0]._id;
    let room = await get_and_return_hotel_room_by_id(room_id);

        /*current_edit_booking_object.rooms_and_guests.room_guests[new_index].id = room._id;
        current_edit_booking_object.rooms_and_guests.room_guests[new_index].number = room.room_number;
        current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults = room.guest_capacitance.adults;
        current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children = room.guest_capacitance.children;*/

    current_edit_booking_object.rooms_and_guests.room_guests.push({
        id: room._id,
        number: room.room_number,
        total_adults: room.guest_capacitance.adults,
        total_children: room.guest_capacitance.children,
        guests: []
    });

    let new_index = (current_edit_booking_object.rooms_and_guests.room_guests.length - 1);
    edit_booking_render_new_room_markup("rooms", "properties", new_index);
}

async function edit_booking_render_new_room_markup(skip_rooms, skip_properties, new_index){

    let number_of_adults_display = current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults} Adults` : `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults} Adult`;
        let number_of_children_display = current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children} Children` : `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children} Child`;

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
                                
                            </select>
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Room</p>
                            <select id="edit_booking_rooms_select_${new_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                
                            </select>
                        </div>
                    </div>
                </div>
                <p id="edit_booking_rooms_capacitance_display_${new_index}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgb(255, 97, 6); font-weight: bolder;">
                    Up to ${number_of_adults_display}, ${number_of_children_display}
                </p>
                <div id="edit_booking_room_guests_forms_list_${new_index}">
                    
                </div>
            </div>
            <div style="color: white; cursor: pointer; margin-top: 10px; display: flex; flex-direction: row !important; overflow: hidden;
                        border-radius: 4px; background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255, 0.3);">
                    <div onclick="edit_booking_add_new_guest('adult', ${new_index});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px); border-right: 1px solid rgba(255,255,255, 0.3);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Adult
                    </div>
                    <div onclick="edit_booking_add_new_guest('child', ${new_index});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Child
                    </div>
                </div>
        </div>
    `;

    set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${new_index}`, `edit_booking_rooms_select_${new_index}`);

    document.getElementById(`edit_booking_rooms_select_${new_index}`).addEventListener("change", e => {
        edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", new_index);
    });
    
}

async function edit_booking_render_initial_rooms_markup(skip_rooms, skip_properties, rooms){

    document.getElementById("edit_booking_rooms_and_guestslist").innerHTML = "";
    for(let i=0; i<rooms.length; i++){

        let number_of_adults_display = rooms[i].total_adults > 1 ? `${rooms[i].total_adults} Adults` : `${rooms[i].total_adults} Adult`;
        let number_of_children_display = rooms[i].total_children > 1 ? `${rooms[i].total_children} Children` : `${rooms[i].total_children} Child`;

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
                                    
                                </select>
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Room</p>
                                <select id="edit_booking_rooms_select_${i}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;">
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <p id="edit_booking_rooms_capacitance_display_${i}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgb(255, 97, 6); font-weight: bolder;">
                        Up to ${number_of_adults_display}, ${number_of_children_display}
                    </p>
                    <div id="edit_booking_room_guests_forms_list_${i}">
                        
                    </div>
                </div>
                <div style="color: white; cursor: pointer; margin-top: 10px; display: flex; flex-direction: row !important; overflow: hidden;
                        border-radius: 4px; background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255, 0.3);">
                    <div onclick="edit_booking_add_new_guest('adult', ${i});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px); border-right: 1px solid rgba(255,255,255, 0.3);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Adult
                    </div>
                    <div onclick="edit_booking_add_new_guest('child', ${i});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Child
                    </div>
                </div>
            </div>
        `;

        set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${i}`, `edit_booking_rooms_select_${i}`);

        let adult_number = 0;
        let child_number = 0;
        for(let g=0; g<rooms[i].guests.length; g++){
            if(rooms[i].guests[g].guest_type === "adult"){

                document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                    <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                        <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                            Adult ${++adult_number}</p>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                                <input id="edit_booking_room_guest_first_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="${rooms[i].guests[g].first_name}" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                                <input id="edit_booking_room_guest_last_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="${rooms[i].guests[g].last_name}" />
                            </div>
                        </div>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                                <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="${rooms[i].guests[g].DOB}" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                                <select id="edit_booking_room_guest_gender_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                    <option value="${rooms[i].guests[g].gender}">${rooms[i].guests[g].gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;

                setTimeout(()=>{
                    bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${i}_${g}`);
                }, 50);

            }else{

                document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                    <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                        <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                            Child ${++child_number}</p>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                                <input id="edit_booking_room_guest_first_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="${rooms[i].guests[g].first_name}" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                                <input id="edit_booking_room_guest_last_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="${rooms[i].guests[g].last_name}" />
                            </div>
                        </div>
                        <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                                <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="${rooms[i].guests[g].DOB}" />
                            </div>
                            <div style="width: calc(50% - 5px);">
                                <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                                <select id="edit_booking_room_guest_gender_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                    <option value="${rooms[i].guests[g].gender}">${rooms[i].guests[g].gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;

                setTimeout(()=>{
                    bind_guest_dob_chooser("child", `edit_booking_room_guest_DOB_input_${i}_${g}`);
                }, 50);

            }

            //inputs onchage event handlers
            document.getElementById(`edit_booking_room_guest_first_name_input_${i}_${g}`).addEventListener('change', e=>{
                add_guest_first_name_to_edit_booking_object(`edit_booking_room_guest_first_name_input_${i}_${g}`, i, g);
            });
            document.getElementById(`edit_booking_room_guest_last_name_input_${i}_${g}`).addEventListener('change', e=>{
                add_guest_last_name_to_edit_booking_object(`edit_booking_room_guest_last_name_input_${i}_${g}`, i, g);
            });
            document.getElementById(`edit_booking_room_guest_gender_input_${i}_${g}`).addEventListener('change', e=>{
                add_guest_gender_to_edit_booking_object(`edit_booking_room_guest_gender_input_${i}_${g}`, i, g);
            });
            document.getElementById(`edit_booking_room_guest_DOB_input_${i}_${g}`).addEventListener('change', e=>{
                add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${i}_${g}`, i, g);
            });

        }

        document.getElementById(`edit_booking_rooms_select_${i}`).addEventListener("change", e => {
            edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", i);
        });
        

    }

    //let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);

}

function edit_booking_add_new_guest(guest_type, room_index){

    //let room_index = (current_edit_booking_object.rooms_and_guests.room_guests.length - 1);
    let guest_index = current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.length

    if(guest_type === "adult"){

        let added_adults = current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.filter( guest => {
            return (guest.guest_type === "adult");
        });

        console.log(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_adults, added_adults.length)
        if(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_adults <= added_adults.length){
            alert("Room's adult capacitance reached");
            return null;
        }

        let new_guest = return_new_hotel_guest_obj(window.localStorage.getItem("ANDSBZID"), document.getElementById(`edit_booking_properties_select_${room_index}`).value,
        'profile_pic_param', 'first_name_param', 'last_name_param', 'adult', 'DOB_param', 'gender_param', 
        'email_param', 'mobile_param', 'price_paid_param', 'status_param', current_edit_booking_object.booking._id, 
        document.getElementById(`edit_booking_rooms_select_${room_index}`).value, 'room_number_param',
        'street_address_param', 'city_param', 'town_param', 'country_param', 'zipcode_param');

        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.push(new_guest);

        document.getElementById("edit_booking_room_guests_forms_list_"+room_index).innerHTML += `
            <div style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                    Adult ${added_adults.length+1}</p>
                <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                        <input id="edit_booking_room_guest_first_name_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="" />
                    </div>
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                        <input id="edit_booking_room_guest_last_name_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="" />
                    </div>
                </div>
                <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                        <input id="edit_booking_room_guest_DOB_input_${room_index}_${guest_index}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="" />
                    </div>
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                        <select id="edit_booking_room_guest_gender_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            </div>
        `;

        setTimeout(()=>{
            bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`);
        }, 50);

        current_edit_booking_object.rooms_and_guests.booking_total_adults += 1;

    }else{

        let added_children = current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.filter( guest => {
            return (guest.guest_type === "child");
        });

        console.log(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_children, added_children.length)
        if(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_children <= added_children.length){
            alert("Room's child capacitance reached");
            return null;
        }

        let new_guest = return_new_hotel_guest_obj(window.localStorage.getItem("ANDSBZID"), document.getElementById(`edit_booking_properties_select_${room_index}`).value,
        'profile_pic_param', 'first_name_param', 'last_name_param', 'child', 'DOB_param', 'gender_param', 
        'email_param', 'mobile_param', 'price_paid_param', 'status_param', current_edit_booking_object.booking._id, 
        document.getElementById(`edit_booking_rooms_select_${room_index}`).value, 'room_number_param',
        'street_address_param', 'city_param', 'town_param', 'country_param', 'zipcode_param');

        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.push(new_guest);

        document.getElementById("edit_booking_room_guests_forms_list_"+room_index).innerHTML += `
            <div style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                    Child ${added_children.length+1}</p>
                <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                        <input id="edit_booking_room_guest_first_name_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="" />
                    </div>
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                        <input id="edit_booking_room_guest_last_name_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="" />
                    </div>
                </div>
                <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                        <input id="edit_booking_room_guest_DOB_input_${room_index}_${guest_index}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="" />
                    </div>
                    <div style="width: calc(50% - 5px);">
                        <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                        <select id="edit_booking_room_guest_gender_input_${room_index}_${guest_index}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            </div>
        `;

        setTimeout(()=>{
            bind_guest_dob_chooser("children", `edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`);
        }, 50);

        current_edit_booking_object.rooms_and_guests.booking_total_children += 1;
    }

    //inputs onchage event handlers
    document.getElementById(`edit_booking_room_guest_first_name_input_${room_index}_${guest_index}`).addEventListener('change', e=>{
        add_guest_first_name_to_edit_booking_object(`edit_booking_room_guest_first_name_input_${room_index}_${guest_index}`, room_index, guest_index);
    });
    document.getElementById(`edit_booking_room_guest_last_name_input_${room_index}_${guest_index}`).addEventListener('change', e=>{
        add_guest_last_name_to_edit_booking_object(`edit_booking_room_guest_last_name_input_${room_index}_${guest_index}`, room_index, guest_index);
    });
    document.getElementById(`edit_booking_room_guest_gender_input_${room_index}_${guest_index}`).addEventListener('change', e=>{
        add_guest_gender_to_edit_booking_object(`edit_booking_room_guest_gender_input_${room_index}_${guest_index}`, room_index, guest_index);
    });
    document.getElementById(`edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`).addEventListener('change', e=>{
        add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`, room_index, guest_index);
    });

    console.log(current_edit_booking_object);
}

function add_guest_first_name_to_edit_booking_object(input_id, room_index, guest_index){
    let firstname = document.getElementById(input_id).value;
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].first_name = firstname;
}

function add_guest_last_name_to_edit_booking_object(input_id, room_index, guest_index){
    let lastname = document.getElementById(input_id).value;
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].last_name = lastname;
}

function add_guest_gender_to_edit_booking_object(input_id, room_index, guest_index){
    let gender = document.getElementById(input_id).value;
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].gender = gender;
}

function add_guest_DOB_to_edit_booking_object(input_id, room_index, guest_index){
    let DOB = document.getElementById(input_id).value;
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].DOB = DOB;
}

async function edit_booking_onchange_rooms_select_render_room_markup(skip_rooms, skip_properties, i){

    let new_room = await get_and_return_hotel_room_by_id(document.getElementById(`edit_booking_rooms_select_${i}`).value);

    //current_edit_booking_object.booking.rooms[i].id
    /*let this_room_guests = current_edit_booking_object.booking.guests.filter( guest => {
        return ()
    })*/

    current_edit_booking_object.rooms_and_guests.room_guests[i].id = new_room._id;
    current_edit_booking_object.rooms_and_guests.room_guests[i].number = new_room.room_number;
    current_edit_booking_object.rooms_and_guests.room_guests[i].total_adults = new_room.guest_capacitance.adults;
    current_edit_booking_object.rooms_and_guests.room_guests[i].total_children = new_room.guest_capacitance.children;
    
    let room = current_edit_booking_object.rooms_and_guests.room_guests[i];

    let number_of_adults_display = room.total_adults > 1 ? `${room.total_adults} Adults` : `${room.total_adults} Adult`;
    let number_of_children_display = room.total_children > 1 ? `${room.total_children} Children` : `${room.total_children} Child`;

    document.getElementById(`edit_booking_rooms_capacitance_display_${i}`).innerHTML = `Up to ${number_of_adults_display}, ${number_of_children_display}`;

    document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML = '';
    let adult_number = 0;
    let child_number = 0;
    for(let g=0; g<room.guests.length; g++){
        if(room.guests[g].guest_type === "adult"){

            document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                    <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                        Adult ${++adult_number}</p>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                            <input id="edit_booking_room_guest_first_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="${room.guests[g].first_name}" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                            <input id="edit_booking_room_guest_last_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="${room.guests[g].last_name}" />
                        </div>
                    </div>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                            <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="${room.guests[g].DOB}" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                            <select id="edit_booking_room_guest_gender_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                <option value="${room.guests[g].gender}">${room.guests[g].gender}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;

            setTimeout(()=>{
                bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${i}_${g}`);
            }, 50);

        }else{

            document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                    <p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                        Child ${++child_number}</p>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">First Name</p>
                            <input id="edit_booking_room_guest_first_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter first name here" value="${room.guests[g].first_name}" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Last Name</p>
                            <input id="edit_booking_room_guest_last_name_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="enter last name here" value="${room.guests[g].last_name}" />
                        </div>
                    </div>
                    <div style="margin-top: 20px; display: flex; flex-direction: row !important; justify-content: space-between;">
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Date Of Birth</p>
                            <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="YYYY-MM-DD eg. 1992-03-23" value="${room.guests[g].DOB}" />
                        </div>
                        <div style="width: calc(50% - 5px);">
                            <p style="color:rgb(30, 184, 255); font-size: 14px; margin-bottom: 10px;">Gender</p>
                            <select id="edit_booking_room_guest_gender_input_${i}_${g}" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: 100%;" >
                                <option value="${room.guests[g].gender}">${room.guests[g].gender}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;

            setTimeout(()=>{
                bind_guest_dob_chooser("child", `edit_booking_room_guest_DOB_input_${i}_${g}`);
            }, 50);

        }

        //inputs onchage event handlers
        document.getElementById(`edit_booking_room_guest_first_name_input_${i}_${g}`).addEventListener('change', e=>{
            add_guest_first_name_to_edit_booking_object(`edit_booking_room_guest_first_name_input_${i}_${g}`, i, g);
        });
        document.getElementById(`edit_booking_room_guest_last_name_input_${i}_${g}`).addEventListener('change', e=>{
            add_guest_last_name_to_edit_booking_object(`edit_booking_room_guest_last_name_input_${i}_${g}`, i, g);
        });
        document.getElementById(`edit_booking_room_guest_gender_input_${i}_${g}`).addEventListener('change', e=>{
            add_guest_gender_to_edit_booking_object(`edit_booking_room_guest_gender_input_${i}_${g}`, i, g);
        });
        document.getElementById(`edit_booking_room_guest_DOB_input_${i}_${g}`).addEventListener('change', e=>{
            add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${i}_${g}`, i, g);
        });

    }


    //let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);

}