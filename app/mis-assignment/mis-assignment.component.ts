import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MisAssignmentService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/mis-assignment/mis-assignment.service';

@Component({
  selector: 'app-mis-assignment',
  templateUrl: './mis-assignment.component.html',
  styleUrls: ['./mis-assignment.component.css']
})
export class MisAssignmentComponent implements OnInit {
  misAssignment:any;
  date:any;
  terminal:any;
  block:any;
  fileType:any;
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
    private misAssignmentService:MisAssignmentService
  ) {
    this.misAssignment=this.formBuilder.group({});
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
    this.fileType=event.fileType.value;
    if(this.fileType=="xl"){
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
        if(this.terminal=="CCT" || this.terminal=="NCT" || this.terminal=="OFY"){
          this.misAssignmentService.getMisAssignmentList(this.date,this.terminal,this.block,this.assignmentType).subscribe(result=>{
            this.resultList=result;
            this.misAssignmentService.getCctNctListWithExcel(this.date,this.terminal,this.resultList);
          });
  
        }
        else if(this.terminal=="GCB"){
          this.misAssignmentService.getMisAssignmentList(this.date,this.terminal,this.block,this.assignmentType).subscribe(result=>{
            this.resultList=result;
            this.misAssignmentService.getGcbListWithExcel(this.date,this.terminal,this.block,this.resultList);
          });
         
        }

      }

    }
    else if(this.fileType=="html"){
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
        localStorage.setItem("misAssignmentDate",this.date);
        localStorage.setItem("misAssignmentTerminal",this.terminal);
        localStorage.setItem("misAssignmentBlock",this.block);
        localStorage.setItem("misAssignmentAssignType",this.assignmentType);
        if(this.terminal=="CCT" || this.terminal=="NCT" || this.terminal=="OFY"){
          this.router.navigate([]).then(result=>window.open('importReports/MisAssignmentCctNct/report', '_blank'));
  
        }
        else if(this.terminal=="GCB"){
          this.router.navigate([]).then(result=>window.open('importReports/MisAssignmentGcb/report', '_blank'));
        }
      }

    }
   /* if(this.terminal==""){
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
      localStorage.setItem("misAssignmentDate",this.date);
      localStorage.setItem("misAssignmentTerminal",this.terminal);
      localStorage.setItem("misAssignmentBlock",this.block);
      localStorage.setItem("misAssignmentAssignType",this.assignmentType);
      if(this.terminal=="CCT" || this.terminal=="NCT" || this.terminal=="OFY"){
        this.router.navigate([]).then(result=>window.open('importReports/MisAssignmentCctNct/report', '_blank'));

      }
      else if(this.terminal=="GCB"){
        this.router.navigate([]).then(result=>window.open('importReports/MisAssignmentGcb/report', '_blank'));
      }
    }*/
    
  }

  onValueChange(terminal:any){
    if(terminal=="CCT" || terminal=="NCT" || terminal=="OFY"){
      this.isEditableAssignmentType=false;
      this.isEditableBlock=true;
      
      this.misAssignmentService.getAssignType(terminal).subscribe(data=>{
        this.assignTypeList=data;
      });

    }
    else if(terminal=="GCB"){
      this.isEditableAssignmentType=false;
      this.isEditableBlock=false;
      this.misAssignmentService.getAssignType(terminal).subscribe(data=>{
        this.assignTypeList=data;
      });
      this.misAssignmentService.getBlockList(terminal).subscribe(data=>{
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
