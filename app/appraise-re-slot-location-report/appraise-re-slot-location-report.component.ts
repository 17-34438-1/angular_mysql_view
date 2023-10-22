import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRaiseReSlotLocationService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/app-raise-re-slot-location/app-raise-re-slot-location.service';


@Component({
  selector: 'app-appraise-re-slot-location-report',
  templateUrl: './appraise-re-slot-location-report.component.html',
  styleUrls: ['./appraise-re-slot-location-report.component.css']
})
export class AppraiseReSlotLocationReportComponent implements OnInit {
  searchDate:any;
  containers:any;
  resultList:any;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private appRaiseReSlotLocationService:AppRaiseReSlotLocationService
  ) {
    this.searchDate=localStorage.getItem("AppRaiseReSlotLocationSearchDate")
    this.containers=localStorage.getItem("AppRaiseReSlotLocationContainers");
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
      this.appRaiseReSlotLocationService.getAppRaiseReSlotLocationList(this.searchDate,this.containers).subscribe(result=>{
        this.resultList=result;
      })
    }
  }

}
