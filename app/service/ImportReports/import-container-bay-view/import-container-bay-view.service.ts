import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportContainerBayViewService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getImportContainerBayViewVesselList(){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/ImportContainerBayViewVesselList/');
   }
   getImportContainerBayVesselInfo(key:any){
    if(key==""){
      key=0;
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/ImportContainerBayVesselInfo/'+key);
   }

   getImportContainerBayViewList(key:any){
    if(key==""){
      key=0;
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/ImportContainerBayViewList/'+key);
   }
}
