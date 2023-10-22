import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeadDeliveryRegisterService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/head-delivery-register/head-delivery-register.service';

@Component({
  selector: 'app-head-delivery-register-gcb',
  templateUrl: './head-delivery-register-gcb.component.html',
  styleUrls: ['./head-delivery-register-gcb.component.css']
})
export class HeadDeliveryRegisterGcbComponent implements OnInit {
  date:any;
  terminal:any;
  block:any;
  assignmentType:any;
  assignTypeList:any;
  blockList:any;
  blank:any=" ";
  resultList:any=[];
  resultInfo:any=[];
  truckInfo:any=[];


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private headDeliveryRegisterService:HeadDeliveryRegisterService
  ) {
    this.resultList=[]
    this.date=localStorage.getItem("headDeliveryRegisterDate")
    this.terminal=localStorage.getItem("headDeliveryRegisterTerminal")
    this.block=localStorage.getItem("headDeliveryRegisterBlock")
    this.assignmentType=localStorage.getItem("headDeliveryRegisterAssignType")
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
      this.headDeliveryRegisterService.getHeadDeliveryRegisterList(this.date,this.terminal,this.block,this.assignmentType).subscribe(result=>{
        this.resultList=result;
        /*for(let res of this.resultList){
          this.resultInfo.push(res.resultInfo);
          
        }
        for(let res of this.resultInfo){
          this.truckInfo.push(res.truckInfo)
        }
        console.log(this.truckInfo);*/
      });
      
    }
  }

}
