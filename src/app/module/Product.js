const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    ticker_value: { type: String, required: true },
    number_of_days: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", Product);
