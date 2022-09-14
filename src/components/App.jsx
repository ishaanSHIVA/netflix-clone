import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";

import { MovieInformation, Actor, Movies, Navbar, Profile } from "./";

import useStyles from "./styles.js";
import useAlan from "./Alan";

//  / -> root -> all movies
// /awei -> movie information

const App = () => {
  const classes = useStyles();
  const alanBtn = useRef();
  useAlan();
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
            <Actor></Actor>
          </Route>
          <Route exact path="/profile/:id">
            <Profile></Profile>
          </Route>
        </Switch>
      </main>
      <div ref={alanBtn}></div>
    </div>
  );
};

export default App;
