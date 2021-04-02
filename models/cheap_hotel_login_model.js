const mongoose = require("mongoose");
require("mongoose-type-url");
const passportLocalMongoose = require('passport-local-mongoose');

const cheap_hotel_login_schema = mongoose.Schema({
    id: {

        type: mongoose.Schema.Types.ObjectId, 
        ref: 'cheap_hotel'
    },
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
        index: true,
    }
});

cheap_hotel_login_schema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("cheap_hotel_login", cheap_hotel_login_schema, "cheap_hotel_login");