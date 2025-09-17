import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PoolNumberComponent } from '../../component';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../../page';

@Component({
  selector: 'car-escort-page',
  imports: [AsyncPipe, PoolNumberComponent],
  templateUrl: './escort.page.html',
  styleUrl: './escort.page.scss'
})
export class EscortPage extends BasePage {

  onInvoke = (poolNumber: TypedPoolNumber) =>
    this.store.dispatch(this.marshal.nextStep('ESCORT', poolNumber))

}
