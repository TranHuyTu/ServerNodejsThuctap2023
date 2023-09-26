const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        // _id: Schema.Types.ObjectId,
        img_link: { type: String, required: true },
        audio_link: { type: String, required: true },
        user_id: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("products", Product);
