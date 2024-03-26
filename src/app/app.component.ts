import { APP_INITIALIZER, AfterViewInit, Component, Inject, OnInit, inject } from '@angular/core';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';
import { AbilityBuilder, CreateAbility, MongoAbility, PureAbility, createMongoAbility } from '@casl/ability';
import { environment } from '../environments/environment';
import { AbilityService } from '@casl/angular';
import { Observable, catchError, map, shareReplay, switchMap, throwError } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import urls from 'src/properties';
import { OAuthService } from 'angular-oauth2-oidc';


export const heroResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  inject(UserService).getUserData().subscribe((userData: any) => {
    console.log(userData);
    sessionStorage.setItem('userData', userData.id);
    sessionStorage.setItem('userName', userData.firstName + " " + userData.lastName);
    sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
    sessionStorage.setItem('profilePic', userData.profilePicture)
  });


};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userId: any;

  public able_to!: PureAbility;
  public shouldLoadNav: any;

  constructor(private userService: UserService, private oauthService: OAuthService) {

  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['username'];
  }
  
  get claim(): any {
    const claims = this.oauthService.getIdentityClaims();
    return claims;
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 // public displayPic = sessionStorage.getItem('profilePic');
  public displayName = sessionStorage.getItem('userName');

  baseUrl: string = `${urls.getProfilePic}?pic1=`;





  ngOnInit(): void {

    console.log(this.userName);
    console.log(this.accessToken);
    console.log(
      this.claim
    );

    console.log(this.idToken);
  }

  

  title = 'factory-keyassure-llc';
}
