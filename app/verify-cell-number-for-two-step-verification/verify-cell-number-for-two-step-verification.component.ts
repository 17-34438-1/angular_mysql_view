import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TwoStepVerificationService } from '../service/AccountSetting/two-step-verification/two-step-verification.service';

@Component({
  selector: 'app-verify-cell-number-for-two-step-verification',
  templateUrl: './verify-cell-number-for-two-step-verification.component.html',
  styleUrls: ['./verify-cell-number-for-two-step-verification.component.css']
})
export class VerifyCellNumberForTwoStepVerificationComponent implements OnInit {
  verifyOtpForTwoStepVerificationForm:any;
  preRotation:any="";
  newRotation:any="";
  containers:any="";
  message:any="";
  resultList:any;
  phoneNumber:any="";
  otpCode:any="";
  loginId:any="";
  otpStatus:Boolean=false;
  phoneNumberStatus:Boolean=false;
  verifyList:any;
  verifyStatus:Boolean=false;
  verifyMessage:string="";
  twoStepState:any=0;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private twoStepVerificationService:TwoStepVerificationService

  ) { 
    this.verifyOtpForTwoStepVerificationForm=this.formBuilder.group({});
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
      this.loginId=localStorage.getItem("loginId");
      this.twoStepVerificationService.getPhoneNumberAndUpdateOtp(this.loginId).subscribe(result=>{
        this.resultList=result;
        
        for(let res of this.resultList){
          this.phoneNumber=res.phoneNumber;
          this.twoStepState=res.twoStepState;
          if(this.phoneNumber!=null || this.phoneNumber!=""){
            this.otpStatus=true;
          }
          else{
            this.phoneNumberStatus=true;
          }
         
        }
      });

    }
  }

  onSubmit(event:any):any{
    this.otpCode=event.otpCode.value;
    if(this.otpCode!="" && this.phoneNumber!=""){
      this.twoStepVerificationService.verifyOtp(this.phoneNumber,this.otpCode,this.loginId).subscribe(result=>{
        this.verifyList=result;
        for(let res of this.verifyList){
          this.verifyMessage=res.message;
          this.twoStepState=res.twoStepState;
        }
        if(this.verifyMessage!="verified"){
          this.verifyStatus=true;
        }
        else{
          this.verifyStatus=false;
          localStorage.setItem("twoStepVerificationPhoneNumber",this.phoneNumber);
          localStorage.setItem("twoStepVerificationTwoStepState",this.twoStepState);
           this.router.navigate(['accountSetting/TwoStepVerification/form']);
        }


      });

    }
    else{
      if(this.otpCode==""){
        this.toastr.error('Opt Code is Empty. ', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }
      else{
        this.toastr.error('Phone Number is Empty', 'Error',{
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
