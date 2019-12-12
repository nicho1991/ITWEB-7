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
    serverMessage: '',

  };

  console.log('test')
  const connection = new WebSocket('ws://localhost:8080');

  connection.onopen = () => {
    console.log('open')
  }

  connection.onmessage = e => {
    console.log(e.data)
    this.setState({serverMessage: e.data})
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
          <p>{this.state.serverMessage}</p>
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