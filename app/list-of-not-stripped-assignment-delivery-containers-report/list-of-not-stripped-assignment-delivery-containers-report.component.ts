import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListOfNotStrippedAssignmentDeliveryContainersService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/list-of-not-stripped-assignment-delivery-containers/list-of-not-stripped-assignment-delivery-containers.service';

@Component({
  selector: 'app-list-of-not-stripped-assignment-delivery-containers-report',
  templateUrl: './list-of-not-stripped-assignment-delivery-containers-report.component.html',
  styleUrls: ['./list-of-not-stripped-assignment-delivery-containers-report.component.css']
})
export class ListOfNotStrippedAssignmentDeliveryContainersReportComponent implements OnInit {
  date:any;
  yardName:any;
  resultList:any;
  total20:number=0;
  total40:number=0;
  containers:any="";
  containerList:any;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private listOfNotStrippedAssignmentDeliveryContainersService:ListOfNotStrippedAssignmentDeliveryContainersService
  ) {
    this.date=localStorage.getItem("listOfStrippedAssignmentDeliveryContainersDate")
    this.yardName=localStorage.getItem("listOfStrippedAssignmentDeliveryContainersYardName");
   
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
      this.listOfNotStrippedAssignmentDeliveryContainersService.getListOfNotStrippedAssignmentDeliveryContainers(this.date,this.yardName).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.total20=res.total20;
          this.total40=res.total40;
          this.containers=res.totalContainers;
          this.containerList=res.strippedAssignmentDeliveryContainersModelList;

        }

      });

    }
  }

}
