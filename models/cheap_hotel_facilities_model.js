const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_facilities_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    facilities: {
        type: Array
    }
    /*name: {
        type: String
    },
    description: {
        type: String
    },
    cost_of_usage: {
        type: Number
    }*/

});

module.exports = new mongoose.model("cheap_hotel_facilities", cheap_hotel_facilities_schema);