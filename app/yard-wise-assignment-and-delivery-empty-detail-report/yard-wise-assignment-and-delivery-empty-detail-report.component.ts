import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { YardWiseAssignmentAndDeliveryEmptyDetailService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/yard-wise-assignment-and-delivery-empty-detail/yard-wise-assignment-and-delivery-empty-detail.service';


@Component({
  selector: 'app-yard-wise-assignment-and-delivery-empty-detail-report',
  templateUrl: './yard-wise-assignment-and-delivery-empty-detail-report.component.html',
  styleUrls: ['./yard-wise-assignment-and-delivery-empty-detail-report.component.css']
})
export class YardWiseAssignmentAndDeliveryEmptyDetailReportComponent implements OnInit {
  fromDate:any;
  i:number=0;
  block:any;
  yardName:any;
  resultList:any;
  shiftA:any;
  shiftB:any;
  shiftC:any;
  noShift:any;
 shifTATotal20:any;
 shifTATotal40:any;
  shifTBTotal20:any;
 shifTBTotal40:any;
 shifTCTotal20:any;
 shifTCTotal40:any;
noShiftYard20:any;
noShiftYard40:any;
   j20:number=0;
   j40:number=0;
   a20:number = 0;
   a40:number = 0;
   b20:number = 0;
   c20:number = 0;
   b40:number=0;
   c40:number=0;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private yardWiseAssignmentAndDeliveryEmptyDetailService:YardWiseAssignmentAndDeliveryEmptyDetailService
  ) {
    this.fromDate=localStorage.getItem("YardWiseAssingmentDeliveryAndEmptyDetailFromDate")
    this.yardName=localStorage.getItem("YardWiseAssingmentDeliveryAndEmptyDetailYardName");
    this.block=localStorage.getItem("YardWiseAssingmentDeliveryAndEmptyDetailBlockName");
   
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
      this.yardWiseAssignmentAndDeliveryEmptyDetailService.getYardWiseAssignmentAndDeliveryDetail(this.fromDate,this.yardName,this.block).subscribe(result=>{
          this.resultList=result;
          for(let res of this.resultList){
            this.shiftA=res.shifA;
            this.shiftB=res.shifB;
            this.shiftC=res.shifC;
            this.noShift=res.noshiftyardList;
            this.shifTATotal20=res.shifTATotal20;
            this.shifTATotal40=res.shifTATotal40;
            this.shifTBTotal20=res.shifTBTotal20;
            this.shifTBTotal40=res.shifTBTotal40;
            this.shifTCTotal20=res.shifTCTotal20;
            this.shifTCTotal40=res.shifTCTotal40;
            this.noShiftYard20=res.noshiftyard20;
            this.noShiftYard40=res.noshiftyard40;
            this.j20=res.j20;
            this.j40=res.j40;
            this.a20=res.a20;
            this.a40=res.a40;
            this.b20=res.b20;
            this.b40=res.b40;
            this.c20=res.c20;
            this.c40=res.c40;
            
            
          }
      });
    }
  }

}
