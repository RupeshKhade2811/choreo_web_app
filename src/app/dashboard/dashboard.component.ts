import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import urls from 'src/properties';

import { AbilityService } from '@casl/angular';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { AppAbility, User, defineAbilityFor } from '../services/AppAbility';
import { PureAbility } from '@casl/ability';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  imgArr2: string[] | undefined;
  

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,
    private router:Router, private http:HttpClient , private route:ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private DashboardService:DashboardService, private userService:UserService){

      this.ability$=abilityService.ability$;
      
    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
    
    }
  
  // baseUrl:string="https://services-test.keyassure.live/user/getProfilePic?pic1=";  
  baseUrl: string = `${urls.getProfilePic}?pic1=`;


  public showUserCard :any
  isLoading = false;

  ngOnInit(): void {
    

  this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
    (response: any) => {
      if (response.code === 200) {
        this.isLoading = false;
        this.showUserCard=response;
       console.log(response);
       

      }
  })

    this.imgArr2=['https://img.freepik.com/free-vector/speedometer-panel-black-panel-temperature-reading-speed-fuel-with-brightly-colored-scales_1284-42149.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais','https://img.freepik.com/free-vector/car-parking-night-city_107791-19400.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais','https://img.freepik.com/free-vector/cars-driving-road-along-river-sea-with-mountains-horizon-cartoon-vector-landscape-with-rocky-hills-water-pond-highway-with-automobiles-skyline-with-three-vehicles-riding-roadway_107791-23350.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais']
  
  
  
  }

  goToFavVehicle(userId : any){
    console.log(userId);
    this.router.navigate(['/favVehicle'], {state:{userId:userId}, relativeTo:this.route});
  }

  goToSubscription(){
    this.router.navigate(['/subscription'], {relativeTo:this.route});
  }
  ftryTraining(userId : any){
    this.router.navigate(['/ftryTrainingPortal'], {state:{userId:userId}, relativeTo:this.route});
  }
  dealerInvReport(userId:any) {
    this.router.navigate(['/reports'],{state:{userId:userId},relativeTo:this.route});
    }

  dlrAdmin(userId : any){
    this.router.navigate(['/dealerAdmin'], {state:{userId:userId}, relativeTo:this.route});
  }

  userProfile(){
    this.router.navigate(['/userProfile'], { relativeTo:this.route});
  }

}

