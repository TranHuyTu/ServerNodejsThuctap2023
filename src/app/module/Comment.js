const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
    // _id: Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String },
    movie_id: { type: mongoose.Types.ObjectId },
    text: { type: String },
    date: { type: Date },
});

module.exports = mongoose.model("comments", Comment);
