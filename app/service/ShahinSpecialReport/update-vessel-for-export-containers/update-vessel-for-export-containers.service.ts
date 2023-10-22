import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateVesselForExportContainersService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient 
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   updateVesselForExportContainer(preRotation:any,newRotation:any,containers:any){
   
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/ShahinSpecialReport/UpdateVesselForExportContainer/'+preRotation+"/"+newRotation+"/"+containers);
   }
}
