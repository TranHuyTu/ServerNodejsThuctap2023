const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        // _id: Schema.Types.ObjectId,
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        salt: { type: String, default: "wolf", required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("users", User);
