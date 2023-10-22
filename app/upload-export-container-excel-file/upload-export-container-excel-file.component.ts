import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { UploadExportContainerExcelFileService } from '../service/ExportReports/upload-export-container-excel-file/upload-export-container-excel-file.service';

@Component({
  selector: 'app-upload-export-container-excel-file',
  templateUrl: './upload-export-container-excel-file.component.html',
  styleUrls: ['./upload-export-container-excel-file.component.css']
})
export class UploadExportContainerExcelFileComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput:any;
  UploadExportContainerForm:any;
  fileInputLabel:any;
  resultList:any;
  ipAddress:any="";
  response:any;
  loginId: any;
  size:number=0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private uploadExportContainerExcelFileService:UploadExportContainerExcelFileService
  ) {
    this.UploadExportContainerForm=this.formBuilder.group({
      excelfile: ['']
    })
    this.loginId = "";
   }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/login']);
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
    else{
      this.loginId=localStorage.getItem("loginId");
      this.uploadExportContainerExcelFileService.getIpAddress().subscribe((res:any)=>{
   
       
          this.ipAddress=res.ip;
        
        
        console.log("ip: "+this.ipAddress);
      })
    }
  }


  onFileSelect(event:any){
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
     //   alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.UploadExportContainerForm.get('excelfile').setValue(file);
       this.size=file.size;
       this.size=((this.size/1024)/1024);
       
      }
    }

  }


  
  onSubmit(event:any):any{

    if (!this.UploadExportContainerForm.get('excelfile').value) {
      this.toastr.error('Select An Excel File', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return false;
    }
    else{
      if(this.size<=2){
        console.log("ok")
        const formData = new FormData();
        formData.append('excelfile', this.UploadExportContainerForm.get('excelfile').value);
        formData.append('loginId',this.loginId);
        formData.append('ip',this.ipAddress);
        this.uploadExportContainerExcelFileService.uploadExportContainer(formData).subscribe(result=>{
          this.resultList=result;
    
        });

      }
      else{
        this.toastr.error('File size is getter than 2MB', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        return false;

      }
  
    }


  }
  
}
