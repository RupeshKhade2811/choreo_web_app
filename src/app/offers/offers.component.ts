import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MakeOfferSelect } from '../inventory/inventory.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import urls from 'src/properties';
import { AppAbility } from '../services/AppAbility';
import { Observable, Subscription } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, AfterViewInit {
onScrollDownOffers() {
  
  if (this.selectedTab === 'Trade Buy' && this.internalSelectedTab === 'Factory Offers') {
    this.factoryOfferCurrentPage++;
    if (this.factoryOfferCurrentPage <= this.factoryOfferTotalPage) {

      this.offersService.getFactoryOfferCards(this.factoryOfferCurrentPage, this.factoryOfferPageSize).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.isLoading = false;

            this.factoryOfferCards = this.factoryOfferCards.concat(response.cards);

          }

        },
        (error): any => {
          this.isLoading = false;
          console.error('Error:', error);
        }
      )

    }
  }

}
onScrollDownTrades() {
  
  if (this.selectedTab === 'Trade Buy' && this.internalSelectedTab === 'Available Trades') {
    this.availableTradeCurrentPage++;
    if (this.availableTradeCurrentPage <= this.availableTradeTotalPage) {

      this.offersService.getAvailableTradeCards(this.availableTradeCurrentPage, this.availableTradePageSize).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.isLoading = false;

            this.availableTradeCards = this.availableTradeCards.concat(response.cards);

          }

        },
        (error): any => {
          this.isLoading = false;
          console.error('Error:', error);
        }
      )

    }
  }

}
onScrollDownLiquidation() {

  
  if (this.selectedTab === 'Liquidation') {
    this.liquidationCurrentPage++;
    if (this.liquidationCurrentPage <= this.liquidationTotalPage) {

      this.offersService.getLiquidationCards(this.liquidationCurrentPage, this.liquidationPageSize).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.isLoading = false;

            this.liquidationCards = this.liquidationCards.concat(response.cards);

          }

        },
        (error): any => {
          this.isLoading = false;
          console.error('Error:', error);
        }
      )

    }
  }
}
onScrollDownProcurement() {

  
  if (this.selectedTab === 'Procurement') {
    this.procurementCurrentPage++;
    if (this.procurementCurrentPage <= this.procurementTotalPage) {

      this.offersService.getProcurementsCards(this.procurementCurrentPage, this.procurementPageSize).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.isLoading = false;

            this.procuremetCards = this.procuremetCards.concat(response.cards);

          }

        },
        (error): any => {
          this.isLoading = false;
          console.error('Error:', error);
        }
      )

    }
  }
}

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public procuremetCards: any = [];
  public liquidationCards: any = [];
  public availableTradeCards: any = [];
  public factoryOfferCards: any = [];
  public liqObject: any;
  public showparent: boolean = true;
  selectedTabIndex = 0;
  selectedTradeBuyIndex = 0;
  private subscription:Subscription

  isLoading = false;

  // public baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
scrollDistance: number=2;
scrollDistanceup: number=1;
throttle: number=8;
  constructor(private communicationService:CommunicationService,abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private offersService: OffersService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { 
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    });
    this.subscription= this.communicationService.appraisalCreated$.subscribe((data)=>{
      console.log(data);
      this.showparent=true;
      if(data.comp==='liquidation'){
        this.gotoLiquidationQuotePage(data.offerId,data.apprId)
      }else if(data.comp==='factoryTrade'){
        this.gotoFactoryOffersQuotePage(data.offerId,data.apprId);
      }
    });
  }


  ngAfterViewInit(): void {
    // console.log(this.tabGroup);

    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.selectedTabIndex; // Set the index you want to open
    }
  }

 

  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'recipe'
        if (this.router.url === '/offers') {
          this.showparent = true;
          this.procurementScroll = true;
          this.liquidationScroll = true;
          this.availableTradeScroll = true;
          this.factoryOfferScroll = true;
        }
      }
    });
  }

  goToProcurementViewVehicle(id: number) {
    this.procurementScroll = false;
    this.router.navigate(['procurement/viewVehicle'], { state: { id: id, comp: 'procurement' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 0;
    // console.log(this.selectedTab);

  }

  goToLiquidationViewVehicle(appRefId: number,offerId:any ) {
    this.liquidationScroll = false;
    this.router.navigate(['liquidation/viewVehicle'], { state: { id: appRefId, offerId:offerId,comp: 'liquidation' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 1;
    // console.log(this.selectedTab);
  }

  goToTraidFactViewVehicle(appRefId: number,offerId:any) {
    this.factoryOfferScroll = false;
    this.router.navigate(['trade/factoryOffers/viewVehicle'], { state: { id: appRefId, offerId:offerId, comp: 'factoryTrade'}, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 2;
    this.selectedTradeBuyIndex = 1;
  }

  goToTraidAvailableViewVehicle(availableTradeCard: any) {
    this.availableTradeScroll = false;
    this.factoryOfferScroll = false;
    this.router.navigate(['trade/availableTrade/viewVehicle'], { state: { id: availableTradeCard.id, isOfferMade:availableTradeCard.isOfferMade, comp: 'availableTrade' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 2;
    this.selectedTradeBuyIndex = 0;
  }

  gotoProcuremntQuotePage(id: any) {
    this.procurementScroll = false;
    this.router.navigate(['procurement/quote'], { state: { offerId: id, comp: 'procurement' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 0;
  }

  gotoLiquidationQuotePage(id: any, apprId: any) {
    this.liquidationScroll = false;
    // console.log(apprId);
    this.router.navigate(['liquidation/quote'], { state: { offerId: id, comp: 'liquidation', apprId: apprId }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 1;
  }

  gotoAvailableTradeQuotePage(id: any) {
    this.availableTradeScroll = false;
    // console.log(id + " " + 'offerId');
    this.router.navigate(['trade/availableTrade/quote'], { state: { offerId: id, comp: 'availableTrade' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 2;
    this.selectedTradeBuyIndex = 0;
  }

  gotoFactoryOffersQuotePage(id: any, apprId: any) {
    this.factoryOfferScroll = false;
    // console.log(id + " " + 'offerId');

    this.router.navigate(['trade/factoryOffers/quote'], { state: { offerId: id, comp: 'factoryOffers', apprId: apprId }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 2;
    this.selectedTradeBuyIndex = 1;
  }

  ngOnInit(): void {

    this.isLoading = true;

    if (this.selectedTab = 'Procurement') {
      // console.log(this.selectedTab);

      
    }

    this.offersService.getProcurementsCards(this.procurementCurrentPage, this.procurementPageSize).subscribe({next:(response: any) => {
      if (response.code === 200) {
        this.isLoading = false;
      }
      const returnObject = response;
      this.procuremetCards = response.cards;
      this.procurementTotalPage = response.totalPages;
      
      // console.log(this.procuremetCards);
    },
    error:(error =>{
      this.isLoading = false;
      console.log(error);
    })
  });

    this.offersService.getLiquidationCards(this.liquidationCurrentPage, this.liquidationPageSize).subscribe((response: any) => {
      this.liqObject = response;
      // console.log(this.liqObject);

      this.liquidationCards = response.cards;
      this.liquidationTotalPage = response.totalPages;
      // console.log(this.liquidationCards);
    });

    this.offersService.getAvailableTradeCards(this.availableTradeCurrentPage, this.availableTradePageSize).subscribe((response: any) => {
      const returnObject: any = response;
      this.availableTradeCards = response.cards;
      this.availableTradeTotalPage = response.totalPages;
    });

    this.offersService.getFactoryOfferCards(this.factoryOfferCurrentPage, this.factoryOfferPageSize).subscribe((response: any) => {
      const returnObject: any = response;
      this.factoryOfferCards = response.cards;
      this.factoryOfferTotalPage = response.totalPages;
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  
  }

  openMakeOfferDialog(srchFtryCard: any): void {
    const dialogRef = this.dialog.open(MakeOfferSelect, {
      height:'200px',
      width:'450px',
      data: {
        appraisalId: srchFtryCard.id
      }
    });
  }

  public selectedTab = ''
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // console.log('tabChangeEvent => ', tabChangeEvent.tab.textLabel);
    // console.log('index => ', tabChangeEvent.index);
    // this.currentPage=0;
    this.selectedTab = tabChangeEvent.tab.textLabel;
    // console.log(this.selectedTab);
    // if (this.selectedTab === 'Procurement') {
    //   // console.log(this.selectedTab);
     
    // }
    // else if (this.selectedTab === 'Liquidation') {
    //   // console.log(this.selectedTab);
 
    // }
    // else if (this.selectedTab === 'Trade Buy' && this.internalSelectedTab === 'Available Trades') {
    //   // console.log(this.selectedTab);
      
    // }
    // else if (this.selectedTab === 'Trade Buy' && this.internalSelectedTab === 'Factory Offers') {
    //   // console.log(this.selectedTab);
  
    // }
  }

  public internalSelectedTab = 'Available Trades'
  internalTabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.internalSelectedTab = tabChangeEvent.tab.textLabel;
    // if (this.internalSelectedTab === 'Available Trades') {
    //   // console.log(this.selectedTab);
    //   window.removeEventListener('scroll', this.loadProcurementItems, true);
    //   window.removeEventListener('scroll', this.loadLiquidationItems, true);
    //   window.removeEventListener('scroll', this.loadFactoryOfferItems, true);
    //   window.addEventListener('scroll', this.loadAvailableTradeItems, true);
    // }
    // else if (this.internalSelectedTab === 'Factory Offers') {
    //   // console.log(this.selectedTab);
    //   window.removeEventListener('scroll', this.loadProcurementItems, true);
    //   window.removeEventListener('scroll', this.loadLiquidationItems, true);
    //   window.removeEventListener('scroll', this.loadAvailableTradeItems, true);
    //   window.addEventListener('scroll', this.loadFactoryOfferItems, true);
    // }
  }
  public procurementCurrentPage = 0;
  public procurementPageSize = 8;
  public liquidationCurrentPage = 0;
  public liquidationPageSize = 8;
  public availableTradeCurrentPage = 0;
  public availableTradePageSize = 8;
  public factoryOfferCurrentPage = 0;
  public factoryOfferPageSize = 8;
  public procurementScroll = true;
  public liquidationScroll = true;
  public availableTradeScroll = true;
  public factoryOfferScroll = true;
  public procurementTotalPage: any;
  public liquidationTotalPage: any;
  public availableTradeTotalPage: any;
  public factoryOfferTotalPage: any;
  loadProcurementItems = (event: any) => {
    const scrollEnd = document.documentElement.clientHeight + window.scrollY + 1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
    if (scrollEnd) {
      if (this.procurementScroll) {
        this.procurementCurrentPage = this.procurementCurrentPage + 1;
        if (this.procurementCurrentPage <= this.procurementTotalPage) {
          this.offersService.getProcurementsCards(this.procurementCurrentPage, this.procurementPageSize).subscribe(
            (response: any): any => {
              this.procuremetCards = [...this.procuremetCards, ...response.cards];
              // console.log(this.procuremetCards);
            },
            (error): any => {
              // console.error('Error:', error);
            }
          )
        }

      }
    }
  }
  loadLiquidationItems = (event: any) => {
    const scrollEnd = document.documentElement.clientHeight + window.scrollY + 1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
    if (scrollEnd) {
      if (this.liquidationScroll) {
        this.liquidationCurrentPage = this.liquidationCurrentPage + 1;
        if (this.liquidationCurrentPage <= this.liquidationTotalPage) {
          this.offersService.getLiquidationCards(this.liquidationCurrentPage, this.liquidationPageSize).subscribe(
            (response: any): any => {
              this.liquidationCards = [...this.liquidationCards, ...response.cards];
              // console.log(this.liquidationCards);

            },
            (error): any => {
              // console.error('Error:', error);
            }
          )
        }

      }
    }
  }

  loadAvailableTradeItems = (event: any) => {
    const scrollEnd = document.documentElement.clientHeight + window.scrollY + 1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
    if (scrollEnd) {
      if (this.availableTradeScroll) {
        this.availableTradeCurrentPage = this.availableTradeCurrentPage + 1;
        if (this.availableTradeCurrentPage <= this.availableTradeTotalPage) {
          this.offersService.getAvailableTradeCards(this.availableTradeCurrentPage, this.availableTradePageSize).subscribe(
            (response: any): any => {
              this.availableTradeCards = [...this.availableTradeCards, ...response.cards];
              // console.log(this.availableTradeCards);
            },
            (error): any => {
              // console.error('Error:', error);
            }
          )
        }
      }
    }
  }
  loadFactoryOfferItems = (event: any) => {
    const scrollEnd = document.documentElement.clientHeight + window.scrollY + 1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
    if (scrollEnd) {
      if (this.factoryOfferScroll) {
        this.factoryOfferCurrentPage = this.factoryOfferCurrentPage + 1;
        if (this.factoryOfferCurrentPage <= this.factoryOfferTotalPage) {
          this.offersService.getFactoryOfferCards(this.factoryOfferCurrentPage, this.factoryOfferPageSize).subscribe(
            (response: any): any => {
              this.factoryOfferCards = [...this.factoryOfferCards, ...response.cards];
              // console.log(this.factoryOfferCards);

            },
            (error): any => {
              // console.error('Error:', error);
            }
          )
        }

      }
    }
  }
} 
