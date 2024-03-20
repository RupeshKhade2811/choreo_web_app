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


import { AppAbility } from '../services/AppAbility';
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
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  scrollDistance: number = 2;
  throttle: number = 8;

  constructor(abilityService: AbilityService<AppAbility>, private readonly ability: AppAbility, private router: Router, private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private ShipmentService: ShipmentService) {
    this.ability$ = abilityService.ability$;

    this.ability$.subscribe(r => {
      this.able_to = r;

    })
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
    this.router.navigate(['myPurchase/viewVehicle'], { state: { id: shpmntCard.apprRef }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 0;
  }

  goToViewVehicleMysales(shpmntCard: any) {
    this.mySaleScroll = false;
    console.log(shpmntCard.apprRef)
    this.router.navigate(['mysales/viewVehicle'], { state: { id: shpmntCard.apprRef }, relativeTo: this.route });
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


  openEsignDialog(shpmntCard: any, shipmentPage: any): void {
    const dialogRef = this.dialog.open(EsignDialog, {
      data: {
        shipmentId: shpmntCard,
        shipmentPage: shipmentPage
      }
    });

  }

  openPdfDialog(offerId: any): void {
    this.myPurchaseScroll = false;
    this.mySaleScroll = false;
    const dialogRef = this.dialog.open(pdfDocuments, {
      data: {
        offerId: offerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.myPurchaseScroll = true;
      this.mySaleScroll = true;
    });
  }

  openMailAttach(shpmntCardForMail: any): void {
    this.myPurchaseScroll = false;
    this.mySaleScroll = false;
    const dialogRef = this.dialog.open(mailAttachPdf, {
      data: {
        offerId: shpmntCardForMail.offerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.myPurchaseScroll = true;
      this.mySaleScroll = true;
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



@Component({
  selector: 'EsignDialog',
  templateUrl: 'EsignDialog.html',
  styleUrls: ['./EsignDialog.css']
})
export class EsignDialog implements AfterViewInit {
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  constructor(abilityService: AbilityService<AppAbility>, private readonly ability: AppAbility,
    public dialogRef: MatDialogRef<EsignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private shipmentSrv: ShipmentService,
    private snackBar: MatSnackBar
  ) {
    this.ability$ = abilityService.ability$;

    this.ability$.subscribe(r => {
      this.able_to = r;

    })
  }
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  public shipmentPurchaseCards: any = [];
  agreeChecked: boolean = false;

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.context.lineWidth = 2;
  }

  onMouseDown(event: MouseEvent) {
    this.context.beginPath();
    this.context.moveTo(event.clientX - this.canvas.nativeElement.getBoundingClientRect().left, event.clientY - this.canvas.nativeElement.getBoundingClientRect().top);
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons === 1) {
      this.context.lineTo(event.clientX - this.canvas.nativeElement.getBoundingClientRect().left, event.clientY - this.canvas.nativeElement.getBoundingClientRect().top);
      this.context.stroke();
    }
  }

  clearSignature(): void {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  submitSignature(shipmentId: any, shipmentPage: any): void {
    var canvas: any = document.getElementById('canvas-sign');
    const signData = canvas.toDataURL().slice(22,);
    if (shipmentPage === 'myPurchase') {
      const obj = {
        buyerAgreed: true,
        buyerSign: signData,
        buyerUserId: '598d968b-a7ac-4d26-87a4-ed4659e2d472'
      }

      this.shipmentSrv.buyerAgreed(shipmentId, obj).subscribe((response) => {
        this.openSnackBar('Signature submitted successfully', 'Close');
      });
    }
    else if (shipmentPage === 'mySales') {
      const obj = {
        sellerAgreed: true,
        sellerSign: signData,
        sellerUserId: '598d968b-a7ac-4d26-87a4-ed4659e2d472'
      }

      this.shipmentSrv.sellerAgreed(shipmentId, obj).subscribe((response) => {
        this.openSnackBar('Signature submitted successfully', 'Close');
      });
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'pdfDocuments',
  templateUrl: 'PdfDocuments.html',
  styleUrls: ['./PdfDocuments.css']
})
export class pdfDocuments {
  public pdfCards: any = []

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  constructor(
    abilityService: AbilityService<AppAbility>, private readonly ability: AppAbility,
    public dialogRef: MatDialogRef<pdfDocuments>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private shipmentSrv: ShipmentService
  ) {
    this.ability$ = abilityService.ability$;

    this.ability$.subscribe(r => {
      this.able_to = r;

    })

    shipmentSrv.getPdfs(data.offerId).subscribe(
      (response: any): any => {
        this.pdfCards = response.pdflist;
        console.log(this.pdfCards);
      },
      (error): any => {
        console.error('Error:', error);
      }
    )

  }
  public odometerUrl = ''
  public buyerOrderUrl = ''
  public vehRepPdfUrl = ''
  public apprReportPdfUrl = ''
  public licenseReportPdfUrl = ''
  public taxReportPdfUrl = ''


  downloadPdf(pdfCard: any) {
    console.log(pdfCard)
    switch (pdfCard.module) {
      case 'Odometer': {
        // this.odometerUrl = `https://services-test.keyassure.live/shipment/odometerPdf?fileName=${pdfCard.fileName.toString()}`;
        this.odometerUrl = `${urls.printOdometerPdf}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
      case 'Buyer Order': {
        // this.buyerOrderUrl = `https://services-test.keyassure.live/shipment/buyerOrderPdf?fileName=${pdfCard.fileName.toString()}`;
        this.buyerOrderUrl = `${urls.printBuyerOrderPdf}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
      case 'Veh Report': {
        // this.vehRepPdfUrl = `https://services-test.keyassure.live/shipment/vehRepPdf?fileName=${pdfCard.fileName.toString()}`;
        this.vehRepPdfUrl = `${urls.printVehReportPdf}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
      case 'Appr Report': {
        // this.apprReportPdfUrl = `https://services-test.keyassure.live/shipment/apprReportPdf?fileName=${pdfCard.fileName.toString()}`;
        this.apprReportPdfUrl = `${urls.printAppraisalReport}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
      case 'License Report': {
        // this.licenseReportPdfUrl = `https://services-test.keyassure.live/shipment/licenseReportPdf?fileName=${pdfCard.fileName.toString()}`;
        this.licenseReportPdfUrl = `${urls.printDealerLicense}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
      case 'Tax Form': {
        // this.taxReportPdfUrl = `https://services-test.keyassure.live/shipment/taxReportPdf?fileName=${pdfCard.fileName.toString()}`;
        this.taxReportPdfUrl = `${urls.printTaxReport}?fileName=${pdfCard.fileName.toString()}`;
        break;
      }
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

function ngOnInit(data: any, any: any) {
  throw new Error('Function not implemented.');
}




@Component({
  selector: 'mailAttachPdf',
  templateUrl: 'MailAttach.html',
  styleUrls: ['./MailAttach.css']
})
export class mailAttachPdf {
  public pdfCards: any = []
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  constructor(abilityService: AbilityService<AppAbility>, private readonly ability: AppAbility,
    public dialogRef: MatDialogRef<mailAttachPdf>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private shipmentSrv: ShipmentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {
    this.ability$ = abilityService.ability$;

    this.ability$.subscribe(r => {
      this.able_to = r;

    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendToMail() {

    const attachPdfToMail: any = {
      mailId: this.attachPdfToMail.get('buyerMail')?.value,
    }

    this.shipmentSrv.mailAttach(this.data.offerId, attachPdfToMail.mailId).subscribe((response: any) => {
    });
    this.openSnackBar('you will receive mail shortly', 'Close');
    this.dialogRef.close();
  }

  attachPdfToMail = this.fb.group({
    buyerMail: ['', [Validators.required, Validators.email]],
  })

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'top', // 'top' or 'bottom'
    });
  }


}