import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentAndDeliveryEmptySummaryService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/assignment-and-delivery-empty-summary/assignment-and-delivery-empty-summary.service';

@Component({
  selector: 'app-assignment-and-delivery-empty-summary',
  templateUrl: './assignment-and-delivery-empty-summary.component.html',
  styleUrls: ['./assignment-and-delivery-empty-summary.component.css']
})
export class AssignmentAndDeliveryEmptySummaryComponent implements OnInit {
  assingmentDeliveryAndEmptySummaryForm:any;
  date:any;
  yardName:any;
  fileType:any;
  resultList:any;
 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private assignmentAndDeliveryEmptySummaryService:AssignmentAndDeliveryEmptySummaryService
  ) {
    this.assingmentDeliveryAndEmptySummaryForm= this.formBuilder.group({});
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
    this.yardName=event.yardName.value;
    this.fileType=event.fileType.value;
    if(this.fileType=="xl"){
      this.assignmentAndDeliveryEmptySummaryService.getAssignmentAndDeliverySummary(this.date,this.yardName).subscribe(result=>{
        this.resultList=result;
        this.assignmentAndDeliveryEmptySummaryService.getResultWithExcel(this.date,this.yardName,this.resultList);

      });

    }
    else if(this.fileType=="html"){
      localStorage.setItem("allAssignmentAndDeliverySummaryAssignDate",this.date);
      localStorage.setItem("allAssignmentAndDeliverySummaryYardName",this.yardName);
      this.router.navigate([]).then(result=>window.open('importReports/assignmentAndDeliveryEmptySummary/report', '_blank'));

    }
 }
  onValueChange(value:any){
    
      
  }

}
