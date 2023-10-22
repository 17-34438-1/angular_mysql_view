import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TwoStepVerificationService } from '../service/AccountSetting/two-step-verification/two-step-verification.service';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {
  changeTwoStepSettingForm:any
  userName:any="";
  twoStep:any="";
  phoneNo:any="";
  resultList:any;
  message:any="";
  ipAddress:any="";
  phoneNumber:any="";
  twoStepState:any=0;
  twoStepfound:Boolean=false;
  twoStepNotfound:Boolean=false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private twoStepVerificationService:TwoStepVerificationService
  ) { 
    this.changeTwoStepSettingForm=this.formBuilder.group({});
    this.phoneNumber=localStorage.getItem("twoStepVerificationPhoneNumber");
    this.twoStepState=localStorage.getItem("twoStepVerificationTwoStepState");
   
  }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return;
    }
    else{
      if(this.twoStepState=='1'){

        this.twoStepfound=true;
        this.twoStepNotfound=false;
      }
      else{
        this.twoStepNotfound=true;
        this.twoStepfound=false;
      }

      this.userName=localStorage.getItem('loginId');
      this.twoStepVerificationService.getIpAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
       });

      
      
    }
  }

  onTwoStepChange(value:any){
   
   /* if(value=='1'){
      this.twoStepfound=true;
      this.twoStepNotfound=false;

    }
    else if(value=='0'){
      this.twoStepfound=false;
      this.twoStepNotfound=true;
    }
    else{
      this.twoStepfound=false;
      this.twoStepNotfound=false;
    }*/

  }
  onSubmit(event:any):any{
    this.userName=event.userName.value;
    this.twoStep=event.twoStep.value;
    this.phoneNumber=event.phoneNo.value;
    console.log("size "+this.phoneNumber.length)
    if(this.userName!="" && this.twoStep!="" && this.phoneNumber!=""){
      if(this.phoneNumber.length==11){
        this.twoStepVerificationService.updateTwoStepSettingOrPhoneNumber(this.phoneNumber,this.twoStep,this.userName).subscribe(result=>{
          this.resultList=result;
          for(let res of this.resultList){
            if(res.message=='Successful'){
              if(res.twoStepState==1){
                localStorage.setItem("twoStepVerificationTwoStepState",'1');
              }
              else{
                localStorage.setItem("twoStepVerificationTwoStepState",'0');
              }

            }
          }
        })

      }
      else{
        this.toastr.error('Phone Number must be 11 Digits.', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }

    }
    else{
      if(this.userName==""){  
        this.toastr.error('User Name is Empty.', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });

      }
      else if(this.twoStep==""){
        this.toastr.error('Select Two Step Verification Setting (Yes or No)', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }
      else if(this.phoneNumber==""){
        this.toastr.error('Phone Number is Empty.', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }
     

    }

  }

}
