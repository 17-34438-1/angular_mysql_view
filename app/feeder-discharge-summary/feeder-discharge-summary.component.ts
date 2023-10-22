import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//newly add
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeederDischargeSummaryService } from '../service/feeder-discharge-summary/feeder-discharge-summary.service';
import { ToastrService } from 'ngx-toastr';
import 'jspdf-autotable';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
// import "@fontsource/tiro-bangla";
import { runInThisContext } from 'vm';

// import 'src/assets/fonts/kalpurush-normal.js';
// import 'src/assets/fonts/Nikosh-normal.js';


//for excel code
import { style } from '@angular/animations';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Console } from 'console';
@Component({
  selector: 'app-feeder-discharge-summary',
  templateUrl: './feeder-discharge-summary.component.html',
  styleUrls: ['./feeder-discharge-summary.component.css']
})
export class FeederDischargeSummaryComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  login_id: string;
  rot_no: any;
  report_type: string;
  report: any;
  rotation: any;
  rsltLetExcel: any;
  reportHead = '';
  dataSerial: number = 0;

  //For Letter Pdf start
  //Table1
  mloWiseContainerInfoTableData: any = [];
  //For Table3
  mloAndTypeWiseContainersTable3Data12: any = [];
  //For Letter Pdf end

  //For General Pdf
  mloAndTypeWiseGrandTotallTable2Data: any = [];




  heading: any = [
    ['GENERAL INFORMATION']
  ];
  result: any;
  rsltRep: any;
  rsltExLet: any;
  rsltRepLetPdf: any;
  rsltExcelGene: any;
  formatType: any;
  rsltTotallExcell: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
    private feederService: FeederDischargeSummaryService

  ) {
    this.login_id = '';
    this.rot_no = '';
    this.report_type = '';

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

  }


  generatePdf() {
    var report_type = this.report_type;
    var imp_rot = this.rot_no;
    imp_rot = imp_rot.replace("/", "_");

    if (report_type == "pdf") {
      this.feederService.feederDischargeByRotation(imp_rot).subscribe(

        (response) => {

          this.mloWiseContainerInfoTableData = [];
          this.rsltRepLetPdf = response;
          if (this.rsltRepLetPdf.formatType == "letter") {
            for (var t = 0; t < this.rsltRepLetPdf.mloWiseContainerInfos.length; t++) {

              this.mloWiseContainerInfoTableData.push(
                [
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['agentCode'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['mloCode'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['laden20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['laden40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['empty20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['empty40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['reefer20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['reefer40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['imdg20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['imdg40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['trans20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['trans40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['pangaon20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['pangaon40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['icd20'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['icd40'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['l45'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['e45'],
                  this.rsltRepLetPdf.mloWiseContainerInfos[t]['mloWiseTotalContainer'],
                ]

              )

            }


            this.mloWiseContainerInfoTableData.push(
              [
                { content: 'Grand Total', colSpan: 2, styles: { fontStyle: 'bold' } },
                this.rsltRepLetPdf.totalLaden20, this.rsltRepLetPdf.totalLaden40, this.rsltRepLetPdf.totalEmpty20, this.rsltRepLetPdf.totalEmpty40, this.rsltRepLetPdf.totalReffer20, this.rsltRepLetPdf.totalReffer40, this.rsltRepLetPdf.totalImdg20, this.rsltRepLetPdf.totalImdg40, this.rsltRepLetPdf.totalTrans20, this.rsltRepLetPdf.totalTrans40, this.rsltRepLetPdf.totalPangaon20, this.rsltRepLetPdf.totalPangaon40, this.rsltRepLetPdf.totalIcd20, this.rsltRepLetPdf.totalIcd40, this.rsltRepLetPdf.totalL45, this.rsltRepLetPdf.totalE45, this.rsltRepLetPdf.mloWiseTotalContainerQty
              ]
            );


            //table3
            let s = 1;
            this.mloAndTypeWiseContainersTable3Data12 = [];
            for (var i = 0; i < this.rsltRepLetPdf.mloAndTypeWiseContainers.length; i++) {

              this.mloAndTypeWiseContainersTable3Data12.push(
                [
                  s++,
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['mloCode'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['fcl20'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['fcl40'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['lcl20'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['lcl40'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['icd20'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['icd40'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['empty20'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['empty40'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['box'],
                  this.rsltRepLetPdf.mloAndTypeWiseContainers[i]['teus']
                ]
              )

            }

            this.mloAndTypeWiseContainersTable3Data12.push(
              [
                { content: 'Grand Total', colSpan: 2, styles: { fontStyle: 'bold' } },
                this.rsltRepLetPdf.mloAndTypeWiseTotalFcl20, this.rsltRepLetPdf.mloAndTypeWiseTotalFcl40, this.rsltRepLetPdf.mloAndTypeWiseTotalLcl20, this.rsltRepLetPdf.mloAndTypeWiseTotalLcl40, this.rsltRepLetPdf.mloAndTypeWiseTotalIcd20, this.rsltRepLetPdf.mloAndTypeWiseTotalIcd40, this.rsltRepLetPdf.mloAndTypeWiseTotalEmpty20, this.rsltRepLetPdf.mloAndTypeWiseTotalEmpty40, this.rsltRepLetPdf.mloAndTypeWiseTotalBox, this.rsltRepLetPdf.mloAndTypeWiseTotalTeus
              ]
            );

            this.viewLetterPdf();
            this.resetForm()
          } else if (this.rsltRepLetPdf.formatType == "general") {
            this.mloAndTypeWiseGrandTotallTable2Data = [];
            this.mloAndTypeWiseGrandTotallTable2Data.push(
              [
                { content: 'Grand Total', colSpan: 2, styles: { fontStyle: 'bold' } },
                this.rsltRepLetPdf.mloAndTypeWiseTotalFcl20, this.rsltRepLetPdf.mloAndTypeWiseTotalFcl40, this.rsltRepLetPdf.mloAndTypeWiseTotalLcl20, this.rsltRepLetPdf.mloAndTypeWiseTotalLcl40, this.rsltRepLetPdf.mloAndTypeWiseTotalIcd20, this.rsltRepLetPdf.mloAndTypeWiseTotalIcd40, this.rsltRepLetPdf.mloAndTypeWiseTotalEmpty20, this.rsltRepLetPdf.mloAndTypeWiseTotalEmpty40, this.rsltRepLetPdf.mloAndTypeWiseTotalBox, this.rsltRepLetPdf.mloAndTypeWiseTotalTeus
              ]
            );
            this.viewGeneralReportPdf();
              this.resetForm();
          } else {
            alert(this.rsltRepLetPdf.message);
          }

        },
        (error) => {
          console.log(error);
        }
      );


    } else if (report_type == "excel") {
      this.feederService.feederDischargeByRotation(imp_rot).subscribe(

        (response) => {
          this.rsltTotallExcell = response;

          if (this.rsltTotallExcell.formatType == "letter") {
            this.exportExcelLetter();
            this.resetForm()
          }else if(this.rsltTotallExcell.formatType == "general"){
            this.exportExcelGeneral();
            this.resetForm();
          }else{
            alert(this.rsltTotallExcell.message);
          }

        },
        (error) => {
          console.log(error);
        }
      );
    }else{
     alert("Please Select The Pdf or Excel");
    }



  }




  public viewGeneralReportPdf() {

    let pdf = new jsPDF()

    // for head 0ne
    autoTable(pdf, {
      head: this.heading,
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 10,
      }, theme: 'plain',

      margin: {
        left: 3,
        right: 4,
      },

    })

    // paargrap1
    autoTable(pdf, {
      body: [['Vessel Name: ' + ' ' + this.rsltRepLetPdf.vesselName + '\t\t\t\t ' + 'Rotation No:' + ' ' + this.rsltRepLetPdf.rotation]],
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 10,
        font: 'Times-Roman'
      },
      theme: 'plain',
      margin: {
        left: 3,
        right: 4,
      }
    })


    //table1
    autoTable(pdf, {
      head: [['Total Number Of BL', 'Total Number Of Packages ', 'Total Number Of Containers', 'Total Gross Mass']],
      body: [[this.rsltRepLetPdf.totalBls, this.rsltRepLetPdf.totalPackage, this.rsltRepLetPdf.totalContainers, this.rsltRepLetPdf.totalGrossMass]],
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
        right: 2,
        // top:10
      },
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })



    //  vessel voyage Rotation
    autoTable(pdf, {
      body: [['Vessel: ' + ' ' + this.rsltRepLetPdf.vesselName + '\t\t\t\t\t\t ' + 'Voyage No: ' + '' + '\t\t\t\t\t\t' + 'Rot No:' + ' ' + this.rsltRepLetPdf.rotation]],
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 8,
        halign: 'left',
      },
      theme: 'plain',
      margin: {
        left: 6,
        right: 2
      }
    })


    //mloAndTypeWiseContainers table
    autoTable(pdf, {

      head: [
        [{ content: 'Sl No.', rowSpan: 2, styles: { halign: 'center' } }, { content: 'MLO.', rowSpan: 2, styles: { halign: 'left' } }, { content: 'FCL', colSpan: 2, styles: { halign: 'center' } }, { content: 'LCL', colSpan: 2, styles: { halign: 'center' } }, { content: 'ICD', colSpan: 2, styles: { halign: 'center' } }, { content: 'Empty', colSpan: 2, styles: { halign: 'center' } }, { content: 'BOX', rowSpan: 2, styles: { halign: 'center' } }, { content: 'TEUS ', rowSpan: 2, styles: { halign: 'center' } }],
        ["20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'"]
      ]
      ,
      headStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0,],
        fillColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        valign: 'middle'
      },

      body: this.mloAndTypeWiseGrandTotallTable2Data,


      styles: {
        halign: 'center',
        fontSize: 8,
        textColor: [0, 0, 0,],
        lineColor: [0, 0, 0],


      },
      theme: 'grid',
      margin: {
        left: 2,
        right: 2,
        top: 10

      }

    })

    autoTable(pdf, {
      body: [
        ['১/ অত্র জাহাজের সকল OPEN TOP, FLAT RACK কন্টেইনার CCT ইয়ার্ডের নির্দিষ্ট স্লটে সংরক্ষণ করে মেমোর ' + '\n' + 'মাধ্যমে ASI/SI কে হ্যান্ডওভার করতে হবে| বাকি সকল বুলেটসীলযুক্ত  কন্টেইনার সংশ্লিষ্ট ইয়ার্ডে সংরক্ষণ করে R/L এর' + '\n' + 'এর ওপর নিরাপত্তারক্ষী কর্মচারীর রিসিভিং স্বাক্ষর নিতে হবে'],
        ['২/ডিস চার্জিং  লিস্টে প্রাইভেট ডিপো নির্দেশিত ৩৭ আইটেম কন্টেইনারগুলি CTMS পদ্ধতি অনুসরণ করে সংশ্লিষ্ট ডিপোতে ' + '\n' + 'প্রেরণ করতে হবে'],
        ['৩/ Highly Perishable, Onion, Garlic, Ginger & Dates জাতীয় পণ্য DRY কন্টেইনারে পরিবাহিত হলে'],
        ['সেগুলো অবতরণের জন্য অত্র দপ্তর থেকে আলাদা ভাবে অনুমতি নিতে হবে'],
        ['৪/ MLO _______________ ICT Pangaon Container NCT ইয়ার্ডে পানগাঁও স্লটে সংরক্ষণ করতে হবে']
      ]
      ,
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 10,
        halign: 'left',
        font: 'Kalpurush',
        // font: 'SolaimanLipi'
        // font: 'Nikosh'
        // font: 'Siyamrupali'
        // font: "Anek Bangla"

      },
      theme: 'plain',
      margin: {
        left: 3,
        right: 3
      }

    })


    pdf.output('dataurlnewwindow');
    // this.resetForm();
  }


  public viewLetterPdf() {
    const pdf = new jsPDF();

    autoTable(pdf, {

      body: [
        ['TO' + '\n' + 'TERMINAL MANAGER' + '\n' + "CHITTAGONG PORT AUTHORITY" + '\n' + 'SUB : Permission For Discharging Import Container' + '\n' + ['From / To Vessel : ' + this.rsltRepLetPdf.vesselName + '\t' + 'Voyage No -' + this.rsltRepLetPdf.voyageNo] + '\n\n' + ['Imp.Rot.No -' + this.rsltRepLetPdf.rotation + '\t' + 'Arrival Date :']
          + '\n\n' + ['Dear sir'] + '\n' + ['We would like to inform you that we as operator of the above vessel herewith enclose the list of imp.containers of'] + '\n' + ['following MLO,s']
        ],
      ],

      bodyStyles: {
        lineWidth: 0,
        fontSize: 8,
        halign: 'left',
        cellPadding: 5,

      },
      theme: 'plain',
      margin: {
        top: 2,
        left: 2
      },

    })

    //for Arrival Date Borders
    autoTable(pdf, {
      body: [
        ['']
      ],
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,

      },
      startY: 24,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      theme: 'plain',
      margin: {
        left: 60,
        right: 120
      },
      didDrawCell: data => {
        // console.log(data.column.index)
      }
    })

    //mloWiseContInfoTable Starts
    autoTable(pdf, {
      head: [
        [{ content: 'Agent CODE' }, { content: 'MLO CODE' }, { content: 'LADEN', colSpan: 2 }, { content: 'EMPTY', colSpan: 2 }, { content: 'REFFER', colSpan: 2 }, { content: 'IMDG', colSpan: 2 }, { content: 'TRANS', colSpan: 2 }, { content: 'PANGAON ', colSpan: 2 }, { content: 'ICD ', colSpan: 2 }, { content: '45 ', colSpan: 2 }, { content: 'TOTAL ' }],
        ['', '', "20'", "40'", "20'", "40", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", 'L', 'E']
      ],
      body: this.mloWiseContainerInfoTableData,


      headStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,
        fontStyle: 'bold',
        halign: 'center',
        cellWidth: 'auto',
        valign: "middle"
      },
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,
        halign: 'center',
        cellWidth: 'auto'
      },
      startY: 70,
      theme: 'plain',
      margin: {
        left: 2,
        right: 2
      },
      didDrawCell: data => {
        // console.log(data.column.index)
      }
    })




    autoTable(pdf, {
      body: [['Vessels Berth Operator :' + ' SAIF POWERTEC LIMITED']],
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 8,
        halign: 'left'

      },
      theme: 'plain',
      startY: 115,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      margin: {
        left: 2,
        right: 2
      }

    }),


      //for birthShip Borders
      autoTable(pdf, {
        body: [
          ['']
        ],
        bodyStyles: {
          lineWidth: 0.3,
          lineColor: [0, 0, 0],
          fontSize: 8,

        },
        startY: 195,
        showHead: 'firstPage',
        styles: { overflow: 'hidden' },
        theme: 'plain',
        margin: {
          left: 40,
          right: 150
        },
        // didDrawCell: data => {
        //   // console.log(data.column.index)
        // }
      })

    //for right two cells border start here

    autoTable(pdf, {
      body: [
        ['']
      ],
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,
        // halign: 'right',

      },
      startY: 130,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      theme: 'plain',
      margin: {
        left: 155,
        right: 20
      },
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })

    autoTable(pdf, {

      body: [
        ['BOXES =']
      ],
      theme: 'plain',

      bodyStyles: {
        fontSize: 9,
      },
      startY: 130,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      margin: {
        left: 135,
        right: 55

      },
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })


    autoTable(pdf, {
      body: [
        ['']
      ],
      bodyStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        fontSize: 8,


      },
      startY: 140,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      theme: 'plain',
      margin: {
        left: 155,
        right: 20
      },
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })
    autoTable(pdf, {

      body: [
        ['  TEUS    =']
      ],
      theme: 'plain',

      bodyStyles: {
        fontSize: 9,
      },
      startY: 140,
      showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      margin: {
        left: 135,
        right: 55

      },
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })


    // for right two cells border end


    autoTable(pdf, {
      head: [['', '20', '40', 'BOX', 'TUES']],
      headStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0,],
        fillColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',

      },
      body: [
        ['FCL', this.rsltRepLetPdf.fcl20, this.rsltRepLetPdf.fcl40, this.rsltRepLetPdf.fclBox, this.rsltRepLetPdf.fclTeus],
        ['LCL', this.rsltRepLetPdf.lcl20, this.rsltRepLetPdf.lcl40, this.rsltRepLetPdf.lclBox, this.rsltRepLetPdf.lclTeus],
        ['ICD', this.rsltRepLetPdf.icd20, this.rsltRepLetPdf.icd40, this.rsltRepLetPdf.icdBox, this.rsltRepLetPdf.icdTeus],
        ['REFFER', this.rsltRepLetPdf.reefer20, this.rsltRepLetPdf.reefer40, this.rsltRepLetPdf.reeferBox, this.rsltRepLetPdf.reeferTeus],
        ['PNG', this.rsltRepLetPdf.png20, this.rsltRepLetPdf.png40, this.rsltRepLetPdf.pngBox, this.rsltRepLetPdf.pngTeus],
        ['DEPOT', this.rsltRepLetPdf.depot20, this.rsltRepLetPdf.depot40, this.rsltRepLetPdf.depotBox, this.rsltRepLetPdf.depotTeus],
        ['EMPTY', this.rsltRepLetPdf.empty20, this.rsltRepLetPdf.empty40, this.rsltRepLetPdf.emptyBox, this.rsltRepLetPdf.emptyTeus],
        ['TOTAL', this.rsltRepLetPdf.total20, this.rsltRepLetPdf.total40, this.rsltRepLetPdf.totalBox, this.rsltRepLetPdf.totalTeus],


      ], bodyStyles: {
        textColor: [0, 0, 0,],
        lineColor: [0, 0, 0],

      },
      theme: 'grid',

      startY: 150,
      showHead: 'firstPage',
      styles: {
        overflow: 'hidden',

      },
      margin: {
        left: 107
      },
    });

    // doc.setPage(pageNumber)

    autoTable(pdf, {
      body: [
        ['1)Container Control  SEC.'],
        ['2)Computer to TI/Cont Billing.'],
        ['3)B.M.S.O.T.R SEC'],
        ['4)Office Supdt Accounts Sec'],
        ['5)Vessels Berth Operator: SAIF POWERTEC LIMITED '],
        ['6)AGENT MCC TRANSPORT'],
        ['7)Berth/Ship -'],
        ['8)ALL MLO,s-2']

      ],
      bodyStyles: {
        fontSize: 10,
      },
      theme: 'plain',
      startY: 150,
      // showHead: 'firstPage',
      styles: { overflow: 'hidden' },
      margin: { right: 107 },
    });

    //  vessel voyage Rotation
    autoTable(pdf, {
      body: [['Vessel : ' + ' ' + this.rsltRepLetPdf.vesselName + '\t\t\t\t\t\t ' + 'Voyage No :' + this.rsltRepLetPdf.voyageNo + '\t\t\t\t' + 'Rot No :' + ' ' + this.rsltRepLetPdf.rotation]],
      startY: 250,
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 8,
        halign: 'left',
      },

      theme: 'plain',
      margin: {
        left: 6,
        right: 2
      }

    })


    autoTable(pdf, {

      head: [
        [{ content: 'Sl No.', rowSpan: 2, styles: { halign: 'center' } }, { content: 'MLO', rowSpan: 2 }, { content: 'FCL', colSpan: 2, styles: { halign: 'center' } }, { content: 'LCL', colSpan: 2, styles: { halign: 'center' } }, { content: 'ICD', colSpan: 2, styles: { halign: 'center' } }, { content: 'Empty', colSpan: 2, styles: { halign: 'center' } }, { content: 'BOX', rowSpan: 2, styles: { halign: 'center' } }, { content: 'TEUS ', rowSpan: 2, styles: { halign: 'center' } }],
        ["20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'"],
      ]
      ,

      // theme: 'grid',
      headStyles: {
        lineWidth: 0.3,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0,],
        fillColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        valign: 'middle'

      },
      body: this.mloAndTypeWiseContainersTable3Data12,


      startY: 280,
      // showHead: 'firstPage',
      styles: {
        halign: 'center',
        fontSize: 8,
        textColor: [0, 0, 0,],
        lineColor: [0, 0, 0],
        overflow: 'hidden'
      },
      theme: 'grid',
      margin: {
        left: 2,
        right: 2,
        top: 10
      }

    })


    autoTable(pdf, {
      body: [
        ['১/ অত্র জাহাজের সকল OPEN TOP, FLAT RACK কন্টেইনার CCT ইয়ার্ডের নির্দিষ্ট স্লটে সংরক্ষণ করে মেমোর ' + '\n' + 'মাধ্যমে ASI/SI কে হ্যান্ডওভার করতে হবে| বাকি সকল বুলেটসীলযুক্ত  কন্টেইনার সংশ্লিষ্ট ইয়ার্ডে সংরক্ষণ করে R/L এর' + '\n' + 'এর ওপর নিরাপত্তারক্ষী কর্মচারীর রিসিভিং স্বাক্ষর নিতে হবে'],
        ['২/ডিস চার্জিং  লিস্টে প্রাইভেট ডিপো নির্দেশিত ৩৭ আইটেম কন্টেইনারগুলি CTMS পদ্ধতি অনুসরণ করে সংশ্লিষ্ট ডিপোতে ' + '\n' + 'প্রেরণ করতে হবে'],
        ['৩/ Highly Perishable, Onion, Garlic, Ginger & Dates জাতীয় পণ্য DRY কন্টেইনারে পরিবাহিত হলে'],
        ['সেগুলো অবতরণের জন্য অত্র দপ্তর থেকে আলাদা ভাবে অনুমতি নিতে হবে'],
        ['৪/ MLO _______________ ICT Pangaon Container NCT ইয়ার্ডে পানগাঁও স্লটে সংরক্ষণ করতে হবে']
      ]
      ,
      bodyStyles: {
        lineWidth: 0,
        lineColor: [0, 0, 0],
        fontSize: 10,
        halign: 'left',
        font: 'Kalpurush',
        // font:'SolaimanLipi'
      },
      theme: 'plain',
      margin: {
        left: 3,
        right: 3
      }

    })

    pdf.output('dataurlnewwindow');

  }





  exportExcelGeneral() {


    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('sheet');
    //Title
    worksheet.mergeCells('C1', 'D1')
    let genTitleSale1 = worksheet.getCell('C1', 'D1');
    genTitleSale1.value = "GENERAL INFORMATION";
    genTitleSale1.font = { bold: true };
    genTitleSale1.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.addRow([]);
    worksheet.addRow([]);
    let shiftTitle = worksheet.addRow(["", "vessel:", this.rsltTotallExcell.vesselName, "Rotation:", this.rsltTotallExcell.rotation]);
    shiftTitle.alignment = { vertical: 'top', horizontal: 'left' };
    shiftTitle.font = { bold: true };
    worksheet.addRow([]);

    worksheet.addRow([]);


    //Adding Header Row
    let headerRow = worksheet.addRow(["Total Number Of BL", "Total Number Of Packages", "Total Number Of Containers", "Total Gross Mass"]);
    headerRow.font = { bold: true };
    shiftTitle.alignment = { horizontal: 'left' };
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    let tableReportTable1 = [this.rsltTotallExcell.totalBls, this.rsltTotallExcell.totalPackage, this.rsltTotallExcell.totalContainers, this.rsltTotallExcell.totalGrossMass]
    let tableReportTableRow = worksheet.addRow(tableReportTable1);

    tableReportTableRow.eachCell((cell, number) => {
      tableReportTableRow.font = { bold: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    });


    worksheet.addRow([]);



    let emptyRow = worksheet.addRow([]);
    emptyRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };

    });

    let VessVoyRot = worksheet.addRow(["", "vessel:", this.rsltTotallExcell.vesselName, "Voyage No:", this.rsltTotallExcell.voyageNo, "Rotation:", this.rsltTotallExcell.rotation]);
    VessVoyRot.alignment = { vertical: 'top', horizontal: 'center' };
    VessVoyRot.font = { bold: true };
    worksheet.addRow([]);

    worksheet.getColumn(1).width = 21;
    worksheet.getColumn(2).width = 28;
    worksheet.getColumn(3).width = 26;
    worksheet.getColumn(4).width = 28;
    worksheet.addRow([]);
    worksheet.addRow([]);


    //   for Report table-2
    //add column name
    let header1 = ["SL No.", "MLO", "FCL", "", "LCL", "", "ICD", "", "EMPTY", "", "BOX", "TEUS"]
    let headerRow1 = worksheet.addRow(header1);
    // SL No
    let sales1 = headerRow1.getCell(1);
    sales1.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
    sales1.alignment = { vertical: 'middle', horizontal: 'center' }

    // MLO
    let sales2 = headerRow1.getCell(2);
    sales2.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
    sales2.alignment = { vertical: 'middle', horizontal: 'center' }

    //FCL
    let sales3 = headerRow1.getCell(3);
    sales3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' } };
    sales3.alignment = { vertical: 'middle', horizontal: 'right' }

    let sales4 = headerRow1.getCell(4);
    sales4.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales4.alignment = { vertical: 'middle', horizontal: 'center' }

    //LCL
    let sales5 = headerRow1.getCell(5);
    sales5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' } };
    sales5.alignment = { vertical: 'middle', horizontal: 'right' }

    let sales6 = headerRow1.getCell(6);
    sales6.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales6.alignment = { vertical: 'middle', horizontal: 'right' }


    //for ICD
    let sales7 = headerRow1.getCell(7);
    sales7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' } };
    sales7.alignment = { vertical: 'middle', horizontal: 'right' }

    let sales8 = headerRow1.getCell(8);
    sales8.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales8.alignment = { vertical: 'middle', horizontal: 'right' }
    //Empty

    let sales9 = headerRow1.getCell(9);
    sales9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' } };
    sales9.alignment = { vertical: 'middle', horizontal: 'right' }

    let sales10 = headerRow1.getCell(10);
    sales10.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales10.alignment = { vertical: 'middle', }

    //forbox
    let sales11 = headerRow1.getCell(11);
    sales11.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
    sales11.alignment = { vertical: 'middle', horizontal: 'center' }

    //for TEUS
    let sales12 = headerRow1.getCell(12);
    sales12.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
    sales12.alignment = { vertical: 'middle', horizontal: 'center' }

    headerRow1.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '' },
        bgColor: { argb: '' },
      };

    });


    let header2 = ["", "", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'"]
    let headerRow2 = worksheet.addRow(header2);
    // SL No
    let sales21 = headerRow2.getCell(1);
    sales21.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // MLO
    let sales22 = headerRow2.getCell(2);
    sales22.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales22.alignment = { vertical: 'middle', horizontal: 'center' }
    let sales23 = headerRow2.getCell(3);
    sales23.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales23.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales24 = headerRow2.getCell(4);
    sales24.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales24.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales25 = headerRow2.getCell(5);
    sales25.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales25.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales26 = headerRow2.getCell(6);
    sales26.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales26.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales27 = headerRow2.getCell(7);
    sales27.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales27.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales28 = headerRow2.getCell(8);
    sales28.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales28.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales29 = headerRow2.getCell(9);
    sales29.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales29.alignment = { vertical: 'middle', horizontal: 'center' }

    let sales210 = headerRow2.getCell(10);
    sales210.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    sales210.alignment = { vertical: 'middle', horizontal: 'center' }

    //forbox
    let sales211 = headerRow2.getCell(11);
    sales211.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    //for TUES
    let sales212 = headerRow2.getCell(12);
    sales212.border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    headerRow2.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '' },
        bgColor: { argb: '' },
      };

    });


    let grandTotallRow1 = worksheet.addRow(["Grand Total", "", this.rsltTotallExcell.mloAndTypeWiseTotalFcl20, this.rsltTotallExcell.mloAndTypeWiseTotalFcl40, this.rsltTotallExcell.mloAndTypeWiseTotalLcl20, this.rsltTotallExcell.mloAndTypeWiseTotalLcl40, this.rsltTotallExcell.mloAndTypeWiseTotalIcd20, this.rsltTotallExcell.mloAndTypeWiseTotalIcd40, this.rsltTotallExcell.mloAndTypeWiseTotalEmpty20, this.rsltTotallExcell.mloAndTypeWiseTotalEmpty40, this.rsltTotallExcell.mloAndTypeWiseTotalBox, this.rsltTotallExcell.mloAndTypeWiseTotalTeus]);

    //grandtotall rowspan start

    let salesGrandTotal1 = grandTotallRow1.getCell(1);
    salesGrandTotal1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' } };
    salesGrandTotal1.alignment = { vertical: 'middle', horizontal: 'right' }

    let salesGrandTotal2 = grandTotallRow1.getCell(2);
    salesGrandTotal2.border = { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } };
    salesGrandTotal2.alignment = { vertical: 'middle', horizontal: 'center' }

    //grandtotall rowspan End
    let salesGrandTotal3 = grandTotallRow1.getCell(3);
    salesGrandTotal3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal3.alignment = { vertical: 'middle', horizontal: 'center' }

    let salesGrandTotal4 = grandTotallRow1.getCell(4);
    salesGrandTotal4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal4.alignment = { vertical: 'middle', horizontal: 'center' }

    let salesGrandTotal5 = grandTotallRow1.getCell(5);
    salesGrandTotal5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal5.alignment = { vertical: 'middle', horizontal: 'center' }

    let salesGrandTotal6 = grandTotallRow1.getCell(6);
    salesGrandTotal6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal6.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal7 = grandTotallRow1.getCell(7);
    salesGrandTotal7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal7.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal8 = grandTotallRow1.getCell(8);
    salesGrandTotal8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal8.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal9 = grandTotallRow1.getCell(9);
    salesGrandTotal9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal9.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal10 = grandTotallRow1.getCell(10);
    salesGrandTotal10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal10.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal11 = grandTotallRow1.getCell(11);
    salesGrandTotal11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal11.alignment = { vertical: 'middle', horizontal: 'center' }
    let salesGrandTotal12 = grandTotallRow1.getCell(12);
    salesGrandTotal12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    salesGrandTotal12.alignment = { vertical: 'middle', horizontal: 'center' }



    grandTotallRow1.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '' },
        bgColor: { argb: '' },
      };

    });



    worksheet.addRow([]);
    worksheet.addRow([]);

    //instruction
    worksheet.mergeCells('A21', 'I21')
    let inst1Sale1 = worksheet.getCell('A21', 'I21');
    inst1Sale1.value = "১/ অত্র জাহাজের সকল OPEN TOP, FLAT RACK কন্টেইনার CCT ইয়ার্ডের নির্দিষ্ট স্লটে সংরক্ষণ করে মেমোর";
    inst1Sale1.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A22', 'I22')
    let inst2Sale2 = worksheet.getCell('A22', 'I22');
    inst2Sale2.value = "মাধ্যমে ASI/SI কে হ্যান্ডওভার করতে হবে| বাকি সকল বুলেটসীলযুক্ত  কন্টেইনার সংশ্লিষ্ট ইয়ার্ডে সংরক্ষণ করে R/L এর ";
    inst2Sale2.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A23', 'I23')
    let inst3Sale3 = worksheet.getCell('A23', 'I23');
    inst3Sale3.value = "ওপর নিরাপত্তারক্ষী / কর্মচারীর রিসিভিং স্বাক্ষর নিতে হবে |";
    inst3Sale3.alignment = { horizontal: 'left' }
    worksheet.mergeCells('A24', 'I24')
    let inst4Sale4 = worksheet.getCell('A24', 'I24');
    inst4Sale4.value = "২/ডিসচার্জিং  লিস্টে প্রাইভেট ডিপো নির্দেশিত ৩৭ আইটেম কন্টেইনারগুলি CTMS পদ্ধতি অনুসরণ করে সংশ্লিষ্ট ডিপোতে";
    inst4Sale4.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A25', 'I25')
    let inst5Sale5 = worksheet.getCell('A25', 'I25');
    inst5Sale5.value = "প্রেরণ করতে হবে";
    inst5Sale5.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A26', 'I26')
    let inst6Sale6 = worksheet.getCell('A26', 'I26');
    inst6Sale6.value = "৩/ Highly Perishable, Onion, Garlic, Ginger & Dates জাতীয় পণ্য DRY কন্টেইনারে পরিবাহিত হলে";
    inst6Sale6.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A27', 'I27')
    let inst7Sale7 = worksheet.getCell('A27', 'I27');
    inst7Sale7.value = "সেগুলো অবতরণের জন্য অত্র দপ্তর থেকে আলাদা ভাবে অনুমতি নিতে হবে";
    inst7Sale7.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A28', 'I28')
    let inst8Sale8 = worksheet.getCell('A28', 'I28');
    inst8Sale8.value = "৪/ MLO _______________ ICT Pangaon Container NCT ইয়ার্ডে পানগাঁও স্লটে সংরক্ষণ করতে হবে";
    inst8Sale8.alignment = { horizontal: 'left' };



    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'FEEDER_DISCHARGE_Summary_List' + '.xlsx');
      location.reload();
    });
    this.resetForm();

  }

  exportExcelLetter() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('sheet');

    //for letter heading Instruction
    worksheet.mergeCells('A1');
    let toHead1 = worksheet.getCell('A1');
    toHead1.value = "To";
    worksheet.mergeCells('A2', 'B2');
    let terminalManazerHead2 = worksheet.getCell('A2', 'B2');
    terminalManazerHead2.value = "TERMINAL MANAGER";
    worksheet.mergeCells('A3', 'B3');
    let cpaHead4 = worksheet.getCell('A3', 'B3')
    cpaHead4.value = "CHITTAGONG PORT AUTHORITY"
    worksheet.mergeCells('A4', 'D4');
    let subHead5 = worksheet.getCell('A4', 'D4');
    subHead5.value = "SUB : Permission For Discharging Import Container";
    worksheet.mergeCells('A5', 'F5')
    let vesselAndVoyageHead6 = worksheet.getCell('A5', 'F5')
    vesselAndVoyageHead6.value = 'From / To Vessel : ' + this.rsltTotallExcell.vesselName + '     ' + 'Voyage No -' + this.rsltTotallExcell.voyageNo;
    vesselAndVoyageHead6.font = { bold: true };
    worksheet.mergeCells('A6', 'B6');
    let rotAndArrivalDateHead7 = worksheet.getCell('A6', 'B6');
    rotAndArrivalDateHead7.value = 'Imp.Rot.No -' + this.rsltTotallExcell.rotation + '        ' + 'Arrival Date :'
    rotAndArrivalDateHead7.font = { bold: true };
    worksheet.mergeCells('C6', 'D6');
    let rotAndArrivalDateBorder = worksheet.getCell('C6', 'D6');
    rotAndArrivalDateBorder.font = { bold: true };
    rotAndArrivalDateBorder.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    worksheet.mergeCells('A7');
    let dearSirHead8 = worksheet.getCell('A7');
    dearSirHead8.value = "Dear sir";
    worksheet.mergeCells('A8', 'I8');
    let weWouldSirHead9 = worksheet.getCell('A8', 'I8');
    weWouldSirHead9.value = "We would like to inform you that we as operator of the above vessel herewith enclose the list of imp.containers of";
    worksheet.mergeCells('A9', 'B9');
    let followingMloHead10 = worksheet.getCell('A9', 'B9');
    followingMloHead10.value = "following MLO,s";

    worksheet.addRow([]);
    worksheet.addRow([]);



    worksheet.mergeCells('A14')
    let agentCodeHead1 = worksheet.getCell('A14')
    agentCodeHead1.value = "Agent CODE"
    agentCodeHead1.font = { bold: true };
    agentCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    worksheet.mergeCells('B14')
    let mloCodeHead1 = worksheet.getCell('B14')
    mloCodeHead1.value = "MLO CODE"
    mloCodeHead1.font = { bold: true };
    mloCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };
    mloCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    worksheet.mergeCells('C14', 'D14')
    let ladenCodeHead1 = worksheet.getCell('C14', 'D14');
    ladenCodeHead1.value = "LADEN";
    ladenCodeHead1.font = { bold: true };
    ladenCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    ladenCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.mergeCells('E14', 'F14')
    let emptyCodeHead1 = worksheet.getCell('E14', 'F14');
    emptyCodeHead1.value = "EMPTY";
    emptyCodeHead1.font = { bold: true };
    emptyCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G14', 'H14')
    let referCodeHead1 = worksheet.getCell('G14', 'H14');
    referCodeHead1.value = "REFFER";
    referCodeHead1.font = { bold: true };
    referCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    referCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I14', 'J14')
    let imdgCodeHead1 = worksheet.getCell('I14', 'J14');
    imdgCodeHead1.value = "IMDG";
    imdgCodeHead1.font = { bold: true };
    imdgCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    imdgCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('K14', 'L14')
    let transCodeHead1 = worksheet.getCell('K14', 'L14');
    transCodeHead1.value = "TRANS";
    transCodeHead1.font = { bold: true };
    transCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    transCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('M14', 'N14')
    let panagaonCodeHead1 = worksheet.getCell('M14', 'N14');
    panagaonCodeHead1.value = "PANGAON";
    panagaonCodeHead1.font = { bold: true };
    panagaonCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    panagaonCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('O14', 'P14')
    let icdCodeHead1 = worksheet.getCell('O14', 'P14');
    icdCodeHead1.value = "ICD";
    icdCodeHead1.font = { bold: true };
    icdCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icdCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('Q14', 'R14')
    let four5CodeHead1 = worksheet.getCell('Q14', 'R14');
    four5CodeHead1.value = "45'";
    four5CodeHead1.font = { bold: true };
    four5CodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    four5CodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('S14')
    let totallCodeHead1 = worksheet.getCell('S14');
    totallCodeHead1.value = "Totall";
    totallCodeHead1.font = { bold: true };
    totallCodeHead1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totallCodeHead1.alignment = { vertical: 'middle', horizontal: 'center' };

    //Start Letter1 Table1

    // // header2
    let mloWiseConInfoTableHeader2 = ["", "", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "20'", "40'", "L", "E", ""]
    let mloWiseConInfoTableHeaderRow2 = worksheet.addRow(mloWiseConInfoTableHeader2);


    mloWiseConInfoTableHeaderRow2.eachCell((cell, number) => {
      mloWiseConInfoTableHeaderRow2.font = { bold: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '' },
        bgColor: { argb: '' },
      };
    });



    for (var x = 0; x < this.rsltTotallExcell.mloWiseContainerInfos.length; x++) {
      let mloWiseContainerInfoExcelLetterTable1Data=worksheet.addRow(
        [
          this.rsltTotallExcell.mloWiseContainerInfos[x]['agentCode'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['mloCode'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['laden20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['laden40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['empty20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['empty40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['reefer20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['reefer40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['imdg20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['imdg40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['trans20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['trans40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['pangaon20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['pangaon40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['icd20'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['icd40'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['l45'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['e45'],
          this.rsltTotallExcell.mloWiseContainerInfos[x]['mloWiseTotalContainer'],

        ]
      )
      mloWiseContainerInfoExcelLetterTable1Data.eachCell((cell, number) => {
        mloWiseContainerInfoExcelLetterTable1Data.font = { bold: true };
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '' },
            bgColor: { argb: '' },
          };
        });

    }






    let mloWiseConInfosGrandTitleRow1 = worksheet.addRow(["Grand Total","", this.rsltTotallExcell.totalLaden20, this.rsltTotallExcell.totalLaden40, this.rsltTotallExcell.totalEmpty20, this.rsltTotallExcell.totalEmpty40, this.rsltTotallExcell.totalReffer20, this.rsltTotallExcell.totalReffer40, this.rsltTotallExcell.totalImdg20, this.rsltTotallExcell.totalImdg40, this.rsltTotallExcell.totalTrans20, this.rsltTotallExcell.totalTrans40, this.rsltTotallExcell.totalPangaon20, this.rsltTotallExcell.totalPangaon40, this.rsltTotallExcell.totalIcd20, this.rsltTotallExcell.totalIcd40, this.rsltTotallExcell.totalL45, this.rsltTotallExcell.totalE45, this.rsltTotallExcell.mloWiseTotalContainerQty
    ]);
    mloWiseConInfosGrandTitleRow1.eachCell((cell, number) => {
      mloWiseConInfosGrandTitleRow1.font = { bold: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '' },
        bgColor: { argb: '' },
      };
    });





    //vessel berth operator

    worksheet.mergeCells('A21', 'B21')
    let vesselsBerthSale1 = worksheet.getCell('A21', 'B21')
    vesselsBerthSale1.value = "Vessels Berth Operator : SAIF POWERTEC LIMITED"


    //Right Side Two cells
    //Boxes Border
    worksheet.mergeCells('I25')
    let boxesBOrderSale1 = worksheet.getCell('I25')
    boxesBOrderSale1.value = "BOXES ="
    boxesBOrderSale1.font = { bold: true };
    worksheet.mergeCells('J25')
    let boxesBOrderSale = worksheet.getCell('J25')
    boxesBOrderSale.font = { bold: true };
    boxesBOrderSale.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    boxesBOrderSale.alignment = { vertical: 'middle', horizontal: 'center' };

    //For TEUS
    worksheet.mergeCells('I27')
    let tuesBOrderSale1 = worksheet.getCell('I27')
    tuesBOrderSale1.value = "TEUS ="
    tuesBOrderSale1.font = { bold: true };

    worksheet.mergeCells('J27')
    let tuesBOrderSale = worksheet.getCell('J27')
    tuesBOrderSale.font = { bold: true };
    tuesBOrderSale.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    tuesBOrderSale.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.mergeCells('B30', 'C30')
    let conConSecSale1 = worksheet.getCell('B30', 'C30')
    conConSecSale1.value = "1)Container Control SEC"
    conConSecSale1.font = { bold: true };
    worksheet.mergeCells('B31', 'C31')
    let comBillcSale2 = worksheet.getCell('B31', 'C31')
    comBillcSale2.value = "2)Computer to TI/Cont Billing."
    comBillcSale2.font = { bold: true };

    worksheet.mergeCells('B32', 'C32')
    let bmsotSale3 = worksheet.getCell('B32', 'C32')
    bmsotSale3.value = "3)B.M.S.O.T.R SEC"
    bmsotSale3.font = { bold: true };
    worksheet.mergeCells('B33', 'C33')
    let officeSupdtAccountsSale4 = worksheet.getCell('B33', 'C33')
    officeSupdtAccountsSale4.value = "4)Office Supdt Accounts Sec"
    officeSupdtAccountsSale4.font = { bold: true };
    worksheet.mergeCells('B34', 'C34')
    let vesselsBerthOperatorSale4 = worksheet.getCell('B34', 'C34')
    vesselsBerthOperatorSale4.value = "5)Vessels Berth Operator :  SAIF POWERTEC "
    vesselsBerthOperatorSale4.font = { bold: true };
    worksheet.mergeCells('D34')
    let vesselsBerthOperatorSale5 = worksheet.getCell('D34')
    vesselsBerthOperatorSale5.value = "LIMITED"
    vesselsBerthOperatorSale5.font = { bold: true };
    vesselsBerthOperatorSale5.alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.mergeCells('B35', 'C35')
    let agentMCCTransportSale6 = worksheet.getCell('B35', 'C35')
    agentMCCTransportSale6.value = ")AGENT MCC TRANSPORT"
    agentMCCTransportSale6.font = { bold: true };
    worksheet.mergeCells('B36')
    let berthShipSale7 = worksheet.getCell('B36')
    berthShipSale7.value = "7)Berth/Ship -"
    berthShipSale7.font = { bold: true };
    worksheet.mergeCells('C36')
    let berthShipBorderSale8 = worksheet.getCell('C36')
    berthShipBorderSale8.font = { bold: true };
    berthShipBorderSale8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    berthShipBorderSale8.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('B37')
    let allMLOSale9 = worksheet.getCell('B37')
    allMLOSale9.value = "8)ALL MLO's - 2"
    allMLOSale9.font = { bold: true };



    //horizontal Right Sidesmall Table Start
    //header Row1
    worksheet.mergeCells('F31')
    let emptyheaderSale1 = worksheet.getCell('F31');
    emptyheaderSale1.font = { bold: true };
    emptyheaderSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyheaderSale1.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('G31')
    let twentyheaderSale2 = worksheet.getCell('G31');
    twentyheaderSale2.value = "20"
    twentyheaderSale2.font = { bold: true };
    twentyheaderSale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    twentyheaderSale2.alignment = { vertical: 'middle', horizontal: 'center' };

    let fourtyheaderSale3 = worksheet.getCell('H31');
    fourtyheaderSale3.value = "40"
    fourtyheaderSale3.font = { bold: true };
    fourtyheaderSale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fourtyheaderSale3.alignment = { vertical: 'middle', horizontal: 'center' };

    let boxheaderSale4 = worksheet.getCell('I31');
    boxheaderSale4.value = "BOX"
    boxheaderSale4.font = { bold: true };
    boxheaderSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    boxheaderSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    let tuesheaderSale5 = worksheet.getCell('J31');
    tuesheaderSale5.value = "TUES"
    tuesheaderSale5.font = { bold: true };
    tuesheaderSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    tuesheaderSale5.alignment = { vertical: 'middle', horizontal: 'center' };
    //row1 FCL
    worksheet.mergeCells('F32')
    let fclheaderSale1 = worksheet.getCell('F32');
    fclheaderSale1.value = "FCL";
    fclheaderSale1.font = { bold: true };
    fclheaderSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fclheaderSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G32')
    let fcl20Sale2 = worksheet.getCell('G32');
    fcl20Sale2.value = this.rsltTotallExcell.fcl20;
    fcl20Sale2.font = { bold: true };
    fcl20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fcl20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H32')
    let fcl40Sale3 = worksheet.getCell('H32');
    fcl40Sale3.value = this.rsltTotallExcell.fcl40;
    fcl40Sale3.font = { bold: true };
    fcl40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fcl40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I32')
    let fclBoxSale4 = worksheet.getCell('I32');
    fclBoxSale4.value = this.rsltTotallExcell.fclBox;
    fclBoxSale4.font = { bold: true };
    fclBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fclBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J32')
    let fclTuesSale5 = worksheet.getCell('J32');
    fclTuesSale5.value = this.rsltTotallExcell.fclTeus;
    fclTuesSale5.font = { bold: true };
    fclTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fclTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };


    //row2 For LCL
    worksheet.mergeCells('F33')
    let lclSale = worksheet.getCell('F33');
    lclSale.value = "LCL"
    lclSale.font = { bold: true };
    lclSale.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lclSale.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('G33')
    let lcl20Sale1 = worksheet.getCell('G33');
    lcl20Sale1.value = this.rsltTotallExcell.lcl20;
    lcl20Sale1.font = { bold: true };
    lcl20Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lcl20Sale1.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('H33')
    let lcl40Sale2 = worksheet.getCell('H33');
    lcl40Sale2.value = this.rsltTotallExcell.lcl40;
    lcl40Sale2.font = { bold: true };
    lcl40Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lcl40Sale2.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('I33')
    let lclBoxSale3 = worksheet.getCell('I33');
    lclBoxSale3.value = this.rsltTotallExcell.lclBox
    lclBoxSale3.font = { bold: true };
    lclBoxSale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lclBoxSale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J33')
    let lclTuesSale4 = worksheet.getCell('J33');
    lclTuesSale4.value = this.rsltTotallExcell.lclTeus;
    lclTuesSale4.font = { bold: true };
    lclTuesSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lclTuesSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    //row3 For ICD
    worksheet.mergeCells('F34')
    let icdSale1 = worksheet.getCell('F34');
    icdSale1.value = "ICD"
    icdSale1.font = { bold: true };
    icdSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icdSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G34')
    let icd20Sale2 = worksheet.getCell('G34');
    icd20Sale2.value = this.rsltTotallExcell.icd20;
    icd20Sale2.font = { bold: true };
    icd20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icd20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H34')
    let icd40Sale3 = worksheet.getCell('H34');
    icd40Sale3.value = this.rsltTotallExcell.icd40;
    icd40Sale3.font = { bold: true };
    icd40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icd40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I34')
    let icdBoxSale4 = worksheet.getCell('I34');
    icdBoxSale4.value = this.rsltTotallExcell.icdBox;
    icdBoxSale4.font = { bold: true };
    icdBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icdBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J34')
    let icdTuesSale5 = worksheet.getCell('J34');
    icdTuesSale5.value = this.rsltTotallExcell.icdTeus;
    icdTuesSale5.font = { bold: true };
    icdTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icdTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };


    //row4 For REFFER
    worksheet.mergeCells('F35')
    let refferSale1 = worksheet.getCell('F35');
    refferSale1.value = "REFFER"
    refferSale1.font = { bold: true };
    refferSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    refferSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G35')
    let reffer20Sale1 = worksheet.getCell('G35');
    reffer20Sale1.value = this.rsltTotallExcell.reefer20;
    reffer20Sale1.font = { bold: true };
    reffer20Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    reffer20Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H35')
    let reffer40Sale1 = worksheet.getCell('H35');
    reffer40Sale1.value = this.rsltTotallExcell.reefer40;
    reffer40Sale1.font = { bold: true };
    reffer40Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    reffer40Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I35')
    let refferBoxSale1 = worksheet.getCell('I35');
    refferBoxSale1.value = this.rsltTotallExcell.reeferBox;
    refferBoxSale1.font = { bold: true };
    refferBoxSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    refferBoxSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J35')
    let refferTuesSale1 = worksheet.getCell('J35');
    refferTuesSale1.value = this.rsltTotallExcell.reeferTeus;
    refferTuesSale1.font = { bold: true };
    refferTuesSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    refferTuesSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    //row5 ForPNG
    worksheet.mergeCells('F36')
    let pngSale1 = worksheet.getCell('F36');
    pngSale1.value = "PNG"
    pngSale1.font = { bold: true };
    pngSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    pngSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G36')
    let png20Sale2 = worksheet.getCell('G36');
    png20Sale2.value = this.rsltTotallExcell.png20;
    png20Sale2.font = { bold: true };
    png20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    png20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H36')
    let png40Sale3 = worksheet.getCell('H36');
    png40Sale3.value = this.rsltTotallExcell.png40;
    png40Sale3.font = { bold: true };
    png40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    png40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I36')
    let pngBoxSale4 = worksheet.getCell('I36');
    pngBoxSale4.value = this.rsltTotallExcell.pngBox;
    pngBoxSale4.font = { bold: true };
    pngBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    pngBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J36')
    let pngTuesSale5 = worksheet.getCell('J36');
    pngTuesSale5.value = this.rsltTotallExcell.pngTeus;
    pngTuesSale5.font = { bold: true };
    pngTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    pngTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };

    //row6 DEPOT
    worksheet.mergeCells('F37')
    let depotSale1 = worksheet.getCell('F37');
    depotSale1.value = "DEPOT"
    depotSale1.font = { bold: true };
    depotSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    depotSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G37')
    let depot20Sale2 = worksheet.getCell('G37');
    depot20Sale2.value = this.rsltTotallExcell.depot20;
    depot20Sale2.font = { bold: true };
    depot20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    depot20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H37')
    let depot40Sale3 = worksheet.getCell('H37');
    depot40Sale3.value = this.rsltTotallExcell.depot40;
    depot40Sale3.font = { bold: true };
    depot40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    depot40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I37')
    let depotBoxSale4 = worksheet.getCell('I37');
    depotBoxSale4.value = this.rsltTotallExcell.depotBox;
    depotBoxSale4.font = { bold: true };
    depotBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    depotBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J37')
    let depotTuesSale5 = worksheet.getCell('J37');
    depotTuesSale5.value = this.rsltTotallExcell.depotTeus;
    depotTuesSale5.font = { bold: true };
    depotTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    depotTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };

    //row7 Empty
    worksheet.mergeCells('F38')
    let emptySale1 = worksheet.getCell('F38');
    emptySale1.value = "Empty"
    emptySale1.font = { bold: true };
    emptySale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptySale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G38')
    let emptyt20Sale2 = worksheet.getCell('G38');
    emptyt20Sale2.value = this.rsltTotallExcell.empty20;
    emptyt20Sale2.font = { bold: true };
    emptyt20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyt20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H38')
    let empty40Sale3 = worksheet.getCell('H38');
    empty40Sale3.value = this.rsltTotallExcell.empty40;
    empty40Sale3.font = { bold: true };
    empty40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    empty40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I38')
    let emptyBoxSale4 = worksheet.getCell('I38');
    emptyBoxSale4.value = this.rsltTotallExcell.emptyBox;
    emptyBoxSale4.font = { bold: true };
    emptyBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J38')
    let emptyTuesSale5 = worksheet.getCell('J38');
    emptyTuesSale5.value = this.rsltTotallExcell.emptyTeus;
    emptyTuesSale5.font = { bold: true };
    emptyTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };


    //row8 Totall
    worksheet.mergeCells('F39')
    let totallSale1 = worksheet.getCell('F39');
    totallSale1.value = "TOTAL"
    totallSale1.font = { bold: true };
    totallSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totallSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G39')
    let totallt20Sale2 = worksheet.getCell('G39');
    totallt20Sale2.value = this.rsltTotallExcell.total20;
    totallt20Sale2.font = { bold: true };
    totallt20Sale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totallt20Sale2.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H39')
    let totall40Sale3 = worksheet.getCell('H39');
    totall40Sale3.value = this.rsltTotallExcell.total40;
    totall40Sale3.font = { bold: true };
    totall40Sale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totall40Sale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I39')
    let totallBoxSale4 = worksheet.getCell('I39');
    totallBoxSale4.value = this.rsltTotallExcell.totalBox;
    totallBoxSale4.font = { bold: true };
    totallBoxSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totallBoxSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J39')
    let totallTuesSale5 = worksheet.getCell('J39');
    totallTuesSale5.value = this.rsltTotallExcell.totalTeus;
    totallTuesSale5.font = { bold: true };
    totallTuesSale5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    totallTuesSale5.alignment = { vertical: 'middle', horizontal: 'center' };

    //horizontal Right Sidesmall Table end


    //Vessel Voyage Rotation

    worksheet.mergeCells('A41', 'B41')
    let vessel = worksheet.getCell('A41', 'B41');
    vessel.value = "Vessel :" + this.rsltTotallExcell.vesselName;

    worksheet.mergeCells('C41', 'D41')
    let voyage = worksheet.getCell('C41', 'D41');
    voyage.value = "Voyage No :" + this.rsltTotallExcell.voyageNo;

    worksheet.mergeCells('E41', 'F41')
    let Rotation = worksheet.getCell('E41', 'F41');
    Rotation.value = "Rot No :" + this.rsltTotallExcell.rotation;


    worksheet.getColumn(1).width = 13;
    worksheet.getColumn(2).width = 32;

    worksheet.addRow([]);

    //For Excel Table3 start

    //For mloAndTypeWiseContainers TAble3
    //header1
    worksheet.mergeCells('A43', 'A44')
    let serioulNoHeader1Sale1 = worksheet.getCell('A43', 'A44');
    serioulNoHeader1Sale1.value = "SL NO.";
    serioulNoHeader1Sale1.font = { bold: true };
    serioulNoHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    serioulNoHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('B43', 'B44')
    let mlolHeader1Sale1 = worksheet.getCell('B43', 'B44');
    mlolHeader1Sale1.value = "MLO";
    mlolHeader1Sale1.font = { bold: true };
    mlolHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mlolHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('C43', 'D43')
    let fcllHeader1Sale1 = worksheet.getCell('C43', 'D43');
    fcllHeader1Sale1.value = "FCL";
    fcllHeader1Sale1.font = { bold: true };
    fcllHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    fcllHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('E43', 'F43')
    let lcllHeader1Sale1 = worksheet.getCell('E43', 'F43');
    lcllHeader1Sale1.value = "LCL";
    lcllHeader1Sale1.font = { bold: true };
    lcllHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    lcllHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G43', 'H43')
    let icdlHeader1Sale1 = worksheet.getCell('G43', 'H43');
    icdlHeader1Sale1.value = "ICD";
    icdlHeader1Sale1.font = { bold: true };
    icdlHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    icdlHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('I43', 'J43')
    let emptyHeader1Sale1 = worksheet.getCell('I43', 'J43');
    emptyHeader1Sale1.value = "EMPTY";
    emptyHeader1Sale1.font = { bold: true };
    emptyHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    emptyHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('K43', 'K44')
    let boxHeader1Sale1 = worksheet.getCell('K43', 'K44');
    boxHeader1Sale1.value = "BOX";
    boxHeader1Sale1.font = { bold: true };
    boxHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    boxHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('L43', 'L44')
    let teusHeader1Sale1 = worksheet.getCell('L43', 'L44');
    teusHeader1Sale1.value = "TEUS";
    teusHeader1Sale1.font = { bold: true };
    teusHeader1Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    teusHeader1Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    //For header2(Table3)

    worksheet.mergeCells('C44')
    let mloAndTypeFcl20Header2Sale1 = worksheet.getCell('C44');
    mloAndTypeFcl20Header2Sale1.value = "20'";
    mloAndTypeFcl20Header2Sale1.font = { bold: true };
    mloAndTypeFcl20Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeFcl20Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('D44')
    let mloAndTypeFcl40Header2Sale1 = worksheet.getCell('D44');
    mloAndTypeFcl40Header2Sale1.value = "40'";
    mloAndTypeFcl40Header2Sale1.font = { bold: true };
    mloAndTypeFcl40Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeFcl40Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('E44')
    let mloAndTypelcl20Header2Sale1 = worksheet.getCell('E44');
    mloAndTypelcl20Header2Sale1.value = "20'";
    mloAndTypelcl20Header2Sale1.font = { bold: true };
    mloAndTypelcl20Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypelcl20Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('F44')
    let mloAndTypelcl40Header2Sale1 = worksheet.getCell('F44');
    mloAndTypelcl40Header2Sale1.value = "40'";
    mloAndTypelcl40Header2Sale1.font = { bold: true };
    mloAndTypelcl40Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypelcl40Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('G44')
    let mloAndTypeIcd20Header2Sale1 = worksheet.getCell('G44');
    mloAndTypeIcd20Header2Sale1.value = "20'";
    mloAndTypeIcd20Header2Sale1.font = { bold: true };
    mloAndTypeIcd20Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeIcd20Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H44')
    let mloAndTypeIcd40Header2Sale1 = worksheet.getCell('H44');
    mloAndTypeIcd40Header2Sale1.value = "40'";
    mloAndTypeIcd40Header2Sale1.font = { bold: true };
    mloAndTypeIcd40Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeIcd40Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('I44')
    let mloAndTypeEmpty20Header2Sale1 = worksheet.getCell('I44');
    mloAndTypeEmpty20Header2Sale1.value = "20'";
    mloAndTypeEmpty20Header2Sale1.font = { bold: true };
    mloAndTypeEmpty20Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeEmpty20Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J44')
    let mloAndTypeEmpty40Header2Sale1 = worksheet.getCell('J44');
    mloAndTypeEmpty40Header2Sale1.value = "40'";
    mloAndTypeEmpty40Header2Sale1.font = { bold: true };
    mloAndTypeEmpty40Header2Sale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    mloAndTypeEmpty40Header2Sale1.alignment = { vertical: 'middle', horizontal: 'center' };

    //For Table Data
    let sl = 1;
    for (var b = 0; b < this.rsltTotallExcell.mloAndTypeWiseContainers.length; b++) {

      let mloAndTypeWiseContainersExcelTable3DataRow = worksheet.addRow(
        [
          sl++,
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['mloCode'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['fcl20'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['fcl40'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['lcl20'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['lcl40'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['icd20'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['icd40'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['empty20'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['empty40'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['box'],
          this.rsltTotallExcell.mloAndTypeWiseContainers[b]['teus']
        ]
      )
      mloAndTypeWiseContainersExcelTable3DataRow.eachCell((cell, number) => {
        mloAndTypeWiseContainersExcelTable3DataRow.font = { bold: true };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '' },
          bgColor: { argb: '' },
        };
      });

    }


    // //Grand Totall(Table3)
    worksheet.mergeCells('A47', 'B47')
    let grandTotallMloAndTypeTableSale1 = worksheet.getCell('A47', 'A47');
    grandTotallMloAndTypeTableSale1.value = "Grand Total";
    grandTotallMloAndTypeTableSale1.font = { bold: true };
    grandTotallMloAndTypeTableSale1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallMloAndTypeTableSale1.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('C47')
    let grandTotallFcl20MloAndTypeTableSale2 = worksheet.getCell('C47');
    grandTotallFcl20MloAndTypeTableSale2.value = this.rsltTotallExcell.mloAndTypeWiseTotalFcl20;
    grandTotallFcl20MloAndTypeTableSale2.font = { bold: true };
    grandTotallFcl20MloAndTypeTableSale2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallFcl20MloAndTypeTableSale2.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('D47')
    let grandTotallFcl40MloAndTypeTableSale3 = worksheet.getCell('D47');
    grandTotallFcl40MloAndTypeTableSale3.value = this.rsltTotallExcell.mloAndTypeWiseTotalFcl40;
    grandTotallFcl40MloAndTypeTableSale3.font = { bold: true };
    grandTotallFcl40MloAndTypeTableSale3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallFcl40MloAndTypeTableSale3.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('E47')
    let grandTotallLcl20MloAndTypeTableSale4 = worksheet.getCell('E47');
    grandTotallLcl20MloAndTypeTableSale4.value = this.rsltTotallExcell.mloAndTypeWiseTotalLcl20;
    grandTotallLcl20MloAndTypeTableSale4.font = { bold: true };
    grandTotallLcl20MloAndTypeTableSale4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallLcl20MloAndTypeTableSale4.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('F47')
    let grandTotallLcl40MloAndTypeTableSale = worksheet.getCell('F47');
    grandTotallLcl40MloAndTypeTableSale.value = this.rsltTotallExcell.mloAndTypeWiseTotalLcl40;
    grandTotallLcl40MloAndTypeTableSale.font = { bold: true };
    grandTotallLcl40MloAndTypeTableSale.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallLcl40MloAndTypeTableSale.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.mergeCells('G47')
    let grandTotallIcd20MloAndTypeTableSale6 = worksheet.getCell('G47');
    grandTotallIcd20MloAndTypeTableSale6.value = this.rsltTotallExcell.mloAndTypeWiseTotalIcd20;
    grandTotallIcd20MloAndTypeTableSale6.font = { bold: true };
    grandTotallIcd20MloAndTypeTableSale6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallIcd20MloAndTypeTableSale6.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('H47')
    let grandTotallIcd40MloAndTypeTableSale7 = worksheet.getCell('H47');
    grandTotallIcd40MloAndTypeTableSale7.value = this.rsltTotallExcell.mloAndTypeWiseTotalIcd40;
    grandTotallIcd40MloAndTypeTableSale7.font = { bold: true };
    grandTotallIcd40MloAndTypeTableSale7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallIcd40MloAndTypeTableSale7.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('I47')
    let grandTotallEmpty20MloAndTypeTableSale8 = worksheet.getCell('I47');
    grandTotallEmpty20MloAndTypeTableSale8.value = this.rsltTotallExcell.mloAndTypeWiseTotalEmpty20;
    grandTotallEmpty20MloAndTypeTableSale8.font = { bold: true };
    grandTotallEmpty20MloAndTypeTableSale8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallEmpty20MloAndTypeTableSale8.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('J47')
    let grandTotallEmpty40MloAndTypeTableSale9 = worksheet.getCell('J47');
    grandTotallEmpty40MloAndTypeTableSale9.value = this.rsltTotallExcell.mloAndTypeWiseTotalEmpty40;
    grandTotallEmpty40MloAndTypeTableSale9.font = { bold: true };
    grandTotallEmpty40MloAndTypeTableSale9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallEmpty40MloAndTypeTableSale9.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('K47')
    let grandTotallBoxMloAndTypeTableSale9 = worksheet.getCell('K47');
    grandTotallBoxMloAndTypeTableSale9.value = this.rsltTotallExcell.mloAndTypeWiseTotalBox;
    grandTotallBoxMloAndTypeTableSale9.font = { bold: true };
    grandTotallBoxMloAndTypeTableSale9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallBoxMloAndTypeTableSale9.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('L47')
    let grandTotallTuesMloAndTypeTableSale10 = worksheet.getCell('L47');
    grandTotallTuesMloAndTypeTableSale10.value = this.rsltTotallExcell.mloAndTypeWiseTotalTeus;
    grandTotallTuesMloAndTypeTableSale10.font = { bold: true };
    grandTotallTuesMloAndTypeTableSale10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    grandTotallTuesMloAndTypeTableSale10.alignment = { vertical: 'middle', horizontal: 'center' };



    //instruction
    worksheet.mergeCells('A50', 'I50')
    let instLet1Sale1 = worksheet.getCell('A50', 'I50');
    instLet1Sale1.value = "১/ অত্র জাহাজের সকল OPEN TOP, FLAT RACK কন্টেইনার CCT ইয়ার্ডের নির্দিষ্ট স্লটে সংরক্ষণ করে মেমোর";
    instLet1Sale1.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A51', 'I51')
    let instLet1Sale2 = worksheet.getCell('A51', 'I51');
    instLet1Sale2.value = "মাধ্যমে ASI/SI কে হ্যান্ডওভার করতে হবে| বাকি সকল বুলেটসীলযুক্ত  কন্টেইনার সংশ্লিষ্ট ইয়ার্ডে সংরক্ষণ করে R/L এর ";
    instLet1Sale2.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A52', 'I52')
    let instLet1Sale3 = worksheet.getCell('A52', 'I52');
    instLet1Sale3.value = "ওপর নিরাপত্তারক্ষী / কর্মচারীর রিসিভিং স্বাক্ষর নিতে হবে |";
    instLet1Sale3.alignment = { horizontal: 'left' }
    worksheet.mergeCells('A53', 'I53')
    let instLet1Sale4 = worksheet.getCell('A53', 'I53');
    instLet1Sale4.value = "২/ডিসচার্জিং  লিস্টে প্রাইভেট ডিপো নির্দেশিত ৩৭ আইটেম কন্টেইনারগুলি CTMS পদ্ধতি অনুসরণ করে সংশ্লিষ্ট ডিপোতে";
    instLet1Sale4.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A54', 'I54')
    let instLet1Sale5 = worksheet.getCell('A54', 'I54');
    instLet1Sale5.value = "প্রেরণ করতে হবে |";
    instLet1Sale5.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A55', 'I55')
    let instLet1Sale6 = worksheet.getCell('A55', 'I55');
    instLet1Sale6.value = "৩/ Highly Perishable, Onion, Garlic, Ginger & Dates জাতীয় পণ্য DRY কন্টেইনারে পরিবাহিত হলে";
    instLet1Sale6.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A56', 'I56')
    let instLet1Sale7 = worksheet.getCell('A56', 'I56');
    instLet1Sale7.value = "সেগুলো অবতরণের জন্য অত্র দপ্তর থেকে আলাদা ভাবে অনুমতি নিতে হবে |";
    instLet1Sale7.alignment = { horizontal: 'left' };
    worksheet.mergeCells('A57', 'I57')
    let instLet1Sale8 = worksheet.getCell('A57', 'I57');
    instLet1Sale8.value = "৪/ MLO _______________ ICT Pangaon Container NCT ইয়ার্ডে পানগাঁও স্লটে সংরক্ষণ করতে হবে |";
    instLet1Sale8.alignment = { horizontal: 'left' };

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'FEEDER_DISCHARGE_Summary_List' + '.xlsx');

    });



  }


  resetForm() {
    this.rot_no = '';
    this.report_type = '';
  }


}





















