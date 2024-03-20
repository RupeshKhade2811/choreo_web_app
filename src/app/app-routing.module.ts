import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalPageComponent } from './appraisal-page/appraisal-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OffersComponent } from './offers/offers.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { CreateNewAppraisalComponent } from './appraisal-page/create-new-appraisal/create-new-appraisal.component';
import { QuotePageComponent } from './quote-page/quote-page.component';
import{ FavoriteVehicleComponent} from './favorite-vehicle/favorite-vehicle.component';
import { FactoryTrainingComponent } from './factory-training/factory-training.component';
import { ReportComponent } from './dashboard/report/report.component';
import { DealerAdminComponent } from './dealer-admin/dealer-admin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';




const routes: Routes = [


  {path:'dashboard', component:DashboardComponent},
  {path:'dealerAdmin', component:DealerAdminComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'appraisal', component:AppraisalPageComponent, children:[
    {path:'newAppraisal', component:CreateNewAppraisalComponent},
    {path:'editAppraisal', component:CreateNewAppraisalComponent},
    {path:'viewVehicle', component:VehicleDetailsComponent}
  ]},
  {path:'inventory', component:InventoryComponent, children:[
    {path:'editInventory', component:CreateNewAppraisalComponent},
    {path:'viewVehicle', component:VehicleDetailsComponent},
    {path:'searchfactory/viewVehicle', component:VehicleDetailsComponent}
  ]},
  {path:'offers', component:OffersComponent,children:[
    {path:'procurement/viewVehicle', component:VehicleDetailsComponent},
    {path:'liquidation/viewVehicle', component:VehicleDetailsComponent},
    {path:'trade/availableTrade/viewVehicle', component:VehicleDetailsComponent},
    {path:'trade/factoryOffers/viewVehicle', component:VehicleDetailsComponent},
    {path:'procurement/quote',component:QuotePageComponent},
    {path:'liquidation/quote',component:QuotePageComponent},
    {path:'trade/availableTrade/quote',component:QuotePageComponent},
    {path:'trade/factoryOffers/quote',component:QuotePageComponent},
  ]}, 
  
  {path:'shipments', component:ShipmentsComponent, children:[
    {path:'myPurchase/viewVehicle', component:VehicleDetailsComponent},
    {path:'mysales/viewVehicle', component:VehicleDetailsComponent}]},
  {path:'favVehicle',component:FavoriteVehicleComponent, children:[
    {path:'viewVehicle', component:VehicleDetailsComponent}
  ]},
  {path:'ftryTrainingPortal',component:FactoryTrainingComponent},
  {path:'subscription',component:SubscriptionComponent},
  {path:'reports',component:ReportComponent},
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:"**", component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }

export const routingComponents=[AppraisalPageComponent,DashboardComponent,InventoryComponent,OffersComponent,ShipmentsComponent,VehicleDetailsComponent,CreateNewAppraisalComponent,QuotePageComponent,FavoriteVehicleComponent,ReportComponent, LoginComponent,SubscriptionComponent];