import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  LoginGroup: FormGroup;
  titleAlert = 'This field is required';
  creating = false;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // tslint:disable-next-line: max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.LoginGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, this.checkPassword]],
      validate: ''
    });
  }

  setChangeValidate() {
    this.LoginGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.LoginGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least 3 characters';
        } else {
          this.LoginGroup.get('name').setValidators(Validators.required);
        }
        this.LoginGroup.get('name').updateValueAndValidity();
      }
    );
  }

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }



  getErrorEmail() {
    return this.LoginGroup.get('email').hasError('required') ? 'Field is required' :
      this.LoginGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.LoginGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.LoginGroup.get('password').hasError('required')
    ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.LoginGroup.get('password').hasError('requirements')
      ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post) {
    this.creating = true;
    // go to api
  }


}
