import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListOfNotStrippedAssignmentDeliveryContainersService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/list-of-not-stripped-assignment-delivery-containers/list-of-not-stripped-assignment-delivery-containers.service';

@Component({
  selector: 'app-list-of-not-stripped-assignment-delivery-containers',
  templateUrl: './list-of-not-stripped-assignment-delivery-containers.component.html',
  styleUrls: ['./list-of-not-stripped-assignment-delivery-containers.component.css']
})
export class ListOfNotStrippedAssignmentDeliveryContainersComponent implements OnInit {
  listOfNotStrippedAssignmentDeliveryContainersFForm:any;
  date:any;
  yardName:any;
  resultList:any;
  fileType:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private listOfNotStrippedAssignmentDeliveryContainersService:ListOfNotStrippedAssignmentDeliveryContainersService
  ) { 
    this.listOfNotStrippedAssignmentDeliveryContainersFForm= this.formBuilder.group({});
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
      this.listOfNotStrippedAssignmentDeliveryContainersService.getListOfNotStrippedAssignmentDeliveryContainers(this.date,this.yardName).subscribe(result=>{
        this.resultList=result;
        this.listOfNotStrippedAssignmentDeliveryContainersService.getResultWithExcel(this.date,this.yardName,this.resultList)
      })

    }
    else if(this.fileType=="html"){
      localStorage.setItem("listOfStrippedAssignmentDeliveryContainersDate",this.date);
      localStorage.setItem("listOfStrippedAssignmentDeliveryContainersYardName",this.yardName);
      this.router.navigate([]).then(result=>window.open('importReports/listOfNotStrippedAssignmentDeliveryContainers/report', '_blank'));

    }
  }

}
