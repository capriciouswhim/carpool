import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DispatchComponent, PoolNumberComponent } from '../../component';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../../page';

@Component({
  selector: 'car-door-page',
  imports: [ AsyncPipe, PoolNumberComponent, DispatchComponent ],
  templateUrl: './door.page.html',
  styleUrl: './door.page.scss'
})
export class DoorPage extends BasePage {
  
  onInvoke = (poolNumber: TypedPoolNumber) =>
    this.store.dispatch(this.marshal.nextStep('DOOR', poolNumber))

}
