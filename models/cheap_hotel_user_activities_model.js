const mongoose = require("mongoose");
require("mongoose-type-url");

let user_activities_schema = mongoose.Schema({
    hotel_brand_id: {
        type: String,
        required: true,
        index: true
    },
    activities: {
        type: Array
    }
});

module.exports = new mongoose.model("cheap_hotel_user_activities", user_activities_schema);