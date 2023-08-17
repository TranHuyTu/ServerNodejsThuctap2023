const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    // _id: Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String },
    password: { type: String },
    salt: { type: String, default: "wolf" },
});

module.exports = mongoose.model("users", User);
