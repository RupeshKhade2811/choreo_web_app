import { Component, HostListener, Inject, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ShipmentService } from '../services/shipment.service';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import urls from 'src/properties';



import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit, AfterViewInit {
scrollDistanceup: number=1;
  onScrollDownMySales() {

    if (this.selectedTab === 'MY SALES') {
      this.mySaleCurrentPage++;
      if (this.mySaleCurrentPage <= this.salesTotalPage) {

        this.ShipmentService.getMySalesCards(this.mySaleCurrentPage, this.mySalePageSize).subscribe(
          (response: any) => {
            if (response.code === 200) {
              this.isLoading = false;

              this.shipmentSalesCards = this.shipmentSalesCards.concat(response.cards);

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
  onScrollDownMyPurchase() {

    if (this.selectedTab == 'MY PURCHASES') {
      this.myPurchaseCurrentPage++;
      if (this.myPurchaseCurrentPage <= this.purchaseTotalPage) {

        this.ShipmentService.getMyPurchaseCards(this.myPurchaseCurrentPage, this.myPurchasePageSize).subscribe(
          (response: any) => {
            if (response.code === 200) {
              this.isLoading = false;

              this.shipmentSalesCards = this.shipmentSalesCards.concat(response.cards);

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
  selectedTabIndex = 0;
  public showparent: boolean = true;
  // baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;
  // defaultImageUrl: string = "https://images.unsplash.com/photo-1605218403317-6caf5485d304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  isLoading = false;
 
  public able_to!: PureAbility;
  scrollDistance: number = 2;
  throttle: number = 8;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private ShipmentService: ShipmentService) {
    
  }

  ngAfterViewInit(): void {
    console.log(this.tabGroup);

    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.selectedTabIndex; // Set the index you want to open
    }
  }

  public shipmentPurchaseCards: any = []
  public shipmentSalesCards: any = [];
  public purchaseTotalPage: any;
  public salesTotalPage: any;

  ngOnInit(): void {

    this.isLoading = true;

    if (this.selectedTab = 'MY PURCHASES') {
      console.log(this.selectedTab);

    }

    this.ShipmentService.getMyPurchaseCards(this.myPurchaseCurrentPage, this.myPurchasePageSize).subscribe(
      (response: any): any => {
        if (response.code === 200) {
          this.isLoading = false;
        }
        this.shipmentPurchaseCards = response.cards;
        this.purchaseTotalPage = response.totalPages;
        console.log(this.shipmentPurchaseCards);
      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    )

    this.ShipmentService.getMySalesCards(this.mySaleCurrentPage, this.mySalePageSize).subscribe(
      (response: any): any => {
        this.shipmentSalesCards = response.cards;
        this.salesTotalPage = response.totalPages;
        console.log(this.shipmentSalesCards);
      },
      (error): any => {
        console.error('Error:', error);
      }
    )
  }

  ngOnDestroy(): void {

  }

  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'recipe'
        if (this.router.url === '/shipments') {
          this.showparent = true;
          this.myPurchaseScroll = true;
          this.mySaleScroll = true;
        }
      }
    });

  }

  goToViewVehicleMypurchase(shpmntCard: any) {
    this.myPurchaseScroll = false;
    console.log(shpmntCard.apprRef)
    this.router.navigate(['myPurchase/viewVehicle'], { state: { id: shpmntCard.id }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 0;
  }

  goToViewVehicleMysales(shpmntCard: any) {
    this.mySaleScroll = false;
    console.log(shpmntCard.apprRef)
    this.router.navigate(['mysales/viewVehicle'], { state: { id: shpmntCard.id }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 1;
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }


  

  

  

  public selectedTab = ''
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent.tab.textLabel);
    console.log('index => ', tabChangeEvent.index);
    // this.currentPage=0;
    this.selectedTab = tabChangeEvent.tab.textLabel;
    console.log(this.selectedTab);
    if (this.selectedTab === 'MY PURCHASES') {
      console.log(this.selectedTab);

    }
    else if (this.selectedTab === 'MY SALES') {
      console.log(this.selectedTab);

    }
  }
  public myPurchaseCurrentPage = 0;
  public myPurchasePageSize = 8;
  public mySaleCurrentPage = 0;
  public mySalePageSize = 8;
  public myPurchaseScroll = true;
  public mySaleScroll = true;

}






function ngOnInit(data: any, any: any) {
  throw new Error('Function not implemented.');
}




