import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Highscores extends Component {
constructor(props){
  super(props);

  this.state = {
    highscores: [],

  };

  console.log('test')
  const connection = new WebSocket('ws://localhost:8080');

  connection.onopen = () => {
    console.log('open')
  }

  connection.onmessage = e => {

    // this.setState({serverMessage: e.data})

    var arr = []
    var data = JSON.parse(e.data);
    data.forEach(element => {

      var name = element.name;
      var score = element.score;
      var highscore = {score, name};
      arr.push(highscore);
    });

    this.setState({highscores: arr})
  }
 }
 render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
  
          <AppBar
             title="Highscores"
           />
          <ul>
            {this.state.highscores.map((value , index) => {
              return <li key={index}>name: {value.name} score: {value.score}</li>
            })}
            
          </ul>
          <Link to="/game">game</Link>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Highscores;