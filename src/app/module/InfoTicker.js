const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticker = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    ticker_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user_ids: {
      type: Array,
      of: Number,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("infotickers", Ticker);
