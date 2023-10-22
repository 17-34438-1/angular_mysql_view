import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';
import { environment } from 'src/environments/environment';
import { result } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EquipmentHandlingPerformaceRtgTimeWiseService {
  igmMisIp : string;
  igmMisPort : string;
   ctgPortTitle="     CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  title:any ="TIMEWISE EQUIPMENT HANDLING PERFORMANCE HISTORY";
  header:any = ["SlNo","RTG # NO.", "0800-0900", "0900-1000","1000-1100","1100-1200","1200-1300","1300-1400","1400-1500","1500-1600","1600-1700","1700-1800","1800-1900","1900-2000","Total Handling Boxes"];
  header2:any = ["SlNo","RTG # NO.", "2000-2100", "2100-2200","2200-2300","2300-0000","0000-0100","0100-0200","0200-0300","0300-0400","0400-0500","0500-0600","0600-0700","0700-0800","Total Handling Boxes"];

  

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }

   equipmentHandlingPerformaceRtgTimeWise(fromDate:any,shift:any){
    
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/ShahinSpecialReport/EquipmentHandlingPerformaceRtgTimeWise/'+fromDate+"/"+shift+"/");
   }
   getResultWithExcel(fromDate:any,shift:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("TIMEWISE EQUIPMENT HANDLING PERFORMANCE HISTORY");

  
     let portTitle=worksheet.addRow(["","",this.ctgPortTitle]);
     portTitle.alignment={ vertical: 'top', horizontal: 'left'};
     portTitle.font = {  size: 16, bold: true };
     worksheet.addRow([]);
     let titleRow = worksheet.addRow(["","",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     titleRow.font = {  size: 16, bold: true };

     worksheet.addRow([]);
    
    
     let info=worksheet.addRow([" From Date : "+fromDate,"","","","","","     Shift : "+shift]);    
     info.alignment={ vertical: 'top', horizontal: 'left'};
     info.font = {  size: 12, bold: true};
     worksheet.addRow([]);
     if(shift=="Day"){
      worksheet.addRow(this.header).eachCell((cell, number) => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
          cell.alignment={vertical:'middle',horizontal:'center'}
          cell.font={bold:true}
         });
      
     }
     else if(shift=="Night"){
      worksheet.addRow(this.header2).eachCell((cell, number) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        cell.alignment={vertical:'middle',horizontal:'center'}
        cell.font={bold:true}
       });
     }

   for(let result of resultList){
    let i=0;
    for(let res of result.equipmentRtgList){
      i++;
      let row = worksheet.addRow([i,res["eq"],res["t_08_09"],res["t_09_10"],res["t_10_11"],res["t_11_12"],res["t_12_13"],res["t_13_14"],
      res["t_14_15"],res["t_15_16"],res["t_16_17"],res["t_17_18"],res["t_18_19"],res["t_19_20"],res["total"]]);
      let color = 'FF99FF99';
      row.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });

    }
  
    let row2 = worksheet.addRow(["Total","",result["sum_08_09"],result["sum_09_10"],result["sum_10_11"],result["sum_11_12"],result["sum_12_13"],result["t_13_14"],
    result["sum_14_15"],result["sum_15_16"],result["sum_16_17"],result["sum_17_18"],result["sum_18_19"],result["sum_19_20"],result["total"]]);
    let color = 'FF99FF99';
    row2.eachCell((cell,number)=>{
      
     cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
     cell.alignment={vertical:'middle',horizontal:'center'}
   });
}

     worksheet.getColumn(1).width = 25;
     worksheet.getColumn(2).width = 25;
     worksheet.getColumn(3).width = 25;
     worksheet.getColumn(4).width = 25;
     worksheet.getColumn(5).width = 25;
     worksheet.getColumn(6).width = 25;
     worksheet.getColumn(7).width = 25;
     worksheet.getColumn(8).width = 25;
     worksheet.getColumn(9).width = 25;
     worksheet.getColumn(10).width = 25;
     worksheet.getColumn(11).width = 25;
     worksheet.getColumn(12).width = 25;
     worksheet.getColumn(13).width = 25;
     worksheet.getColumn(14).width = 25;
     worksheet.getColumn(15).width = 25;
   



   workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'TimeWiseEquipmentHandlingPerformanceHistory.xlsx');
  });
    
   }
}
