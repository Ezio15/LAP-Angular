import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiServiceService} from "../api-service.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm!: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService:ApiServiceService) { 
    console.log("Register...");
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerPayload = {
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      cnfmPassword: this.registerForm.controls.cnfmPassword.value,
      name: this.registerForm.controls.name.value
    }
    console.log(registerPayload);
    this.apiService.register(registerPayload).subscribe(data => {
      debugger;
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }
  

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
      cnfmPassword: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

}
