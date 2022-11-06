const mongoose = require("mongoose");
require("mongoose-type-url");

const cheap_hotel_QOS_scores_schema = mongoose.Schema({
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    location: {
        type: Number
    },
    value: {
        type: Number
    },
    service: {
        type: Number
    },
    amenity: {
        type: Number
    },
    hygiene: {
        type: Number
    },
    byBuilding: {
        type: Array
    },
    overall: {
        type: Number
    }
});

module.exports = new mongoose.model("cheap_hotel_QOS_scores", cheap_hotel_QOS_scores_schema);