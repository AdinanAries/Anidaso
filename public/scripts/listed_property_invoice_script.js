function get_cheap_hotel_guest_invioce(guest_id, booking_id, hotel_brand_id, property_id){
    
    return $.ajax({
        url: '/get_cheap_hotel_guest_invoice/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({guest_id,booking_id,hotel_brand_id,property_id}),
        success: (res) => {
            return res;
        },
        error: (err) => {
            return err;
        }
    })
}

async function include_guest_in_running_invoice(booking_id,guest_id,room_id,items=[],index){
    //let guest = await get_and_return_hotel_guest_by_id(guest_id);
    let room = await get_and_return_hotel_room_by_id(room_id);
    running_invoice = all_running_invoices[index];
    running_invoice.invoice_items.push({
        guest_id: guest_id,
        booking_id: booking_id, 
        guest_items: [
            {name: `Room ${room.room_number}`, price: room.price, quantity: 1, total: room.price},
            ...items
        ]
    });
    console.log('after adding a guest', running_invoice);
}

async function remove_guest_from_running_invoice(start_index=0, guest_index, end_index, invoice_index){
    console.log(start_index, guest_index);
    running_invoice = all_running_invoices[invoice_index];
    let guest_position = start_index + guest_index;
    console.log('guest position',guest_position);
    running_invoice.invoice_items.splice(guest_position,end_index);

    /*running_invoice.invoice_items.forEach(each=>{
        each.guest_items.forEach(item=>{
            if(item.name===`Room ${room_number}`){
                //Do something here
                each = null;
            }
        });
    });*/

    console.log('after removing a guest', running_invoice);
}

function bind_user_id_to_running_invoice(guest_id, guest_position){
    if(running_invoice.invoice_items[guest_position].guest_id==='guest_id_before_creation')
        running_invoice.invoice_items[guest_position].guest_id=guest_id;
}