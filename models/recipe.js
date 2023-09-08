const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: false
    },
    ingredients: {
        type: Array,
        required: true, 
        "default" : []
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Recipe", recipeSchema);
