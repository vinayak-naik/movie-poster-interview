import { Box, Grid } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import style from "./guest.module.scss";
import axios from "axios";

const GuestComponent = () => {
    const [movies, setMovies] = useState([])
  const history = useHistory();
  const routeHandler = () => history.replace("/login");

  useEffect(() => {
      const getPoster=async()=>{
        const baseURL="http://localhost:7000/api/movies/"
        await axios.get(baseURL).then((response) => {
            setMovies(response.data);
          });
      }
      getPoster()
  }, [])
  console.log(movies)
  return (
    <div className={style.container}>
      <Navbar route={routeHandler} goto="Login" />
      <Grid className={style.body} container spacing={2}>
          {movies && movies.map((item, k)=>(
              
                <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
                    
                <Box className={style.cardContainer}>
                    <Box className={style.imageContainer}>

                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}></img>
                    <Box  className={style.text}>
                        <h2>{item.title}</h2>
                        <h3>{item.release_date}</h3>
                        <h3>{item.vote_average}</h3>
                        <p>{item.overview}</p>
                        </Box>
                    </Box>
                </Box>
              </Grid>
          ))}
        
      </Grid>
    </div>
  );
};

export default GuestComponent;
