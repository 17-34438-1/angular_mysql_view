import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AssignmentAndDeliveryEmptySummaryService {
  igmMisIp : string;
  igmMisPort : string;
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title="Discharge Import Container List"

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getAssignmentAndDeliverySummary(date:any,yardName:any){
    if(date==""){
      date="empty";
    }
    if(yardName==""){
      yardName="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/AssignmentAndDeliverySummary/'+date+"/"+yardName); 
  }

  getResultWithExcel(date:any,yardName:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Assignment And Delivery Summary');
    let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let title=worksheet.addRow(["",this.title]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let dateYard = worksheet.addRow(["DATE :"+ date,"","Yard NO : " +yardName,""]);
    dateYard.alignment={ vertical: 'top', horizontal: 'left'};
    dateYard.font = {   bold: true };
    dateYard.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    worksheet.addRow([]);
    let j20=0;
    let j40=0;
    let a20 = 0;
    let a40 = 0;
    let b20 = 0;
    let c20 = 0;
    let c40=0;
    let b40=0;
    let stayed=0;
    for(let res of resultList){
      j20=res.j20;
      j40=res.j40;
      a20=res.a20;
      a40=res.a40;
      b20=res.b20;
      b40=res.b40;
      c20=res.c20;
      c40=res.c40;
      stayed=res.stayed;

  }

    let tableRowTiltle = worksheet.addRow(["","","","TOTAL ASSIGNMENT","","","STRIPPED BY HHT","",
    "","BALANCE","",""]);
    tableRowTiltle.alignment={ vertical: 'top', horizontal: 'left'};
    tableRowTiltle.font = {   bold: true };
    tableRowTiltle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    let tableRowSubTiltle = worksheet.addRow(["UNIT/YARD","SHIFT","20(L)","40(L)","Total","20(E)","40(E)","Total",
    "20(L)","40(L)","Total","REMARKS"]);
    tableRowSubTiltle.alignment={ vertical: 'top', horizontal: 'left'};
    tableRowSubTiltle.font = {   bold: true };
    tableRowSubTiltle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

    let tableRow1 = worksheet.addRow([yardName,"A",j20,j40,j20+j40,a20,a40,a20+a40,
    j20-a20,j40-a40,j20-a20+j40-a40,""]);
    tableRow1.alignment={ vertical: 'top', horizontal: 'left'};
 
    tableRow1.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

    let tableRow2 = worksheet.addRow([yardName,"B",j20-a20,j40-a40,j20-a20+j40-a40,b20,b40,b20+b40,
    j20-a20-b20,j40-a40-b40,j20-a20-b20+j40-a40-b40,""]);
    tableRow2.alignment={ vertical: 'top', horizontal: 'left'};
 
    tableRow2.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

    let tableRow3 = worksheet.addRow([yardName,"C",j20-a20-b20,j40-a40-b40,j20-a20-b20+j40-a40-b40,c20,c40,c20+c40,
    j20-a20-b20-c20,j40-a40-b40-c40,j20-a20-b20-c20+j40-a40-b40-c40," Stayed: "+ stayed]);
    tableRow3.alignment={ vertical: 'top', horizontal: 'left'};
 
    tableRow3.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });




   worksheet.getColumn(1).width = 35;
   worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
   worksheet.getColumn(2).width = 25;
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
     fs.saveAs(blob, 'assignmentAndDeliverySummary.xlsx');
   });
  }
}
