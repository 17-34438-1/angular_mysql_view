import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ViewIgmGeneralService } from '../service/IgmOperation/view-igm-general/view-igm-general.service';
import * as fs  from 'file-saver';

@Component({
  selector: 'app-view-igm-general',
  templateUrl: './view-igm-general.component.html',
  styleUrls: ['./view-igm-general.component.css']
})
export class ViewIgmGeneralComponent implements OnInit {
  viewIgmGeneralForm:any;
  rotation:any="";
  searchType:any="";
  resultList:any;
  userRoleId:any=0;
  type:any="";
  actionShow:Boolean=false;
  accessibilityShow:Boolean=false;
  resultLimit:any=5;
  resultStart:any=0;
  resultStatus:any=1;
  searchValue:any="";
  downloadedEdiFile:any;
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private viewIgmGeneralService:ViewIgmGeneralService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.viewIgmGeneralForm=this.formBuilder.group({});
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
      this.userRoleId=localStorage.getItem("userRoleId");
      this.type=this.activatedRoute.snapshot.url[2].path;
      this.resultLimit=this.activatedRoute.snapshot.url[3].path;
      this.resultStart=this.activatedRoute.snapshot.url[4].path;
      this.resultStatus=this.activatedRoute.snapshot.url[5].path;
    
      
      if(this.userRoleId==17 || this.userRoleId==15 || this.userRoleId==23 || 
        this.userRoleId==25 || this.userRoleId==19 || this.userRoleId==33 || 
        this.userRoleId==35 || this.userRoleId==37 || this.userRoleId==41 ){
          this.actionShow=true;

      }
      else{
        this.actionShow=false;
       }
       if(this.userRoleId==10){
        this.accessibilityShow=true;

       }
       else{
        this.accessibilityShow=false;

       }

       this.viewIgmGeneralService.getList(this.type,this.resultLimit,this.resultStart,this.resultStatus).subscribe(result=>{
        this.resultList=result;
       });

    }

  }
  onValueChange(value:any){

  }

  onSubmit(event:any){
    this.searchValue=event.searchValue.value;
    this.searchType=event.searchType.value;
   let searchVal="";
   searchVal=this.searchValue;
   console.log("import"+searchVal);

    if(this.searchType=="Import" || this.searchType=="Export"){
        searchVal=searchVal.replace("/","-");
        console.log("import"+searchVal)
      }
    this.viewIgmGeneralService.getSearchList(this.type,this.searchType,searchVal).subscribe(result=>{
      this.resultList=result;
    });
  }

  onFirst(firstLimit:any,endLimit:any){
    
    this.viewIgmGeneralService.getList(this.type,endLimit,firstLimit,this.resultStatus).subscribe(result=>{
      this.resultList=result;
     });

  }
  onPageNavigation(firstLimit:any,endLimit:any){
    
    this.viewIgmGeneralService.getList(this.type,endLimit,firstLimit,this.resultStatus).subscribe(result=>{
      this.resultList=result;
     });

  }
  downloadEdi(fileName:any){
    console.log("fileName "+fileName)
    this.viewIgmGeneralService.downloadEdi(fileName).subscribe(result=>{
      this.downloadedEdiFile=result;
      //console.log("res"+ this.downloadedEdiFile);
      //let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //let blob = new Blob([this.xmlData], { type: 'application/xml' });
      //let blob=new Blob([this.downloadedEdiFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let blob=new Blob([this.downloadedEdiFile] ,{ type: 'application/edi' });
      fs.saveAs(blob, fileName);
      
    });
  }

}
