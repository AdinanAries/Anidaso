const mongoose = require("mongoose");
require("mongoose-type-url");

const cheap_hotel_property_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cheap_hotel"
    },
    full_location_address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    zipcode: {
        type: String
    },
    street_address: {
        type: String
    },
    town: {
        type: String
    },
    description: {
        type: String
    },
    amenities: {
        type: Array
    }
});

module.exports = new mongoose.model("cheap_hotel_property", cheap_hotel_property_schema, "cheap_hotel_property");