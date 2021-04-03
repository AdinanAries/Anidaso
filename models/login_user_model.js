const mongoose = require("mongoose");
require("mongoose-type-url");
const passportLocalMongoose = require('passport-local-mongoose');

const user_login_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
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

user_login_schema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("login_user", user_login_schema, "user_login");