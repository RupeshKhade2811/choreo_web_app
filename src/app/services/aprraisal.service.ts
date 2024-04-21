import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppraisalPageComponent } from '../appraisal-page/appraisal-page.component';
import { AppComponent } from '../app.component';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';
import contextPaths from 'src/context';
import urls from 'src/properties';


@Injectable({
  providedIn: 'root'
})
export class AprraisalService implements OnInit{

    // public userData!:any;
    public userId:any;
    public userRole:any;

    // public userId:any="598d968b-a7ac-4d26-87a4-ed4659e2d472";

  constructor(private http:HttpClient ,private sharedServices:SharedService) { 
    console.log(environment.production);
    // console.log(contextPaths.appraisal);

    // this.userData=this.sharedServices?.getUserData();
    // if(this.userData){
    //   this.userId=this.userData?.id;
    // }

              
    this.userId  = sessionStorage.getItem('userData');
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userId);

    
  }

  getUserId(){
    return this.userId;
  }

  getUserRole(){
    return this.userRole;
  }

  ngOnInit(): void {
   
  }

  getAppraisalCards(currentPage:any,pageSize:any): Observable<any>{
    const url= `${urls.getAppraisalcards}?pageNo=${currentPage}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     // 'userId':this.userId
      'userId':this.userId
    });

    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  checkVinNumber(vin:any){
    // const url=`https://services-test.keyassure.live/appraisal/checkVehicleAvailable?vin=${vin}`;
    const url=`${urls.checkVinNumberAvailable}?vin=${vin}`;
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });

    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  // getVehicleInfo(vin:any){
  //   const params = new HttpParams().set('vin',vin)
  //   // const getVehicleInfo_url=`https://services-test.keyassure.live/appraisal/getvehicleinfo?${params.toString()}`;
  //   const getVehicleInfo_url=`${urls.vinNumber}?${params.toString()}`;

  //   return this.http.post(getVehicleInfo_url,null);
  // }

  getDropdowns(){

    
   const dropDowns_url=`${urls.dropDowns}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });

    const options = {headers:headers};
    return this.http.post(dropDowns_url,null,options);
  }

  
  getFilteredAppraisalCards(currentPage: any, pageSize: any,object:any){
    let params = new HttpParams();
    params = params.append('pageNo', String(currentPage)); // Using append for the first parameter
    params = params.append('pageSize', String(pageSize));
    // const url = `https://services-test.keyassure.live/appraisal/appraisalfilter?${params.toString()}`
    const url = `${urls.appraisalFilter}?${params.toString()}`

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });
 
    const options = {headers:headers};

    return this.http.post(url,object,options)
  }

  getDropdownsForAppraisalFilter(filterObject:any){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });

    const options = {headers:headers};

    const module:string = 'appraisal';
    console.log(module);
    const params = new HttpParams().set('module', module)
    // const url = `https://services-test.keyassure.live/configcodes/getAllFilterParams?${params.toString()}`
    const url = `${urls.filterDropDown}?${params.toString()}`
    return this.http.post(url,filterObject,options);
  }

  uploadImageInDb(file:File){
    //const url = "https://services-test.keyassure.live/appraisal/uploadImage";
    const url = `${urls.uploadImage}`

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url,file);
  }

  uploadVideoInDb(file:File){
    //const url = "https://services-test.keyassure.live/appraisal/uploadVideo";
    const url = `${urls.uploadVideo}`;

    const formData = new FormData();
    formData.append('file',file);
    return this.http.post(url,formData);
  }

  createNewApprisal(object:any){
   
    // const url ="https://services-test.keyassure.live/appraisal/addAppraiseVehicle";
    const url =`${urls.addAppraisalVehicles}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,object,options);
  }

  fetchAccessToken(){
    //const url="https://services-test.keyassure.live/appraisal/getAccessToken";
    const url=`${urls.fetchAccessToken}`;
    return this.http.post(url,null)

  }

  deleteApparaisal(id:any){
    const params = new HttpParams().set('apprRef',id);
    //const deleteAppraisal_url=`https://services-test.keyassure.live/appraisal/deleteAppraisal?${params.toString()}`;
    const deleteAppraisal_url=`${urls.deleteAppraisal}?${params.toString()}`;
    return this.http.post(deleteAppraisal_url,null);
  }

  // printAppraisal(id:any){
  //   const params:HttpParams = new HttpParams().set('apprId',id);
  //   //const printApprisal_url = `https://services-test.keyassure.live/appraisal/apprFormPdf?${params.toString()}`;
  //   const printApprisal_url = `${urls.printAppraisal}?${params.toString()}`;
  //   return this.http.get(printApprisal_url,{ responseType: 'blob' });
  // }

  draftAppraisal(object:any){
    //const url = "https://services-test.keyassure.live/appraisal/draftApprVeh";
    const url = `${urls.draftApprVeh}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,object,options);
  }
  updateDraftAppraisal(object:any , apprid:any){
    // const url = "https://services-test.keyassure.live/appraisal/updateAppraiseVehicle";
    const url = `${urls.updateDraftAppraisalVehicle}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id':apprid
    });
    const options = {headers:headers};

    return this.http.post(url,object,options)
} 

  updateExistingAppraisal(object:any , apprid:any){
      // const url = "https://services-test.keyassure.live/appraisal/updateAppraiseVehicle";
      const url = `${urls.updateAppraiseVehicle}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'id':apprid
      });
      const options = {headers:headers};

      return this.http.post(url,object,options)
  } 

  getAppraisalShowToUi(apprId:number){
    // const url="https://services-test.keyassure.live/appraisal/showToUi";
    const url=`${urls.showToUi}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'AppraisalId':apprId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  
  moveToInventory(apprId:any){

    const params:HttpParams = new HttpParams().set('apprRef',apprId);
    // const moveToInv_url = `https://services-test.keyassure.live/appraisal/moveToInventory?${params.toString}`;
    const moveToInv_url = `${urls.moveToInventory}?${params.toString()}`;
    
  
    return this.http.post(moveToInv_url,null);
  }

}
