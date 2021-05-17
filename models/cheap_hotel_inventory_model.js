const mongoose = require("mongoose");
require("mongoose-type-url");

let cheap_hotel_inventory_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    hotel_brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    items: {
        type: Array
    }
    /*name: {
        type: String
    },
    unit_price: {
        type: Number
    },
    category: {
        type: String
    },
    stock_quantity: {
        type: Number
    }*/

});

module.exports = new mongoose.model("cheap_hotel_inventory", cheap_hotel_inventory_schema);