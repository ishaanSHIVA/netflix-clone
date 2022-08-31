import React from 'react'
import { CssBaseline } from '@mui/material'
import { Route,Switch } from 'react-router-dom'

//  / -> root -> all movies
// /awei -> movie information


const App = () => {
  return (
    <div>
        <CssBaseline />
        <main>
            <Switch>
                <Route exact path="/movies/:id" >
                <h1>Movie Info</h1>
                </Route>
                <Route exact path="/actors/:id" >
                <h1>Actors</h1>
                </Route>
                <Route path="/" exact >
                <h1>Home</h1>
                </Route>
                <Route path="/movies" exact >
                <h1>Movies</h1>
                </Route>
            </Switch>
        </main>
    </div>
  )
}

export default App