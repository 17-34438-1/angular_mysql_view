import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExportMloWiseLoadedContainerService {

  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient:HttpClient



  ) { 

    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;

  }

   
  getVoyNo(rotation:String):Observable<any>
  {
  return this.httpClient.get(``+rotation)
  }
  getvvdgkey(rotation:String):Observable<any>{
    return this.httpClient.get(``+rotation);
  }
  
  getContainerVesselInfo(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/MloWiseLoadedContainerVessleInformation/`+rotation);
  }
  getContainerList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/MloWiseLoadedContainerInfo/`+rotation);
  }

  getLoadedContainerOnboardList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/MloWiseLoadedContainerOnboardInformation/`+rotation);
  }
  getLoadedContainerBalanceList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/MloWiseLoadedContainerBalanceList/`+rotation);
  }
}
