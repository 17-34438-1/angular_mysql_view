import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwoStepVerificationService {
  igmMisIp : string;
  igmMisPort : string;


  constructor(
    private httpClient: HttpClient 
  ) { 
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
  }
  getPhoneNumberAndUpdateOtp(loginId:any){
     return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/CellNumberAndUpdateOtpForTwoStepVerification/'+loginId);
   }

   verifyOtp(phoneNumber:any,otp:any,loginId:any){
    if(phoneNumber== ""|| phoneNumber==null){
      phoneNumber="empty";
     }
    if(otp== ""|| otp==null){
      otp="empty";
    }
    if(loginId== ""|| loginId==null){
      loginId="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/VerifyOtpForTwoStepVerification/'+phoneNumber+"/"+otp+"/"+loginId);
  }
  getIpAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
  updateTwoStepSettingOrPhoneNumber(phoneNumber:any,twoStepState:any,loginId:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/AccountSetting/UpdateTwoStepSettingOrPhoneNumber/'+phoneNumber+"/"+twoStepState+"/"+loginId);
  }

}
