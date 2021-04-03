const { mongo } = require("mongoose");

const mongoose = require("mongoose");
require("mongoose-type-url");

const cheap_hotel_rooms_schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        reqiured: true,
        index: true
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'each_cheap_building'
    }

});



const cheap_hotel_rooms = mongoose.model("cheap_hotel_rooms", cheap_hotel_rooms_schema);


module.exports = cheap_hotel_rooms;