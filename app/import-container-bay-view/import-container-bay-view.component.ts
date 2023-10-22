import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImportContainerBayViewService } from '../service/ImportReports/import-container-bay-view/import-container-bay-view.service';

@Component({
  selector: 'app-import-container-bay-view',
  templateUrl: './import-container-bay-view.component.html',
  styleUrls: ['./import-container-bay-view.component.css']
})
export class ImportContainerBayViewComponent implements OnInit {
  importContainerBayViewForm:any;
  vesselList:any;
  vvdGkey:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private importContainerBayViewService:ImportContainerBayViewService
  ) {
    this.importContainerBayViewForm=this.formBuilder.group({});
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
      this.importContainerBayViewService.getImportContainerBayViewVesselList().subscribe(result=>{
        this.vesselList=result;
      });
    }
  }

  onSubmit(event:any){
    this.vvdGkey=event.vvdGkey.value;
    localStorage.setItem("importContainerBayViewVvdGkey",this.vvdGkey);
    this.router.navigate([]).then(result=>window.open('importReports/ImportContainerBayView/report', '_blank'));
  }

}
