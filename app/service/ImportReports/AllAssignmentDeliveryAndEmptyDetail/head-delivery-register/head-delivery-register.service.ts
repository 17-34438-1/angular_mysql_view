import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadDeliveryRegisterService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
  }
  getHeadDeliveryRegisterList(date:any,terminal:any,blockName:any,assignType:any){
    if(date==""){
      date="empty";
    }
    else if(terminal==""){
      terminal="empty"
    }
    else if(blockName==""){
      blockName="empty"
    }
    else if(assignType==""){
      assignType="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/HeadDeliveryRegisterList/'+date+"/"+terminal+"/"+blockName+"/"+assignType); 
  }
  getAssignType(terminal:any){
    if(terminal==""){
      terminal="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/HeadDeliveryRegisterAssignType/'+terminal); 
  }
  getBlockList(terminal:any){
    if(terminal==""){
      terminal="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/HeadDeliveryRegisterBlocklList/'+terminal); 
  }
}
