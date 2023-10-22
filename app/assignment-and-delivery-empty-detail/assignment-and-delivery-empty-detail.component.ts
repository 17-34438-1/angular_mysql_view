import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentAndDeliveryEmptyDetailService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/assignment-and-delivery-empty-detail/assignment-and-delivery-empty-detail.service';

@Component({
  selector: 'app-assignment-and-delivery-empty-detail',
  templateUrl: './assignment-and-delivery-empty-detail.component.html',
  styleUrls: ['./assignment-and-delivery-empty-detail.component.css']
})
export class AssignmentAndDeliveryEmptyDetailComponent implements OnInit {
  assingmentDeliveryAndEmptyDetail:any;
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private assignmentAndDeliveryEmptyDetailService:AssignmentAndDeliveryEmptyDetailService
  ) { 
    this.assingmentDeliveryAndEmptyDetail= this.formBuilder.group({});
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
     this.loginId=localStorage.getItem("loginId");

    }
  }
  onSubmit(event:any){
    this.fromDate=event.fromDate.value;
    this.toDate=event.toDate.value;
    this.yardName=event.yardName.value;
    this.containerNo=event.containerNo.value;
    this.fileType=event.fileType.value;
    this.assignmentOption=event.assignmentOption.value;
    if(this.assignmentOption=="Assignment"){
      if(this.fileType=="xl"){
        
      
        this.assignmentAndDeliveryEmptyDetailService.getAssignmentandDeliveryEmptyDetailList(this.fromDate,this.loginId,this.yardName).subscribe(result=>{
         this.resultList=result;
         console.log(this.resultList);
        this.assignmentAndDeliveryEmptyDetailService.getResultWithExcel(this.fromDate,this.yardName,this.resultList);
        });

      }
      else if(this.fileType=="html"){
        localStorage.setItem("assingmentDeliveryAndEmptyDetailFromDate",this.fromDate);
        localStorage.setItem("assingmentDeliveryAndEmptyDetailLoginId",this.loginId);
        localStorage.setItem("assingmentDeliveryAndEmptyDetailYardName",this.yardName);
        
        this.router.navigate([]).then(result=>window.open('importReports/assignmentDeliveryAndEmptyDetail/report', '_blank'));

      }
      else if(this.fileType=="pdf"){

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

}
