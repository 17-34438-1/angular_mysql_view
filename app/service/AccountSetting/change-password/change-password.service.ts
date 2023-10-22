import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient 
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getPhoneNumberAndUpdateOtp(loginId:any){
  
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/CellNumberAndUpdateOtpForChangePassword/'+loginId);
   }
   verifyOtp(phoneNumber:any,otp:any){
    if(phoneNumber== ""|| phoneNumber==null){
      phoneNumber="empty";
     }
    if(otp== ""|| otp==null){
      otp="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/verifyOtpForChangePassword/'+phoneNumber+"/"+otp);
  }
  changePassword(userName:any,currentPassword:any,newPassword:any,confirmPassword:any,ipAddress:any,password:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/UpdatePassword/'+userName+"/"+currentPassword+"/"+newPassword+"/"+confirmPassword+"/"+ipAddress+"/"+password)

  }
  getIpAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }


}
