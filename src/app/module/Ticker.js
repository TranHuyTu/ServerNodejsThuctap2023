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
      type: Array,
      required: true,
      unique: true,
    },
    //ngành
    industry: {
      type: Array,
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
    // Trạng thái: Công ty đang hoạt động
    status: {
      type: String,
      required: true,
    },

    // Mã số thuế: 0400100707
    tax_id: {
      type: Number,
      required: true,
    },
    // GPTL:Ngày cấp: 13/02/1995
    GPTL: {
      type: Number,
    },
    dateGPTL: {
      type: Date,
      required: true,
    },

    // GPKD: 0400100707 Ngày cấp: 22/12/2014
    GPKD: {
      type: Number,
      required: true,
    },
    dateGPKD: {
      type: Date,
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
