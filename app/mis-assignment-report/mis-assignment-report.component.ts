import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MisAssignmentService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/mis-assignment/mis-assignment.service';

@Component({
  selector: 'app-mis-assignment-report',
  templateUrl: './mis-assignment-report.component.html',
  styleUrls: ['./mis-assignment-report.component.css']
})
export class MisAssignmentReportComponent implements OnInit {
  date:any;
  terminal:any;
  block:any;
  assignmentType:any;
  assignTypeList:any;
  blockList:any;
  blank:any=" ";
  resultList:any=[];
  show:Boolean=true;
  length:number=0;


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private misAssignmentService:MisAssignmentService
  ) { 
    this.date=localStorage.getItem("misAssignmentDate")
    this.terminal=localStorage.getItem("misAssignmentTerminal")
    this.block=localStorage.getItem("misAssignmentBlock")
    this.assignmentType=localStorage.getItem("misAssignmentAssignType")
   
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
      this.misAssignmentService.getMisAssignmentList(this.date,this.terminal,this.block,this.assignmentType).subscribe(result=>{
        this.resultList=result;
        this.length=this.resultList.length;
      });

    }
  }
  print(){
    window.print();
    this.show=false;
  }

}
