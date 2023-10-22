import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportBlankBayViewService } from '../service/ExportReports/export-blank-bay-view/export-blank-bay-view.service';

@Component({
  selector: 'app-export-blank-bay-view-report',
  templateUrl: './export-blank-bay-view-report.component.html',
  styleUrls: ['./export-blank-bay-view-report.component.css']
})
export class ExportBlankBayViewReportComponent implements OnInit {
  resultList:any;
  vvdGkey:any;
  vesselInfo:any;
  vesselName:any;
  rotation:any;
  arrivalTime:any;
  departTime:any;
 


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private exportBlankBayViewService:ExportBlankBayViewService
  ) {
    this.vvdGkey=localStorage.getItem("ExportBlankBayViewVvdGkey");
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
      this.exportBlankBayViewService.getExportBlankBayViewVesselInfo(this.vvdGkey).subscribe(data=>{
        this.vesselInfo=data;
        for(let vesselRes of this.vesselInfo){
          this.vesselName=vesselRes.name;
          this.rotation=vesselRes.ib_vyg;
          this.arrivalTime=vesselRes.ata;
          this.departTime=vesselRes.atd;

        }
      });
      this.exportBlankBayViewService.getExportBlankBayViewList(this.vvdGkey).subscribe(result=>{
        this.resultList=result;
      });
    }
  }

}
