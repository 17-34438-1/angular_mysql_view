import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContainerSearchService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
  getContainerSearchResult(assignDate:any,containerNo:any){
    if(assignDate==""){
      assignDate="empty";
    }
    if(containerNo==""){
      containerNo="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/AllASSIGNMENTContainerSearchResult/'+assignDate+"/"+containerNo); 
  }
}
