import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MakeOfferSelect } from '../inventory/inventory.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import urls from 'src/properties';

import { AppAbility } from '../services/AppAbility';
import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';

interface Card {
  id: number;
  vehicleMake: string;
  vehicleModel: string;
  appraisedValue: number | null;
  createdBy: string;
  vehicleYear: number;
  vehicleMileage: number;
  vehicleSeries: string;
  offerStatus: string | null;
  isVehicleFav: boolean | null;
  createdOn: string;
  modifiedOn: string;
  apprRef: string | null;
  offerId: number | null;
  color: string | null;
  statusCodeId: string | null;
  soldSts: string | null;
  vehiclePic1: string;
  vinNumber: string;
  style: string | null;
  invntrySts: string;
  isHold: boolean;
  field1: boolean;
  field2: boolean;
  isOfferMade: boolean;
  titleSts: {
    id: number;
    longCode: string;
    shortCode: string;
    shortDescrip: string;
    longDescrip: string | null;
    codeType: string;
    configGroup: string;
    intValue: number | null;
  };
  status: string | null;
  isSold: boolean;
  shipmentId: number | null;
  buyerAgreed: boolean | null;
  sellerAgreed: boolean | null;
  role: {
    id: number;
    role: string;
    roleDesc: string;
    roleGroup: string;
  };

  isPrivateParty: boolean | null;
  dealerReserve: number | null;
  dsName: string | null;
}

interface StatusInfo {
  buyerStatus: string;
  sellerStatus: string;
  offerStatus: string;
  color: number;
  statusCode: string;
  status: string;
}

interface Quote {
  appraisedValue: number;
  status: string;
  buyerQuote: number;
  sellerQuote: number | null;
}

interface Offer {
  code: number;
  message: string;
  status: boolean;
  fileName: string | null;
  apprId: number | null;
  totalVehicles: number | null;
  userId: number | null;
  card: Card;
  statusInfo: StatusInfo;
  quotesList: Quote[];
  offerId: number;
  buyFee: string;
  saleFee: string;
}

export interface List {
  buyerQuote: number;
  sellerQuote: number;
  status: string
}

const LIST_DATA: List[] = [
  {
    buyerQuote: 2000,
    sellerQuote: 10000,
    status: 'offer made'
  },
  {
    buyerQuote: 1000,
    sellerQuote: 10440,
    status: 'offer not made'
  }
]

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css']
})
export class QuotePageComponent implements OnInit {
  // baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;
  
  //For Procurement
  public panelOpenState = false;
  public displayedColumns: string[] = ['buyerQuote', 'sellerQuote', 'status', 'expectedValue'];
  public bidderDisplayColumns:string[]=['bidder', 'name']
  public expectedValue: number = 0;
  
  // dataSource= LIST_DATA;
  public dataSource: any;
  public cardInfo: any;
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;


  public constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private offersService: OffersService, public dialog: MatDialog,private snackBar: MatSnackBar) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
  }
  //global variables
  public comp: any;
  public offerId: any;
  public biddersList:any;
  public apprId:any;
  //method starting..

  buyerAccepted(id: any) {
    this.offersService.buyerAcceptedFromProcurement(id).subscribe((response: any) => {
      console.log(response.message);
      if(response.code===200){
        if(this.comp==='procurement'){
          this.getQuoteDataForProcurement();
        }
        if(this.comp==='availableTrade'){
          this.getQuoteDataForAvailableTrades();
        }
      }
      this.openSnackBar("Offer Accepted",'close');
    });
  }

  buyerRejected(id: any) {
    this.offersService.buyerRejectedFromProcurement(id).subscribe((response: any) => {
      console.log(response.message);
      if(response.code===200){
        if(this.comp==='procurement'){
          this.getQuoteDataForProcurement();
        }
        if(this.comp==='availableTrade'){
          this.getQuoteDataForAvailableTrades();
        }
      }
      this.openSnackBar("Offer Rejected",'close');
    });
  }

  sellerAccepted(id: any) {
    this.offersService.sellerAcceptedFromLiquidation(id).subscribe((response: any) => {
      console.log(response.message);
      if(response.code===200){
        if(this.comp==='liquidation'){
          this.getQuoteDataForLiquidation();
        }
        if(this.comp==='factoryOffers'){
          this.getQuoteDataForFactoryOffers();
        }
      }
      this.openSnackBar("Offer Accepted",'close');
    });
  }

  sellerRejected(id: any) {
    this.offersService.buyerRejectedFromProcurement(id).subscribe((response: any) => {
      console.log(response.message);
      if(response.code===200){
        if(this.comp==='liquidation'){
          this.getQuoteDataForLiquidation();
        }
        if(this.comp==='factoryOffers'){
          this.getQuoteDataForFactoryOffers();
        }
      }
      this.openSnackBar("Offer Rejected",'close');
    });
  }

  openDialog(cardInfo: any, comp: any) {
    console.log(comp);
    const dialogRef = this.dialog.open(MakeOffer, {
      data: {
        offerId: cardInfo,
        compName: comp
      },
      disableClose:true
    });
    dialogRef.componentInstance.dataEvent.subscribe((result:any)=>{
      if (this.comp === 'procurement') { 
      if(result ===200){
        alert('entered inside')
        this.getQuoteDataForProcurement()
      }
    }
    if (this.comp === 'liquidation') { 
      if(result ===200){
        alert('entered inside')
        this.getQuoteDataForLiquidation()
      }
    }
    if (this.comp === 'availableTrade') { 
      if(result ===200){
        alert('entered inside')
        this.getQuoteDataForAvailableTrades()
      }
    }
    if (this.comp === 'factoryOffers') { 
      if(result ===200){
        alert('entered inside')
        this.getQuoteDataForFactoryOffers()
      }
    }
    });
   
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  changeTheData(row:any){
    console.log(row);
    console.log(this.selectedRow);
    this.selectedRow = row;
    let offerId = row.offerId;
    this.offerId=offerId;
    if(this.selectedRow)
    this.getQuoteDataForLiquidation();
  }

  selectedRow:any;
  clickedRows= new Set<any>();

  getQuoteDataForProcurement(){
    this.offersService.getProcurementCardInfo(this.offerId).subscribe((response: any) => {
      this.cardInfo = response;
      this.dataSource = this.cardInfo.quotesList;
      console.log(this.dataSource);
      
      const buyFee = +this.cardInfo.buyFee;
      console.log(buyFee);
    
      

      if (this.dataSource[0].buyerQuote == null) {
        this.expectedValue = (this.dataSource[0].sellerQuote + buyFee);
        console.log(this.dataSource[0].sellerQuote);
        
      } else if (this.dataSource[0].sellerQuote == null) {
        this.expectedValue = this.dataSource[0].buyerQuote + buyFee;
        console.log(this.expectedValue);
      } else if (this.dataSource[0].buyerQuote > this.dataSource[0].sellerQuote) {
        this.expectedValue = this.dataSource[0].buyerQuote + buyFee;
      } else { this.expectedValue = this.dataSource[0].sellerQuote + buyFee }

      console.log((this.expectedValue));
      console.log(this.dataSource);
      console.log(this.cardInfo);
    })
  }
  getQuoteDataForLiquidation(){
    this.offersService.getLiquidationCardInfo(this.offerId).subscribe((response:any)=>{
      this.cardInfo= response;
      this.dataSource=response.quotesList;
      this.expectedValue=response.card.appraisedValue+(+response.buyFee);
      console.log(this.cardInfo);
      console.log(this.expectedValue);
    });

    this.offersService.getBiddersListForLiquidation(this.apprId).subscribe((response:any)=>{
      console.log(response);
      this.biddersList=response.offersCards;
      this.biddersList.map((item:any)=>{
        if(item.offerId===this.offerId){
          this.selectedRow=item;
        }
      })
      // console.log(this.biddersList);
      // this.selectedRow=this.biddersList[0];
    })

  }



  getQuoteDataForFactoryOffers(){
    this.offersService.getFactoryOffersCardInfo(this.offerId).subscribe((response:any)=>{
      this.cardInfo= response;
      this.dataSource=response.quotesList;
      this.expectedValue=response.card.appraisedValue+(+response.buyFee);
      console.log(this.cardInfo);
      console.log(this.dataSource);
    });

    this.offersService.getBiddersListForLiquidation(this.apprId).subscribe((response:any)=>{
      console.log(response);
      this.biddersList=response.offersCards;
      this.biddersList.map((item:any)=>{
        if(item.offerId===this.offerId){
          this.selectedRow=item;
        }
      });
      // console.log(this.biddersList);
      // this.selectedRow=this.biddersList[0];
    })
  }
  getQuoteDataForAvailableTrades(){
    this.offersService.getAvailableTradeCardInfo(this.offerId).subscribe((response:any)=>{
      this.cardInfo= response;
      this.dataSource=response.quotesList;
      console.log(this.cardInfo);
      console.log(this.dataSource);
      const buyFee = +this.cardInfo.buyFee;
      console.log(buyFee);
    
      

      if (this.dataSource[0].buyerQuote == null) {
        this.expectedValue = (this.dataSource[0].sellerQuote + buyFee);
        console.log(this.dataSource[0].sellerQuote);
        
      } else if (this.dataSource[0].sellerQuote == null) {
        this.expectedValue = this.dataSource[0].buyerQuote + buyFee;
        console.log(this.expectedValue);
      } else if (this.dataSource[0].buyerQuote > this.dataSource[0].sellerQuote) {
        this.expectedValue = this.dataSource[0].buyerQuote + buyFee;
      } else { this.expectedValue = this.dataSource[0].sellerQuote + buyFee }
    });
  }



  ngOnInit(): void {

    let stateObject: any = history.state;
    this.offerId = stateObject.offerId;
    this.comp = stateObject.comp;
    this.apprId=stateObject.apprId;
    console.log(this.apprId);
    
    console.log(this.comp);

    if (this.comp === 'procurement') {
     this.getQuoteDataForProcurement();
    };

    if(this.comp ==='liquidation'){
      this.getQuoteDataForLiquidation();
    };
    
    if(this.comp==='availableTrade'){
      this.getQuoteDataForAvailableTrades();
    };

    if(this.comp==='factoryOffers'){
      this.getQuoteDataForFactoryOffers();
    }
  }
}

@Component({
  selector: 'MakeOffer',
  templateUrl: 'MakeOfferFromOffersPage.html'
})
export class MakeOffer {
  dataEvent:EventEmitter<any> = new EventEmitter<any>();
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,
    private snackBar: MatSnackBar,
    private fb:FormBuilder,
    private offersService:OffersService,
    public dialogRef: MatDialogRef<MakeOfferSelect>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    
  ) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
  }

  public offerAmount:number | undefined;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }
  
  closeDialog(result:any){
    console.log(result);
    
    this.dialogRef.close(result);
    //console.log(this.offerAmount);
  }

  ngOnInit(): void {
    console.log('dialog');
    
  }
  
  submitBuyerQuote(id:any ,amount:any){
    alert("ok")
    const BuyerQuote={
      buyerQuote:amount
    }

    console.log(BuyerQuote);
    console.log(id);
    
    
    this.offersService.buyerQuote(id,BuyerQuote).subscribe((response:any)=>{
      console.log(response);
      
      if(response.code===200){
        this.dataEvent.emit(response.code);
        this.dialogRef.close();
      }
      this.openSnackBar(response.message, 'Close');
    })

  }

  submitSellerQuote(id:any, amount:any){
    const SellerQuote={
      sellerQuote:amount
    }
    console.log(SellerQuote);
    console.log(id);
    
    this.offersService.sellerQuote(id,SellerQuote).subscribe((response:any)=>{
      console.log(response);
      
      if(response.code===200){
        this.dataEvent.emit(response.code);
        this.dialogRef.close();
      }
      this.openSnackBar(response.message, 'Close')
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  quote = this.fb.group({
    buyerQuote:[null,Validators.required],
    sellerQuote:[null,Validators.required]
  })

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

