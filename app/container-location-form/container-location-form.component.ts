import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-location-form',
  templateUrl: './container-location-form.component.html',
  styleUrls: ['./container-location-form.component.css']
})
export class ContainerLocationFormComponent implements OnInit {

  containerNumber: String;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.containerNumber = '';
  }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
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

  onContainerSubmit() {
    window.open('container/location/details/' + this.containerNumber, '_blank');
  }

}
