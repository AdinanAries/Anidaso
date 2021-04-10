const mongoose = require("mongoose");
require("mongoose-type-url");

const cheap_hotel_property_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = new mongoose.model("login_user", cheap_hotel_property_schema, "user_login");