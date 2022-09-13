import React from "react";

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
import { Language, Movie as MovieIcon, Theaters } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMDB";
import { useEffect } from "react";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import useStyles from "./styles";
import { useDispatch } from "react-redux";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetMovieQuery(id);
  const classes = useStyles();

  const dispatch = useDispatch();

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
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
