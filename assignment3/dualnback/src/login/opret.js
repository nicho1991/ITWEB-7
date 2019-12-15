import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Opret extends Component {
constructor(props){
  super(props);
  this.state={
  name:'',
  email:'',
  password:''
  }
 }

 nextPath(path) {
    this.props.history.push(path);
  }

 

 handleClick(e) {
  e.preventDefault();
   fetch("http://localhost:4000/signup", {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    name: this.state.username,
    email: this.state.username,
    password: this.state.password
    })
   }).then(res => {
     if (res.ok) {
        this.props.history.push("/Login")
     }
   })

/*   this.api.Login(DTO).subscribe(res => {
    if ( res ) {
      const token = JSON.parse(res);
      localStorage.setItem('currentUser', token.token);
      this.router.navigate(['workout-programs-list']);
    }
  });
 */

 }
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Opret Bruger"
           ><Button color="inherit" onClick={() => this.nextPath('/Login') }>Login</Button>
            </AppBar>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
            <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Opret;