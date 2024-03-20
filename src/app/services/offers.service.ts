import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public userId:any;
  public userRole:any;

  constructor(private http:HttpClient) { 
    this.userId =sessionStorage.getItem('userData');
    this.userRole =sessionStorage.getItem('userRole');
    console.log(this.userId);
  }

  getProcurementsCards(currentPage:any,pageSize:any){
    // const url= `https://services-test.keyassure.live/offers/getProcurementCards?pageNo=${currentPage}&pageSize=${pageSize}`;
    const url= `${urls.offersGetProcurementCards}?pageNo=${currentPage}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  };

  getLiquidationCards(currentPage:any,pageSize:any){
    // const url =`https://services-test.keyassure.live/offers/getLiqCards?pageNo=${currentPage}&pageSize=${pageSize}`;
    const url =`${urls.offersGetLiqCards}?pageNo=${currentPage}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  getAvailableTradeCards(currentPage:any,pageSize:any){
    // const url =`https://services-test.keyassure.live/tradeBuy/getAvailableTradeCards?pageNumber=${currentPage}&pageSize=${pageSize}`;
    const url =`${urls.getAvailableTradeCards}?pageNumber=${currentPage}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  getFactoryOfferCards(currentPage:any,pageSize:any){
    // const url =`https://services-test.keyassure.live/tradeBuy/getFactoryOffersCards?pageNumber=${currentPage}&pageSize=${pageSize}`;
    const url =`${urls.getFactoryOffersCards}?pageNumber=${currentPage}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id':this.userId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  getProcurementCardInfo(offerId:any){
    // const url = "https://services-test.keyassure.live/offers/getProcuCardInfo";
    const url = `${urls.offersGetProcuCardInfo}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  getLiquidationCardInfo(offerId:any){
    // const url ="https://services-test.keyassure.live/offers/showLiqCardInfo";
    const url =`${urls.offersShowLiqCardInfo}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options)
  }

  getAvailableTradeCardInfo(offerId:any){
    // const url= 'https://services-test.keyassure.live/tradeBuy/showAvailableTradeCardInfo';
    const url= `${urls.showAvailableTradeCardInfo}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options)
  }

  getFactoryOffersCardInfo(offerId:any){
    // const url= 'https://services-test.keyassure.live/tradeBuy/showFactoryOffersCardInfo';
    const url= `${urls.showFactoryOffersCardInfo}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options)
  }
 
  buyerAcceptedFromProcurement(offerId:any){
    // const url="https://services-test.keyassure.live/offers/buyerAccepted";
    const url=`${urls.offersBuyerAccepted}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  sellerAcceptedFromLiquidation(offerId:any){
    // const url="https://services-test.keyassure.live/offers/sellerAccepted";
    const url=`${urls.offersSellerAccepted}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }
  
  buyerRejectedFromProcurement(offerId:any){
    // const url="https://services-test.keyassure.live/offers/buyerRejected";
    const url=`${urls.offersBuyerRejected}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  sellerRejectedFromLiquidation(offerId:any){
    // const url="https://services-test.keyassure.live/offers/sellerRejected";
    const url=`${urls.offersSellerRejected}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  buyerQuote(offerId:any, amount:any){
    // const url = "https://services-test.keyassure.live/offers/buyerQuotes";
    const url = `${urls.offersBuyerQuotes}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,amount,options);
  }

  sellerQuote(offerId:any, amount:any){
    // const url = "https://services-test.keyassure.live/offers/sellerQuotes";
    const url = `${urls.offersSellerQuotes}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'offerId':offerId
    });
    const options = {headers:headers};
    return this.http.post(url,amount,options);
  }

  getBiddersListForLiquidation(apprId:any){
    // const url ="https://services-test.keyassure.live/offers/getOffers";
    const url =`${urls.offersGetOffers}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'appraisalId':apprId
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

}
