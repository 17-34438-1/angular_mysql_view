import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateVesselForExportContainersService } from '../service/ShahinSpecialReport/update-vessel-for-export-containers/update-vessel-for-export-containers.service';

@Component({
  selector: 'app-update-vessel-for-export-containers',
  templateUrl: './update-vessel-for-export-containers.component.html',
  styleUrls: ['./update-vessel-for-export-containers.component.css']
})
export class UpdateVesselForExportContainersComponent implements OnInit {
  updateVesselForExportContainersForm:any;
  preRotation:any="";
  newRotation:any="";
  containers:any="";
  message:any="";
  resultList:any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private updateVesselForExportContainersService:UpdateVesselForExportContainersService 
  ) { 
    this.updateVesselForExportContainersForm=this.formBuilder.group({});
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
  onSubmit(event:any):any{
    this.preRotation=event.preRotation.value;
    this.newRotation=event.newRotation.value;
    this.containers=event.containers.value;
    if(this.preRotation !="" && this.newRotation !="" && this.containers !=""){
      let preImportRotation=this.preRotation.replace("/","-");
      let newImportRotation=this.newRotation.replace("/","-");
      this.updateVesselForExportContainersService.updateVesselForExportContainer(preImportRotation,newImportRotation,this.containers).subscribe(result=>{
        this.resultList=result;
      
      });

    }
    else{
      this.toastr.error('Fill All The Feild', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });

      }
      

    }
  

}
