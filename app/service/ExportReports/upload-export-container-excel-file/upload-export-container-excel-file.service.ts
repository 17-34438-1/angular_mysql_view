import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadExportContainerExcelFileService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
  uploadExportContainer(data: any){
    console.log(data);
    return this.httpClient.post(this.igmMisIp+this.igmMisPort+'/ExportReport/UploadExportContainerExcelFile', data);
  }
  getIpAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
}
