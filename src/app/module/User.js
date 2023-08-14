const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    // _id: Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String },
    password: { type: String },
});

module.exports = mongoose.model("users", User);
