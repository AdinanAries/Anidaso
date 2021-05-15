const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_guests_invoice_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    guest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    items: {
        type: Array
    }

});

/*items structure
{
    id: "", //from inventory
    type: "",
    base_price: "",
    tax: "",

}
*/

module.exports = new mongoose.model("cheap_hotel_guests_invoice", cheap_hotel_guests_invoice_schema);