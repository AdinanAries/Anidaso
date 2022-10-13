const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_bookings_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    booking_status: {
        type: String //staying, before-stay, after-stay, no-show, cancelled
    },
    booking_date: {
        type: String,
        required: true
    },
    rooms: {
        type: Array
    },
    /*full_property_location: {
        type: String
    },*/
    checkin_date: {
        type: String
    },
    checkout_date: {
        type: String
    },
    all_dates_of_occupancy: {
        type: Array
    },
    checkin_time: {
        type: String
    },
    checkout_time: {
        type: String
    },
    price_paid: {
        type: Number
    },
    guests: {
      type: Array
    },
    guest_contact: {
        type: Object
    }
});

module.exports = new mongoose.model("cheap_hotel_bookings", cheap_hotel_bookings_schema);