import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../service/AccountSetting/change-password/change-password.service';


@Component({
  selector: 'app-verify-cell-number',
  templateUrl: './verify-cell-number.component.html',
  styleUrls: ['./verify-cell-number.component.css']
})
export class VerifyCellNumberComponent implements OnInit {
  verifyOtpForm:any;
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


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private changePasswordService:ChangePasswordService
  ) { 
    this.verifyOtpForm=this.formBuilder.group({});
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
      this.changePasswordService.getPhoneNumberAndUpdateOtp(this.loginId).subscribe(result=>{
        this.resultList=result;
        
        for(let res of this.resultList){
          this.phoneNumber=res.phoneNumber;
          if(this.phoneNumber!=null || this.phoneNumber!=""){
            this.otpStatus=true;
          }
          else{
            this.phoneNumberStatus=true;
          }
          console.log(this.phoneNumber);
        }
      });

    }
  }
  onSubmit(event:any):any{
   // this.phoneNumber=event.phoneNumber.value;
    this.otpCode=event.otpCode.value;
    if(this.otpCode!="" && this.phoneNumber!=""){
      this.changePasswordService.verifyOtp(this.phoneNumber,this.otpCode).subscribe(result=>{
        this.verifyList=result;
        for(let res of this.verifyList){
          this.verifyMessage=res.message;
        }
        if(this.verifyMessage!="verified"){
          this.verifyStatus=true;
          
            
        }
        else{
          this.verifyStatus=false;
          this.router.navigate(['accountSetting/ChangePassword/form']);
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
