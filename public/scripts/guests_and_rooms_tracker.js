let rooms_and_guests = {
    booking_total_adults: 3,
    booking_total_children: 6,
    room_guests: [
        {
            id: "",
            number: "",
            total_adults: 0,
            total_children: 0,
            guests: [
                "adult",
                "child",
            ]
        }
    ]
}

function check_is_rooms_capacitance_violated(room_index){

    let room_guests = rooms_and_guests.room_guests[room_index];

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
    rooms_and_guests.room_guests.forEach(room => {
        room.guests.forEach(guest => {
            if(guest === "adult"){
                adults++;
            }else{
                children++;
            }
        });
    });

    remaining.adults = rooms_and_guests.booking_total_adults - adults;
    remaining.children = rooms_and_guests.booking_total_children - children;

    return remaining;

}

function validate_add_new_guest_guest_type(type/*["adult", "child"]*/, room_index){

    let room_guests = rooms_and_guests.room_guests[room_index];

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
