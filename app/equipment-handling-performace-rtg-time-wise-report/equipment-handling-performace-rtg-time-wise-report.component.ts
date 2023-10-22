import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EquipmentHandlingPerformaceRtgTimeWiseService } from '../service/ShahinSpecialReport/equipment-handling-performace-rtg-time-wise/equipment-handling-performace-rtg-time-wise.service';


@Component({
  selector: 'app-equipment-handling-performace-rtg-time-wise-report',
  templateUrl: './equipment-handling-performace-rtg-time-wise-report.component.html',
  styleUrls: ['./equipment-handling-performace-rtg-time-wise-report.component.css']
})
export class EquipmentHandlingPerformaceRtgTimeWiseReportComponent implements OnInit {
  searchText:any;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  show:Boolean=false;


  constructor(
    private toastr:ToastrService,
    private router:Router,
    private equipmentHandlingPerformaceRtgTimeWiseService:EquipmentHandlingPerformaceRtgTimeWiseService
  ) {
    this.shift= localStorage.getItem("equipmentHandlingPerformaceRtgTimeWiseShift");
    this.fromDate=localStorage.getItem("equipmentHandlingPerformaceRtgTimeWiseFromDate");
   
    
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
      this.equipmentHandlingPerformaceRtgTimeWiseService.equipmentHandlingPerformaceRtgTimeWise(this.fromDate,this.shift).subscribe(result=>{
        this.resultList=result;
      });
    }
  }

}
