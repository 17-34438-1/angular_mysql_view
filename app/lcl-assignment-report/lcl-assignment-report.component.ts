import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

import { ToastrService } from 'ngx-toastr';
import { LclTallyService, ROW_ITEM } from '../service/lcl-tally/lcl-tally.service';


@Component({
  selector: 'app-lcl-assignment-report',
  templateUrl: './lcl-assignment-report.component.html',
  styleUrls: ['./lcl-assignment-report.component.css']
})
export class LclAssignmentReportComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  dataForExcel: ROW_ITEM[] = [];
  myHeaders = ['ID', 'Container','Size','Height','Rotation','Vessel','MLO','STV','Cont.at Shed','Desc.of Cargo','Landing Date','Remarks'];
  // excelData: any = [];
  excelData = [
    {
      SL: 0,
      Container: '',
      Size: '',
      Height: '',
      Rotation: '',
      Vessel: '',
      MLO: '',
      STV: '',
      ContAtShed: '',
      CargoDesc: '',
      LandingDt: '',
      Remarks: '',
    }
  ];

  login_id: string;
  section: any;
  search_by: string;
  search_value: any;
  fromDate: any;
  toDate: any;
  shedNo: any;

  report: any;

  filterTerm: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  loader = true;
  calledApi = false;

  reportHead = '';
  cpaname: any = [['CHATTOGRAM PORT AUTHORITY']];
  reportname: any = [];
  header = [['Sl', 'Container', 'Size', 'Height', 'Rotation', 'Vessel', 'MLO', 'STV', 'Cont.at Shed', 'Desc.of Cargo', 'Landing Date', 'Remarks']];

  tableData: any = [];

  instructions: any = [
    ['1. All Hazardous Cargo must be removed to "P/O" shed by the Unstuffing Stevedors.'],
    ['2. Containers bearing SL .No._______   Must be unstuffed in presence of Army/ Navy/Air Force/Police Personnel and Army/ Navy/Air Force/Police cargo must be stored in the Lockfast.'],
    ['3. Containers bearing lockfast cargo must be placed near lockfast for unstuffing purpose.']
    // ['MOBILE;01 & 02 TO ensure the placement of containers in time' + '\n' + 'M/S-' + '\n' + 'Incharge/Yard No:' + '\n' + 'Incharge/CFS No:']
  ];

  signature: any = [
    [
      'MOBILE;01 & 02 TO ensure the placement of containers in time' + '\n' + 'M/S-' + '\n' + 'Incharge/Yard No:' + '\n' + 'Incharge/CFS No:',
      '__________________________________________' + '\n' + 'Terminal Officer (CFS)' + '\n' + 'Chattogram Port Authority'
    ]
  ];


  dataSerial: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
    private lclTallyService: LclTallyService
  ) {
    this.login_id = '';
    this.section = '';
    this.search_by = '';
    this.search_value = '';
    this.fromDate = '';
    this.toDate = '';
    this.shedNo = '';
  }

  ngOnInit(): void {
    if (localStorage['status'] != 1) {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      return;
    }
    this.loadReportOnPageLoad();


  }

  callApiForExcel() {
    this.login_id = localStorage['loginId'];
    var searchBy = this.search_by;

    if (searchBy == 'all') {
      this.calledApi = true;
      this.lclTallyService.lclAssignmentReport().subscribe(
        (response) => {
          this.dataSerial = 0;
          this.excelData = [];
          for (let rslt of response) {
            this.dataSerial++;
            this.excelData.push(
              {
                SL: this.dataSerial,
                Container: rslt.cont_number,
                Size: rslt.cont_size,
                Height: rslt.cont_height,
                Rotation: rslt.import_Rotation_No,
                Vessel: rslt.vessel_Name,
                MLO: rslt.mlocode,
                STV: rslt.stv,
                ContAtShed: rslt.cont_loc_shed,
                CargoDesc: rslt.description_cargo,
                LandingDt: rslt.landing_time,
                Remarks: rslt.remarks
              }
            );
          }
          
          this.dataSerial = 0;
          this.loader = false;
          this.exportToExcel();

        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (searchBy == 'rotation') {
      var imp_rot = this.search_value;
      imp_rot = imp_rot.replace("/", "_");
      this.calledApi = true;

      

      this.lclTallyService.lclAssignmentReportByRotation(imp_rot).subscribe(
        (response) => {
          this.dataSerial = 0;
          this.excelData = [];
          for (let rslt of response) {
            this.dataSerial++;
            this.excelData.push(
              {
                SL: this.dataSerial,
                Container: rslt.cont_number,
                Size: rslt.cont_size,
                Height: rslt.cont_height,
                Rotation: rslt.import_Rotation_No,
                Vessel: rslt.vessel_Name,
                MLO: rslt.mlocode,
                STV: rslt.stv,
                ContAtShed: rslt.cont_loc_shed,
                CargoDesc: rslt.description_cargo,
                LandingDt: rslt.landing_time,
                Remarks: rslt.remarks
              }
            );
          }
          
          this.dataSerial = 0;
          this.loader = false;
          this.exportToExcel();

        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'container') { 
      var cont_number = this.search_value;
      this.calledApi = true;
      this.lclTallyService.lclAssignmentReportByContainer(cont_number).subscribe(
        (response) => {
          this.dataSerial = 0;
          this.excelData = [];
          for (let rslt of response) {
            this.dataSerial++;
            this.excelData.push(
              {
                SL: this.dataSerial,
                Container: rslt.cont_number,
                Size: rslt.cont_size,
                Height: rslt.cont_height,
                Rotation: rslt.import_Rotation_No,
                Vessel: rslt.vessel_Name,
                MLO: rslt.mlocode,
                STV: rslt.stv,
                ContAtShed: rslt.cont_loc_shed,
                CargoDesc: rslt.description_cargo,
                LandingDt: rslt.landing_time,
                Remarks: rslt.remarks
              }
            );
          }
          
          this.dataSerial = 0;
          this.loader = false;
          this.exportToExcel();

        },
        (error) => {
          console.log(error);
        }
      );
    } else if (searchBy == 'dateRange') { 
      var from_date = this.fromDate;
      var to_date = this.toDate;
      this.calledApi = true;
      this.lclTallyService.lclAssignmentReportByDateRange(from_date, to_date).subscribe(
        (response) => {
          this.dataSerial = 0;
          this.excelData = [];
          for (let rslt of response) {
            this.dataSerial++;


            this.excelData.push(
              {
                SL: this.dataSerial,
                Container: rslt.cont_number,
                Size: rslt.cont_size,
                Height: rslt.cont_height,
                Rotation: rslt.import_Rotation_No,
                Vessel: rslt.vessel_Name,
                MLO: rslt.mlocode,
                STV: rslt.stv,
                ContAtShed: rslt.cont_loc_shed,
                CargoDesc: rslt.description_cargo,
                LandingDt: rslt.landing_time,
                Remarks: rslt.remarks
              }
            );


            
          }
          
          this.dataSerial = 0;
          this.loader = false;
          this.exportToExcel();

        },
        (error) => {
          console.log(error);
        }
      );
    } 
    
    else if (searchBy == 'shedNo') { 
      var shed_no = this.shedNo;
      var from_date = this.fromDate;
      var to_date = this.toDate;
      this.calledApi = true;
      this.lclTallyService.lclAssignmentReportByShed(shed_no, from_date, to_date).subscribe(
        (response) => {
          this.dataSerial = 0;
          this.excelData = [];
          for (let rslt of response) {
            this.dataSerial++;
            this.excelData.push(
              {
                SL: this.dataSerial,
                Container: rslt.cont_number,
                Size: rslt.cont_size,
                Height: rslt.cont_height,
                Rotation: rslt.import_Rotation_No,
                Vessel: rslt.vessel_Name,
                MLO: rslt.mlocode,
                STV: rslt.stv,
                ContAtShed: rslt.cont_loc_shed,
                CargoDesc: rslt.description_cargo,
                LandingDt: rslt.landing_time,
                Remarks: rslt.remarks
              }
            );
          }
          
          this.dataSerial = 0;
          this.loader = false;
          this.exportToExcel();

        },
        (error) => {
          console.log(error);
        }
      );
    }  else {
      alert('Please Select Search Criteria...');
    }
  }

  exportToExcel() {    
    this.dataForExcel = [];
    this.excelData.forEach((row: ROW_ITEM) => {
      this.dataForExcel.push(row);
    });

    let reportData = {
      title: 'LCL Assignment Report',
      data: this.dataForExcel,
      headers: Object.keys(this.excelData[0]),
      myHeaders: this.myHeaders
    };

    this.lclTallyService.exportExcel(reportData);

  }

  loadReportOnPageLoad() {
    this.calledApi = true;
    this.loader = true;
    this.section = localStorage['section'];
    this.lclTallyService.lclAssignmentReportBySection(this.section).subscribe(
      (response) => {
        this.report = response;
        this.loader = false;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  callReportApi() {
    this.login_id = localStorage['loginId'];
    var searchBy = this.search_by;
    if (searchBy == 'all') {

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReport().subscribe(
        (response) => {
          this.report = response;
          this.loader = false;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'rotation') {

      var imp_rot = this.search_value;
      imp_rot = imp_rot.replace("/", "_");
      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByRotation(imp_rot).subscribe(
        (response) => {
          this.report = response;
          this.loader = false;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'container') {

      var cont_number = this.search_value;
      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByContainer(cont_number).subscribe(
        (response) => {
          this.report = response;
          this.loader = false;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    } 
    else if (searchBy == 'dateRange') {

      var from_date = this.fromDate;
      var to_date = this.toDate;

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByDateRange(from_date, to_date).subscribe(
        (response) => {
          this.report = response;
          this.loader = false;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    } 
    
    else if (searchBy == 'shedNo') {

      var shed_no = this.shedNo;
      var from_date = this.fromDate;
      var to_date = this.toDate;

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByShed(shed_no, from_date, to_date).subscribe(
        (response) => {
          this.report = response;
          this.loader = false;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    } else {
      alert('Please Select Search Criteria...');
    }

  }

  generatePdfFile() {
    this.login_id = localStorage['loginId'];
    var searchBy = this.search_by;
    if (searchBy == 'all') {
      this.reportHead = 'LCL ASSIGNMENT REPORT' + this.search_value;
      this.reportname = [[this.reportHead]];

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReport().subscribe(
        (response) => {
          this.tableData = [];
          this.dataSerial = 0;

          for (let rslt of response) {
            this.dataSerial++;
            console.log("cont:" + rslt.cont_number);

            this.tableData.push(
              [
                this.dataSerial, rslt.cont_number, rslt.cont_size, rslt.cont_height, rslt.import_Rotation_No, rslt.vessel_Name, rslt.mlocode,
                rslt.stv, rslt.cont_loc_shed, rslt.description_cargo, rslt.landing_time, rslt.remarks
              ]
            );
          }

          this.dataSerial = 0;
          this.loader = false;
          this.viewPDF();
        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'rotation') {

      this.reportHead = 'LCL ASSIGNMENT REPORT FOR ROTATION : ' + this.search_value;
      this.reportname = [[this.reportHead]];

      var imp_rot = this.search_value;
      imp_rot = imp_rot.replace("/", "_");
      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByRotation(imp_rot).subscribe(
        (response) => {
          // this.report = response;
          this.tableData = [];
          this.dataSerial = 0;
          for (let rslt of response) {
            this.dataSerial++;
            console.log("cont:" + rslt.cont_number);

            this.tableData.push([this.dataSerial, rslt.cont_number, rslt.cont_size, rslt.cont_height, rslt.import_Rotation_No, rslt.vessel_Name, rslt.mlocode,
            rslt.stv, rslt.cont_loc_shed, rslt.description_cargo, rslt.landing_time, rslt.remarks]);
          }
          this.dataSerial = 0;
          this.loader = false;
          this.viewPDF();

        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'container') {

      this.reportHead = 'LCL ASSIGNMENT REPORT FOR THE CONTAINER : ' + this.search_value;
      this.reportname = [[this.reportHead]];

      var cont_number = this.search_value;
      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByContainer(cont_number).subscribe(
        (response) => {
          this.tableData = [];
          this.dataSerial = 0;

          for (let rslt of response) {
            this.dataSerial++;
            this.tableData.push([this.dataSerial, rslt.cont_number, rslt.cont_size, rslt.cont_height, rslt.import_Rotation_No, rslt.vessel_Name, rslt.mlocode,
            rslt.stv, rslt.cont_loc_shed, rslt.description_cargo, rslt.landing_time, rslt.remarks]);
          }

          this.dataSerial = 0;
          this.loader = false;
          this.viewPDF();
        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'dateRange') {

      var from_date = this.fromDate;
      var to_date = this.toDate;

      this.reportHead = 'LCL ASSIGNMENT REPORT BETWEEN : ' + from_date + ' AND ' + to_date;
      this.reportname = [[this.reportHead]];

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByDateRange(from_date, to_date).subscribe(
        (response) => {

          this.tableData = [];
          this.dataSerial = 0;
          for (let rslt of response) {
            this.dataSerial++;
            this.tableData.push(
              [
                this.dataSerial, rslt.cont_number, rslt.cont_size, rslt.cont_height, rslt.import_Rotation_No, rslt.vessel_Name, rslt.mlocode,
                rslt.stv, rslt.cont_loc_shed, rslt.description_cargo, rslt.landing_time, rslt.remarks
              ]
            );
          }

          this.dataSerial = 0;
          this.loader = false;
          this.viewPDF();
        },
        (error) => {
          console.log(error);
        }
      );

    } else if (searchBy == 'shedNo') {

      var shed_no = this.shedNo;
      var from_date = this.fromDate;
      var to_date = this.toDate;

      this.reportHead = 'LCL ASSIGNMENT REPORT FOR THE SHED : ' + shed_no + ' AND DATE BETWEEN ' + from_date + ' AND ' + to_date;
      this.reportname = [[this.reportHead]];

      this.calledApi = true;

      this.lclTallyService.lclAssignmentReportByShed(shed_no, from_date, to_date).subscribe(
        (response) => {

          this.tableData = [];
          this.dataSerial = 0;
          for (let rslt of response) {
            this.dataSerial++;

            this.tableData.push(
              [
                this.dataSerial, rslt.cont_number, rslt.cont_size, rslt.cont_height, rslt.import_Rotation_No, rslt.vessel_Name, rslt.mlocode,
                rslt.stv, rslt.cont_loc_shed, rslt.description_cargo, rslt.landing_time, rslt.remarks
              ]
            );
          }

          this.dataSerial = 0;
          this.loader = false;
          this.viewPDF();
        },
        (error) => {
          console.log(error);
        }
      );

    } else {
      alert('Please Select Search Criteria...');
    }
  }

  viewPDF() {
    var pdf = new jsPDF();
    // pdf.setFontSize(20);
    // pdf.text("Chattogram Port Authority", 60, 10, { baseline: 'middle' });

    autoTable(pdf, {
      head: this.cpaname,
      body: this.reportname,
      headStyles: {
        lineWidth: 0,
        fontSize: 12,
        halign: 'center'
      },
      bodyStyles: {
        lineWidth: 0,
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      theme: 'plain',
      margin: {
        top: 2
      }
    })




    autoTable(pdf, {
      head: this.header,
      body: this.tableData,
      headStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,
        halign: 'center'
      },
      theme: 'plain',
      margin: {
        left: 2,
        right: 2
      },
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })




    


    autoTable(pdf, {
      body: this.instructions,
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 10,
        halign: 'left'
      },
      theme: 'plain',
      margin: {
        left: 3,
        right: 3
      }
    })






    autoTable(pdf, {
      body: this.signature,
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 10,
        halign: 'left'
      },
      theme: 'plain',
      margin: {
        left: 3,
        right: 3
      }
    })



    pdf.output('dataurlnewwindow')
    // pdf.save('table.pdf');
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {

      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.output('dataurlnewwindow'); // page will open in new window and won't be downloaded automatically
      // PDF.save('angular-demo.pdf'); // page will open in same window and it will be downloaded automatically
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput() {
    this.page = 1;
  }

}
