import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
require("dotenv").config();

const TMDBAPI = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    //  Get Genres
    getGenres: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${TMDBAPI}`;
      },
    }),
    //   Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `search/movie/?query=${searchQuery}&api_key=${TMDBAPI}&page=${page}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?api_key=${TMDBAPI}&page=${page}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&api_key=${TMDBAPI}&page=${page}`;
        }
        return `movie/popular?api_key=${TMDBAPI}&page=${page}`;
      },
    }),
  }),
});
export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;