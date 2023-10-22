import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportContainerBayViewService {
  igmMisIp : string;
  igmMisPort : string;


  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }

   getExportContainerBayVesselInfo(rotation:any){
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/ExportReport/ExportContainerBayVesselInfo/'+rotation);
   }

   getExportContainerBayViewList(rotation:any){
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/ExportReport/ExportContainerBayViewList/'+rotation);
   }
}
