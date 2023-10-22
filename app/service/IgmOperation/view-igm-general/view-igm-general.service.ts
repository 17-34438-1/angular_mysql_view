import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewIgmGeneralService {
  igmMisIp : string;
  igmMisPort : string;


  constructor(
    private httpClient: HttpClient 
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getList(type:any,limit:any,start:any,status:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/IgmOperation/ViewIgmList/'+type+"/"+limit+"/"+start+"/"+status);
   }
   getSearchList(type:any,searchType:any,searchValue:any){
    if(searchType==""){
      searchType="empty";
    }
    if(searchValue==""){
      searchValue="empty";
    }
    if(type==""){
      type="empty";
    }
   
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/IgmOperation/ViewIgmSearchList/'+type+"/"+searchType+"/"+searchValue);
   }
   getIpAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
  getUploadEdiInfo(id:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/IgmOperation/UploadEdiInfo/'+id);
   }

   uploadEdi(data: any){
    console.log(data);
    return this.httpClient.post(this.igmMisIp+this.igmMisPort+'/IgmOperation/uploadEdi', data);
  }

  downloadEdi(fileName:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/IgmOperation/downloadEdi/'+fileName,{responseType:'blob'});
   }


}
