import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectAll } from '../../store';
import { PoolNumber } from '../../model';

@Component({
  selector: 'car-lane-page',
  imports: [AsyncPipe, KeypadComponent, PoolNumberComponent],
  templateUrl: './lane.page.html',
  styleUrl: './lane.page.scss'
})
export class LanePage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAll)

  onDblClick(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.laneDel({ poolNumber }))
  }
}
