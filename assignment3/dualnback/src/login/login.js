import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }

 

 handleClick(e) {
  e.preventDefault();
   fetch("http://localhost:4000/login", {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.username,
      password: this.state.password
    })
   }).then(res => {
     if (res.ok) {
 
       res.json().then(resu => {
    
         localStorage.setItem('currentUser', resu.token);
       })
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
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
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
export default Login;