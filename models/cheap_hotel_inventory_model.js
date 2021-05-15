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
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    item_name: {
        type: String
    },
    unit_price: {
        type: Number
    },
    stock_quantity: {
        type: Number
    }

});

module.exports = new mongoose.model("cheap_hotel_inventory", cheap_hotel_inventory_schema);