import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class YardWiseAssignmentAndDeliveryEmptyDetailService {
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
  getYardWiseAssignmentAndDeliveryDetail(fromDate:any,yardName:any,blockName:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/YardWiseAssignmentAndDeliveryDetail/'+fromDate+"/"+yardName+"/"+blockName); 
  }
  getBlockList(yardName:any){
    return this.httpClient.get(this.igmMisIp+this.igmMisPort+'/importReports/YardWiseAssignmentAndDeliveryDetailBlockList/'+yardName); 
  }
  getResultWithExcel(fromDate:any,yardName:any,blockName:any,resultList:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Yard Wise Assignment Date Wise Import Container List');
    let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let title=worksheet.addRow(["",this.title]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let dateYard = worksheet.addRow(["DATE :"+ fromDate,"","Yard NO : " +yardName,"","Block No "+blockName,
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
  let shiftA=[];
  let shiftB=[];
  let shiftC=[];
  let noShift=[];
  let shifTATotal20=0;
  let shifTATotal40=0;
  let shifTBTotal20=0;
  let shifTBTotal40=0;
  let shifTCTotal20=0;
  let shifTCTotal40=0;
  let noShiftYard20=0;
  let noShiftYard40=0;


  

    for(let res of resultList){
        shiftA=res.shifA;
        shiftB=res.shifB;
        shiftC=res.shifC;
        noShift=res.noshiftyardList;
        shifTATotal20=res.shifTATotal20;
        shifTATotal40=res.shifTATotal40;
        shifTBTotal20=res.shifTBTotal20;
        shifTBTotal40=res.shifTBTotal40;
        shifTCTotal20=res.shifTCTotal20;
        shifTCTotal40=res.shifTCTotal40;
        noShiftYard20=res.noshiftyard20;
        noShiftYard40=res.noshiftyard40;
        j20=res.j20;
        j40=res.j40;
        a20=res.a20;
        a40=res.a40;
        b20=res.b20;
        b40=res.b40;
        c20=res.c20;
        c40=res.c40;

    }

    if(noShift.length!=0){
      let rowShift = worksheet.addRow([yardName,"","","","","","","",
      "","","","","","","" ]);
      rowShift.font = {   bold: true };
    }
    i=0;
    for(let res of noShift){
      i++;
      let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.iso_code,res.mlo,res.statu,res.mfdch_desc,res.cf,
        res.weight,res.carrentPosition,res.dischargetime,res.assignmentdate,res.delivery,res.stripped_by,res.last_update+"by"+res.user_id]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  

    }

    if(noShift.length!=0){
      let total = worksheet.addRow(["Total 20=>"+noShiftYard20+"& 40=>"+noShiftYard40,"","","","","","","",
    "","","","","","","" ]);
    total.font = {   bold: true };
   // worksheet.addRow([]);
    }




    if(shiftA.length!=0){
      let rowShift = worksheet.addRow(["Shift A","","","","","","","",
      "","","","","","","" ]);
      rowShift.font = {   bold: true };
    }
    i=0;

    for(let res of shiftA){
      i++;
      let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.iso_code,res.mlo,res.statu,res.mfdch_desc,res.cf,
        res.weight,res.carrentPosition,res.dischargetime,res.assignmentdate,res.delivery,res.stripped_by,res.last_update+"by"+res.user_id]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  

    }
    if(shiftA.length!=0){
      let total = worksheet.addRow(["Total 20=>"+shifTATotal20+"& 40=>"+shifTATotal40,"","","","","","","",
    "","","","","","","" ]);
    total.font = {   bold: true };
   // worksheet.addRow([]);
    }

    if(shiftB.length!=0){
      let rowShift = worksheet.addRow(["Shift B","","","","","","","",
      "","","","","","","" ]);
      rowShift.font = {   bold: true };
    }
    i=0;

    for(let res of shiftB){
      i++;
      let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.iso_code,res.mlo,res.statu,res.mfdch_desc,res.cf,
        res.weight,res.carrentPosition,res.dischargetime,res.assignmentdate,res.delivery,res.stripped_by,res.last_update+"by"+res.user_id]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  

    }

    if(shiftB.length!=0){
      let total = worksheet.addRow(["Total 20=>"+shifTBTotal20+"& 40=>"+shifTBTotal40,"","","","","","","",
    "","","","","","","" ]);
    total.font = {   bold: true };
   // worksheet.addRow([]);
    }
  
    


    if(shiftC.length!=0){
      let rowShift = worksheet.addRow(["Shift C","","","","","","","",
      "","","","","","","" ]);
      rowShift.font = {   bold: true };
    }
    i=0

    for(let res of shiftC){
      i++;
      let eachRow = worksheet.addRow([i,res.cont_no,res.rot_no,res.iso_code,res.mlo,res.statu,res.mfdch_desc,res.cf,
        res.weight,res.carrentPosition,res.dischargetime,res.assignmentdate,res.delivery,res.stripped_by,res.last_update+"by"+res.user_id]);
        eachRow.alignment={ vertical: 'top', horizontal: 'left'};
      
        eachRow.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
          cell.alignment={vertical:'middle',horizontal:'center'}
        });  

    }

    if(shiftC.length!=0){
      let total = worksheet.addRow(["Total 20=>"+shifTCTotal20+"& 40=>"+shifTCTotal40,"","","","","","","",
    "","","","","","","" ]);
    total.font = {   bold: true };
    //worksheet.addRow([]);
    }
        

   
    
     let tableRowTiltle = worksheet.addRow(["UNIT/YARD","SHIFT","","TOTAL ASSIGNMENT","","","STRIPPED","",
     "","BALANCE","","REMARKS"]);
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
      fs.saveAs(blob, 'yardWiseAssignmentDateWiseImportContainerList.xlsx');
    });
  
  }
}
