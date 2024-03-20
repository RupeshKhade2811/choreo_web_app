import { Component, Input } from '@angular/core';
import { AprraisalService } from '../services/aprraisal.service';

import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {


@Input() vin:any; 

public able_to!: PureAbility;

constructor(private appraisalService: AprraisalService){
  
}
  public accessToken:any=""
  getAccessToken=()=>{
    this.appraisalService.fetchAccessToken().subscribe((response:any)=>{
      console.log(response);
      this.accessToken=response.access_token;
    })
  }
  getWidgets = () => {
    var timeOnMarEle=document.createElement('time-on-market')
    timeOnMarEle.setAttribute('vin',this.vin)
    timeOnMarEle.setAttribute('access_token',this.accessToken)
    timeOnMarEle.setAttribute('car_type',"used")
    timeOnMarEle.setAttribute('location','{"latitude":"34.05", "longitude":"-118.24", "radius":"100"}')
    timeOnMarEle.setAttribute('layout',"circle")
    timeOnMarEle.setAttribute('colors','{"national_avg": "#96f", "similar_cars": "#4dc9f6", "this_car": "#f67019"}')
    timeOnMarEle.setAttribute('country',"US")
    timeOnMarEle.setAttribute('version',"1")
    console.log(timeOnMarEle)

    var priceMilesPlotEle=document.createElement('price-miles-plot')
    priceMilesPlotEle.setAttribute('vin',this.vin)
    priceMilesPlotEle.setAttribute('access_token',this.accessToken)
    priceMilesPlotEle.setAttribute('miles',"100")
    priceMilesPlotEle.setAttribute('price',"5000")
    priceMilesPlotEle.setAttribute('match',"year,make,model")
    priceMilesPlotEle.setAttribute('location','{"latitude":"34.05", "longitude":"-118.24", "radius":"100"}')
    priceMilesPlotEle.setAttribute('max_similar_listings',"50")
    priceMilesPlotEle.setAttribute('grid_lines','{"x": false, "y": true}')
    priceMilesPlotEle.setAttribute('colors','{"national_avg": "#96f", "similar_cars": "#4dc9f6", "this_car": "#f67019"}')
    priceMilesPlotEle.setAttribute('car_type',"used")
    priceMilesPlotEle.setAttribute('country',"US")
    priceMilesPlotEle.setAttribute('version',"1")

    var carDemandEle=document.createElement('car-demand')
    carDemandEle.setAttribute('access_token',this.accessToken)
    carDemandEle.setAttribute('vin',this.vin)
    carDemandEle.setAttribute('orientation',"horizontal")
    carDemandEle.setAttribute('location','{"latitude":"34.05", "longitude":"-118.24", "radius":"100"}')
    carDemandEle.setAttribute('country',"US")
    carDemandEle.setAttribute('version',"1")
    console.log(carDemandEle)

    var marketDaysSupply:any=document.createElement('p')
    marketDaysSupply.style.fontWeight="bold"
    marketDaysSupply.style.marginTop="5px"
    marketDaysSupply.textContent="Market Days Supply"

    var valueComp:any=document.createElement('p')
    valueComp.style.fontWeight="bold"
    valueComp.textContent="Value Comparsion"

    var widget1: any = document.getElementById('widget1')
    var widget2: any = document.getElementById('widget2')
    var widget3: any = document.getElementById('widget3')
    widget1.appendChild(timeOnMarEle)
    widget2.appendChild(carDemandEle)
    widget2.appendChild(marketDaysSupply)
    widget3.appendChild(priceMilesPlotEle)
    widget3.appendChild(valueComp)
    
   


  }
  ngOnInit(): void {
    console.log(this.vin);
    
    this.getAccessToken();
    setTimeout(()=>{this.getWidgets()},2000);
  }

}
