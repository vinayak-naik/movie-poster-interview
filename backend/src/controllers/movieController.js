import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel";
import fetch from "node-fetch";

const getPopular = asyncHandler(async (req, res) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e216fcdcad89599ea2273a97517fcb41",
   
  );
  const data = await response.json();
  res.json(data.results);
});

const getLatest = asyncHandler(async (req, res) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=e216fcdcad89599ea2273a97517fcb41",
   
  );
  const data = await response.json();
  res.json(data.results);
});

const getFav = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.send(movies);
});

const createFav = asyncHandler(async (req, res) => {
  const { title, poster_path, release_date, vote_average, overview } = req.body;
  const movieExists = await Movie.findOne({ title });

  if (movieExists) {
    res.status(400);
    throw new Error("movie already exists");
  }

  const movie = await Movie.create({
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  });

  if (movie) {
    res.status(201).json({
      _id: movie._id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
    });
  } else {
    res.status(400);
    throw new Error("Invalid movie data");
  }
});

export { getPopular, getFav, getLatest, createFav };
