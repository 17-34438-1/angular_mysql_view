import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { YardWiseAssignmentAndDeliveryEmptyDetailService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/yard-wise-assignment-and-delivery-empty-detail/yard-wise-assignment-and-delivery-empty-detail.service';

@Component({
  selector: 'app-yard-wise-assignment-and-delivery-empty-detail',
  templateUrl: './yard-wise-assignment-and-delivery-empty-detail.component.html',
  styleUrls: ['./yard-wise-assignment-and-delivery-empty-detail.component.css']
})
export class YardWiseAssignmentAndDeliveryEmptyDetailComponent implements OnInit {
  yardWiseAssingmentDeliveryAndEmptyDetail:any;
  fromDate:any;
  toDate:any;
  yardName:any;
  containerNo:any;
  assignmentOption:any;
  loginId:any;
  fileType:any;
  isEditableToDate:boolean=true;
  isEditableFromDate:boolean=false;
  isEditableYardName:boolean=false;
  isEditableCotainerNo:boolean=true;
  resultList:any;
  blockList:any;
  block:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private yardWiseAssignmentAndDeliveryEmptyDetailService:YardWiseAssignmentAndDeliveryEmptyDetailService
  ) {
    this.yardWiseAssingmentDeliveryAndEmptyDetail=this.formBuilder.group({});
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
    this.fromDate=event.fromDate.value;
    this.toDate=event.toDate.value;
    this.yardName=event.yardName.value;
    this.containerNo=event.containerNo.value;
    this.block=event.block.value;
    this.fileType=event.fileType.value;
    this.assignmentOption=event.assignmentOption.value;
    if(this.assignmentOption=="Assignment"){
      if(this.fileType=="xl"){
        this.yardWiseAssignmentAndDeliveryEmptyDetailService.getYardWiseAssignmentAndDeliveryDetail(this.fromDate,this.yardName,this.block).subscribe(result=>{
          this.resultList=result;
          this.yardWiseAssignmentAndDeliveryEmptyDetailService.getResultWithExcel(this.fromDate,this.yardName,this.block,this.resultList);
        })
      }
      else if(this.fileType=="html"){
        localStorage.setItem("YardWiseAssingmentDeliveryAndEmptyDetailFromDate",this.fromDate);
        localStorage.setItem("YardWiseAssingmentDeliveryAndEmptyDetailYardName",this.yardName);
        localStorage.setItem("YardWiseAssingmentDeliveryAndEmptyDetailBlockName",this.block);
        console.log (this.block);
        
        this.router.navigate([]).then(result=>window.open('importReports/yardWiseAssignmentAndDeliveryEmptyDetail/report', '_blank'));

      }
    }
     
    
  }
  onValueChange(value:any){
    if(value=="Assignment"){
      this.isEditableToDate=true;
      this.isEditableFromDate=false;
      this.isEditableYardName=false;
      this.isEditableCotainerNo=true;

    }
    else if (value=="Assignment(E)"){
      this.isEditableToDate=false;
      this.isEditableFromDate=false;
      this.isEditableYardName=true;
      this.isEditableCotainerNo=true;

    }
   
    else if (value=="Delivery"){
      this.isEditableToDate=false;
      this.isEditableFromDate=false;
      this.isEditableYardName=false;
      this.isEditableCotainerNo=true;

    }
    else if (value=="Container"){
      this.isEditableToDate=true;
      this.isEditableFromDate=true;
      this.isEditableYardName=true;
      this.isEditableCotainerNo=false;

    }
      
  }

  onYardChange(yardName:any){
    this.yardWiseAssignmentAndDeliveryEmptyDetailService.getBlockList(yardName).subscribe(data=>{
      this.blockList=data;
    })

  }


}
