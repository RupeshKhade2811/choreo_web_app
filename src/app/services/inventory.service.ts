import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import urls from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // public userData!:any
  // public userId:any;
  // public userId: any = "598d968b-a7ac-4d26-87a4-ed4659e2d472";
  // constructor(private http: HttpClient, private sharedServices: SharedService) {
  public userData!:any
  public userId:any;
  // public userId:any="598d968b-a7ac-4d26-87a4-ed4659e2d472";
  constructor(private http:HttpClient, private sharedServices:SharedService) { 
    // this.userData=this.sharedServices.userData;
    // if(this.userData){
    //   this.userId=this.userData.id;
    // }
    // console.log(this.userData);
    
    const userID= sessionStorage.getItem('userData');
    this.userId=userID;
    console.log(userID);
  }


  //public url= "https://services-test.keyassure.live/inventory/getInventoryCards?pageNumber=0&pageSize=12"
  //public searchFactoryUrl = "https://services-test.keyassure.live/inventory/getSearchFactory?pageNumber=0&pageSize=12"

  getInventoryCards(currentPage: any, pageSize: any): Observable<any> {
    // const url = `https://services-test.keyassure.live/inventory/getInventoryCards?pageNumber=${currentPage}&pageSize=${pageSize}`
    const url = `${urls.getInventoryCards}?pageNumber=${currentPage}&pageSize=${pageSize}`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });
    const options = { headers: headers };
    return this.http.post(url, null, options);
  }


  getSearchFtryCards(currentPage: any, pageSize: any): Observable<any> {
    // const searchFactoryUrl = `https://services-test.keyassure.live/inventory/getSearchFactory?pageNumber=${currentPage}&pageSize=${pageSize}`
    const searchFactoryUrl = `${urls.getSearchFactory}?pageNumber=${currentPage}&pageSize=${pageSize}`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Id': this.userId
    });
    const options = { headers: headers };
    return this.http.post(searchFactoryUrl, null, options);
  }

  getMoveToWishList(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });
    const options = { headers: headers };
    const params: HttpParams = new HttpParams().set('apprRef', id);
    // const moveToWishListUrl = `https://services-test.keyassure.live/appraisal/moveToWishList?${params.toString()}`;
    const moveToWishListUrl = `${urls.moveToWishList}?${params.toString()}`;
    return this.http.post(moveToWishListUrl, null, options);
  }

  removeFromFav(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });
    const options = { headers: headers };
    const params: HttpParams = new HttpParams().set('apprId', id);
    // const moveToWishListUrl = `https://services-test.keyassure.live/appraisal/removeFavorite?${params.toString()}`;
    const moveToWishListUrl = `${urls.removeFavorite}?${params.toString()}`;
    return this.http.post(moveToWishListUrl, null, options);
  }

  carBuyByBuyer(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'buyerUser_id': this.userId,
      
    });
    const options = { headers: headers };
    const params: HttpParams = new HttpParams().set('appr_id', id);
    // const makeOfferUrl = "https://services-test.keyassure.live/offers/makeOffer";
    const buycarUrl = `${urls.buyCar}?${params.toString()}`;
    return this.http.post(buycarUrl,null,options);
  }

  // soldRetailOn(id: any) {
  //   console.log(id);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const soldRetailOnUrl = `https://services-test.keyassure.live/inventory/soldRetailOn`;
  //   const soldRetailOnUrl = `${urls.inventorySoldRetailOn}`;
  //   return this.http.post(soldRetailOnUrl, null, options);
  // }

  // removeSoldRetail(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const soldRetailOffUrl = `https://services-test.keyassure.live/inventory/soldRetailOff`;
  //   const soldRetailOffUrl = `${urls.inventorySoldRetailOff}`;
  //   return this.http.post(soldRetailOffUrl, null, options);
  // }

  // wholeSaleOff(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const soldWholeOnUrl = `https://services-test.keyassure.live/inventory/soldWholesaleOff`;
  //   const soldWholeOnUrl = `${urls.inventorySoldWholesaleOff}`;
  //   return this.http.post(soldWholeOnUrl, null, options);
  // }

  // wholeSaleOn(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const soldWholeOnUrl = `https://services-test.keyassure.live/inventory/soldWholesaleOn`;
  //   const soldWholeOnUrl = `${urls.inventorySoldWholesaleOn}`;
  //   return this.http.post(soldWholeOnUrl, null, options);
  // }

  // holdOn(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const holdOnUrl = `https://services-test.keyassure.live/inventory/holdvehicle`;
  //   const holdOnUrl = `${urls.inventoryHoldVehicle}`;
  //   return this.http.post(holdOnUrl, null, options);
  // }

  // removeHoldUnit(id: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'apprRef': id
  //   });
  //   const options = { headers: headers };
  //   // const holdOffUrl = `https://services-test.keyassure.live/inventory/unholdvehicle`;
  //   const holdOffUrl = `${urls.inventoryUnholdVehicle}`;
  //   return this.http.post(holdOffUrl, null, options);
  // }

  getDropDownsForInventoryFilter(filterObject: any, tabModule: any) {
    console.log(tabModule);
    
    let module: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });
    const options = { headers: headers };
    if (tabModule === 'Inventory') {
      module = 'inventory';
    } else if (tabModule === 'Search Factory') {
      module = 'SearchTheFactory';
    }
    console.log(module);
    
    //const module:string = 'inventory';
    const params = new HttpParams().set('module', module)
    // const url = `https://services-test.keyassure.live/configcodes/getAllFilterParams?${params.toString()}`
    const url = `${urls.filterDropDown}?${params.toString()}`
    return this.http.post(url, filterObject, options);
  }

  getFilteredInvCards(currentPage: any, pageSize: any, object: any) {

    let params = new HttpParams();

    params = params.append('pageNo', String(currentPage)); // Using append for the first parameter
    params = params.append('pageSize', String(pageSize));
    // const url = `https://services-test.keyassure.live/appraisal/inventoryfilter?${params.toString()}`
    const url = `${urls.inventoryFilter}?${params.toString()}`

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });

    const options = { headers: headers };

    return this.http.post(url, object, options)
  }

  getFilteredSearchCards(currentPage: any, pageSize: any, object: any) {

    let params = new HttpParams();

    params = params.append('pageNo', String(currentPage)); // Using append for the first parameter
    params = params.append('pageSize', String(pageSize));
    // const url = `https://services-test.keyassure.live/appraisal/searchfactoryfilter?${params.toString()}`
    const url = `${urls.searchFactoryFilter}?${params.toString()}`

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId
    });

    const options = { headers: headers };

    return this.http.post(url, object, options)
  }


}
