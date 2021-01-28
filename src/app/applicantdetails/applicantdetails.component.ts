import { Component, OnInit , ViewChild,ViewEncapsulation} from '@angular/core';
import {FormControl, FormBuilder,FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common'


export interface Subject {
  name: string;
}



@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ApplicantdetailsComponent implements OnInit   {

  LoanPurpose: any = ['Ready to occupy home', 'Buy under construction home', 'Buy a plot of land','Transfer existing home loan',' Renovate or extend existing property '];
 
  // date = new FormControl(new Date());
  
  //emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  
  invalidLogin: boolean = false;
  datepicker : any;
  registerForm!: FormGroup;
date:any;
 latest_date:any;
  reactiveForm: FormGroup = new FormGroup({
    reactiveRadio: new FormControl(true)
  })

 constructor(private formBuilder: FormBuilder,public datepipe: DatePipe){
  
 
  this.reactiveForm.controls['reactiveRadio'].valueChanges.subscribe((state: any) => {
    console.log(state);
  })
 }
 onSubmit() {
  if (this.registerForm.invalid) {
    return;
  }


  
  if (this.registerForm.invalid) {
    return;
  }
  console.log("date-"+this.date.value)
   this.latest_date =this.datepipe.transform(this.date.value, 'yyyy-MM-dd');
  console.log("converted date-"+this.latest_date)
  
  const applicantPayload = {
    loan: this.registerForm.controls.loan.value,
    loanAmount: this.registerForm.controls.loanAmount.value,
    property: this.registerForm.controls.property.value,
    name: this.registerForm.controls.name.value,
    monthlyIncome: this.registerForm.controls.monthlyIncome.value,
    email: this.registerForm.controls.email.value,
    mobileNo: this.registerForm.controls.mobileNo.value,
    dob: this.latest_date
  }
  console.log(applicantPayload);
  
  // this.apiService.register(registerPayload).subscribe(data => {
  //   debugger;
  //   if(data.status === 200) {
  //     window.localStorage.setItem('token', data.result.token);
  //     this.router.navigate(['list-user']);
  //   }else {
  //     this.invalidLogin = true;
  //     alert(data.message);
  //   }
  // });
}
 
 ngOnInit(){

 
  this.date  =  new  FormControl(new  Date());
  
  this.registerForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required,Validators.email])],
    loanAmount: ['', Validators.required],
    monthlyIncome: ['', Validators.required],
    name: ['', Validators.required],
    mobileNo: ['', Validators.required],
    loan:['', Validators.required],
    property:['', Validators.required],
    
  });

  
 }

 





}
