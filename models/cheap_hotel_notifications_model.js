const mongoose = require("mongoose");
require("mongoose-type-url");

let hotel_notifications_schema = mongoose.Schema({
    hotel_brand_id: {
        type: String,
        required: true,
        index: true
    },
    notifications: {
        type: Array
    }
});

module.exports = new mongoose.model("cheap_hotel_notifications", hotel_notifications_schema);