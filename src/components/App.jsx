import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";

import { MovieInformation, Actors, Movies, Navbar, Profile } from "./";

import useStyles from "./styles.js";

//  / -> root -> all movies
// /awei -> movie information

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline></CssBaseline>
      <Navbar></Navbar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/movie/:id">
            <MovieInformation></MovieInformation>
          </Route>
          <Route exact path="/actors/:id">
            <Actors></Actors>
          </Route>
          <Route exact path="/profile/:id">
            <Profile></Profile>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
