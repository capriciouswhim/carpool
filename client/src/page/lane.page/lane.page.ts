import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectAll } from '../../store';
import { TypedPoolNumber } from '../../model';

@Component({
  selector: 'car-lane-page',
  imports: [AsyncPipe, KeypadComponent, PoolNumberComponent],
  templateUrl: './lane.page.html',
  styleUrl: './lane.page.scss'
})
export class LanePage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAll)

  onDblClick(poolNumber: TypedPoolNumber) {
      switch(poolNumber.state) {
        case 'LANE':
          this.store.dispatch(carpoolAction.laneDel({ poolNumber: poolNumber.pool_number }))
          break;
        case 'SEND':
          this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
          break;
      }
  }
}
