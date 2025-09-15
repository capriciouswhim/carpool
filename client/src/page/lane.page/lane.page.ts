import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectLane } from '../../store';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../base.page/base.page';

@Component({
  selector: 'car-lane-page',
  imports: [AsyncPipe, KeypadComponent, PoolNumberComponent],
  templateUrl: './lane.page.html',
  styleUrl: './lane.page.scss'
})
export class LanePage extends BasePage {
  poolNumbers$ = this.store.select(selectLane)

  onInvoke(poolNumber: TypedPoolNumber) {
      switch(poolNumber.state) {
        case 'LANE':
          this.store.dispatch(carpoolAction.laneDel({ poolNumber: poolNumber.pool_number }))
          break;
        case 'SEND':
          this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
          break;
        case 'EXIT':
          this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
          break;
      }
  }
}
