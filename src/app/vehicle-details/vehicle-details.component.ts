import { Component, EventEmitter, Inject, Input, OnInit, Output, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AprraisalService } from '../services/aprraisal.service';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import urls from 'src/properties';

import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';
import { MakeOfferSelect } from '../inventory/inventory.component';
import { CommunicationService } from '../services/communication.service';
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  panelOpenState = false;
  public appraisalObject: any;
  //  public imgArr:any=[];
  public img: string = "";
  public imgArr2: any = [];
  public stateObjectFromAppraisal:any = history.state;
  public id:any= this.stateObjectFromAppraisal.id;
  public vinNumber=this.stateObjectFromAppraisal.vin;
  public comp=this.stateObjectFromAppraisal.comp;
  public isOfferMade=this.stateObjectFromAppraisal.isOfferMade;
  public offerId = this.stateObjectFromAppraisal.offerId;
  
  
  isLoading = false;
  public able_to!: PureAbility;


  // public acCondition: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,public dialog: MatDialog, private appraisalService: AprraisalService, private fb: FormBuilder , private router:Router,private communicationService: CommunicationService) {
    
  }

  public openMakeOfferDialog(id:any){
    const dialogRef= this.dialog.open(MakeOfferSelect, {
      height:'200px',
      width:'450px',
      data:{
        appraisalId:id
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      if(result !== undefined){
        if(result===200 || result===400){
          // this.getDataForViewVehicle();
          this.isOfferMade=true;
        }
      }
    })
  }

  public gotoQuotePage(component:any){
    const response= {
      'apprId':this.id,
      'offerId':this.offerId,
      'comp':component
    };
    this.communicationService.emitAppraisalCreated(response);
    
  }


  // public baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

  selectImage(img: string): void {
    this.img = img;
  }

  public vehicleExtColorValue: string ="";
  public vehicleInteriorValue: string ="";

  
  dropDowns: any;
  condition:any;

  public getDataForViewVehicle(){
    this.appraisalService.getDropdowns().pipe(
      switchMap((dropdownResponse) => {
        this.dropDowns = dropdownResponse; // Assign dropdown response to this.dropDowns
        return this.appraisalService.getAppraisalShowToUi(this.id); // Return the getAppraisalShowToUi observable
      })
    ).subscribe((appraisalResponse:any) => {
      if(appraisalResponse.code===200){
        this.isLoading = false;
      }
      this.appraisalObject = appraisalResponse.apr; // Assign appraisal response to this.appraisalObject
      let arr = [];
      for (let i = 1; i <= 9; i++) {
        const propertyName = `vehiclePic${i}`;
        const imageUrl = this.appraisalObject[propertyName];
    
        if (imageUrl !== null && imageUrl !== undefined) {
          arr.push(imageUrl);
        }
      }
      this.img = arr[0];
      this.imgArr2 = arr;
      console.log(this.appraisalObject);
      console.log(this.img);
    
      const settingDropdownValues = (dropdown:any, apprObj:any)=>{
        // console.log(this.dropDowns)
        if(typeof(apprObj)==='object'){
          apprObj?.forEach((id: number) => {
            const dropdownItem = dropdown.find((item: any) => item.id === id);
            switch(dropdown){
              case this.dropDowns.vehicleExtrColor : this.vehicleExtColorValue=dropdownItem.longCode; break;
              case this.dropDowns.vehicleIntrColor : this.vehicleInteriorValue=dropdownItem.longCode; break;
            }
          });
        }else{
          console.log(dropdown);
          console.log(apprObj);
          
          
          const dropdownItem = dropdown.find((item: any) => item.config_id === apprObj);

          switch(dropdown){
            
            case this.dropDowns.vehicleExtrColor : this.vehicleExtColorValue=dropdownItem.longCode; break;
            case this.dropDowns.vehicleIntrColor : this.vehicleInteriorValue=dropdownItem.longCode; break;
             
          }
        }
      };


      console.log(this.dropDowns) 
         
          settingDropdownValues(this.dropDowns.vehicleExtrColor,this.appraisalObject.vehicleExtColor);
          settingDropdownValues(this.dropDowns.vehicleIntrColor,this.appraisalObject.vehicleInterior);

         
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.stateObjectFromAppraisal);
  
    
    // this.getAccessToken();
    // setTimeout(()=>{this.getWidgets()},2000);
    let id: any = this.id;
    console.log(id);

    
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when the component initializes
    });


  
    // this.appraisalService.getAppraisalShowToUi(id).subscribe(async(response)=>{
    //   this.appraisalObject= response;
    //   let arr = [];

    //   for (let i = 1; i <= 9; i++) {
    //     const propertyName = `vehiclePic${i}`;
    //     const imageUrl = this.appraisalObject[propertyName];

    //     if (imageUrl !== null && imageUrl !== undefined) {
    //       arr.push(imageUrl);
    //     }
    //   }
    //   // this.imgArr=arr;
    //   this.img = arr[0];
    //   this.imgArr2 = arr;
    //   console.log(this.appraisalObject);
    //   console.log(this.img);
    // })

    //  this.appraisalService.getDropdowns().subscribe((response) => {
    //   this.dropDowns = response;
    // });
    
    // if(this.comp==='searchFactory'){
    //   this.condition= false;
    // }

    this.getDataForViewVehicle();

  }

  // public printAppraisal(id: any) {
  //   this.appraisalService.printAppraisal(id).subscribe((response: any) => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     const anchor = document.createElement('a');
  //     anchor.href = blobUrl;
  //     anchor.download = 'appraisal.pdf';
  //     anchor.click();
  //     window.URL.revokeObjectURL(blobUrl);
  //   });
  // }

  openVideoDialog(vehicleVideo: any): void {
    const dialogRef = this.dialog.open(VideoDialog, {
      data: { 
              video: vehicleVideo,
               }
    });
  }
}




@Component({
  selector: 'VideoDialog',
  templateUrl: 'videoPlay.html',
})
export class VideoDialog {


  public able_to!: PureAbility;
  constructor(
    public dialogRef: MatDialogRef<VideoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    
  }

  videoUrl:string="https://services-test.keyassure.live/appraisal/downloadVideo?filename=";

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}

















// this.dropDowns.bookAndKeys.map((item:any)=>{
//   if(item.id===this.appraisalObject.booksAndKeys[0]){
//       this.dropdownValue=item.shortDescrip
//   }
//   console.log(this.dropdownValue);
// })
// Create an empty array to store the converted dropdown values as strings

   // //let arr=[this.appraisalObject.vehiclePic1,this.appraisalObject.vehiclePic2,this.appraisalObject.vehiclePic3,this.appraisalObject.vehiclePic4,this.appraisalObject.vehiclePic5,this.appraisalObject.vehiclePic6,this.appraisalObject.vehiclePic7,this.appraisalObject.vehiclePic8,this.appraisalObject.vehiclePic9];
      // for(let i =1;i<10;i++){
      //   console.log(this.appraisalObject.vehiclePic+i.toString());
      //   if((this.appraisalObject.vehiclePic+i.toString())!=null){
      //     arr.push(this.appraisalObject.vehiclePic+i.toString())
      //   }
      // };

      // let arr = [];


      // for (let i = 1; i <= 9; i++) {
      //   const propertyName = `vehiclePic${i}`;
      //   const imageUrl = this.appraisalObject[propertyName];

      //   if (imageUrl !== null && imageUrl !== undefined) {
      //     arr.push(imageUrl);
      //   }
      // }
      // // this.imgArr=arr;
      // this.img = arr[0];
      // this.imgArr2 = arr;
      // console.log(this.appraisalObject);
      // console.log(this.img);

                  // this.appraisalService.getDropdowns().subscribe((response) => {
      //   this.dropDowns = response;
        // this.vehicleExteriorColor = dropDowns.vehicleExtrColor;
        // this.vehicleInteriorColor = dropDowns.vehicleIntrColor;
        // this.dashWarningLights = dropDowns.dashWarnLights;
        // this.acCondition = this.dropDowns.acCond;
  
        // this.roofType = dropDowns.roofType;
        // this.stereoStatus = dropDowns.stereoSts;
        // this.interiorCondition = dropDowns.interiorCond;
        // this.frontLeftWindowStatus = dropDowns.frontLeftWinSts;
        // this.frontRightWindowStatus = dropDowns.frontRightWinSts;
        // this.rearLeftWindowStatus = dropDowns.rearLeftWinSts;
        // this.rearRightWindowStatus = dropDowns.rearRightWinSts;
        // this.oilCondition = dropDowns.oilCond;
  
        // this.breakingSystemStatus = dropDowns.brakingSysSts;
        // this.enginePerformance = dropDowns.enginePerformance;
        // this.transmissionStatus = dropDowns.transmissionStatus;
        // this.steeringFeelStatus = dropDowns.steeringFeelSts;
        // this.tires = dropDowns.tireCondition;
        // this.booksAndKeys = dropDowns.bookAndKeys;
        // this.titleStatus = dropDowns.titleSts;
        // this.doorLocks = dropDowns.doorLocks;
        // this.frontWindshieldDamage = dropDowns.frontWindShieldDamage
        // this.rearWindowDamage = dropDowns.rearWindowDamage
      // });


