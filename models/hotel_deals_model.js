const mongoose = require("mongoose");

const hotels_deals_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        reqiured: true
    },
    hotel_name: {
        type: String,
        required: true
    },
    hotel_rating: {
        type: Number,
        required: true
    },
    hotel_reviews: {
        type: Array
    },
    hotel_description: {
        type: String,
    },
    hotel_location: {
        type: String,
    },
    hotel_mobile: {
        type: String
    },
    hotel_email: {
        type: String
    },
    hotel_amenities: {
        type: Array
    },
    hotel_number_of_reviews: {
        type: Number
    },
    hotel_pictures: {
        type: Array
    },
    deal_checkin_date: {
        type: Date,
        required: true
    },
    deal_checkout_date: {
        type: Date,
        required: true
    },
    deal_description: {
        type: String,
        required: true
    },
    deal_current_discounted_price: {
        type: Number,
        required: true
    },
    deal_original_price: {
        type: Number,
        required: true
    },
    deal_room_information: {
        type: Object,
        required: true
    },
    deal_number_of_rooms: {
        type: Number
    },
    deal_number_of_guests: {
        type: Number
    },
    deal_tax_amount: {
        type: Number
    }
});

module.exports = new mongoose.model("hotel_deals", hotels_deals_schema, "hotel_deals")