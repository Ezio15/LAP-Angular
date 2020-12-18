import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiServiceService} from "../api-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService:ApiServiceService) { 
    console.log("login...");
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      email: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    console.log(loginPayload);
    this.apiService.login(loginPayload).subscribe(data => {
      debugger;
      if(data.message == "success") {
        console.log("success..");
        window.localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }


}
