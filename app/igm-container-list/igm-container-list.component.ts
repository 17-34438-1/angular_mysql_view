import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { IgmContainerListService } from '../service/ShahinSpecialReport/igm-container-List/igm-container-list.service';

@Component({
  selector: 'app-igm-container-list',
  templateUrl: './igm-container-list.component.html',
  styleUrls: ['./igm-container-list.component.css']
})
export class IgmContainerListComponent implements OnInit {
  igmContainerListForm:any;
  rotation:any="";
  searchType:any="";
  resultList:any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private igmContainerListService:IgmContainerListService
  ) {
    this.igmContainerListForm=this.formBuilder.group({});
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
  onValueChange(value:any){

  }
  onSubmit(event:any){
    this.rotation=event.rotation.value;
    this.searchType=event.searchType.value;
    let importRotation="";
    //importRotation=this.rotation;
   // importRotation=importRotation.replace("/","-");
  //  console.log("im" + importRotation+ " searchType "+ this.searchType);
  if(this.rotation!=""){
    let importRotation="";
     importRotation=this.rotation.replace("/","-");
     this.igmContainerListService.getIGMContainerList(importRotation,this.searchType).subscribe(result=>{
      this.resultList=result;
     });
  }
  else{
    this.toastr.error('Rotation is Empty', 'Error',{
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
