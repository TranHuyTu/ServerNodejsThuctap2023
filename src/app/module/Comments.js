const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema({
    plot: { type: String },
    genres: [String],
    runtime: Number,
    cast: [String],
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: Object,
    lastupdated: String,
    year: Number,
    imdb: Object,
    countries: [String],
    type: {
        type: String,
        default: "movie",
    },
    tomatoes: Object,
    num_mflix_comments: Number,
});

module.exports = mongoose.model("movies", Comments);
