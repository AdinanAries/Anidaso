const mongoose = require("mongoose");
require("mongoose-type-url");

let booked_flights_log_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    booking_data: {
        type: Object
    }
});

module.exports = new mongoose.model("booked_flights_log", booked_flights_log_schema);