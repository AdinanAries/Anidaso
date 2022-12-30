async function preprocess_bookings_rooms_and_guests(){

    //current_edit_booking_object.rooms_and_guests.booking_id = "";
    all_running_invoices=[];
    current_edit_booking_object.rooms_and_guests.booking_total_adults = 0;
    current_edit_booking_object.rooms_and_guests.booking_total_children = 0;
    current_edit_booking_object.rooms_and_guests.room_guests = [];

    current_edit_booking_object.rooms_and_guests.booking_total_adults = 0;
    current_edit_booking_object.rooms_and_guests.booking_total_children = 0;
    current_edit_booking_object.rooms_and_guests.booking_id = current_edit_booking_object.booking._id;
    document.getElementById("edit_booking_guest_email_input").value = current_edit_booking_object.booking.guest_contact.email;
    document.getElementById("edit_booking_guest_mobile_input").value = current_edit_booking_object.booking.guest_contact.mobile.split(" ")[1];
    document.getElementById("edit_booking_guest_mobile_country_code_select").value = current_edit_booking_object.booking.guest_contact.mobile.split(" ")[0];
    document.getElementById("edit_booking_checkin_checkout_input").placeholder = `${current_edit_booking_object.booking.checkin_date} - ${current_edit_booking_object.booking.checkout_date}`;
    let invoice;
    try{
        invoice = await get_cheap_hotel_guest_invioce(
        current_edit_booking_object.booking.guests[0].id, 
        current_edit_booking_object.booking._id,
        localStorage.getItem('ANDSBZID'),
        current_edit_booking_object.booking.property_id);
        all_running_invoices.push(invoice);
    }catch(e){
        invoice = await get_cheap_hotel_booking_invioce(
            current_edit_booking_object.booking._id,
            localStorage.getItem('ANDSBZID'),
            current_edit_booking_object.booking.property_id);
            all_running_invoices.push(invoice);
        console.log(e.message);
    }
    

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
                if(current_edit_booking_object.rooms_and_guests.room_guests[k].id === guest.assigned_room.room_id){
                    current_edit_booking_object.rooms_and_guests.room_guests[k].guests.push(guest);
                    if(guest.guest_type === "adult"){
                        current_edit_booking_object.rooms_and_guests.booking_total_adults += 1;
                    }else{
                        current_edit_booking_object.rooms_and_guests.booking_total_children += 1;
                    }
                }
            }
        }    
    }

    console.log(current_edit_booking_object);
    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
    edit_booking_render_initial_rooms_markup("rooms", "properties", current_edit_booking_object.rooms_and_guests.room_guests);
    document.getElementById("full_screen_loader").style.display = "none";
}

//final step before post to api
async function prepare_edit_booking_post_object_for_db(){

    current_edit_booking_object.booking.rooms = [];
    current_edit_booking_object.booking.guests = [];
    for(let i=0; i<current_edit_booking_object.rooms_and_guests.room_guests.length; i++){

        current_edit_booking_object.booking.rooms.push({
            id: current_edit_booking_object.rooms_and_guests.room_guests[i].id,
            number: current_edit_booking_object.rooms_and_guests.room_guests[i].number
        });

        let added_adults_number = 0;
        let added_children_number = 0;
        for(let g=0; g<current_edit_booking_object.rooms_and_guests.room_guests[i].guests.length; g++){

            //adding contacts to each guest
            current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].mobile = current_edit_booking_object.booking.guest_contact.mobile;
            current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].email = current_edit_booking_object.booking.guest_contact.email;
            
            if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].guest_type === "adult"){
                added_adults_number++;
                if(current_edit_booking_object.rooms_and_guests.room_guests[i].total_adults < added_adults_number){
                    continue;
                }
            }
            if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].guest_type === "child"){
                added_children_number++;
                if(current_edit_booking_object.rooms_and_guests.room_guests[i].total_children < added_children_number){
                    continue;
                }
            }

            //creating guest records in DB
            if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g]._id){
                //update guest here
            }else{
                let new_guest_rec = await create_guest_record_in_DB(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g]);
                current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g]._id = new_guest_rec._id;
            }
            

            current_edit_booking_object.booking.guests.push({
                id: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g]._id,
                first_name: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].first_name,
                last_name: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].last_name,
                DOB: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].DOB,
                age: 0,
                gender: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].gender,
                price_paid: 0,
                profile_pic: "",
                type: current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].guest_type,
            });
        }
    }

    return {done: true};
}

function create_guest_record_in_DB(guest){
    return $.ajax({
        type: "POST",
        url: "/add_new_cheap_hotel_guest/",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(guest),
        success: data => {
            console.log(data);
            return data;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
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

function edit_booking_check_all_guest_inputs_added(){
    let pass = true;
    
    for(let i=0; i<current_edit_booking_object.rooms_and_guests.room_guests.length; i++){
        for(let g=0; g<current_edit_booking_object.rooms_and_guests.room_guests[i].guests.length; g++){
            if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].first_name === "" || 
            current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].last_name === "" ||
            current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].DOB === ""){
                pass = false;
            }
        }
        
    }
    return pass;
}

function edit_booking_check_all_added_rooms_have_guest(){

    let pass = true;
    
    for(let i=0; i<current_edit_booking_object.rooms_and_guests.room_guests.length; i++){
        if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests.length<1){
            pass = false;
            break;
        }
    }
    return pass;
}

function edit_booking_check_all_added_rooms_are_different(){

    let pass = true;
    let found=false;
    let unique=[];
    for(let i=0; i<current_edit_booking_object.rooms_and_guests.room_guests.length; i++){
        unique.forEach(each=>{
            if(each.id===current_edit_booking_object.rooms_and_guests.room_guests[i].id){
                found=true;
                pass = false;
            }
        });
        if(!found){
            unique.push(current_edit_booking_object.rooms_and_guests.room_guests[i]);
        }
    }
    
    return pass;
}

function edit_booking_check_if_booking_has_atleast_one_room(){
    return current_edit_booking_object.rooms_and_guests.room_guests.length;
}

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
    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
}

function remove_existing_room_from_edit_booking(i){

    if(current_edit_booking_object.rooms_and_guests.room_guests.length===1){
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Not Finished`, 
            "Booking must have atleast one room", "warning");
        return null;
    }

    for(let g=0; g<current_edit_booking_object.rooms_and_guests.room_guests[i].guests.length; g++){

        if(current_edit_booking_object.rooms_and_guests.room_guests[i].guests[g].guest_type === "adult"){
            current_edit_booking_object.rooms_and_guests.booking_total_adults -= 1;
        }else{
            current_edit_booking_object.rooms_and_guests.booking_total_children -= 1;
        }
    }

    let start_index=0;
    let end_index=current_edit_booking_object.rooms_and_guests.room_guests[i].guests.length;
    for(let y=0;y<current_edit_booking_object.rooms_and_guests.room_guests.length;y++){
        if(y===i){
            break;
        }
        start_index += current_edit_booking_object.rooms_and_guests.room_guests[y].guests.length;
    }
    remove_guest_from_running_invoice(start_index, 0, end_index, 0);
    current_edit_booking_object.rooms_and_guests.room_guests.splice(i,1);

    edit_booking_render_initial_rooms_markup("rooms", "properties", current_edit_booking_object.rooms_and_guests.room_guests);
    //$(`#edit_booking_another_room_${i}`).toggle("up");

    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
}

function remove_existing_guest_from_edit_booking(room_index, guest_index){

    if(current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].guest_type === "adult"){
        current_edit_booking_object.rooms_and_guests.booking_total_adults -= 1;
    }else{
        current_edit_booking_object.rooms_and_guests.booking_total_children -= 1;
    }

    let start_index=0;
    for(let y=0;y<current_edit_booking_object.rooms_and_guests.room_guests.length;y++){
        if(y===room_index){
            break;
        }
        start_index += current_edit_booking_object.rooms_and_guests.room_guests[y].guests.length;
    }
    remove_guest_from_running_invoice(start_index, guest_index, 1, 0);
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.splice(guest_index, 1);
    edit_booking_render_initial_rooms_markup("rooms", "properties", current_edit_booking_object.rooms_and_guests.room_guests);
    //$(`#edit_booking_room_guest_form_${room_index}_${guest_index}`).toggle("up");

    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
}

async function edit_booking_render_new_room_markup(skip_rooms, skip_properties, new_index){

    let number_of_adults_display = current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults} Adults` : `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_adults} Adult`;
        let number_of_children_display = current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children} Children` : `${current_edit_booking_object.rooms_and_guests.room_guests[new_index].total_children} Child`;

    document.getElementById("edit_booking_rooms_and_guestslist").innerHTML += `
        <div id="edit_booking_another_room_${new_index}" style="padding: 20px 0; margin-bottom: 5px; background-color: rgba(0,0,0,0.4);">
            <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                <p style="margin-left: 5px; font-size: 16px; color:rgb(168, 195, 218); font-weight: bolder;">
                    <i style="margin-right: 5px; color:rgb(255, 97, 6);" aria-hidden="true" class="fa fa-building"></i>
                    Room ${new_index + 1}</p>
                <p onclick="remove_existing_room_from_edit_booking(${new_index});" style="margin-left: 5px; font-size: 14px; padding: 5px 10px; background-color: brown; border-radius: 4px; color: white; cursor: pointer;">
                    <i style="margin-right: 5px; color:rgba(255, 255, 255,0.5);" aria-hidden="true" class="fa fa-trash"></i>
                    Remove Room ${new_index + 1}</p>
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
                <p id="edit_booking_rooms_capacitance_display_${new_index}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgba(255,255,255,0.5);">
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

    set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${new_index}`, `edit_booking_rooms_select_${new_index}`, new_index);

    document.getElementById(`edit_booking_rooms_select_${new_index}`).addEventListener("change", e => {
        edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", new_index);
    });

    document.getElementById(`edit_booking_properties_select_${new_index}`).addEventListener("change", e => {
        setTimeout(()=>{
            edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", new_index);
        }, 100);
    });
    
}

async function edit_booking_render_initial_rooms_markup(skip_rooms, skip_properties, rooms){

    document.getElementById("edit_booking_rooms_and_guestslist").innerHTML = "";
    dt_i = 0;
    for(let i=0; i<rooms.length; i++){

        let number_of_adults_display = rooms[i].total_adults > 1 ? `${rooms[i].total_adults} Adults` : `${rooms[i].total_adults} Adult`;
        let number_of_children_display = rooms[i].total_children > 1 ? `${rooms[i].total_children} Children` : `${rooms[i].total_children} Child`;

        document.getElementById("edit_booking_rooms_and_guestslist").innerHTML += `
            <div id="edit_booking_another_room_${i}" style="padding: 20px 5px; margin-bottom: 10px; background-color: rgba(0,0,0,0.4);">
                <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                    <p style="margin-left: 5px; font-size: 16px; color:rgb(168, 195, 218); font-weight: bolder;">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" aria-hidden="true" class="fa fa-building"></i>
                        Room ${rooms[i].number}</p>
                    <p onclick="remove_existing_room_from_edit_booking(${i});" style="margin-left: 5px; font-size: 14px; color: white; cursor: pointer; background-color: brown; padding: 5px 10px; border-radius: 4px;">
                        <i style="margin-right: 5px; color:rgba(255,255,255,0.5);" aria-hidden="true" class="fa fa-trash"></i>
                        Remove ${rooms[i].number}</p>
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
                    <p id="edit_booking_rooms_capacitance_display_${i}" style="font-size: 13px; margin-top: 20px; margin-bottom: 10px; margin-left: 10px; color:rgba(255,255,255,0.5);">
                        Up to ${number_of_adults_display}, ${number_of_children_display}
                    </p>
                    <div id="edit_booking_room_guests_forms_list_${i}">
                        
                    </div>
                </div>
                <div style="color: white; cursor: pointer; display: flex; flex-direction: row !important; background-color: rgba(41, 66, 88, 0.555); border: 1px solid rgba(255,255,255, 0.3);">
                    <div onclick="edit_booking_add_new_guest('adult', ${i});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px); border-right: 1px solid rgba(255,255,255, 0.3);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Adult to ${rooms[i].number}
                    </div>
                    <div onclick="edit_booking_add_new_guest('child', ${i});" style="padding: 10px; text-align: center; font-size: 14px; width: calc(50% - 20px);">
                        <i style="margin-right: 5px; color:rgb(255, 97, 6);" class="fa fa-plus" aria-hidden="true"></i>
                        Add Child to ${rooms[i].number}
                    </div>
                </div>
            </div>
        `;

        set_properties_and_rooms_for_select_inputs(`edit_booking_properties_select_${i}`, `edit_booking_rooms_select_${i}`, i);

        let adult_number = 0;
        let child_number = 0;
        let dt_g = 0;
        for(let g=0; g<rooms[i].guests.length; g++){
            if(rooms[i].guests[g].guest_type === "adult"){

                document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                    <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                        <!--p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                            Adult ${++adult_number}</p-->
                        <div onclick="remove_existing_guest_from_edit_booking(${i}, ${g});" style="border-radius: 4px; width: fit-content; background-color: brown; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">
                            <p style="font-size: 14px; color: white;" >
                                <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                                remove ${rooms[i].guests[g].first_name} from ${rooms[i].number}
                            </p>
                        </div>
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
                                <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="${rooms[i].guests[g].DOB}" value="" />
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
                    edit_booking_bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${i}_${dt_g}`, i, dt_g);
                    dt_g++;
                }, 10);

            }else{

                document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML += `
                    <div id="edit_booking_room_guest_form_${i}_${g}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                        <!--p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                            Child ${++child_number}</p-->
                            <div onclick="remove_existing_guest_from_edit_booking(${i}, ${g});" style="border-radius: 4px; width: fit-content; background-color: brown; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">
                            <p style="font-size: 14px; color: white;" >
                                <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                                remove ${rooms[i].guests[g].first_name} from ${rooms[i].number}
                            </p>
                        </div>
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
                                <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="${rooms[i].guests[g].DOB}" value="" />
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
                        <!--div onclick="remove_existing_guest_from_edit_booking(${i}, ${g});" style="padding: 10px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                            <p style="font-size: 14px; color: white; text-align: center;">
                                <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                                remove ${rooms[i].guests[g].first_name}
                            </p>
                        </div-->
                    </div>
                `;

                setTimeout(()=>{
                    edit_booking_bind_guest_dob_chooser("child", `edit_booking_room_guest_DOB_input_${i}_${dt_g}`, i, dt_g);
                    dt_g++;
                }, 10);

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
            /*document.getElementById(`edit_booking_room_guest_DOB_input_${i}_${g}`).addEventListener('change', e=>{
                add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${i}_${g}`, i, g);
            });*/

        }

        setTimeout(()=>{
            dt_i++;
        }, 10);

        document.getElementById(`edit_booking_rooms_select_${i}`).addEventListener("change", e => {
            edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", i);
        });

        document.getElementById(`edit_booking_properties_select_${i}`).addEventListener("change", e => {
            setTimeout(()=>{
                edit_booking_onchange_rooms_select_render_room_markup("skip_rooms", "skip_properties", i);
            }, 100);
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

        //console.log(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_adults, added_adults.length)
        if(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_adults <= added_adults.length){
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                 Action Not Allowed`, 
            "Room's adult capacitance reached", "warning");
            return null;
        }

        let new_guest = return_new_hotel_guest_obj(window.localStorage.getItem("ANDSBZID"), document.getElementById(`edit_booking_properties_select_${room_index}`).value,
        ''/*profile_pic*/, ''/*first_name*/, ''/*last_name*/, 'adult', ''/*DOB*/, 'Male'/*gender*/, 
        ''/*email*/, ''/*mobile*/, ''/*price_paid*/, 'booked'/*status*/, current_edit_booking_object.booking._id, 
        document.getElementById(`edit_booking_rooms_select_${room_index}`).value/*room_id*/, 
        current_edit_booking_object.rooms_and_guests.room_guests[room_index].number/*room_number*/,
        ''/*street_address*/, ''/*city*/, ''/*town*/, ''/*country*/, ''/*zipcode*/);

        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.push(new_guest);

        document.getElementById("edit_booking_room_guests_forms_list_"+room_index).innerHTML += `
            <div id="edit_booking_room_guest_form_${room_index}_${guest_index}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                <!--p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                    Adult ${added_adults.length+1}</p-->
                <div onclick="remove_existing_guest_from_edit_booking(${room_index}, ${guest_index});" style=" padding: 5px 10px; width: fit-content; background-color: brown; border-radius: 4px; cursor: pointer;">
                    <p style="font-size: 14px; color: white; text-align: center;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                        remove adult ${added_adults.length+1}
                    </p>
                </div>
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
            edit_booking_bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`, room_index, guest_index);
        }, 10);

        current_edit_booking_object.rooms_and_guests.booking_total_adults += 1;

    }else{

        let added_children = current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.filter( guest => {
            return (guest.guest_type === "child");
        });

        //console.log(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_children, added_children.length)
        if(current_edit_booking_object.rooms_and_guests.room_guests[room_index].total_children <= added_children.length){
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                 Action Not Allowed`, 
            "Room's child capacitance reached", "warning");
            return null;
        }

        let new_guest = return_new_hotel_guest_obj(window.localStorage.getItem("ANDSBZID"), document.getElementById(`edit_booking_properties_select_${room_index}`).value,
        ''/*profile_pic*/, ''/*first_name*/, ''/*last_name*/, 'child', ''/*DOB*/, 'Male'/*gender*/, 
        ''/*email*/, ''/*mobile*/, ''/*price_paid*/, 'booked'/*status*/, current_edit_booking_object.booking._id, 
        document.getElementById(`edit_booking_rooms_select_${room_index}`).value/*room_id*/, 
        current_edit_booking_object.rooms_and_guests.room_guests[room_index].number/*room_number*/,
        ''/*street_address*/, ''/*city*/, ''/*town*/, ''/*country*/, ''/*zipcode*/);

        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests.push(new_guest);

        document.getElementById("edit_booking_room_guests_forms_list_"+room_index).innerHTML += `
            <div id="edit_booking_room_guest_form_${room_index}_${guest_index}" style="padding: 10px 5px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.3);">
                <!--p style="color:rgba(255, 208, 187, 0.815); font-size: 13px; font-weight: bolder;">
                    Child ${added_children.length+1}</p-->
                <div onclick="remove_existing_guest_from_edit_booking(${room_index}, ${guest_index});" style="padding: 5px 10px; width: fit-content; background-color: brown; cursor: pointer; border-radius: 4px;">
                    <p style="font-size: 14px; color: white; text-align: center;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                        remove child ${added_children.length+1}
                    </p>
                </div>
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
            edit_booking_bind_guest_dob_chooser("children", `edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`, room_index, guest_index);
        }, 10);

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
    /*document.getElementById(`edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`).addEventListener('change', e=>{
        add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${room_index}_${guest_index}`, room_index, guest_index);
    });*/

    console.log(current_edit_booking_object);
    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
    include_guest_in_running_invoice(
        current_edit_booking_object.booking._id,
        "guest_id_before_creation",
        current_edit_booking_object.rooms_and_guests.room_guests[room_index].id,
        [],
        0
    );
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

function add_new_mobile_number_to_edit_booking_obj(){
    let country_code = document.getElementById("edit_booking_guest_mobile_country_code_select").value;
    let number = document.getElementById("edit_booking_guest_mobile_input").value;
    current_edit_booking_object.booking.guest_contact.mobile = `${country_code} ${number}`;
}
function add_new_email_to_edit_booking_obj(){
    let e_mail = document.getElementById("edit_booking_guest_email_input").value;
    current_edit_booking_object.booking.guest_contact.email = e_mail;
}

$(function() {
    $('#edit_booking_checkin_checkout_input').daterangepicker({
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("edit_booking_checkin_checkout_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
        current_edit_booking_object.booking.checkin_date = start.format('YYYY-MM-DD');
        current_edit_booking_object.booking.checkout_date = end.format('YYYY-MM-DD');
      }, 100);
      
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });
/*function add_guest_DOB_to_edit_booking_object(input_id, room_index, guest_index){
    let DOB = document.getElementById(input_id).value;
    current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].DOB = DOB;
}*/

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

    /*let added_adults = current_edit_booking_object.rooms_and_guests.room_guests[i].guests.filter( guest => {
        return (guest.guest_type === "adult");
    });*/

    document.getElementById("edit_booking_room_guests_forms_list_"+i).innerHTML = '';
    let adult_number = 0;
    let child_number = 0;
    let dt_g = 0;
    for(let g=0; g<room.guests.length; g++){
        
        if(room.guests[g].guest_type === "adult"){

            if(current_edit_booking_object.rooms_and_guests.room_guests[i].total_adults <= adult_number){
                continue;
            }

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
                            <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="${room.guests[g].DOB}" value="" />
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
                    <div onclick="remove_existing_guest_from_edit_booking(${i}, ${g});" style="margin-top: 20px; padding: 10px; border: 1px solid rgba(255,255,255,0.4); border-radius: 4px;">
                    <p style="font-size: 14px; color: white; text-align: center;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                        remove adult ${adult_number}
                    </p>
                </div>
                </div>
            `;

            setTimeout(()=>{
                edit_booking_bind_guest_dob_chooser("adult", `edit_booking_room_guest_DOB_input_${i}_${dt_g}`, i, dt_g);
                dt_g++;
            }, 10);

        }else{

            if(current_edit_booking_object.rooms_and_guests.room_guests[i].total_children <= child_number){
                continue;
            }

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
                            <input id="edit_booking_room_guest_DOB_input_${i}_${g}" readonly="true" style="border: none; padding: 10px; border-radius: 0; border-radius: 4px; width: calc(100% - 20px);" type="text" placeholder="${room.guests[g].DOB}" value="" />
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
                    <div onclick="remove_existing_guest_from_edit_booking(${i}, ${g});" style="margin-top: 20px; padding: 10px; border: 1px solid rgba(255,255,255,0.4); border-radius: 4px;">
                    <p style="font-size: 14px; color: white; text-align: center;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-trash" aria-hidden="true"></i>
                        remove child ${child_number}
                    </p>
                </div>
                </div>
            `;

            setTimeout(()=>{
                edit_booking_bind_guest_dob_chooser("child", `edit_booking_room_guest_DOB_input_${i}_${dt_g}`, i, dt_g);
                dt_g++
            }, 10);

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
        /*document.getElementById(`edit_booking_room_guest_DOB_input_${i}_${g}`).addEventListener('change', e=>{
            add_guest_DOB_to_edit_booking_object(`edit_booking_room_guest_DOB_input_${i}_${g}`, i, g);
        });*/

    }

    let total_added_all_guests = (current_edit_booking_object.rooms_and_guests.booking_total_adults + current_edit_booking_object.rooms_and_guests.booking_total_children);
    let rooms_display_txt = current_edit_booking_object.rooms_and_guests.room_guests.length > 1 ? `${current_edit_booking_object.rooms_and_guests.room_guests.length} rooms` : `${current_edit_booking_object.rooms_and_guests.room_guests.length} room`;
    let guests_display_txt = total_added_all_guests > 1 ? `${total_added_all_guests} guests` : `${total_added_all_guests} guest`;
    document.getElementById("total_rooms_and_guest_counter").innerHTML = `
        <i style="margin-right: 5px; color:rgb(137, 235, 174);" class="fa fa-info-circle" aria-hidden="true"></i>
        This booking has  ${rooms_display_txt} ${guests_display_txt}
    `;
    //let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);

}

async function save_updated_hotel_booking(){

    if(!edit_booking_check_if_booking_has_atleast_one_room()){
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Not Finished`, 
            "Please include at least one room", "warning");
        return null;
    }

    if(!edit_booking_check_all_added_rooms_are_different()){
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Not Finished`, 
            "Please make sure each room is included only once", "warning");
        return null;
    }

    if(!edit_booking_check_all_added_rooms_have_guest()){
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Not Finished`, 
            "Please make sure all added rooms include at least one guest", "warning");
        return null;
    }

    let is_good_to_go = await edit_booking_check_all_guest_inputs_added();
    if(!is_good_to_go){
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: yello2;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Not Finished`, 
            "Please add all guest(s) information", "warning");
        return null;
    }

    if(document.getElementById("edit_booking_guest_email_input").value === ""){
        if(!is_good_to_go){
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
                "Please add guest emial", "warning");
            return null;
        }
    }

    if(document.getElementById("edit_booking_guest_mobile_input").value === ""){
        if(!is_good_to_go){
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: yellow;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                Not Finished`, 
                "Please add guest mobile", "warning");
            return null;
        }
    }

    the_full_screen_loader.style.display = "block";
    
    //let dates_list = build_dates_list_from_range(rooms_grid_view_config.calendar.first, rooms_grid_view_config.calendar.last);
    let checking_checkout_dates_list = build_dates_list_from_range(current_edit_booking_object.booking.checkin_date, current_edit_booking_object.booking.checkout_date);

    current_edit_booking_object.booking.all_dates_of_occupancy = [];
    for(let k=0; k<checking_checkout_dates_list.length; k++){
        current_edit_booking_object.booking.all_dates_of_occupancy.push(convert_date_object_to_db_string_format(checking_checkout_dates_list[k].full_date));
    }

    await prepare_edit_booking_post_object_for_db();
    console.log(current_edit_booking_object.booking);
    $.ajax({
        type: "POST",
        url: "/update_cheap_hotel_booking/",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(current_edit_booking_object.booking),
        success: data => {
            console.log(data);
            for(let i=0;i<data.guests.length;i++){
                bind_user_id_to_running_invoice(data.guests[i].id, i);
            }
            update_and_return_cheap_hotel_guest_invoice()
            the_full_screen_loader.style.display = "none";
            toggle_show_view_booking_div();
            //document.getElementById("view_booking_div").style.display = "none";
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: rgb(0, 177, 139);" class="fa fa-check" aria-hidden="true"></i>
                 Booking Update`, 
            "Booking Update Finished Successfully!", "success");
            
        },
        error: err => {
            the_full_screen_loader.style.display = "none";
            console.log(err);
        }
    });
}