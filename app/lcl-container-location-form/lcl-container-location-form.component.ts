import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContainerLocationService } from '../service/container-location/container-location.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lcl-container-location-form',
  templateUrl: './lcl-container-location-form.component.html',
  styleUrls: ['./lcl-container-location-form.component.css']
})
export class LclContainerLocationFormComponent implements OnInit {
  lclContainerLocationSearchForm: FormGroup;

  rotation: String;
  blNo: any;
  beNo: any;
  uDt: String;

  loader = false;
  report: any;
  calledApi = false;

  reportHead = '';
  cpaname: any = [['CHATTOGRAM PORT AUTHORITY']];
  reportname: any = [];
  header = [['Container', 'Seal', 'Size', 'Height', 'Position', 'Yard/Shed']];
  

  tableData: any = [];

  constructor(
    private router: Router, 
    private containerLocService: ContainerLocationService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { 
    this.rotation = '';
    this.uDt = '';
    this.lclContainerLocationSearchForm = this.formBuilder.group({});
  }

  ngOnInit(): void {

    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
      this.toastr.error('Login and try again.', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return;
    }

    this.lclContainerLocationSearchForm  = this.formBuilder.group({
      rotation : ['', Validators.required],
      bl: [''],
      be: [''],
    });
  }

  onSubmit(){

    this.calledApi = true;
    this.loader = true;
    this.containerLocService.getLCLContainerLocation(this.lclContainerLocationSearchForm.value).subscribe(response => {      
      console.log(response);
      this.report = response;
      this.loader = false;
      
      // this.router.navigate(['designation/category/list']);

    }, err => {      
      console.log(err);
      console.log(err.error.message);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      
    });

  }

  generatePdfFile(){
    

    this.containerLocService.getLCLContainerLocation(this.lclContainerLocationSearchForm.value).subscribe(response => {      
      // console.log(response);
      // this.report = response;
      this.tableData = [];
      for (let rslt of response.containers) {
        this.tableData.push(
          [
            rslt.container, rslt.seal, rslt.size, rslt.height, rslt.position, rslt.yard_shed
          ]
        );
      }
      this.viewPDF(response);
      
    }, err => {      
      console.log(err);
      console.log(err.error.message);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      
    });

  }

  viewPDF(response: any){   
    var unstuffing_date = "";
    if(response.unstuffing_dt == null){
      unstuffing_date = " ";
    } else {
      unstuffing_date = response.unstuffing_dt;
    }
    
    var pdf = new jsPDF();

    this.reportname = [['ONE STOP SERVICE CENTER'],['View Certification']];

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
        top: 0
      }
    })

    autoTable(pdf, {
      body: [
        [
          { content: 'Rotation', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.rotation, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: 'BL No', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.bl, styles: { halign: 'center',cellWidth : 'auto' } }
        ],
        [
          { content: 'Destination', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.dest_code, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: 'Marks & Number', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.marks_number, styles: { halign: 'center',cellWidth : 'auto' } }
        ],
        [
          { content: 'Consignee Description', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.consignee_desc, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: 'Status', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.cont_status, styles: { halign: 'center',cellWidth : 'auto' } }
        ],
        [
          { content: 'Offdock Name', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.dest_name, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: 'Notify Description', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.notify_desc, styles: { halign: 'center',cellWidth : 'auto' } }
        ],
        [
          { content: 'Receive Pack', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.rcv_pack, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: 'Unstuffing Date', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: unstuffing_date, styles: { halign: 'center',cellWidth : 'auto' } }
        ],
        [
          { content: 'Vessel Name', styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } },
          { content: response.vessel_name, styles: { halign: 'center',cellWidth : 'auto' } },
          { content: '',colSpan: 2, styles: { halign: 'center',fontStyle: 'bold',cellWidth : 35 } }
        ]
      ],
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

    pdf.output('dataurlnewwindow')
  }

}
