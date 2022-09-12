import React from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import Movie from "../Movie";

const MovieList = ({ movies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      {movies &&
        movies.results.map((movie, index) => (
          <Movie key={index} movie={movie} index={index} />
        ))}
    </Grid>
  );
};

export default MovieList;
