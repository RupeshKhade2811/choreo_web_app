import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import urls from 'src/properties';

import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { PureAbility } from '@casl/ability';
import { getLocaleMonthNames } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public able_to!: PureAbility;
  imgArr2: string[] | undefined;



  constructor(private oauthservice: OAuthService,
    private router: Router, private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private DashboardService: DashboardService, private userService: UserService) {



  }

  // baseUrl:string="https://services-test.keyassure.live/user/getProfilePic?pic1=";  
  baseUrl: string = `${urls.getProfilePic}?imageName=`;

  get accessToken(): string {
    return this.oauthservice.getAccessToken();
  }


  public showUserCard: any
  isLoading = false;
  public current_temp = "";
  public weatherImage = "";
  public condition = "";
  public feelslike_c = "";
  ngOnInit(): void {

    this.DashboardService.getWeatherData1().then(
      (response: any) => {
        this.current_temp = response.current.temp_c;
        this.weatherImage = response.current.condition.icon;
        this.condition = response.current.condition.text;
        this.feelslike_c = response.current.feelslike_c;



      },

    );

    if(sessionStorage!=null && sessionStorage.getItem('userData')!=null){

      this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.isLoading = false;
            this.showUserCard = response;
            console.log(response);
          }
        })
  
      this.userService.userCount(sessionStorage.getItem('userData')).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.status == true) {
            this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
  
              (response: any) => {
                //  if (response.code === 200) {
                this.isLoading = false;
                this.showUserCard = response;
                // sessionStorage.setItem('profilePic',response.profilePicture)
                console.log(this.showUserCard);
  
                //  }
              })
          } else {
            const email = sessionStorage.getItem('email');
            const first_name = sessionStorage.getItem('first_name');
            const last_name = sessionStorage.getItem('last_name');
            const phone = sessionStorage.getItem('phone');
            const userName = sessionStorage.getItem('email');
            this.showUserCard = {
              email: email,
              first_name: first_name,
              last_name: last_name,
              phone: phone,
              username: userName
            };
          }
        }
      })

    }else{
      setTimeout(()=>{
        this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
          (response: any) => {
            if (response.code === 200) {
              this.isLoading = false;
              this.showUserCard = response;
              console.log(response);
            }
          })
    
        this.userService.userCount(sessionStorage.getItem('userData')).subscribe({
          next: (data: any) => {
            console.log(data);
            if (data.status == true) {
              this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
    
                (response: any) => {
                  //  if (response.code === 200) {
                  this.isLoading = false;
                  this.showUserCard = response;
                  // sessionStorage.setItem('profilePic',response.profilePicture)
                  console.log(this.showUserCard);
    
                  //  }
                })
            } else {
              const email = sessionStorage.getItem('email');
              const first_name = sessionStorage.getItem('first_name');
              const last_name = sessionStorage.getItem('last_name');
              const phone = sessionStorage.getItem('phone');
              const userName = sessionStorage.getItem('email');
              this.showUserCard = {
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                username: userName
              };
            }
          }
        })
  
      },900)
    }

   

    this.imgArr2 = ['https://img.freepik.com/free-vector/speedometer-panel-black-panel-temperature-reading-speed-fuel-with-brightly-colored-scales_1284-42149.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais', 'https://img.freepik.com/free-vector/car-parking-night-city_107791-19400.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais', 'https://img.freepik.com/free-vector/cars-driving-road-along-river-sea-with-mountains-horizon-cartoon-vector-landscape-with-rocky-hills-water-pond-highway-with-automobiles-skyline-with-three-vehicles-riding-roadway_107791-23350.jpg?size=626&ext=jpg&ga=GA1.1.820234262.1704723151&semt=ais']



  }

  goToFavVehicle(userId: any) {
    console.log(userId);
    this.router.navigate(['/favVehicle'], { state: { userId: userId }, relativeTo: this.route });
  }



  userProfile() {
    this.router.navigate(['/userProfile'], { relativeTo: this.route });
  }


  logout() {
    this.oauthservice.logOut();
  }
}

function accessToken() {
  throw new Error('Function not implemented.');
}

