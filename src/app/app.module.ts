import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MyNavComponent } from './my-nav/my-nav.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MaterailModule  } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { CommaSeparatorDirective } from './comma-separator.directive';
import { MakeOfferSelect } from './inventory/inventory.component';
import { SoldRetail, HoldUnit} from './inventory/inventory.component';
import { Wholesale } from './inventory/inventory.component';
import { FavoriteVehicleComponent } from './favorite-vehicle/favorite-vehicle.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProgressLoaderComponent } from './progress-loader/progress-loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AbilityModule, AbilityService } from '@casl/angular';
import { CustomMonthPickerDirective } from './custom-month-picker.directive';
import { CustomPickerFormatsDirectiveDirective } from './custom-picker-formats-directive.directive';
import { MatMenuModule } from '@angular/material/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserService } from './services/user.service';
import { Observable, filter, firstValueFrom, switchMap, tap } from 'rxjs';
import { authCodeFlowConfig } from './auth.config';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authPasswordFlowConfig } from './auth-password-flow-login';

//Mehtod for Local Testing

function initializeAppFactory(httpClient: UserService,oauthService:OAuthService): () => Observable<any> {
  oauthService.configure(authCodeFlowConfig);

  //oauthService.configure(authPasswordFlowConfig);
  
  oauthService.loadDiscoveryDocumentAndLogin();
  //this.oauthService.setupAutomaticSilentRefresh();

  // Automatically load user profile
  oauthService.events.pipe(filter((e) => e.type === 'token_received')).subscribe((_) => oauthService.loadUserProfile());


  return () => httpClient.getUserData()
  .pipe(tap((userData :any )=> {
    console.log('userData tap');
    console.log(userData);
  
    sessionStorage.setItem('userData', userData.id);
    sessionStorage.setItem('userName',userData.firstName+" "+userData.lastName);
    sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
    sessionStorage.setItem('profilePic',userData.profilePicture);
    sessionStorage.setItem('roleData', userData.roleOfUser.role);
    
   })
  );

  } 

//Method for server testing

// function initializeAppFactory(httpClient: UserService): () => Observable<any> {
// const userId = sessionStorage.getItem('userData');

//  if(userId){
//   return () => httpClient.getUserDetails(userId)
//   .pipe(tap((userData :any )=> {
//     console.log('userData tap');
//     console.log(userData);
  
//     sessionStorage.setItem('userData', userData.id);
//     sessionStorage.setItem('userName',userData.firstName+" "+userData.lastName);
//     sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
//     sessionStorage.setItem('profilePic',userData.profilePicture);
//     sessionStorage.setItem('roleData', userData.roleOfUser.role);
//    })
//   );
//  } else {
//   return () => httpClient.getUserId().pipe(
//     switchMap((userIdData:any) => {
//       return httpClient.getUserDetails(userIdData.userId);
//     }),
//     tap((userData: any) => {
//       console.log('userData tap');
//       console.log(userData);

//       sessionStorage.setItem('userData', userData.id);
//       sessionStorage.setItem('userName', userData.firstName + ' ' + userData.lastName);
//       sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
//       sessionStorage.setItem('profilePic', userData.profilePicture);
//       sessionStorage.setItem('roleData', userData.roleOfUser.role);
//     })
//   );
//  }

// }

@NgModule({

  declarations: [
    AppComponent,
    MyNavComponent,
    routingComponents,
    
    CommaSeparatorDirective,
    MakeOfferSelect,
    
    SoldRetail,
    HoldUnit,
    Wholesale,
    
   
    MakeOfferSelect,
   
    FavoriteVehicleComponent,

  
    UserProfileComponent,
    ChangePasswordComponent,
    
  
    ProgressLoaderComponent,
    
    CustomMonthPickerDirective,
    CustomPickerFormatsDirectiveDirective,
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule.forRoot(),
    MaterailModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatMenuModule,
    InfiniteScrollModule,
    OAuthModule.forRoot(),
    
  ],

  providers: [DatePipe,
    {provide: APP_INITIALIZER ,useFactory: initializeAppFactory,deps:[UserService,OAuthService],multi:true},
   AbilityService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

