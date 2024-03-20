import { Component, DoCheck, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MakeOfferSelect } from '../inventory/inventory.component';
import urls from 'src/properties';
import { AppAbility } from '../services/AppAbility';
import { PureAbility } from '@casl/ability';
import { Observable } from 'rxjs';
import { AbilityService } from '@casl/angular';

@Component({
  selector: 'app-favorite-vehicle',
  templateUrl: './favorite-vehicle.component.html',
  styleUrls: ['./favorite-vehicle.component.css']
})
export class FavoriteVehicleComponent implements OnInit {

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private DashboardService:DashboardService,private route: ActivatedRoute,private router: Router,private inventoryservice :InventoryService,private snackBar: MatSnackBar, public dialog: MatDialog){
   
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
  }


  isLoading = false;


  // baseUrl:string="https://services-test.keyassure.live/appraisal/getpic1?pic1=";
  baseUrl: string = `${urls.appraisalGetPic1}?pic1=`;

 public favVehCard :any
 public showParent:boolean=true;
 private  userId:any = history.state.userId;
  ngOnInit(): void {
    this.isLoading = true;
    window.addEventListener('scroll', this.loadMore, true);
   
    console.log(this.userId);

    this.DashboardService.favVehicle(this.currentPage,this.pageSize).subscribe(
      (response:any):any=>{     
        if(response.code===200){
          this.isLoading = false;
        }   
        this.favVehCard=response.cards;
        console.log(this.favVehCard) ;
      },
      (error):any=>{
        this.isLoading = false;
        console.error('Error:',error);
        this.favVehCard=null;
      }
    )
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.loadMore, true);

  }

  public currentPage = 0;
  public pageSize = 8;
  public favoriteScroll = true;
  loadMore: any = (event: any) => {


    // const scrollEnd =(window.innerHeight + window.pageYOffset) == document.body.offsetHeight;
    const scrollEnd = document.documentElement.clientHeight + window.scrollY+1 >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);

    if (scrollEnd) {
      if (this.favoriteScroll) {
        this.currentPage = this.currentPage + 1;
        // this.inventoryservice.getAppraisalCards(this.currentPage, this.pageSize).subscribe(
        //   (response): any => {
        //     this.apprCards = [...this.apprCards, ...response.cards];
        //     console.log(this.apprCards);
        //   },
        //   (error): any => {
        //     console.error('Error:', error);
        //   }
        // );
       
    this.DashboardService.favVehicle(this.currentPage,this.pageSize).subscribe(
      (response:any):any=>{     
        if(response.code===200){
          this.isLoading = false;
        }   
        this.favVehCard=[...this.favVehCard,...response.cards];
        console.log(this.favVehCard) ;
      },
      (error):any=>{
        this.isLoading = false;
        console.error('Error:',error);
        this.favVehCard=null;
      }
    )
      }
    }
  }

  goToViewVehicle(favoriteCard:any){
    this.favoriteScroll = false;
   
    this.router.navigate(['viewVehicle'], { state: { id: favoriteCard.id,vin:favoriteCard.vinNumber }, relativeTo: this.route });
    this.showParent=false;
   // this.router.navigate(['/appraisals',favoriteCard.id]);
  }
  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'recipe'
        if (this.router.url === '/favVehicle') {
          this.showParent = true;
          this.favoriteScroll = true;
        }
      }
    });

  }
  addToFavorite(favoriteCard:any){
    this.inventoryservice.getMoveToWishList(favoriteCard.id).subscribe((response)=>{
      this.openSnackBar('vehicle added to WishList!', 'Close');
      this.DashboardService.favVehicle(this.currentPage,this.pageSize).subscribe(
        (response:any):any=>{        
          this.favVehCard=response.cards;
          console.log(this.favVehCard) ;
        },
        (error):any=>{
          console.error('Error:',error);
          this.favVehCard=null;
        }
      )
    });

  }

  remFromFavorite(favoriteCard:any){
    this.inventoryservice.removeFromFav(favoriteCard.id).subscribe((response)=>{
      this.openSnackBar('vehicle removed from WishList!', 'Close');

      this.DashboardService.favVehicle(this.currentPage,this.pageSize).subscribe(
        (response:any):any=>{        
          this.favVehCard=response.cards;
          console.log(this.favVehCard) ;
        },
        (error):any=>{
          console.error('Error:',error);
          this.favVehCard=null;
        }
      )
    });



  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  openMakeOfferDialog(srchFtryCard: any): void {
    const dialogRef = this.dialog.open(MakeOfferSelect, {
      data: {
        appraisalId: srchFtryCard.id
      }
    });
  }


}