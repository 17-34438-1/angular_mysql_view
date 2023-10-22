import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IgmContainerListService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient 
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getIGMContainerList(rotation:any,searchType:any){
   /* if(phoneNumber== ""|| phoneNumber==null){
      phoneNumber="empty";
     }
    if(otp== ""|| otp==null){
      otp="empty";
    }*/
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/ShahinSpecialReport/IgmContainerListForShahinSpecialReport/'+rotation+"/"+searchType);
  }
}
