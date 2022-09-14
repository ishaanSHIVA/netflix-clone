import { ArrowBack } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import MovieList from "../MovieList";

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery({ id });
  const page = 1;
  const { data: actorMovies } = useGetMoviesByActorIdQuery({ id, page });
  const history = useHistory();

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size="8rem"></CircularProgress>
      </Box>
    );
  }
  if (error) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
        ></Button>
      </Box>
    );
  }
  console.log(actorMovies);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            className={classes.image}
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born :- {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data?.biography || "Sorry, no biography available!"}
          </Typography>
          <Box marginTop="2rem" display={"flex"} justifyContent="space-around">
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              target={"_blank"}
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies && <MovieList movies={actorMovies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;
