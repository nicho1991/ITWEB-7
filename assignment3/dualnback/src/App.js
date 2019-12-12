import "./App.css";
import Login from "./login/login";
import Dualnback from "./game/Dualnback";
import Highscores from './highscore/highscore';

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Switch>

        <Route path="/game" component={Dualnback} />
        <Route path="/highscores" component={Highscores} />
        <Route path="/" component={Login} />

      </Switch>
    </BrowserRouter>

    /*     <React.Fragment>
    <Login/>  
    <DuaDualnback/> 
   </React.Fragment> */
  );
}


export default App;
