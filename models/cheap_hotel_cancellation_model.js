const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_cancellation_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    date_requested: {
        type: String
    },
    date_granted: {
        type: String
    },
    was_granted: {
        type: Boolean
    }

});

module.exports = new mongoose.model("cheap_hotel_booking_cancellations", cheap_hotel_cancellation_schema);