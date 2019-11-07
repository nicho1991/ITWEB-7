import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupDTO } from 'src/app/shared/signupDTO';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Login: FormGroup;
  public username: string;
  public password: string;
  constructor(private formBuilder: FormBuilder, private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.Login = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(post) {
    const DTO = new SignupDTO();
    DTO.email = post.email;
    DTO.password = post.password;
    this.api.Login(DTO).subscribe(res => {
      if ( res ) {
        const token = JSON.parse(res);
        localStorage.setItem('currentUser', token.token);
        this.router.navigate(['workout-programs-list']);
      }
    });
  }

}


