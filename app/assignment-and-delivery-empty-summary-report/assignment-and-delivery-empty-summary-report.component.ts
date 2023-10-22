import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssignmentAndDeliveryEmptySummaryService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/assignment-and-delivery-empty-summary/assignment-and-delivery-empty-summary.service';

@Component({
  selector: 'app-assignment-and-delivery-empty-summary-report',
  templateUrl: './assignment-and-delivery-empty-summary-report.component.html',
  styleUrls: ['./assignment-and-delivery-empty-summary-report.component.css']
})
export class AssignmentAndDeliveryEmptySummaryReportComponent implements OnInit {
  date:any;
  yardName:any;
  resultList:any;
  j20:number=0;
  j40:number=0;
  a20:number = 0;
  a40:number = 0;
  b20:number = 0;
  c20:number = 0;
  b40:number=0;
  c40:number=0;
  stayed:number=0;

  constructor(
    private router: Router,
   private toastr:ToastrService,
    private assignmentAndDeliveryEmptySummaryService:AssignmentAndDeliveryEmptySummaryService
  ) { 
    this.date=localStorage.getItem("allAssignmentAndDeliverySummaryAssignDate")
    this.yardName=localStorage.getItem("allAssignmentAndDeliverySummaryYardName");
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
      this.assignmentAndDeliveryEmptySummaryService.getAssignmentAndDeliverySummary(this.date,this.yardName).subscribe(result=>{
        this.resultList=result;
        console.log(this.resultList);
        for(let res of this.resultList){
         
          this.j20=res.j20;
          this.j40=res.j40;
          this.a20=res.a20;
          this.a40=res.a40;
          this.b20=res.b20;
          this.b40=res.b40;
          this.c20=res.c20;
          this.c40=res.c40;
          this.stayed=res.stayed;
          
          
        }

      });

    }
  }

}
