import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import urls from 'src/properties';
import { AbilityService } from '@casl/angular';
import { AppAbility } from '../services/AppAbility';
import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';



@Component({
  selector: 'app-factory-training',
  templateUrl: './factory-training.component.html',
  styleUrls: ['./factory-training.component.css'],
})
export class FactoryTrainingComponent {
panelOpenState: any;
readonly ability$: Observable<AppAbility>;
public able_to!: PureAbility;

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private DashboardService:DashboardService,public dialog: MatDialog,private route: ActivatedRoute,private router: Router){
    
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
  }
  public trainingCards :any
  
  // baseUrl:string="https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

  ngOnInit(): void {

    const userId = history.state.userId;
    console.log(userId);

    this.DashboardService.ftryTrainingPortal(userId).subscribe(
      (response:any):any=>{        
        this.trainingCards=response.categoryWiseList;
        console.log(this.trainingCards) ;
      },
      (error):any=>{
        console.error('Error:',error);
      }
    )
  }

  openVideoDialog(ftryTrngCard: any): void {
    const dialogRef = this.dialog.open(playVideoDialog, {
      data: { title: ftryTrngCard.title,
              description: ftryTrngCard.description,
              video: ftryTrngCard.video,
               }
    });
  }


  public appraisal:boolean=true;
  public inventory:boolean=false;
  public offers:boolean=false;
  public shpmnt:boolean=false;

  appraisalVideos(){    
    this.appraisal=true;
    this.inventory=false;
    this.offers=false;
    this.shpmnt=false;
  }
  inventoryVideos(){
    this.appraisal=false;
    this.inventory=true;
    this.offers=false;
    this.shpmnt=false;
  }
  offersVideos(){
    this.appraisal=false;
    this.inventory=false;
    this.offers=true;
    this.shpmnt=false;
  }
  shpmntVideos(){
    this.appraisal=false;
    this.inventory=false;
    this.offers=false;
    this.shpmnt=true;
  }

}





@Component({
  selector: 'playVideoDialog',
  templateUrl: 'videoPlayBack.html',
  

})
export class playVideoDialog {
  constructor(
    public dialogRef: MatDialogRef<playVideoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  videoUrl:string="https://services-test.keyassure.live/appraisal/downloadVideo?filename=";

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}