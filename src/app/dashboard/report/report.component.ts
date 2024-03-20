import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { Observable } from 'rxjs';
import { PureAbility } from '@casl/ability';
import { AbilityService } from '@casl/angular';



export interface dlrInvRpt {
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleSeries: string;
  daysSinceInventory: number;
  vehExtColor: string;
  intrColor: string;
  vinNumber: string;
  vehicleMileage: number;
  delrRetlAskPrice: number;
  appraisedValue: number;
}

export interface salesRpt {
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleSeries: string;
  vehExtColor: string;
  intrColor: string;
  vinNumber: string;
  vehicleMileage: number;
  price: number;
  saleFee: number;
  saleDate: string,
  totalPrice: number,
  buyFee: number
}

const moment = _rollupMoment;

const MONTH_YEAR = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const YEAR = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
const DATE = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export function dateFormatFactory(isFormat: string) {
 
  switch (isFormat) {
    case 'Day':
      return DATE;
    case 'Month':
      return MONTH_YEAR;
    case 'Year':      
      return YEAR;

    default: return DATE;
  }  
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue:DATE
    },
  ],

})



export class ReportComponent implements OnInit {

  isLoading = false;
 
  public able_to!: PureAbility;


  constructor(private fb: FormBuilder, private service: DashboardService, private datePipe: DatePipe, private snackBar: MatSnackBar) { 

   
  }
  selectOption: any = ['Day', 'Month', 'Year', 'Date Range'];
  day: any;
  month: any;
  year: any;
  dateRange: any;

  day1: any;
  month1: any;
  year1: any;
  dateRange1: any;

  getOption() {
    this.day = false;
    this.month = false;
    this.year = false;
    this.dateRange = false;

    const option: any = this.salesReport.get("selectSalesOption")?.value
    if (option !== null) {
      switch (option) {
        case 'Day':
          this.day = true;          
          break;
        case 'Month':
          this.month = true;          
          break;
        case 'Year':
          this.year = true;        
          break;
        case 'Date Range':
          this.dateRange = true;
          break;
      }
    }

  }

  currentDateFormat: any;

  getOption1() {
    this.day1 = false;
    this.month1 = false;
    this.year1 = false;
    this.dateRange1 = false;



    const option1: any = this.purchaseReport.get("selectPurOption")?.value
    if (option1 !== null) {
      switch (option1) {
        case 'Day':
          this.day1 = true;
          this.currentDateFormat = dateFormatFactory("Day");
          break;
        case 'Month':
          this.month1 = true;
          this.currentDateFormat = dateFormatFactory("Month");
          break;
        case 'Year':
          this.year1 = true;
          this.currentDateFormat = dateFormatFactory("Year");
          break;
        case 'Date Range':
          this.dateRange1 = true;
          break;
      }
    }
  }


  displayedColumns: string[] = ['year', 'make', 'model', 'series', 'daysInInventory', 'color', 'interior', 'vin', 'mileage', 'askingPrice', 'appraisedValue'];
  columnsForReport: string[] = ['year', 'make', 'model', 'series', 'color', 'interior', 'vin', 'mileage', 'wholesalePrice', 'saleFee', 'totalPrice', 'saleDate'];
  columnsForPurReport: string[] = ['year', 'make', 'model', 'series', 'color', 'interior', 'vin', 'mileage', 'wholesalePrice', 'buyFee', 'totalPrice', 'saleDate'];

  dataSource: any;
  dataSource1: any;
  dataSource2: any
  makes: any = [];
  showDlrTable: boolean = false;
  showdlrInvButton: boolean = false;
  showSalesTable: boolean = false;
  showSalesButton: boolean = false;
  showPurchaseTable: boolean = false;
  showPurchaseButton: boolean = false;

  daysInStock: any = [{
    id: 0,
    value: "All"
  }, {
    id: 30,
    value: "over 30 days"
  },
  {
    id: 60,
    value: "over 60 days"
  },
  {
    id: 90,
    value: "over 90 days"
  }, {
    id: 120,
    value: "over 120 days"
  }
  ];



  dealerInvReport = this.fb.group({
    dealeraskingPrice: [null],
    vehicleCompany: [null],
    daysInStock: [null]
  })

  salesReport: any = this.fb.group({
    selectSalesOption: [null],
    date: [null],
    month: [null],
    endDate: [null],
    startDate: [null],
    monthYear: [null],
    year: [null],
    onlyYear: [null]
  })

  purchaseReport: any = this.fb.group({
    selectPurOption: [null],
    date1: [null],
    endDate1: [null],
    startDate1: [null],
    monthYear: [null],
    year: [null],
    onlyYear: [null]
  })

  getModelData() {
    this.service.getModelDropDown().subscribe((response: any) => {
      this.makes = response.make;

    })
  }

  currentPage: number = 0;
  pageSize: number = 8;
  lastPage: any;

  getDlrInvReport(pageNumber: number) {
    this.isLoading = true;

    this.currentPage = pageNumber;

    const tableData = {
      vehicleMake: this.dealerInvReport.get("vehicleCompany")?.value,
      daysSinceInventory: this.dealerInvReport.get("daysInStock")?.value,
      delrRetlAskPrice: this.dealerInvReport.get("dealeraskingPrice")?.value
    };

    this.service.getDealerInvReport(this.currentPage, this.pageSize, JSON.stringify(tableData))
      .subscribe((response: any) => {
        if (response.dlrInvntryList.length === 0) {
          this.openSnackBar('no data available', 'Close');
          this.showDlrTable = false;
          this.dataSource = []
          this.showdlrInvButton = false;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.showDlrTable = true;
          this.showdlrInvButton = true;
          this.dataSource = response.dlrInvntryList;
          this.lastPage = response.totalPages - 1;
        }
      });
  }

  getDlrInvPdf() {
    const tableData = {
      vehicleMake: this.dealerInvReport.get("vehicleCompany")?.value || null,
      daysSinceInventory: this.dealerInvReport.get("daysInStock")?.value === null ? -1 : this.dealerInvReport.get("daysInStock")?.value,
      delrRetlAskPrice: this.dealerInvReport.get("dealeraskingPrice")?.value || 0
    };
    const url1 = `https://services-test.keyassure.live/shipment/genDlrInvntryReport?consumerAskPrice=0&daysSinceInventory=${tableData.daysSinceInventory}&delrRetlAskPrice=${tableData.delrRetlAskPrice}&userId=598d968b-a7ac-4d26-87a4-ed4659e2d472&vehicleMake=${tableData.vehicleMake}`;
    const anchorEl = document.createElement('a');
    anchorEl.href = url1;
    anchorEl.click();
    // this.service.getDealerInvPdf(tableData)
    //   .subscribe((response: any) => {
    //    console.log(response.url);
    //    const url1=`https://services-test.keyassure.live/shipment/genDlrInvntryReport?consumerAskPrice=0&daysSinceInventory=${tableData.daysSinceInventory}&delrRetlAskPrice=${tableData.delrRetlAskPrice}&userId=598d968b-a7ac-4d26-87a4-ed4659e2d472&vehicleMake=${tableData.vehicleMake}`;



    //   });
  }

  getSalesReport(pageNumber: number) {
    this.isLoading = true;
    var startDate
    var endDate
    this.currentPage = pageNumber;

    if (this.salesReport.get("selectSalesOption")?.value === "Day") {
      const date = this.salesReport.get("date")?.value;
      startDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      endDate = ""
    } else if (this.salesReport.get("selectSalesOption")?.value === "Month") {
      const firstDate = this.firstDateOfMonth;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDateOfMonth;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.salesReport.get("selectSalesOption")?.value === "Year") {
      const firstDate = this.firstDayOfYear;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDayOfYear;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.salesReport.get("selectSalesOption")?.value === "Date Range") {
      const start = this.salesReport.get("startDate")?.value;
      startDate = this.datePipe.transform(start, 'yyyy-MM-dd');
      const end = this.salesReport.get("endDate")?.value;
      endDate = this.datePipe.transform(end, 'yyyy-MM-dd');
    }

    this.service.getSalesReport(this.currentPage, this.pageSize, startDate, endDate).subscribe((response: any) => {
      if (response.salesList.length === 0) {
        this.openSnackBar('no data available', 'Close');
        this.showSalesTable = false;
        this.dataSource1 = [];
        this.showSalesButton = false;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.showSalesTable = true;
        this.showSalesButton = true;
        this.dataSource1 = response.salesList;
        this.lastPage = response.totalPages - 1;
      }
    })
  }

  getSalesPdf() {
    var startDate
    var endDate

    if (this.salesReport.get("selectSalesOption")?.value === "Day") {
      const date = this.salesReport.get("date")?.value;
      startDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      endDate = "";
    } else if (this.salesReport.get("selectSalesOption")?.value === "Month") {
      const firstDate = this.firstDateOfMonth;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDateOfMonth;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.salesReport.get("selectSalesOption")?.value === "Year") {
      const firstDate = this.firstDayOfYear;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDayOfYear;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.salesReport.get("selectSalesOption")?.value === "Date Range") {
      const start = this.salesReport.get("startDate")?.value;
      startDate = this.datePipe.transform(start, 'yyyy-MM-dd');
      const end = this.salesReport.get("endDate")?.value;
      endDate = this.datePipe.transform(end, 'yyyy-MM-dd');
    }
    const url1 = `https://services-test.keyassure.live/shipment/genSalesReport?end=${endDate}&start=${startDate}&userId=598d968b-a7ac-4d26-87a4-ed4659e2d472`;
    const anchorEl = document.createElement('a');
    anchorEl.href = url1;
    anchorEl.click();
  }


      getPurchaseReport(pageNumber: number) {
    this.isLoading = true;

    var startDate;
    var endDate;
    this.currentPage = pageNumber;

    if (this.purchaseReport.get("selectPurOption")?.value === "Day") {
      const date = this.purchaseReport.get("date1")?.value;
      startDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      endDate = ""
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Month") {
      const firstDate = this.firstDateOfMonth1;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDateOfMonth1;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Year") {
      const firstDate = this.firstDayOfYear1;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDayOfYear1;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Date Range") {
      const start = this.purchaseReport.get("startDate1")?.value;
      startDate = this.datePipe.transform(start, 'yyyy-MM-dd');
      const end = this.purchaseReport.get("endDate1")?.value;
      endDate = this.datePipe.transform(end, 'yyyy-MM-dd');
    }
    this.service.getPurchaseReport(this.currentPage, this.pageSize, startDate, endDate).subscribe((response: any) => {
      if (response.purchaseList.length === 0) {
        this.openSnackBar('no data available', 'Close');
        this.showPurchaseTable = false;
        this.dataSource2 = [];
        this.showPurchaseButton = false;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.showPurchaseTable = true;
        this.showPurchaseButton = true;
        this.dataSource2 = response.purchaseList;
        this.lastPage = response.totalPages - 1;
      }
    })
  }

  getPurchasePdf() {
    var startDate;
    var endDate;

    if (this.purchaseReport.get("selectPurOption")?.value === "Day") {
      const date = this.purchaseReport.get("date1")?.value;
      startDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      endDate = ""
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Month") {
      const firstDate = this.firstDateOfMonth1;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDateOfMonth1;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Year") {
      const firstDate = this.firstDayOfYear1;
      startDate = this.datePipe.transform(firstDate, 'yyyy-MM-dd');
      const lastDate = this.lastDayOfYear1;
      endDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');
    } else if (this.purchaseReport.get("selectPurOption")?.value === "Date Range") {
      const start = this.purchaseReport.get("startDate1")?.value;
      startDate = this.datePipe.transform(start, 'yyyy-MM-dd');
      const end = this.purchaseReport.get("endDate1")?.value;
      endDate = this.datePipe.transform(end, 'yyyy-MM-dd');
    }
    const url1 = `https://services-test.keyassure.live/shipment/genPurchaseReport?end=${endDate}&start=${startDate}&userId=598d968b-a7ac-4d26-87a4-ed4659e2d472`;
    const anchorEl = document.createElement('a');
    anchorEl.href = url1;
    anchorEl.click();
  }

  ngOnInit(): void {
    this.getModelData();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left', 'center', 'right'
      verticalPosition: 'bottom', // 'top' or 'bottom'
    });
  }

  clearDlrReport() {
    this.dealerInvReport.reset();
    this.showDlrTable = false;
    this.dataSource = []
    this.showdlrInvButton = false;
    this.day = false;
    this.month = false;
    this.year = false;
    this.dateRange = false;

  }

  clearSaleReport() {
    this.salesReport.reset();
    this.showSalesTable = false;
    this.dataSource1 = [];
    this.showSalesButton = false;
    this.day = false;
    this.month = false;
    this.year = false;
    this.dateRange = false;

  }
  clearPurReport() {
    this.purchaseReport.reset();
    this.showPurchaseTable = false;
    this.dataSource2 = [];
    this.showPurchaseButton = false;
    this.day1 = false;
    this.month1 = false;
    this.year1 = false;
    this.dateRange1 = false;
  }

  public selectedTab = ''
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.tab.textLabel;

    // this.month = false;
    // this.year = false;
    if (this.selectedTab === "Sales Report") {

      if (this.dataSource1 && this.dataSource1.length > 0) {

        // If there is data in dataSource1, set day to true for Sales Report
        if (this.salesReport.get("selectSalesOption")?.value === "Day") {
          this.day = true;
        } else if (this.salesReport.get("selectSalesOption")?.value === "Month") {
          this.month = true;
        } else if (this.salesReport.get("selectSalesOption")?.value === "Year") {
          this.year = true;
        } else if (this.salesReport.get("selectSalesOption")?.value === "Date Range") {
          this.dateRange = true;
        }

      } else {

        // If no data, set day to false and reset the selectSalesOption FormControl
        this.day = false;
        this.month = false;
        this.year = false;
        this.dateRange = false;
        this.salesReport.get("selectSalesOption")?.setValue(null);
      }
    } else if (this.selectedTab === "Purchase Report") {
      if (this.dataSource2 && this.dataSource2.length > 0) {
        // If there is data in dataSource2, set day to true for Purchase Report
        if (this.purchaseReport.get("selectPurOption")?.value === "Day") {
          this.day1 = true;
        } else if (this.purchaseReport.get("selectPurOption")?.value === "Month") {
          this.month1 = true;
        } else if (this.purchaseReport.get("selectPurOption")?.value === "Year") {
          this.year1 = true;
        } else if (this.purchaseReport.get("selectPurOption")?.value === "Date Range") {
          this.dateRange1 = true;
        }
      } else {
        // If no data, set day to false and reset the selectPurOption FormControl
        this.day1 = false;
        this.month1 = false;
        this.year1 = false;
        this.dateRange1 = false;
        this.purchaseReport.get("selectPurOption")?.setValue(null);
      }
    }
  }

  monthYear = new FormControl(moment());
  onlyYear: any = new FormControl(moment());

  monthYear1 = new FormControl(moment());
  onlyYear1: any = new FormControl(moment());

  firstDateOfMonth: any;
  lastDateOfMonth: any;
  firstDayOfYear: any;
  lastDayOfYear: any;
  firstDateOfMonth1: any;
  lastDateOfMonth1: any;
  firstDayOfYear1: any;
  lastDayOfYear1: any;

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {

    if (this.month === true) {
      const ctrlValue = this.monthYear.value!;
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.monthYear.setValue(ctrlValue);
      const date = ctrlValue.toDate();
      this.firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      this.lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else {
      const ctrlValue = this.onlyYear.value!;
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.onlyYear.setValue(ctrlValue);
      const date = ctrlValue.toDate();
      this.firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      this.lastDayOfYear = new Date(date.getFullYear(), 11, 31);
    }
    datepicker.close();
  }
  setMonthAndYear1(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {

    if (this.month1 === true) {
      const ctrlValue = this.monthYear1.value!;
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.monthYear1.setValue(ctrlValue);
      const date = ctrlValue.toDate();
      this.firstDateOfMonth1 = new Date(date.getFullYear(), date.getMonth(), 1);
      this.lastDateOfMonth1 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else {
      const ctrlValue = this.onlyYear1.value!;
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.onlyYear1.setValue(ctrlValue);
      const date = ctrlValue.toDate();
      this.firstDayOfYear1 = new Date(date.getFullYear(), 0, 1);
      this.lastDayOfYear1 = new Date(date.getFullYear(), 11, 31);
    }
    datepicker.close();
  }

  showErrorMessage() {
    if (this.currentPage === 0 || this.currentPage === this.lastPage) {
      this.openSnackBar('No more Data available', 'Close');
      // } else if (this.currentPage === this.lastPage) {
      //   this.openSnackBar('Your are in the last page', 'Close');
      // }
    }
  }


}


