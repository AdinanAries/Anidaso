const mongoose = require("mongoose");
require("mongoose-type-url");

let signup_user_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        reqiured: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("User", signup_user_schema);