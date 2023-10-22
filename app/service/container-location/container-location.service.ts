import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContainerLocationService {

  //API(Route) variables
  frontApiIp : string;
  frontApiPort : string;
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.frontApiIp = environment.frontApiIp;
    this.frontApiPort = environment.frontApiPort;
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
  }

  getContainerLocation(containerNumber: string): Observable<any> {
    return this.httpClient.get(this.frontApiIp + this.frontApiPort + `/frontapi/containerLocation/`+ containerNumber);
  }

  getLCLContainerLocation(data: any): Observable<any> {
    return this.httpClient.patch(this.igmMisIp + this.igmMisPort + `/containerLocation/lcl`, data);
  }

  
  
}
