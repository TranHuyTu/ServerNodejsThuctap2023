const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
    // _id: Schema.Types.ObjectId,
    // adult: { type: Boolean },
    // backdrop_path: { type: String },
    // genre_ids: { type: Array, of: Number },
    // id: { type: Number },
    // original_language: { type: String },
    // original_title: { type: String },
    // overview: { type: String },
    // popularity: { type: Number },
    // poster_path: { type: String },
    // release_date: { type: Date },
    // title: { type: String },
    // video: { type: Boolean },
    // vote_average: { typeof: Number },
    // vote_count: { typeof: Number },
});

module.exports = mongoose.model("listmovie", Movie);