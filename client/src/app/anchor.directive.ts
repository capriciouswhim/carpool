import { AfterViewInit, Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[anchor]'
})
export class AnchorDirective implements AfterViewInit{
  element:ElementRef<HTMLAnchorElement> = inject(ElementRef<HTMLAnchorElement>)
  location = inject(Location)
  anchor = input('')

  ngAfterViewInit() {
    // construct the proper href for angular navigation
    this.element.nativeElement.setAttribute('href', `${this.location.path()}${this.anchor()}`)
  }
}
