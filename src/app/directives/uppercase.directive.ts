import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive( {
    selector : '[uppercase]'
} )
export class UppercaseDirective {
    
    private isTransforming : boolean = false;
    
    constructor( private el : ElementRef ) {}
    
    @HostListener( 'input', [ '$event' ] ) onInput( event : Event ) {
        if ( !this.isTransforming ) {
            this.isTransforming = true;
            const inputElement  = this.el.nativeElement as HTMLInputElement;
            inputElement.value  = inputElement.value.toUpperCase();
            // Trigger change detection to ensure the view updates
            inputElement.dispatchEvent( new Event( 'input', { bubbles : true } ) );
            this.isTransforming = false;
        }
    }
}
