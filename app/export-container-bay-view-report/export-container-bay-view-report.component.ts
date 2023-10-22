import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportContainerBayViewService } from '../service/ExportReports/export-container-bay-view/export-container-bay-view.service';

@Component({
  selector: 'app-export-container-bay-view-report',
  templateUrl: './export-container-bay-view-report.component.html',
  styleUrls: ['./export-container-bay-view-report.component.css']
})
export class ExportContainerBayViewReportComponent implements OnInit {
  resultList:any;
  vvdGkey:any;
  vesselInfo:any;
  vesselName:any;
  rotation:any;
  exportRotation:any;
  arrivalTime:any;
  departTime:any;
  


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private exportContainerBayViewService:ExportContainerBayViewService
  ) {
    this.rotation=localStorage.getItem("ExportContainerBayViewRotation");
    this.rotation=this.rotation.replace("/","-");
    
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
      this.exportContainerBayViewService.getExportContainerBayVesselInfo(this.rotation).subscribe(data=>{
        this.vesselInfo=data;
        for(let vesselRes of this.vesselInfo){
          this.vesselName=vesselRes.name;
          this.exportRotation=vesselRes.ib_vyg;
          this.arrivalTime=vesselRes.ata;
          this.departTime=vesselRes.atd;

        }
      });
      this.exportContainerBayViewService.getExportContainerBayViewList(this.rotation).subscribe(result=>{
        this.resultList=result;
      });
    }
  }

}
