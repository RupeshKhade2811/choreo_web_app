import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  // public userId:any="598d968b-a7ac-4d26-87a4-ed4659e2d472";
  public userId:any;
  public userRole:any;
    constructor(private http:HttpClient) {
      this.userId =sessionStorage.getItem('userData');
      this.userRole =sessionStorage.getItem('userRole');
    }

    getMyPurchaseCards(currentPage:any,pageSize:any){
        // const url= `https://services-test.keyassure.live/shipment/getPurCarCards?pageNo=${currentPage}&pageSize=${pageSize}`;
        const url= `${urls.shipmentGetPurCarCards}?pageNo=${currentPage}&pageSize=${pageSize}`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'id':this.userId
        });
        const options = {headers:headers};
        return this.http.post(url,null,options);
      };
    
      getMySalesCards(currentPage:any,pageSize:any){
        // const url =`https://services-test.keyassure.live/shipment/getSoldCarCards?pageNo=${currentPage}&pageSize=${pageSize}`;
        const url =`${urls.shipmentGetSoldCarCards}?pageNo=${currentPage}&pageSize=${pageSize}`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'id':this.userId
        });
        const options = {headers:headers};
        return this.http.post(url,null,options);
      }

      mailAttach(offerId:any, mailId:any){        
        const params:HttpParams = new HttpParams().set('offerId',offerId).set('mailId', mailId);
        // const url=`https://services-test.keyassure.live/shipment/mailAttach?${params.toString()}`;
        const url=`http://localhost:8082/shipment/attachDocsInMail?${params.toString()}`
        return this.http.post(url,null);
      }

      // buyerAgreed(shipmentId:any, obj:any){
      //   console.log(JSON.stringify(obj))
      //   const headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'shipmentId': shipmentId
      //   });
      //   const options = {headers:headers};
      //   // const url=`https://services-test.keyassure.live/shipment/buyerAgreed`;
      //   const url=`${urls.buyerAgreedSign}`;
      //   return this.http.post(url,obj,options);
      // }

      // sellerAgreed(shipmentId:any, obj:any){
      //   console.log(JSON.stringify(obj))
      //   const headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'shipmentId': shipmentId
      //   });
      //   const options = {headers:headers};    
      //   // const url=`https://services-test.keyassure.live/shipment/sellerAgreed`;
      //   const url=`${urls.sellerAgreedSign}`;
      //   return this.http.post(url,obj,options);
      // }

      // getPdfs(id:any){
      //   const headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'offerId':id
      //   });
      //   const options = {headers:headers};
      //   // const pdfUrl=`https://services-test.keyassure.live/shipment/pdf`;
      //   const pdfUrl=`${urls.getPdfList}`;
      //   return this.http.post(pdfUrl,null,options);
      // }

}    