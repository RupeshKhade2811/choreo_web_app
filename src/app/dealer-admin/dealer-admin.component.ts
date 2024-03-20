import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { ChangePasswordComponent } from '../dashboard/change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PureAbility } from '@casl/ability';
import { Observable } from 'rxjs';
import { AppAbility } from '../services/AppAbility';
import { AbilityService } from '@casl/angular';



@Component({
  selector: 'app-dealer-admin',
  templateUrl: './dealer-admin.component.html',
  styleUrls: ['./dealer-admin.component.css']
})
export class DealerAdminComponent {

  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private router:Router, private route:ActivatedRoute,private fb: FormBuilder, private DashboardService: DashboardService, private snackBar: MatSnackBar, public dialog: MatDialog) { 
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
  }

  public roleCard: any
  public filteredRoles: any = [];
  public userCard: any;
  public dlrListCard: any;
  public showDealerCard: any;
  public showDlrAdminDetails: any;
  public userId = history.state.userId;

  isLoading = false;



  dlrFormcheck = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(30)]],
    userFirstName: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
    userLastName: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s\\.\\]?[0-9]{3}[-\\s\\.\\]?[0-9]{6}$")]],
    email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%^&*@*]).{8,15}$/)]],
    selectRole: [null, Validators.required],
    dlrshpName: [null],
    state: [null, Validators.required],
    city: [null, Validators.required],
    dlrshpAdd: [null, Validators.required],
    suiteNumber: [null, Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(5), Validators.maxLength(5)]],
  })



  onInputChange(event: Event): void {
  
    const input = event.target as HTMLInputElement;
    let inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Add dashes
  
    this.dlrFormcheck.controls.mobileNumber.setValue(inputValue);
    this.dlrUpdateForm.controls.mobileNumber.setValue(inputValue);
    input.value = inputValue; // Update the input field with the formatted value

  }
  onInputChangeUpdate(event: Event): void {
  
    const input = event.target as HTMLInputElement;
    let inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Add dashes
  
    //this.dlrFormcheck.controls.mobileNumber.setValue(inputValue);
    this.dlrUpdateForm.controls.mobileNumber.setValue(inputValue);
    input.value = inputValue; // Update the input field with the formatted value

  }


  dlrUpdateForm = this.fb.group({
    userName: [null],
    userFirstName: [null, Validators.required],
    userLastName: [null, Validators.required],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s\\.\\]?[0-9]{3}[-\\s\\.\\]?[0-9]{6}$")]],
    email: [null, Validators.required],
    Password: [''],
    selectRole: [null, Validators.required],
    dlrshpName: [null],
    state: [null],
    city: [null],
    dlrshpAdd: [null],
    suiteNumber: [null, ],
    zipCode: [null,],
    selectDealer: [null, Validators.required],
  })




  ngOnInit(): void {
    this.isLoading = true;
    this.DashboardService.roleDropDown().subscribe(
      (response: any): any => {
        this.roleCard = response.roleList;
        this.roleCard.map((item: any) => {
          if (item.role === 'D2' || item.role === 'D3' || item.role === 'S1' || item.role === 'M1') {
            this.filteredRoles.push(item);
          }
        })
        console.log(this.filteredRoles)
        console.log(this.roleCard);
      },
      (error): any => {
        console.error('Error:', error);
      }

    )

    this.showDealersUnderAdmin();

    this.showDlrAdmin();

    if(!this.ability.can('read','DealershipProfile')){
      this.dlrUpdateForm.get('selectDealer')?.disable();
    }
  

  }



  showDealersUnderAdmin() {
    this.DashboardService.searchDealer().subscribe(
      (response: any): any => {
        this.dlrListCard = response;
        console.log(this.dlrListCard);
      },
      (error): any => {
        console.error('Error:', error);
      }
    )
  }

  showDealer(dlrUserId: any) {
    this.DashboardService.showDealer(dlrUserId).subscribe(
      (response: any): any => {
        this.showDealerCard = response;
        console.log(this.showDealerCard);
        this.dlrUpdateForm.patchValue({
          userName: this.showDealerCard.name,
          userFirstName: this.showDealerCard.firstName,
          userLastName: this.showDealerCard.lastName,
          mobileNumber: this.showDealerCard.phoneNumber,
          state: this.showDealerCard.state,
          city: this.showDealerCard.city,
          email: this.showDealerCard.email,
          // Password: this.showDealerCard.password,
          selectRole: this.showDealerCard.roleOfUser.id,
          dlrshpName: this.showDealerCard.dealershipNames,
          dlrshpAdd: this.showDealerCard.streetAddress,
          suiteNumber: this.showDealerCard.aptmentNumber,
          zipCode: this.showDealerCard.zipCode,
        });
      },
      (error): any => {
        console.error('Error:', error);
      }
    )
    if(!this.ability.can('update','UserType')){
      this.dlrUpdateForm.get('selectRole')?.disable();
    }

   
  }

  showDlrAdmin() {
    this.DashboardService.showDealer(this.userId).subscribe(
      (response: any): any => {
        if (response.code === 200) {
          this.isLoading = false;
        }
        this.showDlrAdminDetails = response;
 //       console.log(this.showDlrAdminDetails);
        this.dlrFormcheck.patchValue({
          state: this.showDlrAdminDetails.state,
          city: this.showDlrAdminDetails.city,
          dlrshpName: this.showDlrAdminDetails.dealershipNames,
          dlrshpAdd: this.showDlrAdminDetails.streetAddress,
          suiteNumber: this.showDlrAdminDetails.aptmentNumber,
          zipCode: this.showDlrAdminDetails.zipCode,
        });
      },
      (error): any => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    )
  }


  checkUser(userName: any) {
    this.DashboardService.checkUserName(userName).subscribe(
      (response: any): any => {
        this.userCard = response;
        console.log(this.userCard);
        console.log(this.showDlrAdminDetails?.city);
      },
      (error): any => {
        console.error('Error:', error);
      }
    )
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }
  createDealer() {
    if (this.dlrFormcheck.valid) {

    const createDealerData: any = {

      name: this.dlrFormcheck.get('userName')?.value,
      firstName: this.dlrFormcheck.get('userFirstName')?.value,
      lastName: this.dlrFormcheck.get('userLastName')?.value,
      phoneNumber: this.dlrFormcheck.get('mobileNumber')?.value,
      email: this.dlrFormcheck.get('email')?.value,
      password: this.dlrFormcheck.get('Password')?.value,
      roleId: this.dlrFormcheck.get('selectRole')?.value,
      dealershipNames: this.dlrFormcheck.get('dlrshpName')?.value,
      state: this.dlrFormcheck.get('state')?.value,
      city: this.dlrFormcheck.get('city')?.value,
      streetAddress: this.dlrFormcheck.get('dlrshpAdd')?.value,
      aptmentNumber: this.dlrFormcheck.get('suiteNumber')?.value,
      zipCode: this.dlrFormcheck.get('zipCode')?.value,
      dealerAdmin: this.userId

    }
    this.DashboardService.createDealer(JSON.stringify(createDealerData)).subscribe((response:any) => {
      console.log(response);
      if(response.code===200){
        this.router.navigate(['/dashboard'], {relativeTo:this.route});
      }
    },
      (error): any => {
        console.error('Error:', error);
      }
    );
    console.log(createDealerData);
    }else{
      this.openSnackBar('Please Fill the required fields','close')
    }
  }



  updateDealer() {
    if(this.dlrUpdateForm.valid){

    
    const dlrUserId = this.dlrUpdateForm.get('selectDealer')?.value;
    console.log(dlrUserId);
    const updateDealerData: any = {
      name: this.dlrUpdateForm.get('userName')?.value,
      firstName: this.dlrUpdateForm.get('userFirstName')?.value,
      lastName: this.dlrUpdateForm.get('userLastName')?.value,
      phoneNumber: this.dlrUpdateForm.get('mobileNumber')?.value,
      email: this.dlrUpdateForm.get('email')?.value,
      password: this.dlrUpdateForm.get('Password')?.value,
      roleId: this.dlrUpdateForm.get('selectRole')?.value,
      dealershipNames: this.dlrUpdateForm.get('dlrshpName')?.value,
      state: this.dlrUpdateForm.get('state')?.value,
      city: this.dlrUpdateForm.get('city')?.value,
      streetAddress: this.dlrUpdateForm.get('dlrshpAdd')?.value,
      aptmentNumber: this.dlrUpdateForm.get('suiteNumber')?.value,
      zipCode: this.dlrUpdateForm.get('zipCode')?.value,

    }
    this.DashboardService.updateDealer(JSON.stringify(updateDealerData), dlrUserId).subscribe((response:any) => {
      console.log(response);
      if(response.code===200){
        this.router.navigate(['/dashboard'], {relativeTo:this.route});
      }
    },
      (error): any => {
        console.error('Error:', error);
      }
    );
    console.log(updateDealerData);
    }else{
      this.openSnackBar('Please Fill the required fields','close')
    }
  }

  public newPass: string = '';
  // passwordChangeSuccessful:boolean = false;
  changePass() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, { height: '300px', width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      this.newPass = result;
      // this.passwordChangeSuccessful=true;
      this.dlrUpdateForm.patchValue({
        Password: this.newPass
      })
    });

  }


  clearForm() {
    this.dlrFormcheck.get("userName")?.setValue(null);
    this.dlrFormcheck.get("userFirstName")?.setValue(null);
    this.dlrFormcheck.get("userLastName")?.setValue(null);
    this.dlrFormcheck.get("mobileNumber")?.setValue(null);
    this.dlrFormcheck.get("email")?.setValue(null);
    this.dlrFormcheck.get("dlrshpName")?.setValue(null);
    this.dlrFormcheck.get("selectRole")?.setValue(null);
    this.dlrFormcheck.get("Password")?.setValue(null);
  }

  clearUpdateForm() {
    this.dlrUpdateForm.reset();
  }

  deleteDealer() {

    this.DashboardService.deleteUserProfile(this.showDealerCard.dealerId).subscribe({
      next:(response:any)=>{
        if(response.code==200)
         this.openSnackBar('User Deleted','close')
      },
      error:(e=>{
        console.log();
        
      })

    })

  }


}