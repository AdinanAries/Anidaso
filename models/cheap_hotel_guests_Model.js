const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_guests_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    profile_pic: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    guest_type: {
        type: String
    },
    age: {
        type: Number
    },
    DOB: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    price_paid: {
        type: Number
    },
    status: {
        type: String //unbooked, staying, not_staying, booked
    },
    assigned_room: {
        type: Object //if guests status is set to staying - {booking_id: id, room_id: id, room_number: number}
    },
    home_address: {
        type: Object
    }

});

module.exports = new mongoose.model("cheap_hotel_guests", cheap_hotel_guests_schema);