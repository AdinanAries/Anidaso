const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_extra_services_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    service_name: {
        type: String
    },
    service_description: {
        type: String
    }

});

module.exports = new mongoose.model("cheap_hotel_extra_services", cheap_hotel_extra_services_schema);