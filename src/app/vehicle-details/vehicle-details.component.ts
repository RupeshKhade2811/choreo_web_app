import { Component, EventEmitter, Inject, Input, OnInit, Output, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AprraisalService } from '../services/aprraisal.service';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import urls from 'src/properties';
import { AppAbility } from '../services/AppAbility';
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
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;


  // public acCondition: any = [];

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private route: ActivatedRoute, private http: HttpClient,public dialog: MatDialog, private appraisalService: AprraisalService, private fb: FormBuilder , private router:Router,private communicationService: CommunicationService) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
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

  public bookAndKeyValues: string[] = [];//key
  public enginePerformValues: string[] = [];//wrench
  public dashWarningLightsValues: string[] = [];
  public acConditionValues: string[] = []; //ac unit
  public stereoStsValues: string[] = []; //equalizer
  public interiorCondnValues: string[] = [];
  public oilConditionValues: string[] = [];
  public tireConditionValues: string[] = [];//tire repair
  public brakingSysStsValues: string[] = [];
  public transmiStsValues: string[] = [];
  public steeringFeelStsValues: string[] = [];
  public rearWindowDamageValues: string[] = [];
  public roofTypeValue: string ="";
  public vehicleExtColorValue: string ="";
  public vehicleInteriorValue: string ="";
  public doorLocksValue: string ="";
  public leftfrWinStsValue: string ="";
  public frRightWinStsValue: string ="";
  public rearLeftWinStsValue: string ="";
  public rearRightWinStsValue: string ="";
  public frWindshieldDmgValue:string ="";
  public titleStsValue:string = "";
  
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
      this.appraisalObject = appraisalResponse; // Assign appraisal response to this.appraisalObject
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
              case this.dropDowns.bookAndKeys : this.bookAndKeyValues.push(dropdownItem.shortDescrip); break;
              case this.dropDowns.enginePerformance : this.enginePerformValues.push(dropdownItem.shortDescrip); break;
              case this.dropDowns.dashWarnLights : this.dashWarningLightsValues.push(dropdownItem.shortDescrip); break;
              case this.dropDowns.acCond : this.acConditionValues.push(dropdownItem.shortDescrip); break;
              case this.dropDowns.stereoSts : this.stereoStsValues.push(dropdownItem.shortDescrip); break;
              case this.dropDowns.interiorCond : this.interiorCondnValues.push(dropdownItem.shortDescrip);break;
              case this.dropDowns.oilCond : this.oilConditionValues.push(dropdownItem.shortDescrip);break;
              case this.dropDowns.tireCondition : this.tireConditionValues.push(dropdownItem.shortDescrip);break;
              case this.dropDowns.brakingSysSts : this.brakingSysStsValues.push(dropdownItem.shortDescrip);break;
              case this.dropDowns.transmissionStatus : this.transmiStsValues.push(dropdownItem.shortDescrip);break
              case this.dropDowns.steeringFeelSts : this.steeringFeelStsValues.push(dropdownItem.shortDescrip);break
              case this.dropDowns.rearWindowDamage : this.rearWindowDamageValues.push(dropdownItem.shortDescrip);
            }
          });
        }else{
          const dropdownItem = dropdown.find((item: any) => item.id === apprObj);
          switch(dropdown){
            case this.dropDowns.roofType : this.roofTypeValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.vehicleExtrColor : this.vehicleExtColorValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.vehicleIntrColor : this.vehicleInteriorValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.doorLocks : this.doorLocksValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.frontLeftWinSts : this.leftfrWinStsValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.frontRightWinSts : this.frRightWinStsValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.rearLeftWinSts : this.rearLeftWinStsValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.rearRightWinSts : this.rearRightWinStsValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.frontWindShieldDamage : this.frWindshieldDmgValue=dropdownItem.shortDescrip; break;
            case this.dropDowns.titleSts : this.titleStsValue=dropdownItem.shortDescrip; 
          }
        }
      };
      console.log(this.dropDowns) 
          settingDropdownValues(this.dropDowns.bookAndKeys,this.appraisalObject.booksAndKeys);
          settingDropdownValues(this.dropDowns.enginePerformance,this.appraisalObject.enginePerfor); 
          settingDropdownValues(this.dropDowns.dashWarnLights,this.appraisalObject.dashWarningLights);
          settingDropdownValues(this.dropDowns.acCond,this.appraisalObject.acCondition);
          settingDropdownValues(this.dropDowns.stereoSts,this.appraisalObject.stereoSts);
          settingDropdownValues(this.dropDowns.interiorCond,this.appraisalObject.interiorCondn);
          settingDropdownValues(this.dropDowns.oilCond,this.appraisalObject.oilCondition);
          settingDropdownValues(this.dropDowns.tireCondition,this.appraisalObject.tireCondition);
          settingDropdownValues(this.dropDowns.brakingSysSts,this.appraisalObject.brakingSysSts);
          settingDropdownValues(this.dropDowns.transmissionStatus,this.appraisalObject.transmiSts);
          settingDropdownValues(this.dropDowns.steeringFeelSts,this.appraisalObject.steeringFeelSts);
          settingDropdownValues(this.dropDowns.rearWindowDamage,this.appraisalObject.rearWindowDamage);
          settingDropdownValues(this.dropDowns.roofType,this.appraisalObject.roofType);
          settingDropdownValues(this.dropDowns.vehicleExtrColor,this.appraisalObject.vehicleExtColor);
          settingDropdownValues(this.dropDowns.vehicleIntrColor,this.appraisalObject.vehicleInterior);
          settingDropdownValues(this.dropDowns.doorLocks,this.appraisalObject.doorLocks);
          settingDropdownValues(this.dropDowns.frontLeftWinSts,this.appraisalObject.leftfrWinSts);
          settingDropdownValues(this.dropDowns.frontRightWinSts,this.appraisalObject.frRightWinSts);
          settingDropdownValues(this.dropDowns.rearLeftWinSts,this.appraisalObject.rearLeftWinSts);
          settingDropdownValues(this.dropDowns.rearRightWinSts,this.appraisalObject.rearRightWinSts);
          settingDropdownValues(this.dropDowns.frontWindShieldDamage,this.appraisalObject.frWindshieldDmg);
          settingDropdownValues(this.dropDowns.titleSts,this.appraisalObject.titleSts);
          console.log(this.bookAndKeyValues.join(','));
          console.log(this.enginePerformValues.join(','));
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

  public printAppraisal(id: any) {
    this.appraisalService.printAppraisal(id).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = 'appraisal.pdf';
      anchor.click();
      window.URL.revokeObjectURL(blobUrl);
    });
  }

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

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,
    public dialogRef: MatDialogRef<VideoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
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


