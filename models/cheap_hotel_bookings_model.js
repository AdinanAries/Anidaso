const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_bookings_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    checkin_date: {
        type: String
    },
    checkout_date: {
        type: String
    },
    checkin_time: {
        type: String
    },
    checkout_time: {
        type: String
    },
    guests: {
      type: Array
    }
});

module.exports = new mongoose.model("cheap_hotel_bookings", cheap_hotel_bookings_schema);