import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import urls from 'src/properties';
import { AbilityService } from '@casl/angular';
import { PureAbility } from '@casl/ability';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../services/dashboard.service';


export const userResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  inject(UserService).getUserData().subscribe((userData: any) => {
    console.log(' resolve user data');

    sessionStorage.setItem('userData', userData.id);
    sessionStorage.setItem('userName', userData.firstName + " " + userData.lastName);
    sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
    //   sessionStorage.setItem('profilePic',userData.profilePicture)
  });

  return true;

};


@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],

})
export class MyNavComponent implements OnInit {

  public able_to!: PureAbility;
  showUserCard: any;

  constructor(private oauthservice: OAuthService, private router: Router, private http: HttpClient, private route: ActivatedRoute,
    private DashboardService: DashboardService) {

  }
  ngOnInit(): void {

    console.log(sessionStorage.getItem('userData'));
    
    setTimeout(()=>{
      this.DashboardService.showUser(sessionStorage.getItem('userData')).subscribe(
            
        (response: any) => {
        //  if (response.code === 200) {
        //    this.isLoading = false;
            this.showUserCard = response;
            // sessionStorage.setItem('profilePic',response.profilePicture)
            this.displayPic=this.showUserCard.profilePicture;
            console.log(this.showUserCard );
  
        //  }
        })
    },1000)
   
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public displayPic ='';
  public displayName = sessionStorage.getItem('userName');
  public userId = sessionStorage.getItem('userData');

  baseUrl: string = `${urls.getProfilePic}?imageName=`;

  logout() {
    this.oauthservice.logOut();
  }

  goToFavVehicle(userId: any) {
    console.log(userId);
    this.router.navigate(['/favVehicle'], { state: { userId: userId }, relativeTo: this.route });
  }

}
