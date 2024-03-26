import { AfterViewInit, Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { AprraisalService } from '../services/aprraisal.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
import { MatTabGroup } from '@angular/material/tabs';
import { CommunicationService } from '../services/communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import urls from 'src/properties';
import { AbilityService } from '@casl/angular';
import { PureAbility } from '@casl/ability';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-appraisal-page',
  templateUrl: './appraisal-page.component.html',
  styleUrls: ['./appraisal-page.component.css']
})
export class AppraisalPageComponent implements OnInit, AfterViewInit {
scrollDistance: number=2;
throttle: number=8;

onScrollDownAppraisal() {

 
    this.currentPage++;

    if (this.isFilterActiveAppraisal) {
      const filterForm = this.appraisalFilter.value;
      if (this.currentPage <= this.filterAppTotalpage) {
        this.appraisalservice.getFilteredAppraisalCards(this.currentPage, this.pageSize, filterForm).subscribe(
          (response: any): any => {
            this.apprCards = this.apprCards.concat(response.cards);
            // console.log(this.inventoryCards);
          },
          (error): any => {
            console.error('Error:', error);
          }
        )
      }

    }
    else if(this.currentPage<=this.totalPage){

    this.appraisalservice.getAppraisalCards( this.currentPage, this.pageSize).subscribe(
      (response): any => {
        if (response.code === 200) {
          this.isLoading = false;
        
            this.apprCards = this.apprCards.concat(response.cards) ;
  
        }

      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    )
    
  }


  



}

  public userId:any;
  public userRole:any;
  
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  selectedTabIndex = 0;
  showFiller = false;
  isLoading = false;

  ngAfterViewInit(): void {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.selectedTabIndex;
    }
  }
  isFilterActiveAppraisal=false
  existingVariable: any;
  
  

  private subscription: Subscription;
  public able_to!: PureAbility;
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

  defaultImageUrl: string = "https://images.unsplash.com/photo-1605218403317-6caf5485d304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"

  constructor( private appraisalservice: AprraisalService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private communicationService: CommunicationService, private snackBar: MatSnackBar) {

   


    this.subscription = this.communicationService.appraisalCreated$.subscribe(
      (updatedData: any) => {
        // Handle the emitted event data here from the service
        console.log('Updated data received from child component!', updatedData);
        // Assign the updated data to the existing variable in the parent component
        this.existingVariable = updatedData;
        this.currentPage = 0;
        this.loadApprCards(this.currentPage, this.pageSize);
   
     
      }
    );
  }

  public apprCards: any = []

  public showparent: boolean = true;

  // public moveToInv_url = "https://services-test.keyassure.live/appraisal/moveToInventory?apprRef="

  public moveToInventory(apprId: any) {
  //  alert(apprId);
    // this.http.post(this.moveToInv_url + apprId, null).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.openSnackBar('Appraisal Moved To Inventory','close');
    //     this.currentPage = 0;
    //     this.loadApprCards(this.currentPage, this.pageSize);
    //     this.showparent=true;
    //   }
    // )

    this.appraisalservice.moveToInventory(apprId).subscribe(
        (response) => {
          console.log(response);
          this.openSnackBar('Appraisal Moved To Inventory','close');
          this.currentPage = 0;
          this.loadApprCards(this.currentPage, this.pageSize);
          this.showparent=true;
        }
      )
  } 

  public gotoEditAppraisalPage(apprId: number, tab: any, invntrySts: string) {
    this.appraisalScroll = false;
    console.log(invntrySts);
    this.router.navigate(['./editAppraisal'], { state: { id: apprId, isEdit: true, isDraft: invntrySts }, relativeTo: this.route });
 this.showparent = false;

   
    if (tab === 'card') {
      this.selectedTabIndex = 0;
    }
    if (tab === 'list') {
      this.selectedTabIndex = 1;
    }
  }

  public gotoNewAppraisal() {
    //this.appraisalScroll = false;
    this.router.navigate(['newAppraisal'], { state: { isEdit: false }, relativeTo: this.route });
    this.showparent = false;
  }

  public gotoViewVehicle(apprCard: any, tab: any) {
   // this.appraisalScroll = false;
    //alert(apprCard.vehicleMake);
    console.log(apprCard.id)
    this.router.navigate(['viewVehicle'], { state: { id: apprCard.id, vin: apprCard.vinNumber, comp: 'appraisal' }, relativeTo: this.route });
    this.showparent = false;
    if (tab === 'card') {
      this.selectedTabIndex = 0;
    }
    if (tab === 'list') {
      this.selectedTabIndex = 1;
    }
  }

  public deleteAppraisal(id: any) {

    this.appraisalservice.deleteApparaisal(id).pipe(
      tap((response: any) => {
        let message = response.message;
        console.log(response.message);
        this.openSnackBar('Appraisal Deleted', 'close');
        // Call loadApprCards upon successful deletion
        this.currentPage = 0;
        this.loadApprCards(this.currentPage, this.pageSize);
      })
    ).subscribe();

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  // public printAppraisal(id: any) {
  //   this.appraisalservice.printAppraisal(id).subscribe((response: any) => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     const anchor = document.createElement('a');
  //     anchor.href = blobUrl;
  //     anchor.download = 'appraisal.pdf';
  //     anchor.click();
  //     window.URL.revokeObjectURL(blobUrl);
  //   });
  // }

  appraisalFilter = this.fb.group({
    year: [null],
    make: [null],
    model: [null]
  });

  public years: any = [];
  public makes: any = [];
  public models: any = [];

  getDropdownsForAppraisalFilter(value: any): void {
    this.appraisalservice.getDropdownsForAppraisalFilter(value).subscribe(
      (response: any) => {
        console.log(JSON.stringify(value));

        const filterObject = response;
        this.years = filterObject.year;
        this.makes = filterObject.make;
        this.models = filterObject.model;
        console.log(filterObject);
      },
      (error: any) => {
        // Handle error if necessary
      }
    );
  }

  resetForm() {
    this.appraisalFilter.reset();
  }

  submitForm() {
    const filterForm = this.appraisalFilter.value;
    this.isFilterActiveAppraisal = true;
    this.isLoading = true;
    this.currentPage = 0;
    this.appraisalservice.getFilteredAppraisalCards(this.currentPage, this.pageSize, filterForm).subscribe((response: any) => {
      const responseObject = response;
      this.isLoading = false;
      this.filterAppTotalpage = response.totalPages;
      this.apprCards = responseObject.cards;
    })
  }


  public currentPage = 0;
  public pageSize = 8;
  public appraisalScroll = true;
  public filterAppTotalpage: any;
  public totalPage: any;


  loadApprCards(currentPage: any, pageSize: any) {
    this.isFilterActiveAppraisal=false;
    this.appraisalservice.getAppraisalCards(currentPage, pageSize).subscribe(
      (response): any => {
        this.isLoading = false;
        this.totalPage = response.totalPages;
        this.apprCards = response.cards;
        console.log(this.apprCards);
      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    );
  }


 
  ngOnInit(): void {
    this.userId = this.appraisalservice.getUserId();
    this.userRole = this.appraisalservice.getUserRole();
    console.log(this.userId);
    console.log(this.userRole);

    this.isLoading = true;

    this.currentPage = 0;

   
    console.log(this.appraisalFilter);
    this.showparent = true;



    console.log(this.existingVariable);

    this.loadApprCards(this.currentPage, this.pageSize);

    this.appraisalFilter.valueChanges.subscribe((value) => {
      // Trigger method when form values change
      this.getDropdownsForAppraisalFilter(value);
    });

    // Initial call to fetch dropdowns based on initial form values
    this.getDropdownsForAppraisalFilter(this.appraisalFilter.value);

  };

  ngOnDestroy(): void {

     this.subscription.unsubscribe();
  }


  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'recipe'
        if (this.router.url === '/appraisal') {
          this.showparent = true;
          this.appraisalScroll = true;
        }
      }
    });

  }


  private breakpointObserver = inject(BreakpointObserver);


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
      
    );

  

    @HostListener('window:popstate', ['$event']) toEditAppr(event: Event) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Check if the current route is 'recipe'
          if (this.router.url === '/appraisal/editAppraisal') {
            console.log("in window refresh");
            
            this.router.navigate(['appraisal']);
          }
        }
      });
  
    } 
  
  }

