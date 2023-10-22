import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipmentHandlingPerformaceRtgTimeWiseService } from '../service/ShahinSpecialReport/equipment-handling-performace-rtg-time-wise/equipment-handling-performace-rtg-time-wise.service';

@Component({
  selector: 'app-equipment-handling-performace-rtg-time-wise',
  templateUrl: './equipment-handling-performace-rtg-time-wise.component.html',
  styleUrls: ['./equipment-handling-performace-rtg-time-wise.component.css']
})
export class EquipmentHandlingPerformaceRtgTimeWiseComponent implements OnInit {
  equipmentHandlingPerformaceRtgTimeWiseForm:FormGroup;
  isEditable:Boolean=true;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  fileType:any;
  resultList:any;
  detailPage:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private equipmentHandlingPerformaceRtgTimeWiseService:EquipmentHandlingPerformaceRtgTimeWiseService
    
  ) {
    this.equipmentHandlingPerformaceRtgTimeWiseForm=formBuilder.group({});
    this.shift="";
    this.fromDate="";
    this.fromTime="";
    this.toDate="";
    this.toTime="";
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
  onShiftChange(value:any){
   
    }

  onSubmit(event:any){
    this.shift=event.shift.value;
    this.fromDate=event.fromDate.value;
    this.fileType=event.fileType.value;
    if(this.shift!="" && this.fromDate!=""){
      if(this.fileType!=""){
        if(this.fileType=="xl"){
          this.equipmentHandlingPerformaceRtgTimeWiseService.equipmentHandlingPerformaceRtgTimeWise(this.fromDate,this.shift).subscribe(result=>{
            this.resultList=result;
            this.equipmentHandlingPerformaceRtgTimeWiseService.getResultWithExcel(this.fromDate,this.shift,this.resultList);
          });


        }
        else if(this.fileType=="html"){
          localStorage.setItem("equipmentHandlingPerformaceRtgTimeWiseShift",this.shift);
          localStorage.setItem("equipmentHandlingPerformaceRtgTimeWiseFromDate",this.fromDate);
          this.router.navigate([]).then(result=>window.open('shahinSpecialReports/EquipmentHandlingPerformaceRtgTimeWise/report', '_blank'));

        }

      }
      else{
        this.toastr.error('Select A File Type', 'Error',{
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
    else{
      if(this.shift=="" && this.fromDate==""){
        this.toastr.error('Please Select a Shift And Give A From Date  ', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }
      else if(this.shift==""){
        this.toastr.error('Please Select a Shift', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });

      }
      else if(this.fromDate==""){
        this.toastr.error('Please Give A From Date  ', 'Error',{
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

}
