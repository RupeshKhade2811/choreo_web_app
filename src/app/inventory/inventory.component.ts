import { AfterViewInit, Component, EventEmitter, HostListener, Inject, NgModule, OnInit, ViewChild, inject } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AprraisalService } from '../services/aprraisal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { CommunicationService } from '../services/communication.service';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import urls from 'src/properties';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { PureAbility } from '@casl/ability';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {

onScrollDownInv() {

  if(this.selectedTab === 'Inventory'   ){
    this.inventoryCurrentPage++;

    if (this.isFilterActiveInventory) {
      const filterForm = this.invFilter.value;
      if (this.inventoryCurrentPage <= this.filterInvTotalpage) {
        this.inventoryservice.getFilteredInvCards(this.inventoryCurrentPage, this.inventoryPageSize, filterForm).subscribe(
          (response: any): any => {
            this.inventoryCards = this.inventoryCards.concat(response.cards);
            // console.log(this.inventoryCards);
          },
          (error): any => {
            console.error('Error:', error);
          }
        )
      }

    }
    else if(this.inventoryCurrentPage<=this.totalInvPage){

    this.inventoryservice.getInventoryCards( this.inventoryCurrentPage, this.inventoryPageSize).subscribe(
      (response): any => {
        if (response.code === 200) {
          this.isLoading = false;
        
            this.inventoryCards = this.inventoryCards.concat(response.cards) ;
  
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
onScrollDownSearchFact() {
  if( this.selectedTab === 'Buy Cars'){

    this.searchFactoryCurrentPage++;


    if (this.isFilterActiveSearchFact) {
      const filterForm = this.invFilter.value;
      if (this.searchFactoryCurrentPage <= this.filSearchfacTotalpage) {
        this.inventoryservice.getFilteredSearchCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize, filterForm).subscribe(
          (response: any) => {
            this.searchFtryCards = this.searchFtryCards.concat(response.cards) ;
            // console.log(this.searchFtryCards);

          },
          (error): any => {
            console.error('Error:', error);
          }
        )
      }

    } 
    else if(this.searchFactoryCurrentPage<=this.totalSearchFacPage) {
    this.inventoryservice.getSearchFtryCards( this.searchFactoryCurrentPage, this.searchFactoryPageSize).subscribe(
      (response): any => {
        if (response.code === 200) {
          this.isLoading = false;
        
            this.searchFtryCards = this.searchFtryCards.concat(response.cards) ;
  
   
        }

      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    );
    
  }


  }

 }

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('viewTabGroup') viewTabGroup!: MatTabGroup;


  isFilterActiveInventory = false;
  isFilterActiveSearchFact = false;
  selectedTabIndex = 0;
  selectedViewTabIndex = 0;
  isLoading = false;


  existingVariable: any;

  private subscription: Subscription;

  // baseUrl: string = "https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

  defaultImageUrl: string = "https://images.unsplash.com/photo-1605218403317-6caf5485d304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  

  public able_to!: PureAbility;
scrollDistance: number=2;
throttle: number=8;
  constructor(private appraisalservice: AprraisalService, private inventoryservice: InventoryService, private router: Router, private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private fb: FormBuilder, private communicationService: CommunicationService) {
    
  
    this.subscription = this.communicationService.appraisalCreated$.subscribe(
      (updatedData: any) => {
        // Handle the emitted event data here from the service
        // console.log('Updated data received from child component!', updatedData);
        // Assign the updated data to the existing variable in the parent component
        this.existingVariable = updatedData;
        this.inventoryCurrentPage = 0;
        this.loadInventoryCards(this.inventoryCurrentPage, this.inventoryPageSize);
        this.showparent = true;
      }
    );
  }

  public inventoryCards: any = []
  public searchFtryCards: any = []
  public showparent: boolean = true;

  public years: any = [];
  public makes: any = [];
  public models: any = [];

  invFilter = this.fb.group({
    year: [null],
    make: [null],
    model: [null]
  });

  resetForm() {
    this.invFilter.reset();
  }

  public filterInvTotalpage: any;
  public filSearchfacTotalpage: any;
  submitForm() {
    //   alert(this.selectedTab)

    this.isLoading = true;
    if (this.selectedTab === 'Inventory') {
      this.isFilterActiveInventory = true;
      this.inventoryCurrentPage = 0;
      const filterForm = this.invFilter.value;
      this.inventoryservice.getFilteredInvCards(this.inventoryCurrentPage, this.inventoryPageSize, filterForm).subscribe((response: any) => {
        this.inventoryCards = response.cards;
        this.filterInvTotalpage = response.totalPages;
        this.isLoading = false;
        this.selectedTabIndex = 0;
      })
    } else if (this.selectedTab === 'Buy Cars') {
      //alert(this.selectedTab)
      this.isFilterActiveSearchFact = true;
      this.searchFactoryCurrentPage = 0;
      const filterForm = this.invFilter.value;
      this.inventoryservice.getFilteredSearchCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize, filterForm).subscribe((response: any) => {
        this.searchFtryCards = response.cards;
        this.filSearchfacTotalpage = response.totalPages;
        this.isLoading = false;
        this.selectedTabIndex = 1;

      })
    }

  }
  filterObject: any;

  getDropdownsForInvFilter(value: any, tabModule: string) {
    // console.log(tabModule);

    this.inventoryservice.getDropDownsForInventoryFilter(value, tabModule).subscribe((response: any) => {
      // console.log(JSON.stringify(value));

      this.filterObject = response;
      this.years = this.filterObject.year;
      this.makes = this.filterObject.make;
      this.models = this.filterObject.model;
      // console.log(this.filterObject);
    }
    )
  }



  ngAfterViewInit(): void {
    // console.log(this.tabGroup);

    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.selectedTabIndex; // Set the index you want to open
    }

    if (this.viewTabGroup) {
      this.viewTabGroup.selectedIndex = this.selectedViewTabIndex;
    }
  }

  public gotoViewVehicleInv(apprCard: any, tab: any) {
    this.inventoryScroll = false;
    //alert(apprCard.vehicleMake);
    // console.log(apprCard.id)
    this.router.navigate(['viewVehicle'], { state: { id: apprCard.id, vin: apprCard.vinNumber, comp: 'inventory' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 0;

    if (tab === 'card') {
      this.selectedViewTabIndex = 0;
    }
    if (tab === 'list') {
      this.selectedViewTabIndex = 1;
    }
  }

  gotoViewVehicleSearchFact(apprCard: any) {
    this.searchFactoryScroll = false;
    // console.log(apprCard.id)
    this.router.navigate(['searchfactory/viewVehicle'], { state: { id: apprCard.id, vin: apprCard.vinNumber, comp: 'searchFactory' }, relativeTo: this.route });
    this.showparent = false;
    this.selectedTabIndex = 1;
  }

  gotoEditInventoryPage(invId: any, tab: any, invntrySts: string) {
    this.inventoryScroll = false;
    this.router.navigate(['./editInventory'], { state: { id: invId, isEdit: true , isDraft: invntrySts}, relativeTo: this.route });
    this.showparent = false;
    if (tab === 'card') {
      this.selectedViewTabIndex = 0;
    }
    if (tab === 'list') {
      this.selectedViewTabIndex = 1;
    }

  }

  public totalInvPage: any;
  loadInventoryCards(currentPage: any, pageSize: any) {
    this.inventoryservice.getInventoryCards(currentPage, pageSize).subscribe(
      (response): any => {
        if (response.code === 200) {
          this.isLoading = false;
        }
        this.inventoryCards = response.cards;
        this.totalInvPage = response.totalPages;
        // console.log(this.inventoryCards);
      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    )
  }

  public totalSearchFacPage: any;
  loadSearchFctryCards(currentPage: any, pageSize: any) {

    this.inventoryservice.getSearchFtryCards(currentPage, pageSize).subscribe(
      (response): any => {
        if (response.code === 200) {
          this.isLoading = false;
          if(currentPage==0){
            this.searchFtryCards = response.cards;
          }
          if(currentPage>0){

            this.searchFtryCards = this.searchFtryCards.concat(response.cards) ;
          }
            this.totalSearchFacPage = response.totalPages


        }

      
      
      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    )
  }

  ngOnInit(): void {

    this.isLoading = true;

    if (this.selectedTab = 'Inventory') {
      // console.log(this.selectedTab);

     // window.addEventListener('scroll', this.loadMoreItems, true);
    }

    this.invFilter.valueChanges.subscribe((value) => {
      // alert('selectedTab1')
      if (this.selectedTab === 'Inventory') {
        
        this.getDropdownsForInvFilter(value, 'Inventory');
      }

    })

    this.getDropdownsForInvFilter(this.invFilter.value, 'Inventory');

   this.loadInventoryCards(this.inventoryCurrentPage, this.inventoryPageSize);


   





  }

  ngOnDestroy(): void {
   
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'recipe'
        if (this.router.url === '/inventory') {
          this.showparent = true;
          this.inventoryScroll = true;
          this.searchFactoryScroll = true;
        }
      }
    });

  }

  goToViewVehicle(srchFtryCard: any) {
    this.router.navigate(['/appraisals', srchFtryCard.id]);
  }

  addToFavorite(srchFtryCard: any) {
    this.inventoryservice.getMoveToWishList(srchFtryCard.id).subscribe((response) => {
      this.openSnackBar('vehicle added to WishList!', 'Close');
      this.searchFactoryCurrentPage = 0;
      this.loadSearchFctryCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize);
    });
  }

  remFromFavorite(srchFtryCard: any) {
    this.inventoryservice.removeFromFav(srchFtryCard.id).subscribe((response) => {
      this.openSnackBar('vehicle removed from WishList!', 'Close');

      // this.inventoryservice.getSearchFtryCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize).subscribe(
      //   (response): any => {
      //     this.searchFtryCards = response.cards;
      console.log(this.searchFtryCards);
      //   },
      //   (error): any => {
      //     console.error('Error:', error);
      //   }
      // )
      this.searchFactoryCurrentPage = 0;
      this.loadSearchFctryCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize);

    });
  }



  // public printInventory(id: any) {
  //   this.appraisalservice.printAppraisal(id).subscribe((response: any) => {
  //     // Create a Blob from the byte array
  //     const blob = new Blob([response], { type: 'application/pdf' });

  //     // Create a URL for the Blob
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     // Create an anchor element to trigger the download
  //     const anchor = document.createElement('a');
  //     anchor.href = blobUrl;
  //     anchor.download = 'appraisal.pdf'; // Change the filename as needed

  //     // Trigger a click event on the anchor element to initiate the download
  //     anchor.click();

  //     // Clean up resources
  //     window.URL.revokeObjectURL(blobUrl);
  //   });
  // }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    
  );


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }


 

  openMakeOfferDialog(srchFtryCard: any): void {
    this.searchFactoryScroll = false;
    const dialogRef = this.dialog.open(MakeOfferSelect, {
      height:'200px',
      width:'450px',
      data: {
        appraisalId: srchFtryCard.id
      },
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {

      this.searchFactoryScroll = true;
      this.searchFactoryScroll=true;
      console.log(result);
      
      if(result !== undefined){
        if(result===200 || result===400){
          window.scrollTo(0, 0);
          this.searchFactoryCurrentPage=0;
          console.log(this.searchFactoryCurrentPage);
          this.router.navigate(['offers']);
          
          this.loadSearchFctryCards(this.searchFactoryCurrentPage,this.searchFactoryPageSize);
          dialogRef.close();
        }
      }
  
    });

  }

  public selectedTab = ''
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {

    this.selectedTab = tabChangeEvent.tab.textLabel;
   
    if (this.selectedTab === 'Inventory') {
      this.isFilterActiveInventory=false;

      this.inventoryCurrentPage = 0;
      this.loadInventoryCards(this.inventoryCurrentPage, this.inventoryPageSize);
  

      this.filterObject = {};
      this.invFilter.reset();
      //this.getDropdownsForInvFilter(this.invFilter.value, 'Inventory');

    }
    else if (this.selectedTab === 'Buy Cars') {
      this.isFilterActiveSearchFact=false;
     this.searchFactoryCurrentPage = 0;

     this.loadSearchFctryCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize);
     

      this.filterObject = {};
      this.invFilter.reset();

      this.invFilter.valueChanges.subscribe((value) => {

        if (this.selectedTab === 'Buy Cars') {

          this.getDropdownsForInvFilter(value, 'Buy Cars');
        }
      })

      this.getDropdownsForInvFilter(this.invFilter.value, 'Buy Cars');
      
    }
  }
  public inventoryCurrentPage = 0;
  public inventoryPageSize = 8;
  public searchFactoryCurrentPage = 0;
  public searchFactoryPageSize = 8;
  public inventoryScroll = true;
  public searchFactoryScroll = true;


  loadMoreSearchFactoryItems = () => {
    const scrollEnd = document.documentElement.clientHeight + window.scrollY+1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);
    if (scrollEnd) {
      if (this.searchFactoryScroll) {
        if (this.isFilterActiveSearchFact) {
          const filterForm = this.invFilter.value;
          this.searchFactoryCurrentPage = this.searchFactoryCurrentPage + 1;
          if (this.searchFactoryCurrentPage <= this.filSearchfacTotalpage) {
            this.inventoryservice.getFilteredSearchCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize, filterForm).subscribe(
              (response: any) => {
                this.searchFtryCards = [...this.searchFtryCards, ...response.cards];
                // console.log(this.searchFtryCards);

              },
              (error): any => {
                console.error('Error:', error);
              }
            )
          }

        } else {
          this.searchFactoryCurrentPage = this.searchFactoryCurrentPage + 1;

          if (this.searchFactoryCurrentPage <= this.totalSearchFacPage) {
            this.inventoryservice.getSearchFtryCards(this.searchFactoryCurrentPage, this.searchFactoryPageSize).subscribe(
              (response: any) => {
                this.searchFtryCards = [...this.searchFtryCards, ...response.cards];
                // console.log(this.searchFtryCards);

              },
              (error): any => {
                console.error('Error:', error);
              }
            )
          }

        }
      }
    }
  }


  buyCar(arg0: any) {
    this.inventoryservice.carBuyByBuyer(arg0).subscribe({
      next:(response:any)=>{
        if(response.code===200){
               this.openSnackBar('Congratulations! Your vehicle purchase was successful.', 'Close');


               this.loadSearchFctryCards(0,8);
              }


        
      },
      error:(error:any)=>console.log(error)
      
    });
    }

}




@Component({
  selector: 'SoldRetail',
  templateUrl: 'SoldRetail.html',
  styleUrls: ['SoldRetail.css']

})
export class SoldRetail {
  dataEvent:EventEmitter<any> = new EventEmitter<any>();

  
  public able_to!: PureAbility;
  constructor( 
    public dialogRef: MatDialogRef<SoldRetail>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private inventoryservice: InventoryService,
    private snackBar: MatSnackBar
  ) { 
    
  }


  onNoClick(): void {
    this.dataEvent.emit('Data to pass back');
    this.dialogRef.close();
  }

  // soldRetailOn(aprId: any) {
  //   this.inventoryservice.soldRetailOn(aprId).subscribe((response:any) => {
  //     console.log(response.code);
      
  //     if(response.code===200){
  //       this.dataEvent.emit(response.code);
  //       this.dialogRef.close();
  //       this.openSnackBar('vehicle Sold Retail', 'Close');
  //     } else {
  //       this.dataEvent.emit(response.code);
  //       this.openSnackBar('something is wrong','Close');
  //     }
  //   });
  // }

  // removeSoldRetail(aprId: any) {
  //   this.inventoryservice.removeSoldRetail(aprId).subscribe((response:any) => {
  //     if(response.code===200){
  //       this.dataEvent.emit(response.code);
  //       this.dialogRef.close();
  //       this.openSnackBar('removed from vehicle sold retail', 'Close');
  //     } else {
  //       this.dataEvent.emit(response.code);
  //       this.openSnackBar('something is wrong','Close');
  //     }
  //   });
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }
}

@Component({
  selector: 'Wholesale',
  templateUrl: 'SoldWholeSale.html',
  styleUrls: ['SoldWholeSale.css']

})
export class Wholesale {

  dataEvent:EventEmitter<any> = new EventEmitter<any>();

  public able_to!: PureAbility;
  constructor(
    public dialogRef: MatDialogRef<Wholesale>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private inventoryservice: InventoryService,
    private snackBar: MatSnackBar
  ) { 
    
  }

  onNoClick(): void {
    this.dataEvent.emit('Data to pass back');
    this.dialogRef.close();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }
}


@Component({
  selector: 'HoldUnit',
  templateUrl: 'HoldUnit.html',
  styleUrls: ['HoldUnit.css']
})
export class HoldUnit {
  dataEvent:EventEmitter<any> = new EventEmitter<any>();

 
  public able_to!: PureAbility;
  constructor(
  public dialogRef: MatDialogRef<HoldUnit>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private inventoryservice: InventoryService,
    private snackBar: MatSnackBar
  ) { 
   
  }

  onNoClick(): void {
    this.dataEvent.emit('Data to pass back');
    this.dialogRef.close();
  }

  // holdUnit(aprId: any) {
  //   this.inventoryservice.holdOn(aprId).subscribe((response:any) => {
  //     console.log(response.code);
  //     if(response.code===200){
  //       this.dataEvent.emit(response.code);
  //       this.dialogRef.close();
  //       this.openSnackBar('vehicle is in hold', 'Close');
  //     } else{
  //       this.dataEvent.emit(response.code);
  //       this.openSnackBar('something is wrong','Close');
  //     }
  //   });
  // }

  // removeHold(aprId: any) {
  //   this.inventoryservice.removeHoldUnit(aprId).subscribe((response:any) => {
  //     if(response.code===200){
  //       this.dataEvent.emit(response.code);
  //       this.dialogRef.close();
  //       this.openSnackBar('removed from hold', 'Close');
  //     } else {
  //       this.dataEvent.emit(response.code);
  //       this.openSnackBar('something is wrong','Close');
  //     }
  //   });
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }
}

@Component({
  selector: 'MakeOfferSelect',
  templateUrl: 'MakeOffer.html'
})
export class MakeOfferSelect {

  public able_to!: PureAbility;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<MakeOfferSelect>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) {
    
   }

  public offerAmount: number | undefined;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  closeDialog(res:any) {
    this.dialogRef.close(res);
  }


  // submitOfferAmount(id: any, amount: any) {
  //   // console.log(JSON.stringify(amount));

  //   // console.log(amount + " " + id);
  //   this.inventoryService.makeOfferByBuyer(id, amount).subscribe((response: any) => {
  //     console.log(response.code);
  //     if(response.code===200){
  //       this.closeDialog(response.code);
  //     }
  //     this.openSnackBar(response.message, 'Close');
  //   })

  // }

  makeOffer = this.fb.group({
    buyerQuote: [null, Validators.required],
  })

  onNoClick(): void {
    this.dialogRef.close();
  }



}
