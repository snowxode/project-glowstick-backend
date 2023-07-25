const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    signup_date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);