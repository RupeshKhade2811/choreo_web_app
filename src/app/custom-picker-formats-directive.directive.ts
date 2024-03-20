import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Directive({
  selector: '[yearPickerFormatsDirective]',
  providers:[
    {provide:MAT_DATE_FORMATS,
    useValue:{
      parse: {
        dateInput: 'YYYY',
      },
      display: {
        dateInput: 'YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }
    }
  ]
})
export class CustomPickerFormatsDirectiveDirective {

  constructor() { }

}
