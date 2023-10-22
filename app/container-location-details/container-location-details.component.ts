import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContainerLocationService } from '../service/container-location/container-location.service';

@Component({
  selector: 'app-container-location-details',
  templateUrl: './container-location-details.component.html',
  styleUrls: ['./container-location-details.component.css']
})
export class ContainerLocationDetailsComponent implements OnInit {

  container: any;
  containerNumber: any;

  constructor(
    private containerService: ContainerLocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.containerNumber = this.activatedRoute.snapshot.params['containerNumber'];

    this.containerService.getContainerLocation(this.containerNumber).subscribe(data =>{
      this.container = data;
      console.log(data);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    });

  }

}
