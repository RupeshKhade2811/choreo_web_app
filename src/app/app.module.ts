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
import { DialogContentExampleDialog } from './appraisal-page/create-new-appraisal/create-new-appraisal.component';
import { CommaSeparatorDirective } from './comma-separator.directive';
import { ReusableCardComponent } from './offers/reusable-card/reusable-card.component';
import { MakeOfferSelect } from './inventory/inventory.component';
import {InvSelect, SoldRetail, HoldUnit} from './inventory/inventory.component';
import { Wholesale } from './inventory/inventory.component';
import{ playVideoDialog } from './factory-training/factory-training.component'
import {pdfDocuments,EsignDialog, mailAttachPdf} from './shipments/shipments.component';
import { FavoriteVehicleComponent } from './favorite-vehicle/favorite-vehicle.component';
import { MakeOffer } from './quote-page/quote-page.component';
import { FactoryTrainingComponent } from './factory-training/factory-training.component';
import { ReportComponent } from './dashboard/report/report.component';
import { DealerAdminComponent } from './dealer-admin/dealer-admin.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WidgetComponent } from './widget/widget.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProgressLoaderComponent } from './progress-loader/progress-loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DealerAgreement, SubscriptionComponent } from './subscription/subscription.component';

import { AbilityModule, AbilityService } from '@casl/angular';
import { AppAbility, createAbility } from './services/AppAbility';
import { CustomMonthPickerDirective } from './custom-month-picker.directive';
import { CustomPickerFormatsDirectiveDirective } from './custom-picker-formats-directive.directive';
import { MatMenuModule } from '@angular/material/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserService } from './services/user.service';
import { Observable, firstValueFrom, switchMap, tap } from 'rxjs';

//Mehtod for Local Testing

function initializeAppFactory(httpClient: UserService): () => Observable<any> {
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
    DialogContentExampleDialog,
    CommaSeparatorDirective,
    ReusableCardComponent,
    MakeOfferSelect,
    InvSelect,
    SoldRetail,
    HoldUnit,
    Wholesale,
    playVideoDialog,
    pdfDocuments,
    MakeOfferSelect,
    EsignDialog,
    FavoriteVehicleComponent,
    MakeOffer,
    FactoryTrainingComponent,
    ReportComponent,
    DealerAdminComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    WidgetComponent,
    mailAttachPdf,
    ProgressLoaderComponent,
    SubscriptionComponent,
    DealerAgreement,
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
    InfiniteScrollModule
    
  ],

  providers: [DatePipe,
    { provide: AppAbility, useFactory: createAbility },

    {provide: APP_INITIALIZER ,useFactory: initializeAppFactory,deps:[UserService],multi:true},
   
   
    
    AbilityService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

