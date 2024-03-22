import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalPageComponent } from './appraisal-page/appraisal-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';

import { ShipmentsComponent } from './shipments/shipments.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { CreateNewAppraisalComponent } from './appraisal-page/create-new-appraisal/create-new-appraisal.component';

import{ FavoriteVehicleComponent} from './favorite-vehicle/favorite-vehicle.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';




const routes: Routes = [


  {path:'dashboard', component:DashboardComponent},
 
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
   {path:'shipments', component:ShipmentsComponent, children:[
    {path:'myPurchase/viewVehicle', component:VehicleDetailsComponent},
    {path:'mysales/viewVehicle', component:VehicleDetailsComponent}]},
  {path:'favVehicle',component:FavoriteVehicleComponent, children:[
    {path:'viewVehicle', component:VehicleDetailsComponent}
  ]},
  
  
  
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:"**", component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }

export const routingComponents=[AppraisalPageComponent,DashboardComponent,InventoryComponent,ShipmentsComponent,VehicleDetailsComponent,CreateNewAppraisalComponent,FavoriteVehicleComponent, LoginComponent,];