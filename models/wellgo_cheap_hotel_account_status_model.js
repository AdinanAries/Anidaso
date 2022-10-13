const mongoose = require("mongoose");
require("mongoose-type-url");

let wellgo_cheap_hotel_account_status_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    hotel_brand_id: {
        type: String,
        required: true
    },
    date_created: {
        type: String
    },
    account_type: {
        type: String //subscription or other
    },
    current_status: {
        type: String //active or inactive
    },
    payment_cards: {
        type: Array
    },
    current_active_card: {
        type: Object
    }
});


module.exports = new mongoose.model("wellgo_cheap_hotel_account_status", wellgo_cheap_hotel_account_status_schema);