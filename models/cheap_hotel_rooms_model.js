const { mongo } = require("mongoose");

const mongoose = require("mongoose");
require("mongoose-type-url");

const cheap_hotel_rooms_schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        reqiured: true,
        index: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'each_cheap_building'
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cheap_hotel'
    },
    closed: {
        type: Boolean
    },
    booked: {
        type: Boolean
    },
    room_type: {
        type: Array
    },
    room_link: {
        type: String
    },
    guest_capacitance: {
          type: Object,
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    amenities: {
        type: Array
    },
    next_available_date: {
        type: Date
    },
    next_available_time: {
        type: String
    },
    cancellation_policy: {
        type: Object
    },
    thumbnail_url: {
        type: String
    },
    cancellation_request: {
        type: Object
    }

});



const cheap_hotel_rooms = mongoose.model("cheap_hotel_rooms", cheap_hotel_rooms_schema);


module.exports = cheap_hotel_rooms;