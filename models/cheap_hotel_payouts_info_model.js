const mongoose = require("mongoose");
require("mongoose-type-url");

let payouts_schema = mongoose.Schema({
    hotel_brand_id: {
        type: String,
        required: true,
        index: true
    },
    card: {
        type: Object
    },
    current: {
        type: Object
    },
    past: {
        type: Array
    },
    cycle: {
        type: String
    }
});

module.exports = new mongoose.model("cheap_hotel_payouts", payouts_schema);