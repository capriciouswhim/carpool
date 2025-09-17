import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { BasePage } from '../base.page/base.page';
import { TypedPoolNumber } from '../../model';

@Component({
  selector: 'car-lane-page',
  imports: [AsyncPipe, KeypadComponent, PoolNumberComponent],
  templateUrl: './lane.page.html',
  styleUrl: './lane.page.scss'
})
export class LanePage extends BasePage {

  onInvoke = (poolNumber: TypedPoolNumber) =>
    this.store.dispatch(this.marshal.nextStep('LANE', poolNumber))

}
