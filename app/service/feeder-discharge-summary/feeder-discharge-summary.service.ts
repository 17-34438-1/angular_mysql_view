import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeederDischargeSummaryService {
  igmMisIp:string;
  igmMisPort:string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
  }



  feederDischargeByRotation(imp_rot: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/specialReport/feederDischargeSummary/`+imp_rot, {headers:httpHeaders});
  }



}
