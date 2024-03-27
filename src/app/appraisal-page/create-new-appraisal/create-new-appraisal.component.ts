
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { BooleanValues } from 'src/app/user';
import { FormBuilder, Validators } from '@angular/forms';
import { AprraisalService } from 'src/app/services/aprraisal.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { CommunicationService } from 'src/app/services/communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import urls from 'src/properties';

import { PureAbility } from '@casl/ability';

@Component({
  selector: 'app-create-new-appraisal',
  templateUrl: './create-new-appraisal.component.html',
  styleUrls: ['./create-new-appraisal.component.css']
})
export class CreateNewAppraisalComponent implements OnInit {
  vinLoading=false;
  isLoading=false;

  public appId:any;
  public apprForShowToUi!: any|null;
  public isEdit!: boolean;
  public isDraft!: string;
  public selectedValue!: string;
  public vehicleData: any = [];

  public vehicleExteriorColor: any = [];
  public vehicleInteriorColor: any = [];
  public dashWarningLights: any = [];
  public acCondition: any = [];
  public doorLocks: any = [];
  public roofType: any = [];
  public stereoStatus: any = [];
  public interiorCondition: any = [];
  public frontLeftWindowStatus: any = [];
  public frontRightWindowStatus: any = [];
  public rearLeftWindowStatus: any = [];
  public rearRightWindowStatus: any = [];
  public oilCondition: any = [];
  public breakingSystemStatus: any = [];
  public enginePerformance: any = [];
  public transmissionStatus: any = [];
  public steeringFeelStatus: any = [];
  public tires: any = [];
  public booksAndKeys: any = [];
  public titleStatus: any = [];
  public ProfessionalOpinion: any = [];
  public frontWindshieldDamage: any = [];
  public rearWindowDamage: any = [];
  public dealershipUserNames:any=[]

  // public returnObject!:any ;
  // public uuid!:string;
  public selectedFile!: File;
  public selectedVideo!: File;
  public imageId!: any;
  public uploadedVideoId!: any;
  public vinNum:any;
  public isWidgetVisible:any;
  // public vehiclePic1:string = "";
  // public vehiclePic2:string = "";
  // public vehiclePic3:string = "";
  // public vehiclePic4:string = "";
  // public vehiclePic5:string = "";
  // public vehiclePic6:string = "";
  // public vehiclePic7:string = "";
  // public vehiclePic8:string = "";
  // public vehiclePic9:string = "";
  // public vehicleVideo:string="";
  // public frontDriverSideDamage:string="";
  // public rearDriverSideDamage:string="";
  // public rearPassengerSideDamage:string="";
  // public frontPassengerSideDamage:string="";
  // public frontDriverSidePaintwork:string="";
  // public rearDriverSidePaintwork:string="";
  // public frontPassengerSidePaintwork:string="";
  // public rearPassengerSidePaintwork:string="";
  
  
  onFileSelected(id: string, event: any) {
    this.imageId = id;
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name, id);
    console.log(this.selectedFile, id);
  }

  onVideoSelected(id: string, event: any) {
    this.uploadedVideoId = id;
    this.selectedVideo = event.target.files[0];
    console.log(this.selectedVideo, id);
  }
  // ...
  uploadImage() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
  
      this.appraisalService.uploadImageInDb(this.selectedFile).pipe(
        tap((response: any) => {
          let returnObject: any = response;
          let uuid = returnObject.message;
          console.log(uuid);
  
          // if (this.imageId) {
          //   this.ExteriorWalkAroundFormGroup.get(this.imageId)?.setValue(uuid);
          // }
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          throw error; // Rethrow the error to propagate it to the subscriber
        })
      ).subscribe();
    }
  }
  
uploadImage1() {
  if (this.selectedFile) {
    console.log(this.selectedFile);

    this.appraisalService.uploadImageInDb(this.selectedFile).pipe(
      tap((response: any) => {
        let returnObject: any = response;
        let uuid = returnObject.message;
        console.log(uuid);
        console.log(this.imageId);
        
        if (this.imageId) {
          console.log(this.imageId);
          console.log(uuid);
          this.thirdFormGroup.get(this.imageId)?.setValue(uuid);
        }
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        throw error; // Rethrow the error to propagate it to the subscriber
      })
    ).subscribe();
  }
}

  uploadVideo() {
    if (this.selectedVideo) {
      this.appraisalService.uploadVideoInDb(this.selectedVideo).pipe(
        tap((response: any) => {
          let videoObject: any = response;
          let videoName = videoObject.message;
          this.thirdFormGroup.get(this.uploadedVideoId)?.setValue(videoName);
          console.log(videoName);
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          throw error; // Rethrow the error to propagate it to the subscriber
        })
      ).subscribe();
    }
  }
  

  // saving to draft
  saveToDraft() {

    const DraftedAprrraisalData: any = {

      clientFirstName: this.firstFormGroup.get('firstName')?.value,
      clientLastName: this.firstFormGroup.get('lastName')?.value,
      clientPhNum: this.firstFormGroup.get('phoneNumber')?.value?.replace(/-/g, ''),
      vinNumber: this.firstFormGroup.get('vin')?.value,
      vehicleModel: this.firstFormGroup.get('vehicleModel')?.value,
      vehicleMake: this.firstFormGroup.get('vehicleMake')?.value,
      vehicleSeries: this.firstFormGroup.get('vehicleSeries')?.value,
      vehicleMileage: this.firstFormGroup.get('vehicleMiles')?.value,
      vehicleYear: this.firstFormGroup.get('vehicleYear')?.value,
      engineType: this.firstFormGroup.get('engineType')?.value,
      transmissionType: this.firstFormGroup.get('transmissionType')?.value,
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
    
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
      
     
    
      appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
      
      // vehicleVideo1:this.vehicleVideo
    }
    if(this.isEdit){
      this.appraisalService.updateDraftAppraisal(JSON.stringify(DraftedAprrraisalData),this.appId).subscribe((response) =>{
        this.openSnackBar('Aprrasal Drafted','close');
        this.communicationService.emitAppraisalCreated(response);
      }
      ,(error) : any =>{
        console.error('Error:', error);
      }) ;
    }else{
      this.appraisalService.draftAppraisal(JSON.stringify(DraftedAprrraisalData)).subscribe((response) => {
        //  console.log(response);
        this.openSnackBar('Aprrasal Drafted','close');
        this.communicationService.emitAppraisalCreated(response);
        }
          , (error): any => {
            console.error('Error:', error);
          }
        );
    }

    console.log(DraftedAprrraisalData);
  }
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Add dashes
  
    this.firstFormGroup.controls.phoneNumber.setValue(inputValue);
    input.value = inputValue; // Update the input field with the formatted value
  }

  public able_to!: PureAbility;

  constructor( private fb: FormBuilder, private appraisalService: AprraisalService, public dialog: MatDialog, private route: ActivatedRoute , private router:Router, private communicationService: CommunicationService, private snackBar: MatSnackBar) {

   
   }

  firstFormGroup = this.fb.group({
    vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    vehicleYear: [null, [Validators.required]],
    vehicleMake: [null, [Validators.required]],
    vehicleModel: [null, [Validators.required]],
    engineType: [null, [Validators.required]],
    transmissionType: [null, [Validators.required]],
    vehicleSeries: [null, [Validators.required]],
    vehicleMiles: [null, [Validators.required]],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s\\.\\]?[0-9]{3}[-\\s\\.\\]?[0-9]{6}$")]],
    selectedVehicleInteriorColor: [null, Validators.required],
    selectedVehicleExteriorColor: [null, Validators.required],
   
  })


 

  thirdFormGroup = this.fb.group({
    vehiclePic1: [null],
    vehiclePic2: [null],
    vehiclePic3: [null],
    vehiclePic4: [null]
   
  })

  
  wholeSaleFormGroup = this.fb.group({
    appraisedValue: [null, Validators.required],
   
  });


  public dropdownBoolean: BooleanValues[] = [
    {
      'id': 1,
      'code': 'yes',
      'value': true
    },
    {
      'id': 2,
      'code': 'no',
      'value': false
    }
  ]


  getVehicleData() {
    
    
    if (this.firstFormGroup.get('vin')?.valid) {
      this.vinLoading = true;
      const vinValue = this.firstFormGroup.get('vin')?.value;
      this.appraisalService.checkVinNumber(vinValue).subscribe({
        next:(response:any)=>{
        console.log(response);
      
        if(response.status===true){
          this.vinLoading=false;
          this.firstFormGroup.controls.vin.setValue(null);

          this.openSnackBar('This veicle is already appraised', 'Close');

        }
        else{ this.vinLoading=false;}
      },
      error:(error:any)=>{
        this.vinLoading=false;
        console.log(error);
        
      }

    });
   
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  public checkboxValue: boolean =false;



  openImage(imageData: any) {
    console.log(imageData)
    const dialogRef = this.dialog.open(DialogImageContent, {
      height: '550px',
      width: '600px',
      data: { image: imageData }
    });
  }

  submitAppraisalData() {
    this.isLoading=true;
    if(this.wholeSaleFormGroup.valid){
    const appraisalData: any = {

      clientFirstName: this.firstFormGroup.get('firstName')?.value,
      clientLastName: this.firstFormGroup.get('lastName')?.value,
      clientPhNum: this.firstFormGroup.get('phoneNumber')?.value?.replace(/-/g, ''),
      vinNumber: this.firstFormGroup.get('vin')?.value,
      vehicleModel: this.firstFormGroup.get('vehicleModel')?.value,
      vehicleMake: this.firstFormGroup.get('vehicleMake')?.value,
      vehicleSeries: this.firstFormGroup.get('vehicleSeries')?.value,
      vehicleMileage: this.firstFormGroup.get('vehicleMiles')?.value,
      vehicleYear: this.firstFormGroup.get('vehicleYear')?.value,
      engineType: this.firstFormGroup.get('engineType')?.value,
      transmissionType: this.firstFormGroup.get('transmissionType')?.value,
      dealershipUserNames:this.firstFormGroup.get('dealershipUserNames')?.value,
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
     
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
    
     
      // eSign: this.checkboxValue,
      //agreement:this.agreement(),
      // appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
      dealerReserve: this.wholeSaleFormGroup.get('dealerReserve')?.value,
      // consumerAskPrice: this.consumerAskPrice(),
      delrRetlAskPrice: this.wholeSaleFormGroup.get('dealerRetailPrice')?.value,
      appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
      pushForBuyFig: this.wholeSaleFormGroup.get('pushForBuyFigure')?.value,
      consumerAskPrice:this.wholeSaleFormGroup.get('consumerAskPrice')?.value
      // vehicleVideo1:this.vehicleVideo
    }

    this.appraisalService.createNewApprisal(JSON.stringify(appraisalData)).subscribe((response) => {
    //  console.log(response);
    this.isLoading=false;
      this.openSnackBar("Appraisal Created Successfully",'close');
      this.communicationService.emitAppraisalCreated(response);
      this.router.navigate(['appraisal']);
    }
      , (error): any => {
        console.error('Error:', error);
        this.isLoading=false;
      }
    );
    console.log(appraisalData);
    }else{
      this.openSnackBar('please fill the required fields','close')
      this.isLoading=false;
    }
  }



  updateAppraisalData() {
    if(this.wholeSaleFormGroup.valid){

    const updatedAppraisalData: any = {

      clientFirstName: this.firstFormGroup.get('firstName')?.value,
      clientLastName: this.firstFormGroup.get('lastName')?.value,
      clientPhNum: this.firstFormGroup.get('phoneNumber')?.value?.replace(/-/g, ''), 
      vinNumber: this.firstFormGroup.get('vin')?.value,
      vehicleModel: this.firstFormGroup.get('vehicleModel')?.value,
      vehicleMake: this.firstFormGroup.get('vehicleMake')?.value,
      vehicleSeries: this.firstFormGroup.get('vehicleSeries')?.value,
      vehicleMileage: this.firstFormGroup.get('vehicleMiles')?.value,
      vehicleYear: this.firstFormGroup.get('vehicleYear')?.value,
      engineType: this.firstFormGroup.get('engineType')?.value,
      transmissionType: this.firstFormGroup.get('transmissionType')?.value,
     
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
     
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
    
   
      appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
     
      // vehicleVideo1:this.vehicleVideo
    }

    this.appraisalService.updateExistingAppraisal(JSON.stringify(updatedAppraisalData), this.appId).subscribe((response) => {
    //  console.log(response);
      this.openSnackBar('Appraisal Updated Successfully','close');
      this.communicationService.emitAppraisalCreated(response);
      this.router.navigate(['appraisal']);
    }
      , (error): any => {
        console.error('Error:', error);
      }
    );
    console.log(updatedAppraisalData);
  }else{
    this.openSnackBar('please fill the required fields','close')
  }    
  }
 
   
  stateObjectFromAppraisal:any = history.state
 
  ngOnInit() {
    console.log('calling again');
    console.log(this.stateObjectFromAppraisal);
    this.appraisalService.getDropdowns().subscribe({
      next:(response:any)=> {
        console.log(response);
        
        this.vehicleExteriorColor=response.vehicleExtrColor;
        this.vehicleInteriorColor=response.vehicleIntrColor;      },
      error:(error)=>console.log(error)
      
  
    });

    
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when the component initializes
    });
    // let id:any = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    // let stateObjectFromAppraisal:any = history.state
    console.log(this.stateObjectFromAppraisal);
    
    this.appId=this.stateObjectFromAppraisal.id;
    this.isEdit = this.stateObjectFromAppraisal.isEdit;
    //this.isDraft = stateObjectFromAppraisal.isDraft;
   
    //console.log(stateObjectFromAppraisal.isDraft);
    

    if (this.isEdit) {
      this.appraisalService.getAppraisalShowToUi(this.appId).subscribe((response:any) => {
        this.apprForShowToUi = response.apr;
        console.log(this.apprForShowToUi);

        this.firstFormGroup.patchValue({
          vin: this.apprForShowToUi.vinNumber,
          vehicleMake: this.apprForShowToUi.vehicleMake,
          vehicleModel: this.apprForShowToUi.vehicleModel,
          vehicleSeries: this.apprForShowToUi.vehicleSeries,
          vehicleYear: this.apprForShowToUi.vehicleYear,
          engineType: this.apprForShowToUi.engineType,
          transmissionType: this.apprForShowToUi.transmissionType,
          vehicleMiles: this.apprForShowToUi.vehicleMileage,
          firstName: this.apprForShowToUi.clientFirstName,
          lastName: this.apprForShowToUi.clientLastName,
          // phoneNumber: this.apprForShowToUi.clientPhNum,
          phoneNumber : this.apprForShowToUi.clientPhNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
          
          selectedVehicleInteriorColor: this.apprForShowToUi.vehicleInterior,
          selectedVehicleExteriorColor: this.apprForShowToUi.vehicleExtColor, 
        });


        this.thirdFormGroup.patchValue({
          vehiclePic1: this.apprForShowToUi.vehiclePic1,
          vehiclePic2: this.apprForShowToUi.vehiclePic2,
          vehiclePic3: this.apprForShowToUi.vehiclePic3,
          vehiclePic4: this.apprForShowToUi.vehiclePic4,
          
         
        })

       

     
        
        this.wholeSaleFormGroup.patchValue({
          appraisedValue: this.apprForShowToUi.appraisedValue,
        
        })

      });
    }

  }

 
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'image-preview.html',
})
export class DialogImageContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  // baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;
};


  // uploadVideo() {
  //   if (this.selectedVideo) {

  //     // let videoName!:any; 
  //     this.appraisalService.uploadVideoInDb(this.selectedVideo).subscribe((response) => {
  //       let videoObject: any = response;

  //       let videoName = videoObject.message;
  //       this.thirdFormGroup.get(this.uploadedVideoId)?.setValue(videoName)
  //       console.log(videoName);
  //     },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }

  
  // uploadImage1() {
  //   if (this.selectedFile) {
  //     console.log(this.selectedFile)

  //     this.appraisalService.uploadImageInDb(this.selectedFile).subscribe((response) => {
  //       let returnObject: any = response;
  //       let uuid = returnObject.message;
  //       console.log(uuid);

  //       // if(this.imageId){
  //       //   (<any>this)[this.imageId] = this.uuid
  //       // }

  //       if (this.imageId) {
  //         this.thirdFormGroup.get(this.imageId)?.setValue(uuid);
  //       }

  //     },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }

   // uploadImage() {
  //   if (this.selectedFile) {
  //     console.log(this.selectedFile)

  //     this.appraisalService.uploadImageInDb(this.selectedFile).subscribe((response) => {
  //       let returnObject: any = response;
  //       let uuid = returnObject.message;
  //       console.log(uuid);

  //       // if(this.imageId){
  //       //   (<any>this)[this.imageId] = uuid
  //       // }
  //       if (this.imageId) {
  //         this.ExteriorWalkAroundFormGroup.get(this.imageId)?.setValue(uuid);
  //       }
  //     },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }
