import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentAndDeliveryEmptyDetailService } from '../service/ImportReports/AllAssignmentDeliveryAndEmptyDetail/assignment-and-delivery-empty-detail/assignment-and-delivery-empty-detail.service';



@Component({
  selector: 'app-assignment-and-delivery-empty-detail-report',
  templateUrl: './assignment-and-delivery-empty-detail-report.component.html',
  styleUrls: ['./assignment-and-delivery-empty-detail-report.component.css']
})
export class AssignmentAndDeliveryEmptyDetailReportComponent implements OnInit {
  fromDate:any;
  loginId:any;
  yardName:any;
  resultList:any;
  stayed:number=0;
  allContainer:string="";

  i:number=0;
	j:number=0;
	j20:number=0;
	j40:number=0;
	a20:number = 0;
	a40:number = 0;
	b20:number = 0;
	c20:number = 0;

 // b40:any="";
  //c40:any="";
  b40:number=0;
  c40:number=0;
  shift:string="";
  tot20:number = 0;
	tot40:number = 0;
  yard:string="";

  totalShift20:number=0;
  totalShift40:number=0;
  yardTot20:number=0;
  yardTot40:number=0;
  totalYard20:number=0;
  totalYard40:number=0;

  totalShowStatus:boolean=false;
  yardShowStatus:boolean=false;
  totalShiftShowStatus:boolean=false;
  shiftShowStatus:boolean=false;
  totalShow:boolean=true;




  constructor(
    private router: Router,
    private toastr:ToastrService,
    private assignmentAndDeliveryEmptyDetailService:AssignmentAndDeliveryEmptyDetailService
  ) {
    this.fromDate=localStorage.getItem("assingmentDeliveryAndEmptyDetailFromDate")
    this.loginId=localStorage.getItem("assingmentDeliveryAndEmptyDetailLoginId");
    this.yardName=localStorage.getItem("assingmentDeliveryAndEmptyDetailYardName");
    
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
      this.assignmentAndDeliveryEmptyDetailService.getAssignmentandDeliveryEmptyDetailList(this.fromDate,this.loginId,this.yardName).subscribe(data=>{
        this.resultList=data;
        for(let res of this.resultList){
          this.stayed=this.stayed+res.stay;
          this.allContainer=this.allContainer+","+res.cont_no;
      
         
        }
  
       });
    }
  }

  startProcess(iso:any,subIso:any,shift:any,yardNo:any){
   
    this.totalShowStatus=false;
    this.yardShowStatus=false;
    this.totalShiftShowStatus=false;
    this.shiftShowStatus=false;
    this.i=this.i+1;

		if(subIso==2){
    
			this.j20=this.j20+1;
    }
		else{
			this.j40=this.j40+1;
    }
		
		if(subIso==2)
		{
			if(shift=="Shift A"){
        this.a20 = this.a20+1;
      }
			
			if(shift=="Shift B"){
        this.b20 = this.b20+1;
      }
				
			if(shift=="Shift C"){
        this.c20 = this.c20+1;

      }
				
		}
		else
		{
			if(shift=="Shift A"){
				this.a40 = this.a40+1;
      }  
			if(shift=="Shift B"){
				this.b40 = this.b40+1;
      }  
			if(shift=="Shift C"){
				this.c40 = this.c40+1;
      }  
		}
			
		if(this.shift==shift || this.i==1)
		{
			if(subIso==2){
				this.tot20 = this.tot20+1;
        this.totalShift20=this.tot20;
      }
			else {
				this.tot40 = this.tot40+1;
        this.totalShift40=this.tot40;
      }
		}

  /*  if(this.yard==yardNo || this.i==1)
		{
			if(subIso==2){
				this.yardTot20 = this.yardTot20+1;
        this.totalYard20=this.yardTot20;
      }
			else {
				this.yardTot40 = this.yardTot40+1;
        this.totalYard40=this.yardTot40;
      }
		}*/


    if(this.yard!=yardNo)
		{
			this.yard=yardNo;
			if(this.i!=1)
			{
        this.totalShift20=0;
        this.totalShift40=0;
        this.totalShowStatus=true;
			
				if(subIso==2)
				{
					//this.tot20 = 1;
					//this.tot40 = 0;
         // this.yardTot20=1;
         // this.yardTot40=0;
       
				}
				else
				{
					//this.tot20 = 0;
					//this.tot40 = 1;
         // this.yardTot20=0;
         // this.yardTot40=1;
        
				}
			}
      
      this.yardShowStatus=true;
			this.i=1;
		}

    if(this.shift!=shift)
		{	
			this.shift=shift;		
			if(this.i!=1)
			{
       // this.totalYard20=0;
        //this.totalYard40=0;
				if(subIso==2)
				{
					this.tot20 = this.tot20;
				}
				else
				{
					this.tot40 = this.tot40;
				}
			
			  this.totalShiftShowStatus=true;
			
				if(subIso==2)
				{
					this.tot20 = 1;
					this.tot40 = 0;
				}
				else
				{
					this.tot20 = 0;
				  this.tot40 = 1;
				}
			}
      this.shiftShowStatus=true;
		  this.i=1;
		}

    this.shift=shift;


  }




  startProcess1(iso:any,subIso:any,shift:any,yardNo:any){
   
     this.totalShowStatus=false;
     this.yardShowStatus=false;
     this.totalShiftShowStatus=false;
    this.shiftShowStatus=false;
     this.i=this.i+1;
 
     if(subIso=="2"){
     
       this.j20=this.j20+1;
     }
     else{
       this.j40=this.j40+1;
     }
     
     if(subIso=="2")
     {
       if(shift=="Shift A"){
         this.a20 = this.a20+1;
       }
       
       if(shift=="Shift B"){
         this.b20 = this.b20+1;
       }
         
       if(shift=="Shift C"){
         this.c20 = this.c20+1;
 
       }
         
     }
     else
     {
       if(shift=="Shift A"){
         this.a40 = this.a40+1;
       }  
       if(shift=="Shift B"){
         this.b40 = this.b40+1;
       }  
       if(shift=="Shift C"){
         this.c40 = this.c40+1;
       }  
     }
       
     if(this.shift==shift || this.i==1)
     {
       if(subIso=="2"){
         this.tot20 = this.tot20+1;
         this.totalShift20=this.tot20;
       }
       else {
         this.tot40 = this.tot40+1;
         this.totalShift40=this.tot40;
       }
     }
 
     /*if(this.yard==yardNo || this.i==1)
     {
       if(subIso==2){
         this.yardTot20 = this.yardTot20+1;
         this.totalYard20=this.yardTot20;
       }
       else {
         this.yardTot40 = this.yardTot40+1;
         this.totalYard40=this.yardTot40;
       }
     }*/
 
 
     if(this.yard!=yardNo)
     {
      
       if(this.i!=1)
       {
         this.totalShift20=0;
         this.totalShift40=0;
         this.totalShowStatus=true;
       
       }

     
     }

     
 
    return;
 
 
   }

   startProcess2(iso:any,subIso:any,shift:any,yardNo:any){
    if(this.yard!=yardNo)
    {
      this.yard=yardNo;
      if(this.i!=1)
      {
        
      
        if(subIso=="2")
        {
          this.tot20 = 1;
          this.tot40 = 0;
         // this.yardTot20=1;
         // this.yardTot40=0;
        }
        else
        {
          this.tot20 = 0;
          this.tot40 = 1;
         // this.yardTot20=0;
        //  this.yardTot40=1;
        }
      }
      this.yardShowStatus=true;
      this.i=1;
    }
    return;
    //this.yard=yardNo;

   }
   


   startProcess3(iso:any,subIso:any,shift:any,yardNo:any){
   
    if(this.shift!=shift)
    {	
     // this.shift=shift;		
      if(this.i!=1)
      {
        //this.totalYard20=0;
       // this.totalYard40=0;
        if(subIso=="2")
        {
          this.tot20 = this.tot20;
          
        }
        else
        {
          this.tot40 = this.tot40;
        }
      
        this.totalShiftShowStatus=true;
      
      
      }
    
    }


    return;
   }

   startProcess4(iso:any,subIso:any,shift:any,yardNo:any){

    if(this.shift!=shift)
    {	
          this.shift=shift;	
          if(this.i!=1)
       
          {
            if(subIso=="2")
            {
              this.tot20 = 1;
              this.tot40 = 0;
           
            }
            else
            {
              this.tot20 = 0;
              this.tot40 = 1;
           
            }
          }
         
          this.shiftShowStatus=true;
          this.i=1;
          
    }

    this.shift=shift;
    return;
}

  setInitialValue(){
    
    this.i=0;
    
   }

}
