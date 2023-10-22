import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContainerSearchService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/container-search/container-search.service';

@Component({
  selector: 'app-container-search-report',
  templateUrl: './container-search-report.component.html',
  styleUrls: ['./container-search-report.component.css']
})
export class ContainerSearchReportComponent implements OnInit {
  containerSearch:any;
  date:any;
  containerNo:any;
  resultList:any;
  totalCotainers:string="";
  total:number=0;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private containerSearchService:ContainerSearchService
  ) {
    this.date=localStorage.getItem("allAssignmentContainerSearchAssignDate")
    this.containerNo=localStorage.getItem("allAssignmentContainerSearchContainerNo");
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
      this.containerSearchService.getContainerSearchResult(this.date,this.containerNo).subscribe(result=>{
        this.resultList=result;
        this.total=this.resultList.length;
        for(let res of this.resultList){
          this.totalCotainers=this.totalCotainers+","+res.cont_number;

        }
        this.totalCotainers=this.totalCotainers.substring(1);
      });
    }
  }

}
