import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadExcelForPangaonService {
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }

   uploadExcelForPangaon(data: any){
    console.log(data);
    return this.httpClient.post(this.igmMisIp+this.igmMisPort+'/Pangaon/UploadExcelFileForPangaon', data);
  }
  getIpAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
}
