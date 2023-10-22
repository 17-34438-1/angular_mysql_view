import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRaiseReSlotLocationService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/app-raise-re-slot-location/app-raise-re-slot-location.service';


@Component({
  selector: 'app-appraise-re-slot-location',
  templateUrl: './appraise-re-slot-location.component.html',
  styleUrls: ['./appraise-re-slot-location.component.css']
})
export class AppraiseReSlotLocationComponent implements OnInit {
  appRaiseReSoltLocationForm:any;
  searchDate:any;
  containers:any;
  fileType:any;
  resultList:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private appRaiseReSlotLocationService:AppRaiseReSlotLocationService
  ) { 
    this.appRaiseReSoltLocationForm=this.formBuilder.group({});
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
    this.searchDate=event.searchDate.value;
    this.containers=event.containers.value;
    this.fileType=event.fileType.value;
    if(this.fileType=="xl"){
      this.appRaiseReSlotLocationService.getAppRaiseReSlotLocationList(this.searchDate,this.containers).subscribe(result=>{
        this.resultList=result;
        this.appRaiseReSlotLocationService.getResultWithExcel(this.searchDate,this.resultList);
      })

    }
    else if(this.fileType=="html"){
      localStorage.setItem("AppRaiseReSlotLocationSearchDate",this.searchDate);
      localStorage.setItem("AppRaiseReSlotLocationContainers",this.containers);
      this.router.navigate([]).then(result=>window.open('importReports/AppraiseReSlotLocation/report', '_blank'));

    }
    
  }

}
