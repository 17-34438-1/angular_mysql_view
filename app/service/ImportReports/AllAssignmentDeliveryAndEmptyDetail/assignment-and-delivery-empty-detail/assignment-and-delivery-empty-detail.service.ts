import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentAndDeliveryEmptyDetailService {
  igmMisIp : string;
  igmMisPort : string;
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title="Assignment Date Wise Import Container List"


  constructor(
    private httpClient: HttpClient
  ) { 
    this.igmMisIp=environment.igmMisIp;
    this.igmMisPort=environment.igmMisPort;
  }

  getAssignmentandDeliveryEmptyDetailList(fromDate:any,loginId:any,yardName:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/AssignmentAndDeliveryDetail/'+fromDate+"/"+loginId+"/"+yardName); 
  }
  getResultWithExcel(fromDate:any,yardName:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Assignment Date Wise Import Container List');
    let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let title=worksheet.addRow(["",this.title]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let dateYard = worksheet.addRow(["","","DATE :"+ fromDate,"","Yard NO : " +yardName,
    "","","","",
    "","","","","","","" ]);
    dateYard.alignment={ vertical: 'top', horizontal: 'left'};
    dateYard.font = {   bold: true };
    dateYard.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    worksheet.addRow([]);


    let rowTitle = worksheet.addRow(["SlNo","Container No","Rotation No","Type","MLO","Status","Assignment Type","C&F Name",
    "Weight","Current Position","Discharge date","Assignment date","Delivery/Empty Date","Stripped By","Remarks" ]);
    rowTitle.alignment={ vertical: 'top', horizontal: 'left'};
    rowTitle.font = {   bold: true };
    rowTitle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

  let i=0;
	let j=0;
	let j20=0;
	let j40=0;
	let a20 = 0;
	let a40 = 0;
	let b20 = 0;
  let c20 = 0;
	
	let allContainer="";
	let yard="";
	let shift="";
	let tot20 = 0;
	let tot40 = 0;
	let stayed=0;
  let subIso="";
  let c40=0;
  let b40=0;

  

    for(let res of resultList){
      stayed=stayed+res.stay;
      allContainer=allContainer+","+res.cont_no;
      subIso=res.subIso;
      i=i+1;

      if(subIso=="2"){
      
        j20=j20+1;
      }
      else{
        j40=j40+1;
      }
      
      if(subIso=="2")
      {
        if(res.shift=="Shift A"){
          a20 = a20+1;
        }
        
        if(res.shift=="Shift B"){
          b20 = b20+1;
        }
          
        if(res.shift=="Shift C"){
          c20 = c20+1;
  
        }
          
      }
      else
      {
        if(res.shift=="Shift A"){
          a40 = a40+1;
        }  
        if(res.shift=="Shift B"){
          b40 = b40+1;
        }  
        if(res.shift=="Shift C"){
          c40 = c40+1;
        }  
      }
        
      if(shift==res.shift || i==1)
      {
        if(subIso=="2"){
          tot20 = tot20+1;
         // this.totalShift20=this.tot20;
        }
        else {
          tot40 = tot40+1;
         // this.totalShift40=this.tot40;
        }
      }
  
   
  
      if(yard!=res.yard_No)
      {
        yard=res.yard_No;
        if(i!=1)
        {
         // this.totalShift20=0;
          //this.totalShift40=0;

        let rowTotalYard = worksheet.addRow(["Total 20=>"+tot20+"& 40=>"+tot40,"","","","","","","",
    "","","","","","","" ]);
    rowTotalYard.alignment={ vertical: 'top', horizontal: 'left'};
    rowTotalYard.font = {   bold: true };
    rowTotalYard.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

        
        
          if(subIso=="2")
          {
            tot20 = 1;
            tot40 = 0;
           // this.yardTot20=1;
           // this.yardTot40=0;
         
          }
          else
          {
            tot20 = 0;
            tot40 = 1;
           // this.yardTot20=0;
           // this.yardTot40=1;
          
          }
        }
        let rowYard = worksheet.addRow([res.yard_No,"","","","","","","",
    "","","","","","","" ]);
    rowYard.font = {   bold: true };

      
       
        i=1;
      }
  
      if(shift!=res.shift)
      {	
        shift=res.shift;		
        if(i!=1)
        {
         // this.totalYard20=0;
          //this.totalYard40=0;
          if(subIso=="2")
          {
            tot20 = tot20;
          }
          else
          {
            tot40 = tot40;
          }
        
        //  this.totalShiftShowStatus=true;
        let rowTotalShift = worksheet.addRow(["Total 20=>"+tot20+"& 40=>"+tot40,"","","","","","","",
        "","","","","","","" ]);
        rowTotalShift.alignment={ vertical: 'top', horizontal: 'left'};
        rowTotalShift.font = {   bold: true };
        rowTotalShift.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });
        
          if(subIso=="2")
          {
            tot20 = 1;
            tot40 = 0;
          }
          else
          {
            tot20 = 0;
            tot40 = 1;
          }
        }
       // this.shiftShowStatus=true;

       let rowShift = worksheet.addRow([res.shift,"","","","","","","",
       "","","","","","","" ]);
       rowShift.font = {   bold: true };

       
        i=1;
      }
  
      shift=res.shift;
      let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.iso_code,res.mlo,res.statu,res.mfdch_desc,res.cf,
        res.weight,res.carrentPosition,res.dischargetime,res.assignmentdate,res.delivery,res.stripped_by,res.last_update+"by"+res.user_id]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  
    }
    let total = worksheet.addRow(["Total 20=>"+tot20+"& 40=>"+tot40,"","","","","","","",
    "","","","","","","" ]);
    total.font = {   bold: true };
    worksheet.addRow([]);
    let allCotainerRow= worksheet.addRow([allContainer,
     ]);
     allCotainerRow .alignment={ vertical: 'top', horizontal: 'left'};
      worksheet.addRow([]);

     let tableRowTiltle = worksheet.addRow(["UNIT/YARD","SHIFT","","TOTAL ASSIGNMENT","","","STRIPPED","",
     "Weight","BALANCE","","REMARKS"]);
     tableRowTiltle.alignment={ vertical: 'top', horizontal: 'left'};
     tableRowTiltle.font = {   bold: true };
     tableRowTiltle.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
     let tableRowSubTiltle = worksheet.addRow(["","","20(L)","40(L)","Total","20(E)","40(E)","Total",
     "20(L)","40(L)","Total",""]);
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
      fs.saveAs(blob, 'assignmentDateWiseImportContainerList.xlsx');
    });

 }
}
