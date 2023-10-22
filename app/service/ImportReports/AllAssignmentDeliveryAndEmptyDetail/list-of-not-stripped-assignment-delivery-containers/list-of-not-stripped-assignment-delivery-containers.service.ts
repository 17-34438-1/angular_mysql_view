import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ListOfNotStrippedAssignmentDeliveryContainersService {
  igmMisIp : string;
  igmMisPort : string;
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title="List of Not Stripped Assignment Delivery Containers"

  constructor(
    private httpClient: HttpClient
  ) { 
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
  }
  getListOfNotStrippedAssignmentDeliveryContainers(date:any,yardName:any){
    if(date==""){
      date="empty";
    }
    if(yardName==""){
      yardName="empty";
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/ListOfNotStrippedAssignmentDeliveryContainers/'+date+"/"+yardName+"/"); 
  }
  getResultWithExcel(date:any,yardName:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('List of Not Stripped Assignment Delivery Containers');
    let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let title=worksheet.addRow(["",this.title]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let dateYard = worksheet.addRow(["DATE :"+ date,"","Yard NO : " +yardName,"" ]);
    dateYard.alignment={ vertical: 'top', horizontal: 'left'};
    dateYard.font = {   bold: true };
    dateYard.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    worksheet.addRow([]);
    let rowTitle = worksheet.addRow(["SlNo","Container No","Rotation No","Type","MLO","Status","Weight","Assignment Type","C&F Name",
    "Current Position","Discharge date","Assignment date"]);
    rowTitle.alignment={ vertical: 'top', horizontal: 'left'};
    rowTitle.font = {   bold: true };
    rowTitle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    let total20=0;
    let total40=0;
    let  i=0;
    let containers="";
    let strippedList=[];
    for(let res of resultList){
      total20=res.total20;
      total40=res.total40;
      containers=res.totalContainers;
      strippedList=res.strippedAssignmentDeliveryContainersModelList;
  
      for(let res of strippedList){
        i++;
        let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.cont_iso_type,res.mlo,res.statu,res.weight,res.mfdch_desc,res.cf,
         res.carrentPosition,res.dischargetime,res.assignmentdate]);
          eachRow.alignment={ vertical: 'top', horizontal: 'left'};
        
          eachRow.eachCell((cell,number)=>{
            cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
            cell.alignment={vertical:'middle',horizontal:'center'}
          });  
  
      }
      let total = worksheet.addRow(["Total 20=>"+total20+"& 40=>"+total40,"","","","","","","",
      "","","","" ]);
      total.font = {   bold: true };
      
      let containerRow = worksheet.addRow([containers,"","","","","","","",
      "","","","" ]);
      containerRow.font = {   bold: true };
      

    }
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
      fs.saveAs(blob, 'listOfNotStrippedAssignmentDeliveryContainers.xlsx');
    });

  }
 
}
