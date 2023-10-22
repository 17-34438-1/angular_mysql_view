import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as fs  from 'file-saver';
import { ConvertPangaonContainerService } from '../service/Pangaon/convert-pangaon-container/convert-pangaon-container.service';

@Component({
  selector: 'app-convert-pangaon-container',
  templateUrl: './convert-pangaon-container.component.html',
  styleUrls: ['./convert-pangaon-container.component.css']
})
export class ConvertPangaonContainerComponent implements OnInit {
  covertPangaonContainerForm:any;
  fileInputLabel:any;
  resultList:any;
  ipAddress:any="";
  response:any;
  loginId: any;
  size:number=0;
  visit:any="";
  nad:any="";
  xmlData:any="";
  fileName:any="";


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private httpClient: HttpClient,
    private convertPangaonContainerService:ConvertPangaonContainerService
  ) { 
    this.covertPangaonContainerForm=this.formBuilder.group({});
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
      

    }
  }
  onSubmit(event:any):any{
    this.visit=event.visit.value;
    if(this.visit!=""){
      this.convertPangaonContainerService.convertPangaonContainer(this.visit).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.nad=res.nad;
          this.xmlData=res.xmlData;
          console.log("xmlData "+this.xmlData);
          this.fileName=res.fileName;
         
        }
        if(this.xmlData!="" && this.xmlData!=null){
          let blob = new Blob([this.xmlData], { type: 'application/xml' });
          fs.saveAs(blob, this.fileName);

        }
       

      });

    }
    else{
      this.toastr.error('Visite ID is Empty', 'Error',{
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
