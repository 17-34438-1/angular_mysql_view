import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShahinSpecialReportLocationCertifyService {

  igmMisIp : string;
  igmMisPort : string;

  constructor(  private httpClient:HttpClient) { 
   this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
    }

  
 getLoadedContainerReport(data:any):Observable<any>{

  return this.httpClient.patch(this.igmMisIp+this.igmMisPort+`/ShahinSpecialReport/ShahinLocationCertify/`,data);
  
}

}




 