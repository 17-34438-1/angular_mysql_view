import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class AppRaiseReSlotLocationService {
  igmMisIp : string;
  igmMisPort : string;
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title="APPRAISE RE-SLOT LOCATION"

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }

   getAppRaiseReSlotLocationList(searchDate:any,containers:any){
    if(searchDate==""){
      searchDate="empty";
    }
    if(containers==""){
      containers="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/AppRaiseReSlotLocationList/'+searchDate+"/"+containers+"/"); 
  }

  getResultWithExcel(searchDate:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('APPRAISE RE-SLOT LOCATION');
    let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let title=worksheet.addRow(["",this.title]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let dateYard = worksheet.addRow(["","Search Date :"+searchDate ]);
    dateYard.alignment={ vertical: 'top', horizontal: 'left'};
    dateYard.font = {   bold: true };
   /* dateYard.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });*/
    worksheet.addRow([]);
    let rowTitle = worksheet.addRow(["SlNo","Container No","Length","Location","Assignment Type","Vsl.Ref","To Pos Slot","Trailer","Remarks"]);
    rowTitle.alignment={ vertical: 'top', horizontal: 'left'};
    rowTitle.font = {   bold: true };
    rowTitle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    let i=0;
    for(let res of resultList){
      i++;
      
      let eachRow = worksheet.addRow([i,res.id,res.size,res.fm_pos_slot,res.mfdch_desc,res.vesselName,res.destination,res.che_carry,res.remark]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  

    }

    worksheet.getColumn(1).width = 35;
    worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(2).width = 35;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;
    worksheet.getColumn(5).width = 25;
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 35;
    worksheet.getColumn(8).width = 35;
    worksheet.getColumn(9).width = 25;
    worksheet.getColumn(10).width =25;
    worksheet.getColumn(11).width = 25;
    worksheet.getColumn(12).width = 25;
    worksheet.getColumn(13).width = 25;
    worksheet.getColumn(14).width = 25;
    worksheet.getColumn(15).width = 25;
   

 
    workbook.xlsx.writeBuffer().then((data:any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AppRaiseReSlotLocation.xlsx');
    });


  }
}
