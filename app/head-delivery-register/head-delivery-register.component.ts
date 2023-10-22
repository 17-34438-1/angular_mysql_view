import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeadDeliveryRegisterService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/head-delivery-register/head-delivery-register.service';

@Component({
  selector: 'app-head-delivery-register',
  templateUrl: './head-delivery-register.component.html',
  styleUrls: ['./head-delivery-register.component.css']
})
export class HeadDeliveryRegisterComponent implements OnInit {
  headDeliveryRegister:any;
  date:any;
  terminal:any;
  block:any;
  assignmentType:any;
  assignTypeList:any;
  blockList:any;
  resultList:any;
  resultInfo:any=[];
  isEditableBlock:Boolean=true;
  isEditableAssignmentType:Boolean=true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private headDeliveryRegisterService:HeadDeliveryRegisterService
  ) { 
    this.headDeliveryRegister=this.formBuilder.group({});
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
    this.date=event.date.value;
    this.terminal=event.terminal.value;
    this.block=event.block.value;
    this.assignmentType=event.assignmentType.value;
    if(this.terminal==""){
      this.toastr.error('Choose a Terminal', 'Error',{
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
      localStorage.setItem("headDeliveryRegisterDate",this.date);
      localStorage.setItem("headDeliveryRegisterTerminal",this.terminal);
      localStorage.setItem("headDeliveryRegisterBlock",this.block);
      localStorage.setItem("headDeliveryRegisterAssignType",this.assignmentType);
      if(this.terminal=="CCT" || this.terminal=="NCT"){
        this.router.navigate([]).then(result=>window.open('importReports/HeadDeliveryRegisterCctNct/report', '_blank'));

      }
      else if(this.terminal=="GCB"){
        this.router.navigate([]).then(result=>window.open('importReports/HeadDeliveryRegisterGcb/report', '_blank'));
      }
     /* this.headDeliveryRegisterService.getHeadDeliveryRegisterList(this.date,this.terminal,this.block,this.assignmentType).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.resultInfo.push(res.resultInfo);
          
        }
        console.log(this.resultInfo);
      })*/

    }
    
  }
  onValueChange(terminal:any){
    if(terminal=="CCT" || terminal=="NCT"){
      this.isEditableAssignmentType=false;
      this.isEditableBlock=true;
      
      this.headDeliveryRegisterService.getAssignType(terminal).subscribe(data=>{
        this.assignTypeList=data;
      });

    }
    else if(terminal=="GCB"){
      this.isEditableAssignmentType=false;
      this.isEditableBlock=false;
      this.headDeliveryRegisterService.getAssignType(terminal).subscribe(data=>{
        this.assignTypeList=data;
      });
      this.headDeliveryRegisterService.getBlockList(terminal).subscribe(data=>{
        this.blockList=data;
      });
    }
    else 
    {
      this.isEditableAssignmentType=true;
      this.isEditableBlock=true;
    }

  }

}
