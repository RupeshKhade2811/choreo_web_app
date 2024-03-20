import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { Observable } from 'rxjs';
import { AbilityService } from '@casl/angular';
import { AppAbility } from '../services/AppAbility';
import { PureAbility } from '@casl/ability';




declare const CollectJS: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  public checkboxValue:any=false;
  ability$: Observable<AppAbility>;
  public able_to!: PureAbility;
  public isSubscription:Boolean=true;
  public isGadgets:Boolean=false;
  public isCustomerServices:Boolean=false;

constructor(abilityService: AbilityService<AppAbility> ,@Inject(DOCUMENT) private document: Document,private dashboardService:DashboardService,public dialog: MatDialog ){

  this.ability$=abilityService.ability$;
  this.ability$.subscribe(r=>{
    this.able_to=r;

  })
}
  ngOnInit():void{
    this.loadExternalScript();

    this.ability$.subscribe(r=>{
      console.log(r);
      
    })
  
    
   
   
    
    
  }
  loadExternalScript(): void {
    const script = this.document.createElement('script');
    script.src = 'https://secure.networkmerchants.com/token/Collect.js';
    script.async = true;
    script.onload = () => {
      this.configureCollectJS();
    };

    this.document.head.appendChild(script);
  }

  configureCollectJS(): void {
    const self = this; 
    console.log("ok");
    CollectJS.configure({
      'tokenizationKey': 'qSt5ZA-a3f2YW-z65GMM-B9V77u',
      "paymentSelector" : "#demoPayButton",
      variant: 'inline',
      googleFont: 'Abel',
      invalidCss: {
          color: '#B40E3E'
      },
      validCss: {
          color: '#14855F'
      },
      customCss: {
          'border-color': '#FFFFFF',
          'border-style': 'solid'
      },
      focusCss: {
          'border-color': '#1CC48B',
          'border-style': 'solid',
          'border-width': '3px'
      },
      fields: {

          ccnumber: {
              placeholder: 'Credit Card'
          },
          ccexp: {
              placeholder: 'MM / YY'
          },
          cvv: {
              placeholder: 'CVV'
          }
      },
      'validationCallback' : function(field: string, status: any, message: string) {
                  if (status) {
                      var message = field + " is now OK: " + message;
                  } else {
                      var message = field + " is now Invalid: " + message;
                  }
                  console.log(message);
              },
              "timeoutDuration" : 10000,
              "timeoutCallback" : function () {
                  console.log("The tokenization didn't respond in the expected timeframe.  This could be due to an invalid or incomplete field or poor connectivity");
              },
              "fieldsAvailableCallback" : function () {
                  console.log("Collect.js loaded the fields onto the form");
              },
              'callback': function (response: { token: string; }) {
           //alert("payment token " + response.token);
           if(self.isSubscription){
            self.dashboardService.payment(response.token).subscribe((response:any)=>{
              console.log(response)
           })
           }
           if(self.isGadgets){
            self.dashboardService.gadgetPayment(response.token).subscribe((response:any)=>{
              console.log(response)
           })
           }
           if(self.isCustomerServices){
            self.dashboardService.custServicePayment(response.token).subscribe((response:any)=>{
              console.log(response)
           })
           }
           
        
      }
    });
  }
   loadSubscribe() {
   this.isSubscription=true;
   this.isGadgets=false;
   this.isCustomerServices=false;
    this.configureCollectJS();
    // setTimeout(() => {
    //     getPaymentUrl();
    // }, 100)
};
 loadGadgets() {
    // alert('ok');
    this.isSubscription=false;
    this.isGadgets=true;
    this.isCustomerServices=false;
    this.configureCollectJS();
    // setTimeout(() => {
    //     var inputEle2;
    //     var inputEle = document.getElementById('input2');
    //     paymentUrl = inputEle.value
    //     console.log(paymentUrl);
    // }, 100)

};
 loadCustServices() {
  this.isSubscription=false;
  this.isGadgets=false;
  this.isCustomerServices=true;
    // alert('ok');
    this.configureCollectJS();
    // setTimeout(() => {
    //     var inputEle2;
    //     var inputEle = document.getElementById('input3');
    //     paymentUrl = inputEle.value
    // }, 100)

};
  openDealerAgreeDialog(): void {
    const dialogRef = this.dialog.open(DealerAgreement, {
      // data: {
      //   appraisalId: srchFtryCard.id
      // }
      data: {
        initialCheckboxValue: this.checkboxValue // Pass the initial value
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.checkboxValue = result;
      }
     
    });
  }


 
  
}

@Component({
  selector: 'DealerAgreement',
  templateUrl: 'DealerAgreement.html'
})
export class DealerAgreement {

public checkboxValue:any=false;
readonly ability$: Observable<AppAbility>;
public able_to!: PureAbility;

  public closeDialog(){
    this.dialogRef.close(this.checkboxValue);
    console.log(this.checkboxValue);
  }

  constructor(
    abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<DealerAgreement>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) {
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
   }
  ngOnInit() {
    // Set the checkbox value here based on the data or other logic if needed
    this.checkboxValue = this.data.initialCheckboxValue || false;
  }

 
 

}
