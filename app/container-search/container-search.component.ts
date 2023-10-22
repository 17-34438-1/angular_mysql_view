import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-search',
  templateUrl: './container-search.component.html',
  styleUrls: ['./container-search.component.css']
})
export class ContainerSearchComponent implements OnInit {
  containerSearch:any;
  date:string="";
  containerNo:string="";


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
  ) { 
    
    this.containerSearch=this.formBuilder.group({});
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
    this.containerNo=event.containerNo.value;
    if(this.containerNo!=""){
      localStorage.setItem("allAssignmentContainerSearchAssignDate",this.date);
      localStorage.setItem("allAssignmentContainerSearchContainerNo",this.containerNo);
      this.router.navigate([]).then(result=>window.open('importReports/containerSearch', '_blank'));

    }
    else{
      this.toastr.error('Container No is Empty.', 'Error',{
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
