import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportBlankBayViewService } from '../service/ExportReports/export-blank-bay-view/export-blank-bay-view.service';

@Component({
  selector: 'app-export-blank-bay-view-form',
  templateUrl: './export-blank-bay-view-form.component.html',
  styleUrls: ['./export-blank-bay-view-form.component.css']
})
export class ExportBlankBayViewFormComponent implements OnInit {
  ExportBlankBayViewForm:any;
  vesselList:any;
  vvdGkey:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private exportBlankBayViewService:ExportBlankBayViewService
  ) { 
    this.ExportBlankBayViewForm=this.formBuilder.group({});
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
      this.exportBlankBayViewService.getExportBlankBayViewVesselList().subscribe(result=>{
        this.vesselList=result;
      });
    }
  }

  onSubmit(event:any){
    this.vvdGkey=event.vvdGkey.value;
    localStorage.setItem("ExportBlankBayViewVvdGkey",this.vvdGkey);
    this.router.navigate([]).then(result=>window.open('exportReports/exportBlankBayView/report', '_blank'));
  }

}
