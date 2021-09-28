import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import style from "./latest.module.scss";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const LatestComponent = () => {
  const [movies, setMovies] = useState([]);
  const [alt, setAlt] = useState("");

  const history = useHistory();
  const routeHandler = () => history.replace("/discover/favorites");
  const routeHandler2 = () => history.replace("/home");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        history.push("/login");
      }
    const getPoster = async () => {
      const baseURL = "http://localhost:7000/api/movies/latest";
      await axios.get(baseURL).then((response) => {
        setMovies(response.data);
      });
    };
    getPoster();
  }, []);

  const addFavorites = async (item) => {
    let cardData={
      title:item.title,
      poster_path:item.poster_path,
      release_date:item.release_date,
      vote_average:item.vote_average,
      overview:item.overview
  }
    const baseURL = "http://localhost:7000/api/movies/fav";
    await axios.post(baseURL,cardData).then((response) => {
      setAlt("Added To Favorites")
      setTimeout(() => {
        setAlt("")
      }, 2000);
    });
  };
  return (
    <div className={style.container}>
      <Navbar
        route={routeHandler}
        route2={routeHandler2}
        goto="Favorites"
        goto2="Home"
      />
      <Box className={style.head}>
        <h1>Latest Movies</h1>
      </Box>
      <Grid className={style.body} container spacing={2}>
        {movies &&
          movies.map((item, k) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
              <Box className={style.cardContainer}>
                <Box className={style.imageContainer}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  ></img>
                  <Box className={style.text}>
                    <h2>{item.title}</h2>
                    <h3>{item.release_date}</h3>
                    <h3>{item.vote_average}</h3>
                    <p>{item.overview}</p>
                    <button  className={style.submitBtn} onClick={()=>addFavorites(item)}>Add To Favorates</button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
      {alt && (
        <Alert className={style.toast} severity="success">
          {alt}
        </Alert>
      )}
    </div>
  );
};
export default LatestComponent;
