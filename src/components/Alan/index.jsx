import React, { useContext, useEffect } from "react";

import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { fetchToken } from "../../utils";
import { Logout } from "../Profile";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { searchMovie } from "../../features/currentGenreOrCategory";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    alanBtn({
      key: "7edb97b3ebc648f3747c86bfc6ee35732e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === "search") {
          history.push("/");
          dispatch(searchMovie(query));
        } else if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          Logout();
        }
      },
    });
  }, []);
  return <div>Alan</div>;
};

export default useAlan;
