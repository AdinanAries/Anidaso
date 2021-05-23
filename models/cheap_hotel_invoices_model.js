const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_invoices_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    bookings: {
        type: Array //array of booking_ids
    },
    items: {
        type: Array  //array of item objects described below
    }
    //item object
    /*
        {
            guest_id: "",
            items: [
                {
                    name: "", //from services, facilities used, inventory and room
                    price: 0,
                    quantity: 0, //quantity of items used
                    total: price * quantity
                }
            ]
            
        }
    */
});

module.exports = new mongoose.model("cheap_hotel_invoices", cheap_hotel_invoices_schema);