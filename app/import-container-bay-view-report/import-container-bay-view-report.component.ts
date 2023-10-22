import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImportContainerBayViewService } from '../service/ImportReports/import-container-bay-view/import-container-bay-view.service';

@Component({
  selector: 'app-import-container-bay-view-report',
  templateUrl: './import-container-bay-view-report.component.html',
  styleUrls: ['./import-container-bay-view-report.component.css']
})
export class ImportContainerBayViewReportComponent implements OnInit {
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
    private importContainerBayViewService:ImportContainerBayViewService
  ) {
    this.vvdGkey=localStorage.getItem("importContainerBayViewVvdGkey");
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
      this.importContainerBayViewService.getImportContainerBayVesselInfo(this.vvdGkey).subscribe(data=>{
        this.vesselInfo=data;
        for(let vesselRes of this.vesselInfo){
          this.vesselName=vesselRes.name;
          this.rotation=vesselRes.ib_vyg;
          this.arrivalTime=vesselRes.ata;
          this.departTime=vesselRes.atd;

        }
      });
      this.importContainerBayViewService.getImportContainerBayViewList(this.vvdGkey).subscribe(result=>{
        this.resultList=result;
      });
    }
  }

}
