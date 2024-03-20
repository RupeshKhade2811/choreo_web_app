
import { Component, Inject, OnInit } from '@angular/core';
import { BooleanValues } from 'src/app/user';
import { FormBuilder, Validators } from '@angular/forms';
import { AprraisalService } from 'src/app/services/aprraisal.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { CommunicationService } from 'src/app/services/communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import urls from 'src/properties';
import { AbilityService } from '@casl/angular';
import { AppAbility } from 'src/app/services/AppAbility';
import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';

@Component({
  selector: 'app-create-new-appraisal',
  templateUrl: './create-new-appraisal.component.html',
  styleUrls: ['./create-new-appraisal.component.css']
})
export class CreateNewAppraisalComponent implements OnInit {
  vinLoading=false;
  isLoading=false;

  public appId!:any;
  public apprForShowToUi!: any;
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
  
  showWidget(){
    const vinValue = this.firstFormGroup.get('vin')?.value;
    this.vinNum=vinValue
  this.isWidgetVisible=true;
}
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
  
          if (this.imageId) {
            this.ExteriorWalkAroundFormGroup.get(this.imageId)?.setValue(uuid);
          }
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
      dealershipUserNames:this.firstFormGroup.get('dealershipUserNames')?.value,
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
      acCondition: this.secondFormGroup.get('acCondition')?.value,
      doorLocks: this.secondFormGroup.get('doorLocks')?.value,
      roofType: this.secondFormGroup.get('roofType')?.value,
      stereoSts: this.secondFormGroup.get('stereoStatus')?.value,
      interiorCondn: this.secondFormGroup.get('interiorCondition')?.value,
      leftfrWinSts: this.secondFormGroup.get('frontLeftWindowStatus')?.value,
      frRightWinSts: this.secondFormGroup.get('frontRightWindowStatus')?.value,
      rearLeftWinSts: this.secondFormGroup.get('rearLeftWindowStatus')?.value,
      rearRightWinSts: this.secondFormGroup.get('rearRightWindowStatus')?.value,
      dashWarningLights: this.secondFormGroup.get('dashWarningLights')?.value,
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
      vehiclePic5: this.thirdFormGroup.get('vehiclePic5')?.value,
      vehiclePic6: this.thirdFormGroup.get('vehiclePic6')?.value,
      vehiclePic7: this.thirdFormGroup.get('vehiclePic7')?.value,
      vehiclePic8: this.thirdFormGroup.get('vehiclePic8')?.value,
      vehiclePic9: this.thirdFormGroup.get('vehiclePic9')?.value,
      vehicleVideo: this.thirdFormGroup.get('vehicleVideo')?.value,
      oilCondition: this.ExteriorWalkAroundFormGroup.get('oilCondition')?.value,
      //subcribed:this.subscribeIsChecked(),
      externalDmgSts: this.ExteriorWalkAroundFormGroup.get('hasExteriorDamage')?.value,
      frDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamage')?.value,
      frDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamageTextBox')?.value,
      frDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamagePic')?.value,
      rearDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamage')?.value,
      rearDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamageTextBox')?.value,
      rearDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamagePic')?.value,
      rearPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamage')?.value,
      rearPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamageTextBox')?.value,
      rearPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamagePic')?.value,
      frPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamage')?.value,
      frPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamageTextBox')?.value,
      frPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamagePic')?.value,
      paintWork: this.ExteriorWalkAroundFormGroup.get('anyPaintWorkDone')?.value,
      frDrSidePntWrkSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintwork')?.value,
      frDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkTextBox')?.value,
      frDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkPic')?.value,
      rearDrSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintwork')?.value,
      rearDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkTextBox')?.value,
      rearDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkPic')?.value,
      frPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintwork')?.value,
      frPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkTextBox')?.value,
      frPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkPic')?.value,
      rearPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintwork')?.value,
      rearPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkTextBox')?.value,
      rearPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkPic')?.value,
      frWindshieldDmg: this.ExteriorWalkAroundFormGroup.get('frontWindshieldDamage')?.value,
      rearWindowDamage: this.ExteriorWalkAroundFormGroup.get('rearWindowDamage')?.value,
      // keyAssureYes:this.keyAssureYes(), mobileapp
      // subscribeToKeyAssure:this.subscribeToKeyAssure(),
      // keyAssureFiles:this.keyAssureFiles(),
      brakingSysSts: this.testDriveFormGroup.get('breakingSystemStatus')?.value,
      enginePerfor: this.testDriveFormGroup.get('enginePerformance')?.value,
      transmiSts: this.testDriveFormGroup.get('transmissionStatus')?.value,
      steeringFeelSts: this.testDriveFormGroup.get('steeringFeelStatus')?.value,
      tireCondition: this.testDriveFormGroup.get('tires')?.value,
      booksAndKeys: this.testDriveFormGroup.get('booksAndKeys')?.value,
      titleSts: this.testDriveFormGroup.get('titleStatus')?.value,
      profOpinion: this.testDriveFormGroup.get('professionalOpinion')?.value,
      eSign: true,
      //agreement:this.agreement(),
      // appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
      dealerReserve: this.wholeSaleFormGroup.get('dealerReserve')?.value,
      // consumerAskPrice: this.consumerAskPrice(),
      delrRetlAskPrice: this.wholeSaleFormGroup.get('dealerRetailPrice')?.value,
      appraisedValue: this.wholeSaleFormGroup.get('appraisedValue')?.value,
      pushForBuyFig: this.wholeSaleFormGroup.get('pushForBuyFigure')?.value,
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

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;

  constructor( private abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private fb: FormBuilder, private appraisalService: AprraisalService, public dialog: MatDialog, private route: ActivatedRoute , private router:Router, private communicationService: CommunicationService, private snackBar: MatSnackBar) {

    this.ability$=abilityService.ability$;
    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
   }

  firstFormGroup = this.fb.group({
    vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    vehicleYear: [{ value: null, disabled: true }],
    vehicleMake: [{ value: null, disabled: true }],
    vehicleModel: [{ value: null, disabled: true }],
    engineType: [{ value: null, disabled: true }],
    transmissionType: [{ value: null, disabled: true }],
    vehicleSeries: [{ value: null, disabled: true }],
    vehicleMiles: [null, [Validators.required]],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s\\.\\]?[0-9]{3}[-\\s\\.\\]?[0-9]{6}$")]],
    selectedVehicleInteriorColor: [null, Validators.required],
    selectedVehicleExteriorColor: [null, Validators.required],
    dealershipUserNames:[null,Validators.required]
  })


  secondFormGroup = this.fb.group({
    dashWarningLights: [null, Validators.required],
    doorLocks: [null, Validators.required],
    acCondition: [null, Validators.required],
    roofType: [null, Validators.required],
    stereoStatus: [null, Validators.required],
    interiorCondition: [null, Validators.required],
    frontLeftWindowStatus: [null, Validators.required],
    frontRightWindowStatus: [null, Validators.required],
    rearLeftWindowStatus: [null, Validators.required],
    rearRightWindowStatus: [null, Validators.required]
  })

  thirdFormGroup = this.fb.group({
    vehiclePic1: [null],
    vehiclePic2: [null],
    vehiclePic3: [null],
    vehiclePic4: [null],
    vehiclePic5: [null],
    vehiclePic6: [null],
    vehiclePic7: [null],
    vehiclePic8: [null],
    vehiclePic9: [null],
    vehicleVideo: [null]
  })

  ExteriorWalkAroundFormGroup = this.fb.group({
    oilCondition: [null, Validators.required],
    hasExteriorDamage: [false],
    anyPaintWorkDone: [false],
    frontDriverSideDamage: ['no'],
    frontDriverSideDamageTextBox: [null],
    rearDriverSideDamage: ['no'],
    rearDriverSideDamageTextBox: [null],
    rearPassengerSideDamage: ['no'],
    rearPassengerSideDamageTextBox: [null],
    frontPassengerSideDamage: ['no'],
    frontPassengerSideDamageTextBox: [null],
    frontDriverSidePaintwork: ['no'],
    frontDriverSidePaintworkTextBox: [null],
    rearDriverSidePaintwork: ['no'],
    rearDriverSidePaintworkTextBox: [null],
    frontPassengerSidePaintwork: ['no'],
    frontPassengerSidePaintworkTextBox: [null],
    rearPassengerSidePaintwork: ['no'],
    rearPassengerSidePaintworkTextBox: [null],
    frontWindshieldDamage: [null, Validators.required],
    rearWindowDamage: [null, Validators.required],
    frontDriverSideDamagePic: [null],
    rearDriverSideDamagePic: [null],
    rearPassengerSideDamagePic: [null],
    frontPassengerSideDamagePic: [null],
    frontDriverSidePaintworkPic: [null],
    rearDriverSidePaintworkPic: [null],
    frontPassengerSidePaintworkPic: [null],
    rearPassengerSidePaintworkPic: [null]

  });

  

  testDriveFormGroup = this.fb.group({
    breakingSystemStatus: [null, Validators.required],
    enginePerformance: [null, Validators.required],
    transmissionStatus: [null, Validators.required],
    steeringFeelStatus: [null, Validators.required],
    tires: [null, Validators.required],
    booksAndKeys: [null, Validators.required],
    titleStatus: [null, Validators.required],
    professionalOpinion: [null, Validators.required]
  });

  wholeSaleFormGroup = this.fb.group({
    appraisedValue: [null, Validators.required],
    dealerReserve: [null, Validators.required],
    dealerRetailPrice: [null, Validators.required],
    consumerAskPrice:[null],
    pushForBuyFigure: [false]
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
      this.appraisalService.checkVinNumber(vinValue).subscribe((response:any)=>{
        console.log(response);
      
        if(response.status===false){
          
          this.appraisalService.getVehicleInfo(vinValue).subscribe((response:any) => {
            this.vehicleData = response;
            console.log(this.vehicleData);
            this.vinLoading = false;
            this.firstFormGroup.patchValue({
              vehicleYear: this.vehicleData.year,
              vehicleMake: this.vehicleData.make,
              vehicleModel: this.vehicleData.model,
              vehicleSeries: this.vehicleData.series,
              engineType: this.vehicleData.engine,
              transmissionType: this.vehicleData.transmission,
            });
          },
          (error): any => {
            this.vinLoading = false;
            console.error('Error:', error);
          }
          )
        }else{
          this.openSnackBar('This veicle is already appraised', 'Close');
        }
      })
   
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '550px',
      width: '600px',
      data: {
        initialCheckboxValue: this.checkboxValue // Pass the initial value
      },
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.checkboxValue = result;
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openImage(imageData: any) {
    console.log(imageData)
    const dialogRef = this.dialog.open(DialogImageContent, {
      height: '550px',
      width: '600px',
      data: { image: imageData }
    });
  }

  submitAppraisalData() {
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
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
      acCondition: this.secondFormGroup.get('acCondition')?.value,
      doorLocks: this.secondFormGroup.get('doorLocks')?.value,
      roofType: this.secondFormGroup.get('roofType')?.value,
      stereoSts: this.secondFormGroup.get('stereoStatus')?.value,
      interiorCondn: this.secondFormGroup.get('interiorCondition')?.value,
      leftfrWinSts: this.secondFormGroup.get('frontLeftWindowStatus')?.value,
      frRightWinSts: this.secondFormGroup.get('frontRightWindowStatus')?.value,
      rearLeftWinSts: this.secondFormGroup.get('rearLeftWindowStatus')?.value,
      rearRightWinSts: this.secondFormGroup.get('rearRightWindowStatus')?.value,
      dashWarningLights: this.secondFormGroup.get('dashWarningLights')?.value,
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
      vehiclePic5: this.thirdFormGroup.get('vehiclePic5')?.value,
      vehiclePic6: this.thirdFormGroup.get('vehiclePic6')?.value,
      vehiclePic7: this.thirdFormGroup.get('vehiclePic7')?.value,
      vehiclePic8: this.thirdFormGroup.get('vehiclePic8')?.value,
      vehiclePic9: this.thirdFormGroup.get('vehiclePic9')?.value,
      vehicleVideo1: this.thirdFormGroup.get('vehicleVideo')?.value,
      oilCondition: this.ExteriorWalkAroundFormGroup.get('oilCondition')?.value,
      //subcribed:this.subscribeIsChecked(),
      externalDmgSts: this.ExteriorWalkAroundFormGroup.get('hasExteriorDamage')?.value,
      frDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamage')?.value,
      frDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamageTextBox')?.value,
      frDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamagePic')?.value,
      rearDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamage')?.value,
      rearDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamageTextBox')?.value,
      rearDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamagePic')?.value,
      rearPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamage')?.value,
      rearPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamageTextBox')?.value,
      rearPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamagePic')?.value,
      frPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamage')?.value,
      frPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamageTextBox')?.value,
      frPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamagePic')?.value,
      paintWork: this.ExteriorWalkAroundFormGroup.get('anyPaintWorkDone')?.value,
      frDrSidePntWrkSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintwork')?.value,
      frDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkTextBox')?.value,
      frDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkPic')?.value,
      rearDrSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintwork')?.value,
      rearDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkTextBox')?.value,
      rearDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkPic')?.value,
      frPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintwork')?.value,
      frPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkTextBox')?.value,
      frPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkPic')?.value,
      rearPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintwork')?.value,
      rearPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkTextBox')?.value,
      rearPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkPic')?.value,
      frWindshieldDmg: this.ExteriorWalkAroundFormGroup.get('frontWindshieldDamage')?.value,
      rearWindowDamage: this.ExteriorWalkAroundFormGroup.get('rearWindowDamage')?.value,
      // keyAssureYes:this.keyAssureYes(), mobileapp
      // subscribeToKeyAssure:this.subscribeToKeyAssure(),
      // keyAssureFiles:this.keyAssureFiles(),
      brakingSysSts: this.testDriveFormGroup.get('breakingSystemStatus')?.value,
      enginePerfor: this.testDriveFormGroup.get('enginePerformance')?.value,
      transmiSts: this.testDriveFormGroup.get('transmissionStatus')?.value,
      steeringFeelSts: this.testDriveFormGroup.get('steeringFeelStatus')?.value,
      tireCondition: this.testDriveFormGroup.get('tires')?.value,
      booksAndKeys: this.testDriveFormGroup.get('booksAndKeys')?.value,
      titleSts: this.testDriveFormGroup.get('titleStatus')?.value,
      profOpinion: this.testDriveFormGroup.get('professionalOpinion')?.value,
      esign:(this.checkboxValue?'true':'false'),
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
      this.openSnackBar("Appraisal Created Successfully",'close');
      this.communicationService.emitAppraisalCreated(response);
    }
      , (error): any => {
        console.error('Error:', error);
      }
    );
    console.log(appraisalData);
    }else{
      this.openSnackBar('please fill the required fields','close')
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
      dealershipUserNames:this.firstFormGroup.get('dealershipUserNames')?.value,
      vehicleExtColor: this.firstFormGroup.get('selectedVehicleInteriorColor')?.value,
      vehicleInterior: this.firstFormGroup.get('selectedVehicleExteriorColor')?.value,
      acCondition: this.secondFormGroup.get('acCondition')?.value,
      doorLocks: this.secondFormGroup.get('doorLocks')?.value,
      roofType: this.secondFormGroup.get('roofType')?.value,
      stereoSts: this.secondFormGroup.get('stereoStatus')?.value,
      interiorCondn: this.secondFormGroup.get('interiorCondition')?.value,
      leftfrWinSts: this.secondFormGroup.get('frontLeftWindowStatus')?.value,
      frRightWinSts: this.secondFormGroup.get('frontRightWindowStatus')?.value,
      rearLeftWinSts: this.secondFormGroup.get('rearLeftWindowStatus')?.value,
      rearRightWinSts: this.secondFormGroup.get('rearRightWindowStatus')?.value,
      dashWarningLights: this.secondFormGroup.get('dashWarningLights')?.value,
      vehiclePic1: this.thirdFormGroup.get('vehiclePic1')?.value,
      vehiclePic2: this.thirdFormGroup.get('vehiclePic2')?.value,
      vehiclePic3: this.thirdFormGroup.get('vehiclePic3')?.value,
      vehiclePic4: this.thirdFormGroup.get('vehiclePic4')?.value,
      vehiclePic5: this.thirdFormGroup.get('vehiclePic5')?.value,
      vehiclePic6: this.thirdFormGroup.get('vehiclePic6')?.value,
      vehiclePic7: this.thirdFormGroup.get('vehiclePic7')?.value,
      vehiclePic8: this.thirdFormGroup.get('vehiclePic8')?.value,
      vehiclePic9: this.thirdFormGroup.get('vehiclePic9')?.value,
      vehicleVideo1: this.thirdFormGroup.get('vehicleVideo')?.value,
      oilCondition: this.ExteriorWalkAroundFormGroup.get('oilCondition')?.value,
      //subcribed:this.subscribeIsChecked(),
      externalDmgSts: this.ExteriorWalkAroundFormGroup.get('hasExteriorDamage')?.value,
      frDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamage')?.value,
      frDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamageTextBox')?.value,
      frDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamagePic')?.value,
      rearDrSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamage')?.value,
      rearDrSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamageTextBox')?.value,
      rearDrSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamagePic')?.value,
      rearPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamage')?.value,
      rearPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamageTextBox')?.value,
      rearPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamagePic')?.value,
      frPassenSideDmgSts: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamage')?.value,
      frPassenSideDmgTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamageTextBox')?.value,
      frPassenSideDmgPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamagePic')?.value,
      paintWork: this.ExteriorWalkAroundFormGroup.get('anyPaintWorkDone')?.value,
      frDrSidePntWrkSts: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintwork')?.value,
      frDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkTextBox')?.value,
      frDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkPic')?.value,
      rearDrSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintwork')?.value,
      rearDrSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkTextBox')?.value,
      rearDrSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkPic')?.value,
      frPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintwork')?.value,
      frPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkTextBox')?.value,
      frPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkPic')?.value,
      rearPassenSidePntWrk: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintwork')?.value,
      rearPassenSidePntWrkTxtBox: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkTextBox')?.value,
      rearPassenSidePntWrkPic: this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkPic')?.value,
      frWindshieldDmg: this.ExteriorWalkAroundFormGroup.get('frontWindshieldDamage')?.value,
      rearWindowDamage: this.ExteriorWalkAroundFormGroup.get('rearWindowDamage')?.value,
      // keyAssureYes:this.keyAssureYes(), mobileapp
      // subscribeToKeyAssure:this.subscribeToKeyAssure(),
      // keyAssureFiles:this.keyAssureFiles(),
      brakingSysSts: this.testDriveFormGroup.get('breakingSystemStatus')?.value,
      enginePerfor: this.testDriveFormGroup.get('enginePerformance')?.value,
      transmiSts: this.testDriveFormGroup.get('transmissionStatus')?.value,
      steeringFeelSts: this.testDriveFormGroup.get('steeringFeelStatus')?.value,
      tireCondition: this.testDriveFormGroup.get('tires')?.value,
      booksAndKeys: this.testDriveFormGroup.get('booksAndKeys')?.value,
      titleSts: this.testDriveFormGroup.get('titleStatus')?.value,
      profOpinion: this.testDriveFormGroup.get('professionalOpinion')?.value,
      esign:(this.checkboxValue?'true':'false'),
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
 
   
   
  ngOnInit() {
    console.log('calling again');
    
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when the component initializes
    });
    // let id:any = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    let stateObjectFromAppraisal:any = history.state
    this.appId=stateObjectFromAppraisal.id;
    this.isEdit = stateObjectFromAppraisal.isEdit;
    this.isDraft = stateObjectFromAppraisal.isDraft;
    console.log(this.appId);
    console.log(stateObjectFromAppraisal.isDraft);
    

    if (this.appId) {
      this.appraisalService.getAppraisalShowToUi(this.appId).subscribe((response) => {
        this.apprForShowToUi = response;
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
          dealershipUserNames:this.apprForShowToUi.dealershipUserNames,
          selectedVehicleInteriorColor: this.apprForShowToUi.vehicleInterior,
          selectedVehicleExteriorColor: this.apprForShowToUi.vehicleExtColor,
        });

        this.secondFormGroup.patchValue({
          acCondition: this.apprForShowToUi.acCondition,
          doorLocks: this.apprForShowToUi.doorLocks,
          roofType: this.apprForShowToUi.roofType,
          stereoStatus: this.apprForShowToUi.stereoSts,
          interiorCondition: this.apprForShowToUi.interiorCondn,
          frontLeftWindowStatus: this.apprForShowToUi.leftfrWinSts,
          frontRightWindowStatus: this.apprForShowToUi.frRightWinSts,
          rearLeftWindowStatus: this.apprForShowToUi.rearLeftWinSts,
          rearRightWindowStatus: this.apprForShowToUi.rearRightWinSts,
          dashWarningLights: this.apprForShowToUi.dashWarningLights
        });


        this.thirdFormGroup.patchValue({
          vehiclePic1: this.apprForShowToUi.vehiclePic1,
          vehiclePic2: this.apprForShowToUi.vehiclePic2,
          vehiclePic3: this.apprForShowToUi.vehiclePic3,
          vehiclePic4: this.apprForShowToUi.vehiclePic4,
          vehiclePic5: this.apprForShowToUi.vehiclePic5,
          vehiclePic6: this.apprForShowToUi.vehiclePic6,
          vehiclePic7: this.apprForShowToUi.vehiclePic7,
          vehiclePic8: this.apprForShowToUi.vehiclePic8,
          vehiclePic9: this.apprForShowToUi.vehiclePic9,
          vehicleVideo: this.apprForShowToUi.vehicleVideo1
        })

        this.ExteriorWalkAroundFormGroup.patchValue({
          oilCondition: this.apprForShowToUi.oilCondition,
          hasExteriorDamage: this.apprForShowToUi.externalDmgSts,
          anyPaintWorkDone: this.apprForShowToUi.paintWork,
          frontDriverSideDamage: this.apprForShowToUi.frDrSideDmgSts,
          frontDriverSideDamageTextBox: this.apprForShowToUi.frDrSideDmgTxtBox,
          rearDriverSideDamage: this.apprForShowToUi.rearDrSideDmgSts,
          rearDriverSideDamageTextBox: this.apprForShowToUi.rearDrSideDmgTxtBox,
          rearPassengerSideDamage: this.apprForShowToUi.rearPassenSideDmgSts,
          rearPassengerSideDamageTextBox: this.apprForShowToUi.rearPassenSideDmgTxtBox,
          frontPassengerSideDamage: this.apprForShowToUi.frPassenSideDmgSts,
          frontPassengerSideDamageTextBox: this.apprForShowToUi.frPassenSideDmgTxtBox,
          frontDriverSidePaintwork: this.apprForShowToUi.frDrSidePntWrkSts,
          frontDriverSidePaintworkTextBox: this.apprForShowToUi.frDrSidePntWrkTxtBox,
          rearDriverSidePaintwork: this.apprForShowToUi.rearDrSidePntWrk,
          rearDriverSidePaintworkTextBox: this.apprForShowToUi.rearDrSidePntWrkTxtBox,
          frontPassengerSidePaintwork: this.apprForShowToUi.frPassenSidePntWrk,
          frontPassengerSidePaintworkTextBox: this.apprForShowToUi.frPassenSidePntWrkTxtBox,
          rearPassengerSidePaintwork: this.apprForShowToUi.rearPassenSidePntWrk,
          rearPassengerSidePaintworkTextBox: this.apprForShowToUi.rearPassenSidePntWrkTxtBox,
          frontWindshieldDamage: this.apprForShowToUi.frWindshieldDmg,
          rearWindowDamage: this.apprForShowToUi.rearWindowDamage,
          frontDriverSideDamagePic: this.apprForShowToUi.frDrSideDmgPic,
          rearDriverSideDamagePic: this.apprForShowToUi.rearDrSideDmgPic,
          rearPassengerSideDamagePic: this.apprForShowToUi.rearPassenSideDmgPic,
          frontPassengerSideDamagePic: this.apprForShowToUi.frPassenSideDmgPic,
          frontDriverSidePaintworkPic: this.apprForShowToUi.frDrSidePntWrkPic,
          rearDriverSidePaintworkPic: this.apprForShowToUi.rearDrSidePntWrkPic,
          frontPassengerSidePaintworkPic: this.apprForShowToUi.frPassenSidePntWrkPic,
          rearPassengerSidePaintworkPic: this.apprForShowToUi.rearPassenSidePntWrkPic
        });

        this.testDriveFormGroup.patchValue({
          breakingSystemStatus: this.apprForShowToUi.brakingSysSts,
          enginePerformance: this.apprForShowToUi.enginePerfor,
          transmissionStatus: this.apprForShowToUi.transmiSts,
          steeringFeelStatus: this.apprForShowToUi.steeringFeelSts,
          tires: this.apprForShowToUi.tireCondition,
          booksAndKeys: this.apprForShowToUi.booksAndKeys,
          titleStatus: this.apprForShowToUi.titleSts,
          professionalOpinion: this.apprForShowToUi.profOpinion
        });

        if(this.apprForShowToUi.esign=== null ||this.apprForShowToUi.esign==='false'){
          this.checkboxValue = false;
        }else if(this.apprForShowToUi.esign==='true'){
          this.checkboxValue = true;
        }
        
        this.wholeSaleFormGroup.patchValue({
          appraisedValue: this.apprForShowToUi.appraisedValue,
          dealerReserve: this.apprForShowToUi.dealerReserve,
          dealerRetailPrice: this.apprForShowToUi.delrRetlAskPrice,
          pushForBuyFigure: this.apprForShowToUi.pushForBuyFig,
          consumerAskPrice:this.apprForShowToUi.consumerAskPrice
        })

      });
    }

    this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamage')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamageTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamagePic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamage')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamageTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamagePic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamage')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamageTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamagePic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamage')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamageTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamagePic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintwork')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintworkPic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintwork')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintworkPic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintwork')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintworkPic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintwork')?.valueChanges.subscribe(value => {
      const textBoxControl = this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkTextBox');
      const frontDrDamageControl=this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintworkPic');
      // Check the value of 'frontDriverSideDamage' and update the validator accordingly
      if (value === 'yes') {
        textBoxControl?.setValidators(Validators.required);
        frontDrDamageControl?.setValidators(Validators.required);
      } else {
        textBoxControl?.clearValidators();
        frontDrDamageControl?.clearValidators();
      }
  
      // Update the validation status
      textBoxControl?.updateValueAndValidity();
      frontDrDamageControl?.updateValueAndValidity();
    });

    //for clearing exterior damage
    this.ExteriorWalkAroundFormGroup.get('hasExteriorDamage')?.valueChanges.subscribe((value: any) => {
      if (!value) {
        // Reset the values when hasExteriorDamage is set to false
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontDriverSideDamage: 'no',
          rearDriverSideDamage: 'no',
          rearPassengerSideDamage: 'no',
          frontPassengerSideDamage: 'no'
          // Reset other form controls as needed
        });
      }
    });

    this.ExteriorWalkAroundFormGroup.get('frontDriverSideDamage')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontDriverSideDamageTextBox: null,
          frontDriverSideDamagePic: null
        })
      }
    });

    this.ExteriorWalkAroundFormGroup.get('rearDriverSideDamage')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          rearDriverSideDamageTextBox: null,
          rearDriverSideDamagePic: null
        })
      }
    });
    this.ExteriorWalkAroundFormGroup.get('rearPassengerSideDamage')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          rearPassengerSideDamageTextBox: null,
          rearPassengerSideDamagePic: null
        })
      }
    });
    this.ExteriorWalkAroundFormGroup.get('frontPassengerSideDamage')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontPassengerSideDamageTextBox: null,
          frontPassengerSideDamagePic: null
        })
      }
    });
    // for clearing paintwork
    this.ExteriorWalkAroundFormGroup.get('anyPaintWorkDone')?.valueChanges.subscribe((value: any) => {
      if (!value) {
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontDriverSidePaintwork: 'no',
          rearDriverSidePaintwork: 'no',
          rearPassengerSidePaintwork: 'no',
          frontPassengerSidePaintwork: 'no'
        });
      }
    });

    this.ExteriorWalkAroundFormGroup.get('frontDriverSidePaintwork')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontDriverSidePaintworkTextBox: null,
          frontDriverSidePaintworkPic: null
        })
      }
    });

    this.ExteriorWalkAroundFormGroup.get('rearDriverSidePaintwork')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          rearDriverSidePaintworkTextBox: null,
          rearDriverSidePaintworkPic: null
        })
      }
    });

    this.ExteriorWalkAroundFormGroup.get('rearPassengerSidePaintwork')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          rearPassengerSidePaintworkTextBox: null,
          rearPassengerSidePaintworkPic: null
        })
      }
    });
    this.ExteriorWalkAroundFormGroup.get('frontPassengerSidePaintwork')?.valueChanges.subscribe((value: any) => {
      if (value === 'no') {
        this.ExteriorWalkAroundFormGroup.patchValue({
          frontPassengerSidePaintworkTextBox: null,
          frontPassengerSidePaintworkPic: null
        })
      }
    });

    let dropDowns: any;
    this.appraisalService.getDropdowns().subscribe((response) => {
      dropDowns = response;
      this.vehicleExteriorColor = dropDowns.vehicleExtrColor;
      this.vehicleInteriorColor = dropDowns.vehicleIntrColor;
      this.dashWarningLights = dropDowns.dashWarnLights;
      this.acCondition = dropDowns.acCond;
      this.roofType = dropDowns.roofType;
      this.stereoStatus = dropDowns.stereoSts;
    
      this.interiorCondition = dropDowns.interiorCond;
      this.frontLeftWindowStatus = dropDowns.frontLeftWinSts;
      this.frontRightWindowStatus = dropDowns.frontRightWinSts;
      this.rearLeftWindowStatus = dropDowns.rearLeftWinSts;
      this.rearRightWindowStatus = dropDowns.rearRightWinSts;
      this.oilCondition = dropDowns.oilCond;
      this.breakingSystemStatus = dropDowns.brakingSysSts;
      this.enginePerformance = dropDowns.enginePerformance;
      this.transmissionStatus = dropDowns.transmissionStatus;
      this.steeringFeelStatus = dropDowns.steeringFeelSts;
      this.tires = dropDowns.tireCondition;
      this.booksAndKeys = dropDowns.bookAndKeys;
      this.titleStatus = dropDowns.titleSts;
      this.doorLocks = dropDowns.doorLocks;
      this.frontWindshieldDamage = dropDowns.frontWindShieldDamage
      this.rearWindowDamage = dropDowns.rearWindowDamage
      this.dealershipUserNames=dropDowns.dealershipUserNames
    });

  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'esign-for-new-appraisal.html',
})
export class DialogContentExampleDialog  {
  checkboxValue: boolean = false;
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility , private fb:FormBuilder, public dialogRef: MatDialogRef<DialogContentExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
   }

  ngOnInit() {
    // Set the checkbox value here based on the data or other logic if needed
    this.checkboxValue = this.data.initialCheckboxValue || false;
  }
  
  closeDialog() {
    this.dialogRef.close(this.checkboxValue);
    console.log(this.checkboxValue);
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
