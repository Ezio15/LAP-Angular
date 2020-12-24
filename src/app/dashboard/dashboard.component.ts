import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uploadCityForm!: FormGroup;
  uploadDocForm!: FormGroup;
 invalidSubmit: boolean = false;

  
  constructor(private formBuilder: FormBuilder,  private apiService:ApiServiceService) { 
    console.log("Register...");
  }


  ngOnInit(): void {
   
    this.uploadCityForm = this.formBuilder.group({
      uploadCity: ['']
    });


    this.uploadDocForm = this.formBuilder.group({
      uploadDoc: ['']
    });
   
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(this.uploadCityForm!== undefined){
      this.uploadCityForm.get('uploadCity')!.setValue(file);}
    }
  }

  onDocFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file-"+file);
      if(this.uploadDocForm!== undefined){
      this.uploadDocForm.get('uploadDoc')!.setValue(file);}
    }
  }

  onCitySubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadCityForm.get('uploadCity')!.value);

    this.apiService.uploadCity(formData).subscribe(data => {
      debugger;
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        // this.router.navigate(['list-user']);
      }else {
        // this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

  onDocSubmit() {

    if (this.uploadDocForm.invalid) {
      return;
    }
    console.log("calling doc api..");
    const formData = new FormData();
    formData.append('file', this.uploadDocForm.get('uploadDoc')!.value);
   
    this.apiService.uploadDoc(formData).subscribe(data => {
      debugger;
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        // this.router.navigate(['list-user']);
      }else {
        // this.invalidLogin = true;
        alert(data.message);
      }
    });
  }
}
