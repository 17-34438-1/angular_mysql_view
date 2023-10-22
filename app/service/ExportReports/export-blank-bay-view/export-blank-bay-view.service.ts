import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportBlankBayViewService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  BlankBay():Observable<any>{
    return this.httpClient.get(`http://192.168.16.188:8093/ExportReport/BlankBayFrom`);
  }
 


  BlankBayView(rotation: String): Observable<any> {
    console.log("vvd_gkey................:"+rotation)
    return this.httpClient.get(`http://192.168.16.188:8093/ExportReport/BlankBayView/`+rotation);
  }

  
  BlankBayViews(rotation: String): Observable<any> {
    console.log("vvd_gkey................:"+rotation)
    return this.httpClient.get(`http://192.168.16.188:8093/ExportReport/BlankBa/`+rotation);
  }


  getExportBlankBayViewVesselList(){
    return this.httpClient.get(`http://192.168.16.188:8093/ExportReport/ExportBlankBayViewVesselList/`);
   }
   getExportBlankBayViewVesselInfo(key:any){
    if(key==""){
      key=0;
    }
    return this.httpClient.get(`http://192.168.16.188:8093/ExportReport/ExportBlankBayVesselInfo/`+key);
   }

   getExportBlankBayViewList(key:any){
    if(key==""){
      key=0;
    }
    return this.httpClient.get(`http://192.168.16.188:8093//ExportReport/ExportBlankBayViewList/`+key);
   }

}
