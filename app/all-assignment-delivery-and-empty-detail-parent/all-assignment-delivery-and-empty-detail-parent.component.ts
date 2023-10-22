import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-assignment-delivery-and-empty-detail-parent',
  templateUrl: './all-assignment-delivery-and-empty-detail-parent.component.html',
  styleUrls: ['./all-assignment-delivery-and-empty-detail-parent.component.css']
})
export class AllAssignmentDeliveryAndEmptyDetailParentComponent implements OnInit {
  allAssingmentDeliveryAndEmptyDetail:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
  ) {
    this.allAssingmentDeliveryAndEmptyDetail=this.formBuilder.group({});
   }

  ngOnInit(): void {
  }
  onSubmit(){

  }

}
