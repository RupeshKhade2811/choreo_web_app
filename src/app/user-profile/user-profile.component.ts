import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordComponent } from '../dashboard/change-password/change-password.component';
import urls from 'src/properties';
import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

isLoading = false;
public able_to!: PureAbility;

constructor( private fb:FormBuilder, private router:Router, private http:HttpClient , private route:ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private DashboardService: DashboardService,){
  
}
    
// baseUrl:string="https://services-test.keyassure.live/user/getProfilePic?pic1=";

baseUrl: string = `${urls.getProfilePic}?imageName=`;
selectedFile: File | null = null;

public newPass:string='';
  public showUserCard:any;
  public formOfUser=this.fb.group({
    userName:[{ value: '', disabled: true }],
    userFirstName:[{ value: '', disabled: true }],
    userLastName:[{ value: '', disabled: true }],
    mobileNumber:['',[Validators.required]],
    email:[{ value: '', disabled: true }],
    // password:[''],
    // dlrshpName:[''],
    // state:['',[Validators.required]],
    // city:['',[Validators.required]],
    // suiteNumber:[''],
    // zipCode:['',[Validators.required,Validators.max(99999)]],
    // factorySalesmen:[{value: '', disabled: true}],
    // factoryManager:[{value: '', disabled: true}],
    // corporateDealer:[{value: '', disabled: true}],
    

  })


 ngOnInit(): void {
  this.isLoading = true;
  
    this.DashboardService?.showUserForUserProfile(sessionStorage.getItem('userData')).subscribe(
      (response:any):any=>{  
        
        if(response.status=="true"){
          this.isLoading = false;
        }

        this.showUserCard= response;
        console.log(this.showUserCard)


       this.formOfUser.patchValue({

        userName:this.showUserCard.username,
        userFirstName:this.showUserCard.first_name,
        userLastName:this.showUserCard.last_name,
        mobileNumber:this.showUserCard.phone,
        email:this.showUserCard.email,

        // dlrshpName:this.showUserCard.dlrshpName,
        // state:this.showUserCard.state,
        // city:this.showUserCard.city,
        // suiteNumber:this.showUserCard.apartmentNumber,
        // zipCode:this.showUserCard.zipCode,
        // factorySalesmen:this.showUserCard.factorySalesman,
        // factoryManager:this.showUserCard.factoryManager,
        // corporateDealer:this.showUserCard.dealerAdmin


       })

        
      },
      (error):any=>{
        this.isLoading = false;
        console.error('Error:',error);
      }
    )


   


  }
  // changePass() {

  //   const dialogRef = this.dialog.open(ChangePasswordComponent,{ height:'300px',width:'400px'});


  //   dialogRef.afterClosed().subscribe(result => {
  //     this.newPass = result; 
  //     this.formOfUser.patchValue({ 
  //        password:this.newPass 
  //     })  
  //   });

  // }


  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      console.log(this.selectedFile);
      
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.DashboardService.uploadProfilePic(this.selectedFile).subscribe((response:any) => {
          console.log('File uploaded successfully', response.fileName);
          this.showUserCard.profilePicture=response.fileName;
        }, error => {
          console.error('Error uploading file', error);
        });
    } else {
      console.warn('No file selected');
    }
  }

 

 

  updateUserProfile() {
// alert('u just clicked on update user profile');
    const updateUserProfile: any = {

      username: this.formOfUser.get('userName')?.value,
      first_name: this.formOfUser.get('userFirstName')?.value,
      last_name: this.formOfUser.get('userLastName')?.value,
      phone: this.formOfUser.get('mobileNumber')?.value,
      email: this.formOfUser.get('email')?.value,
      password: this.formOfUser.get('Password')?.value,
      // roleOfUser: this.showUserCard.roleOfUser,
      // dealershipNames: this.formOfUser.get('dlrshpName')?.value,
      // state: this.formOfUser.get('state')?.value,
      // city: this.formOfUser.get('city')?.value,
      // streetAddress: this.showUserCard.streetAddress,
      // apartmentNumber: this.formOfUser.get('suiteNumber')?.value,
      // zipCode: this.formOfUser.get('zipCode')?.value,
      // dealerAdmin:this.showUserCard.dealerAdmin,
      profilePicture: this.showUserCard.profilePicture

    }
    

    this.DashboardService.updateUserProfile(updateUserProfile,sessionStorage.getItem('userData')).subscribe((response) => {
      this.snackBar.open('Profile updated successfully', 'Close')      //console.log(response);
      this.router.navigate(['dashboard'],{relativeTo:this.route})
    },
       (error): any => {
        console.error('Error:', error);
      }
    );
    console.log(updateUserProfile);


  }

  






}
