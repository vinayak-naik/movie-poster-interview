import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  }
});

const Movie = mongoose.model("favorite", movieSchema);

export default Movie;
