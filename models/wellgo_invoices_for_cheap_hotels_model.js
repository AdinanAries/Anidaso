const mongoose = require("mongoose");
require("mongoose-type-url");

let wellgo_invoices_for_cheap_hotels_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hotel_brand_id: {
        type: String,
        required: true
    },
    date_created: {
        type: String
    },
    invoice_items: {
        type: Array
    },
    status: {
        type: String //paid, unpaid, others...
    },
    due: {
        type: String
    },
    card: {
        type: Object
    }
});


module.exports = new mongoose.model("wellgo_invoices_for_cheap_hotels", wellgo_invoices_for_cheap_hotels_schema);