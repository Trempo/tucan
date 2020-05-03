const mongoose = require("mongoose");

//Schema setup para articulos
const articleSchema = new mongoose.Schema({
    title: String,
    source: String,
    url: String,
    imageurl: String,
    description: String
});

module.exports = mongoose.model("Article", articleSchema);