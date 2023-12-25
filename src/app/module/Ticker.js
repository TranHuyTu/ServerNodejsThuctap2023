const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticker = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    //ngành
    industry: {
      type: String,
      required: true,
    },
    //giá
    currentPrice: {
      type: Number,
      required: true,
    },
    // Điện thoại: (84.236) 365 5886
    phoneNumber: {
      type: String,
      required: true,
    },
    // Fax: (84.236) 365 5887
    fax: {
      type: String,
      required: true,
    },
    // Email:	aac@dng.vnn.vn
    email: {
      type: String,
      required: true,
    },
    // Website
    website: {
      type: String,
      required: true,
    },
    //Người đại diện
    legalRepresentation: {
      type: String,
      required: true,
    },
    //Thông tin chi tiết doanh nghiệp
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tickers", Ticker);
