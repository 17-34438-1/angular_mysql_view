import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../service/AccountSetting/change-password/change-password.service';
import * as shajs from 'sha.js'; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:any
  userName:any="";
  currentPassword:any="";
  newPassword:any="";
  confirmPassword:any="";
  resultList:any;
  message:any="";
  ipAddress:any="";
  



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private changePasswordService:ChangePasswordService
  ) { 
    this.changePasswordForm=this.formBuilder.group({});
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
      this.userName=localStorage.getItem('loginId');
      this.changePasswordService.getIpAddress().subscribe((res:any)=>{
   
       
        this.ipAddress=res.ip;
      
      
      console.log("ip: "+this.ipAddress);
    });
      
    }
  }
  onSubmit(event:any):any{
   
    this.currentPassword=event.currentPassword.value;
    this.newPassword=event.newPassword.value;
    this.confirmPassword=event.confirmPassword.value;
    if(this.userName!="" && this.currentPassword!="" && this.newPassword!="" && this.confirmPassword!=""){
      var sha1CurrentPassword=shajs('sha1').update(this.currentPassword).digest('hex');
      var sha1NewPassword = shajs('sha1').update(this.newPassword).digest('hex');
      var sha1ConfirmPassword=shajs('sha1').update(this.confirmPassword).digest('hex');
     
      this.changePasswordService.changePassword(this.userName,sha1CurrentPassword,sha1NewPassword,sha1ConfirmPassword,this.ipAddress,this.newPassword).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.message=res.message;
        }
      })

    }
    else{
      if(this.userName==""){
      
          // console.log("### User logged out already ### ");
          this.router.navigate(['/login']);
          this.toastr.error('User Name is Empty', 'Error',{
            // timeOut:5000,
            disableTimeOut: true,
            tapToDismiss: false,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-center-center',
            closeButton:true
          });
         }
         else if(this.currentPassword==""){
          this.toastr.error('Current Password is Empty', 'Error',{
            // timeOut:5000,
            disableTimeOut: true,
            tapToDismiss: false,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-center-center',
            closeButton:true
          });

         }
         else if(this.newPassword==""){
          this.toastr.error('New Password is Empty', 'Error',{
            // timeOut:5000,
            disableTimeOut: true,
            tapToDismiss: false,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-center-center',
            closeButton:true
          });

         }
         else if(this.confirmPassword==""){
          this.toastr.error('Confirm Password is Empty', 'Error',{
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
