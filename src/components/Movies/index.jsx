import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.genreOrCategoryReducer
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  console.log(genreIdOrCategoryName);

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress size="4rem"></CircularProgress>
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt="20px"
      >
        <Typography variant="h4">No movies that match</Typography>
      </Box>
    );
  }

  if (error) {
    return "An error occurred";
  }

  console.log(data);
  return (
    <div className="">
      <MovieList movies={data ? data : null}></MovieList>
    </div>
  );
};

export default Movies;
