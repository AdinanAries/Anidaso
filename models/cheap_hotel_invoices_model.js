const mongoose = require("mongoose");
require("mongoose-type-url");

let signup_user_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    }
});

module.exports = new mongoose.model("cheap_hotel_invoices", signup_user_schema);