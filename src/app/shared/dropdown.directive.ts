import { Directive, ElementRef, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') isOpend = false;
    // classSelected:string;


    constructor(private elRef: ElementRef){

    }

    @HostListener('document:click',['$event']) toggleOpen(eventData: Event){
        this.isOpend = this.elRef.nativeElement.contains(eventData.target) ? !this.isOpend: false;
    }
}