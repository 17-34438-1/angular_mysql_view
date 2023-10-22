import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportContainerBayViewService } from '../service/ExportReports/export-container-bay-view/export-container-bay-view.service';

@Component({
  selector: 'app-export-container-bay-view',
  templateUrl: './export-container-bay-view.component.html',
  styleUrls: ['./export-container-bay-view.component.css']
})
export class ExportContainerBayViewComponent implements OnInit {
  ExportportContainerBayViewForm:any;
  vesselList:any;
  vvdGkey:any;
  rotation:any="";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private exportContainerBayViewService:ExportContainerBayViewService
  ) { 
    this.ExportportContainerBayViewForm=this.formBuilder.group({})
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
    
  }
  onSubmit(event:any){
  
    this.rotation=event.rotation.value;
    if(this.rotation!=""){
      
      localStorage.setItem("ExportContainerBayViewRotation",this.rotation);
      this.router.navigate([]).then(result=>window.open('exportReports/exportContainerBayView/report', '_blank'));
    }
    else{
      this.toastr.error('Rotation is Empty', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    }
  }

}
