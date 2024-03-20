import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import urls from 'src/properties';
import { AbilityService } from '@casl/angular';
import { PureAbility } from '@casl/ability';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { OAuthService } from 'angular-oauth2-oidc';


export const userResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
        inject(UserService).getUserData().subscribe((userData: any) => {
            console.log(' resolve user data');

            sessionStorage.setItem('userData', userData.id);
            sessionStorage.setItem('userName',userData.firstName+" "+userData.lastName);
            sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
            sessionStorage.setItem('profilePic',userData.profilePicture)
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

  constructor(private oauthservice : OAuthService, ){
   
  }
  ngOnInit(): void {
    
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public displayPic = sessionStorage.getItem('profilePic');
  public displayName=sessionStorage.getItem('userName');
    
    baseUrl: string = `${urls.getProfilePic}?pic1=`;

    logout() {
      this.oauthservice.logOut();
      }

}
