const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_guests_invoice_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    hotel_brand_id: {
        type: String
    },
    
});

module.exports = new mongoose.model("cheap_hotel_guests_invoice", cheap_hotel_guests_invoice_schema);