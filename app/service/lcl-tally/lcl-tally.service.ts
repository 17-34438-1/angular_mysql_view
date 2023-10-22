import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface ROW_ITEM {
  SL: number;
  Container : string;
  Size : string;
  Height : string;
  Rotation : string;
  Vessel : string;
  MLO : string;
  STV : string;
  ContAtShed : string;
  CargoDesc : string;
  LandingDt : string;
  Remarks : string;
}

@Injectable({
  providedIn: 'root'
})
export class LclTallyService {

  //API(Route) variables
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
  }

  lclAssignmentReportBySection(section: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReportBySection/`+section , {headers:httpHeaders});
  }

  lclAssignmentReport(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReport`, {headers:httpHeaders});
  }

  lclAssignmentReportByRotation(imp_rot: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReportByRotation/`+imp_rot , {headers:httpHeaders});
  }

  lclAssignmentReportByContainer(cont_number: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReportByContainer/`+cont_number , {headers:httpHeaders});
  }

  lclAssignmentReportByDateRange(fromDate: Date, toDate: Date): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReportByDateRange/`+fromDate + '/' + toDate, {headers:httpHeaders});
  }

  lclAssignmentReportByShed(cont_loc_shed: any,fromDate: Date, toDate: Date): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/lcltally/lclAssignmentReportByShed/`+ cont_loc_shed + '/' + fromDate + '/' + toDate, {headers:httpHeaders});
  }


  //LCL Assignment Report...Excel Starts
  exportExcel(excelData: { title: any; data: any; headers: any; myHeaders: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    const myHeaders = excelData.myHeaders;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('LCL Assignment Report Data');

    //Add Row and formatting
    worksheet.mergeCells('E1', 'H4');
    let titleRow = worksheet.getCell('E1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 18,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();

    // Date
    // worksheet.mergeCells('G1:H4');
    
    // let dateCell = worksheet.getCell('G1');
    // dateCell.value = date;
    // dateCell.font = {
    //   name: 'Calibri',
    //   size: 12,
    //   bold: true,
    // };
    // dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    // let headerRow = worksheet.addRow(header);
    let headerRow = worksheet.addRow(myHeaders);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };      
    });

    let i=0;
    for(let result of data){
      i++;
      let row = worksheet.addRow(
          [
            i,
            result['Container'],
            result['Size'],
            result['Height'],
            result['Rotation'],
            result['Vessel'],
            result['MLO'],
            result['STV'],
            result['ContAtShed'],
            result['CargoDesc'],
            result['LandingDt'],
            result['Remarks']
          ]
        );

      row.eachCell((datacell, number) => {
        datacell.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
      });

    }

    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 10;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 25;
    worksheet.getColumn(11).width = 20;
    worksheet.getColumn(12).width = 20;
    worksheet.addRow([]);

    

    //Footer Row
    // let footerRow = worksheet.addRow([
    //   'LCL Assignment Report ' + date,
    // ]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' },
    // };

    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });

  }
  //LCL Assignment Report...Excel Ends


}
