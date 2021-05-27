const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_guests_invoice_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: String
    },
    property_id: {
        type: String
    },
    date_created: {
        type: String
    },
    date_checkedout: {
        type: String
    },
    bookings: {
        type: Array
    }, //this will make it easy to find invoice document
    invoice_items: {
        type: Array
    }
});

/*{
    hotel_brand_id: "",
    bookings: [], //this will make it easy to find invoice document
    invoice_items:  [
        {
            guest_id: "",
            booking_id: "", //this will make it easy to associate guest with booking
            guest_items: [
                {
                    name: "",
                    price: 0,
                    quantity: 0,
                    total: this.price * this.quantity
                }
            ]
            
        }
    ]
}
*/

module.exports = new mongoose.model("cheap_hotel_guests_invoice", cheap_hotel_guests_invoice_schema);