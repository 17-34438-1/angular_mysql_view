import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class MisAssignmentService {
  fileName= 'ExcelSheet.xlsx';
  ctgPortTitle="     CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  officeManagetitle="OFFICE OF THE TERMINAL MANAGER"
  header:any = ["SL","C & F Agent","Vessel Name",	"Rot.No",	"MLO",	"Seal No","	DLV(Y/N)",	"Cont No.","Sz","Ht",	"BL No.",	"From","Remarks"];
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
   }
   getMisAssignmentList(date:any,terminal:any,blockName:any,assignType:any){
    if(date==""){
      date="empty";
    }
    else if(terminal==""){
      terminal="empty"
    }
    else if(blockName==""){
      blockName="empty"
    }
    else if(assignType==""){
      assignType="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/MisAssignmentList/'+date+"/"+terminal+"/"+blockName+"/"+assignType); 
  }
  getAssignType(terminal:any){
    if(terminal==""){
      terminal="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/MisAssignmentAssignType/'+terminal); 
  }
  getBlockList(terminal:any){
    if(terminal==""){
      terminal="empty"
    }
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/MisAssignmentBlockList/'+terminal); 
  }

  getCctNctListWithExcel(date:any,terminal:any,resultList:any){
    
    let title="DELIVERY REPORT OF "+terminal;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("DELIVERY REPORT OF "+terminal);
    for(let result of resultList){
          let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
          portTitle.alignment={ vertical: 'top', horizontal: 'left'};
          portTitle.font = {  size: 12, bold: true };

          let officeManagetitle=worksheet.addRow(["",this.officeManagetitle]);
          officeManagetitle.alignment={ vertical: 'top', horizontal: 'left'};
          officeManagetitle.font = {  size: 12,  bold: true };

          let titleRow=worksheet.addRow(["",title]);
          titleRow.alignment={ vertical: 'top', horizontal: 'left'};
          titleRow.font = {  size: 12,  bold: true };

          let dateRow=worksheet.addRow(["",date]);
          dateRow.alignment={ vertical: 'top', horizontal: 'left'};
          dateRow.font = {  size: 12,  bold: true };

          worksheet.addRow([]);

          let deliveryRow= worksheet.addRow(["Assignment (Delivery): "+result.mfdch_desc]);
          deliveryRow.alignment={ vertical: 'top', horizontal: 'left'};
          deliveryRow.font = {  size: 12,  bold: true };

          let headerRow=worksheet.addRow(["SL","C & F Agent","Vessel Name",	"Rot.No",	"MLO",	"Seal No","	DLV(Y/N)",	"Cont No.","Sz","Ht",	"BL No.",	"From","Remarks"]);
          headerRow.alignment={ vertical: 'top', horizontal: 'left'};
          headerRow.font = {   bold: true };
          headerRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });
        
        for(let res of result.resultList){
         let dataRow= worksheet.addRow([res.slNo,res.cf_name,res.v_name,res.rot_no,res.mlo,res.seal_nbr1,res.dlv,
                                       res.cont_no,res.size,res.formattedHeight,res.bl_no,res.slot,res.remarks]);
         dataRow.alignment={ vertical: 'top', horizontal: 'left'};
         dataRow.eachCell((cell,number)=>{
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}}); 
           
        }


        let totalInfoRow=worksheet.addRow([result.total,"20 FT: ",result.t20,"40 FT:",result.t40,"TEUS: ",result.tues]);
        totalInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
        totalInfoRow.eachCell((cell,number)=>{
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}}); 
        worksheet.addRow([]);
     }
    worksheet.getColumn(1).width = 55;
    worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(2).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(3).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(4).width = 25;
    worksheet.getColumn(5).width = 25;
    worksheet.getColumn(5).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 35;
    worksheet.getColumn(8).width = 35;
    worksheet.getColumn(9).width = 25;
    worksheet.getColumn(10).width =25;
    worksheet.getColumn(11).width = 25;
    worksheet.getColumn(12).width = 25;
    worksheet.getColumn(13).width = 25;
 
    workbook.xlsx.writeBuffer().then((data:any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'misAssignmentCCTAndNCT.xlsx');
    });



  }
  getGcbListWithExcel(date:any,terminal:any,block:any,resultList:any){

    let title="DELIVERY REPORT OF "+terminal;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("DELIVERY REPORT OF "+terminal);
    for(let r of resultList){

      for(let result of r.gcbList){
        let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
        portTitle.alignment={ vertical: 'top', horizontal: 'left'};
        portTitle.font = {  size: 12, bold: true };

        let officeManagetitle=worksheet.addRow(["",this.officeManagetitle]);
        officeManagetitle.alignment={ vertical: 'top', horizontal: 'left'};
        officeManagetitle.font = {  size: 12,  bold: true };

        let titleRow=worksheet.addRow(["",title]);
        titleRow.alignment={ vertical: 'top', horizontal: 'left'};
        titleRow.font = {  size: 12,  bold: true };

        let dateRow=worksheet.addRow(["",date]);
        dateRow.alignment={ vertical: 'top', horizontal: 'left'};
        dateRow.font = {  size: 12,  bold: true };

        worksheet.addRow([]);

        let deliveryRow= worksheet.addRow(["Block: "+r.blockNo,"Assignment (Delivery): "+result.mfdch_desc]);
        deliveryRow.alignment={ vertical: 'top', horizontal: 'left'};
        deliveryRow.font = {  size: 12,  bold: true };

        let headerRow=worksheet.addRow(["SL","C & F Agent","Vessel Name",	"Rot.No",	"MLO",	"Seal No","	DLV(Y/N)",	"Cont No.","Sz","Ht",	"BL No.",	"From","Remarks"]);
        headerRow.alignment={ vertical: 'top', horizontal: 'left'};
        headerRow.font = {   bold: true };
        headerRow.eachCell((cell,number)=>{
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}
      });
      
      for(let res of result.resultList){
       let dataRow= worksheet.addRow([res.slNo,res.cf_name,res.v_name,res.rot_no,res.mlo,res.seal_nbr1,res.dlv,
                                     res.cont_no,res.size,res.formattedHeight,res.bl_no,res.slot,res.remarks]);
       dataRow.alignment={ vertical: 'top', horizontal: 'left'};
       dataRow.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}}); 
         
      }


      let totalInfoRow=worksheet.addRow([result.total,"20 FT: ",result.t20,"40 FT:",result.t40,"TEUS: ",result.tues]);
      totalInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
      totalInfoRow.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}}); 
      worksheet.addRow([]);
   }
      
    }
    
    worksheet.getColumn(1).width = 55;
    worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(2).width = 35;
    worksheet.getColumn(2).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(3).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(4).width = 25;
    worksheet.getColumn(5).width = 25;
    worksheet.getColumn(5).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 35;
    worksheet.getColumn(8).width = 35;
    worksheet.getColumn(9).width = 25;
    worksheet.getColumn(10).width =25;
    worksheet.getColumn(11).width = 25;
    worksheet.getColumn(12).width = 25;
    worksheet.getColumn(13).width = 25;
  
   

 
    workbook.xlsx.writeBuffer().then((data:any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'misAssignmentGCB.xlsx');
    });

    
  }
}

