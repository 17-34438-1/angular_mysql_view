import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ViewIgmGeneralService } from '../service/IgmOperation/view-igm-general/view-igm-general.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edi-upload',
  templateUrl: './edi-upload.component.html',
  styleUrls: ['./edi-upload.component.css']
})
export class EdiUploadComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput:any;
  @ViewChild('UploadEdiFileInput', { static: false }) uploadEdiFileInput:any;
  uploadEdiForm:any;
  fileInputLabel:any;
  resultList:any;
  ipAddress:any="";
  response:any;
  loginId: any;
  size:number=0;
  fileEdiInputLabel:any;
  edifileSize:number=0;
  edifileType:any="";
  rotation:any="";
  imp_voyage:any="";
  exp_voyage:any="";
  vslName:any="";
  grt:any="";
  nrt:any="";
  imo_no:any="";
  loa:any="";
  flag:any="";
  call_sign:any="";
  beam:any="";

  rotation1:any="";
  imp_voyage1:any="";
  exp_voyage1:any="";
  vslName1:any="";
  grt1:any="";
  nrt1:any="";
  imo_no1:any="";
  loa1:any="";
  flag1:any="";
  call_sign1:any="";
  beam1:any="";

  id:any="";
  responseList:any;
  state:number=0;
  


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private activatedRoute:ActivatedRoute,
    private viewIgmGeneralService:ViewIgmGeneralService 
  ) {
    this.uploadEdiForm=this.formBuilder.group({
      excelfile: [''],
      edi:['']
    });
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
      this.id=this.activatedRoute.snapshot.url[2].path;
      this.loginId=localStorage.getItem("loginId");
      this.viewIgmGeneralService.getUploadEdiInfo(this.id).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.rotation = res.import_Rotation_No;
          this.imp_voyage = res.voy_No;
          this.exp_voyage = res.voyNoExp;
          this.vslName = res.vessel_Name;		// intakhab - 2022-06-11
          this.grt = res.grt;
          this.nrt = res.nrt;
          this.imo_no = res.imo;
          this.loa = res.loa_cm;
          this.flag = res.flag;
          this.call_sign = res.radio_call_sign;
          this.beam = res.beam_cm;
        }
      });
      this.viewIgmGeneralService.getIpAddress().subscribe((res:any)=>{
        this.ipAddress=res.ip;
        });

    }
  }

  onFileSelect(event:any){
    console.log("hello xl")
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    //if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

    //  if (!_.includes(af, file.type)) {
       /* this.toastr.error('Only EXCEL Docs Allowed!', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        return;*/
    //  } else {
        this.fileInputLabel = file.name;
        this.uploadEdiForm.get('excelfile').setValue(file);
       this.size=file.size;
       this.size=((this.size/1024)/1024);
       
   //   }
   // }

  }
  onEdIFileSelect(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.edifileType=file.type;
      console.log(this.edifileType);
     /// if(this.edifileType=="edi"){
        this.fileEdiInputLabel = file.name;
        console.log(this.fileEdiInputLabel);
        this.uploadEdiForm.get('edi').setValue(file);
        this.edifileSize=file.size;
        this.edifileSize=((this.edifileSize/1024)/1024);
  //   }
     

      
       
      
    }

  }
   onSubmit(event:any):any{
    this.rotation1=event.rotation.value;
    console.log(this.rotation);
    this.imp_voyage1=event.imp_voyage.value;
    this.exp_voyage1=event.exp_voyage.value;
    this.grt1=event.grt.value;
    this.nrt1=event.nrt.value;
    this.imo_no1=event.imo_no.value;
    this.loa1=event.loa.value;
    this.flag1=event.flag.value;
    this.call_sign1=event.call_sign.value;
    this.beam1=event.beam.value;

    
    if(this.rotation1==""){
      this.toastr.error('Please provide rotation!', 'Error',{
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
    if(this.imp_voyage1=="" ){
      this.toastr.error('Please provide IMP Voyage!', 'Error',{
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
    if(this.exp_voyage1==""){
      this.toastr.error('Please provide EXP Voyage!', 'Error',{
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

    if(this.grt1==""){
      this.toastr.error('Please provide GRT!', 'Error',{
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
    if(this.nrt1==""){
      this.toastr.error('Please provide NRT!', 'Error',{
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

    if(this.imo_no1==""){
      this.toastr.error('Please provide IMO No.!', 'Error',{
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
    if(this.loa1==""){
      this.toastr.error('Please provide LOA!', 'Error',{
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
    if(this.flag1==""){
      this.toastr.error('Please provide Flag!', 'Error',{
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
    
    if(this.call_sign1==""){
      this.toastr.error('Please provide Call Sign!', 'Error',{
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
    if(!this.uploadEdiForm.get("edi").value){
      this.toastr.error('Select An Edi File', 'Error',{
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
    if (!this.uploadEdiForm.get('excelfile').value) {
      this.toastr.error('Select An Stow File', 'Error',{
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
  
    const formData = new FormData();
    formData.append('excelfile', this.uploadEdiForm.get('excelfile').value);
    formData.append('edi', this.uploadEdiForm.get('edi').value);
    formData.append('rotation',this.rotation1);
    formData.append('imp_voyage',this.imp_voyage1);
    formData.append('exp_voyage',this.exp_voyage1);
    formData.append('vslName',this.vslName);
    formData.append('grt',this.grt1);
    formData.append('nrt',this.nrt1);
    formData.append('imo_no',this.imo_no1);
    formData.append('loa',this.loa1);
    formData.append('flag',this.flag1);
    formData.append('call_sign',this.call_sign1);
    formData.append('beam',this.beam1);
     formData.append('loginId',this.loginId);
    formData.append('ip',this.ipAddress);

    this.viewIgmGeneralService.uploadEdi(formData).subscribe(result=>{
      this.responseList=result;
     this.rotation="";
     this.imp_voyage="";
     this.exp_voyage="";
     this.vslName="";
     this.grt="";
     this.nrt="";
     this.loa="";
     this.flag="";
     this.imo_no="";
     this.call_sign="";
     this.beam="";
     this.uploadFileInput.nativeElement.value = '';
     this.uploadEdiFileInput.nativeElement.value = '';


    });

   }

}
