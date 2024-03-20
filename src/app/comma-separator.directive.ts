import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCommaSeparator]'
})
export class CommaSeparatorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    // Get the input value without commas
    const value = event.target.value.replace(/,/g, '');

    // Convert the value to a number (you can also use parseFloat or parseInt)
    const numericValue = +value;

    // Check if the numeric value is a valid number
    if (!isNaN(numericValue)) {
      // Format the numeric value with commas
      const formattedValue = numericValue.toLocaleString();
      // Update the input field with the formatted value
      this.renderer.setProperty(event.target, 'value', formattedValue);
    } else {
      // If the input is not a valid number, clear the input
      this.renderer.setProperty(event.target, 'value', '');
    }
  }
}
