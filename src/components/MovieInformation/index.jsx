import React, { useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import {
  useGetMovieQuery,
  useGetRecomendationsQuery,
} from "../../services/TMDB";
import { useEffect } from "react";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import MovieList from "../MovieList";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetMovieQuery(id);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const isMovieFav = true;
  const isMovieWashlist = true;

  const { data: recomendationData, isFetching: recomendationDataIsFetching } =
    useGetRecomendationsQuery({ list: "/recommendations", movie_id: id });

  const dispatch = useDispatch();

  console.log(recomendationData);

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
        <Link to="/">Something has gone wrong</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpace}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt=""
        />
      </Grid>
      <Grid item container direction={"column"} lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpace}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min /{" "}
            {data?.spoken_languages.length > 0
              ? data?.spoken_languages[0].name
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={i}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography gutterBottom style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (char, i) =>
                  char.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${char.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${char.profile_path}`}
                        alt={char.name}
                      />
                      <Typography color="textPrimary">{char.name}</Typography>
                      <Typography color="textSecondary">
                        {char.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outline">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://www.imdb.com/title/" + data.imdb_id}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={() => {}}
                  endIcon={
                    isMovieFav ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFav ? "UNFAVOURITE" : "FAVOURITE"}{" "}
                </Button>
                <Button
                  onClick={() => {}}
                  endIcon={isMovieWashlist ? <Remove /> : <PlusOne />}
                >
                  WashList
                </Button>
                <Button
                  style={{ textDecoration: "none" }}
                  endIcon={<ArrowBack />}
                  sx={{ border: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop={"5rem"} width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recomendationData ? (
          <MovieList movies={recomendationData} numberOfMovies={12} />
        ) : (
          <Box>Nothing was found </Box>
        )}
      </Box>
      {console.log("DATA ", data?.videos?.results[0].key)}

      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.videos}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoPlay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
